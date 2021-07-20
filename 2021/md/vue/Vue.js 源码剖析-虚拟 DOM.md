## 整体分析
- vm._init
- vm.$mount
- mountComponent
- 创建Watcher对象
- updateComponent：vm._update(vm._render(),hydrating)
- vm._render
- vm._update
- vm.__patch__
- patchVnode
- updateChildren
### 执行过程
- 之前在响应式原理中分析过执行$mount就是执行mountComponent方法
- 目录在：src/core/instance/lifecycle.js
- 这里会new一个Watcher，将updateComponent传递过去
```javascript
updateComponent = () => {
  vm._update(vm._render(), hydrating)
}
```
### vm._render 方法
- 在src/core/instance/index.js中调用了renderMixin
- renderMixin在src/core/instance/render.js
- 这里定义了_render方法
- 从vm.$options取出render方法，这里就是new Vue实例传入的render方法或者template解析生成的render方法
- 会执行一下代码
```javascript
vnode = render.call(vm._renderProxy, vm.$createElement)
这里的vm.$createElement就是h函数
```
### vm.$createElement
vm.$createElement(tag, data,children, normalizeChildren)
- tag：标签名称或者组件对象
- data：描述tag，可以设置DOM的属性或者标签的属性
- children：tag中的文本内容或者子节点
#### 创建过程
- 在src/core/instance/index.js中调用了initMixin
- initMixin在src/core/instance/init.js中
- initMixin会在Vue.prototype注册_init方法
- new Vue 会执行 this._init(options)
- _init方法会调用 initRender，在src/core/instance/render.js
- initRender方法中会执行
```javascript
vm._c = (a, b, c, d) => createElement(vm, a, b, c, d, false)
vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true)
```
- vm._c 是对编译生成的render进行渲染的fang方法
- vm.$createElement是手写的render进行渲染的方法
### createElement 方法
- 目录：src/core/vdom/create-element
- createElement函数先处理参数，再调用_createElement
```typescript
function _createElement (
  context: Component,
  tag?: string | Class<Component> | Function | Object,
  data?: VNodeData,
  children?: any,
  normalizationType?: number
): VNode | Array<VNode>
```
- isDef函数判断传入的数据v满足 v !== undefined && v !== null
- 如果满足isDef(data) && isDef(data.__ob__)，或者满足isDef(data) && isDef(data.is)都返回createEmptyVNode()
- data.is是自定义component组件传入的v-bind绑定的is属性
- createEmptyVNode函数返回一个 new VNode() 实例
- 