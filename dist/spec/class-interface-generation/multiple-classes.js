'use strict';
require('jasmine');
var index_1 = require('../../src/index');
var sampleFile = "using System;\n\nnamespace MyNamespace.Domain\n{\n    public class MyDto\n    {\n        public int Id { get; set; }\n        public string Name { get; set; }\n    }\n\n    public partial class MyOtherDto\n    {\n        public int SomeField { get; set; }\n    }\n\n    public struct MyStruct\n    {\n        public int SomeIntField { get; set; }\n    }\n}";
var expectedOutput = "export interface MyDto {\n    id: number;\n    name: string;\n}\n\nexport interface MyOtherDto {\n    someField: number;\n}\n\nexport interface MyStruct {\n    someIntField: number;\n}";
describe('vstack-typescript-generation class interface generator', function () {
    it('should handle multiple classes in the same file', function () {
        var result = index_1.default(sampleFile);
        expect(result).toEqual(expectedOutput);
    });
});
//# sourceMappingURL=multiple-classes.js.map