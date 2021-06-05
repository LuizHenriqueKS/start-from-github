import { ChildProcess } from 'child_process';
import kill from 'tree-kill';

class TerminalCommand {
  out?: (data: string) => void;
  #childProcess: ChildProcess;
  #finished: boolean;

  constructor(childProcess: ChildProcess) {
    this.#childProcess = childProcess;
    this.#finished = false;
    this.#childProcess.once('exit', (code) => {
      this.#finished = true;
    });
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
      this.#childProcess.once('exit', (code) => {
        resolve();
      });
    });
  }

  interrupt() {
    if (!this.#finished) {
      const pid = this.#childProcess.pid;
      kill(pid);
    }
  }
}

export default TerminalCommand;
