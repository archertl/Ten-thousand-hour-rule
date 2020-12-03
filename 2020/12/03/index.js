function a(n) {
  if(n < 2) {
    return n
  }
  return a(n - 1) + a(n - 2)
}
for(let i = 0; i < 40; i++) {
  console.log(a(i))
}
// 优化：存一下已经计算过第值
function aa(n,arr = []) {
  if(n < 2) {
    return n
  }
  if(!arr[n]) {
    arr[n] = aa(n - 1,arr) + aa(n - 2,arr)
  }
  return arr[n]
}
for(let i = 0; i < 40; i++) {
  console.log(aa(i))
}