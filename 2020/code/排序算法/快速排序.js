// function quickSort(arr) {
//   if(arr.length < 2) return arr
//   let baseValue = arr[0]
//   let left = []
//   let right = []
//   for(let i = 1; i < arr.length; i++) {
//     if(arr[i] > baseValue) {
//       right.push(arr[i])
//     } else {
//       left.push(arr[i])
//     }
//   }
//   return quickSort(left).concat([baseValue], quickSort(right))
// }
function sort(arr, left, right) {
  if(left >= right) return
  let i = left
  let j = right
  let baseIndex = i
  while(i < j) {
    while(arr[j] >= arr[baseIndex] && j > baseIndex) {
      j--
    }
    if(i >= j) break;
    while(arr[i] <= arr[baseIndex] && i < j) {
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
  sort(arr,0,arr.length - 1)
  return arr
}

console.log(quickSort([1, 88, 2, 334, 323, 19, 30, 30, 20, 377, 26, 3, 3423, 3]))