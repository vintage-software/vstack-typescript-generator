'use strict';
require('jasmine');
var index_1 = require('../../src/index');
var sampleFile = "using System;\n\nnamespace MyNamespace.Domain\n{\n    public struct StructDto\n    {\n        public int StructProperty { get; set; }\n    }\n}";
var expectedOutput = "export interface StructDto {\n    structProperty: number;\n}";
describe('vstack-typescript-generation class interface generator', function () {
    it('should transform structs', function () {
        var result = index_1.default(sampleFile);
        expect(result).toEqual(expectedOutput);
    });
});
//# sourceMappingURL=class-struct.js.map