import Command from '../Command';
import CommandArgs from '../CommandArgs';
import loadRepositoryConfigFromArgs from '../../repository/loadRepositoryConfigFromArgs';
import RepositoryRunner from '../../repository/RepositoryRunner';

class UpCommand implements Command {
  async run(args: CommandArgs): Promise<void> {
    const repositoryConfig = loadRepositoryConfigFromArgs(args);
    const runner = new RepositoryRunner(args, repositoryConfig);
    await runner.run();
  }
}

export default UpCommand;
