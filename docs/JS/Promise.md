# Promise

------

### 手写Promise，实现各种方法

```javascript
class MyPromise {
  constructor(executor) {
    // 状态、返回值、回调
    this.promiseState = 'pending';
    this.promiseResult = null;
    this.callbacks = [];
    const resolve = (value) => {
      // 判断状态
      if (this.promiseState !== 'pending') return;
      // 更改为成功状态和值
      this.promiseState = 'fulfilled';
      this.promiseResult = value;
      // 遍历执行成功的回调
      setTimeout(() => {
        this.callbacks.forEeach((stateObj) => {
          stateObj.onResolved(value)
        })
      })
    }
    const reject = (reason) => {
      // 判断状态
      if (this.promiseState !== 'pending') return;
      // 更改为失败状态和值
      this.promiseState = 'rejected';
      this.promiseResult = reason;
      // 遍历执行失败的回调
      setTimeout(() => {
        this.callbacks.forEach((stateObj) => {
          stateObj.onRejected(reson)
        })
      })
    }
    // throw抛出错误走到reject
    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }
  then (onResolved, onRejected) {
    // 如果不传递成功或者失败的回调函数，默认构造一个
    if (typeof onResolved !== 'function') {
      onResolved = (value) => value;
    }
    if (typeof onRejected !== 'function') {
      onRejected = (reason) => {
        throw reason;
      }
    }
    return new MyPromsie((resolve, reject) => {
      const callback = (type) => {
        try {
          // 获取回调函数执行结果
          const result = type(this.promiseResult);
          // 判断
          if (result instanceof MyPromise) {
            // 如果是Promise类型对象
            result.then(
           		(res) => { resolve(res) },
              (reason) => { reject(reason) }
            )
          } else {
            // 状态变为成功
            resolve(result)
          }
        } catch (e) {
          reject(e);
        }
      }
      // 执行then成功回调
      if (this.promiseState === 'fulfilled') {
        setTimeout(() => {
          callback(onResolved);
        })
      }
      // 执行then失败回调
      if (this.promiseState === 'rejected') {
        setTimeout(() => {
          callback(onRejected)
        })
      }
      // 若pending保存成功和失败回调
      if (this.promsieState === 'pending') {
        this.callbacks.push({
          onResolved: () => {
            callback(onResolved);
          },
          onRejected: () => {
            callback(onRejected);
          }
        })
      }
    })
  }
  catch(onRejected) {
    return this.then(undefined, onRejected);
  }
  finally(callback) {
    return this.then(
      (value) => {
        return MyPromise.resolve(callback()).then(() => value)
      },
      (reason) => {
        return MyPromise.resolve(callback()).then(() => { throw reason })
      }
    )
  }
  static resolve(value) {
    return new MyPromise((resolve, reject) => {
      if (value instanceof MyPromise) {
        value.then(
        	(res) => { resolve(res) },
          (reason) => { reject(reason) }
        ) 
      } else {
        resolve(value)
      }
    })
  }
  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason)
    })
  }
  // 等待所有完成（或第一个失败）
  static all(promises) {
    // 计数
    let count = 0;
    let arr = [];
    return new MyPromise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        promise[i].then(
        	(value) => {
            count++;
            arr[i] = value;
            if (count === promises.length) 【
            resolve(arr)
          },
          (reason) => {
            reject(reason)
          }
        )
      }
    })
  }
  // 返回第一个成功或失败
  static race(promise) {
    return new MyPromise((resolve, reject) => {
      for (let i = 0; i < promise.length; i++) {
        promises[i].then(
       		(value) => {
            resolve(value)
          },
          (reason) => {
            reject(reason)
          }
        )
      }
    })
  }
  // static allSettled()
  // static any
}
```

### 相关链接：

[Promise in MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)

[Promise/A+ 规范](https://promisesaplus.com/)

[规范案例测试包](https://github.com/promises-aplus/promises-tests)

### 实现函数promisify

```javascript
function promisify (fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (err, data) => {
        if (err) reject(err);
        resolve(data);
      })
    })
  }
}
```



### 实现async/await