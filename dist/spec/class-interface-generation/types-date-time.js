'use strict';
require('jasmine');
var index_1 = require('../../src/index');
var sampleFile = "using System;\n\nnamespace MyNamespace.Domain\n{\n    public class MyDto\n    {\n        public DateTime SomeDate { get; set; }\n    }\n}";
var expectedOutput = "export interface MyDto {\n    someDate: string;\n}";
describe('vstack-typescript-generation class interface generator', function () {
    it('should translate DateTime to string by default', function () {
        var result = index_1.default(sampleFile);
        expect(result).toEqual(expectedOutput);
    });
});
//# sourceMappingURL=types-date-time.js.map