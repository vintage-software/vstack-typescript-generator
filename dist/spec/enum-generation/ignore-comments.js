'use strict';
require('jasmine');
var index_1 = require('../../src/index');
var sampleFile = "using System;\n\nnamespace MyNamespace.Domain\n{\n    public enum Colors\n    {\n        Red,\n        // Orange,\n        Yellow,\n        /* Green, */\n        Blue,\n        /*\n        Indigo,\n        Violent,\n        */\n        Maroon\n    }\n}";
var expectedOutput = "export enum Colors {\n    Red = 0,\n    Yellow = 1,\n    Blue = 2,\n    Maroon = 3\n}";
describe('vstack-typescript-generation enum generator', function () {
    it('should ignore comments', function () {
        var result = index_1.default(sampleFile);
        expect(result).toEqual(expectedOutput);
    });
});
//# sourceMappingURL=ignore-comments.js.map