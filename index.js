function taskSum(wait, cb) {
  return new Promise((resolve) => {
    setTimeout(() => {
      cb();
      resolve();
    }, wait);
  });
}

Promise.prototype.task = function (wait, cb) {
  return this.then(() => {
    return taskSum(wait, cb);
  });
};
taskSum(1000, () => {
  console.log(1);
})
  .task(1200, () => {
    console.log(2);
  })
  .task(1300, () => {
    console.log(3);
  });
