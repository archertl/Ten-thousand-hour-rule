function selectSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    let min = arr[minIndex]
    arr[minIndex] = arr[i]
    arr[i] = min
  }
  return arr
}
console.log(selectSort([1, 88, 2, 334, 323, 19, 30, 30, 20, 377, 26, 3, 3423, 3]));