'use strict';
require('jasmine');
var index_1 = require('../../src/index');
var sampleFile = "using System;\n\nnamespace MyNamespace.Domain\n{\n    public enum Colors\n    {\n        Red,\n        Orange,\n        Yellow,\n        Green,\n        Blue,\n        Indigo,\n        Violent\n    }\n}";
var expectedOutput = "export enum Colors {\n    Red = 0,\n    Orange = 1,\n    Yellow = 2,\n    Green = 3,\n    Blue = 4,\n    Indigo = 5,\n    Violent = 6\n}";
describe('vstack-typescript-generation enum generator', function () {
    it('should transform a basic enum correctly', function () {
        var result = index_1.default(sampleFile);
        expect(result).toEqual(expectedOutput);
    });
});
//# sourceMappingURL=basic.js.map