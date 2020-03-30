function Parent(name) {
  this.name = name;
}
Parent.prototype.sayHello = function() {
  return this.name;
};

function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}
// Object.setPrototypeOf(Child.prototype, Parent.prototype); // 官方说性能不好
// Child.prototype.__proto__ = Parent.prototype; // __proto__不鼓励使用，直接修改__proto__性能不好

Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

const child = new Child("Jack", 18);
const result = child.sayHello();
console.log(result);
console.log(child);
