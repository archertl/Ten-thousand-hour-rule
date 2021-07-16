# 模拟 Vue.js 响应式原理

## 预备知识

### 数据驱动
- 数据响应式
  数据模型是JavaScript对象，当修改数据时，视图会自动更新
- 双向绑定
  数据改变，视图改变。视图改变，数据也改变
- 数据驱动是Vue最独特的特性之一
  在开发过程中只需要关注数据本事，不需要关系视图是如何更新渲染的

### 响应式的核心原理
#### Vue2.x
把一个普通的对象传入Vue实例作为data选项，Vue遍历该对象所有属性，使用Object.defineProperty把这些属性全部转化为getter/setter。Object.defineProperty是一个es5中无法实现的特性，这就是Vue不支持IE8以及低版本的原因
##### Object.defineProperty基本使用
```html
<body>
  <div id="app">hello</div>
</body>
<script>
  const data = {
    msg: 'hello'
  }
  const vm = {}
  Object.defineProperty(vm, 'msg', {
    enumerable: true,// 是否可枚举
    configurable: true, // 是否可delete删除，是否可通过defineProperty重新定义
    get() {
      console.log('get', data.msg);
      return data.msg
    },
    set(newValue) {
      console.log('set', newValue);
      if (newValue === data.msg) return
      data.msg = newValue
      document.getElementById('app').textContent = data.msg

    }
  })
  console.log(vm.msg);
  vm.msg = 'hello world'
  console.log(vm.msg);
</script>
```
#### Vue3.x
运用Proxy，在ES6中新增
直接监听对象
基本使用
```html
<body>
  <div id="app">hello</div>
</body>
<script>
  const data = {
    msg: 'hello',
    age: 18
  }
  const vm = new Proxy(data, {
    get(target, key) {
      console.log('get ', key, target[key]);
      return target[key]
    },
    set(target, key, newValue) {
      console.log('set ', key, newValue);
      if (newValue === target[key]) return
      target[key] = newValue
      document.getElementById('app').textContent = target[key]
    }
  })
  console.log(vm.msg, vm.age);
  vm.msg = 'hello world'
  vm.age = 26
  console.log(vm.msg, vm.age);
</script>
```

### 发布订阅模式
假设有一个平台，发布者可以发布信息，订阅者可以订阅信息发布的事件

代码实现
```javascript
class EventEmitter {
  constructor() {
    this.subs = Object.create(null);
  }
  $on(eventType, handler) {
    if (this.subs[eventType]) {
      this.subs[eventType].push(handler);
    } else {
      this.subs[eventType] = [handler];
    }
  }
  $emit(eventType, args) {
    if (this.subs[eventType]) {
      this.subs[eventType].forEach((handler) => {
        handler(args);
      });
    }
  }
}

const vm = new EventEmitter();

vm.$on("click", (msg) => {
  console.log("click事件触发了", "参数是：" + msg);
});
vm.$emit("click", 123);
```
### 观察者模式
当被观察者的状态改变的时候，会自动通知所有观察者，执行观察者的update函数

