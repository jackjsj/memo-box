var arr = [3, 1, 4, 6, 5, 7, 2];

function sort(arr) {
  // 将arr平均分为两部分
  let left = 0;
  let right = arr.length - 1;
  // 中间的索引
  let midIndex = Math.floor((left + right) / 2);
  let mid = arr[midIndex];
  // 这个mid值要先算，因为遍历途中获取，这个值可能会因为交换位置后发生改变
  while (left <= right) {
    while (arr[left] < mid) {
      left++;
    }
    while (arr[right] > mid) {
      right--;
    }
    if (left <= right) {
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
