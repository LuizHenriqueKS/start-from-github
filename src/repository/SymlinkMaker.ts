import fs from 'fs';
import CommandArgs from '../cmd/CommandArgs';
import joinPath from '../util/joinPath';
import loadRepositoryConfig from './loadRepositoryConfig';
import loadRepositoryVersion from './loadRepositoryVersion';
import getDownloadedRepositoryDir from './getDownloadedRepositoryDir';
import requireRepositoryVersionExists from './requireRepositoryVersionExists';

class SymlinkMaker {
  readonly args: CommandArgs;
  readonly filename: string;

  constructor(args: CommandArgs, filename?: string) {
    this.args = args;
    this.filename = filename || 'repository.json';
  }

  async make(): Promise<void> {
    console.log('Creating symlinks...');
    const repositoryConfig = loadRepositoryConfig(this.args, this.filename);
    requireRepositoryVersionExists(this.args.directory, repositoryConfig);
    const repositoryVersion = loadRepositoryVersion(this.args, repositoryConfig);
    const repositoryDirectory = getDownloadedRepositoryDir(this.args.directory, repositoryVersion!);
    if (repositoryConfig.symlinks) {
      for (const symlinks of repositoryConfig.symlinks) {
        for (const entry of Object.entries(symlinks)) {
          const source: string = entry[0];
          const destination: any = entry[1];
          await this.createSymlinkIfNotExists(source, destination, repositoryDirectory);
        }
      }
    }
  }

  private async createSymlinkIfNotExists(source: string, destination: string, repositoryDirectory: string) {
    const sourcePath = joinPath(this.args.directory, source);
    const destinationPath = joinPath(repositoryDirectory, destination);
    if (!fs.existsSync(destinationPath)) {
      try {
        console.log(`Creating symlink: ${destination}`);
        fs.symlinkSync(sourcePath, destinationPath);
      } catch (e) {
        console.error(e.message);
      }
    }
  }
}

export default SymlinkMaker;
