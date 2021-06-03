class CommandNotFoundError extends Error {
  readonly args: string[];

  constructor(args: string[]) {
    super('Command not found for: ' + args.join(' '));
    this.name = 'CommandNotFoundError';
    this.args = args;
  }
}

export default CommandNotFoundError;
