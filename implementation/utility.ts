/// <reference path="options.ts" />

class Utility {
    public static stripComments(input: string): string {
        let blockCommentRegex = new RegExp('/\\*([\\s\\S]*)\\*/', 'gm');
        let lineCommentRegex = new RegExp('//(.*)', 'g');

        return input
            .replace(blockCommentRegex, '')
            .split('\n')
            .map(line => line.replace(lineCommentRegex, ''))
            .join('\n');
    }

    public static translateType(csType: string, options: IClassInterfaceOptions) {
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
