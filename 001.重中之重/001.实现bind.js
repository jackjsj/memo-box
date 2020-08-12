Function.prototype.myBind = function () {
  var context = arguments[0];
  context = context ? Object(context) : window;
  var restArgs = Array.prototype.slice.call(arguments, 1);
  var targetFn = this;
  var fBound = function () {
    return targetFn.apply(
      this instanceof fBound ? this : context,
      restArgs.concat(Array.prototype.slice.call(arguments))
    );
  };
  fBound.prototype = Object.create(this.prototype);
  return fBound;
};

function Person(name) {
  this.name = name;
}

const p = new Person("Jesse");

function sayHello(sth = "oh") {
  console.log(this.name + sth);
}

var name = "Mary";

const b = sayHello.myBind(p);
b("abc");
