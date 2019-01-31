export const isArrayEmpty = (array?: any[]): boolean => !array || !array.length;
export const isDefinedNumber = (n?: number) : boolean => (Boolean(n) || n === 0);