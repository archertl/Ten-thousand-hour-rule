## 响应式处理的入口
**目录：src/core/instance/init.js**
- initState(vm) vm状态的初始化
- 初始化了_data、_props、methods
**目录：src/core/instance/state.js**
```javascript
if (opts.data) {
  initData(vm)
} else {
  observe(vm._data = {}, true /* asRootData */)
}
```
### initData函数
- 先判断data是不是函数，如果是函数
```javascript
data = vm._data = data.call(vm, vm) || {}
```
- data判断是不是对象，不是对象赋值为{}，不是生产环境会打印警告
- 取data所有的key，判断props，methods中是否存在这个key，存在会打印警告。继续会判断key是否以 _ 或者 $ 开头，如果不是，将vm._data上的数据也就是data代理到vm上
- 执行observe(data, true), true代表的是根数据
### observe函数
```typescript
function observe (value: any, asRootData: ?boolean): Observer | void
```
- 先判断这里的value，如果不是对象或者 value instanceof VNode 就return
- 判断value有没有__ob__，并且value.__ob__ instanceof Observer，如果满足，则 ob = value.__ob__
- 这里留下一个问题，value.__ob__是什么时候设置上去的呢
- 然后一顿判断，再 
```javascript
ob = new Observer(value)
```
- 然后有这段代码
```javascript
if (asRootData && ob) {
  ob.vmCount++
}
- 最后返回 ob
```
- 上面这个代码目前还没看出来是做啥的，继续留个疑问
### Observer类
- 给data创建__ob__ 属性，就是Observer实例
- walk遍历对象属性，调用defineReactive
- observeArray遍历数组，将每个元素调用observe
```javascript
export class Observer {
  value: any;
  dep: Dep;
  vmCount: number; // number of vms that have this object as root $data
  constructor (value: any) {
    this.value = value
    this.dep = new Dep() // 这里创建了一个Dep
    this.vmCount = 0
    def(value, '__ob__', this) // 找到了，是在这里设置的 __ob__ 属性
    if (Array.isArray(value)) { // 判断是不是数组
      if (hasProto) {
        protoAugment(value, arrayMethods)
      } else {
        copyAugment(value, arrayMethods, arrayKeys)
      }
      this.observeArray(value) // 是数组就遍历数组，把每个元素取出来递归调用 observe函数
    } else {
      this.walk(value) // 把每个属性遍历调用 defineReactive函数
    }
  }
  walk (obj: Object) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i])
    }
  }
  observeArray (items: Array<any>) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i])
    }
  }
}
```
### defineReactive函数
- 一开始就 const dep = new Dep()
- 然后判断是不是自有属性，并且可配置，不满足就return
- 判断有没有getter和setter，有就取出来
- 这里根据参数控制是否要递归，这个key的值调用 observe函数
```javascript
let childOb = !shallow && observe(val)
```
- 然后使用 Object.defineProperty 设置 getter 和setter
- getter中会先把之前取到的getter执行一下，得到的值后续返回，之前没有getter，就直接返回 val
- 然后
```javascript
if (Dep.target) {
  dep.depend()
  if (childOb) {
    childOb.dep.depend()
    if (Array.isArray(value)) {
      dependArray(value)
    }
  }
}
```
- 这里判断Dep.target是否有值，这个值是什么时候设置的呢
- childOb 这个有值就是 val 调 observe函数的返回值 ob，
- 这里大概总结一下
- 每层data都会new 一个 Observer 实例，每个 Observer 实例会 new 一个 Dep 实例
- 如果是对象，每个属性都会设置getter和setter，也会有一个Dep 实例
- 如果是组数，会遍历每个元素调用 observe函数
- 这里先不分析 get 内部代码，当使用数据的时候才会执行
- setter 会执行defineReactive函数里的dep.notify，通知依赖更新视图
```javascript
      const value = getter ? getter.call(obj) : val
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter()
      }
      if (getter && !setter) return
      if (setter) {
        setter.call(obj, newVal)
      } else {
        val = newVal
      }
      childOb = !shallow && observe(newVal)
      dep.notify()
```
### dependArray函数
- 遍历数组元素，如果元素有 __ob__ 属性，就执行 元素.__ob__.dep.depend()
- 元素如果是数组，递归调用 dependArray 函数
### Dep类
```javascript
let uid = 0
export default class Dep {
  static target: ?Watcher; // 临时存放 Watcher 实例
  id: number;
  subs: Array<Watcher>; // 存放相关的 Watcher 实例
  constructor () {
    this.id = uid++
    this.subs = []
  }
  addSub (sub: Watcher) { // 添加 Watcher 实例
    this.subs.push(sub)
  }
  removeSub (sub: Watcher) { // 移除 Watcher 实例
    remove(this.subs, sub)
  }
  depend () { // 把 Dep 实例添加到 Watcher 实例上，目前作用不明
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }
  notify () { // 通知所有 Watcher 实例 数据更新了
    const subs = this.subs.slice()
    if (process.env.NODE_ENV !== 'production' && !config.async) {
      subs.sort((a, b) => a.id - b.id)
    }
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}
```
- 代码目前到这里走到头了
- 这些都是初始化data做的一些事情
- 然后我们会调用$mount方法
## $mount方法
- 会执行 mountComponent 
- 目录：/core/instance/lifecycle.js
- 这个方法里会执行很多别的代码，这里先不看了
- 在这里 new Watcher 实例
### Watcher类
- new Watcher 会执行 this.get()
- get 方法里 执行 pushTarget(this)
- pushTarget所在代码如下：
```javascript
Dep.target = null
const targetStack = []
export function pushTarget (target: ?Watcher) {
  targetStack.push(target)
  Dep.target = target
}
export function popTarget () {
  targetStack.pop()
  Dep.target = targetStack[targetStack.length - 1]
}
```
- 会将当前的 Watcher 实例存放在 Dep.target 上
- 最终会调用 popTarget 方法
## $set
给对象设置一个响应式属性或者通过下标改变数组元素
### 定义位置
- Vue.set：src/core/global-api/index.js
- vm.$set：src/core/instance/index.js
上面两个方法都是同一个方法，都是目录 src/core/observer/index.js 导出的 set 方法
### set 方法
- 如果是数组，执行以下代码
```javascript
target.length = Math.max(target.length, key)
target.splice(key, 1, val)
```
- 然后继续处理对象的情况
- 获取ob也就是target.__ob__
- 如果不存在，也就是说明target不是响应式的，那就不管了，返回target[key]
- 如果存在，执行以下代码：
```javascript
defineReactive(ob.value, key, val)
ob.dep.notify()
return val
```
- 将传入的值使用defineReactive处理一下，具备响应式
- 调用ob.dep.notify()通知视图更新
## $delete
删除对象属性，如果对象是响应式的，确保删除能触发更新视图。这个方法主要用于避开Vue不能检测到属性被删除，但是很少会被用到。既可以删除对象上的属性，也可以通过下标删除数组的元素。
注意：目标对象不能是一个Vue实例或者Vue实例的根数据对象。
```javascript
vm.$delete(vm.obj, 'msg')
vm.$delete(vm.arr, 0)
```
### 定义位置
- Vue.delete：src/core/global-api/index.js
- vm.$delete：src/core/instance/index.js
上面两个方法都是同一个方法，都是目录 src/core/observer/index.js 导出的 del 方法
### del 方法
- 和set 方法类似
- 如果是数组，调用数组的splice方法
- 如果是对象，获取ob也就是target.__ob__
- 对象上没有该属性，直接返回
- 删除属性
- 判断是否有ob，没有直接返回
- 有ob，调用ob.dep.notify()
## $watch
vm.$watch(expOrFn, cb, [options])
### 功能
- 观察Vue实例变化的一个表达式或者计算属性函数
- 回调函数得到的参数为新值和旧值
- 表达式只接受监督的键路径
- 对于更复杂的表达式，用一个函数取代
### 参数
- expOrFn：要监视的$data中的属性，可以是表达式或者函数
- cb：数据变化后要执行的函数。值是函数就是回调函数，也可以是函数数组。值是对象具有handler属性，handler是函数就是回调函数，也可以是函数数组，是字符串则需要在methods中有相应的定义。
- options：可选项。deep：布尔值，表示是否深度监听。immediate：布尔值，是否立即执行一次。
### 三种类型的Watcher
没有静态方法，分为：
- 计算属性Watcher
- 用户Watcher
- 渲染Watcher
都是vm.$watch，目录：src/core/instance/state.js
创建顺序：
- 计算属性Watcher
- 用户Watcher
- 渲染Watcher
## $nextTick
在下次DOM更新之后执行传入的回调函数
### 定义位置
src/core/instance/render.js
调用$nextTick会调用 nextTick 函数，是 src/core/util/next-tick.js 导出的 nextTick 函数
### nextTick 函数
代码如下：
```javascript
let pending = false
export function nextTick (cb?: Function, ctx?: Object) {
  let _resolve
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  if (!pending) {
    pending = true
    timerFunc()
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}
```
- _resolve在最后定义的，用来控制nextTick返回的Promise成功
- callbacks中存放一个个函数
- 函数中，如果cb存在就try catch执行一下函数把ctx传入
- 如果没有cb不存在，会nextTick返回的Promise成功，将ctx传入
- timerFunc函数是根据浏览器是否兼容Promise、MutationObserver、setImmediate做降级处理
- 执行timerFunc函数就是，先将pending置为false，遍历callbacks执行每一个函数，并清空callbacks