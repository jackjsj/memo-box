const arr = [2, 3, 4, 3, 2, 4];
// 方法一
function one(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    let j;
    for (j = 0; j < result.length; j++) {
      if (arr[i] === result[j]) {
        break;
      }
    }
    if (j === result.length) {
      result.push(arr[i]);
    }
  }
  console.log(result);
}
one(arr);

// 方法二
function two(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (result.indexOf(item) === -1) {
      result.push(item);
    }
  }
  console.log(result);
}
two(arr);

// 方法三
function three(arr) {
  const result = arr.filter((item, i) => arr.indexOf(item) === i);
  console.log(result);
}
three(arr);

// 方法四
function four(arr) {
  const result = [...new Set(arr)];
  console.log(result);
}
four(arr);
