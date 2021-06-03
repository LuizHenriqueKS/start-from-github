import CommandArgs from '../cmd/CommandArgs';
import RepositoryVersion from '../model/RepositoryVersion';
import getRepositoryVersionPath from './getRepositoryVersionPath';
import fs from 'fs';
import readJSONFile from '../util/readJSONFile';
import RepositoryConfig from '../model/RepositoryConfig';

function loadRepositoryVersion(args: CommandArgs, repositoryConfig: RepositoryConfig): RepositoryVersion | undefined {
  const repositoryVersionPath = getRepositoryVersionPath(args.directory, repositoryConfig.name);
  if (fs.existsSync(repositoryVersionPath)) {
    return readJSONFile(repositoryVersionPath);
  }
  return undefined;
}

export default loadRepositoryVersion;
