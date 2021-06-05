import { ChildProcess } from 'child_process';

class TerminalCommand {
  #childProcess: ChildProcess;

  constructor(childProcess: ChildProcess) {
    this.#childProcess = childProcess;
  }

  redirectOutputsToConsole() {
    this.#childProcess.stdout.on('data', (data) => {
      console.log(`${data}`);
    });

    this.#childProcess.stderr.on('data', (data) => {
      console.error(`${data}`);
    });

    this.#childProcess.on('error', (error) => {
      console.error(`${error.message}`);
    });
  }

  waitForClose(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.#childProcess.on('close', (code) => {
        resolve();
      });
    });
  }

  interrupt() {
    this.#childProcess.kill();
  }
}

export default TerminalCommand;
