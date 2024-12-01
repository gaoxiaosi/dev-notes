# 从0开始架构一个Vue项目？（让你独立开发一个vue项目）

------

### 思路：

考查实战能力，分类有条理回答即可，尽可能具体，比如说引入必要插件可以列举一下有哪些插件

### 回答：

1. 脚手架的选择。一般会使用官方的脚手架去搭建项目，如果是`Vue3`，我会考虑用[Vite](https://cn.vitejs.dev/guide/)或[create-vue（未来替代vue-cli，基于Vite的，Vue团队想用Vite替代webpack的野心昭然若揭）](https://github.com/vuejs/create-vue)去搭建项目（不用讲`Webpack`配置之类的，问到再说，站在整体的角度去说就行了）
2. 创建目录结构：
   - **view**：页面
   - **components**：组件库
   - **api**：api公共请求方法和所有的api
   - **router**：路由
   - **store**：状态管理，vuex/pinia
   - **build**：打包或者构建项目时需要的配置和文件
   - **assets**：静态资源如图片、iconfont图标库等
   - **utils**：工具方法
   - **hooks**：Vue3的话可能还会有hooks目录，放置自定义的hooks
3. 引入插件
   - 官方插件：[vue-router](https://cn.vitejs.dev/guide/)、[vuex](https://vuex.vuejs.org/zh/)/[pinia](https://pinia.vuejs.org/introduction.html)
   - 第三方插件：[VueUse](https://vueuse.org/)（Vue3的hook库，Vue的核心人员开发的）、axios、[elementui](https://element.eleme.cn/#/zh-CN)/[element-plus](https://element-plus.org/zh-CN/#/zh-CN)、[antd-vue](https://www.antdv.com/components/overview)
4. 制定代码规范，结合prettier和eslint使用，我用eslint比较多
5. 制定提交规范，结合husky和lint-staged等工具进行提交前的代码检查

