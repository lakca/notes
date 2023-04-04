---
title: Swift
date: 2020-09-08T08:54:35.929Z
---

# 语言

> 安全、快速、交互式（提供解释器）、富有表现力的具有工业品质的编程语言。

## 特性

- 不直接暴露指针/内存，但提供了标准库进行支持
- 数据传递策略是引用还是复制在类型实现（值类型和引用类型）时已经决定
- 自动管理内存，通过严格的引用计数（*Deterministic Reference Counting*）自动进行内存回收，没有垃圾回收对进程的干预
- 完全的Unicode编码
- 强类型（编译时确定类型）
- 静态类型（不可在~~使用中改变变量类型~~）
- 禁止变量遮蔽（*~~Shadowing~~*）
- 变量须初始化后调用
- 整型溢出检测
- 自动推断类型（*Type Inference*）
- 显式处理空值（*Optional*）
- 禁止越界索引（*Out-of-Bounds Errors*）
- 支持元组（*Tuple*）
- 支持多值返回（*Multiple Return Values*）
- 支持[泛型](#泛型generics)（*Generics*）
- 支持[协议](#协议protocol)（*Protocols*）
- 支持类型[扩展](#扩展extension)，包括基本类型（*Extensions*）
- 支持运算符重载（*Operator Overloading*）
- 支持[字符串插值](#插值string-interpolation)（*String Interpolation*）
- 支持[闭包](#闭包表达式)（*Closure*）
- 支持单独定义[实参标签](#实参标签argument-label)（形参和实参可以不同名称）
- 支持[不定参数](#不定参数-variadic-parameter)
- 支持[函数传入和修改引用](#可修改参数-in-out-parameter)
- 支持枚举关联值（*Enumeration Playload*）
- 支持模式匹配（*Pattern Matching*）
- 支持错误捕获，*catch*非必需（`try`、 `catch`、`throw`）
- 常量没有严格的值不可变，对于引用类型只存储引用地址，属性仍然是可变的（类似*Javascript*的常量对象）
- 句尾分号可选 ~~`;`~~（同*Javascript*，换行符和分号均为语句分隔符）
- 等号（`=`）两侧必须同时有或没有空格

## 约定

- 标识符使用*camelCase*（变量、函数等）和*PascalCase*（类、结构、枚举等）命名方式

## 重要概念

- 结构（*Structure*）
- 类（*Class*）
- 扩展（*Extension*）
- 协议（*Protocol*）
- 行为体（*Actor*）

## 文档

- [Getting Started](https://www.swift.org/getting-started/)
- [A Swift Tour][guidedtour]
- [Swift Programming Language](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/)
- [Swift Language Reference][aboutthelanguagereference]
- [Swift Standard Library](https://developer.apple.com/documentation/swift/swift-standard-library)
- [API Design Guidelines](https://www.swift.org/documentation/api-design-guidelines/)

## 工具

- [Swift-DocC](https://www.swift.org/documentation/docc)：为你的Swift项目生成文档

# 变量和常量

- 使用前必须声明；

- Swift是强类型语言，量在声明时必须确定类型：

- 不支持名称遮蔽（二次声明）；

- 命名支持*unicode*字符，但不支持空白字符、数学符号、箭头、[线框字符](https://en.wikipedia.org/wiki/Box-drawing_character)、[私域字符](https://en.wikipedia.org/wiki/Private_Use_Areas)等字符。（*Constant and variable names can’t contain whitespace characters, mathematical symbols, arrows, private-use Unicode scalar values, or line- and box-drawing characters. Nor can they begin with a number, although numbers may be included elsewhere within the name.*）

- 变量名可以使用语言关键字，用反引号（<code>``</code>）包裹即可，但不建议。

## 变量（Variables）

声明时必须确定类型：

```swift
var a: Int = 10
```

初始化不是必须：

```swift
var b: Int
```

但初始化可自动推断类型：

```swift
var b = 1
```

可以在同一行声明多个变量：

```swift
var c = 2, d = 3
var e, f, g: Int
```

## 常量（Constants）

声明时必须确定类型：

```swift
let a: Int = 1;
```

全局声明时必须初始化（*Globally declared with initialized*）：

```swift
let a = 1;
```

局部声明只需在调用前初始化即可（*Scoped initialized before being read*）：

```
let
```

常量可在全局或局部声明（*Globally or Scoped*），且不影响结构等复合类型（*Compound Types*）内属性的可变性：


```swift
// 全局范围内常量必须初始化
let a = 1
let b = 2, c = 3
```

# 类型

获取数据类型：

```swift
print(type(of: "hello"))
```

## 值类型和引用类型（Value Types & Reference Types）

> [值类型（Value Types）][Structures-and-Enumerations-Are-Value-Types]在其被传递时（如赋值给变量、常量或者作为参数传入函数等）会复制数据。[**包括结构（*Structures*）和枚举（*Enumerations*）。**][Structures-and-Enumerations-Are-Value-Types]

> 与值类型相对，[引用类型（Reference Types）][Classes-Are-Reference-Types]在其被传递时只会创建引用，而不会复制数据，前后均指向同一个实例。[**包括类（*Classes*）和行为体（*Actors*）。**][Classes-Are-Reference-Types]

**基础类型（Basic Types）在底层都是通过结构（Structures）来实现的，故均是值类型（Value Types）**。包括数字（`Int`, `Double`）、布尔值（`Bool`）、字符串（`String`）、数组（`Array`）、集合（`Set`）、字典（`Dictionary`）等。(*In fact, all of the basic types in Swift—integers, floating-point numbers, Booleans, strings, arrays and dictionaries—are value types, and are implemented as structures behind the scenes.*)

*为了优化性能，在标准库中定义的集合类型（如数组、字典和字符串等）在传递时不会立即复制，只有在数据被修改前才会被复制。*

## 基本类型（Basic Types）

- 具有推断类型

```swift
let foo: String = "hello"
// 等价于
let foo = "hello"
```

### 字符串（String）和字符（Character）

```swift
let str: String = "hello"
let char: Character = "h"
```

```swift
let str = "hello"
```

使用Unicode码字符：

```swift
print("\u{1F425}") // 🐥
```

字符串和字符混合运算：

```swift
let char: Character = "!"
let chars: [Character] = ["C", "a", "t", "!", "🐱"]
var str = String(chars)
str.append(char)
```

#### 子字符串（Substring）

> [子字符串（Substring）](https://docs.swift.org/swift-book/LanguageGuide/StringsAndCharacters.html#ID555)是引用原字符串（String）内存地址一部分，若需要独立存活需手动复制成字符串。通过下标、切片或某些方法返回（如`prefix(_:)`）得到的字符串均为子字符串，类型为`Substring`。

#### 字符串字面量

字符串和字符均用双引号（`"`）标注：

```swift
let a = "hello"
let b = String("hello")
```
```swift
let a = "h"
let b = Character("i")
```

多行字符串用三个双引号（`"""`）标注，且引号必须在单独一行：

```swift
let multiline = """
1. must begin/end with a newline.
2. end with backslash \
   to skip line break
"""
```

多行字符串首行前的空格忽略，后续行前同数量的空格也被忽略，以下与上同：

```swift
let multiline = """
   1. must begin/end with a newline.
   2. end with backslash \
      to skip line break
"""
```

为了简化转义，多行字符串还可以自定义(v5.0) [扩展定界符](https://docs.swift.org/swift-book/LanguageGuide/StringsAndCharacters.html#ID606)（*Extended String Delimiters*）：

```swift
// 用 # 作为字符串的扩展定界符
print(#"hello\n world""#) // hello\n world"

// 同行注释符号由 \ 变成 \#
print(#"""
hello \#
world\n"""
"""#) // hello world\n"""
```

#### 字符串插值

> [插值](https://docs.swift.org/swift-book/LanguageGuide/StringsAndCharacters.html#ID292)内容使用带有转义的小括号 `\()`包裹。

```swift
print("6 times 7 is \(6 * 7).") // 6 times 7 is 42.

print(#"6 times 7 is \(6 * 7)."#) // 6 times 7 is \(6 * 7).

print(#"6 times 7 is \#(6 * 7)."#) // 6 times 7 is 42.
```

#### 字符串比较

使用双等号（`==`）判断两个字符串的扩展字符簇是否等价，换句话说，两个字符串是否在人类语言上完全相同（*same linguistic meaning and appearance*）：

```swift
// Voulez-vous un café?
let eAcuteQuestion = "Voulez-vous un caf\u{E9}?"
let combinedEAcuteQuestion = "Voulez-vous un caf\u{65}\u{301}?"
print(eAcuteQuestion == combinedEAcuteQuestion) // true

let latinCapitalLetterA: Character = "\u{41}" // 拉丁字母A，如英语
let cyrillicCapitalLetterA: Character = "\u{0410}" // 西里尔字母А，如俄语
print(latinCapitalLetterA == cyrillicCapitalLetterA) // false
```

#### 字符串方法

```swift
var phrase = "abcde"

// 判断空字符串
print(phrase.isEmpty) // false
// 字符数量
print(phrase.count) // 5
// 获取索引
print(phrase.firstIndex(of: "a")) // Optional(Swift.String.Index(_rawBits: 1))
// 根据索引获取字符
print(phrase[phrase.startIndex]) // a
print(phrase[phrase.index(before: phrase.endIndex)]) // e
print(phrase[phrase.index(after: phrase.startIndex)]) // b
print(phrase[phrase.index(phrase.startIndex, offsetBy: 2)]) // c
print(phrase[phrase.index(phrase.endIndex, offsetBy: -2)]) // d
print(phrase[..<phrase.firstIndex(of: "c")!]) // ab
for i in phrase.indices { print(phrase[i], terminator: "") } // abcde

// 修改
phrase += "fg"
phrase.append("h")
phrase.insert("i", at: phrase.endIndex) // abcdefghi
phrase.insert(contentsOf: "jk", at: phrase.endIndex) //abcdefghijk
print(phrase.remove(at: phrase.index(before: phrase.endIndex))) // k
phrase.removeSubrange(
	phrase.index(after: phrase.startIndex)..<phrase.endIndex) // a

// 前缀/后缀
print("hello world".hasPrefix("hello")) // true
print("hello world!".hasSuffix("!")) // true
```

#### Swift字符范围：扩展字符簇（Extended Grapheme Clusters）

> 扩展字符簇，包括单码字符，和使用多个单码组合产生的复杂字符。如`e`的变体`é`可以是`\u{e9}`，或由`e`和`\u{301}`两个单码组合而成。(Extended Grapheme Cluster is a sequence of one or more Unicode scalars that (when combined) produce a single human-readable character.)。

> Swift字符的范围即扩展字符簇。(Every instance of Swift’s Character type represents a single extended grapheme cluster.)

```swift
print("\u{1F1E6} to \u{1F1FF}") //  REGIONAL INDICATOR SYMBOL 🇦 to 🇿
print("\u{1F1E8}\u{1F1F3}") // 🇨 + 🇳 = 🇨🇳, regional indicator for China
print("e\u{304} e\u{301} e\u{306} e\u{300}") // ē é ĕ è
```

- Swift’s use of Extended Grapheme Clusters for Character values means that string concatenation and modification may not always affect a string’s character count.

- Extended Grapheme Clusters can be composed of multiple Unicode scalars. This means that different characters—and different representations of the same character—can require different amounts of memory to store.

```swift
var word = "cafe"
print("the number of characters in \(word) is \(word.count)")
// the number of characters in cafe is 4
word += "\u{301}"    // COMBINING ACUTE ACCENT, U+0301
print("the number of characters in \(word) is \(word.count)")
// the number of characters in café is 4
```

### 数字（Number）

类型有：

- `Int`（32bit/64bit）、`Int16`、`Int32`、`Int64`；`UInt`（32bit/64bit）、`UInt16`、`UInt32`、`UInt64`
- `Float`（32bit）、`Double`（64bit）

通过类构造可以进行类型转换：

```swift
let a = 100
let b = Int8(a)
let c = 1.2
let d = Int(c) // 1
```

整数字面量自动推断为`Int`：

```swift
let a = 1
print(type(of: a)) // Int
```

浮点数字面量自动推断为`Double`：

```swift
let a = 1.0
print(type(of: a)) // Double
```

数字字面量没有具体类型，也即其兼容所有数字类型（*Numeric Literals don't have an explicit type, so combining of literals won't cause a mixed-type error.*）：

```swift
let a: Int = 1
let b: UInt = 1
let c: Float = 1
let d: Double = 1
let e: Float = 1.2
let f: Double = 1.2

print(e + 1) // 2.2
print(f + 1) // 2.2
```

#### 数字字面量

字面量支持补`0`和`_`分隔符进行格式化（*Numeric Literals can contain extra formatting (zero and underscore) for easily read.*）：

```swift
print(1_000_000) // 1000000
print(00.1200) // 0.12
```

二进制（`0b`）、八进制（`0o`）、十六进制（`0x`）：

```swift
print(31, 0b11111, 0o37, 0x1f)
```

十进制科学计数法：

```swift
print(1.2e2, 1.2e-2) // 120.0, 0.012
```

十六进制（浮点数必须使用）科学计数法：

```swift
// 十六进制科学计数法以2为底数
print(0x1.2p2) // 4.5 = (1 + 2 * 16^-1) * 2^2
print(0x1.2p-2) // 0.28125 = (1 + 2 * 16^-1) * 2^-2
```

#### 数字常量

整数最大值、最小值：

```swift
print(Int.max, Int.min, UInt.max, UInt.min)
print(Int8.max, Int8.min, UInt8.max, UInt8.min)
// ...
```

#### 数字方法

```swift
// 幂运算
pow(2, 10)
```

### 布尔（Boolean）

```swift
let orangesAreOrange: Bool = true
let turnipsAreDelicious = false
```

Swift是类型安全的，不允许非布尔值替代（自动转换成）布尔值：

```swift
if 1 {} // error
```

### 元组（Tuples）

```swift
// 匿名元素
let http404Error = (404, "Not Found")
print(http404Error.0) // 404

let a = 1, b = 2
let c = (a, b)
print(c) // (1, 2)

// 具名元素
let http200Status = (statusCode: 200, description: "OK")
print(http404Error.statusCode) // 200

// 解构（*decompose*）元组
let (statusCode, statusMessage) = http404Error
// 解构无需同名
let (code, msg) = http404Error
```

### 集合类型（Collection）

> [集合类型](https://docs.swift.org/swift-book/LanguageGuide/CollectionTypes.html)，是同一类型值的集合。

- 内部元素与数据保持同样的可变性/不可变性

- 不允许索引范围外的访问

- 字面量末尾元素后面的逗号`,`可选

![CollectionTypes](https://docs.swift.org/swift-book/_images/CollectionTypes_intro_2x.png)

- `.count`
- `.startIndex`
- `.endIndex`
- `.indices`
- `.isEmpty`
- `.index()`

### 数组（Array）

> 值的有序集合。

```swift
Array<Value>
```

```swift
// 无初始化声明
let arr: Array<Int>
let arr: [Int]

// 声明空数组
let arr = Array<Int>()
let arr = [Int]()
let arr: Array<Int> = []
let arr: [Int] = []

// 初始化声明
let arr = [Int](repeating: 0, count: 3) // [0, 0, 0]
let arr = Array<Int>(repeating: 0, count: 3) // [0, 0, 0]
let arr = Array(repeating: 0, count: 3) // [0, 0, 0]

// 推断声明
let arr = [1, 2]
let arr = [1, 2] + [2, 3]
```

```swift
var arr = [Int]()

// 添加元素
arr += [1, 2]
arr.append(3)
arr.insert(0, at: 0) // [0, 1, 2, 3]

// 替换元素
arr[1] = 2
arr[2...3] = [5] // [0, 2, 5]

// 删除元素
print(arr.remove(at: 1)) // 2
print(arr.removeLast()) // 5

// 遍历
for e in arr {}
for (i, e) in arr.enumerated() {}
```

### 集合（Set）

> 唯一值的无序集合。

- 集合元素必须是实现了可散列协议（*Hashable Protocol*）的类型

```swift
Set<Hashable>
```

```swift
let s: Set<Int>

let s = Set<Int>()

let s: Set = [1, 2, 3] // 元素是无序的
```

```swift
var s: Set = [1, 2, 3]

print(s.insert(4)) // (inserted: true, memberAfterInsert: 4)
print(s.insert(4)) // (inserted: false, memberAfterInsert: 4)

print(s.remove(4)) // Optional(4)
print(s.remove(10)) // nil

print(s.contains(1)) // true
print(s.count) // 3

print(s.sorted()) // 返回有序数组

// 置空
print(s.removeAll()) // ()
// 或
s = []
```

集合运算

```swift
sa.intersection(sb) // 交集
sa.union(sb)        // 并集
sa.subtracting(sb)  // 差集
sa.subtract(sb)     // 减集（修改sa）
sa.symmetricDifference(sb) // 环和/对称差集
sa == sb // 等集
sa.isSubnet(of: sb)         // 子集
sa.isStrictSubset(of: sb)   // 真子集（不相等）
sa.isSuperset(of: sb)       // 超集
sa.isStrictSuperset(of: sb) // 真超集（不相等）
sa.isDisjoint(with: sb)     // 不相交集
```

#### 可散列（*Hashable Protocol*）

> 散列值是一个整型（`Int`）数据

- 基础类型都实现了可散列协议

### 字典（Dictionary）

> 键值关联的无序集合。

```swift
Dictionary<Hashable, Value>
```

```swift
// 无初始化声明
let d: Dictionary<String, Int>
let d: [String: Int]

// 声明空字典
let d = Dictionary<String, Int>()
let d = [String: Int]()
let d: Dictionary<String, Int> = [:]
let d: [String: Int] = [:]

// 字面量
let d = ["foo": 1, "bar": 2]
```

```swift
// create
let dict = Dictionary<String, Int>()
let dict = [String: Int]()
let dict: [String: Int] = [:]
let dict: [String: String] = ["name": "lucky", "gender": "female"]
let dict = ["name": "lucky", "feeling": "good"]
// modify
dict["feeling"] = "great"
dict["gender"] = "female"
dict.updateValue("excellent", forKey: "feeling")!) // return Optional
// remove
dict.removeValue(forKey: "home") // return Optional
dict["home"] = nil
```

Iterate

```swift
for (key, value) in dict {}
for key in dict.keys {}
for value in dict.values {}
let arr = [String](dict.keys)
let arr = [String](dict.values.sorted())
```

## 可空类型（Optional）

> *Optional* 表示某类型不是一直都存在值。一般用于变量声明、类型转换的返回值等。

在类型后添加`?`表示或有类型：

```swift
var a: Int?
print(a) // nil
print(type(of: a)) // Optional(Int)
```

### 空值（nil）

> `nil` 只用于赋值或有类型或与之比较等。`nil`不是一个空指针，单纯是在语法层面表示值不存在。

可空类型的变量不初始化即为`nil`

```swift
var a: Int?
print(a) // nil
```

`nil`只能与或有类型进行比较：

```swift
if (1 == nil) {} // error
```

### 可空绑定（Optional Binding）

> 可空绑定，是先判断或有值是否存在，如果存在则将其值存于临时变量中执行条件语句。一般出现在控制流语句，如`if`, `switch`, `guard`, `while`。

```swift
var possibleNumber: Int? = 1
if let actualNumber = possibleNumber {
    print("The string \"\(possibleNumber)\" has an integer value of \(actualNumber)")
    // The string "Optional(1)" has an integer value of 1
}
```

### 强制解包（Implicitly Force Unwrapping）

> 有的情况下，我们知道一个可空值是一定存在值的，这时候再使用控制语句来判断其值存在性就显得冗余，故提供了强制解包的快捷方式。

```swift
var a: Int? = 1
print(a!) // 1 // use exclamation point(!) as postfix.
```

### 声明隐式解包可空类型（Implicitly Unwrapped Optionals）

> 声明*隐式解包可空类型*后，变量在调用时可以被当作非空类型直接使用，而无需解包。

```swift
var a: Int! = 1 // 用 ! 替代 ?
print(a) // Optional(1)
if a == 1 {
  print("a is 1")
}
```

### 可空链式调用（）

## 类型别名（Type Alias）

```swift
typealias Audio = Int8
```

# 错误和断言

> building: `assert`, `assertFailure`

> production: `precondition`, `preconditionFailure`

- terminate your app while false condition met.

- used to detect the condition that is certain to prevent program from proceeding.

## 错误处理

[Error Handling](https://docs.swift.org/swift-book/LanguageGuide/ErrorHandling.html)

- 在Swift中，所有错误都遵循`Error`协议。

- 为了避免大量性能消耗，Swift错误处理不会解开调用栈（~~unwinding call stack~~）。

枚举非常适合定义一系列有关的错误：

```swift
enum VendingMachineError: Error {
    case invalidSelection
    case insufficientFunds(coinsNeeded: Int)
    case outOfStock
}

throw VendingMachineError.insufficientFunds(coinsNeeded: 5)
```

## 抛出函数（Throwing Functions）

> 抛出函数（throwing functions）：可以主动抛出错误，其内部产生的错误可以自动传播给（*propagate*）它的调用者，而无需处理（`catch`）。**如果一个函数不是抛出函数，则其无法主动抛出错误，内部抛出的错误必须处理。**

```swift
func canThrowErrors() throws {
  //
}
```

```swift
func throwing() throws {
  throw Error
}

func canThrowErrors() throws {
  try throwing()
}

func shouldCatchErrors() {
  do {
    try canThrowAnError()
  } catch {
    print("catched")
  }
}
```

捕获错误：

```swift
do {
    try canThrowAnError()
    // no error was thrown
} catch {
    // an error was thrown
}
```

捕获多种类型错误：

```swift
func makeASandwich() throws {
    // ...
}

do {
    try makeASandwich()
    eatASandwich()
} catch SandwichError.outOfCleanDishes {
    washDishes()
} catch SandwichError.missingIngredients(let ingredients) {
    buyGroceries(ingredients)
}
```

# 操作符

> Swift支持重载操作符方法，以及自定义操作符。

## 标准操作符

[Swift标准运算符](https://developer.apple.com/documentation/swift/operator-declarations)

标准操作符及操作符优先级[OperatorContext](https://github.com/apple/swift-format/blob/main/Sources/SwiftFormatPrettyPrint/OperatorContext.swift)

### 前缀运算符

- `+`（Unary Plus）
- `-`（Unary Minus）
- `!`（Logical NOT）
- `.!`（Pointwise logical NOT）
- `~`（Bitwise NOT）
- `..<`（Prefix Half-open Range）
- `...`（Prefix Closed Range）

### 后缀运算符

- `...`（Postfix Half-open Range）

### 中缀运算符

#### BitwiseShiftPrecedence

- `<<`（Bitwise left shift）
- `&<<`（Bitwise left shift, ignoring overflow）
- `>>`（Bitwise right shift）
- `&<<`（Bitwise right shift, ignoring overflow）

#### MultiplicationPrecedence

- `*`（Multiplication）
- `&*`（Multiplication with overflow）
- `/`（Division）
- `%`（Remainder）
- `&`（Bitwise AND）

#### AdditionPrecedence

- `+`（Addition）
- `&+`（Addition with overflow）
- `-`（Subtraction）
- `&-`（Subtraction with overflow）
- `|`（Bitwise OR）
- `^`（Bitwise XOR）

#### RangeFormationPrecedence

- `...`（Closed Range）
- `..<`（Half-open Range）

#### CastingPrecedence

- `is`（Type Check）
- `as`、`as?`、`as!`（Type cast）

#### NilCoalescingPrecedence

- `??`（Nil coalescing）

#### ComparisonPrecedence

- `<`（Less than）
- `<=`（Less than or equal）
- `>`（Greater than）
- `>=`（Greater than or equal）
- `==`（Equal）
- `!=`（Not equal）
- `===`（Identical）
- `!==`（Not identical）
- `~=`（Pattern Match）
- `.<`（Pointwise less than）
- `.<=`（Pointwise less than or equal）
- `.>`（Pointwise greater than）
- `.>=`（Pointwise greater than or equal）
- `.==`（Pointwise equal）
- `.!=`（Pointwise not equal）

#### LogicalConjunctionPrecedence

- `&&`（Logical AND）
- `.&`（Pointwise bitwise AND）

#### LogicalDisjunctionPrecedence

- `||`（Logical OR）
- `.|`（Pointwise bitwise OR）
- `.^`（Pointwise bitwise XOR）

#### TernaryPrecedence

- `? :`（Ternary Conditional）

#### AssignmentPrecedence

- `=`（Assign）
- `*=`（Multiply and assign）
- `&*=`（Multiply with overflow and assign）
- `/=`（Divide and assign）
- `%=`（Remainder and assign）
- `+=`（Add and assign）
- `&+=`（Add with overflow and assign）
- `-=`（Subtract and assign）
- `&-=`（Subtract with overflow and assign）
- `<<=`（Left bit shift and assign）
- `&<<=`（Left bit shift ignoring overflow and assign）
- `>>=`（Right bit shift and assign）
- `&>>=`（Right bit shift ignoring overflow and assign）
- `&=`（Bitwise AND and assign）
- `&|`（Bitwise OR and assign）
- `^=`（Bitwise XOR and assign）
- `.&=`（Pointwise bitwise AND and assign）
- `.|=`（Pointwise bitwise OR and assign）
- `.^=`（Pointwise bitwise XOR and assign）

多元运算符的符号两边的空格要求一致：

```swift
print(1 + 1) // 2
print(1+1) // 2
print(1 +1) // error
print(1+ 1) // error
```

## 赋值

赋值（`=`）不会~~返回值~~：

```swift
if x = y {} // error
```

赋值可以解构：

```swift
let (x, y) = (1, 2)
```
## 空合并（Nil-Coalescing）

> `??`

等同于

```swift
a != nil ? a! : b
```

## 区间（Range Operator）

闭区间（Closed Range）

```swift
print(type(of: 1...2)) // ClosedRange<Int>
```

半开区间（Half-open Range）

```swift
print(type(of: 1..<2)) // Range<Int>
```

前缀半开区间（Prefix Half-open Range）

```swift
print(type(of: ..<2)) // PartialRangeUpTo<Int>
```

前缀闭区间（Prefix Closed Range）

```swift
print(type(of: ...2)) // PartialRangeThrough<Int>
```

后缀闭区间（Postfix Closed Range）

```swift
print(type(of: 1...)) // PartialRangeFrom<Int>
```

```swift
// Closed Range
for i in 1...5 { print(i) }

// Half-Open Range
for i in 1..<5 { print(i) }

// One-Sided
let a = [1, 2, 3, 4, 5]
for i in a[1...]
for i in a[...3] { print(i) }

for e in 1... {
  if e > 10 { break }
}
```

## 逻辑（Logical Operator）

> `!`, `&&`, `||`

# 控制流程

> [控制流程][controlflow]

## `for...in`

> 用于自动迭代实现了序列（`Sequence`）协议的数据，如区间、字符串、数组、字典等等。

```swift
// 区间
for i in 1...5 { <#statements#> }
// 数组
for e in [1, 2, 3] { <#statements#> }
// 字典（注意，字典本身是无序的）
for (animalName, legCount) in ["spider": 8, "ant": 6, "cat": 4] { <#statements#> }
```

忽略迭代项：

```swift
for _ in 1...5 { <#statements#> }
```

通过`where`实现条件迭代：

```swift
for i in 1...5 where 1 % 3 == 0 { <#statements#> }
```

## `while`

```swift
while <#condition#> {
   <#statements#>
}
```

## `repeat...while`

```swift
repeat {
   <#statements#>
} while <#condition#>
```

## `if`

```swift
if <#condition#> { <#statements#> }
if <#condition#> { <#statements#> } else { <#statements#> }
if <#condition#> { <#statements#> } else if <#condition#> { <#statements#> }
if case 10...16 = age {}
if case 10...16 = age, age > 25 {}
```

## `switch`

- 一旦匹配到，就不再继续匹配
- 必须有`default`分支
- 不允许存在空分支，可以用`break`语句填充

```swift
switch <#expression#> {
  case <#expression#>:
    <#statements#>
  // 多个匹配项
  case <#expression#>, <#expression#>:
    <#statements#>
  // switch不允许空的执行语句，可以使用`break`填充
  case <#expression#>:
    break
  // 默认项
  default:
    <#statements#>
}
```

### 穿透相邻分支（`fallthrough`）

> `fallthrough`：立即退出当前分支的执行，并跳入下个相邻的分支（不检查分支条件）继续执行。

```swift
let integerToDescribe = 5
var description = "The number \(integerToDescribe) is"
switch integerToDescribe {
  case 1...:
    description += " greater than 1, and also"
    fallthrough
  case 10...:
    description += " greater than 10, and also"
    fallthrough
  default:
    description += " an integer."
}
print(description) // The number 5 is greater than 1, and also greater than 10, and also an integer.
```

### 匹配值区间（Interval Matching）

```swift
case 5...10:
  <#statements#>
case 1..<5, 11...20:
  <#statements#>
```

### 通过元组测试多个值

```swift
let somePoint = (1, 1)
switch somePoint {
  case (0, 0):
      print("\(somePoint) is at the origin")
  case (_, 0):
      print("\(somePoint) is on the x-axis")
  case (0, _):
      print("\(somePoint) is on the y-axis")
  case (-2...2, -2...2):
      print("\(somePoint) is inside the box")
  default:
      print("\(somePoint) is outside of the box")
}
```

### 值绑定（Value Bindings）

```swift
switch (2, 0) {
  case (let x, 0):
      print("on the x-axis with an x value of \(x)")
  case (0, let y):
      print("on the y-axis with a y value of \(y)")
  case let (x, y):
      print("somewhere else at (\(x), \(y))")
}
```
```swift
indirect enum ArithmeticExpression {
  case number(Int)
  case addition(ArithmeticExpression, ArithmeticExpression)
  case multiplication(ArithmeticExpression, ArithmeticExpression)
}
func evaluate(_ expression: ArithmeticExpression) -> Int {
  switch expression {
  case let .number(value):
    return value
  case let .addition(left, right):
    return evaluate(left) + evaluate(right)
  case let .multiplication(left, right):
    return evaluate(left) * evaluate(right)
  }
}
```

### 通过`where`细化匹配条件：

```swift
let yetAnotherPoint = (1, -1)
switch yetAnotherPoint {
case let (x, y) where x == y:
    print("(\(x), \(y)) is on the line x == y")
case let (x, y) where x == -y:
    print("(\(x), \(y)) is on the line x == -y")
case let (x, y):
    print("(\(x), \(y)) is just some arbitrary point")
}
```

- fallthrough doesn't check the case condition of it causes execution fall into

- value bindings are available in the fallen into

## `guard...else`

> 如果`guard`语句的条件不满足时，执行`else`语句并提前退出当前域的执行。

- `guard...else`语句类似生产模式下的`assert`
- `Optional`变量经过`guard`语句审查后后续可以在所在域直接使用
- `else`分支必须转移所在域的控制权（`return`, `break`, `continue`, `throw`, `fatalError`...）

```swift
func greet(person: [String: String]) {
  guard let name = person["name"] else {
    return
  }

  print("Hello \(name)!")

  guard let location = person["location"] else {
    print("I hope the weather is nice near you.")
    return
  }

  print("I hope the weather is nice in \(location).")
}
```

## 标签（labeled statement）

```swift
<#label#>: while <#condition#> {
   <#statements#>
}
```

## 检查平台和版本

`#available`

```swift
#available(<#platform name#> <#version#>, <#...#>, *)
```

```swift
// `*` 表示其他平台
if #available(iOS 10, macOS 10.12, *) {
    // Use iOS 10 APIs on iOS, and use macOS 10.12 APIs on macOS
} else {
    // Fall back to earlier iOS and macOS APIs
}
```

`#unavailable`

```swift
if #unavailable(iOS 10) {
    // Fallback code
}
```

在`guard...else`中使用：

```swift
@available(macOS 10.12, *)
struct ColorPreference {
    var bestColor = "blue"
}

func chooseBestColor() -> String {
    guard #available(macOS 10.12, *) else {
       return "gray"
    }
    let colors = ColorPreference()
    return colors.bestColor
}
```

# 函数（Functions）

```swift
func [functionName]([parameterLabel|_] [parameter: type] = [defaultValue] ...) [throws] [-> type] { }
```

> [函数][functions] varies in `parameter label`, `parameter type`, and `return type`.

```swift
// 无返回值（即返回`Void`，即空元组`()`）
func a () {}
func a2 () -> Void {}
func a3 () -> () {}

// 有返回值
func b() -> Int { return 1 }

// 通过元组可以返回多个值
func r() -> (Int, Int) { return (1, 2) }
print(f()) // (1, 2)
func r2() -> (x: Int, y: Int) { return (3, 4) }
print(g()) // (x: 1, y: 2)

// 函数参数
// - 函数调用时参数默认需要具名（带参数标签）传递
// - 函数参数默认是常量
func p(a: Int) -> Int { return a + 1 }
p(a: 1)

// 修改参数标签，即调用函数时所使用的参数名称
func pl(x a: Int) -> Int { return a + 1 }
pl(x: 1)

// 省略参数标签，可以实现匿名传参
func pa(_ a: Int) -> Int { return a + 1 }
pa(1)

// 参数默认值，有默认值的参数不要求放在后面
func pd(a: Int = 1, b: Int) -> Int { return a + b }
pd(b: 1)

// 不定参数，在函数体中当作数组提供
func pv(a: Int...) {}

// 多个不定参数，需要在不定参数的第一个参数加上参数标签以区分
func pv2(a: Int..., b: Int...) {}
pv2(a: 1, 2)
pv2(a: 1, 2, b: 3, 4)
```

## 可变参数 (`inout`)

> 函数的参数默认是常量，如果要修改，需要声明参数类型为可`inout`类型，并在调用函数时传入引用值（`&`）。

可变参数实际是在调用函数时传入了参数副本，并在函数结束后将副本赋值给原变量，故：

- `inout`参数不能有~~默认值~~，也不能是~~不定参数~~
- `inout`参数必须传入变量，不能传入~~常量~~和~~字面量~~

```swift
func swap(_ a: inout Int, _ b: inout Int) {
  (a, b) = (b, a)
}
var x = 3, y = 107
swap(&x, &y)
print("x is now \(x), and y is now \(y)")
// Prints "x is now 107, and y is now 3"
```

由于Swift编译器为了优化性能，在处理的时候传入的是引用，故：

- 作为`inout`参数传入的变量不能在多线程的时候直接访问
- 同一个变量不能同时作为多个`inout`参数传入

```swift
func multithreadedFunction(queue: DispatchQueue, x: inout Int) {
  // Make a local copy and manually copy it back.
  var localX = x
  defer { x = localX }

  // Operate on localX asynchronously, then wait before returning.
  queue.async { someMutatingOperation(&localX) }
  queue.sync {}
}
```

## 函数类型

> 函数类型由函数参数类型和函数返回值类型共同决定。

```swift
func a(_ x: Int) -> String { "" }
print(type(of: a)) // (Int) -> String
```

### 函数变量

通过函数类型可以定义函数变量，以动态调用函数：

```swift
var mathFunction: (Int, Int) -> Int = addTwoInts
```

### 高阶函数

通过将参数或返回值定义为函数类型可以定义高阶函数：

```swift
func printMathResult(_ mathFunction: (Int, Int) -> Int, _ a: Int, _ b: Int) {
    print("Result: \(mathFunction(a, b))")
}
```

```swift
func chooseStepFunction(backward: Bool) -> (Int) -> Int {
    return backward ? stepBackward : stepForward
}
```

## 内联函数

> 函数内可以定义内联函数，内联函数可以直接使用所在函数中的项目，并可以作为返回值被返回。

```swift
func chooseStepFunction(backward: Bool) -> (Int) -> Int {
    func stepForward(input: Int) -> Int { return input + 1 }
    func stepBackward(input: Int) -> Int { return input - 1 }
    return backward ? stepBackward : stepForward
}
```

## (v5.1) 隐式返回（implicit return）

> 如果函数体只有一个表达式，则可以省略`return`.（If the entire body of the function is a single expression, the function implicitly returns that expression.）

```swift
func greet(name: String) -> String {
  "Hello! \(name)."
}
```

# 闭包（Closures）

> [闭包][closures]：捕获并可*持续*（即使这些变量的原始上下文已经不存在了）读取外部变量的*自包含功能块*（即函数，区别于与普通代码块）。
> （*Closures are self-contained blocks of functionality that can be passed around and used in your code. Closures can capture and store references to any constants and variables from the context in which they’re defined.*）

闭包有三种，其中*函数（Functions）* 和 *内联函数（Nested Functions）*是两种特殊闭包，第三种即**闭包（表达式）**。

## 闭包表达式（Closure Expressions）

> 闭包表达式实际是被Swift针对性地做了些简化的匿名闭包，以方便使用，如：

- 通过上下文自动推导参数类型（*Inferring parameter and return value types from context*）
- 单表达式可以省略`return`（*Implicit returns from single-expression closures*）
- 通过魔术变量省略参数定义（*Shorthand Argument Names*）
- 尾随闭包语法（*Trailing closure syntax*）

需要注意的是：

- 闭包参数不能有默认值

```swift
{ (<#parameters#>) -> <#return type#> in
   <#statements#>
}
```

```swift
let names = ["Chris", "Alex", "Ewa", "Barry", "Daniella"]

// 完整闭包写法
names.sorted(by: { (a: String, b: String) -> Bool in return a > b })

// 通过上下文自动推导参数类型（*Inferring Type From Context*）
names.sorted(by: { (a, b) -> Bool in a > b })

names.sorted(by: { a, b -> Bool in a > b })

// 单表达式可以省略`return`（*Implicit Returns from Single-Expression Closures*）
names.sorted(by: { (a: String, b: String) -> Bool in a > b })

// 通过魔术变量省略参数定义（*Shorthand Argument Names*）
names.sorted(by: { $0 > $1 })

// 直接使用操作符方法（*Operator Methods*）
names.sorted(by: >)
```

## 尾随闭包（Trailing Closures）

> 如果闭包作为函数最后一个或多个参数，则该闭包可以写在函数调用的括号外，其中，第一个尾随闭包可以不用参数标签标注。

```swift
names.sorted() { $0 > $1 }
```

> 如果函数仅有该闭包一个参数，则可以省略函数调用的括号`()`。

```swift
names.sorted { $0 > $1 }
```

> 尾随闭包可以有多个，但除了第一个外，其余均须使用参数标签标注。

```swift
func loadPicture(from server: Server, completion: (Picture) -> Void, onFailure: () -> Void) {
    if let picture = download("photo.jpg", from: server) {
        completion(picture)
    } else {
        onFailure()
    }
}
loadPicture(from: someServer) { picture in
    someView.currentPicture = picture
} onFailure: {
    print("Couldn't download the next picture.")
}
```

## 逃逸闭包（Escaping Closures）

> 传入了函数但在函数返回后才会调用的闭包。（*A closure is said to escape a function when the closure is passed as an argument to the function, but is called after the function returns.*）

逃逸闭包需要在其类型前标记 `@escaping`：

```swift
var completionHandlers: [() -> Void] = []
func someFunctionWithEscapingClosure(completionHandler: @escaping () -> Void) {
    completionHandlers.append(completionHandler)
}
```

当逃逸闭包中需要引用*类实例*（`self`）的属性或方法时，需要明确通过`self`引用：

```swift
class SomeClass {
    var x = 10
    func doSomething() {
        // 逃逸闭包
        someFunctionWithEscapingClosure { self.x = 100 }
        // 或
        someFunctionWithEscapingClosure { [self] in x = 100 }
        // 普通闭包
        someFunctionWithNonescapingClosure { x = 200 }
    }
}
```

## 自动闭包（Autoclosures）

> 一种自动创建的闭包：如果一个闭包没有参数的话，可以省略参数声明部分，只写闭包体部分（`{ statement }`），会被自动创建成闭包。(*An autoclosure is a closure that’s automatically created to wrap an expression that’s being passed as an argument to a function. It doesn’t take any arguments, and when it’s called, it returns the value of the expression that’s wrapped inside of it.*)

```swift
let customer = { customersInLine.remove(at: 0) }

func serve(customer customerProvider: () -> String) {
    print("Now serving \(customerProvider())!")
}
serve(customer: customer)
```

通过在闭包类型前声明`@autoclosure`，可以省略闭包体~~标识符（`{}`）~~：

```swift
func serve(customer customerProvider: @autoclosure () -> String) {
    print("Now serving \(customerProvider())!")
}
serve(customer: customersInLine.remove(at: 0))
```

## 捕获列表（Capturing List）

> 当闭包产生[强引用循环][Strong-Reference-Cycles-for-Closures]（如在类中通过闭包定义方法，方法中对实例进行引用）时，可通过定义捕获列表的手段，定义闭包对实例（或属性、方法）的弱引用或非拥有关系。

- `unowned`，非拥有引用：实例和闭包同时释放；
- `weak`，弱引用：闭包可以存续更久，引用可能为空`nil`；

```swift
lazy var someClosure = {
        [unowned self, weak delegate = self.delegate]
        (index: Int, stringToProcess: String) -> String in
    // closure body goes here
}
// 当闭包没有参数和返回值时：
lazy var someClosure2 = {
        [unowned self, weak delegate = self.delegate] in
    // closure body goes here
}
```

例如：

```swift
class HTMLElement {

    let name: String
    let text: String?

    lazy var asHTML: () -> String = {
            [unowned self] in
        if let text = self.text {
            return "<\(self.name)>\(text)</\(self.name)>"
        } else {
            return "<\(self.name) />"
        }
    }

    init(name: String, text: String? = nil) {
        self.name = name
        self.text = text
    }

    deinit {
        print("\(name) is being deinitialized")
    }

}
```

# 枚举（Enumerations）

> [枚举（Enumerations）][enumerations]：（*An enumeration defines a common type for a group of related values and enables you to work with those values in a type-safe way within your code.*）

- 可以定义[枚举项原始值](#枚举项原始值raw-value)
- 可以定义[枚举项关联值](#枚举项关联值associated-values)；
- 可以定义[初始化器](#初始化initializations)；
- 可以定义[计算属性](#计算属性computed-attributes)；
- 可以定义[方法](#方法methods)；
- 可以[扩展](#扩展extension)原始实现；
- 可以声明符合[协议](#协议protocol)以提供标准功能；

```swift
enum CompassPoint {
  case east
  case south
  case west
  case north
}
```

多个枚举项可以写在一行

```swift
enum CompassPoint {
  case east, south, west, north
}
```

当已知变量枚举类型时，可以简写枚举项赋值：

```swift
var point = CompassPoint.east
point = .south
```

## 枚举项原始值（Raw Values）

> 原始值是枚举项所对应的固定值，用以静态存储数据。

枚举的原始值类型可以是字符串、字符、整数、浮点数；

```swift
enum Weekday: Int {
  case monday = 1
  case tuesday = 2
  case wednesday = 3
  case thursday = 4
  case friday = 5
}
```

隐式原始值（Implicit Raw Values）

> `Integer` and `String` have implicit raw value, while Integer is one more than previous case value, and String is the case name.

```swift
enum Weekday: Int {
  case monday = 1
  case tuesday // 2
  case wednesday = 10 // 10
  case thursday // 11
  case friday // 12
}
```

使用原始值初始化枚举（Initializing from Raw Values），生成的枚举是`Optional`

```swift
let day = WeekDay(rawValue: 1) // Optional(WeekDay.monday)
let day2 = WeekDay(rawValue: 5) // nil
```

## 枚举项关联值（Associated Values）

> 与原始值相对地，通过关联值可以在枚举项动态存储数据。

```swift
enum Barcode {
  case upc(Int, Int, Int, Int)
  case qrCode(String)
}
```

可以通过`switch`语句审查枚举，并解包关联值：

```swift
switch productBarcode {
  case .upc(let numberSystem, let manufacturer, let product, let check):
  // 若所有解包值的可变性相同，还可以写成：
  // case let .upc(numberSystem, manufacturer, product, check):
    print("UPC: \(numberSystem), \(manufacturer), \(product), \(check).")
  case .qrCode(let productCode):
    print("QR code: \(productCode).")
}
```

## 可迭代枚举项（Iterable Cases）

通过部署`CaseIterable`[协议](#协议protocol)，可以实现枚举项的迭代。

```swift
enum CompassPoint: CaseIterable {
  case east, south, west, north
}
for beverage in Beverage.allCases {
    print(beverage)
}
```

## 递归枚举（Recursive Enumerations）

```swift
enum ArithmeticExpression {
  case number(Int)
  indirect case addition(ArithmeticExpression, ArithmeticExpression)
  indirect case multiplication(ArithmeticExpression, ArithmeticExpression)
}
```

或

```swift
indirect enum ArithmeticExpression {
  case number(Int)
  case addition(ArithmeticExpression, ArithmeticExpression)
  case multiplication(ArithmeticExpression, ArithmeticExpression)
}
```

# 结构（Structures）和类（Classes）

> [结构（Structure）和类（Class）][classesandstructures]在定义、调用等方面基本相同，可以定义属性、方法、初始化器、扩展默认实现、实现协议等，也都是通过下标调用值。

*结构（Structure）和类（Class）*的相同点：

- *结构（Structure）和类（Class）*均可以定义[属性（Attributes）](#属性attributes)；
- *结构（Structure）和类（Class）*均可以定义方法[（Methods）](#方法methods)；
- *结构（Structure）和类（Class）*均可以定义[初始化器（Initializers）](#初始化initializations)；
- *结构（Structure）和类（Class）*均可以定义[下标方法（Subscript Methods）](#下标方法subscript)；
- *结构（Structure）和类（Class）*均可以[扩展（Extensions）](#扩展extension)原始实现；
- *结构（Structure）和类（Class）*均可以声明符合[协议（Protocols）](#协议protocol)以提供标准功能；

*类（Class）*还有一些额外特性：

- *类（Class）*可以定义[反初始化器（Deinitializers）](#反初始化deinitializations)；
- *类（Class）*可以[继承（Inheritance）](#继承inheritance)；
- *类（Class）*实例可以在运行时进行类型判断和解释（*Type Casting*）；
- *类（Class）*是[引用类型](#值类型和引用类型value-types--reference-types)，实例可以被多次引用（*Reference Type*）；

[选择结构还是类？](https://developer.apple.com/documentation/swift/choosing-between-structures-and-classes)

```swift
// 定义
// - 属性可以设置默认值
struct Resolution {
  var width = 0
  var height = 0
}
class VideoMode {
  var resolution = Resolution()
  var interlaced = false
  var frameRate = 0.0
  var name: String?
}

// 创建实例
let someResolution = Resolution()
let someVideoMode = VideoMode()

// 结构具有生成所有成员属性的默认构造器，类则没有
let vga = Resolution(width: 640, height: 480)

// 访问属性
print(someResolution.width)
print(someVideoMode.resolution.width)
```

# 属性（Properties）

> [属性（Properties）][properties]用以向[类（Classes）](#结构structures和类classes)、[结构（Structures）](#结构structures和类classes)和[枚举（Enumerations）](#枚举enumerations)关联数据。

- 属性遵循[访问控制](#访问控制access-control)；

## 存储属性（Stored Properties）

> [存储属性][Stored-Properties]是存储在[类（Classes）](#结构structures和类classes)或[结构（Structures）](#结构structures和类classes)的实例中的变量（*variable stored property*）或常量（*constant stored property*）。

```swift
struct FixedLengthRange {
  var firstValue: Int
  let length: Int
}
class DataImporter {
  var filename = "data.txt"
  let mode = "r"
}

// - 由于结构是值类型，故想要修改属性，实例也必须是常量
var rangeOfThreeItems = FixedLengthRange(firstValue: 0, length: 3)
rangeOfThreeItems.firstValue = 6
// 以下则会报错：
let rangeOfFourItems = FixedLengthRange(firstValue: 0, length: 4)
rangeOfFourItems.firstValue = 6 // error: cannot assign to property: 'rangeOfFourItems' is a 'let' constant

// - 类是引用类型，故没有这个限制：
let dataFile = DataImporter()
dataFile.filename = "data_2.txt"
```

### 懒加载存储属性（Lazy Stored Properties）

> 直到第一次使用时才计算初始值的属性。

需要注意的是，如果懒加载属性被多个线程访问，不能保证其只会被初始化一次。

```swift
class DataManager {
  lazy var importer = DataImporter()
  var data: [String] = []
}
let manager = DataManager()
print(manager.importer.filename) // 此时importer才被初始化
```

## 计算属性（Computed Properties）

> [计算属性](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/properties#Computed-Properties)提供`getter`和`setter`方法，可以定义在[类（Classes）](#结构structures和类classes)、[结构（Structures）](#结构structures和类classes)和[枚举（Enumerations）](#枚举enumerations)中。

```swift
struct EEE {
  var text = "e"
  var length: Int {
    get { return text.count }
    set(n) { text = String(repeating: "e", count: n) }
  }
}
```

编译器不会对计算属性的函数体自动推断，即使它明显是个常量，故：
- 必须声明计算属性为变量（`var`）
- 必须声明计算属性类型

```swift
struct EEE {
  <#statements#>
  var target: Character { "e" }
}
```

> **Getter简写（Shorthand Getter Declaration）**：同函数一样，如果Getter只有一个表达式，可以省略`return`

> **Setter简写（Shorthand Setter Declaration）**：Setter参数默认为`newValue`

```swift
struct EEE {
  <#statements#>
  var len: Int {
    get { text.count }
    set(newValue) { text = String(repeating: "e", count: newValue) }
  }
}
```

> **只读属性（Read-Only Computed Properties）**：如果只有Getter，可以简写如下

```swift
struct EEE {
  <#statements#>
  var count: Int { text.count }
}
```

## 属性监视器（Property Observers）

> [属性监视器](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/properties#Property-Observers)监视并响应属性的变化，即使属性赋予前后是同一个值。

监视方法有`willSet`, `didSet`，并可在以下场景下监视属性：

- 定义存储属性
- 继承存储属性
- 继承计算属性

```swift
class StepCounter {
  var totalSteps: Int = 0 {
    willSet(newTotalSteps) {
      print("About to set totalSteps to \(newTotalSteps)")
    }
    // - 和Setter一样，旧值既可以自定义参数名，也有默认的参数名`oldValue`
    didSet {
      if totalSteps > oldValue  {
        print("Added \(totalSteps - oldValue) steps")
      }
    }
  }
}
```

由于`inout`参数的*copy-In copy-out*机制，若将属性传给`inout`参数，`willSet`和`didSet`会在函数调用后执行一遍：

```swift
func count(_ step: inout Int) {
  step += 1
}
var counter = StepCounter()
count(&counter.totalSteps)
// About to set totalSteps to 1
// Added 1 steps
```

## 属性包装器（Property Wrappers）

> [属性包装器](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/properties#Property-Wrappers)的作用类似某些编程语言中的装饰器，但专门针对于属性。

定义属性包装器：

- 根据需要定义一个[结构](#结构structures和类classes)、[类](#结构structures和类classes)或[枚举](#枚举enumerations)属性包装器，以`@propertyWrapper`修饰；
- 定义一个名为`wrappedValue`的计算属性代理将被修饰的属性；

```swift
// 一个限制Int值不大于12的结构属性包装器
@propertyWrapper
struct TwelveOrLess {
  private var number = 0
  var wrappedValue: Int {
    get { number }
    set { number = min(newValue, 12) }
  }
}
```

通过在属性前面加上`@<#propertyWrapperName#>`语法应用属性包装器：

```swift
struct SmallRectangle {
  @TwelveOrLess var height: Int
  @TwelveOrLess var width: Int
}

var rectangle = SmallRectangle()
print(rectangle.height)
// Prints "0"

rectangle.height = 10
print(rectangle.height)
// Prints "10"

rectangle.height = 24
print(rectangle.height)
// Prints "12"
```

属性包装器本身是某个结构数据（结构、类、枚举等），只是具有特殊的语法约定，故也可以当作普通类型使用：

```swift
struct SmallRectangle {
  private var _height = TwelveOrLess()
  private var _width = TwelveOrLess()
  var height: Int {
    get { return _height.wrappedValue }
    set { _height.wrappedValue = newValue }
  }
  var width: Int {
    get { return _width.wrappedValue }
    set { _width.wrappedValue = newValue }
  }
}
```

### 设置被包装属性的初始值（Setting Initial Values for Wrapped Properties）

> 通过定义属性包装器的初始化函数可以为不同的被包装属性设置初始化值。

```swift
@propertyWrapper
struct SmallNumber {
  private var maximum: Int
  private var number: Int
  var wrappedValue: Int {
    get { return number }
    set { number = min(newValue, maximum) }
  }
  init() {
    maximum = 12
    number = 0
  }
  init(wrappedValue: Int) {
    maximum = 12
    number = min(wrappedValue, maximum)
  }
  init(wrappedValue: Int, maximum: Int) {
    self.maximum = maximum
    number = min(wrappedValue, maximum)
  }
}
struct SomeNumbers {
  // 应用 init() 初始化器
  @SmallNumber var a: Int
  // 应用 init(wrappedValue:) 初始化器
  @SmallNumber var b: Int = 1
  @SmallNumber(wrappedValue: 1) var c: Int
  // 应用 init(wrappedValue:maximum:) 初始化器
  @SmallNumber(maximum: 2) var d: Int = 3
  @SmallNumber(wrappedValue: 3, maximum: 2) var e: Int
}
var n = SomeNumbers()
assert(n.a == 0)
assert(n.b == 1)
assert(n.c == 1)
assert(n.d == 2)
assert(n.e == 2)
```

# 方法（Methods）

# 下标方法（Subscripts）

# 初始化（Initializations）

# 反初始化（Deinitializations）

# 继承（Inheritance）

# 扩展（Extension）

> 阔扩展是给已存在的结构、类、枚举或协议等添加新的功能；

# 协议（Protocol）

# 泛型（Generics）

# 并发（Concurrency）

# 可选链（Optional Chaining）

> 无需解包（unwrapping）以直接访问可空值的成员。

# 访问控制（Access Control）

# 错误处理（Error Handling）

## Representing

- Enumeration is well suited to modeling a group of related error conditions.

```swift
enum VendingError: Error {
  case invalidSelection
  case insufficientFunds(coinsNeeded: Int)
  case outOfStock
}
```

## Throwing Errors

```swift
throw VendingError.outOfStock
throw VendingError.insufficientFunds(coinsNeeded: 10)
```

## Propagating Errors (Using Throwing Function)

```swift
func canThrowErrors() throws {}
func canThrowErrors() throws -> String {}
struct Test {
  init() throws {}
}
func vend() throws -> String {
  if {
    throw VendingError.outOfStock
  }
  return "Success"
}
```

## Handler Errors Using `do...catch`

```swift
do {
  try vend()
} catch VendingError.insufficientFunds(let coinsNeeded) {
  print(conisNeeded)
} catch VendingError.invalidSelection, VendingError.outOfStock {
} catch pattern4 where condition {
} catch is VendingError {
} catch {
  print(error) // no pattern catch will have the local constant 'error'
}
```

## Converting Errors to Optional

```swift
let ret = try? vend() // "Success" or nil.
```

[guidedtour]: https://docs.swift.org/swift-book/documentation/the-swift-programming-language/guidedtour/
[aboutthelanguagereference]: https://docs.swift.org/swift-book/documentation/the-swift-programming-language/aboutthelanguagereference
[Structures-and-Enumerations-Are-Value-Types]: https://docs.swift.org/swift-book/documentation/the-swift-programming-language/classesandstructures#Structures-and-Enumerations-Are-Value-Types
[Classes-Are-Reference-Types]: https://docs.swift.org/swift-book/documentation/the-swift-programming-language/classesandstructures#Classes-Are-Reference-Types
[controlflow]: https://docs.swift.org/swift-book/documentation/the-swift-programming-language/controlflow
[functions]: https://docs.swift.org/swift-book/documentation/the-swift-programming-language/functions
[closures]: https://docs.swift.org/swift-book/documentation/the-swift-programming-language/closures
[Strong-Reference-Cycles-for-Closures]: https://docs.swift.org/swift-book/documentation/the-swift-programming-language/automaticreferencecounting/#Strong-Reference-Cycles-for-Closures
[enumerations]: https://docs.swift.org/swift-book/documentation/the-swift-programming-language/enumerations
[classesandstructures]: https://docs.swift.org/swift-book/documentation/the-swift-programming-language/classesandstructures
[properties]: https://docs.swift.org/swift-book/documentation/the-swift-programming-language/properties
[Stored-Properties]: https://docs.swift.org/swift-book/documentation/the-swift-programming-language/properties#Stored-Properties
