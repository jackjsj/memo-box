Array.prototype.reduce1 = function(cb, initValue) {
  let accumulator = initValue || this[0];
  let cur = initValue === undefined ? 0 : 1;
  while (cur < this.length) {
    accumulator = cb(accumulator, this[cur], cur, this);
    cur++;
  }
  return accumulator;
};

// console.log(
//   [1, 2, 3].reduce1((cur, next) => {
//     return cur + next;
//   })
// );
console.log(
  [1, 2, 3].reduce((cur, next, index, array) => {
    console.log({ cur });
    console.log({ next });
    console.log({ index });
    return cur + next;
  })
);
