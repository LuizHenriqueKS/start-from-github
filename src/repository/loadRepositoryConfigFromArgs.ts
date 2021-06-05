import CommandArgs from '../cmd/CommandArgs';
import RepositoryConfig from '../model/RepositoryConfig';
import loadRepositoryConfig from './loadRepositoryConfig';

function loadRepositoryConfigFromArgs(args: CommandArgs): RepositoryConfig {
  const filename = args.args[0] || 'repository.json';
  const directory = args.directory;
  return loadRepositoryConfig(directory, filename);
}

export default loadRepositoryConfigFromArgs;
