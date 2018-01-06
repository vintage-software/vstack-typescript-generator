import chalk from 'chalk';
import * as diff from 'diff';
import * as path from 'path';

import { readFile, walkDirectory } from './helpers/fs.helpers';
import { tsgen } from './tsgen';

describe('tsgen', () => {
  walkDirectory('./spec', filePath => {
    const relativeFilePath = `.${path.sep}${path.relative(process.cwd(), filePath)}`;

    it(`should pass the '${relativeFilePath}' test case`, () => {
      const fileContents = readFile(filePath);
      const [optionsJson, input, output] = fileContents.split(/~{100}\r?\n/);
      const expectedOutput = normalizeNewLines(output);
      const options = optionsJson ? JSON.parse(optionsJson) : undefined;

      const testOutput = normalizeNewLines(tsgen(input, options));

      if (testOutput !== expectedOutput) {
        const patch = diff.createTwoFilesPatch('test-output.ts', 'expected-output.ts', testOutput, expectedOutput, '', '')
          .split('\n')
          .map(line => line.startsWith('-') ? chalk.red(line) : line.startsWith('+') ? chalk.green(line) : line)
          .join('\n');

        fail(`Failed on the '${relativeFilePath}' test case.\n\n${patch}`);
      }
    });
  });
});

function normalizeNewLines(value: string) {
  return value ? value.replace(/\r?\n/g, '\n') : '';
}
