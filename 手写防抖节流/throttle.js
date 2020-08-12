function throttle(fn, wait) {
  let lastTime = 0;
  return function () {
    const now = +new Date();
    if (now - lastTime > wait) {
      lastTime = now;
      fn.apply(this, arguments);
    }
  };
}

function throttle2(fn, wait) {
  let timer;
  return function () {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, arguments);
        timer = null;
      }, wait);
    }
  };
}
