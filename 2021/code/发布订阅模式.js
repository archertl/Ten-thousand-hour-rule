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
