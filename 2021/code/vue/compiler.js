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
