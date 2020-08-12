function curry(fn) {
  let args = Array.prototype.slice.call(arguments, 1);
  const _curry = function () {
    // 参数拼接
    args = args.concat(Array.prototype.slice.call(arguments));
    if (args.length >= fn.length) {
      // 如果参数够了，就执行
      fn.apply(this, args);
    } else {
      // 如果不够，就返回函数
      return _curry;
    }
  };
  return _curry;
}

function sum(a, b, c) {
  console.log(a + b + c);
}

// const c = curry(sum, 1, 2, 3);
// c();
const c = curry(sum);
c(1)(2)(3);
