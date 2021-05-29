import fs from 'fs';
import path from 'path';

const srcPath = path.resolve("./src");
const outPath = path.resolve("./out");

fs.symlinkSync(srcPath, outPath);

console.log('-> Test: OK <-');
