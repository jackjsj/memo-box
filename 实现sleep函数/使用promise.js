// 使用promise
function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

console.time();
sleep(2000).then(()=>{
  console.timeEnd();
})
