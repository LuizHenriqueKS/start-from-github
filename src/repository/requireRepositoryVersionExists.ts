import RepositoryConfig from '../model/RepositoryConfig';
import fs from 'fs';
import getRepositoryVersionPath from './getRepositoryVersionPath';
import FileNotFoundError from '../error/FileNotFoundError';

function requireRepositoryVersionExists(directory: string, repositoryConfig: RepositoryConfig) {
  const repositoryVersionPath = getRepositoryVersionPath(directory, repositoryConfig.name);
  if (!fs.existsSync(repositoryVersionPath)) {
    throw new FileNotFoundError(repositoryVersionPath);
  }
}

export default requireRepositoryVersionExists;
