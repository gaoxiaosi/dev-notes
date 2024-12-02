# 依赖收集

------

https://juejin.cn/post/6919373017218809864

#### 如何进行依赖收集

每个属性都有一个dep，存放所依赖的watcher，当属性变化后通知自己对应的watcher去更新

在渲染时（获取这个响应式数据，此时就会触发属性收集依赖dep.depend()

当属性发生改变时触发watcher通过dep.notify