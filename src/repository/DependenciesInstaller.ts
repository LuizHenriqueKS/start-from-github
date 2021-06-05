import CommandArgs from '../cmd/CommandArgs';
import getDownloadedRepositoryDir from './getDownloadedRepositoryDir';
import loadRepositoryConfig from './loadRepositoryConfig';
import loadRepositoryVersion from './loadRepositoryVersion';
import requireRepositoryVersionExists from './requireRepositoryVersionExists';
import path from 'path';
import fs from 'fs';
import runTerminalCommand from '../terminal/runTerminalCommand';

class DependenciesInstaller {
  readonly args: CommandArgs;
  readonly filename: string;

  constructor(args: CommandArgs, filename?: string) {
    this.args = args;
    this.filename = filename || 'repository.json';
  }

  async install(): Promise<void> {
    console.log('Checking dependencies...');
    const repositoryConfig = loadRepositoryConfig(this.args, this.filename);
    requireRepositoryVersionExists(this.args.directory, repositoryConfig);
    const repositoryVersion = loadRepositoryVersion(this.args, repositoryConfig);
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
