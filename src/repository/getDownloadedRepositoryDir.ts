import RepositoryVersion from '../model/RepositoryVersion';
import path from 'path';
import InvalidRepositoryDirectoryError from '../error/InvalidRepositoryDirectoryError';

function getDownloadedRepositoryDir(directory: string, repositoryVersion: RepositoryVersion): string {
  if (repositoryVersion.dirname === '') throw new InvalidRepositoryDirectoryError(directory);
  return path.join(directory, 'repositories', repositoryVersion.dirname);
}

export default getDownloadedRepositoryDir;
