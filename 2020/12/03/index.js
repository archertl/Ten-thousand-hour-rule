function a(n) {
  if (n < 2) {
    return n
  }
  return a(n - 1) + a(n - 2)
}
for (let i = 0; i < 40; i++) {
  console.log(a(i))
}
// 优化：存一下已经计算过第值
function aa(n, arr = []) {
  if (n < 2) {
    return n
  }
  if (!arr[n]) {
    arr[n] = aa(n - 1, arr) + aa(n - 2, arr)
  }
  return arr[n]
}
// 直接计算
function fn(n) {
  if (n < 2) {
    return n
  }
  let first = 0
  let second = 1
  for (let i = 0; i < n - 1; i++) {
    let sum = first + second
    first = second
    second = sum
  }
  return second
}
for (let i = 0; i < 40; i++) {
  console.log(fn(i))
}