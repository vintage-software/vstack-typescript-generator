'use strict';
require('jasmine');
var index_1 = require('../../src/index');
var sampleFile = "using System;\n\nnamespace MyNamespace.Domain\n{\n    public enum Colors\n    {\n        None = 0\n        Red = 1,\n        Orange = 2,\n        Yellow = 4,\n        Green = 8,\n        Blue = 16,\n        Indigo = 32,\n        Violent = 64,\n        All = 0x7FFFFFFF\n    }\n}";
var expectedOutput = "export enum Colors {\n    None = 0,\n    Red = 1,\n    Orange = 2,\n    Yellow = 4,\n    Green = 8,\n    Blue = 16,\n    Indigo = 32,\n    Violent = 64,\n    All = 2147483647\n}";
describe('vstack-typescript-generation enum generator', function () {
    it('should transform an enum with hex values correctly', function () {
        var result = index_1.default(sampleFile);
        expect(result).toEqual(expectedOutput);
    });
});
//# sourceMappingURL=hex-values.js.map