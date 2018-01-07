import { execute } from './helpers/shell.helpers';
import { parseFlags } from './helpers/utility.helpers';

interface Options {
  unit: boolean;
  e2e: boolean;
}

const defaultOptionsFn = (args: Options) => ({
  unit: !args.e2e,
  e2e: !args.unit
});

const options = parseFlags(process.argv.slice(2), defaultOptionsFn);

(async () => {
  await execute('rimraf ./coverage ./test-project/test-generated');
  await execute(`tsc --project ./tsconfig.spec.json`);

  if (options.unit) {
    await unitTest();
  }

  if (options.e2e) {
    await e2eTest();
  }

  await execute('istanbul report -t lcov');
  await execute('istanbul report -t text-summary');
  await execute('istanbul check-coverage --statements 90 --branches 85 --functions 90 --lines 90');
})();

async function unitTest() {
  await execute(getTestCommand('unit', './node_modules/jasmine/bin/jasmine.js', '--config=jasmine.json'));
  await execute(getRemapCoverageCommand('unit'));
}

async function e2eTest() {
  await execute(getTestCommand('e2e', './dist-spec/tsgen-cli.js', './test-project/tsgen.json'));
  await execute(getRemapCoverageCommand('e2e'));
  await execute('dircompare -c ./test-project/generated ./test-project/test-generated');
}

function getTestCommand(testSet: string, script: string, args: string) {
  return `istanbul cover ${script} --dir ./coverage/${testSet} --print none -- ${args}`;
}

function getRemapCoverageCommand(testSet: string) {
  return `remap-istanbul -i ./coverage/${testSet}/coverage.json -o ./coverage/${testSet}/coverage.json -t json`;
}
