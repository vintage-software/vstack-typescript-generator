'use strict';
require('jasmine');
var index_1 = require('../../src/index');
var sampleFile = "using System;\n\nnamespace MyNamespace.Domain\n{\n    public enum MyEnum : System.Int64\n    {\n        Green,\n\t\tRed,\n\t\tBlue\n        //Purple\n        /* public string IgnoreMe3 {get; set; } */\n        /*\n        public string IgnoreMe4 {get; set; }\n        */\n        Pink = 10, Ultraviolet\n    }\n}";
var expectedOutput = "export enum MyEnum {\n    Green = 0,\n    Red = 1,\n    Blue = 2,\n    Pink = 10,\n    Ultraviolet = 11\n}";
describe('vstack-typescript-generation enum generator', function () {
    it('should ignore an enum\'s explicit type', function () {
        var result = index_1.default(sampleFile);
        expect(result).toEqual(expectedOutput);
    });
});
//# sourceMappingURL=enum-with-type.js.map