代码实现
```javascript
class Dep {
  constructor() {
    this.subs = [];
  }
  add(sub) {
    this.subs.push(sub);
  }
  notify() {
    this.subs.forEach((sub) => {
      sub.update();
    });
  }
}

class Watcher {
  update() {
    console.log("update");
  }
}

const dep = new Dep();
const watcher = new Watcher();
dep.add(watcher);
dep.notify();
```
## Vue响应式原理模拟
功能
- 接收初始化参数
- 把data中的数据注入到Vue实例，转换成getter/setter
- 调用observer监听data中所有属性的变化
- 调用compiler解析指令/差值表达式
### html代码
```html
<body>
  <div id="app">
    <h1>{{msg}}</h1>
    <h1>v-text</h1>
    <p v-text="msg"></p>
    <h1>v-model</h1>
    <input type="text" v-model="msg">
  </div>
</body>

<script src="./dep.js"></script>
<script src="./watcher.js"></script>
<script src="./observer.js"></script>
<script src="./compiler.js"></script>
<script src="./vue.js"></script>
<script>
  const vm = new Vue({
    el: '#app',
    data: {
      msg: 'hello',
    }
  })
  console.log(vm);
</script>
```
### vue.js代码
- 把data中的数据注入到Vue实例，转换成getter/setter
```javascript
class Vue {
  constructor(options) {
    this.$options = options || {};
    this.$data = options.data || {};
    this.$el =
      typeof options.el === "string"
        ? document.querySelector(options.el)
        : options.el;
    this._proxyData(this.$data);
    new Observer(this.$data);
    new Compiler(this);
  }
  _proxyData(data) {
    for (const key in data) {
      Object.defineProperty(this, key, {
        get() {
          return data[key];
        },
        set(newValue) {
          if (newValue === data[key]) return;
          data[key] = newValue;
        },
      });
    }
  }
}
```
### observer.js代码
- 把data中的数据转换成响应式数据
- 如果data中的某个属性也是对象，也转成响应式
- 数据变化可以通知
```javascript
class Observer {
  constructor(data) {
    this.walk(data);
  }
  walk(data) {
    if (!data || typeof data !== "object") return;
    for (const key in data) {
      this.defineReactive(data, key, data[key]);
    }
  }
  defineReactive(obj, key, val) {
    const that = this;
    this.walk(val);
    const dep = new Dep();
    Object.defineProperty(obj, key, {
      get() {
        // 收集watcher
        Dep.target && dep.addSub(Dep.target);
        return val;
      },
      set(newValue) {
        if (newValue === val) return;
        val = newValue;
        // 通知数据更新了
        dep.notify();
        that.walk(newValue);
      },
    });
  }
}
```
### compiler.js代码
- 编译模板，解析指令和插值表达式
- 负责页面首次渲染
- 创建watcher
```javascript
const textNodeReg = /\{\{(.+?)\}\}/g;
class Compiler {
  constructor(vm) {
    this.el = vm.$el;
    this.vm = vm;
    this.compile(this.el);
  }
  //编译模板，处理节点
  compile(el) {
    const childNodes = el.childNodes || [];
    Array.from(childNodes).forEach((node) => {
      if (this.isTextNode(node)) {
        this.compilerText(node);
      } else if (this.isElementNode(node)) {
        this.compileElement(node);
        this.compile(node);
      }
    });
  }
  // 编译元素节点
  compileElement(node) {
    Array.from(node.attributes).forEach((attr) => {
      const attrName = attr.name;
      if (this.isDirective(attrName)) {
        this.update(node, attr.value, attrName.substr(2));
      }
    });
  }
  update(node, key, directive) {
    const updateFn = this[directive + "Updater"];
    updateFn && updateFn.call(this, node, this.vm[key], key);
  }
  textUpdater(node, value, key) {
    node.textContent = value;
    // 创建watcher
    new Watcher(this.vm, key, (newValue) => {
      node.textContent = newValue;
    });
  }
  modelUpdater(node, value, key) {
    node.value = value;
    node.addEventListener("input", () => {
      this.vm[key] = node.value;
    });
    // 创建watcher
    new Watcher(this.vm, key, (newValue) => {
      node.value = newValue;
    });
  }
  // 编译文本节点
  compilerText(node) {
    const value = node.textContent;
    if (textNodeReg.test(value)) {
      const key = RegExp.$1.trim();
      node.textContent = value.replace(textNodeReg, this.vm[key]);
      // 创建watcher
      new Watcher(this.vm, key, (newValue) => {
        node.textContent = value.replace(textNodeReg, newValue);
      });
    }
  }
  // 判断属性是否是指令
  isDirective(attrName) {
    return attrName.startsWith("v-");
  }
  // 判断节点是否是文本节点
  isTextNode(node) {
    return node.nodeType === 3;
  }
  // 判断节点是否是元素节点
  isElementNode(node) {
    return node.nodeType === 1;
  }
}
```
### dep.js代码
```javascript
class Dep {
  constructor() {
    this.subs = [];
  }
  // 添加观察者
  addSub(sub) {
    if (sub && sub.update) {
      this.subs.push(sub);
    }
  }
  // 通知观察者数据变了
  notify() {
    this.subs.forEach((sub) => {
      sub.update();
    });
  }
}
```
### watcher代码
```javascript
class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm;
    this.key = key;
    this.cb = cb;
    // 在创建watcher时，将watcher暂存在Dep.target上
    Dep.target = this;
    // 保存老数据，触发getter，触发dep添加观察者
    this.oldValue = this.vm[key];
    Dep.target = null;
  }
  // 执行cb，触发更新
  update() {
    const newValue = this.vm[this.key];
    if (this.oldValue !== newValue) {
      this.cb(newValue);
    }
  }
}
```