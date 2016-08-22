'use strict';
require('jasmine');
var index_1 = require('../../src/index');
var sampleFile = "using System;\n\nnamespace MyNamespace.Domain\n{\n    public class MyDto\n    {\n        public int Id { get; set; }\n        public DateTime SomeDate { get; set; }\n    }\n}";
var expectedOutput = "export interface MyDto {\n    id: number;\n    someDate: Date;\n}";
describe('vstack-typescript-generation class interface generator', function () {
    it('should turn DateTime into Date with option set', function () {
        var options = {
            dateTimeToDate: true
        };
        var result = index_1.default(sampleFile, options);
        expect(result).toEqual(expectedOutput);
    });
});
//# sourceMappingURL=date-time-to-date-option.js.map