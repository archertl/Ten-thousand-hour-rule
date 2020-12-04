/**
 * 统计一个数字在排好序的数组里出现的次数
 */
function f(arr, num) {
  let count = 0
  for(let i = 0; i < arr.length; i++) {
    if(arr[i] === num) {
      count++
    }
    if(count !== 0 && arr[i] !== num) {
      continue
    }
  }
  return count
}
console.log(f([1,2,3,3,3,3,3,5,5,5,5,6,6,6,7,7,8,9],8));