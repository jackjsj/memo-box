console.log(a);
function a() {}
var a = 1;

// 先执行变量提升，此时a为undefined，然后执行函数提升，此时a为函数，然后执行代码，输出为function a(){}
