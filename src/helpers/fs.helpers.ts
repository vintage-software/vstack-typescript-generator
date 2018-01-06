import * as fs from 'fs';
import * as path from 'path';

export function writeFile(filePath: string, contents: string) {
  filePath = path.normalize(filePath);

  ensureDirectoryExists(filePath);
  fs.writeFileSync(filePath, contents);

  console.log(`${filePath} written.`);
}

export function ensureDirectoryExists(filePath: string) {
  const dirname = path.dirname(filePath);

  if (!fs.existsSync(dirname) || !fs.statSync(dirname).isDirectory()) {
    ensureDirectoryExists(dirname);
    fs.mkdirSync(dirname);
  }
}
