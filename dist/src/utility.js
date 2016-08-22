"use strict";
var Utility = (function () {
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
        else if (['byte', 'short', 'int', 'long', 'float', 'double', 'decimal'].indexOf(csType) !== -1) {
            return 'number';
        }
        else if (['Byte', 'Int16', 'Int32', 'Int64', 'Single', 'Double', 'Decimal'].indexOf(csType) !== -1) {
            return 'number';
        }
        else if (csType === 'DateTime') {
            return options && options.dateTimeToDate ? 'Date' : 'string';
        }
    };
    return Utility;
}());
exports.Utility = Utility;
//# sourceMappingURL=utility.js.map