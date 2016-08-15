"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CSharpType = (function () {
    function CSharpType(namespace, name, inherits) {
        this.namespace = namespace;
        this.name = name;
        this.inherits = inherits;
    }
    return CSharpType;
}());
exports.CSharpType = CSharpType;
var CSharpClassOrStruct = (function (_super) {
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
exports.CSharpClassOrStruct = CSharpClassOrStruct;
var CSharpMemberType = (function () {
    function CSharpMemberType(name, isNullable, isCollection) {
        this.name = name;
        this.isNullable = isNullable;
        this.isCollection = isCollection;
    }
    return CSharpMemberType;
}());
exports.CSharpMemberType = CSharpMemberType;
var CSharpContructor = (function () {
    function CSharpContructor(parameters) {
        this.parameters = parameters;
    }
    return CSharpContructor;
}());
exports.CSharpContructor = CSharpContructor;
var CSharpMember = (function () {
    function CSharpMember(type, name) {
        this.type = type;
        this.name = name;
    }
    return CSharpMember;
}());
exports.CSharpMember = CSharpMember;
var CSharpProperty = (function (_super) {
    __extends(CSharpProperty, _super);
    function CSharpProperty(type, name) {
        _super.call(this, type, name);
        this.type = type;
        this.name = name;
    }
    return CSharpProperty;
}(CSharpMember));
exports.CSharpProperty = CSharpProperty;
var CSharpParameter = (function (_super) {
    __extends(CSharpParameter, _super);
    function CSharpParameter(type, name) {
        _super.call(this, type, name);
        this.type = type;
        this.name = name;
    }
    return CSharpParameter;
}(CSharpMember));
exports.CSharpParameter = CSharpParameter;
var CSharpEnum = (function (_super) {
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
exports.CSharpEnum = CSharpEnum;
var CSharpEnumEntry = (function () {
    function CSharpEnumEntry(name, value) {
        this.name = name;
        this.value = value;
    }
    return CSharpEnumEntry;
}());
exports.CSharpEnumEntry = CSharpEnumEntry;
//# sourceMappingURL=c-sharp-objects.js.map