# 最长公共子序列（LCS）

## 题目
给定两个序列x=<x1,x2,...,xm>和y<y1,y2,...,yn>，求x和y最长的公共子序列
## 思路
动态规划：

- 如果xm = yn，则x和y的LCS为x(m-1)和y(n-1)的LCS + mx
- 如果xm != yn，则x和y的LCS为x(m)和y(n-1)子序列的LCS 和 x(m-1)和y(n)的LCS 较长的一个

从而推到出以下公式：
![2012111100085930.png](https://cdn.nlark.com/yuque/0/2020/png/2976052/1609053233027-733cb1b9-cdb0-4f1b-8a9c-23f7f7dd0deb.png#align=left&display=inline&height=181&margin=%5Bobject%20Object%5D&name=2012111100085930.png&originHeight=181&originWidth=874&size=13480&status=done&style=none&width=874)
## 计算LCS的长度
根据上述公式，我们开辟一个二维数组的空间来存储计算LCS的长度，代码如下：
```javascript
function LCSLength(x, y) {
  let m = x.length;
  let n = y.length;
  let c = [];
  for (let j = 0; j <= m; j++) {
    c.push([0])
  }
  for (let i = 1; i <= n; i++) {
    c[0].push(0)
  }
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (x[i - 1] === y[j - 1]) {
        c[i][j] = c[i - 1][j - 1] + 1
      } else {
        c[i][j] = Math.max(c[i][j - 1], c[i - 1][j])
      }
    }
  }
  return c[m][n]
}
```




