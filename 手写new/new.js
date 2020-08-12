function newObject() {
  let obj = {};
  const Con = [].shift.call(arguments);
  obj = Object.create(Con.prototype); // obj.__proto__ = Con.prototype  指定对象的原型
  const result = Con.apply(obj, arguments);
  return result && (typeof result === 'object' || typeof result === 'function')
    ? result
    : obj;
}

function Person(name, age) {
  this.name = name;
  this.age = age;
}

const p = newObject(Person, 'jack', 18);
console.log(p.name);
