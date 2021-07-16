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
