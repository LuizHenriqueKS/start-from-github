import CommandArgs from '../cmd/CommandArgs';
import getDownloadedRepositoryDir from './getDownloadedRepositoryDir';
import loadRepositoryVersion from './loadRepositoryVersion';
import requireRepositoryVersionExists from './requireRepositoryVersionExists';
import path from 'path';
import fs from 'fs';
import runTerminalCommand from '../terminal/runTerminalCommand';
import RepositoryConfig from '../model/RepositoryConfig';

class DependenciesInstaller {
  readonly args: CommandArgs;
  readonly repositoryConfig: RepositoryConfig;

  constructor(args: CommandArgs, repositoryConfig: RepositoryConfig) {
    this.args = args;
    this.repositoryConfig = repositoryConfig;
  }

  async install(): Promise<void> {
    console.log('Checking dependencies...');
    requireRepositoryVersionExists(this.args.directory, this.repositoryConfig);
    const repositoryVersion = loadRepositoryVersion(this.args, this.repositoryConfig);
    const repositoryDirectory = getDownloadedRepositoryDir(this.args.directory, repositoryVersion!);
    const dependenciesDirectory = path.join(repositoryDirectory, 'node_modules');
    if (!fs.existsSync(dependenciesDirectory)) {
      console.log('Installing dependencies...');
      const command = runTerminalCommand('npm', { args: ['i'], cwd: repositoryDirectory });
      await command.waitForClose();
    }
  }
}

export default DependenciesInstaller;
