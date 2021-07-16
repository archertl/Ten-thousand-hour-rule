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
```
### 4.3 参数属性

```typescript
class User {
  constructor(public myName: string) { }
  get name() {
    return this.myName
  }
  set name(newName) {
    this.myName = newName
  }
}
let ls = new User('zs')
console.log(ls.name);
ls.name = 'ls'
console.log(ls.name);
```
### 4.4 readonly
- readonly修饰的变量只能在构造函数中初始化
- 允许将interface、type、class上的属性标识为readonly
- 关于const标识符，其值不能被重新分配
- readonly实际上只是在编译阶段进行代码检查，而const则会在运行时检查
```typescript
class User {
  public readonly name: string = 'zs'
  constructor(name: string) {
    this.name = name;
  }
  changeName(name: string) {
    this.name = name // 报错 
  }
}
let ls = new User('ls')
console.log(ls.name);
ls.name = 'ls' // 报错
```
### 4.5 继承
- 子类继承父类后的子类实例就拥有了父类中的属性和方法，可增强代码的复用性
- 将子类公用的方法抽象出放在父类中，自己的特殊逻辑放再子类中重写父类的逻辑
- super可以调用父类上的方法和属性
```typescript
class Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  getName(): string {
    return this.name;
  }
  setName(name: string): void {
    this.name = name;
  }
}
class Student extends Person {
  no: number;
  constructor(name: string, age: number, no: number) {
    super(name, age);
    this.no = no;
  }
  getNo(): number {
    return this.no;
  }
}
let a = new Student('zs', 10, 1);
console.log(a);
```
### 4.6 类里面的修饰符
- public: 类、子类和其它任何地方都可以访问
- protected: 类、子类都可以访问，其它任何地方都不能访问
- private: 类里可以访问，子类和其它任何地方都不能访问
```typescript
class Father {
  public name: string;
  protected age: number;
  private money: number;
  constructor(name: string, age: number, money: number) {
    this.name = name;
    this.age = age;
    this.money = money;
  }
  getName(): string {
    return this.name;
  }
  setName(name: string): void {
    this.name = name;
  }
}
class Child extends Father {
  constructor(name: string, age: number, money: number) {
    super(name, age, money);
  }
  desc() {
    console.log(`${this.name} ${this.age} ${this.money}`);
  }
}

let child = new Child('zfpx', 10, 1000);
console.log(child.name);
console.log(child.age);
console.log(child.money);
```
### 4.7 静态属性 静态方法
```typescript
class Father {
  static className = 'Father';
  static getClassName() {
    return Father.className;
  }
  public name: string;
  constructor(name: string) {//构造函数
    this.name = name;
  }

}
console.log(Father.className);
console.log(Father.getClassName());
```
### 4.8 抽象类
- 抽象描述一种抽象的概念，无法被实例化，只能被继承
- 无法创建抽象类的实例
- 抽象方法不能在抽象类中实现，只能在抽象类的具体子类中实现，而且必须实现
```typescript
abstract class Animal {
  name: string;
  abstract speak(): void;
}
class Cat extends Animal {
  speak() {
    console.log('喵喵喵');
  }
}
let cat = new Cat();
cat.speak();
```
### 4.9 抽象类 vs 接口
- 不同类之间公有的属性或方法，可以抽象成一个接口（Interfaces）
- 而抽象类是供其他类继承的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中被实现
- 抽象类本质是一个无法被实例化的类，其中能够实现方法和初始化属性，而接口仅能够用于描述,既不提供方法的实现，也不为属性进行初始化
- 一个类可以继承一个类或抽象类，但可以实现（implements）多个接口
- 抽象类也可以实现接口
```typescript
abstract class Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  abstract speak(): void;
}
interface Flying {
  fly(): void
}
class Duck extends Animal implements Flying {
  speak() {
    console.log('汪汪汪');
  }
  fly() {
    console.log('我会飞');
  }
}
let duck = new Duck('zs');
duck.speak();
duck.fly();
```
### 4.10 抽象方法
- 抽象类和方法不包含具体实现，必须在子类中实现
- 抽象方法只能出现在抽象类中
```typescript
abstract class Animal {
  abstract speak(): void;
}
class Dog extends Animal {
  speak() {
    console.log('小狗汪汪汪');
  }
}
class Cat extends Animal {
  speak() {
    console.log('小猫喵喵喵');
  }
}
let dog = new Dog();
let cat = new Cat();
dog.speak();
cat.speak();
```
### 4.11 重写（override） vs 重载（overload）
- 重写是指子类重写继承自父类中的方法
- 重载是指为同一个函数提供多个类型定义
```typescript
abstract class Animal {
  abstract speak(): void;
}
class Cat extends Animal {
  speak(): string {
    return '123';
  }
}
let cat = new Cat();
console.log(cat.speak());

