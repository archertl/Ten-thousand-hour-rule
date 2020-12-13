/**
 * 一个数组的元素和最大子数组，元素都是整数
 * 4.动态规划
 * 计算前i项和的时候，如果前i-1项和大于0，继续累加，如果前i-1项的和小于0，则从当前项重新开始累加，记录最大值
 */

function maxSubarray(arr) {
  let max = arr[0]
  let current = arr[0]
  for (let i = 1; i < arr.length; i++) {
    current = current > 0 ? (current + arr[i]) : arr[i]
    if (current > max) {
      max = current
    }
  }
  return max
}
console.log(maxSubarray([1, 2, 3, 0, -9, 2, 31, 1, 0, -3]));
