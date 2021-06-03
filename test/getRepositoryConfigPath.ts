import path from 'path';
import getTestFilesDirectory from './getTestFilesDirectory';

function getRepositoryConfigPath(): string {
  return path.join(getTestFilesDirectory(), 'repository.json');
}

export default getRepositoryConfigPath;
