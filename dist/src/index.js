'use strict';
var utility_1 = require('./utility');
var c_sharp_parser_1 = require('./c-sharp-parser');
var c_sharp_objects_1 = require('./c-sharp-objects');
var pluralize = require('pluralize');
var camelcase = require('camelcase');
var primaryFilterRegex = /PrimaryFilter<Dmn.([\w]+)/;
var primaryDtoFilterRegex = /PrimaryDtoFilter<Dmn.([\w]+)/;
function tsGenerator(input, options) {
    if (options === void 0) { options = null; }
    var results = [];
    var types = c_sharp_parser_1.CSharpParser.parse(input);
    for (var _i = 0, types_1 = types; _i < types_1.length; _i++) {
        var type = types_1[_i];
        var isPrimaryFilter = type.inherits && !!type.inherits.match(primaryFilterRegex);
        var isPrimaryDtoFilter = type.inherits && !!type.inherits.match(primaryDtoFilterRegex);
        if (type instanceof c_sharp_objects_1.CSharpEnum) {
            results.push(generateEnum(type, options));
        }
        else if (type instanceof c_sharp_objects_1.CSharpClassOrStruct && !isPrimaryFilter && !isPrimaryDtoFilter) {
            results.push(generateInterface(type, options));
        }
        else if (type instanceof c_sharp_objects_1.CSharpClassOrStruct && isPrimaryDtoFilter) {
            results.push(generatePrimaryFilter(type, options));
        }
    }
    var result = results.join('\n\n');
    if (result && options && options.moduleName) {
        var indentedResult = result
            .split('\n')
            .map(function (line) { return line ? "    " + line : ''; })
            .join('\n');
        result = "module " + options.moduleName + " {\n" + indentedResult + "\n}";
    }
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = tsGenerator;
function generateEnum(cSharpEnum, options) {
    'use strict';
    var nextIndex = 0;
    var entryStrings = [];
    for (var _i = 0, _a = cSharpEnum.entries; _i < _a.length; _i++) {
        var entry = _a[_i];
        entryStrings.push(entry.name + " = " + (entry.value || nextIndex));
        nextIndex = isNaN(entry.value) ? nextIndex + 1 : entry.value + 1;
    }
    return "export enum " + cSharpEnum.name + " {\n    " + entryStrings.join(',\n    ') + "\n}";
}
function generateInterface(type, options) {
    'use strict';
    var prefixWithI = options && options.prefixWithI;
    var tsInterfaceName = prefixWithI ? "I" + type.name : type.name;
    var baseClass;
    if (type.inherits) {
        var baseClasses = type.inherits.split(',')
            .map(function (i) { return i.trim(); })
            .filter(function (i) { return i[0] !== 'I'; });
        baseClass = baseClasses.length === 1 ? baseClasses[0] : '';
    }
    var tsExtends = baseClass ? " extends " + baseClass : '';
    var propertyStrings = [];
    for (var _i = 0, _a = type.properties; _i < _a.length; _i++) {
        var property = _a[_i];
        var tsPropertyName = camelcase(property.name);
        if (property.type.isNullable) {
            tsPropertyName += '?';
        }
        var tsType = utility_1.Utility.translateType(property.type.name, options) || "" + (prefixWithI ? 'I' : '') + property.type.name;
        if (property.type.isCollection) {
            tsType += '[]';
        }
        propertyStrings.push(tsPropertyName + ": " + tsType);
    }
    return "export interface " + tsInterfaceName + tsExtends + " {\n    " + propertyStrings.join(';\n    ') + ";\n}";
}
function generatePrimaryFilter(type, options) {
    'use strict';
    var domainType = type.inherits.match(primaryDtoFilterRegex)[1];
    var filterGroup = pluralize(domainType);
    var filterType = options && options.dtoModuleName ? options.dtoModuleName + "." + domainType : domainType;
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
    result += "export class " + filterGroup + type.name + "Filter implements IPrimaryFilter<" + filterType + "> {\n";
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
//# sourceMappingURL=index.js.map