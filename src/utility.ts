import { Options } from './options';

export class Utility {
    public static translateType(csType: string, options: Options) {
        if (['string', 'String', 'Guid'].indexOf(csType) !== -1) {
            return 'string';
        } else if (['bool', 'Boolean'].indexOf(csType) !== -1) {
            return 'boolean';
        } else if (['dynamic', 'JObject'].indexOf(csType) !== -1) {
            return 'any';
        } else if (['int', 'short', 'decimal', 'double', 'float', 'Int32', 'Int64'].indexOf(csType) !== -1) {
            return 'number';
        } else if (csType === 'DateTime') {
            return options && options.dateTimeToDate ? 'Date' : 'string';
        }
    }
}
