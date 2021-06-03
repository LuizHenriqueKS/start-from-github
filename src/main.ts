import CommandArgs from './cmd/CommandArgs';
import defaultCommandManager from './cmd/defaultCommandManager';
import printError from './util/printError';

async function main() {
  const args: CommandArgs = {
    args: process.argv.slice(2),
    directory: process.cwd()
  };
  const response = await defaultCommandManager.run(args);
  if (response.error) {
    printError(response.error);
  }
}

main().then();
