function getType(target) {
  return Object.prototype.toString.call(target).match(/^\[object (.+)\]$/)[1];
}
function deepClone(target) {
  const origins = [];
  const cloneds = [];
  function _clone(target) {
    if (target === null) {
      return null;
    }
    if (typeof target !== "object" && typeof target !== "function") {
      return target;
    }
    const type = getType(target);
    let clone;
    switch (type) {
      case "Array":
        clone = [];
        break;
      case "Date":
        clone = new Date(target.getTime());
        break;
      case "RexExp":
        clone = new RegExp(target.source, target.flags);
        clone.lastIndex = target.lastIndex;
        break;
      default:
        clone = Object.create(Object.getPrototypeOf(target));
    }
    const index = origins.indexOf(target);
    if (index !== -1) {
      clone = cloneds[index];
    } else {
      origins.push(target);
      cloneds.push(clone);
    }
    for (let key in target) {
      clone[key] = _clone(target[key]);
    }
    return clone;
  }
  return _clone(target);
}

const person = {
  name: "Jesse",
  birth: new Date(),
  reg: /123/g,
  obj: {
    key: {},
    val: 1,
  },
  fn: getType,
};
const clone = deepClone(person);
console.log(clone);
console.log(clone.birth === person.birth);
console.log(clone.reg === person.reg);
console.log(clone.obj === person.obj);
console.log(clone.fn === person.fn);
console.log(clone.obj.key === person.obj.key);
