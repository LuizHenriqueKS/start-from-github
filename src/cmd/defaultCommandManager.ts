import CommandManager from './CommandManager';
import HelpCommand from './impl/HelpCommand';
import InitCommand from './impl/InitCommand';
import DownloadCommand from './impl/DownloadCommand';

function defaultCommandManager(): CommandManager {
  const commandManager = new CommandManager();
  const helpCommand = new HelpCommand();

  commandManager.defaultCommand = helpCommand;

  commandManager.addCommand('help', helpCommand);
  commandManager.addCommand('/?', helpCommand);

  commandManager.addCommand('init', new InitCommand());
  commandManager.addCommand('download', new DownloadCommand());
  // commandManager.addCommand('up', new StartCommand());

  // commandManager.defaultCommand = new DefaultCommand(helpCommand);

  return commandManager;
}

export default defaultCommandManager();
