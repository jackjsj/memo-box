const PENDING = "PENDING";
const RESOLVED = "RESOLVED";
const REJECTED = "REJECTED";
function isFunction(fn) {
  return typeof fn === "function";
}
class MyPromise {
  constructor(executor) {
    this._status = PENDING;
    this._value = undefined;

    this._resolvedQueue = [];
    this._rejectedQueue = [];

    try {
      executor(this._resolve.bind(this), this._reject.bind(this));
    } catch (err) {
      this._reject(err);
    }
  }
  _resolve(value) {
    const fn = () => {
      if (this._status !== PENDING) return;
      // 这里要判断value是不是一个Promise，如果是，就需要等Promise执行完，将结果给value，状态给status
      if (value instanceof MyPromise) {
        value.then(
          (val) => {
            this._value = val;
            this._status = RESOLVED;
            let cb;
            while ((cb = this._resolvedQueue.shift())) {
              cb(val);
            }
          },
          (err) => {
            this._value = err;
            this._status = REJECTED;
            let cb;
            while ((cb = this._rejectedQueue.shift())) {
              cb(err);
            }
          }
        );
      } else {
        // 如果不是，就直接设置value和status
        this._value = value;
        this._status = RESOLVED;
        let cb;
        while ((cb = this._resolvedQueue.shift())) {
          cb(value);
        }
      }
    };
    setTimeout(fn);
  }
  _reject(reason) {
    const fn = () => {
      if (this._status !== PENDING) return;
      this._value = reason;
      this._status = REJECTED;
      let cb;
      while ((cb = this._rejectedQueue.shift())) {
        cb(reason);
      }
    };
    setTimeout(fn);
  }

  then(onResolved, onRejected) {
    // 处理穿透
    onResolved = isFunction(onResolved) ? onResolved : (value) => value;
    onRejected = isFunction(onRejected)
      ? onRejected
      : (err) => {
          throw err;
        };
    // 获取当前status和value
    const { _status, _value } = this;
    return new MyPromise((resolve, reject) => {
      const fn = (onStatusChange) => {
        return (value) => {
          // 如果是成功，则执行成功回调
          try {
            const res = onStatusChange(value);
            // 如果成功回调的结果是Promise，还要等Promise的状态改变后，根据相应的状态，决定用resolve还是reject,并将值返回
            if (res instanceof MyPromise) {
              res.then(resolve, reject);
            } else {
              // 如果不是promise,则直接将值resolve
              resolve(res);
            }
          } catch (err) {
            reject(err);
          }
        };
      };
      switch (_status) {
        case PENDING:
          // 如果是还没执行完，那就将成功回调和失败回调放入回调队列中
          this._resolvedQueue.push(fn(onResolved));
          this._rejectedQueue.push(fn(onRejected));
          break;
        case RESOLVED:
          fn(onResolved)(_value);
          break;
        case REJECTED:
          fn(onRejected)(_value);
          break;
        default:
      }
    });
  }

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  static resolve(val) {
    if (val instanceof MyPromise) return val;
    return new MyPromise((resolve) => {
      resolve(val);
    });
  }

  static reject(err) {
    return new MyPromise((resolve, reject) => {
      reject(err);
    });
  }

  static all(promises) {
    const results = [];
    let count = 0;
    const length = promises.length;
    return new MyPromise((resolve, reject) => {
      for (let i = 0; i < length; i++) {
        const p = promises[i];
        p.then(
          (val) => {
            results.push(val);
            count++;
            if (count === length) resolve(results);
          },
          (err) => {
            reject(err);
            break;
          }
        );
      }
    });
  }

  static race(promises) {
    return new MyPromise((resolve, reject) => {
      for (let p of promises) {
        p.then((val) => {
          resolve(val);
          return;
        }, reject);
      }
    });
  }

  finally(cb) {
    return this.then(
      (val) => MyPromise.resolve(cb()).then(() => val),
      (err) =>
        MyPromise.resolve(cb()).then(() => {
          throw val;
        })
    );
  }
}
const p = new MyPromise((resolve) => {
  resolve(1);
});
p.then(
  () => {
    const p2 = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        reject("p2");
      }, 1000);
    });
    return p2;
  },
  (err) => {
    console.log("error:" + err);
  }
).then(
  (resp) => {
    console.log(resp);
  },
  (err) => {
    console.log("err:" + err);
  }
);

const r = MyPromise.reject(
  new MyPromise((resolve) => {
    resolve("1");
  })
);
r.then((resp) => {
  console.log(resp);
})
  .catch((err) => {
    console.log("error:" + err);
  })
  .finally(() => {
    console.log(111);
  });
