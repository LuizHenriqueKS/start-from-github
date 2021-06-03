class FileAlreadyExistsError extends Error {
  constructor(path: string) {
    super(`File already exists: ${path}`);
    this.name = 'FileAlreadyExistsError';
  }
}

export default FileAlreadyExistsError;