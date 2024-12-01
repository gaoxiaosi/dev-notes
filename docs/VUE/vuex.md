# Vuex

------

![](https://pic-host.oss-cn-shenzhen.aliyuncs.com/img/20220506020316.png)

### 定义：

Vuex是一个专为Vue.js应用程序开发的`状态管理模式`。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。Vuex是`单向数据流`，数据只能通过Vuex的Mutation的方法进行修改，不能直接在组件中直接修改。



### 核心流程中的主要功能：

- Vue Components 是 vue 组件，组件会触发（dispatch）一些事件或动作，也就是图中的 Actions;

- 在组件中发出的动作，肯定是想获取或者改变数据的，但是在 vuex 中，数据是集中管理的，不能直接去更改数据，所以会把这个动作提交（Commit）到 Mutations 中;

- 然后 Mutations 就去改变（Mutate）State 中的数据;

- 当 State 中的数据被改变之后，就会重新渲染（Render）到 Vue Components 中去，组件展示更新后的数据，完成一个流程。

  

### 各模块在核心流程中的主要功能：

- `Vue Components`∶ Vue组件。HTML页面上，负责接收用户操作等交互行为，执行dispatch方法触发对应action进行回应。
- `dispatch`∶操作行为触发方法，是唯一能执行action的方法。
- `actions`∶ 操作行为处理模块。负责处理Vue Components接收到的所有交互行为。包含同步/异步操作，支持多个同名方法，按照注册的顺序依次触发。向后台API请求的操作就在这个模块中进行，包括触发其他action以及提交mutation的操作。该模块提供了Promise的封装，以支持action的链式触发。
- `commit`∶状态改变提交操作方法。对mutation进行提交，是唯一能执行mutation的方法。
- `mutations`∶状态改变操作方法。是Vuex修改state的唯一推荐方法，其他修改方式在严格模式下将会报错。该方法只能进行同步操作，且方法名只能全局唯一。操作之中会有一些hook暴露出来，以进行state的监控等。
- `state`∶ 页面状态管理容器对象。集中存储Vuecomponents中data对象的零散数据，全局唯一，以进行统一的状态管理。页面显示所需的数据从该对象中进行读取，利用Vue的细粒度数据响应机制来进行高效的状态更新。
- `getters`∶ state对象读取方法。图中没有单独列出该模块，应该被包含在了render中，Vue Components通过该方法读取全局state对象。



### 属性：

`State`：存放数据，类似组件中的data。

`Getters`：类似组件中的computed。

`Mutations`：类似组件的methods，mutation都是同步的。

`Actions`：提交mutations，不是直接变更状态，通常是异步的比较多。

`Modules`：把以上4个属性再细分，让仓库更好管理。



### 持久化存储：

Vuex本身不是持久化存储，因为store里的数据是保存在运行内存中，当刷新页面后store里的数据又会赋值为原始值。可使用一些插件，比如[vuex-persistedstate](https://github.com/robinvdvleuten/vuex-persistedstate)、[vuex-presist](https://github.com/championswimmer/vuex-persist)，原理都是使用浏览器的localStorage或sessionStorage存储Vuex数据。



### pinia

如果是Vue3的新项目，全部都是基于setup的写法，建议使用新的工具pinia。



vuex的缺点：

- ts支持较差
- 命名空间有缺陷



pinia的优点：

- ts支持好
- 舍弃了命名空间
- 不用再区分action看和mutation，只有action
- 修改状态可以直接修改，也可以在action里改
- 更小巧轻量
- 可以创建多个store，每个store都是一个reactive对象



### Redux 和 Vuex 有什么区别，它们的共同思想

**（1）Redux 和 Vuex区别**

- Vuex改进了Redux中的Action和Reducer函数，以mutations变化函数取代Reducer，无需switch，只需在对应的mutation函数里改变state值即可
- Vuex由于Vue自动重新渲染的特性，无需订阅重新渲染函数，只要生成新的State即可
- Vuex数据流的顺序是∶View调用store.commit提交对应的请求到Store中对应的mutation函数->store改变（vue检测到数据变化自动渲染）

通俗点理解就是，vuex 弱化 dispatch，通过commit进行 store状态的一次更变;取消了action概念，不必传入特定的 action形式进行指定变更;弱化reducer，基于commit参数直接对数据进行转变，使得框架更加简易;

**（2）共同思想**

- 单—的数据源
- 变化可以预测

本质上：redux与vuex都是对mvvm思想的服务，将数据从视图中抽离的一种方案; 形式上：vuex借鉴了redux，将store作为全局的数据中心，进行mode管理;



#### ajax请求代码应该写在组件的methods中还是vuex的actions中

如果仅在一个组件内使用，没必要放到vuex的state中。

如果多个地方复用，可以将请求放到action中。



#### 从vuex中获取的数据能直接更改吗？

不能直接更改，需要浅拷贝对象之后更改，否则报错；



#### Vuex的严格模式是什么,有什么作用,怎么开启？

在严格模式下，无论何时发生了状态变更且不是由mutation函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到。



#### mutation和action有什么区别

- action 提交的是 mutation，而不是直接变更状态。mutation可以直接变更状态
- action 可以包含任意异步操作。mutation只能是同步操作
- 提交方式不同



#### 在v-model上怎么用Vuex中state的值？

需要通过computed计算属性来转换。

```vue
<input v-model="message">
computed: {
    message: {
        get () {
            return this.$store.state.message
        },
        set (value) {
            this.$store.commit('updateMessage', value)
        }
    }
}
```

