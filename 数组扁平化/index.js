var arr = [1, [2, [3, 4]]];

// function flatten(arr) {
//   let result = [];
//   for (let i = 0; i < arr.length; i++) {
//     const cur = arr[i];
//     if (Array.isArray(cur)) {
//       // 如果是数组，则再次扁平
//       result = result.concat(flatten(cur));
//     } else {
//       // 如果不是数组，就添加到结果中
//       result.push(cur);
//     }
//   }
//   return result;
// }

// function flatten(arr) {
//   const result = [];
//   for (let i = 0; i < arr.length; i++) {
//     const cur = arr[i];
//     if (Array.isArray(cur)) {
//       result.push(...flatten(cur));
//     } else {
//       result.push(cur);
//     }
//   }
//   return result;
// }
function flatten(arr) {
  return arr.reduce(
    (cur, next) => cur.concat(Array.isArray(next) ? flatten(next) : next),
    []
  );
}
function flattenByReduce(arr) {
  return arr.reduce((cur, next) => {
    return cur.concat(Array.isArray(next) ? flattenByReduce(next) : next);
  }, []);
}

// concat + rest运算符
function flattenByRest(arr) {
  let result = arr.slice();
  // 只要result中的元素有一个是数组，就循环
  while (result.some(item => Array.isArray(item))) {
    result = [].concat(...result);
  }
  return result;
}

console.log(flatten(arr));
console.log(flattenByReduce(arr));
console.log(flattenByRest(arr));
