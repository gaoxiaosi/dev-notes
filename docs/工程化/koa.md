# Koa

------

### 简述koa的中间键原理，手写koa-compose代码

```javascript
function compose(middlewares) {
  return (ctx) => {
    const dispatch = (i) => {
      const middleware = middlewares[i];
      if (i === middlewares.length) {
        return
      }
      return middleware(ctx, () => dispatch(i + 1));
    }
    return dispatch(0);
  }
}
```



#### Koa与Express的区别

Koa的优点：

1. 更小更轻量，不捆绑任何中间件，想用自己去加
2. 使用async/await函数，丢弃了之前Express回调，更加优雅

##### Koa

- 基于node的一个web开发框架，利用co作为底层运行框架，利用Generator的特性，实现“无回调”的异步处理；
- ES7;
- 更小、更富有表现力、更健壮的基石；
- 利用async函数、Koa丢弃回调函数，增强错误处理；
- 很小的体积，因为没有捆绑任何中间件；
- 类似堆栈的方式组织和执行；
- 低级中间件层中提供高级“语法糖”，提高了互操性、稳健性；

##### Express

- Node的基础框架，基础Connect中间件，自身封装了路由、视图处理等功能；
- 线性逻辑，路由和中间件完美融合，清晰明了；
- 弊端是callback回调方式，不可组合、异常不可捕获；
- ES5;
- connect的执行流程： connect的中间件模型是线性的，即一个一个往下执行；



### 洋葱模型

通过next将中间件分成两部分，next上面的方法先执行，后续的方法从后面开始执行。
