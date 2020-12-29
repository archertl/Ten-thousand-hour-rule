# 二维码生成工具qrcode

## 安装
```shell
npm install --save qrcode
```
## 使用
在vue中使用

- template中添加，每次点开都根据传来的参数生成二维码，所以界面使用element-ui中的el-dialog组件
```html
<el-dialog
  title="二维码:"
  :visible.sync="qrIsShow"
  width="50%">
  <div id="qrcode"></div>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="qrIsShow = false">确认</el-button>
  </span>
</el-dialog>
```

- 在script中引入
```javascript
import QRCode from 'qrcode'
```

- 在methods中的函数中使用，这里需要注意，由于这个需求中的二维码是在点击后打开的dialog中显示，所以代码需要写在this.$nextTick中
```javascript
lookQR (url) {
  this.qrIsShow = true
  this.$nextTick(() => {
  	if(this.qr) {
      this.qr.clear()
      this.qr.makeCode(url)
    } else {
      this.qr = QRCode(document.getElementById("qrcode"), {
        text: url,
        width: 256,
        height: 256,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
      }) 
    }
  })
}
```
## 问题
本以为就这样成了，但是它报错了，没看懂是为啥。最后换了qrcodejs2就成了

- 安装
```shell
npm install --save qrcodejs2
```

- 修改引入
```javascript
import QRCode from 'qrcodejs2'
```
