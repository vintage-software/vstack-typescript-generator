'use strict';
require('jasmine');
var index_1 = require('../../src/index');
var sampleFile = "using System;\n\nnamespace MyNamespace.Domain\n{\n    public class MyDto\n    {\n        public int Id { get; set; }\n        public string Name { get; set; }\n    }\n}";
var expectedOutput = "export interface IMyDto {\n    id: number;\n    name: string;\n}";
describe('vstack-typescript-generation class interface generator', function () {
    it('should prefix interface names with I when the prefixWithI option is set', function () {
        var options = {
            prefixWithI: true
        };
        var result = index_1.default(sampleFile, options);
        expect(result).toEqual(expectedOutput);
    });
});
//# sourceMappingURL=options-prefix-with-i.js.map