var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
System.register("options", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("utility", [], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var Utility;
    return {
        setters:[],
        execute: function() {
            Utility = (function () {
                function Utility() {
                }
                Utility.translateType = function (csType, options) {
                    if (['string', 'String', 'Guid'].indexOf(csType) !== -1) {
                        return 'string';
                    }
                    else if (['bool', 'Boolean'].indexOf(csType) !== -1) {
                        return 'boolean';
                    }
                    else if (['dynamic', 'JObject'].indexOf(csType) !== -1) {
                        return 'any';
                    }
                    else if (['int', 'short', 'decimal', 'double', 'float', 'Int32', 'Int64'].indexOf(csType) !== -1) {
                        return 'number';
                    }
                    else if (csType === 'DateTime') {
                        return options && options.dateTimeToDate ? 'Date' : 'string';
                    }
                };
                return Utility;
            }());
            exports_2("Utility", Utility);
        }
    }
});
System.register("c-sharp-objects", [], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var CSharpType, CSharpClassOrStruct, CSharpMemberType, CSharpContructor, CSharpMember, CSharpProperty, CSharpParameter, CSharpEnum, CSharpEnumEntry;
    return {
        setters:[],
        execute: function() {
            CSharpType = (function () {
                function CSharpType(namespace, name, inherits) {
                    this.namespace = namespace;
                    this.name = name;
                    this.inherits = inherits;
                }
                return CSharpType;
            }());
            exports_3("CSharpType", CSharpType);
            CSharpClassOrStruct = (function (_super) {
                __extends(CSharpClassOrStruct, _super);
                function CSharpClassOrStruct(namespace, name, inherits, constructors, properties) {
                    _super.call(this, namespace, name, inherits);
                    this.namespace = namespace;
                    this.name = name;
                    this.inherits = inherits;
                    this.constructors = constructors;
                    this.properties = properties;
                }
                return CSharpClassOrStruct;
            }(CSharpType));
            exports_3("CSharpClassOrStruct", CSharpClassOrStruct);
            CSharpMemberType = (function () {
                function CSharpMemberType(name, isNullable, isCollection) {
                    this.name = name;
                    this.isNullable = isNullable;
                    this.isCollection = isCollection;
                }
                return CSharpMemberType;
            }());
            exports_3("CSharpMemberType", CSharpMemberType);
            CSharpContructor = (function () {
                function CSharpContructor(parameters) {
                    this.parameters = parameters;
                }
                return CSharpContructor;
            }());
            exports_3("CSharpContructor", CSharpContructor);
            CSharpMember = (function () {
                function CSharpMember(type, name) {
                    this.type = type;
                    this.name = name;
                }
                return CSharpMember;
            }());
            exports_3("CSharpMember", CSharpMember);
            CSharpProperty = (function (_super) {
                __extends(CSharpProperty, _super);
                function CSharpProperty(type, name) {
                    _super.call(this, type, name);
                    this.type = type;
                    this.name = name;
                }
                return CSharpProperty;
            }(CSharpMember));
            exports_3("CSharpProperty", CSharpProperty);
            CSharpParameter = (function (_super) {
                __extends(CSharpParameter, _super);
                function CSharpParameter(type, name) {
                    _super.call(this, type, name);
                    this.type = type;
                    this.name = name;
                }
                return CSharpParameter;
            }(CSharpMember));
            exports_3("CSharpParameter", CSharpParameter);
            CSharpEnum = (function (_super) {
                __extends(CSharpEnum, _super);
                function CSharpEnum(namespace, name, inherits, entries) {
                    _super.call(this, namespace, name, inherits);
                    this.namespace = namespace;
                    this.name = name;
                    this.inherits = inherits;
                    this.entries = entries;
                }
                return CSharpEnum;
            }(CSharpType));
            exports_3("CSharpEnum", CSharpEnum);
            CSharpEnumEntry = (function () {
                function CSharpEnumEntry(name, value) {
                    this.name = name;
                    this.value = value;
                }
                return CSharpEnumEntry;
            }());
            exports_3("CSharpEnumEntry", CSharpEnumEntry);
        }
    }
});
System.register("c-sharp-parser", ["c-sharp-objects"], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var c_sharp_objects_1;
    var CSharpParser;
    return {
        setters:[
            function (c_sharp_objects_1_1) {
                c_sharp_objects_1 = c_sharp_objects_1_1;
            }],
        execute: function() {
            CSharpParser = (function () {
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
                    var blockCommentRegex = new RegExp('/\\*([\\s\\S]*)\\*/', 'gm');
                    var lineCommentRegex = new RegExp('//(.*)', 'g');
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
                    var entryRegex = /([^\s,]+)\s*=?\s*(\d+)?,?/gm;
                    var getNextEntryMatch = function () { return entryMatch = entryRegex.exec(body); };
                    while (getNextEntryMatch() !== null) {
                        var entryName = entryMatch[1];
                        var entryValue = parseInt(entryMatch[2], 10);
                        if (entryName.indexOf('[') === -1) {
                            entries.push(new c_sharp_objects_1.CSharpEnumEntry(entryName, entryValue));
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
            exports_4("CSharpParser", CSharpParser);
        }
    }
});
System.register("index", ["utility", "c-sharp-parser", "c-sharp-objects"], function(exports_5, context_5) {
    'use strict';
    var __moduleName = context_5 && context_5.id;
    var utility_1, c_sharp_parser_1, c_sharp_objects_2;
    var pluralize, primaryFilterRegex, primaryDtoFilterRegex;
    function tsGenerator(input, options) {
        if (options === void 0) { options = null; }
        var results = [];
        var types = c_sharp_parser_1.CSharpParser.parse(input);
        for (var _i = 0, types_1 = types; _i < types_1.length; _i++) {
            var type = types_1[_i];
            var isPrimaryFilter = type.inherits && !!type.inherits.match(primaryFilterRegex);
            var isPrimaryDtoFilter = type.inherits && !!type.inherits.match(primaryDtoFilterRegex);
            if (type instanceof c_sharp_objects_2.CSharpEnum) {
                results.push(generateEnum(type, options));
            }
            else if (type instanceof c_sharp_objects_2.CSharpClassOrStruct && !isPrimaryFilter && !isPrimaryDtoFilter) {
                results.push(generateInterface(type, options));
            }
            else if (type instanceof c_sharp_objects_2.CSharpClassOrStruct && isPrimaryDtoFilter) {
                results.push(generatePrimaryFilter(type, options));
            }
        }
        var result = results.join('\n\n');
        if (result && options && options.baseNamespace) {
            var indentedResult = result
                .split('\n')
                .map(function (line) { return line ? "    " + line : ''; })
                .join('\n');
            result = "module " + options.baseNamespace + " {\n" + indentedResult + "\n}";
        }
        return result;
    }
    exports_5("default", tsGenerator);
    function generateEnum(cSharpEnum, options) {
        'use strict';
        var modifier = options && options.baseNamespace ? 'export' : 'declare';
        var nextIndex = 0;
        var entryStrings = [];
        for (var _i = 0, _a = cSharpEnum.entries; _i < _a.length; _i++) {
            var entry = _a[_i];
            entryStrings.push(entry.name + " = " + (entry.value || nextIndex));
            nextIndex = isNaN(entry.value) ? nextIndex + 1 : entry.value + 1;
        }
        return modifier + " enum " + cSharpEnum.name + " {\n    " + entryStrings.join(',\n    ') + "\n}";
    }
    function generateInterface(type, options) {
        'use strict';
        var prefixWithI = options && options.prefixWithI;
        var ignoreInhertitance = options && options.ignoreInheritance && options.ignoreInheritance.indexOf(type.inherits) !== -1;
        var modifier = options && options.baseNamespace ? 'export ' : '';
        var tsInterfaceName = prefixWithI ? "I" + type.name : type.name;
        var tsExtends = type.inherits && !ignoreInhertitance ? " extends " + type.inherits : '';
        var propertyStrings = [];
        for (var _i = 0, _a = type.properties; _i < _a.length; _i++) {
            var property = _a[_i];
            var tsPropertyName = options && options.propertyNameResolver ? options.propertyNameResolver(property.name) : property.name;
            if (property.type.isNullable) {
                tsPropertyName += '?';
            }
            var tsType = utility_1.Utility.translateType(property.type.name, options) || "" + (prefixWithI ? 'I' : '') + property.type.name;
            if (property.type.isCollection) {
                tsType += '[]';
            }
            propertyStrings.push(tsPropertyName + ": " + tsType);
        }
        return modifier + "interface " + tsInterfaceName + tsExtends + " {\n    " + propertyStrings.join(';\n    ') + ";\n}";
    }
    function generatePrimaryFilter(type, options) {
        'use strict';
        var modifier = options && options.baseNamespace ? 'export ' : '';
        var domainType = type.inherits.match(primaryDtoFilterRegex)[1];
        var filterGroup = pluralize(domainType);
        var filterType = options && options.dtoNamespace ? options.dtoNamespace + "." + domainType : domainType;
        var tsConstructorParameters = [];
        var filterParameters = [];
        if (type.constructors.length === 1) {
            for (var _i = 0, _a = type.constructors[0].parameters; _i < _a.length; _i++) {
                var parameter = _a[_i];
                var tsParameterType = utility_1.Utility.translateType(parameter.type.name, options);
                var shouldEncode = tsParameterType === 'string' || tsParameterType === 'any' || tsParameterType === 'Date';
                var shouldToString = tsParameterType !== 'string';
                var toString_1 = tsParameterType === 'Date' ? 'toISOString' : 'toString';
                if (parameter.type.isCollection) {
                    tsParameterType += '[]';
                }
                tsConstructorParameters.push("private " + parameter.name + ": " + tsParameterType);
                var filterParameter = void 0;
                if (parameter.type.isCollection) {
                    var mapToExpression = 'i';
                    if (shouldToString) {
                        mapToExpression = "i." + toString_1 + "()";
                    }
                    if (shouldEncode) {
                        mapToExpression = "encodeURIComponent(" + mapToExpression + ")";
                    }
                    var mapCall = mapToExpression !== 'i' ? ".map(i => " + mapToExpression + ")" : '';
                    filterParameter = "this." + parameter.name + mapCall + ".join(',')";
                }
                else {
                    filterParameter = "this." + parameter.name;
                    if (shouldToString) {
                        filterParameter = filterParameter + "." + toString_1 + "()";
                    }
                    if (shouldEncode) {
                        filterParameter = "encodeURIComponent(" + filterParameter + ")";
                    }
                }
                filterParameters.push(filterParameter);
            }
        }
        var result = '';
        result += modifier + "class " + filterGroup + type.name + "Filter implements IPrimaryFilter<" + filterType + "> {\n";
        result += "    constructor(" + tsConstructorParameters.join(', ') + ") {\n";
        result += "    }\n\n";
        result += "    public getFilterName(): string {\n";
        result += "        return '" + type.name + "';\n";
        result += "    }\n\n";
        result += "    public getParameters(): string[] {\n";
        result += "        return [" + filterParameters.join(', ') + "];\n";
        result += "    }\n";
        result += "}";
        return result;
    }
    return {
        setters:[
            function (utility_1_1) {
                utility_1 = utility_1_1;
            },
            function (c_sharp_parser_1_1) {
                c_sharp_parser_1 = c_sharp_parser_1_1;
            },
            function (c_sharp_objects_2_1) {
                c_sharp_objects_2 = c_sharp_objects_2_1;
            }],
        execute: function() {
            pluralize = require('pluralize');
            primaryFilterRegex = /^(?:IPrimaryFilter)<Dmn.([\w]+)/;
            primaryDtoFilterRegex = /^(?:IPrimaryRestFilter|BasePrimaryUndeletedFilter|BasePrimaryFilter|IPrimaryDtoFilter)<Dmn.([\w]+)/;
            ;
        }
    }
});
//# sourceMappingURL=index.js.map