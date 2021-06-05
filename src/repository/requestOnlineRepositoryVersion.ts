import getRepositoryData from './getRepositoryData';
import RepositoryConfig from '../model/RepositoryConfig';
import RepositoryVersion from '../model/RepositoryVersion';
import axios from 'axios';

async function requestOnlineRepositoryVersion(repositoryConfig: RepositoryConfig): Promise<RepositoryVersion> {
  console.log(`Getting version data from '${repositoryConfig.url}'...`);
  const repositoryData = getRepositoryData(repositoryConfig.url);
  const headers = buildHeaders(repositoryConfig.token);
  const response = await axios.get(`https://api.github.com/repos/${repositoryData.user}/${repositoryData.name}`, {
    headers
  });
  return {
    name: repositoryConfig.name,
    updatedAt: response.data.updated_at,
    dirname: repositoryConfig.name
  };
}

function buildHeaders(token?: string): any {
  const headers: any = {};
  if (token) {
    headers.Authorization = `token ${token}`;
  }
  return headers;
}

export default requestOnlineRepositoryVersion;
