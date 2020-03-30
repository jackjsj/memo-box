/**
 * 选择排序
 * 1. 将第一个值与后面的值依次比较，如果比第一个值小，就互换位置
 * 2. 比完一轮，最小的在最左边
 * 3. 然后用第二个值，一直用到倒数第二值
 */
function sort(nums) {
  for (let i = 0; i < nums.length - 1; i++) {
    // 记录最小的索引
    let minIndex = i;
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] < nums[minIndex]) {
        minIndex = j;
      }
    }
    [nums[i], nums[minIndex]] = [nums[minIndex], nums[i]];
  }
  return nums;
}

var arr = [3, 1, 4, 6, 5, 7, 2];
console.log(sort(arr));
