'use strict';
require('jasmine');
var index_1 = require('../../src/index');
var sampleFile = "using System;\n\nnamespace MyNamespace.Domain\n{\n    public class MyDto\n    {\n        public int Id { get; set; }\n        public string Name { get; set; }\n    }\n}";
var expectedOutput = "module MyNamespace {\n    export interface MyDto {\n        id: number;\n        name: string;\n    }\n}";
describe('vstack-typescript-generation class interface generator', function () {
    it('should use the moduleName option correctly', function () {
        var options = {
            moduleName: 'MyNamespace'
        };
        var result = index_1.default(sampleFile, options);
        expect(result).toEqual(expectedOutput);
    });
});
//# sourceMappingURL=options-module-name.js.map