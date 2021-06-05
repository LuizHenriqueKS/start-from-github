import defaultCommandManager from '../src/cmd/defaultCommandManager';
import HelpCommand from '../src/cmd/impl/HelpCommand';
import DefaultCommand from '../src/cmd/impl/DefaultCommand';

it('should print the help without args', async () => {
  const result = await defaultCommandManager.run({
    commandName: '',
    directory: '',
    args: []
  });
  expect(result.ok).toBeTruthy();
  expect(result.commandInfo!.command instanceof DefaultCommand).toBeTruthy();
});

it('should print the help with the arg: -help', async () => {
  const result = await defaultCommandManager.run({
    commandName: '-help',
    directory: '',
    args: []
  });
  expect(result.ok).toBeTruthy();
  expect(result.commandInfo!.command instanceof HelpCommand).toBeTruthy();
});

it('should print the help with the arg: --help', async () => {
  const result = await defaultCommandManager.run({
    commandName: '--help',
    directory: '',
    args: []
  });
  expect(result.ok).toBeTruthy();
  expect(result.commandInfo!.command instanceof HelpCommand).toBeTruthy();
});

it('should print the help with the arg: /?', async () => {
  const result = await defaultCommandManager.run({
    commandName: '/?',
    directory: '',
    args: []
  });
  expect(result.ok).toBeTruthy();
  expect(result.commandInfo!.command instanceof HelpCommand).toBeTruthy();
});
