'use strict';
require('jasmine');
var index_1 = require('../../src/index');
var sampleFile = "using System;\n\nnamespace MyNamespace.Domain\n{\n    public class MyDto<T>\n    {\n        public T GenericTypeValue { get; set; }\n    }\n}";
var expectedOutput = "export interface MyDto<T> {\n    genericTypeValue: T;\n}";
describe('vstack-typescript-generation class interface generator', function () {
    it('should transform a class with single generic type parameter correctly', function () {
        var result = index_1.default(sampleFile);
        expect(result).toEqual(expectedOutput);
    });
});
//# sourceMappingURL=class-single-generic.js.map