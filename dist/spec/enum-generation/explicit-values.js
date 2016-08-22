'use strict';
require('jasmine');
var index_1 = require('../../src/index');
var sampleFile = "using System;\n\nnamespace MyNamespace.Domain\n{\n    public enum Colors\n    {\n        Red = 2,\n\t\tOrange = 4,\n\t\tYellow = 6,\n        Green = 8,\n        Blue = 10,\n        Indigo = 12,\n        Violent = 14\n    }\n}";
var expectedOutput = "export enum Colors {\n    Red = 2,\n    Orange = 4,\n    Yellow = 6,\n    Green = 8,\n    Blue = 10,\n    Indigo = 12,\n    Violent = 14\n}";
describe('vstack-typescript-generation enum generator', function () {
    it('should transform an enum with explicit values correctly', function () {
        var result = index_1.default(sampleFile);
        expect(result).toEqual(expectedOutput);
    });
});
//# sourceMappingURL=explicit-values.js.map