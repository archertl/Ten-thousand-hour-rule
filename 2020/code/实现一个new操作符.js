function New(func, ...arg) {
  let res = {}
  res.__proto__ = func.prototype
  let ret = func.apply(res, arg)
  if (['object', 'function'].includes(typeof ret)) {
    res = ret
  }
  return res
}
function A(name, age) {
  this.name = name
  this.age = age
  return function a() { }
}
console.log(New(A, 'zs', 1));
function maximum(nums) {
  let length = nums.length
  let a = 0
  let b = nums[0]
  for (let i = 1; i < length; i++) {
    curent = Math.max(a, b)
    b = a + nums[i]
    a = curent
  }
  return Math.max(a, b)
}
console.log(maximum([2, 1, 4, 5, 3, 1, 1, 3]))
