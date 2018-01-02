import { CSharpEnum, CSharpEnumEntry } from './c-sharp-objects';

export function generateEnum(cSharpEnum: CSharpEnum): string {
  'use strict';

  let nextIndex = 0;
  const entryStrings: string[] = [];
  for (const entry of cSharpEnum.entries) {
    const value = !!entry.value ? parseEnumValue(entry.value, cSharpEnum.entries) : undefined;

    entryStrings.push(`${entry.name} = ${value !== undefined ? value : nextIndex}`);

    nextIndex = isNaN(value) ? nextIndex + 1 : value + 1;
  }

  return `export enum ${cSharpEnum.name} {\n  ${entryStrings.join(',\n  ')}\n}`;
}

function parseEnumValue(value: string, entries: CSharpEnumEntry[]): number {
  let parsedValue: number;

  if (value.startsWith('~')) {
    const valueNoTilde = value.substr(1);
    const matchingEntry = entries.find(e => e.name === valueNoTilde);

    // tslint:disable-next-line:no-bitwise
    parsedValue = matchingEntry ? ~parseEnumValue(matchingEntry.value, entries) : ~parseAsDecimalOrHexadecimal(valueNoTilde);
  } else {
    parsedValue = parseAsDecimalOrHexadecimal(value);
  }

  return parsedValue;
}

function parseAsDecimalOrHexadecimal(value: string) {
  const radix = value.startsWith('0x') ? 16 : 10;
  return parseInt(value, radix);
}
