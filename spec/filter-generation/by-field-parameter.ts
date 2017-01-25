'use strict';

import 'jasmine';
import { tsGenerator } from '../../src/tsgen';

let sampleFile = `namespace Services.Filters.PostalCodeDetailsFilters
{
    public class ByField
        : ByFieldElasticDtoFilter<PostalCodeDetail, Permissions>
    {
        public ByField(string fieldName, string value)
            : base(fieldName, value)
        {
        }
    }
}`;

let expectedOutput = `export class PostalCodeDetailsByFieldElasticFilter extends ElasticFilter<PostalCodeDetail> {
  constructor(private fieldName: (i: PostalCodeDetail) => any, private value: string) {
    super();
  }

  public getFilterName(): string {
    return 'ByField';
  }

  public getParameters(): string[] {
    return [getPropertyName(this.fieldName), encodeURIComponent(this.value)];
  }

  protected __dummy(): PostalCodeDetail {
    return null;
  }
}`

describe('vstack-typescript-generation primary filter generator', () => {
  it('should transform a filter with a field name parameter correctly', () => {
    let result = tsGenerator(sampleFile);
    expect(result).toEqual(expectedOutput);
  });
});
