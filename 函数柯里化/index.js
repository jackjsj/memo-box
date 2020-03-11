// 柯里化函数, 将一个n元函数,转化成n个一元函数
function curry(fn, ...args) {
  let allArgs = args;
  return function(...args) {
    // 合并新参数
    const mergedArgs = allArgs.concat(args);
    // 判断参数个数是否够了
    if (mergedArgs.length >= fn.length) {
      // 如果参数够了,就执行
      return fn.apply(this, mergedArgs);
    } else {
      // 如果不够就递归
      return curry(fn, ...mergedArgs);
    }
  };
}

// var fn = curry(function(a, b, c) {
//   console.log([a, b, c]);
// });
// fn("a", "b", "c"); // ["a", "b", "c"]
// fn("a", "b")("c"); // ["a", "b", "c"]
// fn("a")("b")("c"); // ["a", "b", "c"]
// fn("a")("b", "c"); // ["a", "b", "c"]

// 偏函数,将一个n元函数转化为一个n-x元函数
function partial(fn, ...args) {
  // 返回一个函数
  const partArgs = args;
  return function(...args) {
    return fn.apply(this, [...partArgs, ...args]);
  };
}
var fn = partial(function(a, b, c) {
  console.log(this.value);
  console.log([a, b, c]);
});

const obj = {
  fn,
  value: 1
};

// fn("a", "b", "c"); // ["a", "b", "c"]
obj.fn("a", "b", "c");
