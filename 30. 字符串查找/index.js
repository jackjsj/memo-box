//请使用最基本的遍历来实现判断字符串 a 是否被包含在字符串 b 中，并返回第一次出现的位置（找不到返回 -1）。

let a, b;
a = "34";
b = "1234567"; // 返回 2
console.log(isContain(a, b));
a = "35";
b = "1234567"; // 返回 -1
console.log(isContain(a, b));
a = "355";
b = "12354355"; // 返回 5
console.log(isContain(a, b));

function isContain(a, b) {
  const aLength = a.length;
  for (let i = 0; i < b.length; i++) {
    if (Array.prototype.slice.call(b, i, i + aLength).join("") === a) {
      return i;
    }
  }
  return -1;
}
