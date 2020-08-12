function trim(str) {
  return str.replace(/^\s+|\s+$/g, ""); //\s 代表space 空格
}
console.log(trim("    11  sss   11   "));
