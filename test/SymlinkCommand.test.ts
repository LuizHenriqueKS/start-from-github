import defaultCommandManager from '../src/cmd/defaultCommandManager';
import writeJSONFile from '../src/util/writeJSONFile';
import getTestFilesDirectory from './getTestFilesDirectory';
import getRepositoryConfigPath from './getRepositoryConfigPath';
import path from 'path';
import clearTestFiles from './clearTestFiles';
import loadRepositoryVersion from '../src/repository/loadRepositoryVersion';
import getDownloadedRepositoryDir from '../src/repository/getDownloadedRepositoryDir';
import CommandArgs from '../src/cmd/CommandArgs';
import fs from 'fs';
import loadRepositoryConfigFromArgs from '../src/repository/loadRepositoryConfigFromArgs';

it('should create symlinks', async () => {
  try {
    await clearTestFiles();
    const directory = getTestFilesDirectory();

    const symlinks = buildSymlinks();

    writeJSONFile(getRepositoryConfigPath(), {
      name: 'hello-world',
      url: 'https://github.com/LuizHenriqueKS/hello-world',
      symlinks
    });

    const args = {
      commandName: '',
      directory,
      args: []
    };

    const result = await defaultCommandManager.run({ ...args, commandName: 'download' });
    expect(result.ok).toBeTruthy();

    const result2 = await defaultCommandManager.run({ ...args, commandName: 'symlink' });
    expect(result2.ok).toBeTruthy();

    const testTxtContent = readDataTestTxt(args);
    expect(testTxtContent).toBe('Hi');
  } finally {
    await clearTestFiles();
  }
}, 10000);

function buildSymlinks(): Record<string, string>[] {
  const symlinks: Record<string, string>[] = [{}];
  const source: string = path.resolve('./data');
  const destination = 'data';
  symlinks[0][source] = destination;
  return symlinks;
}

function readDataTestTxt(args: CommandArgs): string {
  const repositoryConfig = loadRepositoryConfigFromArgs(args);
  const repositoryVersion = loadRepositoryVersion(args, repositoryConfig);
  const repositoryDirectory = getDownloadedRepositoryDir(args.directory, repositoryVersion!);
  const testTxt = path.join(repositoryDirectory, 'data', 'test.txt');
  const testTxtContent = fs.readFileSync(testTxt).toString();
  return testTxtContent;
}
