- [准备](#准备)
  - [工具](#工具)
  - [约定（Conventions）](#约定conventions)
- [变量（Variables）](#变量variables)
  - [* 常量（Constants）](#-常量constants)
- [控制流程（Control Flow）](#控制流程control-flow)
  - [`if`](#if)
  - [`while`](#while)
  - [`for`](#for)
  - [`loop`](#loop)
- [所有权（Ownership）](#所有权ownership)
  - [有效范围（*Scope*）：](#有效范围scope)
  - [*Move* 和 *Copy*：](#move-和-copy)
- [类型（Types）](#类型types)
  - [数字（Number）](#数字number)
    - [数字字面量（Number Literal）](#数字字面量number-literal)
  - [字符（Character）](#字符character)
  - [元组（Tuple）](#元组tuple)
  - [定长数组（Array）](#定长数组array)
  - [函数（Function）](#函数function)
    - [表达式（Expressions）](#表达式expressions)
    - [语句（Statements）](#语句statements)
  - [引用（Reference）](#引用reference)
    - [借用（Borrowing）](#借用borrowing)
    - [悬空引用（Dangling References）](#悬空引用dangling-references)
  - [切片（Slice）](#切片slice)
    - [字符串切片（String slice）](#字符串切片string-slice)
    - [字符串字面量（*string literals*）](#字符串字面量string-literals)
  - [单元（unit）](#单元unit)
  - [动长数组（Vector）](#动长数组vector)
  - [字符串（String）](#字符串string)
  - [（Hash map）](#hash-map)
  - [指针（Pointer）](#指针pointer)
  - [* Never](#-never)
- [结构（*Struct*）](#结构struct)
  - [元组结构（*tuple struct*）：](#元组结构tuple-struct)
  - [单元结构（*unit struct*）：](#单元结构unit-struct)
  - [自动引用和解引用（*automatic referencing and dereferencing*）：](#自动引用和解引用automatic-referencing-and-dereferencing)
- [枚举（Enum）](#枚举enum)
  - [Option Enum](#option-enum)
    - [`match` 表达式（Match Expression）](#match-表达式match-expression)
    - [`if let` 表达式](#if-let-表达式)
- [模块系统（Module System）](#模块系统module-system)
  - [包（Packages）](#包packages)
  - [库（Crates）](#库crates)
  - [路径（Paths）](#路径paths)
  - [模块（Modules）](#模块modules)
    - [创建模块（`mod`）](#创建模块mod)
    - [加载模块文件（`mod`）](#加载模块文件mod)
    - [暴露模块（`pub`）](#暴露模块pub)
    - [（`crate`）绝对路径](#crate绝对路径)
    - [（`super`）相对路径](#super相对路径)
    - [（`self`）相对路径](#self相对路径)
    - [引入路径（`use`）](#引入路径use)

## 准备

### 工具

*rustup* ：*Rust* 版本和工具链管理工具。（*a command line tool for managing Rust versions and associated tools.*）

- `rustc` 编译 *Rust* 文件；

- `rustup doc` 查看离线文档；
  - `rustup doc --book`：语言教程（*the book*）
  - `rustup doc --reference`：语言参考
  - `rustup doc --nomicon`：语言高级技巧
  - `rustup doc --std [paths|keyword]`：标准库
  - `rustup doc --core [topic]`：核心库

- `rustup completions` 在本地添加命令行自动补全；

- `rustup update` 更新版本；

*Cargo* ：*Rust* 包/项目管理工具。（*Cargo is Rust’s build system and package manager.*）

类似 *nodejs* 的 *npm* 一样，*Cargo* 和 *Rust* 也是在一起安装的。

- `cargo new`/`cargo init` 创建项目/初始化项目；

- `cargo run` 编译并生成可执行文件并运行；

- `cargo check` 编译但不生成可执行文件，用于语法检查；

- `cargo build` 编译并生成可执行文件（*target/debug*），一般用于开发调试，代码未经编译器优化；

- `cargo build --release` 优化编译并生成可执行文件（*target/release*），编译器会进行代码优化，一般用于正式发布、性能测试等；

- `cargo doc` 生成项目文档；

- `cargo test` 执行测试代码；

- `cargo bench` 执行性能测试；

- `cargo publish` 发布项目；

### 约定（Conventions）

- 类型名用 *PascalCase* ；

- 常量用 *UPPER_SNAKE_CASE* ；

- 变量名、函数名、属性名等一般标识符使用 *lower_snake_case* ；

- *Rustonomicon*：Rust 高级技巧（*The Dark Arts of Advanced and Unsafe Rust Programming.*）

- *Rustacean*：Rust 用户（*Rustaceans are people who use Rust, contribute to Rust, or are interested in the development of Rust.*）

## 变量（Variables）

- 默认 *immutable* ；

- 变量名可重复使用（*Shadowing*）；

```rust
let v = 1; // Infer, 隐式类型

let v: u8 = 3; // 显式类型

let v = "v".repeat(v); // Shadowing, 同一变量名可重复使用

let immutable = 1; // Immutable, 默认不可变

let mut mutable = 2; // Mutable, 可变变量
```

### * 常量（Constants）

- 必须声明类型，如 `const MAX: u8 = 100` ；

- 可以在任意域声明，包括全局域；

- 必须是常量表达式，而不能是运行时返回的值；

- 存活于程序运行全程；

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

## 所有权（Ownership）

> 与其他语言通过手动分配和释放内存或者内置内存回收机制不同，Rust 通过编译时对所有权的检查来管理内存。（*In Rust, memory is managed through a system of ownership with a set of rules that the compiler checks at compile time. None of the ownership features slow down your program while it’s running.*）

| 官方文档示例 |
| :--: |
| ![ownership](./ownership.svg) |

*Rust* 并没有采用手动释放内存或者垃圾回收机制（Garbage Collection）来处理内存回收问题，而是结合了二者的优点，选择了一种既可以及时又能够自动的内存释放机制：所有值（*Value*）都由一个所有者（*Owner*）标记，当所有者（*Owner*）的有效域（*Scope*）结束时，那么这个值（*Value*）便会被自动清理掉。

1. 所有者（*Owner*），就是指向该值的变量（*Variable*）。

2. 值（*Value*）的所有者（*Owner*）是可以改变（*Move*）的，比如变量间赋值、作为参数给函数调用、以及函数返回等；

3. 值（*Value*）同时刻只有一个所有者（*Owner*），即当存在上述所有权的移交（*Move*）的操作时，移交前的变量将会失去指向。如果后续在该变量未被再次赋值前调用，为了安全考虑，编译器将会报错而不是返回空指针。

4. 当所有者（*Owner*）的作用域结束时，若值（*Value*）没被移交（*Move*），其值（*Value*）便会被自动 *Drop*。
（*the memory is automatically returned once the variable that owns it goes out of scope.*）。

所有权规则：

- 在 *Rust* 中所有 *value* 都有一个表示其 *owner* 的变量；

- 任何时刻都只有一个 *owner* ；

- 当 *Owner* 超出其 *Scope* 时，*Value* 会被删除；

所有权移交（*Move*）：

  - 变量间赋值

  - 函数参数

  - 函数返回

  - 模式匹配（`match`，`if let`等）

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

### 有效范围（*Scope*）：

> 值（*Value*, *Rvalue*, *右值*）的有效范围就是变量（*Ownership*）的有效范围。

> 变量（*Variable*, *Lvalue*, *左值*）的有效范围：从变量在 *Block Scope* 中出现开始，一直到该 *Block Scope* 结束，变量都是 **可能** 有效的。

> *Block Scope* 一般就是大括号 `{}` 包括的范围。

> 说 *Block Scope* 中变量可能有效是因为，变量的实际有效范围（*Scope*）结束于它最后一次被使用。

由上：

我们可以在同一个 *scope* 中声明同名变量：

```rust
let a = 1;
println!("{}", a);
let a = "ha"; //声明新的 a 的时候，Rust 可以判定旧的 a 已失效
println!("{}", a);
```

### *Move* 和 *Copy*：

\* 以下所提及的 **赋值** 都是指的广义的赋值，包括等号赋值（*assignment*）、传递函数参数（*argument passing*）、函数返回（*function returning*）、模式匹配（*matching*）等涉及到内存拷贝的操作。

**赋值** 操作的对象有两个值，即等号左边的 **左值**（此处左值是狭义的，仅指代被赋值的值） 和等号右边的 **右值**（此处右值是狭义的，仅指代赋值的值）。执行 **赋值** 即将右值的内存拷贝（*Copy*）给左值，其中既包括栈内存（存储对象的指针信息，或者存储非对象的值）又包括堆内存（存储对象的值）。

对于对象来说，它的结构比较复杂：因为对象的动态性，其各属性值并不是在堆中连续存储的，每个属性都需要根据指针在堆中寻址找到其值的位置、根据容量来确定值的内存边界等等。如果我们在赋值对象的时候拷贝堆内存相比于栈将会非常耗时，而很多时候在程序中操作对象时，我们关心的是它的值的内容，并不关心值存储在了内存中的什么位置，尤其是当我们打开外部对象时（如文件），我们的操作一般都是针对原对象的，因而我们可以想到，在很多时候，赋值时若不拷贝堆内存将会是一个非常完美的选择，既可以节省赋值操作的时间，又可以直接操作原对象。因此，就有了 *拷贝栈内存，不拷贝堆内存* 的操作。

但此时将会有个问题：赋值后将会有两个变量（栈内存）同时指向该值（堆内存）。如果我们在不同的地方（函数、线程等等）分别对两个变量进行修改操作，将会操作到同一个对象值上面去，即产生了数据竞争（*Data Races*）。若我们在操作一个值时不能明确知道该值会否被其他地方修改，将会增加编程复杂度，并使操作结果变得不可预期，从而影响程序的安全性。因而，为了程序的安全性，*Rust* 将会在赋值后销毁（*Drop*）源变量（即右值的栈内存）。

以上就是 *Rust* 中值的 *Move*（*Move Ownership*）策略，简单来说就是赋值时拷贝变量（栈），不拷贝值（堆），并将源变量销毁。

与之相对应的，对于非对象赋值（栈拷贝）或者我们就想对某数据类型的对象赋值时也拷贝值（堆拷贝），就是所谓的 *Copy* 策略。

因为 *Rust* 要实现 *“用完即毁”* 的内存释放策略，所以在赋值完成后右值。

## 类型（Types）

- Primitive:
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
    - `tuple`
    - `array`
  - Function Pointer
    - `fn`
  - Reference
  - Slice
  - String slice
    - `str`
  - Unit
    - `()`
  - Pointer
  - Never
    - `!`

### 数字（Number）

- 默认整型为 `i32` 。（*i32: this type is generally the fastest.*）

- 浮点型遵循 *IEEE-754* 标准，默认浮点型为 `f64`。（*because on modern CPUs it’s roughly the same speed as f32, but is capable of more precision.*）

- 只支持基础的算术运算符：加减乘除余 *+-\*/%* ;

- 变量默认不可以超出声明时的类型长度范围，如 `i8` 范围为`0 ~ 255`。
  - 若超出范围开发编译时会检查（Check）报错，但发布编译（`--release`）时不会检查，而是遵循 *two’s complement wrapping* 规则，即一端超出的部分会转到另一端去偏移，如 `let i: i8 = 260; assert_eq!(i, 4)`；

  - 若想编译检查通过，也可以通过声明属性来实现：`#![allow(overflowing_literals)]` ；

#### 数字字面量（Number Literal）

- 支持使用分隔符 `_` ，如 `1_000_000`；

- 除了 `byte` ，其他表示法均可以加类型后缀（*type suffix*），如 `10u8` ；

类型：

- 十进制（*decimal*）: `1000000`, `1_000_000`, `100u8`

- 十六进制（*hex*）: `0xff`

- 八进制（*octal*）: `0o77`

- 二进制（*binary*）: `0b1111`

- 单字节（*byte*） (`u8` only): `b'A'`

### 字符（Character）

> 表示一个 *unicode* 字符，4个字节。

- 4字节大小，代表 *unicode* 字符（*Unicode Scalar Value*），具体范围：*U+0000* ~ *U+D7FF* 和 *U+E000* ~ *U+10FFFF* 。（*char is a ‘Unicode scalar value’, which is similar to, but not the same as, a ‘Unicode code point’.*）

- 字符用单引号 `''` 标注。

```rust
let c = 'A';

let c: char = '😻';
```

### 元组（Tuple）

> 一组长度固定、类型随便的值。（*A finite heterogeneous sequence.*）

- *finite*：长度固定；

- *heterogeneous*：各元素类型可不同；

- *sequence*：可以通过位置索引；

- 支持元素解构；

定义：
```rust
let tup = (10, 'A');

let tup: (i32, char) = (10, 'A');
```
访问：
```rust
let mut tup = (10, 'A');
// 支持解构 destructuring
let (a, b) = tup;
// 支持索引 indexing
let a = tup.0;
// 赋值
tup.0 = 12;
```

### 定长数组（Array）

> 元素类型相同、长度固定的数组。（相对地，长度可变的见 *Vector* ）

- 元素类型相同；

- 长度固定；

- 存于栈（*Stack*）上；

- 只能访问范围内的元素；

定义：
```rust
// 以下等价

/// [T; N] =
let a: [i32; 3] = [0, 0, 0];

/// = [x, y, z...]
let a = [0, 0, 0];

/// repeat expression: The type of x must be trait.Copy.
/// = [x; N]
let a = [0; 3]; // 元素为0，长度为3
```
访问：
```rust
let e1 = a[0];
let e_err = a[10]; // exit with error
```

### 函数（Function）

> `fn` 也是一个原生类型（*Primitive Type*）。（*Function pointers are pointers that point to code, not data.*）

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

#### 表达式（Expressions）

> 表达式：一串返回计算结果的指令。（表达式不包括末尾的分号，加上分号后就是语句）

```rust
let mut a = 1;
let mut b = { a += 2; a };
```

复杂的表达式如：

- 调用函数（*Function*）；

- 调用宏（*Macro*）；

- 块（*Block*: `{}`）；

  - *块是一个表达式，所以块是可以返回值的；

  - 当没有明确返回值的时候，返回的是空元组（`()`）；

```rust
// macro
println!("hello");

// block
let x = { 1 }; // x = 1

let x = {
  let y = 1;
  y + 1 // 注意：由于需要返回值，此处应为表达式，故不加分号
}
```

#### 语句（Statements）

> 语句：一串执行动作但不返回值的指令。当表达式（*Expression*）加上分号 `;` 后，便成了语句（*Statement*）。

```rust
let a = 1;
```

### 引用（Reference）

| 官方文档示例 |
| :--: |
| ![reference](./reference.svg) |

根据之前 *Ownership#Move* 的章节我们知道，直接赋值将会使原来的变量失效，但很多场景下，这不是我们想要的，因此需要一种手段既可以使用原来的值，又不会获取值的 *Ownership* ，于是就有了引用（*Reference*）。

> 引用：在不获取值的所有权（*Move Ownership*）的情况下借用（*Borrowing*）值。(*Reference represents a borrow of some owned value.*)

> *A reference is just a pointer that is assumed to be aligned, not null, and pointing to memory containing a valid value of T.*

> *You can get one by using the `&` or `&mut` operators on a value, or by using a `ref` or `ref mut` pattern.*

引用的使用：

1. 引用也是一个变量（广义左值），其有效作用域同其他变量一样，开始于引用声明，结束于该引用最后一次使用。（*A reference’s scope starts from where it is introduced and continues through the last time that reference is used.*）。

2. 由于引用不会 *Move Ownership*，因此引用可以创建多个，但多个引用也不可造成数据竞争（*Data Races*）。因而可以得出：

   - 可以同时 *有效存在* 多个不可变引用；

   - 不可同时 *有效存在* 多个可变引用；

   - 不可同时 *有效存在* 可变和不可变引用；

引用的特性：

- 引用比较的是地址，而不是值。（*Reference equality by address, instead of comparing the values pointed to.*）

- 动态引用可以强制转换成静态引用；长周期引用可以转换成短周期引用。（*`&mut T` references can be freely coerced into `&T` references with the same referent type, and references with longer lifetimes can be freely coerced into references with shorter ones.*）

```rust
fn main() {
  // 引用不存在所有权的移交
  let a = String::from("hello");
  let b = &a;
  println!("{}", b); // 打印
  println!("{}", a); // 打印

  // 只能同时存在一个有效可变引用
  let mut a = String::from("hello");
  let b = &mut a;
  let c = &mut a;
  println!("{}, {}", b, c); // 报错

  // 可以同时存在多个有效不可变引用
  let mut a = String::from("hello");
  let b = &a;
  let c = &a;
  println!("{}, {}", b, c);

  // 不能同时存在有效可变引用和有效不可变引用
  let mut a = String::from("hello");
  let b = &a;
  let c = &mut a;
  println!("{}, {}", b, c); // 报错

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

> \* 上述示例所阐述的规则不必死记硬背，我们只需要完整理解前面提及的引用的两点特征即可应对，另外，编译器也会给我们足够明白的提示。

#### 借用（Borrowing）

> 引用的实现就叫做借用（*Borrow Value*）。与获取所有权（*Move Ownership*）相对应。

若一个变量只是被赋值了一个引用，而该变量并没有被实际调用，那么这个变量相当于无效变量，引用也是一个无效的引用。

```rust
let mut a = String::from("hello");
let b = &mut a; // b 是一个无效引用，所以并不影响 c
let c = &a;
println!("{}", c);
```

\* 被 *借用* 是一个引用是 *有效引用* 的条件：

创建引用时，我们在栈中存储了一个指针指向一个值（*Value*），该指针在未被使用前，即没有操作柄（*Handle*），无法改变最终指向的值（*Value*），反之，值（*Value*）被其他 操作柄（*Handle*）改变时，就该指针而言也没有可影响的操作柄（*Handle*），此时该指针不是有效存在的。只有在该指针被使用（*Value Borrowed*）后，双方的操作柄（*Handle*）才会互相影响。

#### 悬空引用（Dangling References）
> 所谓悬空引用，即引用的变量的作用域结束后，该引用仍被使用。
> 注意，这是一个错误的用法。

```rust
fn demo() -> &String {
  let s = String::from("hello");
  &s // 错误，引用在这里被借调（borrowing）给其他作用域，但此时所引用的变量 s 的作用域随函数结束而结束了，从而无法编译通过
}

// 可以通过 move 来实现值的返回：
fn demo() -> String {
  let s = String::from("hello");
  s
}

// 当然，也可以使用静态生命周期：
fn demo() -> &'static str {
  let s = String::from("hello");
  let s = Box::leak(s.into_boxed_str()); // 转换为拥有静态生命的 str 引用
  s
}
```

### 切片（Slice）

| 官方文档示例 |
| :--: |
| ![slice](./slice.svg) |

> 切片（*Slice*）是一个特殊引用（*Reference*），引用的是值（*Value*）的一个连续部分（*continuous part*），并且无法通过切片修改值（长度是固定的，相比引用没有容量（*Capacity*）属性）。（*Slices are a view into a block of memory represented as a pointer and a length.*）

#### 字符串切片（String slice）

> *A string slice is a reference to part of a String.*

> *The `str` type, also called a ‘string slice’, is the most primitive string type. It is usually seen in its borrowed form, `&str`. It is also the type of string literals, `&'static str`.*

#### 字符串字面量（*string literals*）

\* 字面量是程序代码的一部分，直接存储在程序文件中，因而程序文件加载后常驻于内存，拥有静态生命周期。

> 在 *Rust* 中，字符串并不是元类型，是由 `char` 组成的对象，类型为 `String` 。而字符串字面量由于其特殊性：常驻内存、只读，故其是对 `String` 类型的切片，用 `&str`  或 `&'static str`）来表示其类型。

> *String literals being stored inside the binary. it’s a slice pointing to that specific point of the binary. They are `'static` because they’re stored directly in the final binary, and so will be valid for the `'static` duration.*）

字符串字面量可以用于创建 `String` 对象：

```rust
let s = String::from("hello");
let s = "hello".into();
let s = "hello".to_owned();
let s = "hello".to_string();
```

### 单元（unit）

> *The `()` type, also called “unit”, has exactly one value `()`.*

*未定义返回值的函数* 或 *没有返回值的表达式* 的隐式（*implicitly*）返回值就是 `()`。

### 动长数组（Vector）

> * Vectors allow you to store more than one value in a single data structure that puts all the values next to each other in memory. Vectors can only store values of the same type.*

```rust
/// 创建空数组
let mut v: Vec<i32> = Vec::new();
let mut v: Vec<i32> = vec![]; /// 字面量
let mut v: Vec<i32> = Vec::with_capacity(3); /// 带有容量声明（可以避免在push数据时需要重新分配内存）

/// 带有初始化的数组
let mut v = vec![1, 2, 3];
let mut v = vec![1; 3]; /// 容量为3，元素为1
```
```rust
let mut v = vec![0, 1, 2];
&v.len();
&v.capacity();

&v.get(0);
&v[0];
&v.get(10); // None
&v[10]; // 报错

&v.push(1);
&v.pop();
```

### 字符串（String）

> *a collection of characters.*

- *UTF-8* 编码；

```rust
let s = String::new();

let s = "hello".to_string();

let s = String::from("hello");
```
```rust
let mut s = String::from("hello");
s.push_str(" world");
s.push('!');
s += "!";
```

### （Hash map）

### 指针（Pointer）

> *Raw, unsafe pointers, `*const T`, and `*mut T`.*

### * Never

> **这是一个试验性的功能。** `!` 表示 *never* 类型，表示没有返回值。(*`!` represents the type of computations which never resolve to any value at all.*)

## 结构（*Struct*）

> 用以创建特定结构的类型。
> 实际上是一组有名字的值（*Fields*）的模版（*Template*）。

- *fields* 的类型不必相同;

- *fields* 没有顺序；

- *struct* 不支持单独定义 *fields* 的可变性（*mutability*），只能够在实例化时定义实例的可变性；

\* *struct* 写法和 *Javascript ES6* 对象相似，均支持点表示法、简写属性、展开语法等，但要注意其中的区别。

定义（*definition*）：

```rust
struct User {
  name: String,
  age: u8,
}
```

实例（*instantiating*）：

```rust
let name = String::from("Mike");
let age = 20;
let mike = User {
  name: name,
  age: age,
};
```

属性简写（*field init shorthand*）：

```rust
let name = String::from("Lily");
let age = 16;
let mut lily = User {
  name,
  age,
};
```

结构更新语法（*struct update syntax*）：

> 从其他结构 *clone* 剩余的属性。（*remaining fields not explicitly set should have the same value as the fields in the given instance.*）

```rust
let jack = User {
  name: String::from("Jack"),
  /// 1. 必须放在最后；
  /// 2. 后面不可有逗号；
  /// 3. 只获取剩余属性；
  ..lily
}
```

方法（*methods*）：

```rust
/// 1. 在 impl 里面定义方法；
/// 2. 可以有多个 impl；
impl User {
  /// 3. self 表示当前结构，为第一个参数；
  fn greet(&self) {
    println!("Hello, I'm {}.", self.name);
  }
  fn grow(&mut self, n: u8) {
    self.age += n;
  }
}

lily.grow(1); // 正常，lily 是 mutable.
lily.greet();

jack.grow(1); // 错误，因为 grow() 需要 mutable，而 jack 是 immutable.
jack.greet();
```

关联函数（*associated functions*）：

> 类比于类的静态方法。

```rust
/// 1. 在 impl 里面定义关联函数；
impl User {
  /// 2. 与方法不同之处是没有第一个参数 self ；
  fn new_born(name: String) -> User {
    User { name, age: 1 }
  }
}
/// 3. 调用使用双冒号::
let tracy = User::new_born(String::from("tracy"));
```

### 元组结构（*tuple struct*）：

> 自定义名称的元组类型。

- *tuple struct instances behave like tuples.*

```rust
fn main() {
  struct Color(i32, i32, i32);
  struct Point(i32, i32, i32);
  let black = Color(0, 0, 0);
  let origin = Point(0, 0, 0);
  /// 1. 用法和 tuple 一样，但归属于不同类型；
}
```

### 单元结构（*unit struct*）：

### 自动引用和解引用（*automatic referencing and dereferencing*）：

> *when you call a method with object.something(), Rust automatically adds in &, &mut, or * so object matches the signature of the method.*

上述例子中结构方法 `grow` 和 `greet` 虽然对 `self` 的使用不同，但是我们调用方法时，并没有什么区别。这里就是 *Rust* 给我们自动引用和解引用了。

## 枚举（Enum）
> 用以创建枚举类型。

- 枚举元素可以定义为任意类型；

无值枚举：

```rust
enum IpAddrKind {
  V4,
  V6,
}
let four = IpAddrKind::V4;
```

有值枚举：

```rust
enum IpAddr {
  V4(u8, u8, u8, u8),
  V6(String),
}
/// 1. 使用双冒号 :: 获取
let home = IpAddr::V4(127, 0, 0, 1);
let loopback = IpAddr::V6(String::from("::1"));
```
```rust
enum Message {
  // 单元结构（unit struct）
  Quit,
  // 匿名结构（anonymous struct）
  Move { x: i32, y: i32 },
  // 元组结构（tuple struct）
  ChangeColor(i32, i32, i32),
}
```

方法（*methods*）：

- 同结构（*Struct*）一样，也可以定义，且写法相同；

```rust
impl Message {
  fn call(&self) {
    // method body would be defined here
  }
}
let m = Message::Write(String::from("hello"));
m.call();
```

获取绑定值：

```rust
match home {
  V4(a, b, c, d) => a,
  V6(a) => a,
}
```

### Option Enum

> *Option Enum* 是 *Rust* 标准库自带的一个枚举类型，用来处理空值的情况。可以直接使用，不需要代码中引入。（*Type Option represents an optional value: every Option is either Some and contains a value, or None, and does not.*）

为了显式地将空值 *null* 表达出来，*Rust* 使用 `Option` 来修饰值的类型：`Option<T>`（其中 `T` 为泛型）。这样在任何非 `Option<T>` 的地方，都可以不用考虑值为 *null* 的情况。这一设计旨在限制 *null* 的普遍性并提高代码的安全性。

```rust
pub enum Option<T> {
  /// Some 用来处理存在值
  Some(T),
  /// None 用来表示不存在值
  None,
}
```
```rust
fn divide(numerator: f64, denominator: f64) -> Option<f64> {
  if denominator == 0.0 {
    // 1. None 用来处理空值或者非法/意外的情况
      None
  } else {
    // 2. Some 用来返回正常范围内的值
      Some(numerator / denominator)
  }
}

let result = divide(2.0, 3.0);

/// 3. 通过 match 操作符来获取值
match result {
  Some(x) => println!("Result: {}", x),
  None    => println!("Cannot divide by 0"),
}
```

#### `match` 表达式（Match Expression）

> 使用 `match` 表达式通过一系列的匹配模式（*Patterns*）来比对（*Matching*）值。

- 匹配到后就返回，不会继续向下匹配；(*the first arm matched, no other arms are compared.*)

- 匹配分支必须完全，尤其是 `Option<T>` 别忘添加 `None` 的匹配;（*Matches Are Exhaustive*）

- 可以使用占位符下划线 `_` 来匹配任意值。（*The _ pattern will match any value.*）

- 匹配的模式可以是字面量、变量名、通配符以及其他等等，具体可见 *Pattern* 章节；

```rust
#[derive(Debug)]
enum UsState {
  Alaska,
  // --snip--
}
enum Coin {
  Penny,
  Quarter(UsState),
}

fn value_in_cents(coin: Coin) -> u8 {
  // 1. match 是表达式，会返回值；
  match coin {
    /// 2. 通过 => 符号分割匹配模式和执行的表达式；
    /// 3. 使用逗号 , 隔开每个分支；
    Coin::Penny => 1,
    /// 4. 使用变量提取值；
    Coin::Quarter(state) => {
      println!("State quarter from {:?}!", state);
      25
    }
  }
}
let v = value_in_cents(Coin::Quarter(UsState::Alaska));
```

#### `if let` 表达式

> 使用 `if let` 可以进行非完整（*non-exhaustive*）匹配。

```rust
let m = Coin::Penny;
if let Coin::Penny = m {
  println!("Penny!");
}
```

也可以完整匹配：

```rust
let m = Coin::Penny;
// 要获取返回值的话，必须完整匹配
let x = if let Coin::Penny = m {
  1
} else {
  25
};
```

## 模块系统（Module System）

### 包（Packages）

> 包（*Package*）是一个包含包配置文件（*Cargo.toml*）和库（*Crates*）的文件夹。（*A package is one or more crates that provide a set of functionality. A package contains a Cargo.toml file that describes how to build those crates.*）

- 一个包（*package*）只可以包含一个库资源文件（*crate library*）树；

- 一个包（*package*）可以包含多个库可执行文件（*crate binary*）树；

### 库（Crates）

> 库（*crate*）是 rust 的一个编译单元。
> 库（*crate*）可以是一个可执行文件（*Crate binary*）的源文件树，或一个库资源文件（*Crate library*）的源文件树。（*A crate is a binary or library. A tree of modules that produces a library or executable.*）

库资源文件（*crate library*）：用于代码引入，所以一个 *package* 只有一个 *crate library*，且与 *package* 同名。

可执行文件（*crate binary*）：用于编译成可执行文件文件直接单独运行，所以可以有多个。

文件树，是因为入口文件可以引入其他依赖文件。

*Cargo* 约定：

- *src/main.rs* 作为 *package* 同名 *crate binary* 的入口文件；

- *src/lib.rs* 作为 *package* 同名 *crate library* 的入口文件；

- *src/bin* 作为一个存放其他 *crate binary* 的文件夹；

### 路径（Paths）

> 通过 *paths* 来定位目标模块或模块资源。
> *paths* 是一串用双冒号（`::`）连起来的标识符，可以理解为一个用于定位模块或模块资源的命名空间链。

```rust
// 加载模块 (src/lib.rs)
pub mod demo; // ./demo.rs

// 引入路径 (src/*)
use std::io;
use crate::demo;

// 直接调用 (src/*)
std::io::stdout();
```

### 模块（Modules）

> 通过模块（*Module*）封装代码，创建作用域（*Scope*）隔离功能层次，并控制代码的可见性（*public or private*）。（*Let you control the organization, scope, and privacy of paths.*）

实际上可以把模块（*module*）理解为一个具名的作用域（*named scope*），特殊之处是在该作用域中可以手动控制其内部资源的暴露并通过特殊方式访问。所以默认情况下，模块有作用域同样的规则：

- 模块内部对模块父域（*parent scope*）默认不可见，通过 `pub` 暴露；

- 同级域的资源（*siblings*）互相可见；

- 父域（*parent scope*）对其中的模块（*module in the scope*）可见；

具体用法：

#### 创建模块（`mod`）

> 通过 `mod` 标记创建模块（*module*）。

```rust
mod a {
  fn demo() {}
}
```

#### 加载模块文件（`mod`）

> 在实际中，不同的功能模块可能需要放在单独的文件、甚至单独的文件夹中进行归类。
> 而 *cargo* 的入口文件是固定的（*src/lib.rs* 和 *src/main.rs*），对于其他文件内的模块，我们将通过 `mod` 来进行加载（可以理解为注册到当前 *crate*）。

1. 加载当前目录下文件：

```rust
mod demo; // 同目录下 demo.rs
```

2. 加载子目录下文件：

```rust
/// src/a/b.rs
pub fn test() {}

/// src/a.rs
pub mod b; // 找向当前文件同名目录

/// src/main.rs
mod a;
a::b::test();
```

3. 加载的同时暴露：
```rust
// 加载，并在当前文件中暴露该模块
pub mod demo;

fn main {
  demo::test()
}
```

#### 暴露模块（`pub`）

> 通过 `pub` 标记暴露模块（*module*）或模块内容（*module inners*）给父域（*parent scope*）。

```rust
pub mod a {
  pub fn demo() {}
}
```

#### （`crate`）绝对路径

> 用 `crate` 表示当前crate根（*current crate root*）。

```rust
// src/lib.rs 是 library 的入口文件，故而 C 应该是 src/lib.rs 文件中的一级 module
crate::C::demo();
```

#### （`super`）相对路径

> 用 `super` 表示父域（*parent scope*），实现相对路径引入。

```rust
fn demo() {};

mod A {
  fn demo1() {
    // 父域始终可见，无需 pub 暴露
    super::demo();
  }

  mod B {
    fn demo2() {
      // 父域始终可见，无需 pub 暴露
      super::demo1();
    }
  }
}
```

#### （`self`）相对路径

> 用 `self` 表示当前域（*current scope*），实现相对路径引入。

```rust
/// 假设当前文件不是crate根文件：
mod A {
  pub mod B {
    pub fn demo() {}
  }
}
self::A::B::demo();
// 或
use self::A::B;
B::demo();
```

模块暴露的详细：

```rust
mod back_of_house {
  /// 1. struct类型：struct 需要声明 pub, 被访问的属性也需要声明 pub；
  /// 若结构本身及其属性有未声明 pub 的，则结构无法在外部使用
  pub struct Breakfast {
    pub toast: String,
    seasonal_fruit: String,
  }
  /// 由于 Breakfast 有私有属性，故需要提供公有的结构函数才可以将结构间接暴露出去
  impl Breakfast {
    pub fn summer(toast: &str) -> Breakfast {
      Breakfast {
        toast: String::from(toast),
        seasonal_fruit: String::from("peaches"),
      }
    }
  }
  /// 2. enum类型：enum 自身声明 pub 即可；
  pub enum Appetizer {
    Soup,
    Salad,
  }
}
pub fn eat_at_restaurant() {
  let order1 = back_of_house::Appetizer::Soup;
  let order2 = back_of_house::Appetizer::Salad;
  let mut meal = back_of_house::Breakfast::summer("Rye");
  meal.toast = String::from("Wheat");
  println!("I'd like {} toast please", meal.toast);
  meal.seasonal_fruit = String::from("blueberries"); // 报错，seasonal_fruit 为私有属性
}
```

#### 引入路径（`use`）

> 通过 `use` 在当前域（*current scope*）中引入路径（*paths*）。相当于在当前域（*current scope*）中给指定路径（*paths*）创建了一个软链接/别名。如 `use std::io; let s = io::stdout();`。(*Adding `use` and a path in a scope is similar to creating a symbolic link in the filesystem. *)

- \* 在 *Rust* 代码中不存在引入（*import*）包一说，只要注册到 *Rust* 或者 *Cargo*（*dependencies*）的 *Crate* 都可以直接调用，如 `std::io::stdout();`。使用 `use` 只是为了清晰代码依赖结构和简便书写 `use std::io; let s = io.stdout();`，

- `use` 默认是绝对路径；

- `use` 支持 *glob* 通配符；

1. 引入当前 *crate* 的 *paths* ：

```rust
use crate::B::demo;
```

2. 引入其他 *crate* 的 *paths* ：

```rust
use std::io;
```

3. 同时引入多个 *paths* ：

```rust
/// self 代表上一级模块本身
use std::io::{self, stdout}; // 同时引入 io 和 stdout
```

4. 通配符匹配 *paths* ：

```rust
use std::io::*; // 引入 io 下面所有 pub 资源
```

5. 更改当前域（*current scope*）中的 *paths* （`use .. as ..`）：

```rust
use std::io::stdout as io_stdout;

use std::io::{self as io, stdout as io_stdout};
```

6. 引入并在当前域暴露 *paths* （`pub use`）：

通过 `pub use` 将引入的内容再次暴露（*re-exporting*）出去。

```rust
pub use B::demo;
demo();
```
