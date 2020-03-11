// 保留三位小数
parseToMoney(1234.56); // return '1,234.56'
parseToMoney(123456789); // return '123,456,789'
parseToMoney(1087654.321); // return '1,087,654.321'

function parseToMoney(num) {
  num = parseFloat(num.toFixed(3));
  let [integer, decimal] = String.prototype.split.call(num, ".");
  integer = integer.replace(/\d(?=(\d{3})+$)/g, ($0, $1) => $0 + ",");
  const result = decimal ? integer + "." + decimal : integer;
  console.log(result);
  return result;
}
