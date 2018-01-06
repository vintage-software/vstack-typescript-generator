import * as camelcase from 'camelcase';

import { Options } from './options';

export class Utility {
  static translateType(csType: string, options: Options) {
    if (['string', 'String', 'Guid'].indexOf(csType) !== -1) {
      return 'string';
    } else if (['bool', 'Boolean'].indexOf(csType) !== -1) {
      return 'boolean';
    } else if (['dynamic', 'JObject'].indexOf(csType) !== -1) {
      return 'any';
    } else if (['byte', 'short', 'int', 'long', 'float', 'double', 'decimal'].indexOf(csType) !== -1) {
      return 'number';
    } else if (['Byte', 'Int16', 'Int32', 'Int64', 'Single', 'Double', 'Decimal'].indexOf(csType) !== -1) {
      return 'number';
    } else if (csType === 'DateTime') {
      return options.dateTimeToDate ? 'Date' : 'string';
    } else if (options.tsTypeMap[csType]) {
      return options.tsTypeMap[csType];
    }

    return undefined;
  }

  static transfromPropertyName(propertyName: string) {
    let tsPropertyName = camelcase(propertyName);

    if (propertyName.startsWith('_')) {
      tsPropertyName = `_${tsPropertyName}`;
    }

    return tsPropertyName;
  }
}
