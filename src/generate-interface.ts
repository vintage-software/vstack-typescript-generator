import { CSharpClassOrStructOrInterface } from './c-sharp-objects';
import { Options } from './options';
import { Utility } from './utility';

export function generateInterface(type: CSharpClassOrStructOrInterface, options: Options): string {
  'use strict';

  let baseClass;
  if (type.inherits) {
    const baseClasses = type.inherits
      .filter(i => i && i.length && i[0] !== 'I');
    baseClass = baseClasses.length === 1 ? baseClasses[0] : '';
  }
  const tsExtends = baseClass ? ` extends ${baseClass}` : '';

  const propertyStrings: string[] = [];
  for (const property of type.properties) {
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

  let properties = '';
  if (type.properties.length > 0) {
    properties = `  ${propertyStrings.join(';\n  ')};\n`;
  }

  return `export interface ${type.name}${tsExtends} {\n${properties}}`;
}
