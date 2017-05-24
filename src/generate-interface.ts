import { CSharpClassOrStruct } from './c-sharp-objects';
import { Options } from './options';
import { Utility } from './utility';

export function generateInterface(type: CSharpClassOrStruct, options: Options): string {
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
