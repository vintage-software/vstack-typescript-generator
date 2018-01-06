#! /usr/bin/env node

import * as fs from 'fs';
import * as globby from 'globby';
import * as path from 'path';

import { Config } from './config';
import { writeFile } from './helpers/fs.helpers';
import { Options } from './options';
import { OutputItem } from './output-item';
import { tsGenerator } from './tsgen';

const defaultConfigFileName = 'tsgen.json';

(() => {
  const configFilePath = getConfigFilePath();
  const workingDirectory = path.dirname(configFilePath);

  const config = require(configFilePath);

  if (config.outDir === undefined) {
    throw new Error('Invalid config: must specify an outDir.');
  }

  const sourcePaths = globby.sync(config.src, { cwd: workingDirectory })
    .map(file => path.normalize(path.join(workingDirectory, file)));

  const outputItems = generateOutput(sourcePaths, config.options);
  writeOutput(workingDirectory, config, outputItems);
})();

function getConfigFilePath() {
  let configFileName = defaultConfigFileName;
  if (process.argv.length > 2) {
    configFileName = process.argv[2];
  }

  try {
    const stats = fs.lstatSync(configFileName);

    if (!stats.isFile()) {
      throw new Error(`${configFileName} is not a file.`);
    }
  } catch {
    throw new Error(`${configFileName} does not exist.`);
  }

  return path.normalize(path.join(process.cwd(), configFileName));
}

function generateOutput(sourcePaths: string[], options: Options) {
  const outputItems = [];
  for (const filePath of sourcePaths) {
    const name = path.basename(filePath, '.cs');

    const csharp = fs.readFileSync(filePath).toString();
    const typescript = tsGenerator(csharp, options);

    outputItems.push(new OutputItem(name, typescript));
  }

  return outputItems;
}

function writeOutput(workingDirectory: string, config: Config, outputItems: OutputItem[]) {
  const outputDirPath = path.normalize(path.join(workingDirectory, config.outDir));
  const generatedFilePath = path.join(outputDirPath, 'generated.ts');

  const importPaths = [...(config.imports || [])]
    .map(importPath => path.isAbsolute(importPath) ? importPath : path.normalize(path.join(workingDirectory, importPath)));

  const tsCode = outputItems.map(item => item.typescript);

  if (importPaths.length) {
    const importCode = importPaths
      .map(importPath => generateImports(importPath, outputDirPath))
      .join('\n\n');

    tsCode.unshift(importCode);
  }

  const concatenatedTypescript = tsCode
    .map(code => code.trim())
    .filter(code => code !== undefined && code.length > 0)
    .join('\n\n');

  writeFile(generatedFilePath, `/* tslint:disable */\n\n${concatenatedTypescript}\n`);
  writeIndex(workingDirectory, generatedFilePath, config);
}

function writeIndex(workingDirectory: string, generatedFilePath: string, config: Config) {
  const outputDirPath = path.dirname(generatedFilePath);
  const indexFilePath = path.join(outputDirPath, 'index.ts');

  const exportPaths = [...(config.exports || []), generatedFilePath]
    .map(exportPath => path.isAbsolute(exportPath) ? exportPath : path.normalize(path.join(workingDirectory, exportPath)));

  const exportCode = exportPaths
    .map(exportPath => generateExports(exportPath, outputDirPath))
    .join('\n\n');

  writeFile(indexFilePath, `/* tslint:disable */\n\n${exportCode}\n`);
}

function generateImports(sourcePath: string, outputDirPath: string) {
  return generateImportsOrExports('import', sourcePath, outputDirPath);
}

function generateExports(sourcePath: string, outputDirPath: string) {
  return generateImportsOrExports('export', sourcePath, outputDirPath);
}

function generateImportsOrExports(type: 'import' | 'export', sourcePath: string, outputDirPath: string) {
  const exportRegex = /export\s+(?:(?:(?:class|const|enum|interface|function|type)\s+([0-9A-Za-z_]+))|(?:{\s+([0-9A-Za-z_]+)\s+}))/g;

  const source = fs.readFileSync(sourcePath).toString();

  let match: RegExpExecArray;
  const exportedNames: string[] = [];
  while ((match = exportRegex.exec(source)) !== null) {
    exportedNames.push(match[1] ? match[1] : match[2]);
  }

  const relativeReferencePath = path.relative(outputDirPath, sourcePath).replace(/\\/g, '/').replace(/\.ts$/, '');
  return `${type} {\n  ${exportedNames.join(',\n  ')}\n} from './${relativeReferencePath}';`;
}
