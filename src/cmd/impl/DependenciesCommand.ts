import DependenciesInstaller from '../../repository/DependenciesInstaller';
import Command from '../Command';
import CommandArgs from '../CommandArgs';
import loadRepositoryConfigFromArgs from '../../repository/loadRepositoryConfigFromArgs';

class DependenciesCommand implements Command {
  async run(args: CommandArgs): Promise<void> {
    const repositoryConfig = loadRepositoryConfigFromArgs(args);
    const dependenciesInstaller = new DependenciesInstaller(args, repositoryConfig);
    await dependenciesInstaller.install();
    console.log('Finished.');
  }
}

export default DependenciesCommand;
