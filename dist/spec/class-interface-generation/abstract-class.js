'use strict';
require('jasmine');
var index_1 = require('../../src/index');
var sampleFile = "using System;\n\nnamespace MyNamespace.Domain\n{\n    public abstract class MyDto\n    {\n        public string Name { get; set; }\n    }\n}";
var expectedOutput = "export interface MyDto {\n    name: string;\n}";
describe('vstack-typescript-generation class interface generator', function () {
    it('should transform an abstract class correctly', function () {
        var result = index_1.default(sampleFile);
        expect(result).toEqual(expectedOutput);
    });
});
//# sourceMappingURL=abstract-class.js.map