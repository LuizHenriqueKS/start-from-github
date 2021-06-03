import path from 'path';

function joinPath(directory: string, filename: string): string {
  if (path.isAbsolute(filename)) {
    return filename;
  } else {
    return path.join(directory, filename);
  }
}

export default joinPath;
