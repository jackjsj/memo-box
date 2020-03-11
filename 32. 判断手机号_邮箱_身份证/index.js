function isPhone(str) {
  return /^1[34578]\d{9}$/.test(str);
}

function isEmail(str) {
  return /^\w+@\w+\.\w+$/.test(str);
}

function isCardNo(str) {
  return /(^\d{15}$)|(^\d{18}$)|(^\d{17}[\dxX]$)/.test(str);
}
