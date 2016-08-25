'use strict';
require('jasmine');
var index_1 = require('../../src/index');
var sampleFile = "using System;\n\nnamespace MyNamespace.Domain\n{\n    public class MyDto : BaseDto, IDto, IOtherDto\n    {\n        public int Id { get; set; }\n        public string Name { get; set; }\n    }\n}";
var expectedOutput = "export interface MyDto extends BaseDto {\n    id: number;\n    name: string;\n}";
describe('vstack-typescript-generation class interface generator', function () {
    it('should turn inheritence into extends', function () {
        var result = index_1.default(sampleFile);
        expect(result).toEqual(expectedOutput);
    });
});
//# sourceMappingURL=class-inheritance-multiple.js.map