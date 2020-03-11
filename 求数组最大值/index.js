const arr = [6, 9, 1, 3, 4, 8, 7];
// function getMax(arr) {
//   let max = arr[0];
//   for (let i = 1; i < arr.length; i++) {
//     const cur = arr[i];
//     max = Math.max(max, cur);
//   }
//   return max;
// }
// function getMax(arr) {
//   return Math.max.apply(null, arr);
// }
// function getMax(arr) {
//   return Math.max(...arr);
// }
// function getMax(arr) {
//   return arr.reduce((cur, next) => Math.max(cur, next));
// }
function getMax(arr) {
  const sortedArr = arr.slice().sort((a, b) => a - b);
  const length = arr.length;
  return sortedArr[length - 1];
}
console.log(getMax(arr)); // 9
