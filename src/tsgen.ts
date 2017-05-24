import * as pluralize from 'pluralize';

import { defaultOptions, Options } from './options';
import { Utility } from './utility';
import { CSharpParser } from './c-sharp-parser';
import { CSharpEnum, CSharpClassOrStruct } from './c-sharp-objects';

const dtoFilterRegex = /DtoFilter<(?:Dmn\.)?([\w]+)/;
const primaryDtoFilterRegex = /PrimaryDtoFilter<(?:Dmn\.)?([\w]+)/;
const elasticDtoFilterRegex = /ElasticDtoFilter<(?:Dmn\.)?([\w]+)/;
const bypassElasticDtoFilterRegex = /BypassElasticDtoFilter<(?:Dmn\.)?([\w]+)/;

export function tsGenerator(input: string, options: Options = null) {
  let results: string[] = [];

  options = Object.assign({}, defaultOptions, options);

  let types = CSharpParser.parse(input);
  for (let type of types) {
    let dtoFilterMatch = type.inherits
      .filter(inherit => inherit.match(primaryDtoFilterRegex) === null)
      .filter(inherit => inherit.match(elasticDtoFilterRegex) === null)
      .filter(inherit => inherit.match(bypassElasticDtoFilterRegex) === null)
      .map(inherit => inherit.match(dtoFilterRegex))
      .find(match => match !== null);

    let primaryDtoFilterMatch = type.inherits
      .map(inherit => inherit.match(primaryDtoFilterRegex))
      .find(match => match !== null);

    let elasticDtoFilterMatch = type.inherits
      .filter(inherit => inherit.match(bypassElasticDtoFilterRegex) === null)
      .map(inherit => inherit.match(elasticDtoFilterRegex))
      .find(match => match !== null);

    let bypassElasticDtoFilterMatch = type.inherits
      .map(inherit => inherit.match(bypassElasticDtoFilterRegex))
      .find(match => match !== null);

    let isFilter = type.inherits.some(inherit => inherit.includes('Filter'));

    if (type instanceof CSharpEnum) {
      results.push(generateEnum(<CSharpEnum>type));
    } else if (dtoFilterMatch && !primaryDtoFilterMatch) {
      results.push(generateFilter(<CSharpClassOrStruct>type, options, 'Filter', dtoFilterMatch[1]));
    } else if (dtoFilterMatch && primaryDtoFilterMatch) {
      results.push(generateFilter(<CSharpClassOrStruct>type, options, 'Filter', dtoFilterMatch[1]));
      results.push(generateFilter(<CSharpClassOrStruct>type, options, 'PrimaryFilter', dtoFilterMatch[1]));
    } else if (primaryDtoFilterMatch) {
      results.push(generateFilter(<CSharpClassOrStruct>type, options, 'PrimaryFilter', primaryDtoFilterMatch[1]));
    } else if (elasticDtoFilterMatch) {
      results.push(generateFilter(<CSharpClassOrStruct>type, options, 'ElasticFilter', elasticDtoFilterMatch[1]));
    } else if (bypassElasticDtoFilterMatch) {
      results.push(generateFilter(<CSharpClassOrStruct>type, options, 'BypassElasticFilter', bypassElasticDtoFilterMatch[1]));
    } else if (isFilter === false) {
      results.push(generateInterface(<CSharpClassOrStruct>type, options));
    }
  }

  return results.join('\n\n');
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
    let tsPropertyName = Utility.transfromPropertyName(property.name);
    if (property.type.isNullable || (options.allPropertiesOptional && tsPropertyName !== 'id')) {
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

function generateFilter(type: CSharpClassOrStruct, options: Options, filterType: string, domainType: string): string {
  'use strict';

  let tsDomainType =  options.tsTypeMap[domainType] ? options.tsTypeMap[domainType] : domainType;

  let tsConstructorParameters: string[] = [];
  let filterParameters: string[] = [];
  if (type.constructors.length === 1) {
    for (let parameter of type.constructors[0].parameters) {
      let tsParameterType = Utility.translateType(parameter.type.name, options);

      if (tsParameterType) {
        if (parameter.name === 'fieldName') {
          tsConstructorParameters.push(`private ${parameter.name}: (i: ${domainType}) => any`);
          filterParameters.push(`getPropertyName(this.${parameter.name})`);
        } else {
          let shouldEncode = tsParameterType === 'string' || tsParameterType === 'any' || tsParameterType === 'Date';
          let shouldToString = tsParameterType !== 'string';
          let toString = tsParameterType === 'Date' ? 'toISOString' : 'toString';

          if (parameter.type.isCollection) {
            tsParameterType += '[]';
          }

          let tsConstructorParameter = parameter.defaultValue ?
            `private ${parameter.name}: ${tsParameterType} = ${parameter.defaultValue}` :
            `private ${parameter.name}: ${tsParameterType}`;

          tsConstructorParameters.push(tsConstructorParameter);

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

          if (parameter.defaultValue === 'null') {
            filterParameter = `this.${parameter.name} ? ${filterParameter} : null`;
          }

          filterParameters.push(filterParameter);
        }
      }
    }
  }

  return `
export class ${pluralize(domainType)}${type.name}${filterType} extends ${filterType}<${tsDomainType}> {
  constructor(${tsConstructorParameters.join(', ')}) {
    super();
  }

  public getFilterName(): string {
    return '${type.name}';
  }

  public getParameters(): string[] {
    return [${filterParameters.join(', ')}];
  }

  protected __dummy(): ${tsDomainType} {
    return null;
  }
}`.trim();
}
