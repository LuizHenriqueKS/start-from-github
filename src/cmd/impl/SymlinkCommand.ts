import SymlinkMaker from '../../repository/SymlinkMaker';
import Command from '../Command';
import CommandArgs from '../CommandArgs';
import loadRepositoryConfigFromArgs from '../../repository/loadRepositoryConfigFromArgs';

class SymlinkCommand implements Command {
  async run(args: CommandArgs): Promise<void> {
    const repositoryConfig = loadRepositoryConfigFromArgs(args);
    const symlinkMaker = new SymlinkMaker(args, repositoryConfig);
    symlinkMaker.make();
    console.log('Finished.');
  }
}

export default SymlinkCommand;
