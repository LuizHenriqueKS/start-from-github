import getRespositoryData from './getRepositoryData';
import CommandArgs from '../cmd/CommandArgs';
import RepositoryConfig from '../model/RepositoryConfig';
import joinPath from '../util/joinPath';
import readJSONFile from '../util/readJSONFile';

function loadRepositoryConfig(args: CommandArgs, filename: string): RepositoryConfig {
  if (filename.startsWith('http://') || filename.startsWith('https://')) {
    return {
      name: getRepositoryName(filename),
      url: filename
    };
  } else {
    return readRepositoryConfig(args, filename);
  }
}

function getRepositoryName(url: string): string {
  return getRespositoryData(url).name;
}

function readRepositoryConfig(args: CommandArgs, filename: string): RepositoryConfig {
  const path = joinPath(args.directory, filename);
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
