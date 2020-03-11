let str = "abcabcabcbbccccc";

function getMostCharInStr(str) {
  let char,
    num = 0;
  str = [...str].sort().join("");
  str.replace(/(\w)\1+/g, ($0, $1) => {
    if ($0.length > num) {
      num = $0.length;
      char = $1;
    }
  });
  return {
    char,
    num
  };
}

console.log(getMostCharInStr(str));