function double(val: number): number
function double(val: string): string
function double(val: any): any {
  if (typeof val == 'number') {
    return val * 2;
  }
  return val + val;
}

let r = double(1);
console.log(r);
```
### 4.12 继承 vs 多态
- 继承（Inheritance）子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性
- 多态（Polymorphism）由继承而产生了相关的不同的类，对同一个方法可以有不同的响应
```typescript
class Animal {
  speak(word: string): string {
    return 'Animal: ' + word;
  }
}
class Cat extends Animal {
  speak(word: string): string {
    return 'Cat:' + word;
  }
}
class Dog extends Animal {
  speak(word: string): string {
    return 'Dog:' + word;
  }
}
let cat7 = new Cat();
console.log(cat7.speak('hello'));
let dog7 = new Dog();
console.log(dog7.speak('hello'));
```
## 5 接口
- 接口一方面可以在面向对象编程中表示为行为的抽象，另外可以用来描述对象的形状
- 接口就是把一些类中公共有的属性和方法抽象出来，可以用来约束实现此接口的类
- 一个类可以继承另一个类并实现多个接口
- 接口像插件一样是用来增强类的，而抽象类是具体类的抽象概念
- 一个类可以实现多个接口，一个接口也可以被多个类实现，但一个类可以有多个子类，但只能有一个父类

### 5.1 语法和实现
- interface中可以用分号或者逗号分割每一项，也可以什么都不加
- 关键字：implements
```typescript
interface Person {
  name: string
  eat(): void
}
const man: Person = {
  name: 'zs',
  eat() { }
}
```
```typescript
//无法预先知道有哪些新的属性的时候,可使用[key: string]: any
interface Person {
  name: string
  eat(): void
  [key: string]: any
}
interface Speak {
  speak(): string
}
// implements 关键字  一个类实现多个接口
class man implements Person, Speak {
  name: string
  eat() { }
  speak() {
    return '说话'
  }
}
```
### 5.2 接口的继承
```typescript
interface Speak {
  speak(): string
}
interface Person extends Speak {
  name: string
  eat(): void
  [key: string]: any
}
class man implements Person {
  name: string
  eat() { }
  speak() {
    return '说话'
  }
}
```
### 5.3 readonly
- 使用 readonly 定义只读属性可以避免由于多人协作或者项目较为复杂等因素造成对象的值被重写
```typescript
interface Person {
  readonly name: string
  eat(): void
  [key: string]: any
}
let man: Person = {
  name: 'zs',
  eat() { }
}
man.name = 'ls' // 报错
```
### 5.4 函数类型接口
- 对方法传入的参数和返回值进行约束
```typescript
interface Person {
  readonly name: string
  eat(food: string): boolean
  [key: string]: any
}
let man: Person = {
  name: 'zs',
  eat(food: string) {
    console.log(food);
    return true
  }
}
```
### 5.5 可索引接口
- 对数组和对象进行约束
- userInterface 表示：只要 index 的类型是 number，那么值的类型必须是 string
- UserInterface2 表示：只要 index 的类型是 string，那么值的类型必须是 string
```typescript
interface UserInterface {
  [index:number]:string
}
let arr:UserInterface = ['1','2'];
interface UserInterface2 {
  [index:string]:string
}
let obj:UserInterface2 = {name:'zs'};
```
### 5.6 构造函数的类型
- 在 TypeScript 中，我们可以用 interface 来描述类
- 同时也可以使用interface里特殊的new()关键字来描述类的构造函数类型
```typescript
class Animal{
  constructor(public name:string){
  }
}
interface WithNameClass{
  new(name:string):Animal
}
function createAnimal(clazz:WithNameClass,name:string){
   return new clazz(name);
}
let a = createAnimal(Animal,'zs');
console.log(a.name);
```
## 6 泛型
- 泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性
- 泛型T作用域只限于函数内部使用
### 6.1 泛型函数
- 实现一个函数 createArray，它可以创建一个指定长度的数组，同时将每一项都填充一个默认值
```typescript
function createArray(length: number, value: any): Array<any> {
  let result: any = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}
