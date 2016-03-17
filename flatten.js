
export function flattenCoord(x, y, targetWidth) {
  return (y * targetWidth) + x;
}

export function unFlattenXCoord(value, targetWidth) {
  return value % targetWidth;
}

export function unFlattenYCoord(value, targetWidth) {
  return Math.floor(value / targetWidth);
}

export function unFlattenXDimension(value, targetWidth) {
  return Math.min(value, targetWidth);
}

// TODO can this be computed without units? (tileSize)
export function unFlattenYDimension(value, targetWidth) {
  const width = unFlattenXDimension(value, targetWidth);
  return width;
  //return unFlattenYCoord(value, targetWidth);
}

export function unFlattenCoord(value, targetWidth) {
  return {
    x: unFlattenXCoord(value, targetWidth),
    y: unFlattenYCoord(value, targetWidth)
  };
}

export function unFlattenDimensions(value, targetWidth) {
  return {
    width: unFlattenXDimension(value, targetWidth),
    height: unFlattenYDimension(value, targetWidth)
  };
}
