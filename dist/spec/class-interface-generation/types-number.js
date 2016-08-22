'use strict';
require('jasmine');
var index_1 = require('../../src/index');
var sampleFile = "using System;\n\nnamespace MyNamespace.Domain\n{\n    public class MyDto\n    {\n        public byte ThisByte { get; set; }\n        public Byte ThatByte { get; set; }\n\n        public short ThisShort { get; set; }\n        public Int16 ThatShort { get; set; }\n\n        public int ThisInt { get; set; }\n        public Int32 ThatInt { get; set; }\n\n        public long ThisLong { get; set; }\n        public Int64 ThatLong { get; set; }\n\n        public float ThisSingle { get; set; }\n        public Single ThatSingle { get; set; }\n\n        public double ThisDouble { get; set; }\n        public Double ThatDouble { get; set; }\n\n        public decimal ThisDecimal { get; set; }\n        public Decimal ThatDecimal { get; set; }\n    }\n}";
var expectedOutput = "export interface MyDto {\n    thisByte: number;\n    thatByte: number;\n    thisShort: number;\n    thatShort: number;\n    thisInt: number;\n    thatInt: number;\n    thisLong: number;\n    thatLong: number;\n    thisSingle: number;\n    thatSingle: number;\n    thisDouble: number;\n    thatDouble: number;\n    thisDecimal: number;\n    thatDecimal: number;\n}";
describe('vstack-typescript-generation class interface generator', function () {
    it('should translate byte to number', function () {
        var options = {
            dateTimeToDate: true
        };
        var result = index_1.default(sampleFile, options);
        expect(result).toEqual(expectedOutput);
    });
});
//# sourceMappingURL=types-number.js.map