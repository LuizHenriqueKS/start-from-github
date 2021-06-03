import fs from 'fs';

function writeJSONFile(path: string, json: any) {
  const content = JSON.stringify(json, null, 2);
  fs.writeFileSync(path, content);
}

export default writeJSONFile;
