let url =
  "http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled";
/* 结果
{ user: 'anonymous',
  id: [ 123, 456 ], // 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
  city: '北京', // 中文需解码
  enabled: true, // 未指定值得 key 约定为 true
}
*/
console.log(parseParam(url));
function parseVal(val) {
  if (val === void 0) {
    return true;
  }
  val = decodeURIComponent(val);
  if (!Number.isNaN(Number(val))) {
    return Number(val);
  }
  return val;
}

function parseParam(url) {
  const paramStr = url.split("?")[1];
  const paramArr = paramStr.split("&");
  const result = {};
  for (let item of paramArr) {
    let [key, value] = item.split("=");
    value = parseVal(value);
    if (result[key] !== void 0) {
      if (Array.isArray(result[key])) {
        result[key].push(value);
      } else {
        result[key] = [result[key], value];
      }
    } else {
      result[key] = value;
    }
  }
  return result;
}

// function parseParam(url) {
//   // 获取search部分
//   const search = new URL(url).search;
//   const result = {};
//   const searchParams = new URLSearchParams(search);
//   const keys = searchParams.keys();
//   for (const key of keys) {
//     let value = searchParams.getAll(key);
//     value = parseValue(value);
//     if (value.length <= 1) {
//       result[key] = value[0];
//     } else {
//       result[key] = value;
//     }
//   }
//   return result;
// }
// function parseValue(vals) {
//   return vals.map(val => {
//     // 如果是空字符串，则返回true
//     if (val === "") {
//       return true;
//     }
//     // 如果是数字，则转成Number
//     if (Number(val)) {
//       return Number(val);
//     }
//     return val;
//   });
// }
// console.log(parseParam(url));
