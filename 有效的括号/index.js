/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  const map = {
    "(": ")",
    "{": "}",
    "[": "]"
  };
  let stack = []; // 定义栈数据类型
  for (let c of s) {
    const isLeft = map[c]; // map[c]不为undefined，说明是左括号
    if (isLeft) {
      // 如果是左括号,将左括号推入栈中
      stack.push(c);
    } else {
      // 如果不是左括号，则栈顶的左括号出栈，并且判断是否和当前字符（括号）匹配
      if (c !== map[stack.pop()]) {
        // 不匹配就直接返回false
        return false;
      }
    }
  }
  return stack.length === 0;
};

console.log(isValid("()"));
