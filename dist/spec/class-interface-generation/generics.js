'use strict';
require('jasmine');
var index_1 = require('../../src/index');
var sampleFile = "using System;\n\nnamespace MyNamespace.Domain\n{\n    public class MyDto<T>\n    {\n        public T GenericTypeValue {get;set;}\n    }\n}";
var expectedOutput = "interface MyDto<T> {\n    GenericTypeValue: T;\n}";
describe('vstack-typescript-generation class interface generator', function () {
    it('should transform a dto with a single generic type correctly', function () {
        var result = index_1.default(sampleFile);
        expect(result).toEqual(expectedOutput);
    });
});
//# sourceMappingURL=generics.js.map