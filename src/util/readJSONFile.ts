import fs from 'fs';

function readJSONFile(path: string) {
  const content = fs.readFileSync(path).toString();
  const json = JSON.parse(content);
  return json;
}

export default readJSONFile;
