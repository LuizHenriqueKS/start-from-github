import DependenciesInstaller from '../../repository/DependenciesInstaller';
import Command from '../Command';
import CommandArgs from '../CommandArgs';

class DependenciesCommand implements Command {
  async run(args: CommandArgs): Promise<void> {
    const filename = args.args[0];
    const dependenciesInstaller = new DependenciesInstaller(args, filename);
    await dependenciesInstaller.install();
    console.log('Finished.');
  }
}

export default DependenciesCommand;
