import { ChildProcess } from 'child_process';

class TerminalCommand {
  out?: (data: string) => void;
  #childProcess: ChildProcess;

  constructor(childProcess: ChildProcess) {
    this.#childProcess = childProcess;
  }

  redirectOutputsToConsole() {
    if (this.#childProcess.stdout) {
      this.#childProcess.stdout.on('data', (data) => {
        console.log(`${data}`);
        if (this.out) this.out(`${data}`);
      });
    }

    if (this.#childProcess.stderr) {
      this.#childProcess.stderr.on('data', (data) => {
        console.log(`${data}`);
        if (this.out) this.out(`${data}`);
      });
    }

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
