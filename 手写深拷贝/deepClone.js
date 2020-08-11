// 手写深拷贝
function deepClone(target) {
  // 两个数组处理循环引用
  const srcObjs = []; // 用来存原对象
  const copyedObjs = []; // 用来存对应的拷贝对象
  const _clone = (target) => {
    // null也直接返回
    if (target === null) {
      // typeof null 为 'object'
      return null;
    }
    // 除了null的基本类型，都直接返回
    if (typeof target !== 'object' && typeof target !== 'function') {
      return target;
    }
    let cloned;
    if (getType(target) === 'Array') {
      // 如果是数组，创建一个新数组
      cloned = [];
    } else if (getType(target) === 'RegExp') {
      // 如果是正则，就创建一个新正则，使用原来的source和flags
      cloned = new RegExp(target.source, target.flags);
      // 同时设置正则的lastIndex属性
      cloned.lastIndex = target.lastIndex;
    } else if (getType(target) === 'Date') {
      // 如果是日期，重新创建一个日期
      cloned = new Date(target.getTime());
    } else {
      // 不是以上类型，说明是object类型，处理对象原型
      cloned = Object.create(target.__proto__);
    }

    // 处理循环引用
    const index = srcObjs.indexOf(target);
    if (index === -1) {
      // 如果不存在，就在两个数组中分别添加原对象和拷贝对象
      srcObjs.push(target);
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
  name: 'Jesse',
  birth: new Date(),
  reg: /123/g,
  obj: {
    key: {},
    val: 1,
  },
  fn: getType,
};

// const clone = deepClone(person);
// console.log(clone);
// console.log(clone.birth === person.birth);
// console.log(clone.reg === person.reg);
// console.log(clone.obj === person.obj);
// console.log(clone.fn === person.fn);
// console.log(clone.obj.key === person.obj.key);
// console.log(Object.prototype.toString.call({}).matchAll(/^\[object (\w+)\]$/));
const string = 'test1test2test3';

// g 修饰符加不加都可以
const regex = /t(e)(st(\d?))/g;

for (const match of string.matchAll(regex)) {
  console.log(match);
}
