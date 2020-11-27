function sort(arr) {
  let count = arr.length - 1
  for (let i = 0; i < count; i++) {
    for (let j = 0; j < count - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let item = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = item
      } i
    }
  }
  return arr
}
console.log(sort([1, 88, 2, 334, 323, 19, 30, 30, 20, 377, 26, 3, 3423, 3]));
// 改进版本
function sort2(arr) {
  let count = arr.length - 1
  while (count > 0) {
    let pos = 0
    for (let i = 0; i < count; i++) {
      if (arr[i] > arr[i + 1]) {
        pos = i
        let item = arr[i]
        arr[i] = arr[i + 1]
        arr[i + 1] = item
      }
    }
    count = pos
  }
  return arr
}
console.log(sort2([1, 88, 2, 334, 323, 19, 30, 30, 20, 377, 26, 3, 3423, 3]));
