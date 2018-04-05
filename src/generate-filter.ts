import * as pluralize from 'pluralize';

import { CSharpClassOrStructOrInterface } from './c-sharp-objects';
import { Options } from './options';
import { Utility } from './utility';

export function generateFilter(type: CSharpClassOrStructOrInterface, options: Options, filterType: string, domainType: string): string {
  'use strict';

  const tsDomainType =  options.tsTypeMap[domainType] ? options.tsTypeMap[domainType] : domainType;

  const tsConstructorParameters: string[] = [];
  const filterParameters: string[] = [];
  if (type.constructors.length === 1) {
    for (const parameter of type.constructors[0].parameters) {
      let tsParameterType = Utility.translateType(parameter.type.name, options);

      if (tsParameterType) {
        if (parameter.name === 'fieldName') {
          tsConstructorParameters.push(`private ${parameter.name}: (i: ${domainType}) => any`);
          filterParameters.push(`getPropertyName(this.${parameter.name})`);
        } else {
          const shouldEncode = tsParameterType === 'string' || tsParameterType === 'any' || tsParameterType === 'Date';
          const shouldToString = tsParameterType !== 'string';
          const toStringMethodName = tsParameterType === 'Date' ? 'toISOString' : 'toString';

          if (parameter.type.isCollection) {
            tsParameterType += '[]';
          }

          const tsConstructorParameter = parameter.defaultValue ?
            `private ${parameter.name}: ${tsParameterType} = ${parameter.defaultValue}` :
            `private ${parameter.name}: ${tsParameterType}`;

          tsConstructorParameters.push(tsConstructorParameter);

          let filterParameter: string;
          if (parameter.type.isCollection) {
            const mapVariable = 'value';
            let mapExpression = mapVariable;
            if (shouldToString) {
              mapExpression = getToStringExpression(mapVariable, toStringMethodName);
            }
            if (shouldEncode) {
              mapExpression = `encodeURIComponent(${mapExpression})`;
            }
            const mapCall = mapExpression !== mapVariable ? `.map(${mapVariable} => ${mapExpression})` : '';

            filterParameter = `this.${parameter.name}${mapCall}.join(',')`;
          } else {
            filterParameter = `this.${parameter.name}`;
            if (shouldToString) {
              filterParameter = getToStringExpression(filterParameter, toStringMethodName);
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

function getToStringExpression(variable: string, toStringMethodName: string) {
  return `${variable} === null || ${variable} === undefined ? ${variable} : ${variable}.${toStringMethodName}()`;
}
