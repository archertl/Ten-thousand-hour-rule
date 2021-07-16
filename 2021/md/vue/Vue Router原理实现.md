# Vue Router原理实现

## 基础回顾
- 注册路由插件
```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
```
- 编写路由规则
```javascript
import Index from './Index.vue'
const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  }
]
```
- 创建路由对象
```javascript
const router = new VueRouter({
  routes
})
```
- 注册路由对象
```javascript
new Vue({
  router,
  render: h => h(app)
}).$mount('#app')
```
- 创建路由组件的占位
```html
  <router-view/>
```
- 创建路由跳转链接
```html
  <router-link to="/">Index</router-link>
```

### 动态路由
#### 路由规则path的配置
```javascript
const routes = [
  {
    path: '/detail/:id',
    name: 'Detail',
    component: () => import('../view/Detail.vue')
  }
]
```
#### 获取动态路由参数
- 方式一：通过$route.params.id
- 方式二：开启路由规则种的props传参

### 嵌套路由
路由规则中配置children，配置children里的path可以采用绝对路径也可以采用相对路径。

### 编程式导航
- 使用$router.push方法
- 使用$router.replace方法，不会被记录到历史记录中
- 使用$router.go方法，传-1就是跳转到上一个页面

### 路由模式
Hash模式和History模式
变现形式上Hash模式url地址会带一个#号
History模式需要服务端支持
原理区别：
- Hash模式是基于锚点的，以及onhashchange事件
- History模式是基于HTML5中的History APi，history.pushState和history.replaceState，其中history.pushState在IE10以后才支持
#### History模式的使用
为什么History需要服务端支持
在单页应用中，访问服务端不存在的地址，会报找不到该页面
所以服务端需配置不存在的地址返回单页应用的index.html

## 实现原理

### Hash模式
- url中#后面的内容作为路径地址
- 监听hashchange事件
- 根据当前路由地址找到对应组件重新渲染

### History模式
- 通过history.pushState方法改变地址栏
- 监听popstate事件
- 根据当前路由地址找到对应组件重新渲染

## History模式模拟实现
### 分析
VueRouter是一个类

具有静态方法install
- 判断是否安装过当前插件
- 把Vue构造函数记录到全局变量
- 利用vue混入mixin方法，在beforeCreate生命周期中，把创建Vue实例时候传入的router对象注入到原型上，调用router对象的init方法
  
构造方法
- options记录new Vue Router()传入的options
- data是一个响应式对象，data.current表示默认路由地址
- routeMap是路由地址和对应路由组件的键值对数据
  
init方法
- 创建routeMap
- 全局注册router-link、router-view组件
- 注册popstate事件，监听历史记录的变化，改变data.ccurrent的值，处理在点击浏览器回退和前进时，页面路由不切换问题

### 代码实现

```javascript
let _Vue = null;

export default class VueRouter {
  static install(Vue) {
    if (VueRouter.install.installed) {
      return;
    }
    VueRouter.install.installed = true;
    _Vue = Vue;
    _Vue.mixin({
      beforeCreate() {
        if (this.$options.router) {
          _Vue.prototype.$router = this.$options.router;
          this.$options.router.init();
        }
      },
    });
  }
  constructor(options) {
    this.options = options;
    this.data = _Vue.observable({
      current: window.location.pathname,
    }); // 响应式的对象
    this.routeMap = {}; // 解析options
  }
  init() {
    this.createRouteMap();
    this.initComponent();
    this.initEvent();
  }
  createRouteMap() {
    this.options.routes.forEach((route) => {
      this.routeMap[route.path] = route.component;
    });
  }
  initComponent() {
    const that = this;
    _Vue.component("router-link", {
      proos: {
        to: String,
      },
      render(h) {
        return h(
          "a",
          {
            attrs: {
              href: this.to,
            },
            on: {
              click: this.clickHandler,
            },
          },
          [this.$slots.default]
        );
      },
      methods: {
        clickHandler(e) {
          history.pushState({}, "", this.$attrs.to);
          this.$router.data.current = this.$attrs.to;
          e.preventDefault();
        },
      },
    });
    _Vue.component("router-view", {
      render(h) {
        return h(that.routeMap[that.data.current]);
      },
    });
  }
  initEvent() {
    window.addEventListener("popstate", () => {
      this.data.current = window.location.pathname;
    });
  }
}
```