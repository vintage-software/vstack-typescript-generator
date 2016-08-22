"use strict";
'use strict';
require('jasmine');
var index_1 = require('../../src/index');
var sampleFile = "using System;\n\nnamespace MyNamespace.Domain\n{\n    public partial class PartialDto\n    {\n        public int PartialProperty { get; set; }\n    }\n}";
var expectedOutput = "export interface PartialDto {\n    partialProperty: number;\n}";
describe('vstack-typescript-generation class interface generator', function () {
    it('should transform partial classes', function () {
        var result = index_1.default(sampleFile);
        expect(result).toEqual(expectedOutput);
    });
});
//# sourceMappingURL=class-partial.js.map