import path from 'path';

function getTestFilesDirectory(): string {
  return path.resolve('./test_files/');
}

export default getTestFilesDirectory;
