# eventBus

------

- eventBus：包含所有功能的事件总线对象
- eventBus.on(eventName, listener)：绑定事件监听
- eventBus.emit(eventName, data)：分发事件
- eventBus.off(eventName)：解绑指定事件名的事件监听，如果没有指定则解绑所有

```javascript
const eventBus = {
  // 保存类型和回调容器
  callbacks: {
    // login: [fn1, fn2]
  }
}

eventBus.on = function (eventName, callback) {
  // 判断是否已有该类型事件
  if (this.callbacks[eventName]) {
    // 将cb推入
    this.callbacks[eventName].push(callback)
  } else {
    // 构造一个新的数组存储
    this.callbacks[eventName] = [callback]
  }
}

eventBus.emit = function (eventName, data) {
  // 如果该类型事件存在，将全部触发
  if (this.callbacks[eventName] && this.callbacks[eventName].length > 0) {
    this.callbacks[eventName].forEach(event => event(data))
  }
}

eventBus.off = function (eventName) {
  if (eventName) {
    delete this.callbacks[eventName]
  } else {
    this.callbacks = {}
  }
}
```

