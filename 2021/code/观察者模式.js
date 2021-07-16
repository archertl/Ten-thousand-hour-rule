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
