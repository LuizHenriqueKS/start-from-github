import getRepositoryData from './getRepositoryData';
import RepositoryConfig from '../model/RepositoryConfig';
import RepositoryVersion from '../model/RepositoryVersion';
import axios from 'axios';

async function requestOnlineRepositoryVersion(repositoryConfig: RepositoryConfig): Promise<RepositoryVersion> {
  console.log(`Getting version data from '${repositoryConfig.url}'...`);
  const repositoryData = getRepositoryData(repositoryConfig.url);
  const response = await axios.get(`https://api.github.com/repos/${repositoryData.user}/${repositoryData.name}`);
  return {
    name: repositoryConfig.name,
    updatedAt: response.data.updated_at,
    dirname: repositoryConfig.name
  };
}

export default requestOnlineRepositoryVersion;
