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
  // const _obj = {};
  // _obj.__proto__ = obj; // 直接修改__proto__性能不好
  // return _obj;
}

const obj = createObj(Person.prototype);
console.log(obj);
