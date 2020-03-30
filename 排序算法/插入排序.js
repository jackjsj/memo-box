var arr = [3, 1, 4, 6, 5, 7, 2];

// 插入排序的思路：
/*
1. 和打牌理牌过程一致
2. 将当前牌和前面的牌比较，如果大于就放在这张牌的后面，如果小于就继续和前面的牌比，一直比到最前面那张牌，放在最前面牌的前面
*/
function sort(arr) {
  const newArr = [arr[0]]; // 将第一个数放到新数组中
  // 遍历待排序数组，从第2个数开始遍历
  for (let i = 1; i < arr.length; i++) {
    // 将当前遍历项与新数组中的数依次比较
    const cur = arr[i];
    let j = 0;
    while (j < newArr.length && newArr[j] < cur) {
      j++;
    }
    newArr.splice(j, 0, cur);
  }
  return newArr;
}

function sort2(arr) {
  if (arr.length < 2) {
    return arr;
  }
  for (let i = 1; i < arr.length; i++) {
    for (let j = i - 1; j >= 0; j--) {
      if (arr[i] > arr[j]) {
        arr[j + 1] = arr[j];
        j--;
      }
    }
    arr[j + 1] = arr[i];
  }
  return arr;
}

console.log(sort(arr));
//O(n^2)
