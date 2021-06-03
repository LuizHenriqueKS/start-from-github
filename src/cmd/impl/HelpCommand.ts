import Command from '../Command';
import CommandArgs from '../CommandArgs';

class HelpCommand implements Command {
  async run(args: CommandArgs): Promise<void> {
    console.log('How to use:');
    console.log('\tnpx start-from-github init [filename]');
    console.log('\tnpx start-from-github <github_repository_url>');
    console.log('\r\nhttps://www.npmjs.com/package/start-from-github');
  }
}

export default HelpCommand;
