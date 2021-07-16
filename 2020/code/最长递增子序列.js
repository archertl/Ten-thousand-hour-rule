/**
 * 最长递增子序列 LIS
 * 将问题转成LCS，将原数组排序
 * 求原数组和排序后的数组的LCS
 */
function LISLength(x) {
  let y = mergeSort(x)
  return LCSLength(x, y)
}
console.log(LISLength([1, 13, 42, 3, 2, 35, 23, 12, 23, 12, 16, 27, 29]));
// 获取LCS的最长子序列长度
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
// 归并排序
function mergeSort(arr) {
  let length = arr.length
  if (length < 2) return arr
  let mid = Math.floor(length / 2),
    left = arr.slice(0, mid),
    right = arr.slice(mid)
  return merge(mergeSort(left), mergeSort(right))
}
function merge(left, right) {
  let res = []
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      res.push(left.shift())
    } else {
      res.push(right.shift())
    }
  }
  while (left.length) res.push(left.shift())
  while (right.length) res.push(right.shift())
  return res
}