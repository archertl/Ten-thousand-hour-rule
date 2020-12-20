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
let duck = new Duck('zhufeng');
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
let a = createAnimal(Animal,'zhufeng');
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
未完待续。。。