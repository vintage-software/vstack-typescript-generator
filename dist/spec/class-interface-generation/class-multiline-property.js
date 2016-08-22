'use strict';
require('jasmine');
var index_1 = require('../../src/index');
var sampleFile = "using System;\n\nnamespace MyNamespace.Domain\n{\n    public class MyDto\n    {\n        public string Title\n        {\n            get;\n            set;\n        }\n    }\n}";
var expectedOutput = "export interface MyDto {\n    title: string;\n}";
describe('vstack-typescript-generation class interface generator', function () {
    it('should handle a multiline property correctly', function () {
        var result = index_1.default(sampleFile);
        expect(result).toEqual(expectedOutput);
    });
});
//# sourceMappingURL=class-multiline-property.js.map