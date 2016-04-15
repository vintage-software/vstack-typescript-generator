class Utility {
    public static typeTranslation =  {
        int: 'number',
        double: 'number',
        float: 'number',
        Int32: 'number',
        Int64: 'number',
        short: 'number',
        long: 'number',
        decimal: 'number',
        bool: 'boolean',
        DateTime: 'string',
        Guid: 'string',
        JObject: 'any',
        string: 'string',
        dynamic: 'any',
    };

    public static stripComments(input: string): string {
        let blockCommentRegex = new RegExp('/\\*([\\s\\S]*)\\*/', 'gm');
        let lineCommentRegex = new RegExp('//(.*)', 'g');

        return input
            .replace(blockCommentRegex, '')
            .split('\n')
            .map(line => line.replace(lineCommentRegex, ''))
            .join('\n');
    }
}
