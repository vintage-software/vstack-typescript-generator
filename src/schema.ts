import { Utility } from './utility';
import { CSharpParser } from './c-sharp-parser';
import { CSharpEnum, CSharpClassOrStruct, CSharpType } from './c-sharp-objects';

export function schemaGenerator(inputs: string[]) {
  let results: string[] = [];
  const types: CSharpClassOrStruct[] = (<CSharpType[]>[].concat.apply([], inputs.map(input => CSharpParser.parse(input))))
    .filter(type => type instanceof CSharpEnum === false)
    .map(type => <CSharpClassOrStruct>type)
    .filter(type => type.properties.find(property => property.name === 'Id'));

  const typeNames = types.map(type => type.name);

  results.push('export function getSchema(schema: any) {');

  results.push('\tconst schemas = {');
  types.forEach(type => {
    const name = Utility.transfromPropertyName(type.name);
    results.push(`\t\t${name}: new schema.Entity('${name}'),`);
  });
  removeLastComma(results);
  results.push('\t}\n');

  types.forEach(type => {
    const name = Utility.transfromPropertyName(type.name);
    const relations = type.properties.filter(property => typeNames.indexOf(property.type.name) >= 0);
    if (relations.length) {
      results.push(`\tschemas['${name}'].define({`);
      relations.forEach(relation => {
        const name = Utility.transfromPropertyName(relation.name);
        const typeName = Utility.transfromPropertyName(relation.type.name);
        if (relation.type.isCollection) {
          results.push(`\t\t${name}: [ schemas['${typeName}'] ],`);
        } else {
          results.push(`\t\t${name}: schemas['${typeName}'],`);
        }
      });
      removeLastComma(results);
      results.push('\t});\n');
    }
  });

  results.push('\treturn schema;');
  results.push('}');

  return results.join('\n');
}

function removeLastComma(results: string[]) {
  const lastEntry = results[results.length - 1];
  if (lastEntry && lastEntry[lastEntry.length - 1] === ',') {
    results[results.length - 1] = lastEntry.substr(0, lastEntry.length - 1);
  }
}
