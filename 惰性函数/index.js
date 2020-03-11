// 调用一个函数,返回首次调用时的时间
let t;
function getFirstDate() {
  return t ? t : (t = new Date());
}
// console.log(getFirstDate());
// setTimeout(() => {
//   console.log(getFirstDate());
// }, 1000);
// setTimeout(() => {
//   console.log(getFirstDate());
// }, 2000);
// setTimeout(() => {
//   console.log(getFirstDate());
// }, 3000);

// 污染了全局

// 使用闭包
function getFirstValue() {
  const date = new Date();
  // 内部修改函数
  getFirstValue = function() {
    return date;
  };
  return getFirstValue();
}

console.log(getFirstValue());
setTimeout(() => {
  console.log(getFirstValue());
}, 1000);
setTimeout(() => {
  console.log(getFirstValue());
}, 2000);
setTimeout(() => {
  console.log(getFirstValue());
}, 3000);
