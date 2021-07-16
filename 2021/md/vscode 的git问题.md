## vscode使用git问题
本来吧问题不大，就是打开用命令git clone的项目，不会显示源代码管理，用的少也就没当回事
后面我这次要用vscode clone一个库，就一直报错
看不出是啥问题
后面在配置文件加了一行配置，指定一下git命令目录
### 查看git命令目录
```
where git
```
### 配置示例
```
"git.path": "D:\\WorkSpace\\Git\\cmd\\git.exe"
```