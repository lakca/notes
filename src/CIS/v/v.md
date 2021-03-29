- [特性](#特性)
  - [风格（Style）](#风格style)
  - [变量（`Variable`）、常量（`Constant`）、类型（`Type`）、接口（`Interface`）等](#变量variable常量constant类型type接口interface等)
  - [函数（`Function`）、~~类（Class）~~、~~指针（Pointer）~~ 等](#函数function类class指针pointer-等)
  - [建议](#建议)
  - [操作符](#操作符)
- [类型](#类型)
  - [原始类型（`Primitive Types`）](#原始类型primitive-types)
    - [数字](#数字)
  - [数组（`Arrays`）](#数组arrays)
    - [基础用法](#基础用法)
  - [映射（`Maps`）](#映射maps)
    - [基础用法](#基础用法-1)
  - [联合类型（`Sum`）](#联合类型sum)
  - [零值（`Zero Value`）](#零值zero-value)
  - [类型推断（`Type Infer`）](#类型推断type-infer)
  - [接口（`Interface`）](#接口interface)
- [模块（`Module`）](#模块module)
  - [引入（`import`）](#引入import)
- [语句（`Statement`）和表达式（`Expression`）](#语句statement和表达式expression)
  - [`if`](#if)
  - [类型检查（`Type Checks`）和强制转换（`Type Casts`）](#类型检查type-checks和强制转换type-casts)
    - [`if`](#if-1)
    - [`match`](#match)
- [属性（`Attributes`）](#属性attributes)
  - [`[deprecated]`](#deprecated)
  - [`[inline]`](#inline)
  - [`[heap]`](#heap)
  - [`[if flag]`](#if-flag)
  - [`[typedef]`](#typedef)
  - [`[windows_stdcall]`](#windows_stdcall)
  - [`[console]`](#console)
- [`$`](#)
  - [字符串插值](#字符串插值)
  - [编译时标识](#编译时标识)
- [跳转（`goto`）](#跳转goto)

# 特性

## 风格（Style）

1. 如作者自述，与Go相似，同时也受到了Oberon, Rust, Swift, Kotlin, 和 Python等语言影响；
2. 相对Go更优雅的错误处理（Elegant Error Handler）；
3. 类型（Type）不需要显式声明它实现了接口（~~`txxx implements ixxx`~~），只要部署了接口中的所有属性和方法即可；
4. 标识符（Identifier）除了类型使用Pascal风格（`Pascal Case Type Name`），其他都需用Snake风格（`Snake Case Others`）；

## 变量（`Variable`）、常量（`Constant`）、类型（`Type`）、接口（`Interface`）等

1. 静态类型（`Statically Typed`）；
2. 变量只能定义在函数内，没有全局变量（~~`Global Variable`~~）；
3. 变量具有函数作用域（`Function Scope`）；
4. 不允许存在未使用的标识符（~~`Unused Variables（also all unused identifiers）`~~）；
5. 变量默认不可变（`Default Immutable Variable`）；
6. 变量声明时必须初始化（`Declaration meanwhile Initialization`）；
7. 变量类型没有明确指定时由初始化值进行推断（`Type Inference by Initialization`）；
8. 字符串类型实质上是只读的字节数组（`String: Readonly Bytes Array`），并采用UTF-8编码（`UTF-8 String`）；
9. 数字中间可以使用下划线（`_`）隔开，如`1_000_000`；
10. 数组元素的类型必须相同（`homogeneous elements`）;
11. 支持定义多维数组（`Multidimensional Array`）；
12. 可以定义定长（`Fixed Size Array`）数组，与普通类型数组不同的是，定长数组是存在栈（`Stack`）上，访问更高效，而且需要内存更少；
13. 接口不仅可以声明方法（`Interface methods`），还可以声明属性（`Interface fields`）（与TypeScript类似）；
14. 接口还可以定义方法（`Method Implementation on Interface`）;

## 函数（`Function`）、~~类（Class）~~、~~指针（Pointer）~~ 等

1. 只有函数`Function`，没有类（~~Class~~），故也没有子类；
2. 函数不可重载（~~Overload~~）；
3. 函数支持返回多个值，也可以不返回值；
4. `Struct`支持方法成员，以此类比对象；
5. `Struct`可以内联（Embedded），以此类比子类；
6. `Interface`是既是接口范式也是类型，可以定义成员函数；
7. 当`Struct`由`Interface`包裹时，若接口有同名方法，将只会调用接口的方法，以此类比继承（~~Inheritance~~），但与传统继承概念相反；
8. 没有指针（~~Pointer~~），只有引用（`Reference`）；

## 建议

1. 类型名称以Pascal Case模式命名；
2. 除类型名称，其他标识符以Snake Case模式命名；

## 操作符

1. 除了数字类型与数字类型，操作符两端操作数类型需相同；
2. 不同数字类型间的运算结果具有类型提升；

# 类型

## 原始类型（`Primitive Types`）

- 布尔：`bool`
- 字符串：`string`，实际上是只读的 UTF-8 字节数组，由单双引号包裹
- 数字：
  - 整型：`i8`, `i16`, `int`, `i64`, `i128`, `bytes`, `u16`, `u32`, `u64`, `u128`
    - `int` 始终是32位；
  - 字符：`rune`，unicode code point，可以理解为unicode单个字符，由反引号包裹，如 `🚀`；
  - 浮点：`f32`, `f64`
- `C`类型：
  - `byteptr`：`byte*`
  - `voidptr`：`void*`
  - `charptr`：`char*`
  - `size_t`
- 任意：`any`，类似C的`void*`

### 数字

- 变量声明时，未明确指定类型时，整型默认为 `int`，浮点型默认为 `f64`；
- 字面量支持二进制 `0b01111011`、八进制 `0o173`、十进制 `12`、十六进制 `0x3F`；
- 支持使用分隔符`-`，如 `1_000_000`, `0b0_11`, `3_122.55`, `0xF_F`, `0o17_3`；
- 支持类型互相转换：如，`i64(10)`, `byte(42)`, `f32(3.14)`；
  - \* 当转换到的类型长度较小时，若溢出长度范围，将会产生不确定的结果；
  - \* 整型和浮点之间也可以相互转换，但要注意长度范围：
    - 浮点转换成整型时，表示的长度将会减半，即浮点数整数部分必须小于整型最大值的一半才可以正确转换（切掉小数部分）；

## 数组（`Arrays`）

- 数组元素类型相同；

### 基础用法

- 声明（普通数组，相对于固定大小数组）：
  - 完整声明：`a := []int{ len: 2, init: 0, cap: 10 }`
    - `len`: 只读，设置初始长度，默认为零值（即 0）；
    - `init`: 设置初始默认值，默认为零值；
    - `cap`: 设置数组容量，可以提高性能：设置该值后在容量范围内插入新值（Insertions）不会重新分配内存（Reallocation）；
  - 简略声明：`a := []int`
  - 字面量：`a := [1, 2, 3]`，类型由第一个元素确定；
  - 多维数组（Multidimensional Arrays）：如二维数组：
    - 简略声明：`arr_2d := [][]int{}`
    - 完整声明：`arr_2d := [][]int{len: 2, init: []int{init: 1, len: 3}}`
- push：
  - 一个元素：`a << 1`
  - 数组：`a << [1, 2]`
- slice：
  - `a[1..2]`
  - `a[1..]`
  - `a[..2]`
- 检测值是否存在：`1 in arr`
- 实例函数：
  - `fn map`：映射函数
    - 表达式写法：`a.map(it.to_upper())`，其中`it`是builtin变量；
    - 回调函数写法：`arr.map(fn (e string) string { return e.to_upper() })`
  - `fn filter`：过滤函数，与`fn map`写法相同；
  - `fn sort`：排序函数
    - 只能使用表达式写法：`arr.sort(a > b)`，其中`a`, `b`是builtin变量；
  - `fn clone`：复制数组
  - `fn str`：转换成字符串，`println`自动调用；
```

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

### 基础用法

- 声明：
  - 属性定义：`m := map[string]int{}`
  - 字面量：`m := map{ 'a': 1, 'b': 2 }`
  - \* 未用引号包裹的键名为标识符：`m := map{ a: 1, b: 2 }`
  - 多行可以省略逗号：
```
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

## 联合类型（`Sum`）

- 声明：`s := Int | f32`

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
- `rune`: ` `` `
- `array`: `[]`
- `map`: `{}`

## 类型推断（`Type Infer`）

- 整数默认是`int`
- 浮点数默认是`f64`
- 数组由第一个元素推断

## 接口（`Interface`）

```v
struct Dog {
	breed string
}

fn (d Dog) speak() string {
	return 'woof'
}

fn (s Speaker) speak() string {
	return 'ha'
}

// unlike Go and like TypeScript, V's interfaces can define fields, not just methods.
interface Speaker {
	breed string
	speak() string
}

dog := Dog{'Leonberger'}
println('a $item.breed says: $item.speak()')
```

# 模块（`Module`）

## 引入（`import`）

> 不允许循环引用。

```v
import os

/* 选择性引入（selective imports），注意：不能引入常量 */
import os { input, user_os }

/* 别名，别名只支持模块文件，不支持内部函数或类型 */
import os as osx
import mymod.util as mymodUtil
```

# 语句（`Statement`）和表达式（`Expression`）

## `if`

> 1. 条件表达式不加括号（~~`parentheses`~~）；
> 2. 大括号是必须的（`braces`）；
> 3. 条件匹配必须是完整的（`exhaustive`）；
> 4. 既可以是语句（`Statement`），也可以是表达式（`Expression`）；

```v
a := 2
b := 1
/* 语句 */
if a > b {
  println('a')
} else {
  println('b')
}

/* 表达式 */
println(if a > b { 'a' } else { 'b' })
```

## 类型检查（`Type Checks`）和强制转换（`Type Casts`）

> 可变变量（`Mutable`）做强制转换（`cast`）是不安全的，如若必要，需要在变量前加上`mut`标识。

### `if`
```v
struct Cat {
  foo string
}
struct Dog {
  bar string
}
type Species = Cat | Dog

/* Immutable */
a:= Species(Cat('abc'))

/* 强制转换和检查（`cast and check`） */
if a is Cat {
  println('meow')
}
/* 否定检查 */
if a !is Cat {
  println('woof')
}

/* Mutable */
mut b := Species(Dog('abc'))

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

> 属性（`Attributes`）是编译指令（`compiler instructions`），用于修饰函数（`function`）、结构体（`struct`）和枚举（`enum`）的声明（`declaration`）。

## `[deprecated]`
> 修饰函数：调用函数时抛出废弃警告。

## `[inline]`
> 修饰函数：内联调用函数，即将函数体直接编译到被调用的地方。

## `[heap]`
> 修饰结构体：将结构体分配到堆（`heap`），故调用结构体时需要使用引用（`reference`）的方式。

## `[if flag]`
> 修饰函数：指示编译器是否生成该函数和该函数的所有调用代码，其中`flag`为编译时给`-d`传入的参数，可自定义。

```v
[if debug]
fn foo() {}

// v -d debug foo
```

## `[typedef]`
> 修饰结构体：仅在与C语言交互的时候使用，指示结构体使用C语言的`typedef struct`来定义。

```v
[typedef]
struct C.Foo {}
```

## `[windows_stdcall]`
> 修饰函数：仅在写win32 API代码需要传递回调函数时使用。

```v
[windows_stdcall]
fn C.DefWindowProc(hwnd int, msg int, lparam int, wparam int)
```

## `[console]`
> 修饰函数：仅针对windows系统，用于明确指定使用console输出。
> 在引入了默认图形库（Graphics Library）时，引入的图形库会优先于console输出，若想在console输出，用该属性指示。
> If a default graphics library is imported (ex. gg, ui), then the graphical window takes priority and no console window is created, effectively disabling println() statements. Use to explicity create console window. Valid before main() only.

```v
[console]
fn main() {}
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

# 跳转（`goto`）
> V允许通过`goto`语句无条件地对**同一函数内**的标签（`label`）进行代码跳转。
> `goto`可以跳过变量初始化，或者跳回访问已被释放的内存的代码。
> `goto` allows jumping past variable initialization or jumping back to code that accesses memory that has already been freed, so it requires unsafe.
