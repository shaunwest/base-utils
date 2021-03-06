import { getObject, releaseObject } from './pool.js';

export function point(x = 0, y = 0) {
  const obj = getObject();
  obj.x = x;
  obj.y = y;
  return obj;
}

export function dist(point1, point2) {
  const obj = getObject();
  obj.x = Math.abs(point1.x - point2.x);
  obj.y = Math.abs(point1.y - point2.y);
  return obj;
}

export function disp(point1, point2) {
  const obj = getObject();
  obj.x = point1.x - point2.x;
  obj.y = point1.y - point2.y;
  return obj;
}

export function isMinDist(dist, x, y) {
  return (dist.x >= x && dist.y >= y);
}

export function pointFromRect(rect) {
  return {
    x: rect.x,
    y: rect.y
  };
}

export function rect(x = 0, y = 0, width = 100, height = 100) {
  return {
    x,
    y,
    width,
    height
  };
}

function range(start, end, handler) {
  const result = [];
  if (start <= end) {
    for (let i = start; i <= end; i++) {
      result.push(handler(i));
    }
  } else {
    for (let i = start; i >= end; i--) {
      result.push(handler(i));
    }
  }
  
  return result;
}

export function line(point1, point2) {
  const distance = dist(point1, point2);
  let points;

  if (distance.x === distance.y) {
    let y = point1.y;
    points = range(point1.x, point2.x, (x) => {
      return {x: x, y: y++};
    });
  }
  else if (distance.x < distance.y) {
    const xStep = (distance.x / distance.y);
    let x = point1.x;
    points = range(point1.y, point2.y, (y) => {
      return {x: (Math.sign(point2.x - point1.x) >= 0) ? Math.floor(x += xStep) : Math.ceil(x -= xStep), y};
    });
  } 
  else {
    const yStep = (distance.y / distance.x);
    let y = point1.y;
    points = range(point1.x, point2.x, (x) => {
      return {x, y: (Math.sign(point2.y - point1.y) >= 0) ? Math.floor(y += yStep) : Math.ceil(y -= yStep)};
    });
  }
  
  return points;
}

export function rectHasMinSize(rect, width, height) {
  return (Math.abs(rect.width) >= width && Math.abs(rect.height) >= height);
}

export function rectContainsPoint(point, rect) {
  return (point.x >= rect.x && point.x < rect.x + rect.width && 
    point.y >= rect.y && point.y < rect.y + rect.height);
}
