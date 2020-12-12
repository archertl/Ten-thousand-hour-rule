/**
 * 查找旋转数组的最小值
 * 假定一个排序数组以某个未知元素作为支点做了旋转
 * 如：原数组[0,1,2,4,5,6,7]旋转后得到[4,5,6,7,0,1,2]
 * 请找出旋转后的数组的最小值，假定数组中没有重复数字
 * 思路：
 * 二分法
 * 将数组分成左右两边
 * 如果中间的值小于最右边的值，说明最小值在左边，反之在右边
 */
function findMin(arr) {
  let left = 0
  let right = arr.length - 1
  let mid
  while (left < right) {
    mid = Math.floor((left + right) / 2)
    if (arr[mid] < arr[right]) {
      right = mid
    } else if (arr[mid] > arr[right]) {
      left = mid + 1
    }
  }
  return arr[left]
}
console.log(findMin([4, 5, 6, 7, 8, 0, 1, 2]));