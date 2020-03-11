function newObj(Target, ...args) {
  const obj = {}; // 创建一个空对象
  obj.__proto__ = Target.prototype; // 让对象的隐式原型指向构造函数的显式原型。
  const result = Target.call(obj, ...args); // 调用构造函数方法，将参数传入
  if (
    result !== null &&
    (typeof result === "object" || typeof result === "function")
  ) {
    return result; // 如果有返回值，就使用返回值，否则返回实例对象
  } else {
    return obj;
  }
}

function Person(name) {
  this.name = name;
  return function() {};
}
const p = newObj(Person, "Jesse");
// console.log(p.name);
// console.log(p.__proto__ === Person.prototype);

console.log(new Person());
console.log(p);
