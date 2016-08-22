'use strict';
require('jasmine');
var index_1 = require('../../src/index');
var sampleFile = "using System;\n\nnamespace MyNamespace.Domain\n{\n    public enum MyEnum\n    {\n        One, Two\n    }\n}";
var expectedOutput = "module MyNamespace {\n    export enum MyEnum {\n        One = 0,\n        Two = 1\n    }\n}";
describe('vstack-typescript-generation enum generator', function () {
    it('should use the moduleName option correctly', function () {
        var options = {
            moduleName: 'MyNamespace'
        };
        var result = index_1.default(sampleFile, options);
        expect(result).toEqual(expectedOutput);
    });
});
//# sourceMappingURL=base-namespace.js.map