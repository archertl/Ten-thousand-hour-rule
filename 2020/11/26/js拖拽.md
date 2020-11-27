# js实现拖拽

## mousedown、mousemove和mouseup

通过三个事件实现拖拽
- onmousedown：鼠标按下事件
- onmousemove：鼠标移动事件
- onmouseup：鼠标抬起事件
### 实现思路
- 定义状态 鼠标按下后状态为1，鼠标抬起后状态为0
- 鼠标按下需要记录按下时鼠标位置，记录的是鼠标到盒子到左边的距离和到上边的距离，为了通过控制元素定位的样式来移动元素位置
- 鼠标在元素上移动，状态为1时，需要根据当前鼠标位置和记录按下时的鼠标位置差改变元素位置，状态为0不需要做改变元素位置
- 处理元素移动范围

### 代码
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    html,
    body {
      margin: 0;
      padding: 0;
    }

    #box {
      width: 100px;
      height: 100px;
      background-color: indianred;
      position: absolute;
      top: 0;
      left: 0;
      cursor: move;
    }
  </style>
</head>

<body>
  <div id="box"></div>
</body>
<script>
  class DropDom {
    constructor(dom) {
      this.dom = dom
      this.type = 0 // 定义初始状态
      this.dx = 0 // 按下时到元素左边的距离
      this.dy = 0 // 按下时到元素上边的距离
      this.height = this.dom.offsetHeight
      this.width = this.dom.offsetWidth
      this.setMousedown()
      this.setmousemove()
      this.setMouseup()
    }
    // 鼠标按下事件注册给元素，鼠标移动和抬起事件注册给document，这样处理可以处理拖拽速度过快和鼠标移出视口时的效果，具体区别可以自己测试
    setMousedown() { // 注册鼠标按下事件，记录按下时的位置,改变状态
      this.dom.addEventListener('mousedown', e => {
        this.type = 1
        this.dx = e.clientX - this.dom.offsetLeft
        this.dy = e.clientY - this.dom.offsetTop
      })
    }

    setmousemove() { // 注册鼠标移动事件，根据状态判断是否移动元素
      document.addEventListener('mousemove', e => {
        if (this.type === 1) {
          // 元素在移动时，鼠标相对元素的距离是不会变的，元素的left就是鼠标的位置减去按下时到元素左边的距离，top同理
          let left = e.clientX - this.dx
          let top = e.clientY - this.dy
          // 计算left和top的范围，这里定义元素不能超过显示区域
          left = Math.min(left, window.innerWidth - this.width)
          top = Math.min(top, window.innerHeight - this.height)
          left = Math.max(left, 0)
          top = Math.max(top, 0)
          this.dom.style.left = left + 'px'
          this.dom.style.top = top + 'px'
        }

      })
    }
    setMouseup() { // 注册鼠标抬起事件，改变状态
      document.addEventListener('mouseup', () => {
        this.type = 0
      })
    }
  }
  document.getElementById('box').addEventListener
  new DropDom(document.getElementById('box'))
</script>

</html>
```

## 元素拖拽drag与拖放drop
HTML5支持元素拖拽与拖放，要在元素标签上添加一个属性
```html
<div id="box" draggable="true"></div>
```
### 拖拽元素事件
- dragstart：拖拽开始
- drag：拖拽进行中
- dragend：拖拽结束
```javascript
let box = document.getElementById('box');
box.addEventListener('dragstart', e => {
  console.log('拖拽开始');
})
box.addEventListener('drag', () => {
  console.log('拖拽中');
})
box.addEventListener('dragend', () => {
  console.log('拖拽结束');
})
```
  
### 目标元素
拖拽元素到目标元素上时，会触发目标元素的事件
- dragenter：刚拖拽到目标元素上
- dragover：在目标元素上拖拽持续触发该事件
- dragleave：拖拽离开目标元素
- drop：拖拽到目标元素上放开
```javascript
let current = document.getElementById('target')
current.addEventListener('dragenter', () => {
  console.log('拖拽到目标target上');
})
current.addEventListener('dragover', e => {
  console.log('在目标target上持续拖拽');
})
current.addEventListener('dragleave', () => {
  console.log('拖拽离开目标target');
})
current.addEventListener('drop', e => {
  console.log('拖拽到目标target上放开');
})
```

### 实现拖拽元素放到目标元素里
在目标元素的drop事件中添加拖拽元素
```javascript
current.addEventListener('drop', e => {
  console.log('拖拽到目标target上放开');
  e.target.appendChild(box);
})
```
### 拖拽设置
dropEffect属性

属性值：
- none 不能把元素拖放至此（除文本框外全部元素的默认值）
- move 移动到目标
- copy 复制到目标
- link 目标打开拖动元素（拖动元素必须是链接并有URL）
  
effectAllowed属性

属性值：
- uninitialized 没有设置任何拖放行为
- none 不能由任何行为
- copy 仅允许dropEffect值为copy
- link 仅允许dropEffect值为link
- move 仅允许dropEffect值为move
- copyLink 允许dropEffect值为copy和link
- copyMove 允许dropEffect值为copy和move
- linkMove 允许dropEffect值为link和move
- all 允许任意dropEffect