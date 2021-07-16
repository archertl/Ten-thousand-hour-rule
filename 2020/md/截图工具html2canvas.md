# 截图工具html2canvas



## 安装
```shell
npm i html2canvas
```
## 使用
在vue项目中的使用

- 在模板中添加两个元素
```html
<div v-if="!imgIsShow" id="toCanvasDom"></div>
<img v-else src="url">
```

- 引入插件
```html
import html2canvas from 'html2canvas'
```

- 在data中定义相关变量，在mounted中使用插件，为了防止绘制的时候图片未加载，代码写在this.$nextTick中
```javascript
data () {
  return {
    imgIsShow: false,
    url: ''
  }
},  
mounted () {
	this.$nextTick(() => {
    html2canvas(document.getElementById('toCanvasDom'),{
    	logging: true,
      useCORS: true // 解决跨域资源无法渲染问题
    }).then(canvas => {
    	const dataURL = canvas.toDataURL('image/png')
      this.url = dataURL
      this.imgIsShow = true
    })
  })
}
```
## 问题
跨域的图片资源还需要nginx配置一下代理，然后就ok了，到这感觉是一个平平无奇的需求。
但是，测试告诉我有bug，这个需求是移动端的，还给我录了屏。我看了，但是我手机上没这个问题。然后我用周围同事的手机也都试了，还是没有。但是她手机都有，问题情况就是跨域的图片截不下来。
我百思不得其解，怀疑人生。
后面偶然之中她说了一句话，她说她从官微进去就没有问题。我感觉自己跟破案一样，到处寻找蛛丝马迹。然后顿时惊醒，我去看了她使用的链接地址。果然！坑就在这里，她用的是http协议的链接。当然，在我看来是不应该出现这个问题的，nginx配置应该会配让http协议跳https协议，但是并没有配置，我一个小小前端也管不了这么多，问题也就是这样一个没有问题的问题。坑了将近一天的时间，心酸。
