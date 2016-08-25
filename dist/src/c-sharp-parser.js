"use strict";
var c_sharp_objects_1 = require('./c-sharp-objects');
var CSharpParser = (function () {
    function CSharpParser() {
    }
    CSharpParser.parse = function (input) {
        input = CSharpParser.stripIgnored(input);
        input = CSharpParser.stripComments(input);
        var namespaceMatch = input.match(/namespace\s+([\w\.]+)/);
        var namespace = namespaceMatch ? namespaceMatch[1] : '';
        var types = [];
        var typeMatch;
        var typeRegex = /^([\t ]*)(?:public\s*|partial\s*|abstract\s*)*\s*(enum|class|struct)\s+([\w\d_<>]+)(?:\s*:\s*((?:(?:[\w\d\.\<\>_]+)(?:,\s+)?)+))?\s*\{((?:.|\n|\r)*?)^\1\}/gm;
        var getNextTypeMatch = function () { return typeMatch = typeRegex.exec(input); };
        while (getNextTypeMatch() !== null) {
            var type = typeMatch[2];
            var name_1 = typeMatch[3];
            var inherits = typeMatch[4];
            var body = typeMatch[5];
            if (type === 'class' || type === 'struct') {
                types.push(CSharpParser.parseClassOrStruct(namespace, name_1, inherits, body));
            }
            else if (type === 'enum') {
                types.push(CSharpParser.parseEnum(namespace, name_1, inherits, body));
            }
        }
        return types;
    };
    CSharpParser.stripIgnored = function (input) {
        var ignoredRegex = /\/\/\s*ts-generator-ignore\s*.*(enum|class|struct)\s+/gm;
        return input.replace(ignoredRegex, '');
    };
    CSharpParser.stripComments = function (input) {
        var blockCommentRegex = /\/\*([\s\S]*?)\*\//gm;
        var lineCommentRegex = /\/\/(.*)/g;
        return input
            .replace(blockCommentRegex, '')
            .split('\n')
            .map(function (line) { return line.replace(lineCommentRegex, ''); })
            .join('\n');
    };
    CSharpParser.parseClassOrStruct = function (namespace, name, inherits, body) {
        var constructors = [];
        var constructorMatch;
        var constructorRegex = /public\s+([\w]+)\s*\(((?:.|\n)*?)\)/gm;
        var getNextConstructorMatch = function () { return constructorMatch = constructorRegex.exec(body); };
        while (getNextConstructorMatch() !== null) {
            var typeName = constructorMatch[1];
            var parameterList = constructorMatch[2];
            if (typeName === name) {
                var parameters = parameterList.length ? parameterList
                    .split(',')
                    .map(function (parameter) {
                    var parameterMatch = parameter.trim().match(/([^\s]+)\s+([\w\d]+)/);
                    var parameterType = CSharpParser.parseMemberTypeName(parameterMatch[1]);
                    var parameterName = parameterMatch[2];
                    return new c_sharp_objects_1.CSharpParameter(parameterType, parameterName);
                }) : [];
                constructors.push(new c_sharp_objects_1.CSharpContructor(parameters));
            }
        }
        var properties = [];
        var propertyMatch;
        var propertyRegex = /public\s*([^\s]+)\s*([\w\d]+)\s*{\s*get;\s*set;\s*}/gm;
        var getNextPropertyMatch = function () { return propertyMatch = propertyRegex.exec(body); };
        while (getNextPropertyMatch() !== null) {
            var typeName = propertyMatch[1];
            var propertyName = propertyMatch[2];
            var memberType = CSharpParser.parseMemberTypeName(typeName);
            properties.push(new c_sharp_objects_1.CSharpProperty(memberType, propertyName));
        }
        return new c_sharp_objects_1.CSharpClassOrStruct(namespace, name, inherits, constructors, properties);
    };
    CSharpParser.parseEnum = function (namespace, name, inherits, body) {
        var entries = [];
        var entryMatch;
        var entryRegex = /^\s*([\w\d_]+)\s*=?\s*([0-9A-Fx]+)?,?\s*$/gm;
        var getNextEntryMatch = function () { return entryMatch = entryRegex.exec(body); };
        while (getNextEntryMatch() !== null) {
            var entryName = entryMatch[1];
            var entryValue = entryMatch[2];
            var radix = /^[0-9]+$/.test(entryValue) ? 10 : 16;
            var entryValueParsed = parseInt(entryValue, radix);
            if (entryName.indexOf('[') === -1) {
                entries.push(new c_sharp_objects_1.CSharpEnumEntry(entryName, entryValueParsed));
            }
        }
        return new c_sharp_objects_1.CSharpEnum(namespace, name, inherits, entries);
    };
    CSharpParser.parseMemberTypeName = function (typeName) {
        var lastNameRegex = /\.?([\w<>\[\]\?]+)$/;
        typeName = typeName.match(lastNameRegex)[1];
        var nullableRegex = /(?:^Nullable<([^\s]+)>$)|(?:^([^\s]+)\?$)/;
        var nullableMatch = nullableRegex.exec(typeName);
        if (nullableMatch) {
            typeName = (nullableMatch[1] || nullableMatch[2]).match(lastNameRegex)[1];
        }
        var collectionRegex = /(?:^(?:List|IEnumerable)<([\w\d]+)>$)|(?:^([\w\d]+)\[\]$)/;
        var collectionMatch = collectionRegex.exec(typeName);
        if (collectionMatch) {
            typeName = (collectionMatch[1] || collectionMatch[2]).match(lastNameRegex)[1];
        }
        return new c_sharp_objects_1.CSharpMemberType(typeName, !!nullableMatch, !!collectionMatch);
    };
    return CSharpParser;
}());
exports.CSharpParser = CSharpParser;
//# sourceMappingURL=c-sharp-parser.js.map