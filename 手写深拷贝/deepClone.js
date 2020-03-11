// 手写深拷贝
function deepClone(target) {
  // 两个数组处理循环引用
  const clonedObjs = [];
  const copyedObjs = [];
  const _clone = target => {
    if (target === null) {
      return null;
    }
    if (typeof target !== "object" && typeof target !== "function") {
      return target;
    }
    let cloned;
    if (getType(target) === "Array") {
      // 如果是数组
      cloned = [];
    } else if (getType(target) === "RegExp") {
      // 如果是正则
      cloned = new RegExp(target.source, target.flags);
      if (target.lastIndex) {
        cloned.lastIndex = target.lastIndex;
      }
    } else if (getType(target) === "Date") {
      // 如果是日期
      cloned = new Date(target.getTime());
    } else {
      // 处理对象原型
      cloned = Object.create(target.__proto__);
    }

    // 处理循环引用
    const index = clonedObjs.indexOf(target);
    if (index === -1) {
      // 如果不存在，就在两个数组中分别添加原对象和拷贝对象
      clonedObjs.push(target);
      copyedObjs.push(cloned);
    } else {
      // 如果存在，就直接返回拷贝数组中的拷贝对象
      return copyedObjs[index];
    }
    for (const key in target) {
      cloned[key] = deepClone(target[key]);
    }
    return cloned;
  };
  return _clone(target);
}

function getType(target) {
  return /^\[object (.+)\]$/g.exec(Object.prototype.toString.call(target))[1];
}

const person = {
  name: "Jesse",
  birth: new Date(),
  reg: /123/g,
  obj: {
    key: {},
    val: 1
  },
  fn: getType
};

// const clone = deepClone(person);
// console.log(clone);
// console.log(clone.birth === person.birth);
// console.log(clone.reg === person.reg);
// console.log(clone.obj === person.obj);
// console.log(clone.fn === person.fn);
// console.log(clone.obj.key === person.obj.key);
// console.log(Object.prototype.toString.call({}).matchAll(/^\[object (\w+)\]$/));
const string = "test1test2test3";

// g 修饰符加不加都可以
const regex = /t(e)(st(\d?))/g;

for (const match of string.matchAll(regex)) {
  console.log(match);
}
