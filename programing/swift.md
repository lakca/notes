
- [Basic Types](#basic-types)
  - [String](#string)
    - [(v5.0) Extended String Delimiters](#v50-extended-string-delimiters)
    - [Interpolation](#interpolation)
    - [Character](#character)
      - [Unicode](#unicode)
      - [Extended Grapheme Clusters](#extended-grapheme-clusters)
    - [Access and Modify](#access-and-modify)
  - [Numeric](#numeric)
    - [Integer](#integer)
    - [Floating](#floating)
  - [Booleans](#booleans)
  - [Tuples](#tuples)
  - [Optionals](#optionals)
    - [Optional Binding](#optional-binding)
    - [Force Unwrapping](#force-unwrapping)
    - [Implicitly Unwrapped Optionals](#implicitly-unwrapped-optionals)
  - [nil](#nil)
  - [Type Alias](#type-alias)
  - [Assertions and Preconditions](#assertions-and-preconditions)
- [Enumerations Type](#enumerations-type)
  - [Basic](#basic)
  - [Iterable Cases](#iterable-cases)
  - [Associated Values](#associated-values)
  - [Raw Value](#raw-value)
    - [Implicit Raw Value](#implicit-raw-value)
    - [Initializing from Raw Value](#initializing-from-raw-value)
  - [Recursive Enumerations](#recursive-enumerations)
- [Collection Types](#collection-types)
  - [Arrays](#arrays)
  - [Sets](#sets)
    - [Hashable](#hashable)
  - [Dictionaries](#dictionaries)
- [Value Types](#value-types)
- [Reference Types](#reference-types)
- [Operator](#operator)
  - [Arithmetic Operator](#arithmetic-operator)
  - [Comparison Operator](#comparison-operator)
  - [Ternary Operator](#ternary-operator)
  - [Compound Assignment Operator](#compound-assignment-operator)
  - [Nil-Coalescing Operator](#nil-coalescing-operator)
  - [Range Operator](#range-operator)
  - [Logical Operator](#logical-operator)
- [Control Flow](#control-flow)
  - [for...in](#forin)
  - [while](#while)
    - [repeat...while](#repeatwhile)
  - [switch](#switch)
    - [interval matching](#interval-matching)
    - [tuple](#tuple)
    - [where](#where)
    - [fallthrough](#fallthrough)
  - [labeled statement](#labeled-statement)
  - [guard...else](#guardelse)
- [Function](#function)
  - [function varies in `parameter label`, `parameter type`, and `return type`.](#function-varies-in-parameter-label-parameter-type-and-return-type)
  - [(v5.1) implicit return](#v51-implicit-return)
  - [argument label](#argument-label)
  - [default argument label](#default-argument-label)
  - [omit argument label (`_`)](#omit-argument-label-_)
  - [default parameter value](#default-parameter-value)
  - [variadic parameter (`...`)](#variadic-parameter-)
  - [in-out parameter (`inout`)](#in-out-parameter-inout)
  - [call with return value ignored (`_`)](#call-with-return-value-ignored-_)
  - [return multiple values (tuple)](#return-multiple-values-tuple)
  - [return optional tuple types (`?`)](#return-optional-tuple-types-)
- [Error Handling](#error-handling)
  - [Representing](#representing)
  - [Throwing Errors](#throwing-errors)
  - [Propagating Errors (Using Throwing Function)](#propagating-errors-using-throwing-function)
  - [Handler Errors Using `do...catch`](#handler-errors-using-docatch)
  - [Converting Errors to Optional](#converting-errors-to-optional)
- [*Swift Doc Toc Generator](#swift-doc-toc-generator)

> v5.3 Guide

> Test on v4.2.1

[Swift Guide](SwiftGuide)

## Basic Types

### String

- String is surrounded by double quotation `"..."`

- Multiline String is surrounded by three double quotation `"""..."""`, and should begin on a new line.

```swift
let multiline = """
  begin in a new line is required.
  indention before closing quotation marks will be ignored.
  start of line isn't allowed to exceed closing quotation marks.
    indention more than closing quotation marks is included.
  if you don't need a line feed, just add a backslash. \
  last line doesn't have a line feed, so backslash is not allowed in last line.
  """
let unicode = "\u{2665}" // ♥
let escape = ["\0", "\n", "\t", "\\", "\r", "\"", "\'", """
\""" // at least one quotation escaped.
"""]
```

#### (v5.0) Extended String Delimiters

```swift
let string = #"escape is needed no more, such as double quotation""#
let multiline = ##"""
if you want invoke effect, just add the delimiter after backslash: \##t
"""##
```

#### Interpolation

```swift
print("6 times 7 is \(6 * 7).") // 6 times 7 is 42.
print(#"6 times 7 is \#(6 * 7)."#) // 6 times 7 is 42.
```

#### Character

##### Unicode

```swift
print("\u{1F425}") // 🐥
```

##### Extended Grapheme Clusters

> Extended Grapheme Cluster is a sequence of one or more Unicode scalars that (when combined) produce a single human-readable character.

> Every instance of Swift’s Character type represents a single extended grapheme cluster.

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

#### Access and Modify

> Thanks to a character may contain multiple unicode scalars. `String` cannot index a character by integer values.

`.startIndex`, `.endIndex`, `.indices`

`.index(before:)`, `.index(after:)`, `index(_:offsetBy:)`

`.insert(_:at:)`, `.insert(contentsOf:at:)`

`.remove(at:)`, `.removeSubrange(_:)`

```swift
let str = "Hello"
print(str[str.startIndex]) // H, `.startIndex` is the first character index.
print(str[str.index(before: str.endIndex)]) // o, `.endIndex` is index after the last character.
print(str[str.index(str.startIndex, offsetBy: 1)]) // e

for index in str.indices { print(str[index]) } // H e l l o

str.insert("!", at: str.endIndex) // Hello!
str.insert(contentsOf: " Everyone", at: str.index(before: str.endIndex)) // Hello Everyone!

str.remove(at: str.index(before: str.endIndex)) // Hello Everyone
str.removeSubrange(str.index(str.endIndex, offsetBy: -9)..<str.endIndex) // Hello
```

### Numeric

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

#### Integer

> decimal, binary(`0b`), octal(`0o`), hexadecimal(`0x`)

#### Floating

> decimal, hexadecimal(`0x`)

- must always have a number on both sides of decimal point.

- hexadecimal must have an exponent.

```swift
print(1.2) // 1.2
print(1.2e2) // 120
print(0x1.2p2) // 4.5
```

### Booleans

### Tuples

```swift
print((1, 2).0) // 1
print((code: 1, message: "hello").code) // 1
```

### Optionals

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

#### Optional Binding

- used in Control Flow statement, such as `if`, `guard` and `while` etc.

- Optional Binding is a certain value.

#### Force Unwrapping

- Force Unwrapping indicates I am sure Optional has a typed value.

```swift
let a: Int? = 1
print(a!) // 1 // use exclamation point(!) as postfix.
```

#### Implicitly Unwrapped Optionals

```swift
let a: Int! = 1
print(a) // Optional(1)
```

### nil

- `nil` isn't a pointer to a nonexistent object, but the absence of a value of a certain type.

- `nil` can only assigned to Optionals.

### Type Alias

```swift
typealias Audio = Int8
```

### Assertions and Preconditions

> building: `assert`, `assertFailure`

> production: `precondition`, `preconditionFailure`

- terminate your app while false condition met.

- used to detect the condition that is certain to prevent program from proceeding.

## Enumerations Type

### Basic

```swift
enum CompassPoint {
  case east
  case south
  case west
  case north
}
```
```swift
enum CompassPoint {
  case east, south, west, north
}
```

### Iterable Cases

```swift
enum CompassPoint: CaseIterable {
  case east
  case south
  case west
  case north
}
```

### Associated Values

```swift
enum Barcode {
  case upc(Int, Int, Int, Int)
  case qrCode(String)
}
let goodBarcode = Barcode.upc(1,2,3,4)
goodBarcode = Barcode.qrCode("qrCodeInformation")
```

### Raw Value

```swift
enum Weekday: Int {
  case monday = 1
  case tuesday = 2
  case wednesday = 3
  case thursday = 4
  case friday = 5
}
```

#### Implicit Raw Value

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

#### Initializing from Raw Value

> instance is a Optional.

```swift
let day = WeekDay(rawValue: 1) // Optional(WeekDay.monday)
let day2 = WeekDay(rawValue: 5) // nil
```

### Recursive Enumerations

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

## Collection Types

### Arrays

- Array element is the same type.

- Array constant (declared with `let`) is immutable including elements.

- access or modify a value for an index out of range causes runtime error.

```swift
Array<Value>
```

```swift
// create empty array
let arr = [Int]()
let arr = Array<Int>()
// create array with value filled
let arr = [Double](repeating: 0.0, count: 3) // [0.0, 0.0, 0.0]
let arr = Array<Double>(repeating: 0.0, count: 3) // [0.0, 0.0, 0.0]
  // implicitly
let arr = Array(repeating: 0.0, count: 3) // [0.0, 0.0, 0.0]
// create array with literals
let arr: [Int] = [1, 2]
  // implicitly
let arr = [1, 2]
// create array by add arrays
let arr = [1, 2] + [2, 3] // [1, 2, 2, 3]
```

Access and Modify

```swift
var arr = [0]
// add one
arr.append(2)
arr.insert(1, at: 1)
// add multiple
arr += [3, 4]
// modify
arr[2...3] = [5] // [0, 1, 5, 4]
arr.remove(at: 1) // return 1
arr.removeLast() // return 4
print(arr.count)
print(arr.isEmpty) // check whether `.count` is equal to 0
```

Iterate

```swift
for ele in arr {}
for (idx, ele) in arr.enumerated() {}
```

### Sets

- Set elements are ***unordered***.

- element should be hashable.

- Set constant (declared with `let`) is immutable including elements.

```swift
Set<Hashable>
```

#### Hashable

> has a hash value which is an `Int` value.

- all objects that compare equally (`==`) have same hash value.

- `String`, `Int`, `Double`, `Bool`, Enumeration Case without associated values are hashable.

- Custom Types conforming to Hashable Protocol are hashable.

```swift
let s: Set<Int>()
let s: Set<Int> = [1, 2, 3] // unordered, maybe [1,2,3], or [1,3,2], or [2,1,3] and so on
var s: Set = [1, 2, 3]
s.insert(4)
s.remove(4) // return 4
s.remove(10) // return nil
s.removeAll()
s.contains(1) // false
print(s.count)
print(s.isEmpty)
```

Iterate

```swift
for ele in s {}
for ele in s.sorted() {} // sorted using `<`
```

Set Operations

```swift
sa.intersection(sb) // return a set of common values
sa.symmetricDifference(sb) // return a set of only values of each
sa.union(sb) // return a set of all values
sa.subtracting(sb) // return a set of values in a but not b
sa == sb // a and b have totally the same elements values
sa.isSubnet(of: sb)
sa.isSuperset(of: sb)
sa.isStrictSubset(of: sb) // `isSubset` but not the same
sa.isStrictSuperset(of: sb) // `isSuperset` but not the same.
sa.isDisjoint(with: sb) // no values in common.
```

### Dictionaries

- keys are ***unordered***.

- same type keys, same type values.

```swift
Dictionary<Hashable, Value>
```

```swift
// create
let dict = Dictionary<String, Int>()
let dict = [String: Int]()
let dict: [String: Int] = [:]
let dict: [String: String] = ["name": "lucky", "gender": "female"]
let dict = ["name": "lucky", "feeling": "good"]
print(dict.count)
print(dict.isEmpty)
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

## Value Types

> Value Type is a type whose value is copied when assigned to variable/constant or passed to function. `Structure` and `Enumeration` are Value Types.

- copies of `Collections defined by standard library（Array, Dictionary）` and `String` share the memory before one of them modified to reduce performance cost.

## Reference Types

> Reference Type is opposite to Value Type.

## Operator

### Arithmetic Operator

> `+`, `-`, `*`, `/`, `%`

### Comparison Operator

> `==`, `!=`, `>`, `>=`, `<`, `<=`, `===`, `!==`

```swift
print("appleA" < "appleB")
print((1, "zebra") < (2, "apple"))
print((1, "apple") < (1, "zebra"))
```

### Ternary Operator

> `?...:...`

### Compound Assignment Operator

> `+=`, `-=`, `*=`, `/=`, `%=`

- operators don't return a value

### Nil-Coalescing Operator

> `??`

```swift
/* Equal to: */ a != nil ? a! : b
```

### Range Operator

> Closed Range Operator: `...`

```swift
for let e in 1...5
```

> Half-Open Range Operator: `..<`

```swift
for let e in 1..<5
```

> One-Sided Ranges

```swift
let indexes = [1, 2, 3, 4, 5]
for e in indexes[1...] { print(e) }
for e in indexes[...3] { print(e) }
```
```swift
for e in 1... {
  if e > 10 { break }
}
```

### Logical Operator

> `!`, `&&`, `||`

## Control Flow

### for...in

```swift
for e in 1..5 /* yes */
for let e in 1..5 /* error, e is already immutable */
```

### while

#### repeat...while

- like do...while in C

### switch

- no implicit fallthrough: flow will be finished once first matching completed except states a `fallthrough` keyword.

- `break` is not required.

- doesn't allow empty case. (`break` is a good fill)

#### interval matching
```swift
case 1...5:
```
```swift
case 1..<5:
```

#### tuple
```swift
case (let x, 0):
```
```swift
case let (x, y):
```

#### where
```swift
case let (x, y) where x == y:
```
- value bindings are available in where clause

#### fallthrough
```swift
case 1:
  fallthrough
```

- fallthrough doesn't check the case condition of it causes execution fall into

- value bindings are available in the fallen into

### labeled statement

### guard...else

- value bindings in guard statement are available in the rest of code block guard statement appears in.

- else branch must transfer control to exit the code block guard appears in. such as `return`, `break`, `continue`, `throw`, `fatalError`...

- like a production mode `assert`

## Function

```swift
func [functionName]([parameterLabel|_] [parameter: type] = [defaultValue] ...) [throws] [-> type] { }
```

### function varies in `parameter label`, `parameter type`, and `return type`.

### (v5.1) implicit return

> If the entire body of the function is a single expression, the function implicitly returns that expression.

```swift
func greet(name: String) -> String {
  "Hello! \(name)."
}
```

### argument label

```swift
func greet(from hometown: String) -> String {
  "Glad you could visit from \(hometown)."
}
```

### default argument label

> default argument label is the same as parameter name.

### omit argument label (`_`)

```swift
func greet(_ name: String) -> String {
  "Hi! \(name)"
}
```

### default parameter value

```swift
func greet(_ who: String = "Everyone") -> String {
  return greet(name) // Hi! ...
}
```

### variadic parameter (`...`)

> argument will available as an `array` in function body

```swift
func greet(name: String...) {
  for e in name { print(greet(e)) }
}
greet(name: "Lucky", "Lily")
```

### in-out parameter (`inout`)

- Parameters are constants by default.
- Enable variable modification by declare parameter as `in-out` and pass variable with `&` as prefix.
- The in-out parameter cannot have default value and be variadic.

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

### call with return value ignored (`_`)

```swift
_ = greet("Lucky")
greet("Lucky") // warning: result of call to 'test()' is unused
```

### return multiple values (tuple)

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

### return optional tuple types (`?`)

```swift
func extent(_ arr: [Int]) -> (min: Int, max: Int)? {
  if arr.isEmpty { return nil }
  return extent(arr: arr)
}
print(extent([]) as Any) // nil
```

## Error Handling

### Representing

- Enumeration is well suited to modeling a group of related error conditions.

```swift
enum VendingError: Error {
  case invalidSelection
  case insufficientFunds(coinsNeeded: Int)
  case outOfStock
}
```

### Throwing Errors

```swift
throw VendingError.outOfStock
throw VendingError.insufficientFunds(coinsNeeded: 10)
```

### Propagating Errors (Using Throwing Function)

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

### Handler Errors Using `do...catch`

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

### Converting Errors to Optional

```swift
let ret = try? vend() // "Success" or nil.
```

## *Swift Doc Toc Generator

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
