// 保留三位小数
parseToMoney(1234.56); // return '1,234.56'
parseToMoney(123456789); // return '123,456,789'
parseToMoney(1087654.321); // return '1,087,654.321'

// function parseToMoney(num) {
//   // 原生方法
//   const result = Number(num).toLocaleString();
//   console.log(result);
// }

function parseToMoney(num) {
  let [integer, decimal] = String.prototype.split.call(num, ".");
  const charArr = integer.split("");
  let nums = [];
  charArr.reverse().forEach((item, index) => {
    if (index % 3 === 0 && index != 0) {
      nums.push(",");
    }
    nums.push(item);
  });
  integer = nums.reverse().join("");
  const result = decimal ? integer + "." + decimal : integer;
  console.log(result);
  return result;
}

// function parseToMoney(num) {
//   num = parseFloat(num.toFixed(3));
//   let [integer, decimal] = String.prototype.split.call(num, ".");
//   integer = integer.replace(/\d(?=(\d{3})+$)/g, ($0, $1) => $0 + ",");
//   const result = decimal ? integer + "." + decimal : integer;
//   console.log(result);
//   return result;
// }

// // 最优解
// console.log('1234596789'.replace(/(\B)(?=(\d{3})+$)/g,','));
