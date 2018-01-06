import { execute } from './helpers/shell.helpers';
import { bailIf, parseFlags } from './helpers/utility.helpers';

interface Options {
  clean: boolean;
  lint: boolean;
  watch: boolean;
  test: boolean;
}

const defaultOptionsFn = (args: Options) => ({
  clean: true,
  lint: !args.watch,
  watch: false,
  test: !args.watch
});

const options = parseFlags(process.argv.slice(2), defaultOptionsFn);

bailIf(options.watch && options.test, '--watch and --test are mutually exclusive.');

(async () => {
  if (options.clean) {
    await execute('rimraf ./dist ./dist-spec ./coverage ./test-project/test-generated');
  }

  if (options.lint) {
    await execute('ts-node ./build/lint.ts');
  }

  await execute(`tsc --project ./tsconfig.json ${options.watch ? '--watch' : ''}`);

  if (options.test) {
    await execute(`tsc --project ./tsconfig.spec.json`);
    await execute('istanbul cover ./node_modules/jasmine/bin/jasmine.js --dir ./coverage/unit --print none -- --config=jasmine.json');
    await e2e();
    await execute('remap-istanbul -i ./coverage/unit/coverage.json -o ./coverage/unit/coverage.json -t json');
    await execute('remap-istanbul -i ./coverage/e2e/coverage.json -o ./coverage/e2e/coverage.json -t json');
    await execute('istanbul report -t lcov');
    await execute('istanbul report -t text-summary');
    await execute('istanbul check-coverage --statements 90 --branches 90 --functions 90 --lines 90');
  }
})();

async function e2e() {
  await execute('istanbul cover ./dist-spec/src/tsgen-cli.js --dir ./coverage/e2e --print none -- ./test-project/tsgen.json');
  await execute('dircompare -c ./test-project/generated ./test-project/test-generated');
}
