/**
 * 输入一个正数，输出该数二进制表示中1的个数，其中负数用补码表示
 * 提示：二进制位运算
 * 二进制或运算：符号为 |，表示若两个二进制都为0，则结果为0，否则为1
 * 二进制与运算：符号为 &，表示若两个二进制都为1，则结果为1，否则为0
 * 二进制否运作：符号为 ~，表示对一个二进制取反
 * 异或运算：符号为 ^，表示若两个二进制位不相同，结果为1，否则为0
 * 左移运算：符号为 <<，m << n ，表示把m左移n位的时候，最左边的n位将被丢弃，同时在最右边补上n个0
 *    比如：00001010 << 2 = 00101000
 * 右移运算：符号为 >>，m >> n ，表示把m右移n位的时候，最右边的n位将被丢弃，同时在最左边补上n个0
 *    比如：00001010 >> 2 = 00000010
 */
function fn(n) {
  let flag = 1;
  let count = 0
  while (flag) {
    if (flag & n) {
      count++
    }
    flag = flag << 1
  }
  return count
}
console.log(fn(4));