var arr = [3, 1, 4, 6, 5, 7, 2];
// [3,1,4,  2,  5,7,6]
// [3,1,4,6,5, 2, 7]

function sort(arr) {
  // 将arr平均分为两部分
  let left = 0;
  let right = arr.length - 1;
  // 中间的索引
  let midIndex = Math.floor((left + right + 1) / 2);
  let mid = arr[midIndex];
  while (left < right) {
    while (arr[left] < mid) {
      left++;
    }
    while (arr[right] > mid) {
      right--;
    }
    if (left < right && arr[left] >= mid && arr[right] <= mid) {
      [arr[left], arr[right]] = [arr[right], arr[left]];
      left++;
      right--;
    }
  }
  let leftArray = arr.slice(0, left);
  let rightArray = arr.slice(left, arr.length);
  if (leftArray.length > 1) {
    leftArray = sort(leftArray);
  }
  if (rightArray.length > 1) {
    rightArray = sort(rightArray);
  }
  return [...leftArray, ...rightArray];
}
console.log(sort(arr));