let result = createArray(3,'x');
console.log(result);

function createArray2<T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}
let result2 = createArray2<string>(3,'x');
console.log(result);
```
### 6.2 类数组
- 类数组（Array-like Object）不是数组类型，比如 arguments
```typescript
function sum(...parameters:number[]){
  let args:IArguments = arguments;
  for(let i=0;i<args.length;i++){
    console.log(args[i]);
  }
}
sum(1,2,3);
let root = document.getElementById('root');
let children:HTMLCollection = root.children;
children.length;
let nodeList:NodeList = root.childNodes;
nodeList.length;
```
### 6.3 泛型类
```typescript
class MyArray<T>{
    private list:T[]=[];
    add(value:T) {
        this.list.push(value);
    }
    getMax():T {
        let result=this.list[0];
        for (let i=0;i<this.list.length;i++){
            if (this.list[i]>result) {
                result=this.list[i];
            }
        }
        return result;
    }
}
let arr=new MyArray();
arr.add(1); arr.add(2); arr.add(3);
let ret = arr.getMax();
console.log(ret);
```
### 6.4 泛型接口
- 泛型接口可以用来约束函数
- 定义接口的时候也可以指定泛型
```typescript
interface Calculate {
  <T>(a: T, b: T): T
}
let add: Calculate = function (a, b) {
  return a;
}
add<number>(1, 2);
interface Cart<T> {
  list: T[]
}
let cart: Cart<{ name: string, price: number }> = {
  list: [{ name: 'zs', price: 10 }]
}
console.log(cart.list[0].name, cart.list[0].price);
```
### 6.5 多个类型参数
- 泛型可以有多个
```typescript
function swap<A, B>(tuple: [A, B]): [B, A] {
  return [tuple[1], tuple[0]];
}
let swapped = swap<string, number>(['a', 1]);
console.log(swapped);
console.log(swapped[0].toFixed(2));
console.log(swapped[1].length);
```
### 6.6 默认泛型类型
```typescript
function createArray3<T = number>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}
let result2 = createArray3(3, 'x');
console.log(result2);
```
### 6.7 泛型约束
- 在函数中使用泛型的时候，由于预先并不知道泛型的类型，所以不能随意访问相应类型的属性或方法。
```typescript
function logger<T>(val: T) {
  console.log(val.length) // 报错
}
interface LengthWise {
  length: number
}
//可以让泛型继承一个接口
function logger2<T extends LengthWise>(val: T) {
  console.log(val.length)
}
logger2(1); // 报错
logger2('zs');
```
### 6.8 泛型类型别名
- 泛型类型别名可以表达更复杂的类型
```typescript
type Cart<T> = { list: T[] } | T[];
let c1: Cart<string> = { list: ['1'] };
let c2: Cart<number> = [1];
```
### 6.9 泛型接口 vs 泛型类型别名
- 接口创建了一个新的名字，它可以在其他任意地方被调用。而类型别名并不创建新的名字，例如报错信息就不会使用别名
- 类型别名不能被 extends和 implements,这时我们应该尽量使用接口代替类型别名
- 当我们需要使用联合类型或者元组类型的时候，类型别名会更合适
## 7 结构类型系统
### 7.1 接口的兼容性
- 如果传入的变量和声明的类型不匹配，TS就会进行兼容性检查
- 原理是Duck-Check,就是说只要目标类型中声明的属性变量在源类型中都存在就是兼容的
```typescript
interface Animal {
  name: string;
  age: number;
  gender: number
}
let a1 = {
  name: 'zs',
  age: 10,
  gender: 0
}
interface Person {
  name: string;
  age: number
}
// 要判断目标类型`Person`是否能够兼容输入的源类型`Animal`
function getName(p: Person): string {
  return p.name;
}
getName(a1);
// 只有在传参的时候两个变量之间才会进行兼容性的比较，赋值的时候并不会比较,会直接报错
let x: Person = {
  name: 'zs',
  age: 10,
  gender: 0 // 报错
}
```
### 7.2 基本类型的兼容性
```typescript
//基本数据类型也有兼容性判断
let num: string | number;
let str: string;
num = str;
//只要有toString()方法
let num2: {
  toString(): string
}
let str2: string;
num2 = str2;
```
### 7.3 类的兼容性
- 在TS中是结构类型系统，只会对比结构而不在意类
```typescript
class Animal {
  name: string
}
class Bird extends Animal {
  swing: number
}
let a: Animal;
a = new Bird();

