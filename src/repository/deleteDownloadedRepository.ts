import RepositoryVersion from '../model/RepositoryVersion';
import trash from 'trash';
import getDownloadedRepositoryDir from './getDownloadedRepositoryDir';

async function deleteDownloadedRepository(directory: string, repositoryVersion: RepositoryVersion): Promise<void> {
  const dir = getDownloadedRepositoryDir(directory, repositoryVersion);
  console.log(`Moving to the recycling bin: ${dir}`);
  await trash(dir);
}

export default deleteDownloadedRepository;
