/**
 * 零子数组
 * 求长度为n的数组a，子数组的和最接近于0的子数组
 * 思路
 * 1.申请相同长度空间的数组sum，sum[i]为a数组的前i项和
 * 2.将数组sum排序
 * 3.计算相邻元素的差，记录最小差为min1
 * 4.计算sum每个元素的绝对值最小值，记录为min2
 * 5.min1和min2中最小值即为所求
 */
// 排序用快速排序
function sort(arr, left, right) {
  if (left >= right) return
  let i = left
  let j = right
  let baseIndex = i
  while (i < j) {
    while (arr[j] >= arr[baseIndex] && j > baseIndex) {
      j--
    }
    if (i >= j) break;
    while (arr[i] <= arr[baseIndex] && i < j) {
      i++
    }
    let temp = arr[baseIndex];
    arr[baseIndex] = arr[j];
    arr[j] = arr[i];
    arr[i] = temp
    baseIndex = i;
  }
  sort(arr, left, baseIndex - 1)
  sort(arr, baseIndex + 1, right)
}
function quickSort(arr) {
  sort(arr, 0, arr.length - 1)
  return arr
}
function fn(arr) {
  let sum = [arr[0]]
  for (let i = 1; i < arr.length; i++) {
    sum[i] = sum[i - 1] + arr[i]
  }
  console.log(sum);
  sum = quickSort(sum)
  console.log(sum);
  let min1 = sum[1] - sum[0]
  let min2 = sum[0] < 0 ? (-sum[0]) : sum[0]
  for (let j = 1; j < sum.length; j++) {
    if ((sum[j] - sum[j - 1]) < min1) {
      min1 = sum[j] - sum[j - 1]
    }
    min2 = sum[j] < 0 ? (-sum[j]) : sum[j]
  }
  return min1 < min2 ? min1 : min2
}
console.log(fn([1, 5, -6, 3, -10, 3 - 10, 20, -4, 22, 2, 23, 3, 1, -20]));