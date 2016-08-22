'use strict';
require('jasmine');
var index_1 = require('../../src/index');
var sampleFile = "using System;\n\nnamespace MyNamespace.Domain\n{\n    public class MyDto\n    {\n        public string ThisString { get; set; }\n        public String ThatString { get; set; }\n        public Guid SomeGuid { get; set; }\n    }\n}";
var expectedOutput = "export interface MyDto {\n    thisString: string;\n    thatString: string;\n    someGuid: string;\n}";
describe('vstack-typescript-generation class interface generator', function () {
    it('should translate string types correctly', function () {
        var result = index_1.default(sampleFile);
        expect(result).toEqual(expectedOutput);
    });
});
//# sourceMappingURL=types-string.js.map