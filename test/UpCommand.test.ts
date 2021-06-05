import defaultCommandManager from '../src/cmd/defaultCommandManager';
import writeJSONFile from '../src/util/writeJSONFile';
import getTestFilesDirectory from './getTestFilesDirectory';
import getRepositoryConfigPath from './getRepositoryConfigPath';
import clearTestFiles from './clearTestFiles';

it('should start the repository', async () => {
  try {
    await clearTestFiles();
    const directory = getTestFilesDirectory();
    writeJSONFile(getRepositoryConfigPath(), {
      name: 'hello-world',
      url: 'https://github.com/LuizHenriqueKS/hello-world'
    });
    const output = [''];
    const result = await defaultCommandManager.run({
      commandName: 'up',
      directory,
      args: [],
      out: data => (output[0] += data)
    });
    expect(result.ok).toBeTruthy();
    expect(output[0].includes('-> Hello world <-')).toBeTruthy();
  } finally {
    await clearTestFiles();
  }
});
