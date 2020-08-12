var arr = [3, 1, 4, 6, 5, 7, 2];

// 快速排序
function sort(arr) {
  function getIndex(arr, left, right) {
    const midIndex = Math.floor((left + right) / 2);
    const mid = arr[midIndex];
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
    return left;
  }
  function _sort(arr, left, right) {
    if (arr.length <= 1) {
      return arr;
    } else {
      const index = getIndex(arr, left, right);
      if (left < index - 1) {
        _sort(arr, left, index - 1);
      }
      if (right > index) {
        _sort(arr, index, right);
      }
      return arr;
    }
  }
  return _sort(arr, 0, arr.length - 1);
}

sort(arr);
console.log(arr);
