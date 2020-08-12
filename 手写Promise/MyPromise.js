// Promise的三种状态定义
const PENDING = 'PENDING';
const RESOLVED = 'RESOLVED';
const REJECTED = 'REJECTED';

function isFunction(a) {
  return typeof a === 'function';
}

class MyPromise {
  /**
   * 构造函数
   * @param {*} executor 执行器
   */
  constructor(executor) {
    if (!isFunction(executor)) {
      throw new Error('execuotr must be a function');
    }
    this._status = PENDING;
    this._value = undefined;
    // 定义成功回调和失败回调的队列
    this._resolveQueue = [];
    this._rejectQueue = [];
    try {
      executor(this._resolve.bind(this), this._reject.bind(this));
    } catch (err) {
      this._reject(err);
    }
  }

  _resolve(value) {
    // 状态改变后，再执行resolve将忽略
    if (this._status !== PENDING) return;

    // 封装一个执行回调队列中回调的方法
    const walk = (queue) => {
      let cb;
      while ((cb = queue.shift())) {
        // 先注册的先执行
        cb && cb(this._value);
      }
    };

    // 封装一个方法，用于异步执行
    const fn = () => {
      // 注意，这里要判断value的类型是不是MyPromise
      if (value instanceof MyPromise) {
        value.then(
          (val) => {
            this._status = RESOLVED;
            this._value = val;
            walk(this._resolveQueue);
          },
          (err) => {
            this._status = REJECTED;
            this._value = err;
            walk(this._rejectQueue);
          }
        );
      } else {
        // 当用户执行resolve方法时，状态将变为RESOLVED，值为用户传的值
        this._status = RESOLVED;
        this._value = value;
        // 依次执行then中注册的onResolved回调队列
        walk(this._resolveQueue);
      }
    };

    setTimeout(fn);
  }

  _reject(reason) {
    // 封装一个方法，用于异步执行
    const fn = () => {
      // 状态改变后，再执行reject将忽略
      if (this._status !== PENDING) return;
      // 当用户执行reject方法或执行过程中有异常，状态将变为REJECTED，值为异常
      this._status = REJECTED;
      this._value = reason;
      // 触发then中注册的onRejected回调
      let cb;
      while ((cb = this._rejectQueue.shift())) {
        // 先注册的先执行
        cb && cb(reason);
      }
    };

    setTimeout(fn);
  }

  /**
   * then方法
   * @param {*} onResolve 成功时的回调
   * @param {*} onReject 失败时的回调
   */
  then(onResolve, onReject) {
    // 穿透
    onResolve = isFunction(onResolve) ? onResolve : (value) => value;
    onReject = isFunction(onReject)
      ? onReject
      : (reason) => {
          throw reason;
        };
    return new MyPromise((resolve, reject) => {
      // 封装一个方法，根据成功和失败，做相应处理
      const fn = (onStatusChange) => {
        return (_value) => {
          try {
            const res = onStatusChange(_value);
            // 然后再判断这个函数的执行结果是不是MyPromise类型
            if (res instanceof MyPromise) {
              // 如果是MyPromise类型，就等这个Promise状态改变后，再将值作为新的promise对象的值
              res.then(
                (val) => resolve(val), // 如果这个promise状态是成功
                (err) => reject(err) // 如果这个promise状态是失败
              );
            } else {
              // 如果不是MyPromise类型，就直接将该值作为新的promise对象的值
              resolve(res);
            }
          } catch (err) {
            reject(err);
          }
        };
      };
      // 判断当前promise实例的状态
      if (this._status === PENDING) {
        // 将回调注册到队列中等待执行
        this._resolveQueue.push(fn(onResolve));
        this._rejectQueue.push(fn(onReject));
      } else if (this._status === RESOLVED) {
        // 直接执行成功回调,获取结果，作为返回的新promise的值
        fn(onResolve)(this._value);
      } else if (this._status === REJECTED) {
        // 直接执行失败回调
        fn(onReject)(this._value);
      }
    });
  }

  /**
   * catch方法
   * @param {*} onReject 失败时的回调
   */
  catch(onReject) {
    return this.then(null, onReject);
  }

  static resolve(val) {
    if (val instanceof MyPromise) return val;
    return new Promise((resolve, reject) => {
      resolve(val);
    });
  }

  static reject(err) {
    return new MyPromise((resolve, reject) => {
      reject(err);
    });
  }

  static all(promises) {
    const length = promises.length;
    let count = 0;
    const results = [];
    return new MyPromise((resolve, reject) => {
      for (let i = 0; i < length; i++) {
        const p = promises[i];
        p.then((value) => {
          // 成功，则将结果放入results中
          results[i] = value;
          count++;
          if (count === length) resolve(results);
        }).catch((err) => {
          // 有一个失败，则失败
          reject(err);
        });
      }
    });
  }

  static race(promises) {
    const length = promises.length;
    return new MyPromise((resolve, reject) => {
      for (let i = 0; i < length; i++) {
        const p = promises[i];
        p.then((value) => {
          resolve(value);
        }).catch((err) => {
          reject(err);
        });
      }
    });
  }

  finally(cb) {
    // 如果cb执行返回的是一个promise，那还要等这个Promise状态改变以后，才执行后面的回调
    return this.then((value) =>
      MyPromise.resolve(cb()).then(() => value)
    ).catch((err) =>
      MyPromise.resolve(cb()).then(() => {
        throw err;
      })
    );
  }
}

// test:参数不是函数
const p = new MyPromise((resolve, reject) => {
  const innerP = new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve('innerP');
    }, 1000);
  });
  reject(innerP);
});
p.then(
  (resp) => {
    console.log('success:' + resp);
  },
  (err) => {
    console.log('error:' + err);
  }
);
