import CommandManager from './CommandManager';
import HelpCommand from './impl/HelpCommand';
import InitCommand from './impl/InitCommand';
import DownloadCommand from './impl/DownloadCommand';
import SymlinkCommand from './impl/SymlinkCommand';
import DependenciesCommand from './impl/DependenciesCommand';
import UpCommand from './impl/UpCommand';
import DefaultCommand from './impl/DefaultCommand';

function defaultCommandManager(): CommandManager {
  const commandManager = new CommandManager();
  const helpCommand = new HelpCommand();

  commandManager.defaultCommand = helpCommand;

  commandManager.addCommand('help', helpCommand);
  commandManager.addCommand('/?', helpCommand);

  commandManager.addCommand('init', new InitCommand());
  commandManager.addCommand('download', new DownloadCommand());
  commandManager.addCommand('symlink', new SymlinkCommand());
  commandManager.addCommand('dependencies', new DependenciesCommand());
  commandManager.addCommand('up', new UpCommand());

  commandManager.defaultCommand = new DefaultCommand();

  return commandManager;
}

export default defaultCommandManager();
