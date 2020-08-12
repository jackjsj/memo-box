const date1 = 1586503758749;
const date2 = 1586503795147;
const date3 = 1586503801571;

const second = 1000;
const minute = 60 * second;
const hour = 60 * minute;
const day = 24 * hour;
const month = 30 * day;
const year = 12 * month;

function format(date) {
  const diff = Date.now() - date;
  console.log(diff);
  let n;
  if ((n = diff / year) > 1) {
    return parseInt(n) + "年前";
  } else if ((n = diff / month) > 1) {
    return parseInt(n) + "月前";
  } else if ((n = diff / day) > 1) {
    return parseInt(n) + "天前";
  } else if ((n = diff / hour) > 1) {
    return parseInt(n) + "小时前";
  } else if ((n = diff / minute) > 1) {
    return parseInt(n) + "分钟前";
  } else if ((n = diff / second) > 1) {
    return "刚刚";
  }
}
console.log(format(date1));
console.log(format(date2));
console.log(format(date3));
