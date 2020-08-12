// ES6写法
Function.prototype.es6Call = function(context, ...rest) {
  context = context ? Object(context) : window; // 如何不为null或undefined就用Object包装，否则为window
  const fn = Symbol();
  context[fn] = this;
  const result = context[fn](...rest);
  delete context[fn];
  return result;
};

// es5写法
// 实现call apply bind
Function.prototype.myCall(){
  // 获取第一个参数
  var context = arguments[0];
  // 获取目标函数
  var targetFn = this;
  // 在context中添加一个属性，值为targetFn，然后执行
  context._fn = targetFn;
  // 这里要将剩余的参数传入
  var args = [];
  for(var i = 1; i < arguments.length; i++){
    args.push('arguments['+i+']');
  }
  // 执行可能有返回值
  var result = eval('context._fn('+args+')');
  // 用完后删除
  delete context.fn;
  return result;
}
