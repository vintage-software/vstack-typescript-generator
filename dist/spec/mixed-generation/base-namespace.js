'use strict';
require('jasmine');
var index_1 = require('../../src/index');
var sampleFile = "using System;\n\nnamespace MyNamespace.Domain\n{\n    public class MyDto\n    {\n        public int SomeInt { get; set; }\n    }\n\n    public enum Colors\n    {\n        One, Two\n    }\n}";
var expectedOutput = "module MyNamespace {\n    export interface MyDto {\n        someInt: number;\n    }\n\n    export enum Colors {\n        One = 0,\n        Two = 1\n    }\n}";
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