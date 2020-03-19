// 判断右边的显示原型是否在左边的隐式原型上。
function instanceOf(a, b) {
  while ((a = a.__proto__)) {
    if (a === b.prototype) {
      return true;
    }
  }
  return false;
}

const person = {
  name: "Jack"
};

function Person() {
  this.name = "Jack";
}

// console.log(instanceOf(person, Object));
// console.log(instanceOf(Person, Object));
console.log(instanceOf(new Person(), Person));