let b: Bird;
//并不是父类兼容子类，子类不兼容父类
b = new Animal(); // 报错
```
```typescript
class Animal {
  name: string
}
//如果父类和子类结构一样，也可以的
class Bird extends Animal { }

let a: Animal;
a = new Bird();

let b: Bird;
b = new Animal();
```
```typescript
//甚至没有关系的两个类的实例也是可以的
class Animal {
  name: string
}
class Bird {
  name: string
}
let a: Animal;
a = new Bird();
let b: Bird;
b = new Animal();
```
### 7.4 函数的兼容性
- 比较函数的时候是要先比较函数的参数，再比较函数的返回值
- 参数可以省略
```typescript
type sumFunc = (a: number, b: number) => number;
let sum: sumFunc;
function f1(a: number, b: number) {
  return a + b;
}
sum = f1;
//可以省略一个参数
function f2(a: number): number {
  return a;
}
sum = f2;
//可以省略二个参数
function f3(): number {
  return 0;
}
sum = f3;
//多一个参数可不行
function f4(a: number, b: number, c: number) {
  return a + b + c;
}
sum = f4; // 报错
```
```typescript
type GetPerson = () => { name: string, age: number };
let getPerson: GetPerson;
//参数一样可以
function g1() {
  return { name: 'zs', age: 10 };
}
getPerson = g1;
//多一个属性也可以
function g2() {
  return { name: 'zs', age: 10, gender: 'male' };
}
getPerson = g2;
//少一个属性不行
function g3() {
  return { name: 'zs' };
}
getPerson = g3; // 报错
//因为有可能要调用返回值上的方法
getPerson().age.toFixed();
```
### 7.5 函数参数的双向协变
- 函数的参数中目标兼容源，或者源兼容目标都可以，只要有一个成立就可以
```typescript
type LogFunc = (a: number | string) => void;
let log: LogFunc;
function log1(a: number) {
  console.log(a);
}
//在这里定义的参数类型兼容实际的参数类型
log = log1; // 报错

