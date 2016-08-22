'use strict';
require('jasmine');
var index_1 = require('../../src/index');
var sampleFile = "using System;\n\nnamespace MyNamespace.Domain\n{\n    public enum Colors\n    {\n        Red,\n\t\tOrange,\n\t\tYellow = 5,\n        Green = 7,\n        Blue,\n        Indigo,\n        Violent = 12\n    }\n}";
var expectedOutput = "export enum Colors {\n    Red = 0,\n    Orange = 1,\n    Yellow = 5,\n    Green = 7,\n    Blue = 8,\n    Indigo = 9,\n    Violent = 12\n}";
describe('vstack-typescript-generation enum generator', function () {
    it('should transform an enum with explicit and auto-incremented values correctly', function () {
        var result = index_1.default(sampleFile);
        expect(result).toEqual(expectedOutput);
    });
});
//# sourceMappingURL=explicit-and-auto-values.js.map