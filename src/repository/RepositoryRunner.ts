import CommandArgs from '../cmd/CommandArgs';
import RepositoryConfig from '../model/RepositoryConfig';
import runTerminalCommandEx from '../terminal/runTerminalCommandEx';
import DependenciesInstaller from './DependenciesInstaller';
import getDownloadedRepositoryDir from './getDownloadedRepositoryDir';
import loadRepositoryVersion from './loadRepositoryVersion';
import RepositoryDownloader from './RepositoryDownloader';
import requireRepositoryVersionExists from './requireRepositoryVersionExists';
import SymlinkMaker from './SymlinkMaker';

class RepositoryRunner {
  readonly args: CommandArgs;
  readonly repositoryConfig: RepositoryConfig;

  constructor(args: CommandArgs, repositoryConfig: RepositoryConfig) {
    this.args = args;
    this.repositoryConfig = repositoryConfig;
  }

  async run(): Promise<void> {
    await this.download();
    await this.symlinks();
    await this.installDependencies();
    await this.runPreCommands();
    await this.start();
  }

  private async download() {
    const downloader = new RepositoryDownloader(this.args, this.repositoryConfig);
    await downloader.download();
  }

  private async symlinks() {
    const symlinkMaker = new SymlinkMaker(this.args, this.repositoryConfig);
    await symlinkMaker.make();
  }

  private async installDependencies() {
    const installer = new DependenciesInstaller(this.args, this.repositoryConfig);
    await installer.install();
  }

  private async runPreCommands() {
    if (this.repositoryConfig.preCommands) {
      requireRepositoryVersionExists(this.args.directory, this.repositoryConfig);
      const repositoryVersion = loadRepositoryVersion(this.args, this.repositoryConfig);
      const repositoryDirectory = getDownloadedRepositoryDir(this.args.directory, repositoryVersion!);
      const cwd = repositoryDirectory;
      const out = this.args.out;
      for (const preCommand of this.repositoryConfig.preCommands) {
        console.log(`Run pre command: '${preCommand}'...`);
        await runTerminalCommandEx(preCommand, { cwd, out }).waitForClose();
      }
    }
  }

  private async start() {
    const terminalCommand = this.runStartCommand();
    await terminalCommand.waitForClose();
  }

  private runStartCommand() {
    console.log(`Run '${this.repositoryConfig.name}'...`);
    requireRepositoryVersionExists(this.args.directory, this.repositoryConfig);
    const repositoryVersion = loadRepositoryVersion(this.args, this.repositoryConfig);
    const repositoryDirectory = getDownloadedRepositoryDir(this.args.directory, repositoryVersion!);
    const cwd = repositoryDirectory;
    const out = this.args.out;
    if (this.repositoryConfig.startCommand) {
      return runTerminalCommandEx(this.repositoryConfig.startCommand, { cwd, out });
    } else {
      return runTerminalCommandEx('npm start', { cwd, out });
    }
  }
}

export default RepositoryRunner;