function log2(a: number | string | boolean) {
  console.log(a);
}
//在这里实际的参数类型兼容定义的参数类型
log = log2;
```
### 7.6 泛型的兼容性
- 泛型在判断兼容性的时候会先判断具体的类型,然后再进行兼容性判断
```typescript
//接口内容为空没用到泛型的时候是可以的
interface Empty<T> { }
let x: Empty<string>;
let y: Empty<number>;
x = y;
//接口内容不为空的时候不可以
interface NotEmpty<T> {
  data: T
}
let x1: NotEmpty<string>;
let y1: NotEmpty<number>;
x1 = y1; // 报错
interface NotEmptyString {
  data: string
}
interface NotEmptyNumber {
  data: number
}
let xx3: NotEmptyString;
let yy3: NotEmptyNumber;
xx3 = yy3; // 报错
```
### 7.8 枚举的兼容性
- 枚举类型与数字类型兼容，并且数字类型与枚举类型兼容
- 不同枚举类型之间是不兼容的
```typescript
//数字可以赋给枚举
enum Colors { Red, Yellow }
let c: Colors;
c = Colors.Red;
c = 1;
c = '1'; // 报错

//枚举值可以赋给数字
let n: number;
n = 1;
n = Colors.Red;
```
## 8 类型保护
- 类型保护就是一些表达式，他们在编译的时候就能通过类型信息确保某个作用域内变量的类型
- 类型保护就是能够通过关键字判断出分支中的类型
### 8.1 typeof 类型保护
```typescript
function double(input: string | number | boolean) {
  if (typeof input === 'string') {
    return input + input;
  } else {
    if (typeof input === 'number') {
      return input * 2;
    } else {
      return !input;
    }
  }
}
```
### 8.2 instanceof类型保护
```typescript
class Animal {
  name: string;
}
class Bird extends Animal {
  swing: number
}
function getName(animal: Animal) {
  if (animal instanceof Bird) {
    console.log(animal.swing);
  } else {
    console.log(animal.name);
  }
}
```
### 8.3 null保护
- 如果开启了strictNullChecks选项，那么对于可能为null的变量不能调用它上面的方法和属性
```typescript
function getFirstLetter(s: string | null) {
  //第一种方式是加上null判断
  if (s == null) {
    return '';
  }
  //第二种处理是增加一个或的处理
  s = s || '';
  return s.charAt(0);
}
//它并不能处理一些复杂的判断，需要加链判断运算符
function getFirstLetter2(s: string | null) {
  function log() {
    console.log(s!.trim());
  }
  s = s || '';
  log();
  return s.charAt(0);
}
```
### 8.4 链判断运算符
- 链判断运算符是一种先检查属性是否存在，再尝试访问该属性的运算符，其符号为 ?.
- 如果运算符左侧的操作数 ?. 计算为 undefined 或 null，则表达式求值为 undefined 。否则，正常触发目标属性访问，方法或函数调用。
```typescript
a?.b; //如果a是null/undefined,那么返回undefined，否则返回a.b的值.
a == null ? undefined : a.b;

a?.[x]; //如果a是null/undefined,那么返回undefined，否则返回a[x]的值
a == null ? undefined : a[x];

a?.b(); // 如果a是null/undefined,那么返回undefined
a == null ? undefined : a.b(); //如果a.b不函数的话抛类型错误异常,否则计算a.b()的结果

