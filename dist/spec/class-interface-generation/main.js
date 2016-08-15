'use strict';
require('jasmine');
var index_1 = require('../../src/index');
var sampleFile = "using System;\n\nnamespace MyNamespace.Domain\n{\n    public class MyDto\n    {\n        public MyDto()\n        {\n        }\n\n        public MyDto(RichObject value)\n        {\n            this.Id = value.Id;\n            this.Name = value.Name;\n            this.Title = value.Title;\n        }\n\n        [SomeAttribute(42)]\n        public int Id { get; set; }\n        public string Name { get; set; }\n        //public string IgnoreMe { get; set; }\n        // public string IgnoreMe2 { get; set; }\n        /* public string IgnoreMe3 {get; set; } */\n        /*\n        public string IgnoreMe4 {get; set; }\n        */\n        public string Title\n        {\n            get;\n            set;\n        }\n        public List<string> ListFields { get; set; }\n        public IEnumerable<string> IEnumerableFields { get; set; }\n        public string[] ArrayFields { get; set; }\n        public int[] NumberArray { get; set; }\n        public List<int> NumberList { get; set; }\n        public bool? OptionalBool {get; set;}\n        public Nullable<int> OptionalInt {get; set;}\n        public DateTime SomeDate {get;set;}\n        public decimal SomeDecimal {get;set;}\n        public Guid SomeGuid {get;set;}\n        public JObject DynamicContents { get; set; }\n        public dynamic DynamicToAny { get; set; }\n    }\n}";
var expectedOutput = "interface MyDto {\n    Id: number;\n    Name: string;\n    Title: string;\n    ListFields: string[];\n    IEnumerableFields: string[];\n    ArrayFields: string[];\n    NumberArray: number[];\n    NumberList: number[];\n    OptionalBool?: boolean;\n    OptionalInt?: number;\n    SomeDate: string;\n    SomeDecimal: number;\n    SomeGuid: string;\n    DynamicContents: any;\n    DynamicToAny: any;\n}";
describe('vstack-typecript-generator dto generation', function () {
    it('should transform a dto class correctly', function () {
        var result = index_1.default(sampleFile);
        expect(result).toEqual(expectedOutput);
    });
});
//# sourceMappingURL=main.js.map