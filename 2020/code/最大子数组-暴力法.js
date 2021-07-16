/**
 * 一个数组的元素和最大子数组，元素都是整数
 */
// 1.暴力法
function maxSubarray(arr) {
  let max = arr[0]
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      let sum = arr[i]
      for (let n = i + 1; n <= j; n++) {
        sum += arr[n]
      }
      if (sum > max) {
        max = sum
      }
    }
  }
  return max
}
console.log(maxSubarray([1, 2, 3, 0, -9, 2, 31, 1, 0, -3]));