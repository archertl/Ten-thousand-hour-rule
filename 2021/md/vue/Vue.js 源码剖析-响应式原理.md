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
然后有这段代码
```javascript
if (asRootData && ob) {
  ob.vmCount++
}
- 最后返回 ob
```
- 上面这个代码目前还没看出来是做啥的，继续留个疑问
### Observer构造函数
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