a?.(); //如果a是null/undefined,那么返回undefined
a == null ? undefined : a(); //如果A不是函数会抛出类型错误
//否则 调用a这个函数
```
### 8.5 可辨识的联合类型
- 就是利用联合类型中的共有字段进行类型保护的一种技巧
- 相同字段的不同取值就是可辨识
```typescript
interface WarningButton {
  class: 'warning',
  text1: '修改'
}
interface DangerButton {
  class: 'danger',
  text2: '删除'
}
type Button = WarningButton | DangerButton;
function getButton(button: Button) {
  if (button.class == 'warning') {
    console.log(button.text1);
  }
  if (button.class == 'danger') {
    console.log(button.text2);
  }
}
```

### 8.6 in操作符
in 运算符可以被用于参数类型的判断
```typescript
interface Bird {
  swing: number;
}
interface Dog {
  leg: number;
}
function getNumber(x: Bird | Dog) {
  if ("swing" in x) {
    return x.swing;
  }
  return x.leg;
}
```

### 8.7 自定义的类型保护
- TypeScript 里的类型保护本质上就是一些表达式，它们会在运行时检查类型信息，以确保在某个作用域里的类型是符合预期的
- 要自定义一个类型保护，只需要简单地为这个类型保护定义一个函数即可，这个函数的返回值是一个类型谓词
- 类型谓词的语法为 parameterName is Type 这种形式，其中 parameterName 必须是当前函数签名里的一个参数名
```typescript
interface Bird {
  swing: number;
}
interface Dog {
  leg: number;
}
//没有相同字段可以定义一个类型保护函数
function isBird(x: Bird | Dog): x is Bird {
  return (<Bird>x).swing == 2;
  // return (x as Bird).swing == 2;
}
function getAnimal(x: Bird | Dog) {
  if (isBird(x)) {
    return x.swing;
  }
  return x.leg;
}
```
## 9 类型变换
### 9.1 交叉类型
- 交叉类型（Intersection Types）表示将多个类型合并为一个类型
```typescript
interface Bird{
name:string,
fly():void
}
interface Person{
 name:string,
 talk():void
}
type BirdPerson = Bird & Person;
let p:BirdPerson={name:'zs',fly(){},talk(){}};
p.fly;
p.name
p.talk;
```
### 9.2 typeof
- 可以获取一个变量的类型
```typescript
//先定义类型，再定义变量
type People = {
    name:string,
    age:number,
    gender:string
}
let p1:People = {
    name:'zs',
    age:10,
    gender:'male'
}
//先定义变量，再定义类型
let p1 = {
    name:'zs',
    age:10,
    gender:'male'
}
type People = typeof p1;
function getName(p:People):string{
    return p.name;
}
```
### 9.3 索引访问操作符
- 可以通过[]获取一个类型的子类型
```typescript
interface Person{
    name:string;
    age:number;
    job:{
        name:string
    };
    interests:{name:string,level:number}[]
}
let FrontEndJob:Person['job'] = {
    name:'前端工程师'
}
let interestLevel:Person['interests'][0]['level'] = 2;
```
### 9.4 keyof
- 索引类型查询操作符
```typescript
interface Person{
  name:string;
  age:number;
  gender:'male'|'female';
}
//type PersonKey = 'name'|'age'|'gender';
type PersonKey = keyof Person;

function getValueByKey(p:Person,key:PersonKey){
  return p[key];
}
let val = getValueByKey({name:'zs',age:10,gender:'male'},'name');
console.log(val);
```
### 9.5 映射类型
- 在定义的时候用in操作符去批量定义类型中的属性
```typescript
interface Person{
  name:string;
  age:number;
  gender:'male'|'female';
}
//批量把一个接口中的属性都变成可选的
type PartPerson = {
  [Key in keyof Person]?:Person[Key]
}

let p1:PartPerson={};
//也可以使用泛型
type Part<T> = {
  [key in keyof T]?:T[key]
}
let p2:Part<Person>={};
```
### 9.6 内置工具类型
- TS 中内置了一些工具类型来帮助我们更好地使用类型系统
#### 9.6.1 Partial
- Partial 可以将传入的属性由非可选变为可选，具体使用如下：
```typescript
type Partial<T> = { [P in keyof T]?: T[P] };

interface A {
  a1: string;
  a2: number;
  a3: boolean;
}

type aPartial = Partial<A>;

const a: aPartial = {}; // 不会报错
```
#### 9.6.2 Required
- Required 可以将传入的属性中的可选项变为必选项，这里用了 -? 修饰符来实现。
```typescript
/**
 * Make all properties in T required
 */
