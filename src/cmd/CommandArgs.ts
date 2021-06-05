interface CommandArgs {
  commandName: string;
  args: string[];
  directory: string;
  out?: (data: string) => void;
}

export default CommandArgs;
