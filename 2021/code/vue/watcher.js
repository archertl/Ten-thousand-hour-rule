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
