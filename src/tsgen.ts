import { CSharpClassOrStructOrInterface, CSharpEnum } from './c-sharp-objects';
import { CSharpParser } from './c-sharp-parser';
import { defaultOptions, Options } from './options';

import { generateEnum } from './generate-enum';
import { generateFilter } from './generate-filter';
import { generateInterface } from './generate-interface';

const dtoFilterRegex = /DtoFilter<(?:Dmn\.)?([\w]+)/;
const primaryDtoFilterRegex = /PrimaryDtoFilter<(?:Dmn\.)?([\w]+)/;
const elasticDtoFilterRegex = /ElasticDtoFilter<(?:Dmn\.)?([\w]+)/;
const bypassElasticDtoFilterRegex = /BypassElasticDtoFilter<(?:Dmn\.)?([\w]+)/;

export function tsGenerator(input: string, options: Options = null) {
  const results: string[] = [];

  options = Object.assign({}, defaultOptions, options);

  const types = CSharpParser.parse(input);
  for (const type of types) {
    const dtoFilterMatch = type.inherits
      .filter(inherit => inherit.match(primaryDtoFilterRegex) === null)
      .filter(inherit => inherit.match(elasticDtoFilterRegex) === null)
      .filter(inherit => inherit.match(bypassElasticDtoFilterRegex) === null)
      .map(inherit => inherit.match(dtoFilterRegex))
      .find(match => match !== null);

    const primaryDtoFilterMatch = type.inherits
      .map(inherit => inherit.match(primaryDtoFilterRegex))
      .find(match => match !== null);

    const elasticDtoFilterMatch = type.inherits
      .filter(inherit => inherit.match(bypassElasticDtoFilterRegex) === null)
      .map(inherit => inherit.match(elasticDtoFilterRegex))
      .find(match => match !== null);

    const bypassElasticDtoFilterMatch = type.inherits
      .map(inherit => inherit.match(bypassElasticDtoFilterRegex))
      .find(match => match !== null);

    const isFilter = type.inherits.some(inherit => inherit.includes('Filter'));

    if (type instanceof CSharpEnum) {
      results.push(generateEnum(<CSharpEnum>type));
    } else if (dtoFilterMatch && !primaryDtoFilterMatch) {
      results.push(generateFilter(<CSharpClassOrStructOrInterface>type, options, 'Filter', dtoFilterMatch[1]));
    } else if (dtoFilterMatch && primaryDtoFilterMatch) {
      results.push(generateFilter(<CSharpClassOrStructOrInterface>type, options, 'Filter', dtoFilterMatch[1]));
      results.push(generateFilter(<CSharpClassOrStructOrInterface>type, options, 'PrimaryFilter', dtoFilterMatch[1]));
    } else if (primaryDtoFilterMatch) {
      results.push(generateFilter(<CSharpClassOrStructOrInterface>type, options, 'PrimaryFilter', primaryDtoFilterMatch[1]));
    } else if (elasticDtoFilterMatch) {
      results.push(generateFilter(<CSharpClassOrStructOrInterface>type, options, 'ElasticFilter', elasticDtoFilterMatch[1]));
    } else if (bypassElasticDtoFilterMatch) {
      results.push(generateFilter(<CSharpClassOrStructOrInterface>type, options, 'BypassElasticFilter', bypassElasticDtoFilterMatch[1]));
    } else if (isFilter === false) {
      results.push(generateInterface(<CSharpClassOrStructOrInterface>type, options));
    }
  }

  return results.join('\n\n');
}
