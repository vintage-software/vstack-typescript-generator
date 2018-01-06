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
  await execute('istanbul cover ./node_modules/jasmine/bin/jasmine.js --dir ./coverage/unit --print none -- --config=jasmine.json');
  await execute('remap-istanbul -i ./coverage/unit/coverage.json -o ./coverage/unit/coverage.json -t json');
}

async function e2eTest() {
  await execute('istanbul cover ./dist-spec/tsgen-cli.js --dir ./coverage/e2e --print none -- ./test-project/tsgen.json');
  await execute('remap-istanbul -i ./coverage/e2e/coverage.json -o ./coverage/e2e/coverage.json -t json');
  await execute('dircompare -c ./test-project/generated ./test-project/test-generated');
}
