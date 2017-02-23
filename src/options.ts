export interface Options {
  dateTimeToDate?: boolean;
  tsTypeMap?: { [index: string]: string }
}

export const defaultOptions: Options = {
  dateTimeToDate: false,
  tsTypeMap: {}
}
