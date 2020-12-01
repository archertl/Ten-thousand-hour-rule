function mergeSort(arr) {
  let length = arr.length
  if (length < 2) return arr
  let mid = Math.floor(length / 2),
    left = arr.slice(0, mid),
    right = arr.slice(mid)
  return merge(mergeSort(left), mergeSort(right))
}
function merge(left, right) {
  let res = []
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      res.push(left.shift())
    } else {
      res.push(right.shift())
    }
  }
  while (left.length) res.push(left.shift())
  while (right.length) res.push(right.shift())
  return res
}
console.log(mergeSort([1, 88, 2, 334, 323, 19, 30, 30, 20, 377, 26, 3, 3423, 3]))