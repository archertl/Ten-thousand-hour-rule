# TypeScript基础
## 1 TypeScript安装和编译
### 1.1 安装全局编译命令工具
```
npm i typescript -g
```
```
tsc index.js
```
### 1.2 生成配置文件
```
tsc --init
```

## 2 数据类型
### 2.1 布尔类型（boolean）
```typescript
let isShow: boolean = false;
```
### 2.2 数字类型（number）
```typescript
let age: number = 1;
```
### 2.3 字符串类型（string）
```typescript
let msg: string = '你好';
```
### 2.4 数组类型（array）
- 每一项都是同一种数据类型
```typescript
let arr1: number[] = [1, 2, 3];
let arr2: Array<string> = ['1', '2', '3'];
```
### 2.5 元组类型（tuple）
- 表示一个已知数量和类型的数组
```typescript
let zs: [string, number] = ['zs', 16];
```
### 2.6 枚举类型（enum）
- 实现定义某个变量所有可能的值，尽可能的用一个自然语言的单词表示
- 比如性别，月份等
#### 2.6.1 普通枚举
```typescript
enum Gender {
  GIRL,
  BOY
}
console.log(Gender.GIRL, Gender.BOY);
```
#### 2.6.2 常量枚举
- 常数枚举与普通枚举的区别是，它会在编译阶段被删除，并且不能包含计算成员。
```typescript
const enum Colors {
    Red,
    Yellow,
    Blue
}
let myColors = [Colors.Red, Colors.Yellow, Colors.Blue];
// const enum Color { Red, Yellow, Blue = "blue".length };
```
### 2.7 任意类型（any）
```typescript
let root:any=document.getElementById('root');
```
### 2.8 null和undefined
- null和undefined是其它类型的子类型，可以赋值给其他类型，如数字类型，赋值后类型会变成赋值的类型
### 2.9 voil类型
- 表示没有类型
- 当一个函数没有返回值是，ts会认为该函数的返回值是void类型
- 当我们声明一个变量类型是void的时候，它在非严格模式下仅可以被赋值为null和undefined
```typescript
function getMsg(): void {
  return null
}
```
### 2.10 never类型
- never是其它类型(null undefined)的子类型，代表不会出现的值
#### 2.10.1 
- 作为不会返回的函数的返回类型
```typescript
// 函数代码无法到达终点
function error(message: string): never {
  throw new Error(message);
}
function fail() {
  return error("Something failed");
}
function infiniteLoop(): never {
  while (true) {}
}
```
#### 2.10.2 --strictNullChecks模式
- 在 TS 中， null 和 undefined 是任何类型的有效值，所以无法正确地检测它们是否被错误地使用。于是 TS 引入了 --strictNullChecks 这一种检查模式
- 由于引入了 --strictNullChecks ，在这一模式下，null 和 undefined 能被检测到。所以 TS 需要一种新的底部类型（ bottom type ）。所以就引入了 never。
```typescript
function fn(x: number | string) {
  if (typeof x === 'number') {
    // x: number 类型
  } else if (typeof x === 'string') {
    // x: string 类型
  } else {
    // x: never 类型
    // --strictNullChecks 模式下，这里的代码将不会被执行，x 无法被观察
  }
}
```
#### 2.10.3 never和void的区别
- void 可以被赋值为 null 和 undefined的类型。 never 则是一个不包含值的类型。
- 拥有 void 返回值类型的函数能正常运行。拥有 never 返回值类型的函数无法正常返回，无法终止，或会抛出异常。
  
### 2.11 类型推断
- 是指编程语言中能够自动推导出值的类型的能力，它是一些强静态类型语言中出现的特性
- 定义时未赋值就会推论成any类型
- 如果定义的时候就赋值就能利用到类型推论
```typescript
let username; // 类型推断为any
username = 10;
username = 'zs';
username = null;
let a = 1; // 类型推断为number
a = '1' // 这边不能再赋值为string类型
```
### 2.12 包装类型（Wrapper Object）
- JavaScript 的类型分为两种：原始数据类型（Primitive data types）和对象类型（Object types）
- 在js时有一个自动装箱的过程
- 如果对一个基本类型调用方法的话，它在内部会迅速做一次包装，把这个基本类型包装成对象类型，然后就可以调用方法
```typescript
let name = 'ZS';
console.log(name.toLowerCase());
```
### 2.13 联合类型
- 联合类型上只能访问两个类型共有的属性和方法
```typescript
let name: string | number;
name = 'zs';
name = 1;
```
### 2.14 类型断言
- 类型断言可以将一个联合类型的变量，指定为一个更加具体的类型
- 不能将联合类型断言为不存在的类型
```typescript
let name: string | number;
console.log(name.length); // 不确定类型 这里不能直接调用length
// 采用断言
console.log((name as string).length);
console.log((name as boolean)); // 报错 这里不能断言成联合类型以外的类型
```
### 2.15 字符串、数字、布尔值字面量
```typescript
type Test = 0 | 1 | '0' | '1' | false | true;
let foo: Test = 1
```

## 3 函数
### 3.1 函数的定义
```typescript
function getMsg(msg: string): string {
  return msg + 'aaa'
}
```
### 3.2 函数表达式
- 定义一个类型，用来约束一个函数表达式
```typescript
type GetUsernameFunction = (x:string,y:string)=>string;
let getUsername:GetUsernameFunction = function(firstName,lastName){
  return firstName + lastName;
}
```
### 3.3 没有返回值
```typescript
let getMsg = function (msg: string): void {
  console.log(msg + 'aaa');
}
```
### 3.4 可选参数
```typescript
function print(name:string,age?:number):void {
    console.log(name,age);
}
```
### 3.5 默认参数
```typescript
function print(name:string = 'zs',age?:number):void {
    console.log(name,age);
}
```
### 3.6 剩余参数
```typescript
function sum(...numbers:number[]) {
    return numbers.reduce((val,item)=>val+=item,0);
}
console.log(sum(1,2,3));
```
### 3.7 函数重载
- 在Java中的重载，指的是两个或者两个以上的同名函数，参数不一样
- 在TypeScript中，表现为给同一个函数提供多个函数类型定义
- 函数定义后面要紧跟着函数实现
```typescript
let obj: any={};
function attr(val: string): void;
function attr(val: number): void;
function attr(val: any):void {
    if (typeof val === 'number') {
        obj.age=val;
    } else {
        obj.name=val;
    }
}
attr('zs');
attr(1);
attr(true); // 这里报错  
console.log(obj);
```

## 4 类
### 4.1 如何定义类

```typescript
class Person {
  name: string;
  getNama(): string {
    return this.name
  }
}
```
### 4.2 存取器
```typescript
class User {
  myName: string
  get name() {
    return this.myName
  }
  set name(newName) {
    this.myName = newName
  }
}
let ls = new User()
console.log(ls.name);
ls.name = 'ls'
console.log(ls.name);
\
```
未完待续。。。