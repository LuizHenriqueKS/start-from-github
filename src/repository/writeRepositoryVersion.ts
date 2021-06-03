import RepositoryVersion from '../model/RepositoryVersion';
import getRepositoryVersionPath from './getRepositoryVersionPath';
import writeJSONFile from '../util/writeJSONFile';

function writeRepositoryVersion(directory: string, repositoryVersion: RepositoryVersion) {
  const repositoryVersionPath = getRepositoryVersionPath(directory, repositoryVersion.name);
  writeJSONFile(repositoryVersionPath, repositoryVersion);
}

export default writeRepositoryVersion;
