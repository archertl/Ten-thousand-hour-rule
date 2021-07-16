var isPalindrome = function (x) {
  if (x > 0) {
    let old = x
    let rev = 0
    while (x > 0) {
      let c = x % 10
      rev = rev * 10 + c
      x = Math.floor(x / 10)
    }
    return rev === old
  } else if (x === 0) {
    return true
  } else {
    return false
  }
}