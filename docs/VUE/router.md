# 路由

------

### 模式：

`Hash`：默认，带`#`，不会发起请求。原理是`onhashchange`事件（监听location.hash的改变）

`History`：html5的，如果找不到路由会发起请求。打包后前端使用history可能会出现空白页。原理是`pushState`可以改变url且不会发起请求和`replaceState`读取历史记录，切换的时候可以使用`forward`、`back`、`go`。刷新页面时可能会找不到相关路由或资源，容易出现404的情况，前端和后端都需要配置。



### SPA（当页面应用）：

##### 缺点：1. SEO优化不好 2.性能不是特别好



### 路由传值：

- `query`：显式，在浏览器url上可以看到具体参数。传：`this.$router.push({ path, query: data})`；接：`this.$route.query`

- `params`：隐式，浏览器上url上看不到具体参数。传：`this.$router.push({ path, params: data})`；接：`this.$route.params`

  

### 路由导航守卫：

- 全局：`beforeEach(to, from, next)`、`beforeResolve(to, from, next)`、`afterEach(to, from)`

- 路由独享：`beforeEnter(to, from, next)`

- 组件内：`beforeRouteEnter(to, from, next)`、`beforeRouteUpdate(to, from, next)`、`beforeRouteLeave(to, from, next)`

  使用场景：判断是否登录或者权限相关的白名单之类的。

  路由导航、keep-alive、和组件生命周期钩子结合起来的，触发顺序，假设是从a组件离开，第一次进入b组件∶

  - beforeRouteLeave：路由组件的组件离开路由前钩子，可取消路由离开。
  - beforeEach：路由全局前置守卫，可用于登录验证、全局路由loading等。
  - beforeEnter：路由独享守卫
  - beforeRouteEnter：路由组件的组件进入路由前钩子。
  - beforeResolve：路由全局解析守卫
  - afterEach：路由全局后置钩子
  - beforeCreate：组件生命周期，不能访问tAis。
  - created;组件生命周期，可以访问tAis，不能访问dom。
  - beforeMount：组件生命周期
  - deactivated：离开缓存组件a，或者触发a的beforeDestroy和destroyed组件销毁钩子。
  - mounted：访问/操作dom。
  - activated：进入缓存组件，进入a的嵌套子组件（如果有的话）。
  - 执行beforeRouteEnter回调函数next。

  

### 动态路由：

使用场景：详情页。`path:'/list/:id'`，通过`params`获取



### 路由懒加载：

1. 箭头函数+import动态加载

   ```javascript
   const List = () => import('@/components/list.vue')
   const router = new VueRouter({
     routes: [
       { path: '/list', component: List }
     ]
   })
   ```

2. 箭头函数+require动态加载

   ```javascript
   const router = new Router({
     routes: [
      {
        path: '/list',
        component: resolve => require(['@/components/list'], resolve)
      }
     ]
   })
   ```

3. 使用Webpack的require.ensure，也可以实现按需加载。这种情况下，多个路由指定相同的chunkName会合并打包成一个js文件

   ```javascript
   // r就是resolve
   const List = r => require.ensure([], () => r(require('@/components/list')), 'list');
   // 路由也是正常的写法  这种是官方推荐的写的 按模块划分懒加载 
   const router = new Router({
     routes: [
     {
       path: '/list',
       component: List,
       name: 'list'
     }
    ]
   }))
   ```

   

### 监听页面hash变化

1. 监听$route的变化

   ```javascript
   // 监听,当路由发生变化的时候执行
   watch: {
     $route: {
       handler: function(newVal, oldVal){
         console.log(newVal);
       },
       // 深度观察监听
       deep: true
     }
   }
   ```

2. window.location.hash读取#值** window.location.hash 的值可读可写，读取来判断状态是否改变，写入时可以在不重载网页的前提下，添加一条历史访问记录。



#### router和route的区别

1. route为当前router跳转对象里面可以获取name、path、query、params等
2. router为VueRouter实例，想要导航到不同URL，则使用router.push方法



#### 路由 TypeError: Cannot read property 'matched' of undefined 的错误问题

找到入口文件main.js里的new Vue()，必须使用router名，不能把router改成Router或者其他的别名

```javascript
// 引入路由
import router from './routers/router.js'

new Vue({
    el: '#app',
    router,    // 这个名字必须使用router
    render: h => h(App)
});
```

#### Vue里面router-link在电脑上有用，在安卓上没反应怎么解决

Vue路由在Android机上有问题，babel问题，安装babel polypill插件解决



#### Vue2中注册在router-link上事件无效解决方法

使用@click.native。原因：router-link会阻止click事件，.native指直接监听一个原生事件



#### RouterLink在IE和Firefox中不起作用（路由不跳转）的问题

- 只用a标签，不使用button标签
- 使用button标签和Router.navigate方法







