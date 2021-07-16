/**
 * 在排序数组中查找元素的第一个和最后一个位置
 */
var searchRange = function (nums, target) {
  let pos = [-1, -1]
  for (let i = 0; i < nums.length; i++) {
    if (target === nums[i]) {
      if (pos[0] === -1) {
        pos[0] = i
        pos[1] = i
      } else {
        pos[1] = i
      }
    } else {
      if (pos[0] !== -1) {
        return pos
      }
    }
  }
  return pos
  // let first = nums.indexOf(target)
  // if(first < 0) {
  //   return [-1,-1]
  // } else {
  //   return [first,nums.lastIndexOf(target)]
  // }
};