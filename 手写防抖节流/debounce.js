/**
 * 防抖函数
 * @param {*} fn 要做防抖处理的目标方法
 * @param {*} wait 多少秒内再次触发事件，则重新计时
 * @param {*} immediately 是否立即执行，默认为false
 */
function debounce(fn, wait, immediately = false) {
  let timer, result;
  let flag = true;
  const debounced = function () {
    if (immediately) {
      // 第一次进来立即执行，第二次要等N秒后, 并且每次不能进来，要重新计时
      clearTimeout(timer);
      if (!timer) {
        result = fn.apply(this, arguments);
      }
      timer = setTimeout(() => {
        timer = null;
      }, wait);
    } else {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        // 需要指定this和arguments，获取事件绑定的对象和事件
        fn.apply(this, arguments);
      }, wait);
    }
  };
  debounced.cancel = function () {
    clearTimeout(timer);
    timer = null;
  };
  return debounced;
}
