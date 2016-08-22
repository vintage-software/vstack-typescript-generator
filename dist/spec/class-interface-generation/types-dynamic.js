'use strict';
require('jasmine');
var index_1 = require('../../src/index');
var sampleFile = "using System;\n\nnamespace MyNamespace.Domain\n{\n    public class MyDto\n    {\n        public dynamic ThisDynamic { get; set; }\n        public JObject ThatJObject { get; set; }\n    }\n}";
var expectedOutput = "export interface MyDto {\n    thisDynamic: any;\n    thatJObject: any;\n}";
describe('vstack-typescript-generation class interface generator', function () {
    it('should translate dynamic types correctly', function () {
        var result = index_1.default(sampleFile);
        expect(result).toEqual(expectedOutput);
    });
});
//# sourceMappingURL=types-dynamic.js.map