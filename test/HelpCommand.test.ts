import defaultCommandManager from '../src/cmd/defaultCommandManager';
import HelpCommand from '../src/cmd/impl/HelpCommand';

it('should print the help without args', async () => {
  const result = await defaultCommandManager.run({
    directory: '',
    args: []
  });
  expect(result.ok).toBeTruthy();
  expect(result.commandInfo!.command instanceof HelpCommand).toBeTruthy();
});

it('should print the help with the arg: -help', async () => {
  const result = await defaultCommandManager.run({
    directory: '',
    args: ['-help']
  });
  expect(result.ok).toBeTruthy();
  expect(result.commandInfo!.command instanceof HelpCommand).toBeTruthy();
});

it('should print the help with the arg: --help', async () => {
  const result = await defaultCommandManager.run({
    directory: '',
    args: ['--help']
  });
  expect(result.ok).toBeTruthy();
  expect(result.commandInfo!.command instanceof HelpCommand).toBeTruthy();
});

it('should print the help with the arg: /?', async () => {
  const result = await defaultCommandManager.run({
    directory: '',
    args: ['/?']
  });
  expect(result.ok).toBeTruthy();
  expect(result.commandInfo!.command instanceof HelpCommand).toBeTruthy();
});
