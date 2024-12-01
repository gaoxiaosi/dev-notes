# new && Object.create

------

### 手写Object.create

```javascript
function create(obj) {
  function F() {}
  F.prototype = obj;
  return new F();
}
```



### 手写new操作符

在调用`new`的过程中会发生以下四件事情：

1. 创建一个空的对象。
2. 设置原型，将对象的原型设置为函数的prototype对象。
3. 让函数的this指向这个对象，执行构造函数的代码（为这个新对象添加属性）。
4. 判断函数的返回值类型，如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象。

```javascript
function objectFactory () {
  let newObj = null;
  let constructor = Array.prototype.shift.call(arguments);
  let result = null;
  // 判断参数是否是一个函数
  if (typeof constructor !== 'function') {
    console.log('type error');
    return;
  }
  // 新建一个空对象，对象的原型为构造函数的prototype对象
  newObj = Object.create(constructor.prototype);
  // 将this指向新建对象，并执行函数
  result = constructor.apply(newObj, arguments);
  // 判断返回对象
  let flag = result && (typeof result === 'object' || typeof result === 'function');
  return flag ? result : newObj;
}
```

