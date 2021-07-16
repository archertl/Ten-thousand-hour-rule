/**
 * 一个数组的元素和最大子数组，元素都是整数
 * 3.分析法
 * 子数组的和等于前j项的和减去 前i项的和 其中i < j
 * 要使得和最大 前j项的和最大，前i项的和最小且小于0
 */

function maxSubarray(arr) {
  let max = arr[0]
  let sum1 = max
  let right = 0
  for (let j = 1; j < arr.length; j++) {
    sum1 += arr[j]
    if (sum1 > max) {
      right = j
      max = sum1
    }
  }
  let min = 0
  let sum2 = 0
  for (let i = 0; i < right; i++) {
    sum2 += arr[i]
    if (sum2 < min) {
      min = sum2
    }
  }
  return max - min
}
console.log(maxSubarray([1, 2, 3, 0, -9, 2, 31, 1, 0, -3]));
