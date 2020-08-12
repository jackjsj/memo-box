let url =
  "http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled";
/* 结果
{ user: 'anonymous',
  id: [ 123, 456 ], // 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
  city: '北京', // 中文需解码
  enabled: true, // 未指定值得 key 约定为 true
}
*/
getParams(url);
function getParams(url) {
  url = url.split("?")[1]; //user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled
  // 用&将字符串分割
  const arr = url.split("&");
  let result = {};
  arr.forEach((item) => {
    // item => "user=anonymous" "enabled"
    // 使用=对item进行分割
    let [key, value] = item.split("=");
    if (value !== undefined) {
      value = decodeURIComponent(value);
      if (/^\d+$/.test(value)) {
        // 说明是数字
        value = parseInt(value);
      }
      // 判断result中是否有当前key
      if (result.hasOwnProperty(key)) {
        // 有
        result[key] = [].concat(result[key], value);
      } else {
        // 没有
        result[key] = value;
      }
    } else {
      result[key] = true;
    }
  });
  console.log(result);
  return result;
}
