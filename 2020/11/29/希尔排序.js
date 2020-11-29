function shellSort(arr) {
  let count = arr.length
  while (count > 0) {
    count = Math.floor(count / 2)
    for (let i = count; i < arr.length; i++) {
      let current = arr[i]
      let j = i - count
      for (j; j >= 0 && arr[j] > current; j -= count) {
        arr[j + count] = arr[j]
      }
      arr[j + count] = current
    }
  }
  return arr
}
console.log(shellSort([1, 88, 2, 334, 323, 19, 30, 30, 20, 377, 26, 3, 3423, 3]));