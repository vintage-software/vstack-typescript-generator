#! /usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import * as mkdirp from 'mkdirp';
import * as rimraf from 'rimraf';
import * as globby from 'globby';

import { Config } from './config';
import { Options } from './options';
import { OutputItem } from './output-item';
import { tsGenerator } from './tsgen';

const defaultConfigFileName = 'tsgen.json';

(function() {
  let configFilePath = getConfigFilePath();
  let workingDirectory = path.dirname(configFilePath);

  let config = require(configFilePath);

  if (config.outDir && config.outFile) {
    throw 'Invalid config: cannot specify both outDir and outFile.';
  } else if (!config.outDir && !config.outFile) {
    throw 'Invalid config: must specify outDir or outFile.';
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

  return outputItems;
}

function writeOutput(workingDirectory: string, config: Config, outputItems: OutputItem[]) {
  if (config.outDir) {
    let outputPath = path.normalize(path.join(workingDirectory, config.outDir));
    writeOutDir(outputItems, outputPath);
  } else {
    let references = config.references
      .map(reference => path.normalize(path.join(workingDirectory, reference)));

    let outputFilePath = path.normalize(path.join(workingDirectory, config.outFile));
    writeOutFile(references, outputItems, outputFilePath);
  }
}

function writeOutDir(outputItems: OutputItem[], outputPath: string) {
  rimraf.sync(outputPath);
  mkdirp.sync(outputPath);

  for (let outputItem of outputItems)
  {
    let outputFilePath = path.join(outputPath, `${outputItem.name}.ts`);
    fs.writeFileSync(outputFilePath, outputItem.typescript);
  }
}

function writeOutFile(references: string[], outputItems: OutputItem[], outputFilePath: string) {
  let tsCode = outputItems.map(i => i.typescript);

  if (references.length) {
    let importsArray = references
      .map(reference => generateImportsFromReferencedFile(reference, outputFilePath));

    for (let imports of importsArray) {
      tsCode.unshift(imports);
    }
  }

  let concatenatedTypescript = tsCode.join('\n\n');
  fs.writeFileSync(outputFilePath, concatenatedTypescript);
}

function generateImportsFromReferencedFile(reference: string, outputFilePath: string) {
  let exportRegex = /export\s+(?:(?:(?:enum|interface|function)\s+([0-9A-Za-z_]+))|(?:{\s+([0-9A-Za-z_]+)\s+}))/g;

  let exports = fs.readFileSync(reference).toString();

  let match, exportedNames = [];
  while ((match = exportRegex.exec(exports)) !== null) {
    exportedNames.push(match[1] ? match[1] : match[2]);
  }

  let relativeReferencePath = path.relative(path.dirname(outputFilePath), reference).replace(/\\/g, '/').replace(/\.ts$/, '');
  return `import {\n  ${exportedNames.join(',\n  ')}\n} from './${relativeReferencePath}';`;
}
