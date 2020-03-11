// ES6写法
Function.prototype.es6Call = function(context, ...rest) {
  context = context ? Object(context) : window; // 如何不为null或undefined就用Object包装，否则为window
  const fn = Symbol();
  context[fn] = this;
  const result = context[fn](...rest);
  delete context[fn];
  return result;
};
