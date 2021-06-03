import Command from '../Command';
import CommandArgs from '../CommandArgs';
import path from 'path';
import fs from 'fs';
import FileAlreadyExistsError from '../../error/FileAlreadyExistsError';
import writeJSONFile from '../../util/writeJSONFile';
import RepositoryConfig from '../../model/RepositoryConfig';

class InitCommand implements Command {
  async run(args: CommandArgs): Promise<void> {
    const filePath = this.getFilePath(args);
    this.requireFileNonExists(filePath);
    console.log(`Creating config json file: ${filePath}`);
    const config = this.createRepositoryInfo(path.parse(filePath).name);
    writeJSONFile(filePath, config);
    console.log('Created.');
  }

  private createRepositoryInfo(name: string): RepositoryConfig {
    return {
      name,
      url: 'github_repository_url',
      token: 'token',
      preCommands: ['npm run build'],
      symlink: [{ directory_target: 'directory_destination' }],
      webhookPort: 8080
    };
  }

  private requireFileNonExists(filePath: string) {
    if (fs.existsSync(filePath)) {
      throw new FileAlreadyExistsError(filePath);
    }
  }

  private getFilePath(args: CommandArgs): string {
    if (args.args && args.args.length > 0) {
      if (path.isAbsolute(args.args[0])) {
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
