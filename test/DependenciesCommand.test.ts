import defaultCommandManager from '../src/cmd/defaultCommandManager';
import writeJSONFile from '../src/util/writeJSONFile';
import getTestFilesDirectory from './getTestFilesDirectory';
import getRepositoryConfigPath from './getRepositoryConfigPath';
import clearTestFiles from './clearTestFiles';

it('should install dependencies', async () => {
  try {
    await clearTestFiles();
    const directory = getTestFilesDirectory();
    writeJSONFile(getRepositoryConfigPath(), {
      name: 'hello-world',
      url: 'https://github.com/LuizHenriqueKS/hello-world'
    });
    const result = await defaultCommandManager.run({
      directory,
      args: ['download']
    });
    expect(result.ok).toBeTruthy();
    const result2 = await defaultCommandManager.run({
      directory,
      args: ['dependencies']
    });
    expect(result2.ok).toBeTruthy();
  } finally {
    await clearTestFiles();
  }
});
