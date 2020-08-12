const PENDING = 'PENDING';
const RESOLVED = 'RESOLVED';
const REJECTED = 'REJECTED';
function isFunction(fn) {
  return typeof fn === 'function';
}

class MyPromise {
  constructor(executor) {
    this._status = PENDING;
    this._value = undefined;
    // 设置两个回调队列，成功的和失败的
    this._resolvedQueue = [];
    this._rejectedQueue = [];
    // executor是一个函数，有两个参数
    try {
      executor(this._resolve.bind(this), this._reject.bind(this));
    } catch (err) {
      this._reject(err);
    }
  }

  _resolve(value) {
    const fn = () => {
      if (this._status !== PENDING) return;
      // TODO: 值可能是一个Promise，那就要等到Promise状态改变后才能修改状态和值
      if (value instanceof MyPromise) {
        value.then(
          (resp) => {
            this._value = resp;
            this._status = RESOLVED;
            let cb;
            while ((cb = this._resolvedQueue.shift())) {
              cb(resp);
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
        // 将值设为value
        this._value = value;
        // 当执行了这个函数，就将状态改成resolved
        this._status = RESOLVED;
        // 依次执行成功回调
        let cb;
        while ((cb = this._resolvedQueue.shift())) {
          cb(value);
        }
      }
    };
    setTimeout(fn);
  }

  _reject(reason) {
    // 异步执行
    const fn = () => {
      if (this._status !== PENDING) return;
      // 将错误原因设为reason
      this._value = reason;
      // 当执行了这个函数，就将状态改为rejected
      this._status = REJECTED;
      // 依次执行失败回调
      let cb;
      while ((cb = this._rejectedQueue.shift())) {
        cb(reason);
      }
    };
    setTimeout(fn);
  }

  /**
   * then是实例的方法，接受两个参数，即成功回调函数，和失败回调函数
   * @param {*} onResolved
   * @param {*} onRejected
   */
  then(onResolved, onRejected) {
    // TODO:这里要判断onResolved和onRejected是不是没有传，如果没有传，则给一个默认函数, 即穿透效果
    onResolved = isFunction(onResolved) ? onResolved : (value) => value;
    onRejected = isFunction(onRejected)
      ? onRejected
      : (reason) => {
          throw reason;
        };
    // 判断当前this，即promise实例的状态
    let { _status, _value } = this;
    return new MyPromise((resolve, reject) => {
      const resolvedFn = (value) => {
        const res = onResolved(value);
        try {
          if (res instanceof MyPromise) {
            // 如果是promise类型的值，要等到promise得到结果后，并将结果的值，作为新promise的值
            res.then(resolve, reject);
          } else {
            // 得到结果后，将结果作为新promise的值
            resolve(res);
          }
        } catch (err) {
          // 如果执行过程中有异常，就将异常作为新promise的值
          reject(err);
        }
      };
      const rejectedFn = (value) => {
        const res = onRejected(value);
        try {
          if (res instanceof MyPromise) {
            // 如果是promise类型的值，要等到promise得到结果后，并将结果的值，作为新promise的值
            res.then(resolve, reject);
          } else {
            // 得到结果后，将结果作为新promise的值
            resolve(res);
          }
        } catch (err) {
          // 如果执行过程中有异常，就将异常作为新promise的值
          reject(err);
        }
      };
      switch (_status) {
        case PENDING:
          // 将回调放入回调队列中
          this._resolvedQueue.push(resolvedFn);
          this._rejectedQueue.push(rejectedFn);
          break;
        case RESOLVED:
          // 如果成功，则执行成功回调
          // TODO:这里需要判断_value的类型，如果是promise类型，则要等到promise状态改变后得到结果再执行回调
          resolvedFn(_value);
          break;
        case REJECTED:
          // 如果失败，则执行失败回调
          rejectedFn(_value);
          break;
        default:
      }
    });
  }

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  static resolve(value) {
    if (value instanceof MyPromise) return value;
    return new MyPromise((resolve, reject) => {
      resolve(value);
    });
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }

  static all(promises) {
    const length = promises.length;
    const results = [];
    let count = 0;
    return new MyPromise((resolve, reject) => {
      for (let i = 0; i < length; i++) {
        const p = promises[i];
        p.then(
          (resp) => {
            results.push(resp);
            count++;
            if (count === length) {
              resolve(results);
            }
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
    const length = promises.length;
    return new MyPromise((resolve, reject) => {
      for (let i = 0; i < length; i++) {
        const p = promises[i];
        p.then(
          (resp) => {
            resolve(resp);
            break;
          },
          (err) => {
            reject(err);
            break;
          }
        );
      }
    });
  }

  finally(fn) {
    return this.then(
      (value) => MyPromise.resolve(fn()).then(() => value),
      (err) =>
        MyPromise.resolve(fn()).then(() => {
          throw err;
        })
    );
  }
}

// const p = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('p1');
//   }, 1000);
// });
// p.then((resp) => {
//   console.log(resp);
// });

// const p2 = new MyPromise((resolve, reject) => {
//   resolve('p2');
// });
// p2.then((resp) => {
//   console.log('p2');
// });
const p = new MyPromise((resolve, reject) => {
  resolve(1);
});
p.then(
  (resp) => {
    const p2 = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        reject('p2');
      }, 1000);
    });
    return p2;
  },
  (err) => {
    console.log('error:' + err);
  }
).then(
  (resp) => {
    console.log(resp);
  },
  (err) => {
    console.log('err:' + err);
  }
);

const r = Promise.reject(
  new Promise((resolve, reject) => {
    resolve('1');
  })
);
r.then((resp) => {
  console.log(resp);
})
  .catch((err) => {
    console.log('error:' + err);
  })
  .finally(() => {
    console.log(111);
  });
