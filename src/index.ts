'use strict';

import { Options } from './options';
import { Utility } from './utility';
import { CSharpParser } from './c-sharp-parser';
import { CSharpEnum, CSharpClassOrStruct } from './c-sharp-objects';

declare var require: (i: string) => any;
let pluralize = require('pluralize'); // import not working
let camelcase = require('camelcase'); // import not working

const primaryFilterRegex = /PrimaryFilter<Dmn.([\w]+)/;
const primaryDtoFilterRegex = /PrimaryDtoFilter<Dmn.([\w]+)/;

export default function tsGenerator(input: string, options: Options = null) {
  let results: string[] = [];

  let types = CSharpParser.parse(input);
  for (let type of types) {
    let isPrimaryFilter = type.inherits && !!type.inherits.join(', ').match(primaryFilterRegex);
    let isPrimaryDtoFilter = type.inherits && !!type.inherits.join(', ').match(primaryDtoFilterRegex);

    if (type instanceof CSharpEnum) {
      results.push(generateEnum(<CSharpEnum>type));
    } else if (type instanceof CSharpClassOrStruct && !isPrimaryFilter && !isPrimaryDtoFilter) {
      results.push(generateInterface(<CSharpClassOrStruct>type, options));
    } else if (type instanceof CSharpClassOrStruct && isPrimaryDtoFilter) {
      results.push(generatePrimaryFilter(<CSharpClassOrStruct>type, options));
    }
  }

  let result = results.join('\n\n');

  if (result && options && options.moduleName) {
    let indentedResult = result
      .split('\n')
      .map(line => line ? `  ${line}` : '')
      .join('\n');

    result = `module ${options.moduleName} {\n${indentedResult}\n}`;
  }

  return result;
}

function generateEnum(cSharpEnum: CSharpEnum): string {
  'use strict';

  let nextIndex = 0;
  let entryStrings: string[] = [];
  for (let entry of cSharpEnum.entries) {
    entryStrings.push(`${entry.name} = ${entry.value || nextIndex}`);

    nextIndex = isNaN(entry.value) ? nextIndex + 1 : entry.value + 1;
  }

  return `export enum ${cSharpEnum.name} {\n  ${entryStrings.join(',\n  ')}\n}`;
}

function generateInterface(type: CSharpClassOrStruct, options: Options): string {
  'use strict';

  let baseClass;
  if (type.inherits) {
    let baseClasses = type.inherits
      .filter(i => i && i.length && i[0] !== 'I');
    baseClass = baseClasses.length === 1 ? baseClasses[0] : '';
  }
  let tsExtends = baseClass ? ` extends ${baseClass}` : '';

  let propertyStrings: string[] = [];
  for (let property of type.properties) {
    let tsPropertyName = camelcase(property.name);
    if (property.type.isNullable) {
      tsPropertyName += '?';
    }

    let tsType = Utility.translateType(property.type.name, options) || property.type.name;
    if (property.type.isCollection) {
      tsType += '[]';
    }

    propertyStrings.push(`${tsPropertyName}: ${tsType}`);
  }

  return `export interface ${type.name}${tsExtends} {\n  ${propertyStrings.join(';\n  ')};\n}`;
}

function generatePrimaryFilter(type: CSharpClassOrStruct, options: Options): string {
  'use strict';

  let domainType = type.inherits.join(', ').match(primaryDtoFilterRegex)[1];
  let filterGroup = pluralize(domainType);
  let filterType = options && options.dtoModuleName ? `${options.dtoModuleName}.${domainType}` : domainType;

  let tsConstructorParameters: string[] = [];
  let filterParameters: string[] = [];
  if (type.constructors.length === 1) {
    for (let parameter of type.constructors[0].parameters) {
      let tsParameterType = Utility.translateType(parameter.type.name, options);

      let shouldEncode = tsParameterType === 'string' || tsParameterType === 'any' || tsParameterType === 'Date';
      let shouldToString = tsParameterType !== 'string';
      let toString = tsParameterType === 'Date' ? 'toISOString' : 'toString';

      if (parameter.type.isCollection) {
        tsParameterType += '[]';
      }
      tsConstructorParameters.push(`private ${parameter.name}: ${tsParameterType}`);

      let filterParameter: string;
      if (parameter.type.isCollection) {
        let mapToExpression = 'i';
        if (shouldToString) {
          mapToExpression = `i.${toString}()`;
        }
        if (shouldEncode) {
          mapToExpression = `encodeURIComponent(${mapToExpression})`;
        }
        let mapCall = mapToExpression !== 'i' ? `.map(i => ${mapToExpression})` : '';

        filterParameter = `this.${parameter.name}${mapCall}.join(',')`;
      } else {
        filterParameter = `this.${parameter.name}`;
        if (shouldToString) {
          filterParameter = `${filterParameter}.${toString}()`;
        }
        if (shouldEncode) {
          filterParameter = `encodeURIComponent(${filterParameter})`;
        }
      }
      filterParameters.push(filterParameter);
    }
  }

  let result = '';
  result += `export class ${filterGroup}${type.name}Filter implements IPrimaryFilter<${filterType}> {\n`;
  result += `  constructor(${tsConstructorParameters.join(', ')}) {\n`;
  result += `  }\n\n`;

  result += `  public getFilterName(): string {\n`;
  result += `    return '${type.name}';\n`;
  result += `  }\n\n`;

  result += `  public getParameters(): string[] {\n`;
  result += `    return [${filterParameters.join(', ')}];\n`;
  result += `  }\n`;
  result += `}`;
  return result;
}
