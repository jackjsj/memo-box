// 乱序：遍历数组，将当前元素与其后的任一元素互换位置
function shuffle(a) {
  const arr = a.slice();
  const length = arr.length;
  for (let i = length; i >= 1; i--) {
    // 随机生成一个索引
    const randomIndex = Math.floor(Math.random() * i);
    [arr[randomIndex], arr[i - 1]] = [arr[i - 1], arr[randomIndex]];
  }
  return arr;
}

const array = [1, 2, 3];
const result = {};
for (let i = 0; i < 10000; i++) {
  const item = shuffle(array);
  if (result[item]) {
    result[item].num += 1;
    result[item].rate = ((result[item].num / (i + 1)) * 100).toFixed(2) + "%";
  } else {
    result[item] = {
      num: 1,
      rate: ((1 / (i + 1)) * 100).toFixed(2) + "%"
    };
  }
}
console.log(result);
