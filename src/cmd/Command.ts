import CommandArgs from './CommandArgs';

interface Command {
  run(args: CommandArgs): Promise<void>
}

export default Command;