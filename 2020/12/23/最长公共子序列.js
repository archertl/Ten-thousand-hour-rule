/**
 * 最长公共子序列，LCS
 * 两个序列分别为x（m）和y(n)，x（m-1)为x（m）去掉最后一个元素m的子序列，y（n-1)为y（n）去掉最后一个元素n的子序列
 * 动态规划
 * 1.如果 m = n，则 x（m）和 y(n)的最长公共子序列为 x（m-1)和 y（n-1)的最长公共子序列 + m
 * 2.如果 m != n,则 x（m）和 y(n)的最长公共子序列为x（m-1)和 y（n)的最长公共子序列 和 x（m)和 y（n-1)的最长公共子序列 较长的一个
 */
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
console.log(LCSLength('12311276578', '134587'));