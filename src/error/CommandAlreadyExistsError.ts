class CommandAlreadyExistsError extends Error {
  name = 'CommandAlreadyExistsError';
  commandName: string;

  constructor(commandName: string) {
    super(`The command already exists: ${commandName}`);
    this.commandName = commandName;
  }
};

export default CommandAlreadyExistsError;
