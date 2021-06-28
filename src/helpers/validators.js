export const regex = /^[0-9.]*$/;
export const special = /([\u0020-\u002E]|[\u003A-\u0040]|[\u005b-\u0060]|[\u007B-\u007E])/;
export const spaces = /\s/;
export const upperCase = /[A-Z]/;
export const lowerCase = /[a-z]/;
export const num = /^[0-9]*$/;
export const letter = /^[a-zA-Z]*$/;
export const letterNum = /^[a-zA-Z0-9 ]*$/;
export const isEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
export const isFloat = /^((-)?(0|([1-9][0-9]*))(\.[0-9]+)?)$/