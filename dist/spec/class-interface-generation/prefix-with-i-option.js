'use strict';
require('jasmine');
var index_1 = require('../../src/index');
var sampleFile = "using System;\n\nnamespace MyNamespace.Domain\n{\n    public class MyDto\n    {\n        public MyDto()\n        {\n        }\n\n        public MyDto(RichObject value)\n        {\n            this.Id = value.Id;\n            this.Name = value.Name;\n            this.Title = value.Title;\n        }\n\n        public int Id { get; set; }\n        public string Name { get; set; }\n        //public string IgnoreMe { get; set; }\n        // public string IgnoreMe2 { get; set; }\n        /* public string IgnoreMe3 {get; set; } */\n        /*\n        public string IgnoreMe4 {get; set; }\n        */\n        public string Title\n        {\n            get;\n            set;\n        }\n        public List<string> ListFields { get; set; }\n        public IEnumerable<string> IEnumerableFields { get; set; }\n        public string[] ArrayFields { get; set; }\n        public bool? OptionalBool {get; set;}\n        public DateTime SomeDate {get;set;}\n        public decimal SomeDecimal {get;set;}\n        public Guid SomeGuid {get;set;}\n        public SomeOtherDto AnotherDto {get; set;}\n        public List<SomeOtherDto> MoreDtos {get; set;}\n        public SomeOtherDto[] ArrayDtos {get; set;}\n    }\n}";
var expectedOutput = "interface IMyDto {\n    Id: number;\n    Name: string;\n    Title: string;\n    ListFields: string[];\n    IEnumerableFields: string[];\n    ArrayFields: string[];\n    OptionalBool?: boolean;\n    SomeDate: string;\n    SomeDecimal: number;\n    SomeGuid: string;\n    AnotherDto: ISomeOtherDto;\n    MoreDtos: ISomeOtherDto[];\n    ArrayDtos: ISomeOtherDto[];\n}";
describe('vstack-typescript-generation class interface generator', function () {
    it('should prefix with I if option is set', function () {
        var options = {
            prefixWithI: true
        };
        var result = index_1.default(sampleFile, options);
        expect(result).toEqual(expectedOutput);
    });
});
//# sourceMappingURL=prefix-with-i-option.js.map