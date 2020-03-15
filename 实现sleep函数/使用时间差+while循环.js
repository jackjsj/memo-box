// 使用时间差+while循环
function sleep(ms) {
  const start = +new Date();
  while (Date.now() - start < ms) {}
}
console.log('start');
console.time();
sleep(5000);
console.log('end');
console.timeEnd();
