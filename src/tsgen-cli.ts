#! /usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import * as globby from 'globby';

import { Config } from './config';
import { Options } from './options';
import { OutputItem } from './output-item';
import { tsGenerator } from './tsgen';
import { generateSchema } from './generate-schema';
import { safeWriteFileSync } from './fs.utilities';

const defaultConfigFileName = 'tsgen.json';

(function() {
  let configFilePath = getConfigFilePath();
  let workingDirectory = path.dirname(configFilePath);

  let config = require(configFilePath);

  if (config.outDir === undefined) {
    throw 'Invalid config: must specify an outDir.';
  }

  let sourcePaths = globby.sync(config.src, { cwd: workingDirectory })
    .map(file => path.normalize(path.join(workingDirectory, file)));

  let outputItems = generateOutput(sourcePaths, config.options);
  writeOutput(workingDirectory, config, outputItems);
})();

function getConfigFilePath() {
  let configFileName = defaultConfigFileName;
  if (process.argv.length > 2) {
    configFileName = process.argv[2];
  }

  try {
    let stats = fs.lstatSync(configFileName);

    if (!stats.isFile()) {
      throw `${configFileName} is not a file.`;
    }
  } catch (e) {
    throw `${configFileName} does not exist.`;
  }

  return path.normalize(path.join(process.cwd(), configFileName));
}

function generateOutput(sourcePaths: string[], options: Options) {
  let outputItems = [];
  for (let filePath of sourcePaths) {
    let name = path.basename(filePath, '.cs');

    let csharp = fs.readFileSync(filePath).toString();
    let typescript = tsGenerator(csharp, options);

    outputItems.push(new OutputItem(name, typescript));
  }

  const csharps = sourcePaths.map(filePath => fs.readFileSync(filePath).toString());
  outputItems.push(new OutputItem('schema', generateSchema(csharps)));

  return outputItems;
}

function writeOutput(workingDirectory: string, config: Config, outputItems: OutputItem[]) {
  let outputDirPath = path.normalize(path.join(workingDirectory, config.outDir));
  let generatedFilePath = path.join(outputDirPath, 'generated.ts');

  let importPaths = [...(config.imports || [])]
    .map(importPath => path.isAbsolute(importPath) ? importPath : path.normalize(path.join(workingDirectory, importPath)));

  let tsCode = outputItems.map(item => item.typescript);

  if (importPaths.length) {
    let importCode = importPaths
      .map(importPath => generateImports(importPath, outputDirPath))
      .join('\n\n');

    tsCode.unshift(importCode);
  }

  let concatenatedTypescript = tsCode
    .map(code => code.trim())
    .filter(code => code !== undefined && code.length > 0)
    .join('\n\n');

  safeWriteFileSync(generatedFilePath, `/* tslint:disable */\n\n${concatenatedTypescript}\n`);
  writeIndex(workingDirectory, generatedFilePath, config);
}

function writeIndex(workingDirectory: string, generatedFilePath: string, config: Config) {
  let outputDirPath = path.dirname(generatedFilePath);
  let indexFilePath = path.join(outputDirPath, 'index.ts');

  let exportPaths = [...(config.exports || []), generatedFilePath]
    .map(exportPath => path.isAbsolute(exportPath) ? exportPath : path.normalize(path.join(workingDirectory, exportPath)));

  let exportCode = exportPaths
    .map(exportPath => generateExports(exportPath, outputDirPath))
    .join('\n\n');

  safeWriteFileSync(indexFilePath, `/* tslint:disable */\n\n${exportCode}\n`);
}

function generateImports(sourcePath: string, outputDirPath: string) {
  return generateImportsOrExports('import', sourcePath, outputDirPath);
}

function generateExports(sourcePath: string, outputDirPath: string) {
  return generateImportsOrExports('export', sourcePath, outputDirPath);
}

function generateImportsOrExports(type: 'import' | 'export', sourcePath: string, outputDirPath: string) {
  let exportRegex = /export\s+(?:(?:(?:class|const|enum|interface|function)\s+([0-9A-Za-z_]+))|(?:{\s+([0-9A-Za-z_]+)\s+}))/g;

  let source = fs.readFileSync(sourcePath).toString();

  let match, exportedNames = [];
  while ((match = exportRegex.exec(source)) !== null) {
    exportedNames.push(match[1] ? match[1] : match[2]);
  }

  let relativeReferencePath = path.relative(outputDirPath, sourcePath).replace(/\\/g, '/').replace(/\.ts$/, '');
  return `${type} {\n  ${exportedNames.join(',\n  ')}\n} from './${relativeReferencePath}';`;
}
