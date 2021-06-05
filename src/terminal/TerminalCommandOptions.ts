interface TerminalCommandOptions {
  args: string[];
  cwd: string;
  out?: (data: string) => void;
}

export default TerminalCommandOptions;
