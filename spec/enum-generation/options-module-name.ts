'use strict';

import 'jasmine';
import tsGenerator from '../../src/index';

let sampleFile = `using System;

namespace MyNamespace.Domain
{
    public enum Colors
    {
        Red,
        Orange,
        Yellow,
        Green,
        Blue,
        Indigo,
        Violent
    }
}`;

let expectedOutput = `module MyNamespace {
    export enum Colors {
        Red = 0,
        Orange = 1,
        Yellow = 2,
        Green = 3,
        Blue = 4,
        Indigo = 5,
        Violent = 6
    }
}`;

describe('vstack-typescript-generation enum generator', () => {
    it('should use the moduleName option correctly', () => {
        let options = {
            moduleName: 'MyNamespace'
        };

        let result = tsGenerator(sampleFile, options);
        expect(result).toEqual(expectedOutput);
    });
});
