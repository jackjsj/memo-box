// 二分法查找只适用于排好序的数组
const arr = [1, 4, 8, 9, 14, 19, 22, 30];

// 二分法查找
// function find(num, arr, start, end) {
//   start = start || 0;
//   end = end || arr.length;
//   let mid = Math.floor((end + start) / 2);
//   let midNum = arr[mid];
//   if (num > midNum) {
//     start = mid;
//   } else if (num < midNum) {
//     end = mid;
//   } else {
//     return mid;
//   }
//   return find(num, arr, start, end);
// }

function find(num, arr) {
  let start = 0;
  let end = arr.length;
  while (start < end) {
    let mid = Math.floor((start + end) / 2);
    let midNum = arr[mid];
    if (num > midNum) {
      start = mid;
    } else if (num < midNum) {
      end = mid;
    } else {
      return mid;
    }
  }
}

console.log(find(1, arr));
console.log(find(9, arr));
console.log(find(30, arr));
console.log(Math.floor(9 / 2));
