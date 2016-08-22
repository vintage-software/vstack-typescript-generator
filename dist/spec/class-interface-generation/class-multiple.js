'use strict';
require('jasmine');
var index_1 = require('../../src/index');
var sampleFile = "using System;\n\nnamespace MyNamespace.Domain\n{\n    public class ThisDto\n    {\n        public int Id { get; set; }\n        public string ThisName { get; set; }\n    }\n\n    public class ThatDto\n    {\n        public int Id { get; set; }\n        public string ThatName { get; set; }\n    }\n}";
var expectedOutput = "export interface ThisDto {\n    id: number;\n    thisName: string;\n}\n\nexport interface ThatDto {\n    id: number;\n    thatName: string;\n}";
describe('vstack-typescript-generation class interface generator', function () {
    it('should transform multiple classes in the same file', function () {
        var result = index_1.default(sampleFile);
        expect(result).toEqual(expectedOutput);
    });
});
//# sourceMappingURL=class-multiple.js.map