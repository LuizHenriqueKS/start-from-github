import fs from 'fs';
import path from 'path';
import defaultCommandManager from '../src/cmd/defaultCommandManager';
import readJSONFile from '../src/util/readJSONFile';
import getTestFilesDirectory from './getTestFilesDirectory';
import unlinkIfExists from './unlinkIfExists';

it('should create a config json file', async () => {
  const filePath = getFilePath();
  unlinkIfExists(filePath);
  const result = await defaultCommandManager.run({
    commandName: 'init',
    args: [],
    directory: getTestFilesDirectory()
  });
  const existed = fs.existsSync(filePath);
  unlinkIfExists(filePath);
  expect(existed).toBeTruthy();
  expect(result.ok).toBeTruthy();
});

it('should create a config json file with hello-name.json', async () => {
  const filePath = getFilePath('hello-name.json');
  unlinkIfExists(filePath);
  const result = await defaultCommandManager.run({
    commandName: 'init',
    args: ['hello-name.json'],
    directory: getTestFilesDirectory()
  });
  const existed = fs.existsSync(filePath);
  unlinkIfExists(filePath);
  expect(existed).toBeTruthy();
  expect(result.ok).toBeTruthy();
});

it('should create a config json file from a URL', async () => {
  const filePath = getFilePath();
  const url = 'https://github.com/LuizHenriqueKS/hello-world';
  unlinkIfExists(filePath);
  const result = await defaultCommandManager.run({
    commandName: 'init',
    args: [url],
    directory: getTestFilesDirectory()
  });
  const existed = fs.existsSync(filePath);
  expect(existed).toBeTruthy();
  const config = readJSONFile(filePath);
  expect(config.name).toBe('hello-world');
  expect(config.url).toBe(url);
  unlinkIfExists(filePath);
  expect(result.ok).toBeTruthy();
});

function getFilePath(filename?: string): string {
  if (filename) {
    return path.join(getTestFilesDirectory(), filename);
  } else {
    return path.join(getTestFilesDirectory(), 'repository.json');
  }
}
