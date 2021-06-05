import { spawn } from 'child_process';
import TerminalCommandOptions from './TerminalCommandOptions';
import isOSWindows from '../util/isOSWindows';
import TerminalCommand from './TerminalCommand';

const onExit = require('async-exit-hook');

function runTerminalCommand(command: string, options?: TerminalCommandOptions): TerminalCommand {
  const args = options ? options.args : [];
  const cwd = options ? options.cwd : undefined;
  const childProcess = startCommand(command, args, cwd);
  const terminalCommand = new TerminalCommand(childProcess);
  terminalCommand.redirectOutputsToConsole();
  terminalCommand.out = options?.out;
  onExit(() => terminalCommand.interrupt());
  return terminalCommand;
}

function startCommand(command: string, args: string[], cwd?: string) {
  if (isOSWindows()) {
    return spawn('cmd.exe', ['/c', command, ...args], { cwd });
  } else {
    return spawn(command, args, { cwd });
  }
}

export default runTerminalCommand;
