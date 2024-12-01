# Webpack

------

### 相关链接：

[webpack官网](https://webpack.js.org/)

[webpack中文网](https://www.webpackjs.com/)



### 什么是webpack？

打包工具，slogan：一切静态资源皆可打包。webpack 默认支持处理 JS 与 JSON 文件，其他类型都处理不了，必须借助 Loader 来对不同类型的文件的进行处理。



### 核心概念

1. **Entry（入口）**：指示webpack应该使用哪个模块作为构建内部依赖图的开始。进入入口起点后，webpack会找出有哪些模块和库是入口起点（直接和间接）依赖的。
2. **Output（出口）**：告诉webpack在哪里输出它所创建的结果文件，以及如何命名这些文件，默认值为`./dist`。
3. **Loader（模块转换器）**：将所有类型的文件转换为webpack能够处理的有效模块，然后你就可以利用webpack的打包能力，对它们进行处理。
4. **Plugins（插件）**：在webpack构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要做的事。
5. **Module（模块）**：开发者将程序分解成离散功能块，并称之为模块，在webpack里一个模块对应着一个文件，webpack会从配置的Entry开始递归找出所有依赖的模块。



#### 为什么要配置 contentBase ？

因为 webpack 在进行打包的时候，对静态文件的处理，例如图片，都是直接 copy 到 dist 目录下面。但是对于本地开发来说，这个过程太费时，也没有必要，所以在设置 contentBase 之后，就直接到对应的静态目录下面去读取文件，而不需对文件做任何移动，节省了时间和性能开销。



### 执行流程





### devtool配置

| devtool                      | build | rebuild       | 显示代码 | SourceMap 文件 | 描述         |
| ---------------------------- | ----- | ------------- | -------- | -------------- | ------------ |
| (none)                       | 很快  | 很快          | 无       | 无             | 无法定位错误 |
| eval                         | 快    | 很快（cache） | 编译后   | 无             | 定位到文件   |
| source-map                   | 很慢  | 很慢          | 源代码   | 有             | 定位到行列   |
| eval-source-map              | 很慢  | 一般（cache） | 编译后   | 有（dataUrl）  | 定位到行列   |
| eval-cheap-source-map        | 一般  | 快（cache）   | 编译后   | 有（dataUrl）  | 定位到行     |
| eval-cheap-module-source-map | 慢    | 快（cache）   | 源代码   | 有（dataUrl）  | 定位到行     |
| inline-source-map            | 很慢  | 很慢          | 源代码   | 有（dataUrl）  | 定位到行列   |
| hidden-source-map            | 很慢  | 很慢          | 源代码   | 有             | 无法定位错误 |
| nosource-source-map          | 很慢  | 很慢          | 源代码   | 无             | 定位到文件   |


本地开发推荐：`eval-cheap-module-source-map`，原因如下：

- 唯一的缺点，第一次build会慢点，因为eval缓存的原因，rebuild会很快
- 开发中，一般每行的代码不会太长，只需要定位到行就行了，所以加上`cheap`
- 出错后需要找到源代码的错误，而不是打包后，所以加上`module`



### 三种hash值

| 占位符      | 解释                       |
| ----------- | -------------------------- |
| ext         | 文件后缀名                 |
| name        | 文件名                     |
| path        | 文件相对路径               |
| folder      | 文件所在文件夹             |
| hash        | 每次构建生成的唯一 hash 值 |
| chunkhash   | 根据 chunk 生成 hash 值    |
| contenthash | 根据文件内容生成hash 值    |

- **hash**：任何一个文件改动，整个项目的构建hash值都会改变
- **chunkhash**：文件的改动只会影响其所在chunk的hash值
- **contenthash**：每个文件都有单独的hash值，文件的改动只会影响自身的hash值

### Webpack优化

1. 如何提高Webpack打包速度？
2. 如何减少Webpack打包体积？
3. 如何使用Webpack优化前端性能？
4. 如何提高Webpack构建速度？



### Webpack插件开发



### 优化构建速度：

- 构建费时分析：安装[speed-measure-webpack-plugin](https://github.com/stephencookdev/speed-measure-webpack-plugin)，在打包时显示每个loader和plugin花费了多少时间。
- 优化`resolve`配置
  - 配置`alias`别名
  - 配置`extensions`：如果文件不带扩展名，从左到右尝试解析，比如extensions: ['.js', '.json',  '.wasm']，高频文件名前缀放前面
  - 解析模块时应该优先搜索的目录，一般就是先到项目目录里找，找不到再到node_module里找，比如modules: [resolve('src'), 'node_modules']
- `externals`：从输出的bundle中排除依赖，一些独立的包可以这样设置，有一个比较常见的场景，通过CDN引入一个包，比如`jquery`，externals: {    jquery: 'jQuery',  }，开发的时候可以import $ from 'jquery'正常使用。针对一些不需要改动的依赖，节省打包构建的时间。
- 缩小范围，指定loader的作用目录或者需要排除的目录
  - `include`：符合条件的模块进行解析
  - `exclude`：排除符合条件的模块，不解析
  - `exclude`：优先级更高
- `noParse`：不需要解析依赖的第三方大型类库等，可以通过这个字段进行配置，提高构建速度；使用noParse进行忽略的模块文件中不会解析import、require等语法
- `IgnorePlugin`：防止在import或require调用时，生成以下正则表达式匹配的模块：
  - `requestRegExp`：匹配(test)资源请求路径的正则表达式。
  - `contextRegExp`：匹配(test)资源上下文（目录）的正则表达式。
- 多进程配置：大项目才用。小项目开启多进程打包反而会增加时间成本，因为启动进程和进程间通信都会有一定的开销。Webpack5使用[thread-loader](https://github.com/webpack-contrib/thread-loader)，之前的话是用`happypack`。
- 利用缓存
  - `babel-loader`：开启缓存，设置`cacheDirectory`属性为true
  - `cache-loader`：缓存一些性能开销比较大的loader的处理结果
  - `DLL`：将第三方库和自己的代码完全分离开，每次只打包自身代码，Webpack5启用了。



### 优化构建结果

- **构建结果分析**：借助插件[webpack-bundle-analyzer](https://github.com/stephencookdev/speed-measure-webpack-plugin)，可以看到打包后的文件大小、模块依赖关系、文件重复等问题。图形化界面，vue-cli创建的项目就有带这个。
- **压缩CSS**：借助插件[`optimize-css-assets-webpack-plugin`](https://www.npmjs.com/package/optimize-css-assets-webpack-plugin)
- **压缩JS**：webpack5内置[terser-webpack-plugin](https://www.npmjs.com/package/terser-webpack-plugin)插件，直接应用就可以了。
- **清除用不到的CSS**：[purgecss-webpack-plugin](https://www.purgecss.cn/plugins/webpack.html#用法)
- `Tree-shaking`：剔除没有使用的代码，降低包的体积。webpack 默认支持，需要在 .bablerc 里面设置 `model：false`，即可在生产环境下默认开启
- `Scope Hoisting`：作用域提升，原理是将多个模块放在同一个作用域下，并重命名防止命名冲突，**通过这种方式可以减少函数声明和内存开销**。默认支持，只支持ES6。



### 优化运行时体验

核心思路：：提升首屏加载速度，降低首屏加载文件体积，首屏不需要的文件进行预加载或按需加载，具体操作如下：

- 配置多个打包入口，多页打包
- `splitChunks`分包配置打包
- 代码懒加载
- prefetch 与 preload



### 常见面试题

1. #### Webpack配置中用过哪些Loader？都有什么作用？

- [css-loader](https://github.com/webpack-contrib/css-loader)：打包CSS。
- [style-loader](https://github.com/webpack-contrib/style-loader)：将CSS通过style标签添加到页面中，原理是创建一个style标签，将CSS扔进去。
- [postcss-loader](https://github.com/webpack-contrib/postcss-loader)：自动添加CSS3部分属性的浏览器前缀。
- [less-loader](https://github.com/webpack-contrib/less-loader)：处理less。
- [sass-loader](https://github.com/webpack-contrib/sass-loader)：处理sass，需要搭配[node-sass](https://github.com/sass/node-sass)，因为镜像问题经常安装失败，这两个包的版本要和node版本合适才可以，容易踩坑。
- [file-loader](https://github.com/webpack-contrib/file-loader)：解决图片引入问题，将图片copy指定目录，默认为dist。
- [url-loader](https://github.com/webpack-contrib/url-loader)：依赖[file-loader](https://github.com/webpack-contrib/file-loader)，当图片小于limit值时，会将图片转为base64编码，大于limit值时，依旧使用[file-loader](https://github.com/webpack-contrib/file-loader)进行copy。
- [img-loader](https://github.com/o2team/wxapp-img-loader)：压缩图片。
- [babel-loader](https://github.com/babel/babel-loader)：使用Babel加载ES2015+代码并将其转换为ES5，需要安装`@babel/core`（Babel编译的核心包）和`@babel/preset-env`（Babel编译的预设，可以理解为Babel插件的超集）

1. #### Webpack配置中用过哪些Plugin？都有什么作用？

- [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)：将js或css文件自动引入到html中。
- [clean-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin)：自动清空打包目录。
- [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)：通过CSS文件的形式引入到页面中，可以给文件设置名字、hash值。

1. #### Loader和Plugin有什么区别？

2. #### 如何编写一个Loader？介绍一下思路？

   1. 直接导出一个函数，告诉webpack最终返回的结果，接收的参数有source资源，如果只是简单的loader，只需关注输入输出就可以了
   2. 复杂一点的可以用loader-utils获取option
   3. webpack默认会有缓存，就是说文件如果没有变化，不会再次调用loader，如果要取消缓存，可以 this.cacheable；
   4. 异步同步的问题，有时候避免阻塞构建，需要使用异步的方法，this.async、someAsyncOperation
   5. 处理二进制数据

3. #### 如何编写一个Plugin？介绍一下思路？

   Webpack的插件组成：

   - 一个具名的JavaScript函数，通常写成一个class然后导出
   - 插件class上的构造器用来接收参数，apply方法执行操作
   - 选择插件触发时机：指定一个事件钩子
     - `entryOption` : 在 webpack 选项中的 `entry` 配置项 处理过之后，执行插件。
     - `afterPlugins` : 设置完初始插件之后，执行插件。
     - `compilation` : 编译创建之后，生成文件之前，执行插件。。
     - `emit` : 生成资源到 `output` 目录之前。
     - `done` : 编译完成。
   - 钩子的触发方式：
     - `tap` ：以**同步方式**触发钩子；
     - `tapAsync` ：以**异步方式**触发钩子；
     - `tapPromise` ：以**异步方式**触发钩子，返回 Promise；
   - 操作Webpack内部实例特定数据
   - 实现功能后调用Webpack提供的callback

   如果是插入到html中，可能还需要用注释在html中做标记插入的位置，然后再replace替换掉

4. #### Webpack optimize有配置过吗？可以简单说说吗？

5. #### Webpack层面如何性能优化？

6. #### Webpack打包流程是怎样的？

7. #### Webpack热更新（HMR）是如何实现的？

8. #### Webpack打包中Babel插件是如何工作的？

9. #### Webpack和Rollup有什么相同点与不同点？

10. #### Webpack5更新了哪些新特性？

- 新增资源模块（asset module）：允许使用资源文件，字体、图标等，不需要额外配置loader
  - `asset/resource` 将资源分割为单独的文件，并导出 url，类似之前的 file-loader 的功能。
  - `asset/inline` 将资源导出为 dataUrl 的形式，类似之前的 url-loader 的小于 limit 参数时功能。
  - `asset/source` 将资源导出为源码（source code）. 类似的 raw-loader 功能。
  - `asset` 会根据文件大小来选择使用哪种类型，当文件小于 8 KB（默认） 的时候会使用 asset/inline，否则会使用 asset/resource