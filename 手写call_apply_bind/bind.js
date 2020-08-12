Function.prototype.es6Bind = function(context, ...rest) {
  const fn = this;
  const fBound = function(...args) {
    return fn.apply(this instanceof fBound ? this : context, [
      ...rest,
      ...args
    ]);
  };
  fBound.prototype = Object.create(this.prototype);
  return fBound;
};


// 实现bind
Function.prototype.myBind = function(){
  // 获取第一个参数
  var context = Array.prototype.shift.call(arguments);
  context = context ? Object(context):window;
  // 获取剩余参数
  var args = Array.prototype.slice.call(arguments);
  var targetFn = this;
  var fBound = function(){
    // 如果是用new调用，就指向实例本身，否则使用window
     return targetFn.apply(this instanceof fBound ? this : context, args.concat(Array.prototype.slice.call(arguments)));
  }
  fBound.prototype = Object.create(targetFn.protoype);
  return fBound;
}
