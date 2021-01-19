/* eslint-disable import/prefer-default-export */

export type FilterObjectFn = (value: any, key: string | number, obj: object) => boolean;

export const throttle = function (func, wait = 50) {
  let timer = null;
  const self = this;
  return function(...args) {
    if (timer === null) {
      timer = setTimeout(function() {
        func.apply(self, args);
        timer = null;
      }, wait);
    }
  };
};

// modified from okta-ui/packages/courage/src/util/StringUtil.js
// since the string is provided by users, the sprintf does not need to be very strict for error checking
// e.g in o-text-counter-input, we may allow both "Can still input characters" and "Can still input {0} characters"
export const sprintf = function (...params: Array<any>): any {
  const args = Array.prototype.slice.apply(params);
  let value = args.shift();

  for (let i = 0, l = args.length; i < l; i += 1) {
    const entity = args[i];
    value = value.replace('{' + i + '}', entity);
  }

  return value;
};

/**
 * Filter out entries from an object.
 *
 * @param obj - object to filter.
 * @param fn - filter function.
 * @returns a new object without the entries satisfying the filter function.
 */
export function filterObject(obj: object, fn: FilterObjectFn): object {
  return Object.keys(obj).reduce((accum, property) => {
    const value = obj[property];

    if (fn(value, property, obj)) {
      accum[property] = value;
    }

    return accum;
  }, {});
}

/**
 * Check if given parameter is not undefined.
 *
 * @param value - value to check.
 * @returns whether the value is defined.
 */
export function isDefined(value: any): boolean {
  return typeof value !== 'undefined';
}

/**
 * Returns the list of values.
 *
 * @param value - Value or list of values.
 * @returns List of values.
 */
export function getValues(value: string | Array<string>): Array<string> {
  return typeof value !== 'undefined'
    ? [].concat(typeof value === 'string' ? value.split(',') : value)
    : [];
}
