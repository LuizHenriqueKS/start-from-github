import CommandAlreadyExistsError from '../error/CommandAlreadyExistsError';
import CommandInfo from './CommandInfo';
import Command from './Command';
import CommandArgs from './CommandArgs';
import CommandResult from './commandResult';
import CommandNotFoundError from '../error/CommandNotFoundError';

class CommandManager {
  #commandMap: Map<string, CommandInfo>;
  defaultCommand?: Command;

  constructor() {
    this.#commandMap = new Map();
  }

  addCommand(name: string, command: Command) {
    this.requireCommandNonExists(name);
    const cmdInfo: CommandInfo = {
      name, command
    };
    this.#commandMap.set(name, cmdInfo);
  }

  async run(args: CommandArgs): Promise<CommandResult> {
    let commandInfo: CommandInfo | undefined;
    try {
      const commandName = args.commandName;
      commandInfo = this.findCommandInfo(commandName);
      commandInfo = this.ifIsNullChangeToDefaultCommand(commandInfo);
      if (commandInfo) {
        await commandInfo.command.run(args);
        return { ok: true, commandInfo };
      }
      throw new CommandNotFoundError(args.args);
    } catch (e) {
      return { ok: false, commandInfo, error: e };
    }
  }

  private ifIsNullChangeToDefaultCommand(commandInfo?: CommandInfo) {
    if (!commandInfo && this.defaultCommand) {
      return { name: '', command: this.defaultCommand };
    }
    return commandInfo;
  }

  private findCommandInfo(name: string): CommandInfo | undefined {
    if (name) {
      for (const cmdInfo of this.#commandMap.values()) {
        const cmdName = cmdInfo.name.split('-').join('');
        const inName = name.split('-').join('');
        if (cmdName.toLowerCase() === inName.toLowerCase()) {
          return cmdInfo;
        }
      }
    }
    return undefined;
  }

  private requireCommandNonExists(name: string) {
    if (this.#commandMap.has(name)) {
      throw new CommandAlreadyExistsError(name);
    }
  }
}

export default CommandManager;
