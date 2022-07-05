---
title: Swift
date: 2020-09-08T08:54:35.929Z
---

> v5.3 Guide

> Test on v4.2.1

[Swift Guide](SwiftGuide)

# 语言

## 特性

- 不显式暴露指针/内存（与脚本语言类似，数据是引用还是复制在类型实现时已经决定），但也提供了标准库进行调用
- 内存采用严格的引用计数进行自动回收，没有垃圾回收对进程的干预（*Deterministic Reference Counting*）
- *unicode*编码
- 静态类型
- 支持类型推断（*Type Inference*）
- 强制显式处理空值（*Optional*）
- 元组（*Tuple*）
- 支持泛型（*Generics*）
- 支持协议（*Protocols*）(类似*Interface*或*Trait*)
- 支持类型扩展（*Extensions*）（类似*Rust*的*derive*）
- 支持运算符重载（*Operator Overloading*）
- 支持字符串插值（*String Interpolation*）
- 支持闭包（*Closure*）
- 支持命名参数（*Named Parameters*）
- 支持多值返回（*Multiple Return Values*）
- 支持枚举关联值（*Enumeration Playload*）
- 支持模式匹配（*Pattern Matching*）
- 支持错误捕获，*catch*非必需（`try`、 `catch`、`throw`）
- 变量和常量（*Variable and Constant*）
- 常量没有严格的值不可变，对于引用类型只存储引用地址，属性仍然是可变的（类似*Javascript*的*Object*和*const*）
- 句尾分号可选 ~~`;`~~（同*Javascript*一样，换行符和分号均为语句分隔符）

## 重要概念

- 结构（*Structure*）
- 类（*Class*）
- 扩展（*Extension*）
- 协议（*Protocol*）
- 行为体（*Actor*）

## 约定

- 标识符使用*camelCase*（变量、函数等）和*PascalCase*（类、结构、枚举等）命名方式

# 基础

```swift
print("hello world!")
print("hello world!", terminator: "")
```

## 变量（Variable）和常量（Constant）

- 虽然命名支持*unicode*字符，但不支持空白字符、数学符号、箭头、[线框字符](https://en.wikipedia.org/wiki/Box-drawing_character)、[私域字符](https://en.wikipedia.org/wiki/Private_Use_Areas)等字符。（*Constant and variable names can’t contain whitespace characters, mathematical symbols, arrows, private-use Unicode scalar values, or line- and box-drawing characters. Nor can they begin with a number, although numbers may be included elsewhere within the name.*）
- 另外，关键字可以用反引号**\`**包裹作为变量名，但不建议。（*If you need to give a constant or variable the same name as a reserved Swift keyword, surround the keyword with backticks (`` ` ``) when using it as a name. However, avoid using keywords as names unless you have absolutely no choice.*）

### 变量（Variable）和常量（Constant）

```swift
// 声明时初始化可推断类型
var a = 1

// 声明时不初始化时需要声明类型
var b: Int
b = 10

// 可以同时声明多个
var c = 2, d = 3

var e, f, g: Int
```
### 常量（Constant）

- 全局声明时必须初始化（*Globally declared with initialized*）；
- 局部声明只需在调用前初始化即可（*Scoped initialized before being read*）；
- 常量可在全局或局部声明（*Globally or Scoped*），且不影响结构等复合类型（*Compound Types*）内属性的可变性；

```swift
// 全局范围内常量必须初始化
let a = 1
let b = 2, c = 3
```

# 值类型（Value Types）

