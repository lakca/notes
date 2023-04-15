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
- 支持类型推断（*Type Inference*）
- （变量或常量）调用前初始化即可（*Initialization Before Used*）
- 整型溢出检测（*Integer Bounds*）
- 显式处理空值（*Optional*）
- 禁止变量遮蔽（*~~Shadowing~~*）
- 禁止越界索引（*Out-of-Bounds Errors*）
- 支持元组（*Tuple*）、多值返回（*Multiple Return Values*）
- 支持[泛型](#泛型generics)（*Generics*）
- 支持[协议](#协议protocol)（*Protocols*）
- 支持类型[扩展](#扩展extension)，包括基本类型（*Extensions*）
- 支持重载，包括方法、运算符和下标等等（*Overloading*）
- 支持字符串插值（*String Interpolation*）
- 支持[闭包](#闭包closures)（*Closure*）
- 支持实参标签（形参和实参可以不同名称）
- 支持不定参数
- 支持[修改函数参数](#可修改参数-inout)
- 支持枚举荷载（*Enumeration Playload*）
- 支持模式匹配（*Pattern Matching*）
- 支持错误捕获、冒泡和断言
- 常量没有严格的值不可变，对于引用类型只存储引用地址，属性仍然是可变的（类似*Javascript*的常量对象）
- 句尾分号可选`;`（同*Javascript*，换行符和分号均为语句分隔符）
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

- 声明时须确定类型；
- 使用前必须声明；
- 使用前初始化即可；
- 不支持名称遮蔽（二次声明）；
- 命名可以使用语言关键字，需反引号（<code>``</code>）包裹，但不建议；
- 命名支持*Unicode*字符，但不支持空白字符、数学符号、箭头、[线框字符](https://en.wikipedia.org/wiki/Box-drawing_character)、[私域字符](https://en.wikipedia.org/wiki/Private_Use_Areas)等字符。（*Constant and variable names can’t contain whitespace characters, mathematical symbols, arrows, private-use Unicode scalar values, or line- and box-drawing characters. Nor can they begin with a number, although numbers may be included elsewhere within the name.*）
- 常量可在全局或局部声明；
- 常量不影响结构等复合类型（*Compound Types*）内部属性的可变性；

```swift
// 声明时须确定类型：
var a: Int = 1
let A: Int = 1;

// 初始化只要求在使用前即可：
var b: Int
var B: Int
b = 1
B = 1

// 但初始化可自动推断类型：
var c = 1
let C = 1

// 可以在同一行声明多个变量：
var d = 2, e = 3
var f, g: Int
let d = 2, e = 3
let f, g: Int
```

# 类型（Types）

获取数据类型：

```swift
print(type(of: "hello"))
```

## 类型别名（Type Alias）

```swift
typealias Audio = Int8
```

## 值类型和引用类型（Value Types & Reference Types）

> [值类型（Value Types）][Structures-and-Enumerations-Are-Value-Types]在其被传递时（如赋值给变量、常量或者作为参数传入函数等）会复制数据。包括[结构（Structures）和枚举（Enumerations）][Structures-and-Enumerations-Are-Value-Types]

> 与值类型相对，[引用类型（Reference Types）][Classes-Are-Reference-Types]在其被传递时只会创建引用，而不会复制数据，前后均指向同一个实例。包括[类（Classes）][Classes-Are-Reference-Types]和[行为体（Actors）](#行为体actor)。

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
assert("hello world".hasPrefix("hello"))
assert("hello world!".hasSuffix("!"))
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

> `Int`（32bit/64bit）、`Int16`、`Int32`、`Int64`；`UInt`（32bit/64bit）、`UInt16`、`UInt32`、`UInt64`、`Float`（32bit）、`Double`（64bit）

- 禁止溢出；
- 支持字面量格式化；

```swift
// 整数默认类型为`Int`：
assert(type(of: 1) == Int.self)

// 浮点数默认类型为`Double`：
assert(type(of: 1.0) == Double.self)

// 类型转换：
assert(type(of: Int8(1.1)) == Int8.self)

// 数字字面量兼容所有数字类型：
let c: Float = 1 // 不需要写成1.0

// 字面量支持补`0`和`_`分隔符进行格式化：
assert(1_000_000 == 1000000)
assert(00.1200 == 0.12)

// 二进制（`0b`）、八进制（`0o`）、十六进制（`0x`）：
print(31, 0b11111, 0o37, 0x1f)

// 十进制科学计数法：
assert(1.2e2 == 1.2e-2)

// 十六进制（浮点数必须使用）科学计数法（十六进制科学计数法以2为底数）：
assert(0x1.2p2 == 4.5) // (1 + 2 * 16^-1) * 2^2
assert(0x1.2p-2 == 0.28125) // (1 + 2 * 16^-1) * 2^-2

// 最大值、最小值：
assert(Int8.max == 127)
assert(Int8.min == -128)
```

### 布尔（Boolean）

```swift
let orangesAreOrange: Bool = true
let turnipsAreDelicious = false
```

> Swift是类型安全的，不允许非布尔值替代（自动转换成）布尔值。

```swift
if 1 {} // error
```

### 元组（Tuples）

匿名元组：

```swift
let http404Error = (404, "Not Found")
assert(http404Error.0 == 404)

let a = 1, b = 2
let c = (a, b)
assert(c == (1, 2))
```

具名元组：

```swift
let http200Status = (statusCode: 200, description: "OK")
```

解构元组：

```swift
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

# 可空类型（Optional）

> *Optional* 表示某类型不是一直都存在值。一般用于变量声明、类型转换的返回值等。

在类型后添加`?`表示或有类型：

```swift
var a: Int?
assert(type(of: a) == Optional<Int>.self)
```

### 空值（`nil`）

> `nil`不是一个空指针，单纯是语法层面表示值不存在。

可空类型默认值为`nil`

```swift
var a: Int?
assert(a == nil)
```

### 可空绑定（Optional Binding）

> 判断并存储非空值于临时变量中并执行条件语句。一般出现在控制语句中，如`if`, `switch`, `guard`, `while`。

```swift
var possibleNumber: Int? = 1
if let actualNumber = possibleNumber {
    print("The string \"\(possibleNumber)\" has an integer value of \(actualNumber)")
    // The string "Optional(1)" has an integer value of 1
}
```

### 强制解包（Implicitly Force Unwrapping）

> 在明确知道可空值不为空的时候，可以使用强制解包获取值。

```swift
var a: Int? = 1
assert(a == Optional(1))
assert(a! == 1)
```

### 自动解包可空类型（Implicitly Unwrapped Optionals）

> 声明为**自动解包可空类型**的变量在获取值时无需显式解包。

```swift
var a: Int! = 1
// a 仍然是Optional
assert(a == Optional(1))
// 但可以无需解包直接使用：
let b: Int = a
```

### 可空链（Optional Chaining）

> 当遇见空值时中断后续执行并返回`nil`，从而无需[解包（Forced Unwrapping）](#强制解包implicitly-force-unwrapping)以直接访问可空值的成员（属性、方法等）。

```swift
if let firstRoomName = john.residence?[0].name {
    print("The first room name is \(firstRoomName).")
}
if let johnsStreet = john.residence?.address?.street {
    print("John's street name is \(johnsStreet).")
}
if let buildingIdentifier = john.residence?.address?.buildingIdentifier() {
    print("John's building identifier is \(buildingIdentifier).")
}
```

# 断言（Assertion）

> 断言失败将直接退出程序。

```swift
// 普通断言仅在调试模式（选项`-Onone`）生效。（选项`-O`开启时会跳过，选项`-Ounchecked`开启时条件始终编译为`true`）。
assert(
    _ condition: @autoclosure () -> Bool,
    _ message: @autoclosure () -> String = String(),
    file: StaticString = #file,
    line: UInt = #line
)
assertionFailure(
    _ message: @autoclosure () -> String = String(),
    file: StaticString = #file,
    line: UInt = #line
)

// 先决断言在发布模式（选项`-O`）也生效。（`-Ounchecked`选项开启时条件始终编译为`true`）。
precondition(
    _ condition: @autoclosure () -> Bool,
    _ message: @autoclosure () -> String = String(),
    file: StaticString = #file,
    line: UInt = #line
)
preconditionFailure(
    _ message: @autoclosure () -> String = String(),
    file: StaticString = #file,
    line: UInt = #line
) -> Never

// 所有模式下均生效（比如用在还未部署的功能作为占位和提示`fatalError("Unimplemented")`）。
fatalError(
    _ message: @autoclosure () -> String = String(),
    file: StaticString = #file,
    line: UInt = #line
) -> Never
```

# 错误处理（Error Handling）

> 所有错误必须遵循`Error`协议。

- 为了避免大量性能消耗，Swift错误处理不会解开调用栈（~~unwinding call stack~~）；

```swift
enum VendingMachineError: Error {
    case invalidSelection
    case insufficientFunds(coinsNeeded: Int)
    case outOfStock
}
```

## 抛出错误（`throw`）

> 通过`throw`关键字抛出错误。

```swift
throw VendingMachineError.insufficientFunds(coinsNeeded: 5)
```

## 错误处理

### 错误冒泡（`throws`）

> 通过`throws`关键字声明可抛错函数。

```swift
func canThrowErrors() throws -> String

func cannotThrowErrors() -> String
```

### 直接处理（`do...catch`）

> 没有声明为可抛错的函数均须处理错误。

```swift
do {
    try <#expression#>
    <#statements#>
} catch <#pattern 1#> {
    <#statements#>
} catch <#pattern 2#> where <#condition#> {
    <#statements#>
} catch <#pattern 3#>, <#pattern 4#> where <#condition#> {
    <#statements#>
} catch {
    <#statements#>
}
```

### 转成可空值（`try?`）

> 通过`try?`关键字执行函数，返回Optional（在抛错时返回`nil`）。

```swift
let ret = try? vend() // "Success" or nil.
```

### 错误断言（`try!`）

> 通过`try!`关键字执行函数，断言错误不会发生（抛错时将得到运行时错误）。

```swift
let photo = try! loadImage(atPath: "./Resources/John Appleseed.jpg")
```

# 操作符（Operators）

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

# 控制流程（Control Flow）

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

## `defer`

> [defer](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/errorhandling#Specifying-Cleanup-Actions)语句在作用域结束前调用。

- `defer`语句可以有多个，并按倒序执行；
- `defer`语句中不能有~~转移控制语句（如`return`, `break`）~~；
- `defer`语句中不能~~抛错~~；

```swift
func processFile(filename: String) throws {
    if exists(filename) {
        let file = open(filename)
        defer {
            close(file)
        }
        while let line = try file.readline() {
            // Work with the file.
        }
        // close(file) is called here, at the end of the scope.
    }
}
```

## 语句标签（label）

```swift
<#label#>: while <#condition#> {
   <#statements#>
}
```

## 检查环境

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

## 可修改参数 (`inout`)

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

> 通过在闭包类型前声明`@autoclosure`，可以省略闭包体~~标识符（`{}`）~~：

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

- 可以定义[枚举项原始值](#枚举项原始值raw-values)
- 可以定义[枚举项关联值](#枚举项关联值associated-values)；
- 可以定义[初始化器](#初始化initializations)；
- 可以定义[计算属性](#计算属性computed-properties)；
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

- 定义[属性（Properties）](#属性properties)；
- 定义[方法（Methods）](#方法methods)；
- 定义[初始化器（Initializers）](#初始化initializations)；
- 定义[下标方法（Subscript Methods）](#下标方法subscript)；
- 支持[扩展（Extensions）](#扩展extension)；
- 支持部署[协议（Protocols）](#协议protocol)；

*类（Class）*还有一些额外特性：

- 定义[反初始化器（Deinitializers）](#反初始化deinitializations)；
- 支持[继承（Inheritance）](#继承inheritance)；
- 实例可以在运行时进行类型判断和解释（*Type Casting*）；
- 类是[引用类型](#值类型和引用类型value-types--reference-types)，实例可以被多次引用（*Reference Type*）；

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

> [类（Classes）](#结构structures和类classes)、[结构（Structures）](#结构structures和类classes)和[枚举（Enumerations）](#枚举enumerations)均可以定义[属性（Properties）][properties]。

- 属性遵循[访问控制](#访问控制access-control)；
- 支持变量属性`var`和常量属性`let`；
- 通过`static`前缀关键字定义类型属性（*Type Properties*）；
- 通过`lazy`前缀关键字定义懒加载属性（*Lazy Properties*）；
- 支持定义计算属性（*Computed Properties*）；
- 支持定义属性观察器（*Property Observers*）；
- 支持定义属性包装器（*Property Wrappers*）（即属性装饰器）；

## 存储属性（Stored Properties）

> [类（Classes）](#结构structures和类classes)或[结构（Structures）](#结构structures和类classes)可以定义[存储属性][Stored-Properties]，以在实例中存储变量（*variable stored property*）或常量（*constant stored property*）。

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

## 懒加载属性（`lazy`）

> **懒加载属性（Lazy Stored Property）**直到第一次使用时才计算初始值。需要注意的是，如果懒加载属性被多个线程访问，不能保证其只会被初始化一次。

```swift
class DataManager {
  lazy var importer = DataImporter()
  var data: [String] = []
}
let manager = DataManager()
print(manager.importer.filename) // 此时importer才被初始化
```

## 计算属性（Computed Properties）

> [类（Classes）](#结构structures和类classes)、[结构（Structures）](#结构structures和类classes)和[枚举（Enumerations）](#枚举enumerations)均可以定义[计算属性][Computed-Properties]，提供`getter`和`setter`方法。

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

## 属性观察器（Property Observers）

> [属性观察器][Property-Observers]监视并响应属性的变化，即使赋值前后是同一个值。

观察方法有`willSet`, `didSet`，并可在以下场景下监视属性：

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

## 属性包装器（`@propertyWrapper`）

> [属性包装器][Property-Wrappers]的作用类似某些编程语言中的装饰器，但专门针对于属性。

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

> [类（Classes）](#结构structures和类classes)、[结构（Structures）](#结构structures和类classes)和[枚举（Enumerations）](#枚举enumerations)均可以定义[方法](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/methods)，包括*实例方法（instance methods）*和*类型方法（type methods）*。

- 方法就是关联到某个类型的函数（*Associated Functions*），故方法和函数写法完全一致，包括不定参数、参数标签、默认值等等;
- 通过`static`前缀关键字声明类型方法（*Type Methods*）；
- 方法支持重载（*Overloading*）；
- 方法内部通过`self`指代当前实例（或类型）；
- 方法内部可以（不通过`self.`）直接调用实例（或类型）属性和实例（或类型）方法；

```swift
class Counter {
    var count = 0
    func increment() {
        count += 1
    }
    // 重载
    func increment(by amount: Int) {
        count += amount
    }
    func reset() {
        count = 0
    }
}
```

类型方法：

```swift
struct LevelTracker {
    static var highestUnlockedLevel = 1
    var currentLevel = 1

    static func unlock(_ level: Int) {
        if level > highestUnlockedLevel { highestUnlockedLevel = level }
    }

    static func isUnlocked(_ level: Int) -> Bool {
        return level <= highestUnlockedLevel
    }

    @discardableResult
    mutating func advance(to level: Int) -> Bool {
        if LevelTracker.isUnlocked(level) {
            currentLevel = level
            return true
        } else {
            return false
        }
    }
}
```

> [类（Classes）](#结构structures和类classes)可以用`class`关键字代替`static`。

```swift
class SomeClass {
    class func someTypeMethod() {
        // type method implementation goes here
    }
}
```

## 通过方法修改值类型实例（`mutating`）

> 因为[结构（Structures）](#结构structures和类classes)和[枚举（Enumerations）](#枚举enumerations)是值类型，所以实例及其属性在默认情况下是不能通过普通方法修改的，需要在方法前显式地增加`mutating`关键字声明。

```swift
struct Point {
    var x = 0.0, y = 0.0
    // 修改实例属性
    mutating func moveBy(x deltaX: Double, y deltaY: Double) {
        x += deltaX
        y += deltaY
    }
    // 甚至可以修改实例本身
    mutating func replaceBy(x: Double, y: Double) {
        self = Point(x: x, y: y)
    }
}
// 即使声明了`mutating`，要想修改仍需要声明为变量才可以：
var somePoint = Point(x: 1.0, y: 1.0)
somePoint.moveBy(x: 2.0, y: 3.0)
```

## 下标方法（`subscript`）

> [类（Classes）](#结构structures和类classes)、[结构（Structures）](#结构structures和类classes)和[枚举（Enumerations）](#枚举enumerations)均可以定义[下标方法](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/subscripts/)，用于快速访问序列类型数据元素。

- 通过`subscript`关键字定义下标方法；
- 下标方法支持重载（*Overloading*）;
- 除了无法定义~~in-out~~参数，下标方法和普通函数一样；
- 通过`static`关键字定义类型下标方法（*Type Subscripts*）；

```swift
subscript(index: Int) -> Int {
    get {
        // Return an appropriate subscript value here.
    }
    set(newValue) {
        // Perform a suitable setting action here.
    }
}
```

只有`getter`的下标方法：

```swift
subscript(index: Int) -> Int {
    // Return an appropriate subscript value here.
}
```

不定参数（*Variadic Parameters*）和参数默认值（*Default Parameter Values*）：

```swift
struct Matrix {
    let rows: Int, columns: Int
    var grid: [Double]
    init(rows: Int, columns: Int) {
        self.rows = rows
        self.columns = columns
        grid = Array(repeating: 0.0, count: rows * columns)
    }
    func indexIsValid(row: Int, column: Int) -> Bool {
        return row >= 0 && row < rows && column >= 0 && column < columns
    }
    subscript(row: Int, column: Int) -> Double {
        get {
            assert(indexIsValid(row: row, column: column), "Index out of range")
            return grid[(row * columns) + column]
        }
        set {
            assert(indexIsValid(row: row, column: column), "Index out of range")
            grid[(row * columns) + column] = newValue
        }
    }
}
var matrix = Matrix(rows: 2, columns: 2)
matrix[0, 1] = 1.5
```

# 初始化（Initializations）

## 初始化器（`init`）

> [类（Classes）](#结构structures和类classes)、[结构（Structures）](#结构structures和类classes)和[枚举（Enumerations）](#枚举enumerations)均可以定义[初始化器](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/initialization)，用于初始化[存储属性](#存储属性stored-properties)。

- 初始化器是一个名为`init`的[方法](#方法methods)，不返回值；
- 初始化器支持重载（*Overloading*）；
- 初始化器中可以初始化常量`let`属性；

```swift
class SurveyQuestion {
    let text: String
    var response: String?
    init(text: String) {
        // 初始化常量
        self.text = text
    }
    func ask() {
        print(text)
    }
}
```

## 默认初始化器（Default Initializer）

> 当所有存储属性都无需初始化时，[类（Classes）](#结构structures和类classes)和[结构（Structures）](#结构structures和类classes)具有一个*默认初始化器（Default Initializer）*；

```swift
class ShoppingListItem {
    var name: String?
    var quantity = 1
    var purchased = false
    /* init() {} */
}
var item = ShoppingListItem()
```

> 在定义初始化器后，默认初始化器将失效。如有必要，可以定义显式一个空的初始化器代替；

```swift
class ShoppingListItem {
    var name: String?
    init() {}
    init(name: String) {
      self.name = name
    }
}
```

> [结构（Structures）](#结构structures和类classes)具有一个默认初始化所有存储属性的*成员初始化器（Memberwise Initializer）*；

```swift
struct Size {
    var width = 0.0, height = 0.0
}
let twoByTwo = Size(width: 2.0, height: 2.0)
let zeroByTwo = Size(height: 2.0)
let zeroByZero = Size()
```

## 初始化器委托（Initializer Delegation）

> **初始化器委托**可以让你在一个初始化器中调用其他（包括重载的和继承的）初始化器。

对于*值类型（Value Types）*（结构和枚举）而言，可以直接交叉调用初始化器：

```swift
struct Rect {
    var origin = Point()
    var size = Size()
    init() {}
    init(origin: Point, size: Size) {
        self.origin = origin
        self.size = size
    }
    init(center: Point, size: Size) {
        let originX = center.x - (size.width / 2)
        let originY = center.y - (size.height / 2)
        self.init(origin: Point(x: originX, y: originY), size: size)
    }
}
```

对于[类](#结构structures和类classes)而言，要想调用其他平行的初始化器，则必须通过`convenience`前缀关键字声明**便利初始化器（Convenience Initializers）**：

```swift
class Food {
    var name: String
    init(name: String) {
        self.name = name
    }
    convenience init() {
        self.init(name: "[Unnamed]")
    }
}
class RecipeIngredient: Food {
    var quantity: Int
    init(name: String, quantity: Int) {
        self.quantity = quantity
        super.init(name: name)
    }
    override convenience init(name: String) {
        self.init(name: name, quantity: 1)
    }
}
```

## 可失败的初始化器（`init?`）

> 调用**可失败初始化器（Failable Initializer）**返回的实例是可空的（*Optional*）的，即可失败初始化器可以返回`nil`。

通过`init?`（或`init!`）声明可失败初始化器：

```swift
struct Animal {
    let species: String
    init?(species: String) {
        if species.isEmpty { return nil }
        self.species = species
    }
}
let someCreature = Animal(species: "Giraffe")
// someCreature is of type Animal?, not Animal

if let giraffe = someCreature {
    print("An animal was initialized with a species of \(giraffe.species)")
}
```

> 可失败初始化器可以被（子类）正常初始化器覆盖，反之则不行。

```swift
class Document {
    var name: String?
    // this initializer creates a document with a nil name value
    init() {}
    // this initializer creates a document with a nonempty name value
    init?(name: String) {
        if name.isEmpty { return nil }
        self.name = name
    }
}
class UntitledDocument: Document {
    override init() {
        super.init(name: "[Untitled]")!
    }
}
```

## 必须的初始化器（`required`）

> 对于[类](#结构structures和类classes)而言，可以通过`required`前缀关键字强制子类必须实现该初始化器。（子类的该初始化器如果是继承而来，则无需显式声明。）

```swift
class SomeClass {
    required init() {
    }
}
// 子类中也必须声明为`required`
class SomeSubclass: SomeClass {
    required init() {
    }
}
```

## 通过闭包或函数声明属性默认值

> 闭包执行时实例还未初始化，故闭包中无法调用任何实例属性或方法。

```swift
class SomeClass {
    let someProperty: SomeType = {
        // create a default value for someProperty inside this closure
        // someValue must be of the same type as SomeType
        return someValue
    }()
}
```

## 反初始化（Deinitializations）

> [类](#结构structures和类classes)可以定义反初始化器。

Swift是自动内存管理的，反初始化器只是实例被销毁前一个必定会被自动执行的钩子函数。

```swift
class Bank {
    static var coinsInBank = 10_000
    static func distribute(coins numberOfCoinsRequested: Int) -> Int {
        let numberOfCoinsToVend = min(numberOfCoinsRequested, coinsInBank)
        coinsInBank -= numberOfCoinsToVend
        return numberOfCoinsToVend
    }
    static func receive(coins: Int) {
        coinsInBank += coins
    }
}
class Player {
    var coinsInPurse: Int
    init(coins: Int) {
        coinsInPurse = Bank.distribute(coins: coins)
    }
    func win(coins: Int) {
        coinsInPurse += Bank.distribute(coins: coins)
    }
    deinit {
        Bank.receive(coins: coinsInPurse)
    }
}
```

# 继承（Inheritance）

> [类（Classes）](#结构structures和类classes)支持继承。

- 子类可以向继承的所有属性添加[属性观察器](#属性观察器property-observers)；
- 子类可以通过`super`访问超类；
- 子类通过`override`前缀关键字覆盖超类定义的属性或方法；
- 通过`final`前缀关键字可以防止属性或方法被覆盖；

```swift
class Car: Vehicle {
    // gear 无法被子类覆盖
    final var gear = 1
    // 覆盖属性：通过定义setter和getter实现
    override var description: String {
        return super.description + " in gear \(gear)"
    }
    // 覆盖方法
    override func makeNoise() {
        print("Choo Choo")
    }
    // 属性观察器
    override var currentSpeed: Double {
        didSet {
            gear = Int(currentSpeed / 10.0) + 1
        }
    }
}
```

# 扩展（Extension）

> 阔扩展是给已存在的结构、类、枚举或协议等添加新的功能；

# 协议（Protocol）

# 泛型（Generics）

# 特性（Attributes）

> [特性](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/attributes/)向*声明（Declaration）*或*类型（Type）*附加信息，用于改变编译器的默认行为，类似*Rust*中的*Attribute Macro*。

# 并发（Concurrency）

> Swift原生支持异步（*Asynchronous*）和并行（*Parallel*），并统称为[并发（Concurrency）](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/concurrency)。

## 异步（`async`）

> **异步**是使异步任务在代码层面实现同步化调用的一种手段。

```swift
func listPhotos(inGallery name: String) async throws -> [String] {
    try await Task.sleep(until: .now + .seconds(2), clock: .continuous)
    return ["IMG001", "IMG99", "IMG0404"]
}
func downloadPhoto(named name: String) async {
  try? await Task.sleep(nanoseconds: 3_000_000_000)
  print("downloaded:" + name)
}
```

异步函数可被调用（`await`）的位置：

- 异步上下文（`async`）内部；
- 被`@main`标记的结构、类或枚举的`main()`静态函数内部；
- [非结构化并发](#非结构化并发unstructured-concurrency)任务内部；

```swift
print(try! await listPhotos(inGallery: "Summer Vacation"))
print(try! await listPhotos(inGallery: "Summer Vacation")[0])
```

> 通过`async let`创建子任务，以支持异步函数**并行调用**。

```swift
async let firstPhoto = listPhotos(inGallery: "Summer Vacation")[0]
async let secondPhoto = listPhotos(inGallery: "Summer Vacation")[1]
async let thirdPhoto = listPhotos(inGallery: "Summer Vacation")[2]
let photos = try! await [firstPhoto, secondPhoto, thirdPhoto]
assert(photos == ["IMG001", "IMG99", "IMG0404"])
```

> Swift的异步是多线程调度，所有异步任务都可能在不同线程执行，从而可能会产生数据竞争问题。

```swift
var a = 0
func setValue(v: Int) async {
  try? await Task.sleep(nanoseconds: 1_000_000_000)
  // error: main actor-isolated var 'a' can not be mutated from a non-isolated context
  a = v
}
```

为了解决多线程可能出现的数据竞争问题，Swift引入了一个异步上下文：[行为体（Actors）](#行为体actor)。

### 异步序列（`AsyncSequence`）

> 异步序列实现了`AsyncSequence`协议。通过`for-await-in`可以遍历异步序列。

```swift
import Foundation

let handle = FileHandle.standardInput
for try await line in handle.bytes.lines {
    print(line)
}
```

## 任务（Task）

> [任务（Task）](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/concurrency#Tasks-and-Task-Groups)：是程序中的异步执行单元。所有的异步代码都是在任务中真正实现调用的。

### 结构化并发（Structured Concurrency）

**任务组（Task Group）**由根任务和后代任务组成的具有层级结构的任务集合。

> 通过任务组的方式部署的并发称为**结构化并发（Structured Concurrency）**。

结构化并发（或者说层级结构）的特点：

- 子任务生命周期不会超过父任务；
- 取消某个任务，其后代任务均会被取消；
- 错误可以自动冒泡到父任务；
- 子任务默认继承父任务的优先级；
- 拥有本地数据；

> 通过`async let`创建**并发子任务**

- 子任务在创建后立刻执行；

```swift
async let firstPhoto = downloadPhoto(named: "IMG001")
async let secondPhoto = downloadPhoto(named: "IMG002")
async let thirdPhoto = downloadPhoto(named: "IMG003")
try! await [firstPhoto, secondPhoto, thirdPhoto]
// downloaded:IMG001
// downloaded:IMG0404
// downloaded:IMG99
```

> 通过`withTaskGroup()`和`withThrowingTaskGroup()`显式创建*任务组*

```swift
await withTaskGroup(of: Void.self, returning: Void.self) { groupTask in
  let photoNames = ["IMG001", "IMG99", "IMG0404"]

  for name in photoNames {
    // `addTask`添加子任务
    groupTask.addTask { await downloadPhoto(named: name) }
  }
}
// downloaded:IMG001
// downloaded:IMG0404
// downloaded:IMG99
```

### 非结构化并发（Unstructured Concurrency）

> （没有父任务的）独立任务实现的并发称为**非结构化并发（Unstructured Concurrency）**。

- 通过`Task.init(priority:operation:)`创建在当前上下文执行的任务。
- 通过`Task.detached(priority:operation:)`创建隔离于当前上下文的任务（不继承当前上下文的优先级、数据等）。

```swift
// parentTask是非结构化任务
let parentTask = Task {
  async let test: () = downloadPhoto(named: "IMG001")
  await test
}
await parentTask.value
// downloaded:IMG001
```

### 取消任务（Task Cancellation）

任务可以通过以下三种方式取消：

- 抛出`CancellationError`错误；
- 返回`nil`或空集合；
- 返回部分完成的任务；

```swift
func noAwaitAsynclet() async {
  print("begin noAwaitAsynclet")
  try? await Task.sleep(nanoseconds: 10_000_000_000)
  Task.isCancelled ? print("noAwaitAsynclet is cancelled") : print("end noAwaitAsynclet")
}

func testAsynclet() async {
  let parentTask = Task {
    async let test: () = noAwaitAsynclet()
    await test
  }
  parentTask.cancel() // 取消任务，sleep也跟着取消了
  await parentTask.value
  print("parentTask finished!")
}

await testAsynclet()
// begin noAwaitAsynclet
// noAwaitAsynclet is cancelled
// parentTask finished!
```

## 行为体（Actor）

> [行为体](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/concurrency#Actors)通过构建**独立的异步上下文**，让异步任务之间实现安全的数据共享。

具体地，行为体通过将数据作为其内部状态进行维护，并通过*消息盒（mailbox）*（一个异步任务队列）和*串行调度*来避免数据竞争。故行为体具有以下特点：

- 同一时刻只有一个任务可以改变其内部状态；
- 在行为体外部调用行为体内部状态均需要进入异步队列等待执行（`await`）；
- 行为体内部的调用是有在行为体内部调用行为体内部状态可以直接调用；

在语法形式上，除了不支持继承以外，行为体和类相似，且都是[引用类型](#值类型和引用类型value-types--reference-types)。

示例参考-[Swift 新并发框架之 actor](https://juejin.cn/post/7076738494869012494)
```swift
actor BankAccount {
  // 行为体状态
  static var timestamp: Int64 = 0
  let accountNumber: Int
  var balance: Double

  enum BankAccountError: Error {
    case insufficientBalance(Double)
    case authorizeFailed
  }
  // 除了无法继承，行为体同类一样
  init(accountNumber: Int, initialDeposit: Double) {
    self.accountNumber = accountNumber
    self.balance = initialDeposit
  }
  // 对于行为体内部方法来说，在串行机制的保障下，可以直接调用行为体状态
  func deposit(amount: Double) {
    assert(amount >= 0)
    balance = balance + amount
  }
  // 行为体内部定义异步方法也是可以的：
  func withdraw(amount: Double) async throws -> Double {
    guard balance >= amount else {
      throw BankAccountError.insufficientBalance(balance)
    }
    // 调用异步方法或属性
    guard await authorize() else {
      throw BankAccountError.authorizeFailed
    }
    balance -= amount
    return balance
  }
  private func authorize() async -> Bool {
    try? await Task.sleep(nanoseconds: 1_000_000_000)
    return true
  }
}
let ba = BankAccount(accountNumber: 10000, initialDeposit: 100)
// 对于行为体外部的调用来说，（数据是隔离的*isolated*）都会进入异步队列等待执行，故所有调用均需要等待（await）
await ba.deposit(amount: 100)
// 变量亦是
print(await ba.balance)
// 常量是不可变的状态，故不需要
print(ba.accountNumber)
// 静态变量也不需要
print(ba.timestamp)
```

> 有时内部调用确实是同步的，多余的异步排队调用会拉低性能，为了优化，Swift5.5提供了`nonisolated`关键字（没有访问隔离数据）由开发者保证安全调用告诉编译器可以跳过异步队列。

```swift
extension BankAccount {
  // 在该方法内部只引用了 let accountNumber，故不存在 Data races
  // 也就可以用 nonisolated 修饰
  nonisolated func safeAccountNumberDisplayString() -> String {
    let digits = String(accountNumber)
    return String(repeating: "X", count: digits.count - 4) + String(digits.suffix(4))
  }
}
// 由于nonisolated的修饰，可以直接调用
ba.safeAccountNumberDisplayString()
```

# 访问控制（Access Control）

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

[Computed-Properties]: https://docs.swift.org/swift-book/documentation/the-swift-programming-language/properties#Computed-Properties
[Property-Observers]: https://docs.swift.org/swift-book/documentation/the-swift-programming-language/properties#Property-Observers
[Property-Wrappers]: https://docs.swift.org/swift-book/documentation/the-swift-programming-language/properties#Property-Wrappers