type Required<T> = { [P in keyof T]-?: T[P] };

interface Person{
  name:string;
  age:number;
  gender?:'male'|'female';
}
let p:Required<Person> = {
  name:'zs',
  age:10,
  //gender:'male'
}
```
#### 9.6.3 Readonly
- Readonly 通过为传入的属性每一项都加上 readonly 修饰符来实现。
```typescript
/**
 * Make all properties in T readonly
 */
type Readonly<T> = { readonly [P in keyof T]: T[P] };

interface Person{
  name:string;
  age:number;
  gender?:'male'|'female';
}
let p:Readonly<Person> = {
  name:'zs',
  age:10,
  gender:'male'
}
p.age = 11;
```
#### 9.6.4 Pick
- Pick 能够帮助我们从传入的属性中摘取某一项返回
```typescript
/**
 * From T pick a set of properties K
 */
type Pick<T, K extends keyof T> = { [P in K]: T[P] };

interface Animal {
  name: string;
  age: number;
}
// 摘取 Animal 中的 name 属性
type AnimalSub = Pick<Animal, "name">; // { name: string; }
```
#### 9.6.5 映射类型修饰符的控制
- TypeScript中增加了对映射类型修饰符的控制
- 具体而言，一个 readonly 或 ? 修饰符在一个映射类型里可以用前缀 + 或-来表示这个修饰符应该被添加或移除
- TS 中部分内置工具类型就利用了这个特性（Partial、Required、Readonly...），这里我们可以参考 Partial、Required 的实现
### 9.7 条件类型
- 在定义泛型的时候能够添加进逻辑分支，以后泛型更加灵活
#### 9.7.1 定义条件类型
```typescript
interface Fish{
  name:string
}
interface Water{
  name:string
}
interface Bird{
  name:string
}
interface Sky{
  name:string
}
//三元运算符
type Condition<T> = T extends Fish?Water:Sky;
let con:Condition<Fish> = {name:'水'};
```
#### 9.7.2 条件类型的分发
```typescript
interface Fish{
  name:string
}
interface Water{
  name1:string
}
interface Bird{
  name:string
}
interface Sky{
  name2:string
}
//三元运算符
type Condition<T> = T extends Fish?Water:Sky;
let con1:Condition<Fish|Water> = {name1:'水'};
let con2:Condition<Fish|Water> = {name2:'水'};
```
#### 9.7.3 内置条件类型
- TS 在内置了一些常用的条件类型，可以在 lib.es5.d.ts 中查看：
```typescript
Exclude<T, U> // 从 T 可分配给的类型中排除 U。
Extract<T, U> // 从 T 可分配的类型中提取 U。
NonNullable<T> // 从 T 中排除 null 和 undefined。
ReturnType<T> // 获取函数类型的返回类型。
InstanceType<T> // 获取构造函数类型的实例类型。
```
##### 9.7.3.1 Exclude
```typescript
type  E = Exclude<string|number,string>;
let e:E = 10;
```
##### 9.7.3.2 Extract
```typescript
type  E = Extract<string|number,string>;
let e:E = '1';
```
##### 9.7.3.3 NonNullable
```typescript
type  E = NonNullable<string|number|null|undefined>;
let e:E = null;
```
##### 9.7.3.4 ReturnType
```typescript
function getUserInfo() {
  return { name: "zs", age: 10 };
}
// 通过 ReturnType 将 getUserInfo 的返回值类型赋给了 UserInfo
type UserInfo = ReturnType<typeof getUserInfo>;
const userA: UserInfo = {
  name: "zs",
  age: 10
};
```
##### 9.7.3.5 InstanceType
```typescript
class Person{
  name:string;
  constructor(name){
    this.name = name;
  }
  getName(){console.log(this.name)}
}
type  P = InstanceType<typeof Person>;
let p:P = {name:'zs',getName(){}};
```