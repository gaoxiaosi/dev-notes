### Vue3更新内容

------

1. API的更新：
   - 优化双向数据绑定，使用`Proxy`代替`Object.defineProperty`
   - 写法改变，使用`Composition API`、`SFC Composition API（setup）`语法糖
   - `Teleport`瞬移组件，主要是模态窗组件会用的上
   - `Fragments`片段，组件可以有多个根节点
   - `Emits`选项
   - 自定义渲染器
   - `Suspense`
   - 虚拟DOM算法升级、编译器优化、支持TS、更好tree-shaking
   - 生命周期的钩子不同，`beforeCreate`和`created`使用`setup`代替，其他的主要是名字不同
   
2. 框架特性和整体的一些优化：
   - 更快
     - 重写虚拟DOM（编译优化内容的存储，type属性支持更加多样）
     - 编译器优化：静态提升、patchFlags、block（区块等）