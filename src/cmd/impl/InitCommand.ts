import Command from '../Command';
import CommandArgs from '../CommandArgs';
import path from 'path';
import fs from 'fs';
import FileAlreadyExistsError from '../../error/FileAlreadyExistsError';
import writeJSONFile from '../../util/writeJSONFile';
import RepositoryConfig from '../../model/RepositoryConfig';
import getRepositoryData from '../../repository/getRepositoryData';

class InitCommand implements Command {
  async run(args: CommandArgs): Promise<void> {
    const filePath = this.getFilePath(args);
    const url = this.getURL(args);
    const name = this.getName(filePath, url);
    this.requireFileNonExists(filePath);
    console.log(`Creating config json file: ${filePath}`);
    const config = this.createRepositoryInfo(name, url);
    writeJSONFile(filePath, config);
    console.log('Created.');
  }

  private createRepositoryInfo(name: string, url?: string): RepositoryConfig {
    return {
      name,
      url: url || 'github_repository_url',
      token: 'token',
      preCommands: ['npm run build'],
      symlinks: [{ directory_target: 'directory_destination' }],
      webhookPort: 8080
    };
  }

  private requireFileNonExists(filePath: string) {
    if (fs.existsSync(filePath)) {
      throw new FileAlreadyExistsError(filePath);
    }
  }

  private getName(filePath: string, url?: string): string {
    if (url) {
      return getRepositoryData(url).name;
    }
    return path.parse(filePath).name;
  }

  private getURL(args: CommandArgs): string | undefined {
    if (args.args && args.args.length > 0) {
      const url = args.args[0];
      if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
      }
    }
    return undefined;
  }

  private getFilePath(args: CommandArgs): string {
    const hasArgs = args.args && args.args.length > 0;
    const isURL = hasArgs && (args.args[0].startsWith('http://') || args.args[0].startsWith('https://'));
    if (!isURL && hasArgs) {
      if (path.isAbsolute(args.args[0]) && !isURL) {
        return args.args[0];
      } else {
        return path.join(args.directory, args.args[0]);
      }
    } else {
      return path.join(args.directory, 'repository.json');
    }
  }
}

export default InitCommand;
