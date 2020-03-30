var arr = [3, 1, 4, 6, 5, 7, 2];

// 1. 相邻两个数对比，如果左边的比右边大，就互换位置，一直比到最后两个数，完成一次循环，这时最大的数在最后面
// 2. 再从头开始比

function sort(arr) {
  // 执行一轮后，最大的值在最后面，一共要执行N轮，N为（数组长度-1）
  let n = arr.length - 1;
  while (n > 0) {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
      }
    }
    n--;
  }
  return arr
}

console.log(sort(arr));
// 分析时间复杂度，一共7个数，执行一轮需要执行6次，一共执行6轮，所以就是（7-1）的平方
// 如果一共n个数，那就是(n-1)^2 ,即 n^2 -2n+1,时间复杂度就是O(n^2)
