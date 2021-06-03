import CommandInfo from './CommandInfo';

interface CommandResult {
  ok: boolean;
  commandInfo?: CommandInfo;
  error?: Error;
}

export default CommandResult;
