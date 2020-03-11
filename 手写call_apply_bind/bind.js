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
