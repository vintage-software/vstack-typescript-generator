import * as pluralize from 'pluralize';

import { CSharpClassOrStruct } from './c-sharp-objects';
import { Options } from './options';
import { Utility } from './utility';

export function generateFilter(type: CSharpClassOrStruct, options: Options, filterType: string, domainType: string): string {
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
