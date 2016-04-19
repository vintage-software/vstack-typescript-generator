interface IOptions {
    definitionFile?: boolean;
    baseNamespace?: string;
}

interface IEnumOptions extends IOptions {
}

interface IClassInterfaceOptions extends IOptions {
    prefixWithI?: boolean;
    dateTimeToDate?: boolean;
    ignoreInheritance?: string[];
    propertyNameResolver?: (prop: string) => string;
}

interface IPrimaryFilterOptions extends IOptions {
    dtoNamespace?: string;
}
