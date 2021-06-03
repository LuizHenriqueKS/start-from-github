import path from 'path';

function getRepositoryVersionPath(directory: string, name: string) {
  return path.join(directory, 'repositories', name + '.version.json');
}

export default getRepositoryVersionPath;
