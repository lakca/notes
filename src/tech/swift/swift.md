---
title: Swift
date: 2020-09-08T08:54:35.929Z
---

> v5.3 Guide

> Test on v4.2.1

[Swift Guide](SwiftGuide)

# 语言

## 特性

- 不直接暴露指针/内存，但提供了标准库进行支持
- 数据传递策略是引用还是复制在类型实现（值类型和引用类型）时已经决定
- 通过严格的引用计数（*Deterministic Reference Counting*）自动进行内存回收，没有垃圾回收对进程的干预
- Unicode编码
- 强类型（编译时确定类型）
- 静态类型（不可在~~使用中改变变量类型~~）
- 不支持名称遮蔽（~~二次声明~~）
- 支持自动推断类型（*Type Inference*）
- 强制显式处理空值（*Optional*）
- 支持元组（*Tuple*）
- 支持多值返回（*Multiple Return Values*）
- 支持泛型（*Generics*）
- 支持协议（*Protocols*）(类似*Rust Trait*)
- 支持类型扩展（*Extensions*）（类似*Rust derive*）
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

## 约定

- 标识符使用*camelCase*（变量、函数等）和*PascalCase*（类、结构、枚举等）命名方式

## 重要概念

- 结构（*Structure*）
- 类（*Class*）
- 扩展（*Extension*）
- 协议（*Protocol*）
- 行为体（*Actor*）

## 约定

- 标识符使用*camelCase*（变量、函数等）和*PascalCase*（类、结构、枚举等）命名方式

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

## 值类型（Value Types）

