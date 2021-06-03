import fs from 'fs';

function unlinkIfExists(file: string) {
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
  }
}

export default unlinkIfExists;
