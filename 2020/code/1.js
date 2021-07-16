var intToRoman = function (num) {
  let res = ''
  let obj = {
    'M': 1000,
    'D ': 500,
    'C': 100,
    'L': 50,
    'X': 10,
    'V': 5,
    'I': 1,
  }
  for (const key in obj) {
    let val = obj[key]
    let current = Math.floor(num / val)
    for (let i = 0; i < current; i++) {
      res += key
    }
    num = num % val
  }
  return res
};
console.log(intToRoman(1234));