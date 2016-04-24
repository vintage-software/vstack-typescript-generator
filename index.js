'use strict';

let tsRunner = require('ts-runner');
tsRunner.run('./src/index.ts', this, arguments, '--noImplicitAny');