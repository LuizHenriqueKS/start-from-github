import TerminalCommandOptionsEx from './TerminalCommandOptionsEx';
import runTerminalCommand from './runTerminalCommand';
import TerminalCommand from './TerminalCommand';
import { ZStr } from 'z-str';

function runTerminalCommandEx(command: string, options: TerminalCommandOptionsEx): TerminalCommand {
  const allArgs = parseArgs(command);
  const commandName = allArgs[0];
  const args = allArgs.slice(1);
  return runTerminalCommand(commandName, { ...options, args });
}

function parseArgs(command: string): string[] {
  const result = [];
  let str = new ZStr(command, { ignoreErrors: true });
  while (!str.isEmpty()) {
    const searchResult = str.findFirst([' ', '"']);
    const pattern = searchResult.pattern;
    if (!searchResult.valid) {
      result.push(str.toString());
      break;
    } else if (pattern === ' ') {
      const arg = str.till(pattern).toString();
      if (arg !== '') result.push(arg);
      if (!str.containsAny(' ')) break;
      str = str.from(pattern);
    } else {
      const arg = str.till(pattern).toString();
      if (arg !== '') result.push(arg);
      str = str.from(pattern);
      result.push(str.till(pattern).toString());
      str = str.from(pattern);
    }
  }
  return result;
}

export default runTerminalCommandEx;