> 所谓[值类型](https://docs.swift.org/swift-book/LanguageGuide/ClassesAndStructures.html#ID88)，即在其被传递时，如赋值给变量、常量或者作为参数传入函数等，会复制出新的副本。（*A _value type_ is a type whose value is _copied_ when it’s assigned to a variable or constant, or when it’s passed to a function.*）

**所有结构（*structures*）和枚举（*enumerations*）都是值类型。**

> **基础类型（*Basic Types*）在底层都是通过结构（*structures*）来实现的**，所以都是值类型，包括数字（`Int`, `Double`）、布尔值（`Bool`）、字符串（`String`）、数组（`Array`）、集合（`Set`）、字典（`Dictionary`）等。(*In fact, all of the basic types in Swift—integers, floating-point numbers, Booleans, strings, arrays and dictionaries—are value types, and are implemented as structures behind the scenes.*)
> \* 标准库定义的集合类型如数组、字典和字符串等，为了优化性能，只有在数据被修改前才会被复制。

# 引用类型（Reference Types）

> [引用类型](https://docs.swift.org/swift-book/LanguageGuide/ClassesAndStructures.html#ID89)

**引用类型包括类（*classes*）、行为体（*actors*）。**

# 基本类型

- 具有推断类型

```swift
let foo: String = "hello"
// 等价于
let foo = "hello"
```

## 字符串（String）和字符（Character）

> [字符串和字符](https://docs.swift.org/swift-book/LanguageGuide/StringsAndCharacters.html#)都是使用双引号`"`包裹。

- 通过下标、切片或某些方法返回（如`prefix(_:)`）得到的字符串为[**子字符串（Substring）**](https://docs.swift.org/swift-book/LanguageGuide/StringsAndCharacters.html#ID555)，子字符串只是引用原字符串（String）内存地址，若需要独立存活需手动复制成字符串，如`String(aSubstring)`。

```swift
let char: Character = "!"

let chars: [Character] = ["C", "a", "t", "!", "🐱"]

// 字符和字符串
var str = String(chars)
str.append(char)
```

```swift
let hi = "hello"
// 或
let hi2 = String("hello")
```

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

> 多行字符串用三个双引号 `"""`（定界符）包裹，且引号必须在单独一行

```swift
let multiline = """
1. must begin/end with a newline.
2. end with backslash \
   to skip line break
"""
```
> 首行前的空格忽略，后续行前同数量的空格也被忽略，以下与上同：
```swift
let multiline = """
   1. must begin/end with a newline.
   2. end with backslash \
      to skip line break
"""
```

> (v5.0) [扩展定界符](https://docs.swift.org/swift-book/LanguageGuide/StringsAndCharacters.html#ID606)（*Extended String Delimiters*）

```swift
// 用 # 作为字符串的扩展定界符
print(#"hello\n world""#) // hello\n world"

// 同行注释符号由 \ 变成 \#
print(#"""
hello \#
world\n"""
"""#) // hello world\n"""
```

### 比较

> `==`：判断两个字符串的扩展字符簇是否等价，换句话说，两个字符串是否在人类语言上完全相同（*same linguistic meaning and appearance*）。

```swift
// Voulez-vous un café?
let eAcuteQuestion = "Voulez-vous un caf\u{E9}?"
let combinedEAcuteQuestion = "Voulez-vous un caf\u{65}\u{301}?"
print(eAcuteQuestion == combinedEAcuteQuestion) // true

let latinCapitalLetterA: Character = "\u{41}" // 拉丁字母A，如英语
let cyrillicCapitalLetterA: Character = "\u{0410}" // 西里尔字母А，如俄语
print(latinCapitalLetterA == cyrillicCapitalLetterA) // false
```

### 插值（String Interpolation）

> [插值](https://docs.swift.org/swift-book/LanguageGuide/StringsAndCharacters.html#ID292)内容使用带有转义的小括号 `\()`包裹。

```swift
print("6 times 7 is \(6 * 7).") // 6 times 7 is 42.

print(#"6 times 7 is \(6 * 7)."#) // 6 times 7 is \(6 * 7).

print(#"6 times 7 is \#(6 * 7)."#) // 6 times 7 is 42.
```

### Unicode

```swift
print("\u{1F425}") // 🐥
```

### Swift字符范围：扩展字符簇（Extended Grapheme Clusters）

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

## 数字（Number）

- Numeric Literals can contain extra formatting (zero and underscore) for easily read.

```swift
print(1_000_000) // 1000000
print(00.1200) // 0.12
```

- Numeric Literals don't have an explicit type, so combining of literals won't cause a mixed-type error.

```swift
let a = 1
print(a + 1.2) // error
print(1 + 1.2) // 2.2
```

### Integer

> decimal, binary(`0b`), octal(`0o`), hexadecimal(`0x`)

### Floating

> decimal, hexadecimal(`0x`)

- must always have a number on both sides of decimal point.

- hexadecimal must have an exponent.

```swift
print(1.2) // 1.2
print(1.2e2) // 120
print(0x1.2p2) // 4.5
```

## 布尔（Boolean）

## 元组（Tuples）

```swift
print((1, 2).0) // 1
print((code: 1, message: "hello").code) // 1
```

## 集合类型（Collection Types）

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

### 数组（`Array`）

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

### 集合（`Set`）

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

### 字典（`Dictionary`）

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

# 可选类型（Optional）

- Optionals indicate possible absence of value for any type.

- appears in Variable Declaration, Type Conversion etc.

- Optionals underlying value should be unwrapped before access.

```swift
let a: Int? = 1
print(a) // Optional(1) // warning
print(a!) // 1
print(a as Any) // Optional(1)
print(Int("1")) // Optional(1) // warning
print(Int("1")!) // 1
```

## Optional Binding

- used in Control Flow statement, such as `if`, `guard` and `while` etc.

- Optional Binding is a certain value.

## 强制展开（Force Unwrapping）

- Force Unwrapping indicates I am sure Optional has a typed value.

```swift
let a: Int? = 1
print(a!) // 1 // use exclamation point(!) as postfix.
```

## Implicitly Unwrapped Optionals

```swift
let a: Int! = 1
print(a) // Optional(1)
```

# 空值（nil）

- `nil` isn't a pointer to a nonexistent object, but the absence of a value of a certain type.

- `nil` can only assigned to Optionals.

# 类型别名（Type Alias）

```swift
typealias Audio = Int8
```

# 断言和先决条件（Assertion and Precondition）

> building: `assert`, `assertFailure`

> production: `precondition`, `preconditionFailure`

- terminate your app while false condition met.

- used to detect the condition that is certain to prevent program from proceeding.

# 操作符（Operator）

## 算术（Arithmetic Operator）

> `+`, `-`, `*`, `/`, `%`

## 比较（Comparison Operator）

> `==`, `!=`, `>`, `>=`, `<`, `<=`, `===`, `!==`

```swift
print("appleA" < "appleB")
print((1, "zebra") < (2, "apple"))
print((1, "apple") < (1, "zebra"))
```

## 三元（Ternary Operator）

> `?...:...`

## 复合赋值（Compound Assignment Operator）

> `+=`, `-=`, `*=`, `/=`, `%=`

## Nil-Coalescing Operator

> `??`

等同于

```swift
a != nil ? a! : b
```

## 区间（Range Operator）

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

# 函数（Function）

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

# 闭包（Closure）

[Closure](https://docs.swift.org/swift-book/LanguageGuide/Closures.html#)

```swift
{ (parameters) -> return type in
    statements
}
```

```swift
let names = ["Chris", "Alex", "Ewa", "Barry", "Daniella"]
names.sorted(by: { (a: String, b: String) -> Bool in return a > b })
```
> 单一表达式可以省略`return`
```swift
names.sorted(by: { (a: String, b: String) -> Bool in a > b })
```
> 通过上下文自动推导参数类型
```swift
names.sorted(by: { (a, b) -> Bool in a > b })
```
> 通过魔术变量省略形参
```swift
names.sorted(by: { $0 > $1 })
```
> 直接使用操作符方法（Operator Method）
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

> 如果传入函数的闭包在函数返回后才会调用，则该闭包为**逃逸闭包**。

> 逃逸闭包需要在其类型前标记 `@escaping`：

```swift
var completionHandlers: [() -> Void] = []
func someFunctionWithEscapingClosure(completionHandler: @escaping () -> Void) {
    completionHandlers.append(completionHandler)
}
```

> 当*逃逸闭包*中需要引用**类实例**`self`的属性或方法时，需要明确通过`self`引用：

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

> 如果一个闭包没有参数的话，可以省略参数的括号。

```swift
func serve(customer customerProvider: () -> String) {
    print("Now serving \(customerProvider())!")
}
serve(customer: { customersInLine.remove(at: 0) } )
```

> 通过在闭包类型前声明`@autoclosure`，可以将调用参数自动包裹进闭包：

```swift
func serve(customer customerProvider: @autoclosure () -> String) {
    print("Now serving \(customerProvider())!")
}
serve(customer: customersInLine.remove(at: 0))
```

# 枚举（Enumerations）

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
