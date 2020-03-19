function _parseInt(s, radix) {
  // 1. 将radix转成数字，0或NaN都默认为10， 否则判断radix在不在[2,36]范围内，直接返回NaN
  radix = Number(radix);
  if (radix === 0 || isNaN(radix)) {
    // 如果是0，那就默认为10
    radix = 10;
  } else if (radix < 2 || radix > 36) {
    return NaN;
  }
  // 2. 如果s不是数字，也不是字符串，直接返回NaN
  if (typeof s !== "string" && typeof s !== "number") return NaN;
  // 3. 如果s是数字，就先转成字符串
  if (typeof s === "number") {
    s = String(s);
  }
  // 4. 如果s以 +- 0x或0X开头，就认为s是16进制,则直接转成数值
  const execReg16 = /^(\+|\-)?(0[xX][0-9a-fA-F]+)/;
  const execResult16 = execReg16.exec(s);
  if (execResult16) {
    const sign = execResult16[1];
    const value = execResult16[2];
    return sign === "-" ? -Number(value) : Number(value);
  }

  // 5. 处理一般字符串
  const execReg = /^(\+|\-)?[0-9a-zA-Z]+/;
  const execResult = execReg.exec(s);
  if (execResult) {
    s = execResult[0];
    let sign = execResult[1];
    if (sign === "-") {
      s = s.slice(1);
    } else {
      sign = "";
    }
    // 将s转成字符数组
    let chars = [...s];
    // 如果某个字符比进制数，就去掉它和它后面的所有字符
    const index = chars.findIndex(c => trans(c) > radix);
    if (index > -1) {
      chars = chars.slice(0, index);
    }
    if (chars.length === 0) return NaN;
    // 将N进制字符串转成十进制数
    const result = chars.reverse().reduce((cur, next, i) => {
      // 对next字符进行处理, 因为next可能是0-9 a-z A-Z中的任一字符，应转为相应的数值
      next = trans(next);
      return cur + next * Math.pow(radix, i);
    }, 0);
    return sign ? -result : result;
  } else {
    return NaN;
  }
}

function trans(char) {
  // 97代表A， A实际是10
  const code = char.toUpperCase().charCodeAt(0);
  if (code >= 65) {
    return code - 55;
  } else {
    return Number(char);
  }
}

console.log(test("0e0", NaN));

function test(s, radix) {
  console.log(_parseInt(s, radix));
  if (isNaN(parseInt(s, radix)) && isNaN(_parseInt(s, radix))) {
    return true;
  }
  return parseInt(s, radix) === _parseInt(s, radix);
}
