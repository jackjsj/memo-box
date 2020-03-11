// 实现findIndex
const arr = [1, 3, 9, 53, 45436, 54, 756];

function createIndexFinder(dir) {
  const length = arr.length;
  let i = dir > 0 ? 0 : length - 1;
  return function(arr, cb, context) {
    for (; i < length && i >= 0; i += dir) {
      if (cb.call(context, arr[i], i, arr)) {
        return i;
      }
    }
    return -1;
  };
}
const findIndex = createIndexFinder(1);
const findLastIndex = createIndexFinder(-1);
const result1 = findIndex(arr, function(item, i) {
  return item > 50;
});
const result2 = findLastIndex(arr, function(item, i) {
  return item > 50;
});
console.log(result1);
console.log(result2);
