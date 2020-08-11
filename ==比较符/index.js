// js 中的类型目前有8种：undefined null number string boolean symbol bigint object
// 如果 js 预期某个位置应该是布尔值，会将该位置上现有的值自动转为布尔值。
// 转换规则是除了下面六个值被转为false，其他值都视为true。

// undefined
// null
// false
// 0 +0 -0
// NaN
// ""或''（空字符串）

// 1. 判断类型是否一致，如一致，使用===进行比较
// 2. 判断是否比较的是undefined和null, 是则返回true
// 3. 判断是否比较的是string和number，是则将string转number再比较
// 4. 判断是否一方是boolean，是则将boolean转number再比较
// 5. 判断是否一方是object,另一方是number,string,symbol，是则将object转基本类型再比较
// 6. 其它情况都为false

// 测试题
const cl = console.log;
// cl(0 == null); // false
// cl(0 == undefined); // false
// cl("" == null); // false
// cl(undefined == ""); //false
// cl(false == null); //false
// cl(undefined == false); //false
// cl({} == undefined); //false
// cl({} == null); // false
// cl([] == null); // false
// cl([] == undefined); // false
// 说明除了null和undefined，其它和null undefined比较，都为false

// Object 转基本类型
// 1. 如果预期是转为number, 则先调 valueOf, 如果转后还不是基本类型，则再调 toString
// 2. 如果预期是转为string, 则先调 toString, 如果转后还不是基本类型，则再调 valueOf
cl([] == 0);
// true []转number, 即[].valueOf().toString() 得到 ""，变为 string与 number 的比较，""转number为0
cl({} == 0);
// false , {} 转 number, {}.valueOf().toString() 得到 "[object Object]"，
cl([] == '');
// true [].toString() 得到 ""
cl({} == '');
// false ({}).toString() 得到 "[object Object]"

cl([] == ![]);
// true 右边是boolean值，值为false，先把右边转成数字0，然后左边对象要转成基本类型，会转成字符串"",字符串转成数值0
cl({} == []);
// false 类型相同，用 ===
cl([] == !{});
// true, 右边是boolean，值为false，将成数字0，左边转成基本类型为字符串"",再转成数字0
cl({} == ![]); // 右边是boolean，值为false,转成数字0，左边转成基本类型["object Object"]，转成数字NaN, 返回false
