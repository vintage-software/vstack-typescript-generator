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

        [SomeAttribute(42)]
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
        public int[] NumberArray { get; set; }
        public List<int> NumberList { get; set; }
        public bool? OptionalBool {get; set;}
        public DateTime SomeDate {get;set;}
        public decimal SomeDecimal {get;set;}
        public Guid SomeGuid {get;set;}
        public JObject DynamicContents { get; set; }
        public dynamic DynamicToAny { get; set; }
    }
}`;

let expectedOutput = `interface MyDto {
    Id: number;
    Name: string;
    Title: string;
    ListFields: string[];
    IEnumerableFields: string[];
    ArrayFields: string[];
    NumberArray: number[];
    NumberList: number[];
    OptionalBool?: boolean;
    SomeDate: string;
    SomeDecimal: number;
    SomeGuid: string;
    DynamicContents: any;
    DynamicToAny: any;
}`;

describe('vstack-typecript-generator dto generation', () => {
	it('should transform a dto class correctly', () => {
		let result = tsGenerator.generateDto(sampleFile);
        expect(result).toEqual(expectedOutput);
	});
});
