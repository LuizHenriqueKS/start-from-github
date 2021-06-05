import getRespositoryData from './getRepositoryData';
import RepositoryConfig from '../model/RepositoryConfig';
import joinPath from '../util/joinPath';
import readJSONFile from '../util/readJSONFile';

function loadRepositoryConfig(directory: string, filename: string): RepositoryConfig {
  if (filename.startsWith('http://') || filename.startsWith('https://')) {
    return {
      name: getRepositoryName(filename),
      url: filename
    };
  } else {
    return readRepositoryConfig(directory, filename);
  }
}

function getRepositoryName(url: string): string {
  return getRespositoryData(url).name;
}

function readRepositoryConfig(directory: string, filename: string): RepositoryConfig {
  const path = joinPath(directory, filename);
  const config = readJSONFile(path);
  fixSymlink(config);
  return config;
}

function fixSymlink(config: any): any {
  if (config.symlink) {
    if (!Array.isArray(config.symlink)) {
      config.symlink = [config.symlink];
    }
  }
}

export default loadRepositoryConfig;
