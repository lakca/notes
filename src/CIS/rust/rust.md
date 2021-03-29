- [约定（Conventions）](#约定conventions)
- [变量（Variables）](#变量variables)
  - [* 常量（Constants）](#-常量constants)
- [类型（Types）](#类型types)
  - [数字（Number）](#数字number)
    - [字面量（Literal）](#字面量literal)
  - [字符（Character）](#字符character)
  - [元组（Tuple）](#元组tuple)
  - [数组（Array）](#数组array)
- [函数（Functions）](#函数functions)
  - [*语句（Statements）](#语句statements)
  - [*表达式（Expressions）](#表达式expressions)
- [控制流程（Control Flow）](#控制流程control-flow)
  - [`if`](#if)
  - [`while`](#while)
  - [`for`](#for)
  - [`loop`](#loop)
- [* 所有权（Ownership）](#-所有权ownership)
  - [所有权规则：](#所有权规则)
  - [变量的有效范围（*Scope*）：](#变量的有效范围scope)
  - [变量和数据的 *Move* 和 *Copy*：](#变量和数据的-move-和-copy)
  - [引用（Reference）](#引用reference)
    - [借用（Borrowing）](#借用borrowing)
    - [悬空引用（Dangling References）](#悬空引用dangling-references)
  - [切片（Slice）](#切片slice)
    - [字符串切片（String Slice）](#字符串切片string-slice)
    - [`&str`](#str)

## 约定（Conventions）

- 变量名和函数名使用 *snake_case* ；

## 变量（Variables）

```rust
let v = 1; // Infer, 隐式类型

let v: u8 = 3; // 显式类型

let v = "v".repeat(v); // Shadowing, 同一变量名可重复使用

let immutable = 1; // Immutable, 默认不可变

let mut mutable = 2; // Mutable, 可变变量
```

- 默认 *immutable* ；
- 变量名可重复使用（*Shadowing*）；

### * 常量（Constants）

- *Constant* 必须声明类型，如 `const MAX: u8 = 100` ；
- *Constant* 可以在任意域声明，包括全局域；
- *Constant* 必须是常量表达式，而不能是可能是运行时返回的值；
- *Constant* 存活于程序运行全程；

## 类型（Types）

- Scalar:
  - Integer
    - `i8`, `u8`
    - `i16`, `u16`
    - `i32` （默认）, `u32`
    - `i64`, `u64`
    - `i128`, `u128`
    - `isize`, `usize`：与CPU架构同位
  - Floating-Point
    - `f32`
    - `f64`（默认）
  - Boolean
    - `bool`
  - Character
    - `char`
- Compound
  - Tuple
  - Array

### 数字（Number）

- 默认整型为 `i32` ，*i32: this type is generally the fastest*；
- 浮点型遵循 *IEEE-754* 标准，默认浮点型为 `f64` ，*because on modern CPUs it’s roughly the same speed as f32, but is capable of more precision.*；
- 只支持基础的算术运算符：加减乘除余 *+-\*/%* ;
- 变量默认不可以超出声明时的类型长度范围，如`i8`范围为`0 ~ 255`。
  - 若超出范围开发编译时会检查（Check）报错，但发布编译（`--release`）时不会检查，而是遵循 *two’s complement wrapping* 规则，即一端超出的部分会转到另一端去偏移，如 `let i: i8 = 260; assert_eq!(i, 4)`；
  - 若想编译检查通过，也可以通过声明属性来实现：`#![allow(overflowing_literals)]` ；

#### 字面量（Literal）

- 支持使用分隔符 `_` ，如 `1_000_000`；
- 除了 `byte` ，其他表示法均可以加类型后缀（*type suffix*），如 `10u8` ；

类型：

- decimal: `1000000`, `1_000_000`, `100u8`
- hex: `0xff`
- octal: `0o77`
- binary: `0b1111`
- byte (`u8` only): `b'A'`

### 字符（Character）

> 表示一个 *unicode* 字符，4个字节。

```rust
let c = 'A';

let c: char = '😻';
```

- 4字节大小，代表 *unicode* 字符（*Unicode Scalar Value*），具体范围：*U+0000* ~ *U+D7FF* 和 *U+E000* ~ *U+10FFFF* ；
- 字符用单引号标注；

### 元组（Tuple）

> 元素类型可不同、长度固定的一组值。

定义：
```rust
let tup = (10, 'A');

let tup: (i32, char) = (10, 'A');
```
访问：
```rust
// 支持解构 destructuring
let (a, b) = tup;
// 支持索引 indexing
let a = tup.0;
```

- 长度在声明时确定；
- 支持元素解构；

### 数组（Array）

> 元素类型相同、长度固定的数组。（相对地，长度可变的见 *Vector* ）

定义：
```rust
let a = [1, 2, 3];

let a: [i32; 3] = [1, 2, 3];

let a: [0; 3]; // 元素为0，长度为3
```
访问：
```rust
let e1 = a[0];
let e_err = a[10]; // exit with error
```

- 存于栈（*Stack*）上；
- 只能访问范围内的元素；

## 函数（Functions）

无参数和返回值：
```rust
fn main() {
  println!("Hello");
}

// 与上同义，没有返回值的函数默认返回空元组：()
fn main() -> () {
  println!("Hello");
}
```
有参数和返回值：
```rust
fn add(x: i32, y: i32) -> i32 {
  x + y // return 可以省略，因为此处是最后一个表达式
}
```

- 返回值和最后一个表达式同义，即最后一个表达式即为返回值，无需显式的 *return*；

### *语句（Statements）

> 语句：一串执行动作但不返回值的指令。

```rust
let a = 1;
```

### *表达式（Expressions）

> 表达式：一串返回计算结果的指令。（表达式不包括末尾的分号，加上分号后就是语句）

复杂的表达式如：
- 调用函数（*Function*）；
- 调用宏（*Macro*）；
- 块（*Block*: `{}`）；
  - *块是一个表达式，所以块是可以返回值的；

```rust
// macro
println!("hello");

// block
let x = {
  let y = 1;
  y + 1 // 注意：由于需要返回值，此处应为表达式，故不加分号
}
```

## 控制流程（Control Flow）

### `if`

- 条件的类型必须为 `bool` ；
- 条件不要求必须完整（*may incomprehensive*）；

```rust
// 圆括号可以省略
if true {
  println!("hello")
}

// 获取返回值
let x = if true { 1 } else { 2 }; // 注意返回值必须类型相同，因为 Rust 是静态类型，类型在编译时就确定。
```

### `while`

### `for`

### `loop`

> 无条件循环。

无限循环：
```rust
loop {
  println!("hello")
}
```
中断循环：
```rust
loop {
  println!("hello");
  break // 实际上返回了空元组：()
}
```
返回值：
```rust
let a = loop { break 1 }
```

## * 所有权（Ownership）

> 与其他语言通过手动分配和释放内存或者内置内存回收机制不同，Rust 通过编译时对所有权的检查来管理内存。*In Rust, memory is managed through a system of ownership with a set of rules that the compiler checks at compile time. None of the ownership features slow down your program while it’s running.*

| 官方文档示例 |
| :--: |
| ![ownership](./ownership.svg) |

*Rust* 并没有采用手动释放（Allocation and Free）或者垃圾回收机制（Garbage Collection）来处理堆（*Heap*）上内存回收问题，而是结合了二者的优点，创建了一种既可以及时又能够自动的内存释放机制：所有值（*Value*）都有一个 *Owner* 变量的标记，当 *Owner* 所在的 *Scope* 结束时，那么这个值（*Value*）便会被自动执行 *Drop* 函数清理掉。

1. *Owner*，通俗来说就是指向该值的变量（*Variable*）。

2. 值（*Value*）的 *Owner* 是可以改变（*Move*）的，比如变量间赋值、作为参数给函数调用、以及函数返回等；

3. 值（*Value*）同时刻只有一个 *Owner* ，即当存在上述所有权的移交（*Move*）的操作时，移交前的变量将会失去指向。如果后续在该变量未被再次赋值前调用，为了安全考虑，编译器将会报错而不是返回空指针。

4. 当 *Owner* 的作用域结束时，若值（*Value*）没被移交，其值（*Value*）便会被自动 *Drop*。
（*the memory is automatically returned once the variable that owns it goes out of scope.*）。

5. 对于标量，其值是直接存于栈（*Stack*）上，并没有指针指向，其随程序块结束而释放，不存在所有权的移交。在变量赋值时，直接执行的值复制（*Copy*）操作；

所有权移交（*Move*）：
  - 变量间赋值
  - 函数参数
  - 函数返回

P.S. 函数可以理解为调用和结束时有两个赋值操作，调用时值传入给内部变量并转入所有权，结束时可以返回值（交出所有权）。

```rust
fn main() {
  let a = String::from("hello");
  // Move
  demo(a); // "hello" Move 给了函数
  println!("{}", a); // 报错
  // String是在runtime动态创建，存于堆上，通过指针调用，可以移交所有权

  let mut a = String::from("hello");
  demo(a);
  // Reassign
  a = String::from("hello"); // 赋值后指向了新的值（内存）
  println!("{}", a); // 打印
  // Clone
  demo(a.clone()); // 用一份创建出的相同值赋值
  println!("{}", a); // 打印

  let a = "hello"; // "hello" 是标量
  // Copy
  demo2(a); // "hello" 被 copy 给函数使用
  println!("{}", a); // 打印
  // "hello" 是字面量，在编译时便确定了，执行时直接加载到栈中，生命周期与程序块相同，不存在所有权的移交

  let a = String::from("hello");
  a = demo3(a); // 将值的所有权返回
  println!(a); // 打印
}

fn demo(a: String) {
  println!("{}", a)
}

fn demo2(a: &str) {
  println!("{}", a)
}

fn demo3(a: String) -> String {
  a
}
```

### 所有权规则：
- 在 *Rust* 中所有 *value* 都有一个表示其 *owner* 的变量；
- 任何时刻都只有一个 *owner* ；
- 当 *owner* 超出 *scope* 时，*value* 会被删除；

### 变量的有效范围（*Scope*）：

> 从变量在 *Scope* 中出现开始，一直到该 *Scope* 结束，变量都是有效的，*Scope* 通俗来讲就是大括号 `{}` 包括的范围。

### 变量和数据的 *Move* 和 *Copy*：

> *Copy*：在内存中创建（*new*）一份与源变量的值相同的新值让目标变量指向；

> *Move*：目标变量接管（*own*）源变量的值，即取消源变量对其值的指向，让目标变量指向；

> *Clone*：与 *Move* 操作相对应，以实现 *Copy* 的行为，

对于标量（*Scalar Types*） 和标量元组，变量之间赋值将直接复制（*Copy*）值：
```rust
let a = 1;
let b = a;
println!("{}, {}", a, b); // a 和 b 均为 1
```
对于非标量，变量之间赋值将会移交（*Move*）指针：
```rust
let a = String::from("hello");
let b = a;
println!("{}", b); // 打印 hello
println!("{}", a); // 报错，String的所有权从 a 移交给了 b

// 若想复制值给目标变量，可以执行 Clone 操作：
let c = a.clone();
```
对于自定义的类型，我们可以通过是否定义 *Copy* 特性（*Trait*）来定义赋值时是执行 *Move* 还是 *Copy* 操作：
```rust
```

### 引用（Reference）

> 引用：建立一个常量指针指向被引用的变量（*Variable*）。
> (*allow you to refer to some value without taking ownership of it*)

| 官方文档示例 |
| :--: |
| ![reference](./reference.svg) |

- 引用指向变量，不是直接指向值，不会获取（*Move*）值（*Value*）的所有权（*Ownership*）；

两个特征：

1. 引用的作用域（*Reference Scope*）持续到该引用最后一次被使用。（*a reference’s scope starts from where it is introduced and continues through the last time that reference is used.*）

2. 引用不可以造成数据竞争（*Data Races*）或者不可预期的改变（*Unexpected Change*）。

从第一个特征，我们可以解读出引用 *有效存在* 的涵义：

- 如果一个引用被创建后从未被使用，则可认为其从未有效存在过；
- 一个引用在最后一次被使用后，就失去有效存在了；

从第二个特征，我们可以解读出两点核心：

- 不可同时 *有效存在* 多个可变引用；
- 不可同时 *有效存在* 可变和不可变引用；

```rust
fn main() {
  // 引用不存在所有权的移交
  let a = String::from("hello");
  let b = &a;
  println!("{}", b); // 打印
  println!("{}", a); // 打印

  // 只能同时存在一个可变引用
  let mut a = String::from("hello");
  let b = &mut a;
  let c = &mut a;
  println!("{}, {}", b, c); // 报错

  // 可以同时存在多个不可变引用
  let mut a = String::from("hello");
  let b = &a;
  let c = &a;
  println!("{}, {}", b, c);

  // 不能同时存在可变引用和不可变引用
  let mut a = String::from("hello");
  let b = &a;
  let c = &mut a;
  println!("{}, {}", b, c); // 报错，因为 b 和 c 还未使用，他们还是有效的，此时无法创建可变引用

  // 引用作用域结束于它最后一次被使用
  let mut a = String::from("hello");
  let b = &a;
  println!("{}", b); // b 的作用域结束
  let c = &mut a;
  println!("{}", c); // 打印

  let mut a = String::from("hello");
  demo(&mut a);
  demo(&mut a); // 两个 demo 中的引用先后创建和失效，不存在冲突
  println!("{}", a); // 打印 hello, world, world

  let mut a = String::from("hello");
  let mut b = &mut a;
  let mut c = &mut a;
  demo(&mut c); // 报错，b 在后续使用，仍有效存在
  demo(&mut b);

  let mut a = String::from("hello");
  let b = &a;
  {
    let b = &mut a; // 报错，父级作用域中的引用会在当前作用域结束后使用，所以其仍然是有效存在的
  }
  println!("{}", b);
}

fn demo(a: &mut String) {
  a.push_str(", world")
}
```

> \* 上述示例所阐述的规则不必死记硬背，我们只需要完整理解前面提及的两点即可应对，另外，编译器也会给我们足够明白的提示。

#### 借用（Borrowing）
> 借用是有效引用的实现机制（*mechanism*），与 *Move Ownership* 相对应。

\* 被 *借用* 是一个引用是 *有效引用* 的条件：

创建引用时，我们是在栈中存储了一个指针指向一个变量（*Variable*），该指针在未被使用前，即没有 *Handle* ，无法改变最终指向的 *Value* ，反之，*Value* 被其他 *Handle* 改变时，就该指针而言也没有可影响的 *Handle*，此时该指针不是有效存在的。只有在该指针被使用（发生借用）后，双方的 *Handle* 才会互相影响。

我们在编写代码的过程中，需要清楚代码的整个执行过程，当一个值同时存在多个 *有效引用* 的时候，值的内容将可能是我们不可预知的，为了程序安全起见，*Rust* 禁止了这种行为。

#### 悬空引用（Dangling References）
> 所谓悬空引用，即引用的变量的作用域结束后，该引用仍被使用。

```rust
fn demo() -> &String {
  let s = String::from("hello");
  &s // 错误，引用在这里被借调（borrowing）给其他作用域，但此时所引用的变量 s 的作用域随函数结束而结束了，从而无法编译通过
}

// 可以使用静态生命周期
fn demo() -> &'static str {
  let s = String::from("hello");
  let s = Box::leak(s.into_boxed_str()); // 转换为拥有静态生命的 str 引用
  s
}
```

### 切片（Slice）
> 切片（*Slice*）就是引用（*Reference*），只不过引用的是值（*Value*）的其中一个连续部分（*continuous part*），不是对整个值的完整引用。

| 官方文档示例 |
| :--: |
| ![slice](./slice.svg) |

#### 字符串切片（String Slice）

> *A string slice is a reference to part of a String.*

#### `&str`

> 字面量是直接编译存储到二进制文件里面的，而 `&str` 就是对二进制文件中字面量的不可变切片引用（*&str is an immutable reference*）。（*string literals being stored inside the binary. it’s a slice pointing to that specific point of the binary.*）

字符串字面量 `str` 同其他程序语句一样，在编译的时候就直接编成了二进制码，我们使用的时候就是通过引用 `&str` 来指向二进制文件中的地址来调用它，因而它的生命是程序全周期的，也无法对其进行修改，若想修改则需要复制一份到内存中来调用，即创建一个同值的 `String` 类型的字符串（如 `String::from("hello")`, `"hello".into()`, `"hello".to_owned()`, `"hello".to_string()`等）。
`String` 则是一个程序动态类型，在程序执行的过程中动态创建于堆上，可以对其进行修改。
