console.log("1. 第一次循环主执行栈开始");

setTimeout(function() {
  console.log("5. 第二次循环开始，宏任务队列的第一个宏任务执行中");
  new Promise(function(resolve) {
    console.log("6. 宏任务队列的第一个宏任务的微任务继续执行");
    resolve();
  }).then(function() {
    console.log("7. 第二次循环的微任务队列的微任务执行");
  });
}, 0);

new Promise(function(resolve) {
  console.log("2. 第一次循环主执行栈进行中...");
  resolve();
}).then(function() {
  console.log("4. 第一次循环微任务，第一次循环结束");
  setTimeout(function() {
    console.log("8. 第二次循环的宏任务队列的第二个宏任务执行");
  });
});

console.log("3. 第一次循环主执行栈完成");
