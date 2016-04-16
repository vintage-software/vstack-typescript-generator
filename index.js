'use strict';

let tsRunner = require('ts-runner');
tsRunner.run('./implementation/index.ts', this, arguments, '--noImplicitAny');