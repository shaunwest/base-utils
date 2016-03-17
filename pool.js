import { objectPoolState, arrayPoolState } from '../state/_pool.js'; // eh
import { clear } from './obj.js';

export const getObject = () => getExistingObject() || releaseObject();
export const getArray = () => getExistingArray() || releaseArray();
export const getExistingObject = () => clear(objectPoolState.pop());
export const getExistingArray = () => clear(arrayPoolState.pop());

export const releaseObject = (obj = {}) => {
  objectPoolState.push(obj);
  return obj;
};

export const releaseArray = (arr = []) => {
  arrayPoolState.push(arr);
  return arr;
};
