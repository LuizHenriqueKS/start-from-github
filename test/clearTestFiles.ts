import fs from 'fs';
import path from 'path';
import getTestFilesDirectory from './getTestFilesDirectory';

async function clearTestFiles() {
  const directory = getTestFilesDirectory();
  const files = await fs.promises.opendir(directory);
  for await (const file of files) {
    const filePath = path.join(directory, file.name);
    fs.rmSync(filePath, { recursive: true });
  }
}

export default clearTestFiles;
