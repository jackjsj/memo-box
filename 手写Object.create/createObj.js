function Person(name) {
  this.name = name;
  this.age = 12;
}
Person.prototype.sayHello = function() {
  return "hello";
};

function createObj(obj) {
  function fn() {}
  fn.prototype = obj;
  return new fn();
}

const obj = createObj(Person.prototype);
console.log(obj);
