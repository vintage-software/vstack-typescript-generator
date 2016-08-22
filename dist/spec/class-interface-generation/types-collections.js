'use strict';
require('jasmine');
var index_1 = require('../../src/index');
var sampleFile = "using System;\n\nnamespace MyNamespace.Domain\n{\n    public class MyDto\n    {\n        public string[] StringArray { get; set; }\n        public List<string> StringList { get; set; }\n        public IEnumerable<string> StringIEnumerable { get; set; }\n\n        public int[] IntArray { get; set; }\n        public List<int> IntList { get; set; }\n        public IEnumerable<int> IntIEnumerable { get; set; }\n    }\n}";
var expectedOutput = "export interface MyDto {\n    stringArray: string[];\n    stringList: string[];\n    stringIEnumerable: string[];\n    intArray: number[];\n    intList: number[];\n    intIEnumerable: number[];\n}";
describe('vstack-typescript-generation class interface generator', function () {
    it('should translate collections correctly', function () {
        var result = index_1.default(sampleFile);
        expect(result).toEqual(expectedOutput);
    });
});
//# sourceMappingURL=types-collections.js.map