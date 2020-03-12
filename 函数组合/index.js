// 函数组合

// 需求：输入 'kevin daisy kelly'，返回 'K.D.K'

const str = "kevin daisy kelly";

// 组合函数
function compose(...args) {
  // 从左至右依次执行
  const methods = args;
  const length = methods.length;
  // 返回一个函数
  return function(...args) {
    let result;
    if (length > 0) {
      result = methods[0].apply(this, args);
    }
    // 只有第一个函数可接受多个函数
    for (let i = 1; i < length; i++) {
      const cur = methods[i];
      result = cur.call(this, result);
    }
    return result;
  };
}

const composeMethod = compose(
  splitBySpace,
  map(compose(getHead, toUpperCase)),
  join
);

console.log(composeMethod(str));

function map(cb) {
  return function(arr) {
    return arr.map(cb);
  };
}

// 取首字母
function getHead(x) {
  return x[0];
}

// 按空格分隔
function splitBySpace(x) {
  return x.split(" ");
}

// 小写转大写
function toUpperCase(x) {
  return x.toUpperCase();
}

// 用.符合并数组
function join(x) {
  return x.join(".");
}
