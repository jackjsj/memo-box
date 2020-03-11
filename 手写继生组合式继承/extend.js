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

Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

const child = new Child("Jack", 18);
const result = child.sayHello();
console.log(result);
console.log(child);
