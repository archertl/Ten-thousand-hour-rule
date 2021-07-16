/* eslint-disable */
let _Vue = null;

export default class VueRouter {
  static install(Vue) {
    /**
     * 1.判断是否安装过当前插件
     * 2.把Vue构造函数记录到全局变量
     * 3.把创建Vue实例时候传入的router对象注入到Vue实例上
     */
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
