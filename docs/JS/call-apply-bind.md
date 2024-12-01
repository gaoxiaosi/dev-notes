# this && call && apply && bind

------

#### 作用：改变函数执行时的上下文，简而言之就是改变函数执行时this的指向

### call的实现，直接看代码：

```javascript
Function.prototype.myCall = function (context) {
  // 判断调用的对象是否为函数(不用判断也行，因为挂载在Function的原型上了，如果不是函数js自己也会报错不执行)
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  // 获取参数，add.myCall(obj, 30, 40))
  const args = [...arguments].slice(1);
  // 判断context是否传入，add.myCall(null, 30, 40))，如果是null或undefined指向window
  // 用globalThis代替window兼容各种环境
  context = context || globalThis;
  // 借用别人的函数（创建一个临时变量进行存储，用完即删，此时的shis当然就是指向context的）
  context.tempFn = this;
  const result = context.tempFn(...args);
  delete context.tempFn;
  return result;
}

// 测试
function add(a, b) {
  return a + b + this.c
}
globalThis.c = 40;
const obj = {
  c: 30
};
console.log('call指向obj:', add.myCall(obj, 10, 20)) // 10+20+30=60
console.log('call指向window:', add.myCall(null, 10, 20)) // 10+20+40=70

// 如果挂在原型上比较难看那个context，我们把context抽出来可能更清晰一点
// fn: 要借用的函数
// obj：要指向的对象
function call(fn, obj, ...args) {
  // 判断obj为ull 或者 undefined就指向全局对象
  if (obj === null || obj === undefined) {
    obj = globalThis;
  }
  // 为obj添加临时方法
  obj.temp = fn;
  // 执行临时方法传入参数得到结果
  const reuslt = obj.temp(...args);
  // 删除临时方法
  delete obj.temp;
  // 返回结果
  return reuslt;
}
```

### apply的实现，和call唯一的不同就是传参方式不同，call的参数是逐个传入，apply的参数是一个数组，区分记忆方法：apply→a开头→Array→参数是数组，其实数组展开也就变成逐个传入了。。。直接看代码：

```javascript
Function.prototype.myApply = function (context) {
  context = context || globalThis;
  context.tempFn = this;
  let result = null;
  if (arguments[1]) {
    result = context.tempFn(...arguments[1]);
  } else {
    result = context.tempFn()
  }
  delete context.tempFn;
  return result;
}
console.log('apply指向obj:', add.myApply(obj, 10, 20)) // 10+20+30=60
console.log('apply指向window:', add.myApply(null, 10, 20)) // 10+20+40=70
```

### bind的实现，内部使用了call/apply，也是改变this指向，注意该方法是返回整个函数，需要手动执行。