> 所谓[值类型](https://docs.swift.org/swift-book/LanguageGuide/ClassesAndStructures.html#ID88)，即在其被传递时，如赋值给变量、常量或者作为参数传入函数等，会复制出新的副本。（*A _value type_ is a type whose value is _copied_ when it’s assigned to a variable or constant, or when it’s passed to a function.*）

**所有结构（*structures*）和枚举（*enumerations*）都是值类型。**

> **基础类型（*Basic Types*）在底层都是通过结构（*structures*）来实现的**，所以都是值类型，包括数字（`Int`, `Double`）、布尔值（`Bool`）、字符串（`String`）、数组（`Array`）、集合（`Set`）、字典（`Dictionary`）等。(*In fact, all of the basic types in Swift—integers, floating-point numbers, Booleans, strings, arrays and dictionaries—are value types, and are implemented as structures behind the scenes.*)
> \* 标准库定义的集合类型如数组、字典和字符串等，为了优化性能，只有在数据被修改前才会被复制。

## 引用类型（Reference Types）

> [引用类型](https://docs.swift.org/swift-book/LanguageGuide/ClassesAndStructures.html#ID89)

**引用类型包括类（*classes*）、行为体（*actors*）。**

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
// a tuple of type (Int, String)
let http404Error = (404, "Not Found")
print(http404Error.0) // 404
```

解构（*decompose*）元组：

```swift
let (statusCode, statusMessage) = http404Error
```

命名组内元素：

```swift
let http200Status = (statusCode: 200, description: "OK")
print(http404Error.statusCode) // 200
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

## 或有类型（Optional）

> *Optional* 表示某类型不是一直都存在值。一般用于变量声明、类型转换的返回值等。

在类型后添加`?`表示或有类型：

```swift
let a: Int? = 1
print(type(of: a)) // Optional(Int)
```

或有值在使用前必须强制解包（*force unwrapping*）以获取其具体值，在值后添加`!`可以解包：

```swift
let a: Int? = 1
print(a!) // 1
```

### 空值（nil）

> `nil` 只用于赋值或有类型或与之比较等。`nil`不是一个空指针，单纯是在语法层面表示值不存在。

或有类型的变量不初始化即为`nil`

```swift
let a: Int?
```

`nil`只能与或有类型进行比较：

```swift
if (1 == nil) {} // error
```

### 或有绑定（Optional Binding）

> 或有绑定，是先判断或有值是否存在，如果存在则将其值存于临时变量中。一般出现在控制流语句，如`if`, `guard` 和 `while`。

```swift
if let actualNumber = Int(possibleNumber) {
    print("The string \"\(possibleNumber)\" has an integer value of \(actualNumber)")
}
```

```swift
let actualNumber = Int(possibleNumber)
if let myNumber {
    print("My number is \(myNumber)")
}
```

### 强制展开（Force Unwrapping）

- Force Unwrapping indicates I am sure Optional has a typed value.

```swift
let a: Int? = 1
print(a!) // 1 // use exclamation point(!) as postfix.
```

### Implicitly Unwrapped Optionals

```swift
let a: Int! = 1
print(a) // Optional(1)
```

## 类型别名（Type Alias）

```swift
typealias Audio = Int8
```

# 断言和先决（Assertion and Precondition）

> building: `assert`, `assertFailure`

> production: `precondition`, `preconditionFailure`

- terminate your app while false condition met.

- used to detect the condition that is certain to prevent program from proceeding.

# 操作符

> Swift支持重载操作符方法，以及自定义新的操作符。

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

## `for...in`

> 用于自动迭代实现了序列（`Sequence`）协议的数据，如区间、字符串、数组、字典等等。

```swift
for i in 1...5
for e in [1, 2, 3]
```

## `while`

## `repeat...while`

- like do...while in C

## `switch`

- no implicit fallthrough: flow will be finished once first matching completed except states a `fallthrough` keyword.

- `break` is not required.

- doesn't allow empty case. (`break` is a good fill)

### interval matching
```swift
case 1...5:
```
```swift
case 1..<5:
```

### tuple
```swift
case (let x, 0):
```
```swift
case let (x, y):
```

### where
```swift
case let (x, y) where x == y:
```
- value bindings are available in where clause

### fallthrough
```swift
case 1:
  fallthrough
```

- fallthrough doesn't check the case condition of it causes execution fall into

- value bindings are available in the fallen into

## labeled statement

## guard...else

- value bindings in guard statement are available in the rest of code block guard statement appears in.

- else branch must transfer control to exit the code block guard appears in. such as `return`, `break`, `continue`, `throw`, `fatalError`...

- like a production mode `assert`

# 函数

[Function](https://docs.swift.org/swift-book/LanguageGuide/Functions.html#)

```swift
func [functionName]([parameterLabel|_] [parameter: type] = [defaultValue] ...) [throws] [-> type] { }
```

function varies in `parameter label`, `parameter type`, and `return type`.

## (v5.1) implicit return

> If the entire body of the function is a single expression, the function implicitly returns that expression.

```swift
func greet(name: String) -> String {
  "Hello! \(name)."
}
```

## 形参（Parameter）

### 参数默认值

```swift
func greet(_ who: String = "Everyone") -> String {
  return greet(name) // Hi! ...
}
```

### 不定参数 (Variadic Parameter)

```swift
func greet(name: String...) {
  for e in name { print(greet(e)) }
}
greet(name: "Lucky", "Lily")
```

### 可修改参数 (In-Out Parameter)

> 函数参数默认是常量，当需要修改时，需要声明形参类型为可输入输出（`inout`）类型，并传入引用值（`&`）。

- 可输入输出的参数没有~~默认值~~，也不能是~~不定参数~~。

```swift
func swap(a: inout Int, b: inout Int) {
  let x = a
  a = b
  b = a
}
var (a, b) = (1, 2)
swap(&a, &b) // place a ampersand (`&`,) before a variable to indicate it can be modified.
print(a, b) // 2, 1
```

## 实参标签（Argument Label）

> 实参标签在调用函数时作为实参的名称。

```swift
func greet(from hometown: String) -> String {
  "Glad you could visit from \(hometown)."
}
greet(from: "China")
```
> 不声明时其默认与参数名称相同。
```swift
// 默认标签
func greet(hometown: String) -> String {
  "Glad you could visit from \(hometown)."
}
greet(hometown: "China")
```
> 省略标签用`_`代替。
```swift
func greet(_ name: String) -> String {
  "Hi! \(name)"
}
greet("world")
```

## 返回多个值 (Return Tuple)

```swift
func extent(arr: [Int]) -> (min: Int, max: Int) {
  var last: Int, max = arr[0], min = arr[0]
  for e in arr[1..<arr.count] {
    if e > last { max = e }
    if e < last { min = e }
  }
  return (min, max)
}
print(extent([1,2,3,4,5])) // (min: 1, max: 5)
```
> return optional tuple types (`?`)
```swift
func extent(_ arr: [Int]) -> (min: Int, max: Int)? {
  if arr.isEmpty { return nil }
  return extent(arr: arr)
}
print(extent([]) as Any) // nil
```

## 忽略返回值 (`_`)

```swift
_ = greet("Lucky")
greet("Lucky") // warning: result of call to 'test()' is unused
```

# 闭包表达式

> [闭包](https://docs.swift.org/swift-book/LanguageGuide/Closures.html#)：捕获并可*持续*（即使这些变量的原始上下文已经不存在了）读取外部变量的*自包含功能块*（即函数，区别于与普通代码块）。故，嵌套函数是一种具名的闭包。（*Closures are self-contained blocks of functionality that can be passed around and used in your code. Closures can capture and store references to any constants and variables from the context in which they’re defined.*）

闭包表达式（*Closure Expression*）语法：

```swift
{ (parameters) -> return type in
    statements
}
```

```swift
let names = ["Chris", "Alex", "Ewa", "Barry", "Daniella"]
names.sorted(by: { (a: String, b: String) -> Bool in return a > b })
```

通过上下文自动推导参数类型（*Inferring Type From Context*）

```swift
names.sorted(by: { (a, b) -> Bool in a > b })
```

单表达式可以省略`return`（*Implicit Returns from Single-Expression Closures*）

```swift
names.sorted(by: { (a: String, b: String) -> Bool in a > b })
```

通过魔术变量省略形参定义（*Shorthand Argument Names*）

```swift
names.sorted(by: { $0 > $1 })
```

直接使用操作符方法（*Operator Methods*）

```swift
names.sorted(by: >)
```

## 尾随闭包（Trailing Closure）

> 如果闭包作为函数最后一个或多个参数，则该闭包可以紧写在函数调用的括号外。

```swift
names.sorted() { $0 > $1 }
```
```swift
// 多个尾随闭包
loadPicture(from: someServer) { picture in
    someView.currentPicture = picture
} onFailure: {
    print("Couldn't download the next picture.")
}
```

> 如果函数仅有该闭包一个参数，则可以省略函数调用的括号`()`。

```swift
names.sorted { $0 > $1 }
```

## 逃逸闭包（Escaping Closure）

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

## 自动闭包（Autoclosure）

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

# 枚举

> [枚举（Enumerations）](https://docs.swift.org/swift-book/LanguageGuide/Enumerations.html)：（*An enumeration defines a common type for a group of related values and enables you to work with those values in a type-safe way within your code.*）

- 枚举的原始值类型可以是字符串、字符、整数、浮点数；
- 可以定义案例关联值；
- 可以定义计算属性；
- 可以定义方法；
- 可以定义初始化器；
- 可以[扩展](#扩展extension)原始实现；
- 可以声明符合[协议](#协议protocol)以提供标准功能；

```swift
enum CompassPoint {
  case east
  case south
  case west
  case north
}
// 枚举案例写在一行
enum CompassPoint {
  case east, south, west, north
}
var point = CompassPoint.east
// 已知类型为CompassPoint，可以直接用点表示法赋值
point = .south
```

## 关联值（Associated Values）

```swift
enum Barcode {
  case upc(Int, Int, Int, Int)
  case qrCode(String)
}
let goodBarcode = Barcode.upc(1,2,3,4)
goodBarcode = Barcode.qrCode("qrCodeInformation")
```

## 可迭代（Iterable Cases）

```swift
enum CompassPoint: CaseIterable {
  case east, south, west, north
}
for beverage in Beverage.allCases {
    print(beverage)
}
```

## 原始值（Raw Value）

```swift
enum Weekday: Int {
  case monday = 1
  case tuesday = 2
  case wednesday = 3
  case thursday = 4
  case friday = 5
}
```

### 隐式原始值（Implicit Raw Value）

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

### 通过原始值初始化（Initializing from Raw Value）

> instance is a Optional.

```swift
let day = WeekDay(rawValue: 1) // Optional(WeekDay.monday)
let day2 = WeekDay(rawValue: 5) // nil
```

## 递归枚举（Recursive Enumerations）

> enumeration or case is identified with `indirect` prefix.

```swift
enum Arithmetic {
  case number(Int)
  indirect case addition(Arithmetic, Arithmetic)
  indirect case multiplication(Arithmetic, Arithmetic)
}
```
```swift
indirect enum Arithmetic {
  case number(Int)
  case addition(Arithmetic, Arithmetic)
  case multiplication(Arithmetic, Arithmetic)
}
```

# 结构（Structure）和类（Class）

> 结构和类在定义、调用等方面基本相同，可以定义属性、方法、初始化器、扩展默认实现、实现协议等，也都是通过下标调用值。

相同点：

- 可以定义属性；
- 可以定义方法；
- 可以定义初始化器；
- 可以定义[下标方法](#下标方法subscript)（类似getter/setter）；
- 可以[扩展](#扩展extension)原始实现；
- 可以声明符合[协议](#协议protocol)以提供标准功能；

区别：

- 结构是值类型，而类是引用类型；
- 类可以定义反初始化器；
- 类可以继承；
- 类实例可以在运行时进行类型判断和解释；
- 类是引用类型，故类实例可以被多次引用；

## 结构

```swift
struct Resolution {
    var width = 0
    var height = 0
}
```

> 创建实例
```swift
let unknown = Resolution()
```

> 默认初始化器，结构默认有一个初始化所有成员属性的初始化器
```swift
let vga = Resolution(width: 640, height: 480)
```

## 类

```swift
class VideoMode {
    var resolution = Resolution()
    var interlaced = false
    var frameRate = 0.0
    var name: String?
}
```

## 下标方法（Subscript）

# 扩展（Extension）

> 阔扩展是给已存在的结构、类、枚举或协议等添加新的功能；

# 协议（Protocol）

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

# *Swift Doc Toc Generator

```js
;(function() {
  const tags = ['h1', 'h2', 'h3', 'h4', 'h5']
  const str = []
  const toc = []
  ;[].forEach.call(document.querySelector('article').querySelectorAll(tags.join(',')), e => {
    let text = '', link = ''
    const level = tags.indexOf(e.tagName.toLowerCase())
    for (const el of e.childNodes) {
      if (el.nodeType === 3) text += el.nodeValue
      if (el.tagName === 'A') link = el.getAttribute('href')
    }
    str.push("\t".repeat(level) + text)
    toc.push(
      `<div style="padding-left: ${level}em; white-space: nowrap">
      <a title="${text}" href="${link}">${text}</a></div>`
    );
  })
  console.log(str.join('\n'))
  let ele = document.getElementById("toc")
  let newEle
  if (!ele) {
    newEle = true
    ele = document.createElement('div')
    ele.id = "toc"
  }
  ele.setAttribute("style", `
    position: fixed; z-index: 9999; top: 50px; right: 20px;
    font-size: 14px; background: white;
    width: 220px; max-height: calc(100vh - 100px); overflow: auto`)
  ele.innerHTML = toc.join("")
  if (newEle) {
    document.body.appendChild(ele);
  }

  if ('LAST_ACTIVE_HEAD' in window) {
    return
  }
  const script = `
  (function() {
    let LAST_ACTIVE_HEAD = null
    const headers = document.querySelector('article').querySelectorAll('${tags.join(",")}')
    for (const e of headers) {
      e.setAttribute('data-href', e.querySelector('a').getAttribute('href'))
    }
    window.addEventListener('scroll', e => {
      let last
      for (const e of headers) {
        const top = e.getBoundingClientRect().top
        if (top < 200) {
          last = e.getAttribute('data-href')
        }
        if (top > 200) {
          break
        }
      }
      if (last && last !== LAST_ACTIVE_HEAD) {
        // console.log(last, LAST_ACTIVE_HEAD)
        if (last) document.querySelector('#toc [href="' + last + '"]').setAttribute('style', 'color: red;font-size: 1.5em')
        if (LAST_ACTIVE_HEAD) document.querySelector('#toc [href="' + LAST_ACTIVE_HEAD + '"]').setAttribute('style', '')
        LAST_ACTIVE_HEAD = last
      }
    })
  })()`
  const sc = document.createElement("script")
  sc.innerHTML = script
  document.body.appendChild(sc)
})();
```

[SwiftGuide]: https://docs.swift.org/swift-book/LanguageGuide/TheBasics.html
