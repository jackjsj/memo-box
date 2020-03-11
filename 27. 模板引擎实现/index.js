let template = "我是{{name}}，年龄{{age}}，性别{{sex}}";
let data = {
  name: "姓名",
  age: 18
};
console.log(render(template, data)); // 我是姓名，年龄18，性别undefined

function render(template, data) {
  // 健壮性判断
  if (data !== null && typeof data === "object") {
    return template.replace(/\{\{(.+?)\}\}/g, ($0, $1) => data[$1]);
  }
}
