import RepositoryDownloader from '../../repository/RepositoryDownloader';
import Command from '../Command';
import CommandArgs from '../CommandArgs';

class DownloadCommand implements Command {
  async run(args: CommandArgs): Promise<void> {
    const filename = args.args[0];
    const repositoryDownloader = new RepositoryDownloader(args, filename);
    await repositoryDownloader.download();
    console.log('Finished.');
  }
}

export default DownloadCommand;
