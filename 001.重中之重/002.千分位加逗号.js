tran(123456789);
tran(1234852.33);

function tran1(num) {
  let [integer, decimal] = String.prototype.split.call(num, ".");
  integer = integer.replace(/(\B)(?=(\d{3})+$)/g, ",");
  const result = decimal ? integer + "." + decimal : integer;
  console.log(result);
  return result;
}

function tran(num) {
  let [integer, decimal] = String.prototype.split.call(num, ".");
  const arr = integer.split("").reverse();
  const newArr = [];
  arr.forEach((c, i) => {
    if (i % 3 === 0 && i !== 0) {
      newArr.push(",");
    }
    newArr.push(c);
  });
  integer = newArr.reverse().join("");
  const result = decimal ? integer + "." + decimal : integer;
  console.log(result);
  return result;
}
