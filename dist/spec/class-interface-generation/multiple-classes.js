'use strict';
require('jasmine');
var index_1 = require('../../src/index');
var sampleFile = "using System;\n\nnamespace MyNamespace.Domain\n{\n    public class MyDto\n    {\n        public MyDto()\n        {\n        }\n\n        public MyDto(RichObject value)\n        {\n            this.Id = value.Id;\n            this.Name = value.Name;\n            this.Title = value.Title;\n        }\n\n        public int Id { get; set; }\n        public string Name { get; set; }\n        //public string IgnoreMe { get; set; }\n        // public string IgnoreMe2 { get; set; }\n        /* public string IgnoreMe3 {get; set; } */\n        /*\n        public string IgnoreMe4 {get; set; }\n        */\n        public string Title\n        {\n            get;\n            set;\n        }\n        public List<string> ListFields { get; set; }\n        public IEnumerable<string> IEnumerableFields { get; set; }\n        public string[] ArrayFields { get; set; }\n        public bool? OptionalBool {get; set;}\n        public DateTime SomeDate {get;set;}\n        public decimal SomeDecimal {get;set;}\n        public Guid SomeGuid {get;set;}\n    }\n\n    public partial class MyOtherDto\n    {\n        public int SomeField { get; set; }\n    }\n\n    public struct MyStruct\n    {\n        public int SomeIntField { get; set; }\n    }\n}";
var expectedOutput = "interface MyDto {\n    id: number;\n    name: string;\n    title: string;\n    listFields: string[];\n    iEnumerableFields: string[];\n    arrayFields: string[];\n    optionalBool?: boolean;\n    someDate: string;\n    someDecimal: number;\n    someGuid: string;\n}\n\ninterface MyOtherDto {\n    someField: number;\n}\n\ninterface MyStruct {\n    someIntField: number;\n}";
describe('vstack-typescript-generation class interface generator', function () {
    it('should handle multiple classes in the same file', function () {
        var result = index_1.default(sampleFile);
        expect(result).toEqual(expectedOutput);
    });
});
//# sourceMappingURL=multiple-classes.js.map