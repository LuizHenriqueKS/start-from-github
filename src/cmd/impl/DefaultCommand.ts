import Command from '../Command';
import CommandArgs from '../CommandArgs';
import HelpCommand from './HelpCommand';
import UpCommand from './UpCommand';

class DefaultCommand implements Command {
  async run(args: CommandArgs): Promise<void> {
    if (!args.commandName || args.commandName === '') {
      new HelpCommand().run(args);
    } else {
      new UpCommand().run({
        ...args,
        commandName: 'up',
        args: [args.commandName, ...args.args]
      });
    }
  }
}

export default DefaultCommand;
