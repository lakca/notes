---
title: V
date: 2021-03-22T07:01:30.074Z
---

- [特性](#特性)
  - [基础（`General`）](#基础general)
  - [安全特性（`Safety`）](#安全特性safety)
  - [变量（`Variable`）](#变量variable)
  - [类型（`Type`）](#类型type)
  - [函数（`Function`）、~~类（Class）~~、~~指针（Pointer）~~ 等](#函数function类class指针pointer-等)
  - [操作符（`Operators`）](#操作符operators)
- [变量和常量（`Variable and Constant`）](#变量和常量variable-and-constant)
  - [变量（`Variable`）](#变量variable-1)
  - [常量（`Constant`）](#常量constant)
- [类型](#类型)
  - [字符串（`String`）](#字符串string)
  - [数字（`Number`）](#数字number)
  - [数组（`Arrays`）](#数组arrays)
    - [固定大小数组（`Fixed Size Arrays`）](#固定大小数组fixed-size-arrays)
  - [映射（`Maps`）](#映射maps)
  - [枚举（`Enums`）](#枚举enums)
  - [联合类型（`Sum`）](#联合类型sum)
  - [可选枚举（`Option & Result`）](#可选枚举option--result)
  - [零值（`Zero Value`）](#零值zero-value)
  - [类型推断（`Type Infer`）](#类型推断type-infer)
  - [类型别名（`Type Alias`）](#类型别名type-alias)
- [函数（`Function`）](#函数function)
  - [返回多个值（`Returning Multiple Values`）](#返回多个值returning-multiple-values)
  - [命名参数和参数默认值（`Named Arguments & Default Arguments`）](#命名参数和参数默认值named-arguments--default-arguments)
  - [剩余参数（`Rest Argumnents`）](#剩余参数rest-argumnents)
  - [参数解构（`Decomposition`）](#参数解构decomposition)
  - [匿名函数（`Anonymous Function`）](#匿名函数anonymous-function)
- [面向对象：结构（`Struct`）](#面向对象结构struct)
  - [接口（`Interface`）](#接口interface)
- [联合类型（`Union`）](#联合类型union)
- [模块（`Modules`）](#模块modules)
- [语句（`Statement`）和表达式（`Expression`）](#语句statement和表达式expression)
  - [`if`](#if)
  - [`match`](#match)
  - [`in` / `!in`](#in--in)
  - [`for`](#for)
    - [`for in`](#for-in)
  - [类型检查和强制转换（`Type Checks & Casts`）](#类型检查和强制转换type-checks--casts)
    - [`if`](#if-1)
    - [`match`](#match-1)
- [属性（`Attributes`）](#属性attributes)
  - [`[deprecated]`](#deprecated)
  - [`[inline]`](#inline)
  - [`[heap]`](#heap)
  - [`[if flag]`](#if-flag)
  - [`[keep_args_alive]`](#keep_args_alive)
  - [`[unsafe]`](#unsafe)
  - [`[manualfree]`](#manualfree)
  - [`[typedef]`](#typedef)
  - [`[windows_stdcall]`](#windows_stdcall)
  - [`[console]`](#console)
- [`$`](#)
  - [字符串插值](#字符串插值)
  - [编译时标识](#编译时标识)
- [无条件跳转（`goto`）](#无条件跳转goto)

# 特性

1. 如作者自述，与Go相似，同时也受到了Oberon, Rust, Swift, Kotlin, 和 Python等语言影响；
2. 相对Go更优雅的错误处理（Elegant Error Handler）；

## 基础（`General`）

1. 类型（Type）不需要显式声明它实现了接口（~~`txxx implements ixxx`~~），只要部署了接口中的所有属性和方法即可；
2. 标识符（Identifier）除了类型使用Pascal风格（`PascalCaseTypeName`），其他都需用Snake风格（`snake_case_identifier`）；
3. 不允许未使用的标识符（~~`Unused Variables（also all unused identifiers）`~~）；
4. 语句末尾没有分号（~~`;`~~）（可以使用花括号（`{}`）来包裹语句）；

## 安全特性（`Safety`）
- No null
- No global variables
- No undefined values
- No undefined behavior
- No variable shadowing
- Bounds checking
- Immutable variables by default
- Pure functions by default
- Immutable structs by default
- Option/Result and mandatory error checks
- Sum types
- Generics

## 变量（`Variable`）

1. 默认不可变（`Default Immutable Variable`）；
2. 不可重复定义（~~`Variable Redefinition`~~）；
5. 声明时须初始化（`Declaration meanwhile Initialization`）；
6. 隐式类型，由初始赋值推断（`Implicit Type Inferred by Initialization`）；
7. 块作用域（`Block Scope`）；
8. 没有全局变量（~~`Global Variable`~~）；

## 类型（`Type`）

1. 静态类型（`Statically Typed`）；
2. 字符串类型实质上是只读的字节数组（`String: Readonly Bytes Array`），并采用UTF-8编码（`UTF-8 String`）；
3. 数字中间可以使用下划线（`_`）隔开，如`1_000_000`；
4. 数组元素的类型必须相同（`homogeneous elements`）;
5. 支持定义多维数组（`Multidimensional Array`）；
6. 可以定义定长（`Fixed Size Array`）数组，与普通类型数组不同的是，定长数组是存在栈（`Stack`）上，访问更高效，而且需要内存更少；
7. 接口不仅可以声明方法（`Interface methods`），还可以声明属性（`Interface fields`）（与TypeScript类似）；
8. 接口还可以定义方法（`Method Implementation on Interface`）;

## 函数（`Function`）、~~类（Class）~~、~~指针（Pointer）~~ 等

1. 只有函数`Function`，没有类（~~`Class`~~），故也没有子类；
2. 函数不可重载（~~`Overload`~~）；
3. 函数支持返回多个值，也可以不返回值；
4. `Struct`支持方法成员，以此类比对象；
5. `Struct`可以内联（Embedded），以此类比子类；
6. `Interface`是既是接口范式也是类型，可以定义成员函数；
7. 当`Struct`由`Interface`包裹时，若接口有同名方法，将只会调用接口的方法，以此类比继承（~~`Inheritance`~~），但与传统继承概念相反；
8. 没有指针（~~Pointer~~），只有引用（`Reference`）；

## 操作符（`Operators`）

1. 除了数字类型与数字类型，操作符两端操作数类型需相同；
2. 不同数字类型间的运算结果具有类型提升；

# 变量和常量（`Variable and Constant`）

## 变量（`Variable`）

- 静态类型（`Static Type`）
- 隐式类型（`Implicit Type`），由初始值决定
- 默认不可变（`Immutable by default`）
- 须初始化（`Declaration with Initialization`）
- 无全局变量（~~`Global Variable`~~）
- snake_case（`snake_case`）
- 块作用域（`Block Scope`）
- 不支持变量遮蔽（~~`No Variable Shadowing`~~）（子域不可声明父域同名变量）
  - \* 但可以遮蔽引入的模块（`Shadowing Imported Modules`）

```v
// 默认不可变
a := 1
// 可变
mut b := 1
// 明确类型
c := byte(1)
```

块作用域

```v
{
  a := 1
  println(a) // 1
}
a := 1
println(a) // 1
```

No Shadowing

```v
a := 1
println(a)
{
  a := 1 // no shadowing, compilation error
  println(a)
}
```

Shadowing Modules

```v
import ui
import gg

fn draw(ctx &gg.Context) {
	gg := ctx.parent.get_ui().gg
	gg.draw_rect(10, 10, 100, 50)
}
```

赋值

```v
mut a:= 1
mut b:= 1
a, b = b, a
println('$a, $b') // 2, 1
```

## 常量（`Constant`）

- 只能定义在模块域（`outside pf functions`）
- 名称遵循snake_case（`snake_case`）
- 无法从模块中直接引入（~~`import`~~），使用时需要带模块前缀（`module prefixed`）

```v
const pi = 3.14

const (
  e = 2.71828
  n = 1 + 1 // 编译时计算
)
```

# 类型

- Primitive Types
  - Boolean
    - `bool`
  - String
    - `string`，实际上是只读的 UTF-8 字节数组，由单双引号包裹
  - Number
    - Integer
      - `i8`, `bytes`
      - `i16`, `u16`
      - `int`（32位，默认）, `u32`
      - `i64`, `u64`
      - `i128`, `u128`
    - Character
      - `rune`，unicode code point，可以理解为单个字符，实际上是一个整型数字，由反引号包裹，如 <code>int(\`🚀\`) == 128640</code>；
    - Floating-Point:
      - `f32`
      - `f64`（默认）
  - *C* Types
    - `byteptr`：`byte*`
    - `voidptr`：`void*`
    - `charptr`：`char*`
    - `size_t`
  - `any`，任意，类似*C*的`void*`
- Array
- Map
- Enum
- Interface
- Struct

## 字符串（`String`）

> In V, a string is a *read-only array of bytes*. String data is encoded using *UTF-8*. String values are *immutable*.

- 字符串实际是一个只读的定长的字节数组（`read-only array of bytes`）；
- `UTF-8` 编码；
- 标识:
  - `''`
  - `""`
  - `r""`, `r''`，原始字符串，不解释转义字符 `println(r'hello\nworld') // 'hello\nworld'`
- 连接:
  - `+`
  - `+=`
- 索引：
  - 索引（`indexing`）的是字节（`byte`），而不是字符（~~`character`~~）；
  - `'hello'[0] // 104`
  - `rune('hello'[0]) // h`
- 切片:
  - 不支持负数索引（~~`negative index`~~）；
  - `s[..n]`
  - `s[m..]`
  - `s[m..n]`
- 插值
  - `'$m plus $n is ${m + n}'`
  - `'$n padded with 10 spaces on the left is ${n:10}'`
  - `'$n padded with 10 spaces on the right is ${n:-10}'`
  - `'Number $n padded with 10 0s on the left is ${n:010}'`
- 转换数字
  - 数字开头（包括小数点）
    - `'1foo'.int() // 1`
    - `'1.foo'.f64() // 1.`
    - `'.1.foo'.f64() // 0.1`
  - 非数字开头（其他）
    - `'foo1'.int() // 0`
    - `'foo1.1'.f64() // 00e+00`

## 数字（`Number`）

- 变量声明时，未明确指定类型时：
  - 整型默认为 `int`
  - 浮点型默认为 `f64`
- 字面量支持
  - 二进制 `0b10`
  - 八进制 `0o17`
  - 十进制 `12`
  - 十六进制 `0x3F`
- 支持使用分隔符`_`；（如 `1_000_000`, `0b0_11`, `3_122.55`, `0xF_F`, `0o17_3`）
- 类型互相转换；（如，`i64(10)`, `byte(42)`, `f32(3.14)`）
  - \* 当转换到的类型长度较小时，若溢出长度范围，将会产生不确定的结果；
  - \* 整型和浮点之间也可以相互转换，但要注意长度范围：
    - 浮点转换成整型时，表示的长度将会减半，即浮点数整数部分必须小于整型最大值的一半才可以正确转换（切掉小数部分）；
- 支持`i++`，不支持 ~~`++i`~~；

## 数组（`Arrays`）

- 数组元素类型相同（`homogenous elements`），类似 `Rust` 的 `Vector`；
- 声明：
  - 完整声明：
    - `a := []int{ len: 2, init: 0, cap: 10 }`
    - `len`: 只读，设置初始长度，默认为**零值**（即 0）；
    - `init`: 设置初始默认值，默认为**零值**；
    - `cap`: 设置数组容量。设置该值后在容量范围内插入新值不会重新分配内存（Reallocation）；
  - 简略声明
    - `a := []int`
  - 字面量
    - `a := [1, 2, 3]`，类型由第一个元素确定；
  - 多维数组（Multidimensional Arrays）
    - 简略声明：`arr_2d := [][]int{}`
    - 完整声明：`arr_2d := [][]int{len: 2, init: []int{init: 1, len: 3}}`
- push：
  - 一个元素：`a << 1`
  - 数组：`a << [1, 2]`
- slice：
  - `a[1..2]`
  - `a[1..]`
  - `a[..2]`
- in：
  - `1 in a`
- 实例函数：
  - `fn map`：映射函数
    - 表达式写法：`a.map(it.to_upper())`，其中`it`是builtin变量；
    - 回调函数写法：`arr.map(fn (e string) string { return e.to_upper() })`
  - `fn filter`：过滤函数
    - 与`fn map`写法相同；
  - `fn sort`：排序函数
    - 只能使用表达式写法：`arr.sort(a > b)`，其中`a`, `b`是builtin变量；
  - `fn clone`：复制数组
  - `fn str`：转换成字符串
    - `println`自动调用；

### 固定大小数组（`Fixed Size Arrays`）

- 固定大小数组存在栈（`Stack`）中，访问更高效，占用内存空间更小；
- 固定大小数组无法使用大多数普通数组的方法，若要使用需转换成普通数组；

```v
mut arr := [3]int{}
```

## 映射（`Maps`）

- 可以将映射理解为“关联数组（Associate Arrays）”：
  - 键顺序为插入的先后顺序；
  - 键和值都有同一类型（homogenous type）；
  - 键的类型可以为：`string`, `rune`, `integer`, `float`, `voidptr`；
  - 复杂结构应该使用结构（`struct`）；

基础用法：

- 声明：
  - 属性定义：`m := map[string]int{}`
  - 字面量：`m := map{ 'a': 1, 'b': 2 }`
  - \* 未用引号包裹的键名为标识符：`m := map{ a: 1, b: 2 }`
  - 多行可以省略逗号：
```v
m := map{
  'a': 1
  'b': 2
}
```

- 访问成员：`m['x']`
  - 若访问的成员不存在，返回零值：`m['y'] == 0`
  - 若访问的成员不存在，也可以抛出错误：`mz := m['z'] or { panic('z not found')) }`
- 赋值：`m['y'] = 1`
- 检查键名是否存在：`'x' in m`

## 枚举（`Enums`）

## 联合类型（`Sum`）

- 声明：`s := Int | f32`

## 可选枚举（`Option & Result`）
## 零值（`Zero Value`）

- 可以简单理解为各种类型的值不存在时的值。
- 零值与类型有关，而不是字面量0，各类型的零值各不相同；

零值的作用：

1. 语言内部可以给各种类型定义默认值，如：`a := []int{} println(a[0] == 0)`；
2. 可以快速地安全访问未赋值（在声明时确定的范围之内）的属性，如：`m :=map[string]int{} println(m['x'] == 0)`；

各种类型的零值：

- `integer`: `0`
- `float`: `0e+00`（浮点类型0）
- `string`: `''`
- `rune`: <code>``</code>
- `array`: `[]`
- `map`: `{}`

## 类型推断（`Type Infer`）

- 整数默认是`int`
- 浮点数默认是`f64`
- 数组由第一个元素推断

## 类型别名（`Type Alias`）

> 类似于 `Rust` 。

# 函数（`Function`）

- 没有参数默认值（~~`default arguments`~~）
- 没有命名参数（~~`named arguments`~~）
- 支持高级函数（`supoort high order functions`）
- 支持匿名函数（`supoort anonymous functions`）
- 支持返回多个值（`return multiple values`）

```v
fn demo() { ... }

fn demo2(a int) { ... }

fn demo3(a int) bool { ... }
```

## 返回多个值（`Returning Multiple Values`）

```v
fn foo() (int, int) {
	return 2, 3
}
```

## 命名参数和参数默认值（`Named Arguments & Default Arguments`）

> 虽然函数不支持命名参数和参数默认值，但可以使用`struct`作为参数来实现命名参数和参数默认值。

```v
struct ButtonConfig {
	text        string
	is_disabled bool
	width       int = 70
	height      int = 20
}

struct Button {
	text   string
	width  int
	height int
}

fn new_button(c ButtonConfig) &Button {
	return &Button{
		width: c.width
		height: c.height
		text: c.text
	}
}
// 命名参数，结构名和括号都可以省略，但该结构必须是最后一个参数
button := new_button(text: 'Click me', width: 100)
// 默认值
assert button.height == 20
```

## 剩余参数（`Rest Argumnents`）

```v
fn sum(a ...int) {
	mut total := 0
	for x in a {
		total += x
	}
	println(total)
}

sum()
sum(1)
sum(2, 3)
```

## 参数解构（`Decomposition`）

```v
a := [2, 3, 4]
sum(...a)
```

## 匿名函数（`Anonymous Function`）

> 即函数可以作为值（`function is value`），包括赋值给变量、数组元素、字典元素等。

```v
double_fn := fn (n int) int {
  return n + n
}
```

# 面向对象：结构（`Struct`）

- 通过内嵌（`Embed`）混入（`mixin`）其他结构的属性和方法（类比JavaScript的`Object.assign`），不支持继承（~~`subclassing or inheritance`~~）
- 属性默认私有（`private fields by default`）
- 属性默认不可变（`immutable fields by default`）
- 属性默认为零值（`zero value by default`）
- 私有的意思是私有于所在模块（`private is module scope`）
- 方法定义必须和结构在同一个模块

语法

```v
/* 定义属性（fields） */

struct Foo {
// 私有, 不可变
	x int            // 隐式默认值（零值）
	y int = -1       // 显式默认值
	x int [required] // 必选域

// 私有, 可变
mut:
	a int
	b int

// 公有, 不可变
pub:
	c int

// 公有, 可变（在父模块内）
pub mut:
	d int

// 公有，可变
__global:
	e int
}

/* 定义方法（methods） */

fn (f Foo) hi() bool {
  return f.a > f.b
}
```

内嵌（`Embed`）

```v
struct Widget {
mut:
	x int
	y int
}

struct Button {
	Widget // embed
	title string
}

mut button := Button{
	title: 'Click me'
}
button.x = 3
```

操作

```v
struct Point {
	x int
mut:
	y int
}

fn (p Point) add() int {
  return p.x + p.y
}

// 创建
mut p := Point{
  x: 1 // 换行时，逗号可选
  y: 2,
}
mut q := Point{}

// 赋值（已知类型后，可以省略结构名称）
q = { x: 1, y: 2 }
q = { ...p, x: 10 }

// 更新

p.y = 10

// 访问
p.add()
q.add()
```

堆结构（`heap struct`）

- 创建的`struct`是分配在`stack`的，可以通过引用标注的方式使之分配在`heap`

```v
struct Point {
	x int
	y int
}

p := &Point{10, 10}
// References have the same syntax for accessing fields
println(p.x)
```


## 接口（`Interface`）

- 不需要被类型明确部署（~~`type literally implements interfaces`~~），只要实现了接口内的属性和方法即可（`duck interface`）
- 既可以定义方法，也可以定义属性（`define both fields and methods`）
- 接口可以部署方法（`interface implements methods`）

```v
interface Adoptable {
  bread string
}

fn (a Adoptable) speak() string {
	return 'adopt me!'
}

struct Cat {
	bread string
}

fn (c Cat) speak() string {
	return 'meow!'
}

// 构造的 Cat 被 Adoptable 包裹
fn new_adoptable(bread string) Adoptable {
	return Cat{bread}
}

cat := new_adoptable('Leonberger')
assert 'adopt me!' == cat.speak() // adopt me!

if cat is Cat {
  assert 'meow!' == cat.speak() // meow!
}
```

# 联合类型（`Union`）

# 模块（`Modules`）

> Every file in the root of a folder is part of the same module. Simple programs don't need to specify module name, in which case it defaults to 'main'.

- 目录即模块（`directory (name) is module (name)`）
- 模块名遵循snake_case（`snake_case`），且少于10个字符
- 禁止循环引用（~~`circular imports`~~）
- 支持初始化函数（`initialization function`），在引入模块时执行。
- 模块都会编译进单个可执行文件中（`all modules compiled into executable`）

> 若想导出子模块（`sub modules`），需要在根目录（`project root`）创建 `v.mod` 文件，可通过执行 `v init` 命令创建。

模块结构

```
- mymod
  - submod
    - *.v
    ...
  - *.v
  ...
- entry.v
- v.mod
```

Module

```v
/* mymod/*.v */

module mymod // 注明归属模块，否则为普通文件

// 暴露函数
pub fn hi() {
  println('hi from mymod')
}

// 初始化函数，名称为 init, 为私有函数
fn init() {
 println('importing mymod!')
}
```

Sub Module

```v
/* mymod/submod/*.v */

module submod

pub fn hi() {
  println('hi from mymod.submod')
}
```

引入模块（`Import`）

```v
import mymod
import mymod.submod // 子模块
mymod.hi()
submod.hi()
```

模块别名（`Import with Aliasing`）

```v
import mymod as my
import mymod.submod as sub
my.hi()
sub.hi()
```

选择性引入（`Selective Import`）

- 不能引入常量，常量使用必须带前缀
- 选择性引入不可起别名

```v
import mymod.submod { hi }
hi()
```

# 语句（`Statement`）和表达式（`Expression`）

## `if`

- 条件必须是布尔值（`condition must be bool type`）
- 条件不加括号（~~`parentheses`~~）
- 执行语句必须加括号（`braces required`）
- 条件判断不要求完整（`exhaustive not required`）

语句（`Statement`）

```v
if true { println(1) }
```

表达式（`Expression`）

```v
println(if true { 1 } else { 0 })
```

类型检查和转换（`Type Checks & Casts`）

## `match`

> 模式匹配，可测试的包括值、类型、范围等，参考 `Rust` 的模式匹配。

- 匹配分支必须完全（`Exhaustive Required`）
- 既可以是语句又可以是表达式（`Being Statement or Expression`）
- 当测试枚举变量（`Enum`）时，如果条件分支是完全的，不允许添加 `else` 分支（`No Else if Exhaustive`）。

值

```v
x := 1
match x {
  1 { 'one' }
  2 { 'two' }
  else { 'many' }
}
```

类型（`Type Checks & Casts`）

> 只可以检查接口（`interface`）或组合类型（`sum ype`）的成员类型。

```v
struct Cat {}
struct Dog {}
type Animal = Cat | Dog
a := Animal(Cat{})

println(match a {
  Cat { 'meow' }
  Dog { 'wow' }
})
```

范围

```v
c := `v`
println(match c {
	`0`...`9` { 'digit' }
	`A`...`Z` { 'uppercase' }
	`a`...`z` { 'lowercase' }
	else { 'other' }
})
```

枚举

```v
enum Color {
	red
	blue
	green
}

fn is_red_or_blue(c Color) bool {
	return match c {
		.red, .blue { true } // comma can be used to test multiple values
		.green { false }
	}
}
```

## `in` / `!in`

- 检测 `array` 是否存在某个值
- 检测 `map` 是否存在某个键

## `for`

```v
mut a := 0

// conditional
for a <= 100 {
  a++
}

// unconditional
for {
  a++
  if a >= 200 {
    break
  }
}

// C style
// Here i doesn't need to be declared with mut since it's always going to be mutable by definition.
for i := 0; i < 10; i++ {
  continue
}
```

### `for in`

- `array`
- `map`
- `numeric range`

```v
// range 不可索引
for e in 0..10 { println(e) }
for e in `a`..(`z` + 1) { println(e) }

// array 可以索引
for e in [1,2,3,4,5] { println(e) }
for i, e in [1,2,3,4,5] { println('$i, $e') }

for k, v in { 'a': 1, 'b': 2 } { println('$k: $v') }

// 通过 _ 占位，忽略参数
for _, v in { 'a': 1, 'b': 2 } { println('$v') }
```

## 类型检查和强制转换（`Type Checks & Casts`）

> 可变变量（`Mutable`）做强制转换（`cast`）是不安全的，如若必要，需要在变量前加上`mut`标识。

### `if`

```v
struct Cat {}
struct Dog {}
type Species = Cat | Dog

/* Immutable */
a:= Species(Cat{})

/* 类型检查和转换（`check and cast`） */
if a is Cat {
  println('meow')
}
/* 否定检查 */
if a !is Cat {
  println('woof')
}

/* Mutable */
mut b := Species(Dog{})

/* mut 标识 */
if mut b Dog {
  println('woof')
} else {
  print('meow')
}
```
### `match`
```v
match a {
  Cat {
    println('meow')
  }
  else {}
}
match mut b {
  Dog {
    println('woof')
  }
  else {}
}
```

# 属性（`Attributes`）

- 属性（`Attributes`）是编译指令（`compiler instructions`）
- 写在声明之前，用于修饰函数（`function`）、结构体（`struct`）和枚举（`enum`）的声明（`'s declaration`）

## `[deprecated]`

> 调用函数时抛出废弃警告。

```v
[deprecated] fn demo() {}

[deprecated]
fn demo2() {}
```

## `[inline]`

> 内联该函数，即将函数体直接编译到被调用的地方。

内联函数没有调用负载、可能被编译优化，但可能增加编译体积，使用时根据实际进行权衡。
如当函数被调用的地方较少，但次数较多时（如循环），可以使用内联函数来进行优化。

## `[heap]`

> 修饰结构体：将结构体分配到堆（`heap`），故只能使用引用（`reference`）的方式调用该结构体。

```v
[heap]
struct Window {
  name string
}
window := &Window {
  name: 'main'
}
println(window) // 引用
println(*window) // 解引用
```

## `[if flag]`

> 指示编译器是否生成该函数和所有调用该函数的代码，其中 `flag` 为编译时给 `-d` 选项传入的参数，可自定义。

```v
// V will not generate this function and all its calls if the provided flag is false.
[if debug]
fn foo() {}
fn bar() {
  foo() // will not be called if `-d debug` is not passed
}
```

```v
[if debug]
fn foo() {}

// v -d debug foo
```

## `[keep_args_alive]`

> 指示传入函数的指针类型参数在函数未返回前（if in use）不会被GC。

```v
// The memory pointed to by the pointer arguments of this function will not be
// freed by the garbage collector (if in use) before the function returns
[keep_args_alive]
fn C.my_external_function(voidptr, int, voidptr) int
```

## `[unsafe]`

> 指示该函数需要在 `unsafe {}` 中调用，但函数体内的程序是否安全由该函数自行定义（函数体内程序不安全时仍需要 `unsafe {}` 包裹）。

```v
// Calls to following function must be in unsafe{} blocks.
// Note that the code in the body of `risky_business()` will still be
// checked, unless you also wrap it in `unsafe {}` blocks.
// This is usefull, when you want to have an `[unsafe]` function that
// has checks before/after a certain unsafe operation, that will still
// benefit from V's safety features.
[unsafe]
fn risky_business() {
	// code that will be checked, perhaps checking pre conditions
	unsafe {
		// code that *will not be* checked, like pointer arithmetic,
		// accessing union fields, calling other `[unsafe]` fns, etc...
		// Usually, it is a good idea to try minimizing code wrapped
		// in unsafe{} as much as possible.
		// See also [Memory-unsafe code](#memory-unsafe-code)
	}
	// code that will be checked, perhaps checking post conditions and/or
	// keeping invariants
}
```

## `[manualfree]`

> 指示`v`的自动释放引擎不会管理该函数里面的内存（需要编程者自行释放）。

## `[typedef]`
> 仅在与C交互时使用，指示结构体使用C语言的`typedef struct`来定义。

```v
// For C interop only, tells V that the following struct is defined with `typedef struct` in C
[typedef]
struct C.Foo {
}
```

## `[windows_stdcall]`
> 修饰函数：仅在写win32 API代码需要传递回调函数时使用。

```v
// Used in Win32 API code when you need to pass callback function
[windows_stdcall]
fn C.DefWindowProc(hwnd int, msg int, lparam int, wparam int)
```

## `[console]`

> 修饰函数：仅针对windows系统，用于明确指定使用console输出。
> 在引入了默认图形库（Graphics Library）时，引入的图形库会优先于console输出，若想在console输出，用该属性指示。

```v
// Windows only:
// If a default graphics library is imported (ex. gg, ui), then the graphical window takes
// priority and no console window is created, effectively disabling println() statements.
// Use to explicity create console window. Valid before main() only.
[console]
fn main() {
}
```

# `$`

## 字符串插值
```v
x := 123.4567

/* 变量访问 */

println('Hello, $x') /* Hello, 123.457 */

/* 表达式 */

println('x = ${x:4.2f}')
/* pad with spaces on the left => [   123.457] */
println('[${x:10}]')
/* pad with spaces on the right => [123       ] */
println('[${int(x):-10}]')
/* pad with zeros on the left => [0000000123] */
println('[${int(x):010}]')
```

## 编译时标识

# 无条件跳转（`goto`）

> 通过`goto`语句无条件地对**同一函数内**的标签（`label`）进行代码跳转。`goto`可以跳过变量初始化，或者跳回访问内存已被释放的代码，故需要在 `unsafe {}` 中使用
