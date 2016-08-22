'use strict';
require('jasmine');
var index_1 = require('../../src/index');
var sampleFile = "using System;\n\nnamespace MyNamespace.Domain\n{\n    public class MyDto\n    {\n        public int Id { get; set; }\n        public string Name { get; set; }\n    }\n\n    public enum Colors\n    {\n        Green,\n        Blue\n    }\n}";
var expectedOutput = "export interface MyDto {\n    id: number;\n    name: string;\n}\n\nexport enum Colors {\n    Green = 0,\n    Blue = 1\n}";
describe('vstack-typescript-generation', function () {
    it('should handle enums and classes in the same file', function () {
        var result = index_1.default(sampleFile);
        expect(result).toEqual(expectedOutput);
    });
});
//# sourceMappingURL=basic.js.map