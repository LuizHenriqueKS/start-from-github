class FileNotFoundError extends Error {
  readonly path: string;

  constructor(path: string) {
    super(`File not found: ${path}`);
    this.name = 'FileNotFoundError';
    this.path = path;
  }
}

export default FileNotFoundError;
