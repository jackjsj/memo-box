function newObject() {
  const obj = {};
  const Con = [].shift.call(arguments);
  obj.__proto__ = Con.prototype;
  const result = Con.apply(obj, arguments);
  return result && (typeof result === 'object' || typeof result === 'function')
    ? result
    : obj;
}

function Person(name, age) {
  this.name = name;
  this.age = age;
  return function(){};
}

const p = newObject(Person, 'jack', 18);
console.log(p);
