class InvalidRepositoryDirectoryError extends Error {
  readonly directory: string;

  constructor(directory: string) {
    super(`Repository directory is invalid: ${directory}`);
    this.directory = directory;
    this.name = 'InvalidRepositoryDirectoryError';
  }
}

export default InvalidRepositoryDirectoryError;
