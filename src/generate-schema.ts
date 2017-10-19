import * as pluralize from 'pluralize';

import { CSharpClassOrStructOrInterface, CSharpEnum, CSharpType } from './c-sharp-objects';
import { CSharpParser } from './c-sharp-parser';
import { Utility } from './utility';

export function generateSchema(inputs: string[]) {
  let result = '';

  const types: CSharpClassOrStructOrInterface[] = (<CSharpType[]>[].concat.apply([], inputs.map(input => CSharpParser.parse(input))))
    .filter(type => type instanceof CSharpEnum === false)
    .map(type => <CSharpClassOrStructOrInterface>type)
    .filter(type => isEntityType(type));

  const typeNames = types.map(type => type.name);

  result += 'export function getSchema(schema: any) {\n';

  result += '  const schemas = {\n';

  const schemas = types
    .map(type => pluralize(Utility.transfromPropertyName(type.name)))
    .map(name => `    ${name}: new schema.Entity('${name}')`);
  result += `${schemas.join(',\n')}\n`;

  result += '  }\n\n';

  for (const type of types) {
    const name = pluralize(Utility.transfromPropertyName(type.name));
    const relations = type.properties.filter(property => typeNames.indexOf(property.type.name) >= 0);
    if (relations.length) {
      result += `  schemas['${name}'].define({\n`;

      const definition = relations
        .map(relation => {
          const propertyName = Utility.transfromPropertyName(relation.name);
          const typeName = pluralize(Utility.transfromPropertyName(relation.type.name));

          return relation.type.isCollection ?
            `    ${propertyName}: [ schemas['${typeName}'] ]` : `    ${propertyName}: schemas['${typeName}']`;
        });

      result += `${definition.join(',\n')}\n`;
      result += '  });\n\n';
    }
  }

  result += '  return schemas;\n';
  result += '}\n';

  return result;
}

function isEntityType(type: CSharpClassOrStructOrInterface) {
  return type.properties.find(property => property.name === 'Id')
    || type.name.endsWith('Detail')
    || type.namespace.includes('Dto');
}
