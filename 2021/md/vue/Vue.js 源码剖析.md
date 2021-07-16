## 准备工作
### Vue源码获取
- 项目地址：https://github.com/vuejs/vue
- Fork一份到自己仓库，克隆到本地，可以写注释提交github
### 源码目录结构
```
src
  - compiler  编译相关
  - core  Vue 核心相关
  - platforms  平台相关
  - server  SSR 服务端渲染
  - sfc  .vue 文件编译为js对象
  - shared  公共代码
```
### 了解Flow
- 官网： https://flow.org
- javascript 的静态类型检查器
- Flow 的静态类型检查错误是通过静态类型推断实现的
- 文件开头通过 // @flow 或者 /* @flow */ 声明
## 调式设置
### 打包工具rollup
- Vue.js 源码的打包工具使用的是 Rollup，比 Webpack 轻量
- Webpack 把所有文件当作模块，Rollup 只处理js文件，更适合在 Vue.js 这样的库中使用
- Rollup 打包不会生成冗余的代码
### 安装依赖
```
npm i
```
### 设置sourcemap
sourcemap：代码地图，会记录打包后的代码原来的位置
在package.json文件中的dev脚本中添加参数 --sourcemap
```
"dev": "rollup -w -c scripts/config.js --sourcemap --environment TARGET:web-full-dev",
```
### 执行dev
- npm run dev
## Vue 的不同构建版本
构建不同版本
```
npm run build
```
### 一些术语解释
- 完整版：同时包含编译器和运行时的版本
- 编译器：用来将模板字符串编译成为JavaScript渲染函数的代码，体积大，效率低
- 运行时：用来创建Vue实例、渲染并处理虚拟DOM等代码，体积小，效率高。基本上就是除去编译器的代码。
- UMD：UMD版本是通用的模块版本，支持多种模块方式。Vue.js默认文件就是运行时+编译器的UMD版本
- CommonHJS（cjs）：CommonJS版本用来配合老的打包工具
- ES Module：从2.6开始Vue会提供两个ES Modules（ESM）构建文件，为现代打包工具提供的版本。ESM格式被设计为可以被静态分析，所以打包工具可以利用这一点进行 tree-shaking 将用不到的代码排除最终的包
### runtime版本
不会编译template版本
将template的模板改为render函数写法
render函数可以接收到一个参数，参数是一个h函数，render函数要返回执行后的h函数
h函数就是创建虚拟dom的
### 查看Vue CLI创建的项目webpack配置
将配置输出到output.js，这里的配置不可直接复制使用
```
vue inspect > output.js
```
可以看出来Vue CLI创建的项目私是使用的vue.runtime.esm.js版本
## 开始读源码吧
### 找入口
在package.json文件中找到
"dev": "rollup -w -c scripts/config.js --sourcemap --environment TARGET:web-full-dev"
可以判断出打包文件的路径为：scripts/config.js
根据web-full-dev参数在scripts/config.js文件找到如下代码：
```javascript
  // Runtime+compiler development build (Browser)
  'web-full-dev': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.js'),
    format: 'umd',
    env: 'development',
    alias: { he: './entity-decoder' },
    banner
  }
```
咱们这就找到了入口
再看看resolve函数
```javascript
const aliases = require('./alias')
const resolve = p => {
  const base = p.split('/')[0]
  if (aliases[base]) {
    return path.resolve(aliases[base], p.slice(base.length + 1))
  } else {
    return path.resolve(__dirname, '../', p)
  }
}
```
alias.js
```javascript
const path = require('path')
const resolve = p => path.resolve(__dirname, '../', p)
module.exports = {
  vue: resolve('src/platforms/web/entry-runtime-with-compiler'),
  compiler: resolve('src/compiler'),
  core: resolve('src/core'),
  shared: resolve('src/shared'),
  web: resolve('src/platforms/web'),
  weex: resolve('src/platforms/weex'),
  server: resolve('src/server'),
  sfc: resolve('src/sfc')
}
```
这就可以得出entry为
```javascript
path.resolve(resolve('src/platforms/web'), '/entry-runtime-with-compiler.js')
```
就找到了这个文件
先看看Vue.prototype.$mount函数
先处理了el
然后判断options.render是否存在，如果没值，才会处理options.template
也就是说如果options.render和options.template同时存在，只会取options.render
阅读记录：
- el不能时body或者html标签
- 如果没有render，会把template转换成render
- 如果有render，直接调用mount挂载DOM
### 找Vue
**目录：src/platforms/web/entry-runtime-with-compiler.js**
- web平台相关的入口
- 重写了平台相关的$mount方法
- 注册了Vue.compile方法，传递一个HTML字符串返回render函数
**目录：src/platforms/web/runtime/index.js**
- 平台相关
- 注册和平台相关的全局指令：v-model、v-show
- 注册和平台相关的全局组件：Transition、TransitionGroup
- 定义全局方法：
  __pathch__：把虚拟DOM转换成真实DOM
  $mount：挂载方法
**目录：src/core/index.js**
- 与平台无关
- 设置了Vue的静态方法，initGlobalAPI(Vue)
**目录：src/core/instance/index.js**
- 与平台无关
- 定义了构造函数，调用了this._init(options)
- 给Vue中混入了常用的实例成员