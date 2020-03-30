// 归并排序的思路和世界杯排出4强一致，
// 4强分为两组，2个一组，在组里先比出强弱，
// 然后得到两个排好序的数组
// 然后两个弱的比，比出最弱和次弱，然后是两个强的比，比出最强和次强
function sort(nums) {
  if (nums.length < 2) {
    return nums;
  }
  // 将nums分成两部分
  let mid = Math.floor(nums.length / 2);
  let left = nums.slice(0, mid);
  let right = nums.slice(mid, nums.length);
  return merge(sort(left), sort(right));
}

// 注意：left和right都是排好序的两个数组
function merge(left, right) {
  const results = [];
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      results.push(left.shift());
    } else {
      results.push(right.shift());
    }
  }
  while (left.length) {
    results.push(left.shift());
  }
  while (right.length) {
    results.push(right.shift());
  }
  return results;
}
var arr = [3, 1, 4, 6, 5, 7, 2];
console.log(sort(arr));
