function getType(obj) {
  return Object.prototype.toString.call(obj).match(/^\[object (.+)\]$/)[1];
}

function deepClone(obj) {
  const raws = [];
  const cloneds = [];
  function _clone(obj) {
    // 如果是基本类型，就直接返回
    if (typeof obj !== "object" && typeof obj !== "function") {
      return obj;
    } else {
      let cloned;
      const type = getType(obj);
      // 如是是引用类型, 要判断是不是时间类型、数组类型、正则表达式类型、或者其它对象类型
      switch (type) {
        case "Array":
          cloned = [];
          break;
        case "Date":
          cloned = new Date(obj.getTime());
          break;
        case "RegExp":
          cloned = new RegExp(obj.source, obj.flags);
          cloned.lastIndex = obj.lastIndex;
          break;
        default:
          cloned = Object.create(Object.getPrototypeOf(obj));
      }
      const index = raws.indexOf(val);

      if (index !== -1) {
        cloned = cloneds[index];
      } else {
        raws.push(obj);
        cloneds.push(cloned);
      }
      for (let key in obj) {
        cloned[key] = _clone(obj[key]);
      }
      return cloned;
    }
  }
  return _clone(obj);
}

// test
const obj = {
  name: "Jesse",
  money: {
    part1: "2W",
    part2: "10W",
  },
  birth: new Date(),
  password: /123/g,
  friends: ["Jack", "Chi", "Mary"],
};

const other = {
  obj,
};
obj.other = other;
console.log(obj);

const cloned = deepClone(obj);

console.log(cloned);
