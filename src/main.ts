import CommandArgs from './cmd/CommandArgs';
import defaultCommandManager from './cmd/defaultCommandManager';
import printError from './util/printError';

async function main() {
  const args: CommandArgs = {
    commandName: process.argv[2],
    args: process.argv.slice(3),
    directory: process.cwd()
  };
  const response = await defaultCommandManager.run(args);
  if (response.error) {
    printError(response.error);
  }
}

main().then();
