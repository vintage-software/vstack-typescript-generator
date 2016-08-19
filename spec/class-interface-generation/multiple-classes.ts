'use strict';

import 'jasmine';
import tsGenerator from '../../src/index';

let sampleFile = `using System;

namespace MyNamespace.Domain
{
    public class MyDto
    {
        public MyDto()
        {
        }

        public MyDto(RichObject value)
        {
            this.Id = value.Id;
            this.Name = value.Name;
            this.Title = value.Title;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        //public string IgnoreMe { get; set; }
        // public string IgnoreMe2 { get; set; }
        /* public string IgnoreMe3 {get; set; } */
        /*
        public string IgnoreMe4 {get; set; }
        */
        public string Title
        {
            get;
            set;
        }
        public List<string> ListFields { get; set; }
        public IEnumerable<string> IEnumerableFields { get; set; }
        public string[] ArrayFields { get; set; }
        public bool? OptionalBool {get; set;}
        public DateTime SomeDate {get;set;}
        public decimal SomeDecimal {get;set;}
        public Guid SomeGuid {get;set;}
    }

    public partial class MyOtherDto
    {
        public int SomeField { get; set; }
    }

    public struct MyStruct
    {
        public int SomeIntField { get; set; }
    }
}`;

let expectedOutput = `interface MyDto {
    id: number;
    name: string;
    title: string;
    listFields: string[];
    iEnumerableFields: string[];
    arrayFields: string[];
    optionalBool?: boolean;
    someDate: string;
    someDecimal: number;
    someGuid: string;
}

interface MyOtherDto {
    someField: number;
}

interface MyStruct {
    someIntField: number;
}`;

describe('vstack-typescript-generation class interface generator', () => {
    it('should handle multiple classes in the same file', () => {
        let result = tsGenerator(sampleFile);
        expect(result).toEqual(expectedOutput);
    });
});
