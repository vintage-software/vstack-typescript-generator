'use strict';
require('jasmine');
var index_1 = require('../../src/index');
var sampleFile = "using System;\n\nnamespace MyNamespace.Domain\n{\n    public enum Colors\n    {\n        [RainbowColor]\n        Red,\n        [RainbowColor]\n\t\tOrange,\n        [RainbowColor]\n\t\tYellow,\n        [RainbowColor]\n        Green,\n        [RainbowColor]\n        Blue,\n        [RainbowColor]\n        Indigo,\n        [RainbowColor]\n        Violent\n    }\n}";
var expectedOutput = "export enum Colors {\n    Red = 0,\n    Orange = 1,\n    Yellow = 2,\n    Green = 3,\n    Blue = 4,\n    Indigo = 5,\n    Violent = 6\n}";
describe('vstack-typescript-generation enum generator', function () {
    it('should ignore attributes', function () {
        var result = index_1.default(sampleFile);
        expect(result).toEqual(expectedOutput);
    });
});
//# sourceMappingURL=ignore-attributes.js.map