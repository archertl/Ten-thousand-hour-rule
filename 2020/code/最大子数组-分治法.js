/**
 * 一个数组的元素和最大子数组，元素都是整数
 */
// 2.分治法
// 将数组分成左右两个子数组，最大和子数组要么在两个子数组中，要么跨立在两个子数组上，
// 递归求两个子数组的最大和
function maxSubarray(arr, from, to) {
  if (from === undefined) {
    from = 0
  }
  if (to === undefined) {
    to = arr.length - 1
  }
  if (from === to) {
    return arr[0]
  }
  let mid = Math.floor((from + to) / 2)
  let max1 = maxSubarray(arr, from, mid)
  let max2 = maxSubarray(arr, mid + 1, to)
  let left = arr[mid]
  let maxLeft = arr[mid]
  for (let i = mid - 1; i >= from; i--) {
    left += arr[i]
    if (left > maxLeft) {
      maxLeft = left
    }
  }
  let right = arr[mid + 1]
  let maxRight = arr[mid + 1]
  for (let j = mid + 2; j <= to; j++) {
    right += arr[j]
    if (right > maxRight) {
      maxRight = right
    }
  }
  let max3 = maxLeft + maxRight
  return Math.max(max1, max2, max3)
}
console.log(maxSubarray([1, 2, 3, 0, -9, 2, 31, 1, 0, -3]));