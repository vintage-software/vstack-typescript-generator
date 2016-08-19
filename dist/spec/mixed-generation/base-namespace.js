'use strict';
require('jasmine');
var index_1 = require('../../src/index');
var sampleFile = "using System;\n\nnamespace MyNamespace.Domain\n{\n    public class MyDto\n    {\n        public int SomeInt { get; set; }\n    }\n\n    public enum MyEnum\n    {\n        One, Two\n    }\n}";
var expectedOutput = "module MyNamespace {\n    export interface MyDto {\n        someInt: number;\n    }\n\n    export enum MyEnum {\n        One = 0,\n        Two = 1\n    }\n}";
describe('vstack-typescript-generation enum generator', function () {
    it('should use the baseNamespace option correctly', function () {
        var options = {
            baseNamespace: 'MyNamespace'
        };
        var result = index_1.default(sampleFile, options);
        expect(result).toEqual(expectedOutput);
    });
});
//# sourceMappingURL=base-namespace.js.map