function insertSort(arr) {
  let count = arr.length
  for (let i = 0; i < count; i++) {
    let current = arr[i]
    let j = i - 1
    for (j; j >= 0 && arr[j] > current; j--) {
      arr[j + 1] = arr[j]
    }
    arr[j + 1] = current
  }
  return arr
}
console.log(insertSort([1, 88, 2, 334, 323, 19, 30, 30, 20, 377, 26, 3, 3423, 3]));