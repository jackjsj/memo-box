class EventEmitter {
  constructor() {
    // 事件列队
    this.queue = new Map();
  }

  // 添加事件监听
  addEventListener(type, fn) {
    const fns = this.queue.get(type);
    // 如果fns不存在，则设置一个set存储触发回调方法
    if (!fns) {
      this.queue.set(type, new Set([fn]));
    } else {
      // 如果fns存在，说在fns中添加一个触发回调
      fns.add(fn);
    }
  }

  // 触发事件
  // args为传给回调函数的参数
  emit(type, ...args) {
    // 获取type类型的回调函数集合
    const fns = this.queue.get(type);
    if (fns && fns.size > 0) {
      // 依次执行回调
      for (const fn of fns) {
        // 用set数据结构，for of遍历可以动态获取数组长度
        fn.apply(null, args);
      }
    }
  }

  // 删除事件监听，如果第二个参数不传，则删除所有该类型事件
  removeEventListener(type, fn) {
    // 获取指定类型所有触发回调函数
    const fns = this.queue.get(type);
    if (fns && fns.size > 0) {
      if (fn === undefined) {
        // 删除所有事件回调
        fns.clear();
        this.queue.delete(type);
      } else {
        // 删除指定类型，指定回调
        fns.delete(fn);
      }
    }
  }
}

// test

const event = new EventEmitter();
event.addEventListener("click", (name, age) => {
  console.log({ name, age });
});
function sayHello() {
  console.log("hello");
  event.removeEventListener("click");
}
function saySomething(sth) {
  console.log(sth);
}
event.addEventListener("click", sayHello);
event.addEventListener("click", saySomething);
event.addEventListener("click", (name, age) => {
  console.log({ name, age: age + 1 });
});
event.emit("click", "Jack", 18);
