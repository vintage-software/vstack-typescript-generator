'use strict';
require('jasmine');
var index_1 = require('../../src/index');
var sampleFile = "using System;\n\nnamespace MyNamespace.Domain\n{\n    public class MyDto\n    {\n        public bool ThisBit { get; set; }\n        public Boolean ThatBit { get; set; }\n    }\n}";
var expectedOutput = "export interface MyDto {\n    thisBit: boolean;\n    thatBit: boolean;\n}";
describe('vstack-typescript-generation class interface generator', function () {
    it('should translate boolean types correctly', function () {
        var result = index_1.default(sampleFile);
        expect(result).toEqual(expectedOutput);
    });
});
//# sourceMappingURL=types-boolean.js.map