import RepositoryData from '../model/RepositoryData';
import { ZStr } from 'z-str';

function getRepositoryData(url: string): RepositoryData {
  const str = new ZStr(url, { ignoreErrors: true });
  const user = str.from('//').from('/').till('/').toString();
  const name = str.from('//').from('/').from('/').till(['/', '?']).toString();
  return { user, name };
}

export default getRepositoryData;
