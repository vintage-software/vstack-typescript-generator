'use strict';
require('jasmine');
var index_1 = require('../../src/index');
var sampleFile = "using System;\n\nnamespace MyNamespace.Domain\n{\n    public class MyDto\n    {\n        public int Id { get; set; }\n        public string Name { get; set; }\n        //public string IgnoreMe { get; set; }\n        public string Info1 { get; set; }\n        // public string IgnoreMe2 { get; set; }\n        /* public string IgnoreMe3 { get; set; } */\n        public string Info2 { get; set; }\n        /*\n        public string IgnoreMe4 { get; set; }\n        */\n        public string Info3 { get; set; }\n    }\n}";
var expectedOutput = "export interface MyDto {\n    id: number;\n    name: string;\n    info1: string;\n    info2: string;\n    info3: string;\n}";
describe('vstack-typescript-generation class interface generator', function () {
    it('should ignore comments', function () {
        var result = index_1.default(sampleFile);
        expect(result).toEqual(expectedOutput);
    });
});
//# sourceMappingURL=ignore-comments.js.map