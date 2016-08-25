'use strict';
require('jasmine');
var index_1 = require('../../src/index');
var sampleFile = "using System;\n\nnamespace MyNamespace.Domain\n{\n    public enum Colors\n    {\n        Red,\n        Orange,\n        Yellow,\n        Green,\n        Blue,\n        Indigo,\n        Violent\n    }\n}";
var expectedOutput = "module MyNamespace {\n    export enum Colors {\n        Red = 0,\n        Orange = 1,\n        Yellow = 2,\n        Green = 3,\n        Blue = 4,\n        Indigo = 5,\n        Violent = 6\n    }\n}";
describe('vstack-typescript-generation enum generator', function () {
    it('should use the moduleName option correctly', function () {
        var options = {
            moduleName: 'MyNamespace'
        };
        var result = index_1.default(sampleFile, options);
        expect(result).toEqual(expectedOutput);
    });
});
//# sourceMappingURL=options-module-name.js.map