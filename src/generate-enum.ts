import { CSharpEnum } from './c-sharp-objects';

export function generateEnum(cSharpEnum: CSharpEnum): string {
  'use strict';

  let nextIndex = 0;
  let entryStrings: string[] = [];
  for (let entry of cSharpEnum.entries) {
    entryStrings.push(`${entry.name} = ${entry.value || nextIndex}`);

    nextIndex = isNaN(entry.value) ? nextIndex + 1 : entry.value + 1;
  }

  return `export enum ${cSharpEnum.name} {\n  ${entryStrings.join(',\n  ')}\n}`;
}
