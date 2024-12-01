# 虚拟DOM

------

### 思路：

1. VDOM是什么？
2. 引入VDOM的好处？
3. VDOM如何生成，又如何转成真实DOM？diff算法在后续视图更新时的作用
4. 与React的虚拟DOM的区别（不问不用答）

#### 回答：

1. **虚拟DOM的本质是一个描述DOM的JS对象**。

2. 引入虚拟DOM的好处：

   - 将真实DOM抽象成虚拟DOM，减少直接操作DOM的次数，避免频繁的DOM操作造成的重绘和回流，提高程序性能

   - 方便实现跨平台。同一个虚拟DOM对象可以在不同平台上渲染相应的内容，根据平台进行优化

3. 虚拟DOM的第一次生成的流程：将`template`通过编译生成`ast语法树`，`mount`过程中通过`render`函数生成`虚拟DOM`，再通过patch转换成真实DOM。挂载完成之后，当响应式数据发生变化时，会引起组件重新render，生成新的VDOM和上一次的渲染结果进行diff比较得到变化的地方然后进行DOM更新操作，可以更高效地更新视图。

   `template` → `compiler(ast、generate、code` → `render` → `虚拟DOM` → `真实DOM`

4. 

