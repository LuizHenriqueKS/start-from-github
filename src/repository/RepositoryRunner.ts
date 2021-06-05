import CommandArgs from '../cmd/CommandArgs';
import RepositoryConfig from '../model/RepositoryConfig';
import runTerminalCommandEx from '../terminal/runTerminalCommandEx';
import TerminalCommand from '../terminal/TerminalCommand';
import DependenciesInstaller from './DependenciesInstaller';
import getDownloadedRepositoryDir from './getDownloadedRepositoryDir';
import loadRepositoryVersion from './loadRepositoryVersion';
import RepositoryDownloader from './RepositoryDownloader';
import requireRepositoryVersionExists from './requireRepositoryVersionExists';
import SymlinkMaker from './SymlinkMaker';
import express from 'express';
import * as http from 'http';

class RepositoryRunner {
  readonly args: CommandArgs;
  readonly repositoryConfig: RepositoryConfig;
  #terminalCommand?: TerminalCommand;
  #webhook?: http.Server;
  #restart: boolean;

  constructor(args: CommandArgs, repositoryConfig: RepositoryConfig) {
    this.args = args;
    this.repositoryConfig = repositoryConfig;
    this.#restart = false;
  }

  async run(): Promise<void> {
    try {
      await this.startWebhook();
      do {
        this.#restart = false;
        await this.download();
        await this.symlinks();
        await this.installDependencies();
        await this.runPreCommands();
        await this.start();
        console.log('Exited');
      } while (this.#restart);
    } finally {
      await this.closeWebhook();
    }
  }

  private async download() {
    const downloader = new RepositoryDownloader(this.args, this.repositoryConfig);
    await downloader.download();
  }

  private async symlinks() {
    const symlinkMaker = new SymlinkMaker(this.args, this.repositoryConfig);
    await symlinkMaker.make();
  }

  private async installDependencies() {
    const installer = new DependenciesInstaller(this.args, this.repositoryConfig);
    await installer.install();
  }

  private async runPreCommands() {
    if (this.repositoryConfig.preCommands) {
      requireRepositoryVersionExists(this.args.directory, this.repositoryConfig);
      const repositoryVersion = loadRepositoryVersion(this.args, this.repositoryConfig);
      const repositoryDirectory = getDownloadedRepositoryDir(this.args.directory, repositoryVersion!);
      const cwd = repositoryDirectory;
      const out = this.args.out;
      for (const preCommand of this.repositoryConfig.preCommands) {
        console.log(`Run pre command: '${preCommand}'...`);
        await runTerminalCommandEx(preCommand, { cwd, out }).waitForClose();
      }
    }
  }

  private startWebhook(): Promise<void> {
    return new Promise<void>(resolve => {
      if (this.repositoryConfig.webhookPort) {
        const app = express();
        app.get('/close', (req, res) => {
          this.#terminalCommand!.interrupt();
          res.send({ ok: true });
        });
        app.get('/update', (req, res) => {
          this.#restart = true;
          this.#terminalCommand!.interrupt();
          res.send({ ok: true });
        });
        this.#webhook = app.listen(this.repositoryConfig.webhookPort, () => {
          console.log(`Webhook started with port ${this.repositoryConfig.webhookPort}.`);
          resolve();
        });
      } else {
        resolve();
      }
    });
  }

  private async closeWebhook(): Promise<void> {
    if (this.#webhook) {
      this.#webhook.close();
    }
  }

  private async start() {
    this.#terminalCommand = this.runStartCommand();
    await this.#terminalCommand.waitForClose();
  }

  private runStartCommand() {
    console.log(`Run '${this.repositoryConfig.name}'...`);
    requireRepositoryVersionExists(this.args.directory, this.repositoryConfig);
    const repositoryVersion = loadRepositoryVersion(this.args, this.repositoryConfig);
    const repositoryDirectory = getDownloadedRepositoryDir(this.args.directory, repositoryVersion!);
    const cwd = repositoryDirectory;
    const out = this.args.out;
    if (this.repositoryConfig.startCommand) {
      return runTerminalCommandEx(this.repositoryConfig.startCommand, { cwd, out });
    } else {
      return runTerminalCommandEx('npm start', { cwd, out });
    }
  }
}

export default RepositoryRunner;
