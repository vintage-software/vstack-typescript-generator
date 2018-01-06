import { execute } from './helpers/shell.helpers';

(async () => {
  await execute(`tsc --project ./tsconfig.spec.json`);
  await execute('istanbul cover ./node_modules/jasmine/bin/jasmine.js --dir ./coverage/unit --print none -- --config=jasmine.json');
  await e2e();
  await execute('remap-istanbul -i ./coverage/unit/coverage.json -o ./coverage/unit/coverage.json -t json');
  await execute('remap-istanbul -i ./coverage/e2e/coverage.json -o ./coverage/e2e/coverage.json -t json');
  await execute('istanbul report -t lcov');
  await execute('istanbul report -t text-summary');
  await execute('istanbul check-coverage --statements 90 --branches 90 --functions 90 --lines 90');
})();

async function e2e() {
  await execute('ncp ./package.json ./dist-spec/package.json');
  await execute('istanbul cover ./dist-spec/src/tsgen-cli.js --dir ./coverage/e2e --print none -- ./test-project/tsgen.json');
  await execute('dircompare -c ./test-project/generated ./test-project/test-generated');
}
