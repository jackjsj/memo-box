// es6
Function.prototype.es6Apply = function (context, args = []) {
  context = context ? Object(context) : window;
  const fn = Symbol();
  context[fn] = this;
  const result = context[fn](...args);
  delete context[fn];
  return result;
};

function Person(name, age) {
  this.name = name;
  this.age = age;
}

var p = new Person('Jesse', 18);

var age = 20;
function sayHello(who, a) {
  console.log(who + ':' + this.age + a);
}
sayHello('You');
sayHello.es6Apply(p, ['He', 'dd']);
