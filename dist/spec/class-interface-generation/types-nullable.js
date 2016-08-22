'use strict';
require('jasmine');
var index_1 = require('../../src/index');
var sampleFile = "using System;\n\nnamespace MyNamespace.Domain\n{\n    public class MyDto\n    {\n        public bool? OptionalBool {get; set;}\n        public Nullable<int> OptionalInt {get; set;}\n    }\n}";
var expectedOutput = "export interface MyDto {\n    optionalBool?: boolean;\n    optionalInt?: number;\n}";
describe('vstack-typescript-generation class interface generator', function () {
    it('should translate nullables correctly', function () {
        var result = index_1.default(sampleFile);
        expect(result).toEqual(expectedOutput);
    });
});
//# sourceMappingURL=types-nullable.js.map