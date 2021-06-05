import RepositoryDownloader from '../../repository/RepositoryDownloader';
import Command from '../Command';
import CommandArgs from '../CommandArgs';
import loadRepositoryConfigFromArgs from '../../repository/loadRepositoryConfigFromArgs';

class DownloadCommand implements Command {
  async run(args: CommandArgs): Promise<void> {
    const repositoryConfig = loadRepositoryConfigFromArgs(args);
    const repositoryDownloader = new RepositoryDownloader(args, repositoryConfig);
    await repositoryDownloader.download();
    console.log('Finished.');
  }
}

export default DownloadCommand;
