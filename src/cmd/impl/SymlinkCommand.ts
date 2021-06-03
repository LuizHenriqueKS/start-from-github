import SymlinkMaker from '../../repository/SymlinkMaker';
import Command from '../Command';
import CommandArgs from '../CommandArgs';

class SymlinkCommand implements Command {
  async run(args: CommandArgs): Promise<void> {
    const filename = args.args[0];
    const symlinkMaker = new SymlinkMaker(args, filename);
    symlinkMaker.make();
    console.log('Finished.');
  }
}

export default SymlinkCommand;
