export function clone(obj) {
  return Object.assign({}, obj);
}

export function merge(toObj, fromObj) {
  return Object.assign({}, toObj, fromObj);
}

export function clear(obj) {
  if (!obj) return null;
  if (Array.isArray(obj)) {
    obj.length = 0;
  }
  else {  
    for(const prop in obj) delete obj[prop];
  }
  return obj;
}
