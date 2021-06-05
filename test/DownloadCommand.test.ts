import defaultCommandManager from '../src/cmd/defaultCommandManager';
import writeJSONFile from '../src/util/writeJSONFile';
import getTestFilesDirectory from './getTestFilesDirectory';
import getRepositoryConfigPath from './getRepositoryConfigPath';
import clearTestFiles from './clearTestFiles';

it('should download repository', async () => {
  try {
    await clearTestFiles();
    const directory = getTestFilesDirectory();
    writeJSONFile(getRepositoryConfigPath(), {
      name: 'hello-world',
      url: 'https://github.com/LuizHenriqueKS/hello-world'
    });
    const result = await defaultCommandManager.run({
      commandName: 'download',
      directory,
      args: []
    });
    expect(result.ok).toBeTruthy();
  } finally {
    await clearTestFiles();
  }
}, 10000);
