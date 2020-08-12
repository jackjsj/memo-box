// 找出规律 n为矩阵的
// [0,0] => [0, n - 1]
// [0,1] => [1, n - 1]
// ...
// [0,n - 1] => [n - 1, n - 1]

// [1, 0] => [0, n - 1 - 1]
// [1, 1] => [1, n - 1 - 1]
// ...
// [1, n] => [n, n - 1 - 1]

// [n - 1, 0] => [0, n - 1 - (n - 1)] => [0 , 0]
// [n - 1, 1] => [1, n - 1 - (n - 1)] => [1 , 0]
// ...
// [n - 1, n - 1] => [n - 1, n - 1 - (n - 1)] => [n , 0]
// 由此可以得出规律， [x, y] 来自于 [n-1-y,x]

var rotate = function (matrix) {
  const n = matrix.length;
  const temp = {};
  for (let x = 0; x < n; x++) {
    for (let y = 0; y < n; y++) {
      temp[x + '+' + y] = matrix[x][y];
      if (temp[n-1-y + '+' + x] !== undefined) {
        matrix[x][y] = temp[n-1-y + '+' + x];
      } else {
        matrix[x][y] = matrix[n-1-y][x];
      }
    }
  }
};
const a = [
  [1,2,3],
  [4,5,6],
  [7,8,9],
];
rotate(a);
console.log(a)
