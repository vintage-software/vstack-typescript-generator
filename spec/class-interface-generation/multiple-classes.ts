/// <reference path='../../typings/main.d.ts' />

'use strict';

import * as tsGenerator from '../index.js';

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
    Id: number;
    Name: string;
    Title: string;
    ListFields: string[];
    IEnumerableFields: string[];
    ArrayFields: string[];
    OptionalBool?: boolean;
    SomeDate: string;
    SomeDecimal: number;
    SomeGuid: string;
}

interface MyOtherDto {
    SomeField: number;
}

interface MyStruct {
    SomeIntField: number;
}`;

describe('vstack-typescript-generation class interface generator', () => {
	it('should handle multiple classes in the same file', () => {
		let result = tsGenerator(sampleFile);
        expect(result).toEqual(expectedOutput);
	});
});
