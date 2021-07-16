# Virtual DOM实现原理

## 什么是 Virtual DOM
- 是由普通的js对象来描述DOM对象

## 为什么要使用 Virtual DOM
- MVVM框架解决视图和状态同步问题
- 模板引擎可以简化视图操作，没办法跟踪状态
- 虚拟DOM跟踪状态变化
- 虚拟DOM可以维护程序的状态，跟踪上一次的状态，通过对比前后两次状态的差异更新真实DOM
## Virtual DOM 的作用
- 维护视图和状态的关系
- 复杂视图情况下提升渲染性能
- 跨平台
  浏览器平台渲染DOM
  服务端渲染SSR(Nuxt.js/Next.js)
  原生应用（Weex/React Native)
  小程序(mpvue/uni-app)等
## 虚拟 DOM 库
- Snabbdom
- virtual-dom
### Snabbdom使用
- 创建一个项目，使用parcel打包工具，安装snabbdom
```
npm i parcel-bundler -D
npm i snabbdom
```
- 项目根目录创建index.html文件
**index.html内容**
```html
<body>
  <div id="app"></div>
</body>
<script src="./src/use.js"></script>
```
- 创建src文件夹，src文件夹中创建use.js文件
**use.js内容**
```javascript
import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
} from "snabbdom";
// init函数初始化patch，传入一个数组
// 数组里的模块为可选的，用来配置初始化patch具有的模块功能
const patch = init([
  classModule, // 类切换
  propsModule, // 属性切换
  styleModule, // 样式切换
  eventListenersModule, // 事件切换
]);

const container = document.getElementById("app");
// h函数生成虚拟dom
// 第一个参数：标签id样式名组合字符串
// 第二个参数：传递属性配置对象
// 第三个参数：传递一个数组，内部是子元素，可以是h()生成的，也可以是文本
// 这里说明不够详细，具体见下面 h函数ts声明
const vnode = h(
  "div#container.box",
  {
    props: {
      title: "哈哈哈",
    },
    on: {
      click: (e) => {
        console.log(e.target.title);
      },
    },
  },
  [
    h(
      "p",
      {
        style: { color: "red" },
      },
      "我是一个p"
    ),
    "我是一个文本",
  ]
);
// patch函数第一个参数是一个虚拟dom，也可以是一个dom元素，它会转为虚拟dom，和第二个参数对比
const last = patch(container, vnode);
```
h函数ts声明：
```typescript
export declare function h(sel: string): VNode;
export declare function h(sel: string, data: VNodeData | null): VNode;
export declare function h(sel: string, children: VNodeChildren): VNode;
export declare function h(sel: string, data: VNodeData | null, children: VNodeChildren): VNode;
```
#### patch整体分析
- 把新节点当中变化的内容渲染到真实DOM，最后返回新节点作为下一次处理的旧节点
- 对比新旧VNode是否相同节点（节点的key和sel相同）
- 如果不是相同节点，删除之前内容，重新渲染
- 如果是相同节点，再判断新的VNode是否有text，如果有并且oldVnode的text不同，直接更新文本
- 如果新的VNode有children，判断子节点是否有变化
