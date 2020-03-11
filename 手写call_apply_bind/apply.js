// es6
Function.prototype.es6Apply = function(context, args) {
  context = context ? Object(context) : window;
  args = args || [];
  const fn = Symbol();
  context[fn] = this;
  const result = context[fn](...args);
  delete context[fn];
  return result;
};
