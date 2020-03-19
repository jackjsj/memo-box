const cl = console.log;
// 其它类型转字符串
cl(String(NaN)); // "NaN"
cl(String({})); //"[object Object]"
cl(String([])); // ""
cl(String(["1", 1])); // "1,1"

// 其它类型转数值
cl(Number()); //0
cl(Number(undefined)); //NaN
cl(Number(null)); //0
cl(Number(false)); //0
cl(Number([])); // 0
cl(Number([1])); // 1
cl(Number([1, 2])); // NaN
cl(Number({})); // NaN
cl(Number("1")); // 1
cl(Number("1a")); // NaN

// 其它类型转boolean
// 只有undefined null "" 0 NaN 为false,其它都是true,甚至是new Boolean(false)，因为它是一个对象
cl(Boolean(new Boolean(false)));
