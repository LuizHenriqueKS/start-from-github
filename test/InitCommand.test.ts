import fs from 'fs';
import path from 'path';
import defaultCommandManager from '../src/cmd/defaultCommandManager';

it('should create a config json file', async () => {
  const filePath = getFilePath();
  unlinkIfExists(filePath);
  const result = await defaultCommandManager.run({
    args: ['init'],
    directory: getDirectory()
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
    args: ['init', 'hello-name.json'],
    directory: getDirectory()
  });
  const existed = fs.existsSync(filePath);
  unlinkIfExists(filePath);
  expect(existed).toBeTruthy();
  expect(result.ok).toBeTruthy();
});

function unlinkIfExists(file: string) {
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
  }
}

function getFilePath(filename?: string): string {
  if (filename) {
    return path.join(getDirectory(), filename);
  } else {
    return path.join(getDirectory(), 'repository.json');
  }
}

function getDirectory(): string {
  return path.resolve('./test_files/');
}
