'use strict';
require('jasmine');
var index_1 = require('../../src/index');
var sampleFile = "using System;\n\nnamespace MyNamespace.Domain\n{\n    public class MyDto\n    {\n        public int Id { get; set; }\n        public byte ThisByte { get; set; }\n        public Byte ThatByte { get; set; }\n    }\n}";
var expectedOutput = "export interface MyDto {\n    id: number;\n    thisByte: number;\n    thatByte: number;\n}";
describe('vstack-typescript-generation class interface generator', function () {
    it('should translate byte to number', function () {
        var options = {
            dateTimeToDate: true
        };
        var result = index_1.default(sampleFile, options);
        expect(result).toEqual(expectedOutput);
    });
});
//# sourceMappingURL=byte.js.map