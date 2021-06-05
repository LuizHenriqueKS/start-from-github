import fs from 'fs';
import CommandArgs from '../cmd/CommandArgs';
import joinPath from '../util/joinPath';
import loadRepositoryVersion from './loadRepositoryVersion';
import getDownloadedRepositoryDir from './getDownloadedRepositoryDir';
import requireRepositoryVersionExists from './requireRepositoryVersionExists';
import RepositoryConfig from '../model/RepositoryConfig';

class SymlinkMaker {
  readonly args: CommandArgs;
  readonly repositoryConfig: RepositoryConfig;

  constructor(args: CommandArgs, repositoryConfig: RepositoryConfig) {
    this.args = args;
    this.repositoryConfig = repositoryConfig;
  }

  async make(): Promise<void> {
    console.log('Creating symlinks...');
    requireRepositoryVersionExists(this.args.directory, this.repositoryConfig);
    const repositoryVersion = loadRepositoryVersion(this.args, this.repositoryConfig);
    const repositoryDirectory = getDownloadedRepositoryDir(this.args.directory, repositoryVersion!);
    if (this.repositoryConfig.symlinks) {
      for (const symlinks of this.repositoryConfig.symlinks) {
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
