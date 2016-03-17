/**
 * Created by shaunwest on 7/8/15.
 */

import { getArray, getObject } from './pool.js';
import _ from 'lodash';

// FIXME: this creates garbage!!
export const reduce = _.curry((fn, coll, acc, ...args) => {
  for (let val of coll) {
    acc = fn.apply(null, [acc, val, ...args]);
  }

  return acc;
});

export const mapCmp = _.curry((fn, cmp, coll) => {
  const newColl = getArray();

  for (let val of coll) {
    newColl.push(fn.call(null, cmp, val));
  }

  return newColl;
});

export const filterCmp = _.curry((fn, cmp, coll) => {
  const newColl = getArray();

  for (let val of coll) {
    if (fn.call(this, cmp, val)) {
      newColl.push(val);
    }
  }

  return newColl;
});

// what is result??
export const compose = _.curry((result, ...fns) => {
  fns.reverse();
  for (let fn of fns) {
    result = fn(result);
  }
  return result;
});

export const flip = fn => (...args) => fn.apply(null, args.reverse());

export const sequence = flip(compose);
