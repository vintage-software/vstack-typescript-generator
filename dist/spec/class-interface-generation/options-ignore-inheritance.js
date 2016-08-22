'use strict';
require('jasmine');
var index_1 = require('../../src/index');
var sampleFile = "using System;\n\nnamespace MyNamespace.Domain\n{\n    public abstract class MyDto : IMyDto\n    {\n        public int Id { get; set; }\n        public string Name { get; set; }\n    }\n}";
var expectedOutput = "export interface MyDto {\n    id: number;\n    name: string;\n}";
describe('vstack-typescript-generation class interface generator', function () {
    it('should handle the ignoreInheritance option correctly', function () {
        var options = {
            ignoreInheritance: ['IMyDto']
        };
        var result = index_1.default(sampleFile, options);
        expect(result).toEqual(expectedOutput);
    });
});
//# sourceMappingURL=options-ignore-inheritance.js.map