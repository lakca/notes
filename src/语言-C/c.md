---
title: c
date: 2020-09-08T08:54:35.922Z
---

- [Abbreviation](#abbreviation)
- [Basic Concept](#basic-concept)
  - [Identifier](#identifier)
    - [Reserved Identifier](#reserved-identifier)
      - [Keyword](#keyword)
      - [External Identifier in Standard Library](#external-identifier-in-standard-library)
      - [External Identifier Beginning with Underscore](#external-identifier-beginning-with-underscore)
      - [Identifier Beginning with Underscore Followed by Capital Letter or Underscore](#identifier-beginning-with-underscore-followed-by-capital-letter-or-underscore)
  - [Name Space](#name-space)
    - [Label Name Space](#label-name-space)
    - [Tag Name Space](#tag-name-space)
    - [Member Name Space](#member-name-space)
    - [Ordinary Name Space](#ordinary-name-space)
  - [Scope](#scope)
    - [Block Scope](#block-scope)
    - [Function Scope](#function-scope)
    - [Function Prototype Scope](#function-prototype-scope)
    - [File Scope](#file-scope)
    - [Point of Declaration](#point-of-declaration)
  - [Declaration](#declaration)
    - [Specifier](#specifier)
      - [Type Specifier](#type-specifier)
      - [Storage-Class Specifier](#storage-class-specifier)
      - [Function Specifier](#function-specifier)
      - [Alignment Specifier](#alignment-specifier)
    - [Qualifier](#qualifier)
      - [Type Qualifier](#type-qualifier)
    - [Initializer](#initializer)
    - [Declarator](#declarator)
    - [Definition](#definition)
    - [Redeclaration](#redeclaration)
    - [*Variably-Modified Type](#variably-modified-type)
    - [Pointer](#pointer)
  - [Type](#type)
    - [Classification](#classification)
    - [Group](#group)
    - [Compatible Types](#compatible-types)
    - [Composite Types](#composite-types)
    - [Incomplete Types](#incomplete-types)
    - [Enumeration](#enumeration)
  - [Object and Alignment](#object-and-alignment)
    - [Feature](#feature)
    - [Creation](#creation)
    - [Representation](#representation)
      - [Trap Representation](#trap-representation)
    - [Effective Type](#effective-type)
    - [Strict Aliasing](#strict-aliasing)
    - [Alignment](#alignment)
  - [Union](#union)
  - [Struct](#struct)
  - [Bit Field](#bit-field)
  - [Operator](#operator)
    - [Classification](#classification-1)
    - [Alternative](#alternative)
  - [Expression](#expression)
    - [Value Category](#value-category)
      - [Lvalue Expression](#lvalue-expression)
      - [Non-lvalue Object Expression (Rvalue)](#non-lvalue-object-expression-rvalue)
      - [Function Designator Expression](#function-designator-expression)
    - [Order of Evaluation](#order-of-evaluation)
      - [Evaluation](#evaluation)
        - [Value Computation](#value-computation)
        - [Side Effect](#side-effect)
      - [Ordering](#ordering)
      - [Sequence-Before](#sequence-before)
      - [Sequence Point](#sequence-point)
      - [Undefined Behavior](#undefined-behavior)
  - [Statement](#statement)
    - [Classification](#classification-2)
      - [Compound Statements](#compound-statements)
      - [Expression Statements](#expression-statements)
      - [Selection Statements](#selection-statements)
      - [Iteration Statements](#iteration-statements)
      - [Jump Statements](#jump-statements)
    - [Label](#label)
  - [Variable](#variable)
- [Phrases of Translation](#phrases-of-translation)
  - [Phrase 1](#phrase-1)
    - [Source Character Set](#source-character-set)
  - [Phrase 2](#phrase-2)
  - [Phrase 3](#phrase-3)
    - [Maximal Munch](#maximal-munch)
      - [* Sole Exception](#ullisole-exceptionliul)
    - [Preprocessing Tokens](#preprocessing-tokens)
  - [Phrase 4](#phrase-4)
  - [Phrase 5](#phrase-5)
    - [Execution Character Set](#execution-character-set)
    - [* Command Options](#ullicommand-optionsliul)
  - [Phrase 6](#phrase-6)
  - [Phrase 7](#phrase-7)
  - [Phrase 8](#phrase-8)
- [Macro](#macro)
  - [`__VA_ARGS__`](#va_args)
  - [Stringification: `#`](#stringification-)
  - [Concatenation (or Token Pasting): `##`](#concatenation-or-token-pasting-)
  - [Predefined Macros](#predefined-macros)
- [Storage Duration](#storage-duration)
- [* cppreference.com show toc](#ullicppreferencecom-show-tocliul)

[cppreference](https://en.cppreference.com/w/c/language)

## Abbreviation

| Abbr                 | Phrase                |
| -------------------- | --------------------- |
| VLA                  | variable-length array |
| address-of operator  | &                     |
| indirection operator | *                     |

## Basic Concept

- semicolon (`;`) is required after clause.
-

### Identifier

> Identifier is an arbitrarily long sequence of digits, underscores, Latin letters and unicode characters specified using `\u` and `\U`, and is case sensitive.

- Identifier denotes following types of entities:
  - `Objects`
  - `Functions`
  - `Tags(Struct,Union,Enumeration)`
  - `Structure of Union memebers`
  - `Enumeration Constants`
  - `typedef names`
  - `label names`
  - `macro names`
  - `macro parameter names`

- Identifier other than ~~`macro names`~~ and ~~`macro parameter names`~~ has `Scope`, belongs to a `name space`, and may has `linkage`.

#### Reserved Identifier

##### Keyword

[Detail here](keyword)

##### External Identifier in Standard Library

##### External Identifier Beginning with Underscore

##### Identifier Beginning with Underscore Followed by Capital Letter or Underscore

### Name Space

> C allows more than one declaration for the same identifier to be in `scope` simultaneously if these identifiers belong to different categories, called `name spaces`:

#### Label Name Space

> `identifiers` declared as `labels`.

#### Tag Name Space

> `identifiers` declared as names `structs`, `unions` and `enumerated types`.

- the three types share one `name space`.

#### Member Name Space

> `identifiers` declared as members of any one `struct` or `union`.

- Every `struct` and `union` introduces its own `name space`.

#### Ordinary Name Space

> `identifiers` called `ordinary identifiers` to distinguish from `Label Name Space`, `Tag Name Space`, `Member Name Space`,

- including `function names`, `object names`, `typedef names` and `enumeration constants`.

### Scope

- Block Scope
- Function Scope
- Function Prototype Scope
- File Scope

#### Block Scope

> `{ ... }`

- `Scope` of `identifier` begins at the point of its `declaration` and ends at the end of the `block` or `statement` in which it was declared.
- Since c99, `Selection` and `Iteration` statements establish their own block scopes.
- `Storage Duration` for non-VLA local variables begins when the block is entered, but until the declaration is seen, the variable is not in scope and cannot be accessed.
- Block-scope `variable` has no linkage and automatic `storage duration` by default.

#### Function Scope

> A `label` (and only a label) declared inside a `function` is in `scope` everywhere in that `function`.

```c
int main()
{
  int a = 0;
  {
    more:; // empty label
    a++;
    printf("%d\t", a);
    if (a > 9) goto over;
  }
  goto more;
  over: return 0;
}
```

#### Function Prototype Scope

- The `scope` of a name introduced in the `parameter list` of a `function declaration` that is not a `definition` ends at the end of the `function declarator`.

```c
int func(int a, int b[a]);
```
```c
int (*(*g)(int n))[n]; // second `n` is undefined, since first `n` is in the under scope.
```

#### File Scope

> The `scope` of any `identifier` declared outside of any `block` or `parameter list`.

- `Scope` begins once `declaration` and ends till the `translation unit` ends.
- File-scope `identifiers` have `external linkage` and `static storage duration` by default.

#### Point of Declaration

- the scope of `structure`, `union`, `enumeration` tags begins immediately after the appearance of the tag in the type specifier.

```c
struct Node {
  struct Node* next;
};
```

- the scope of `enumeration` constant begins immediately after the appearance of its defining enumerator in an enumerator list.

```c
enum {
  x = 1,
  y = x + 1,
};
```

- the scope of any other identifier begins after the end of its declarator and before the initializer.

```c
int x = 10;
int y = 20;
{
  int x = x + 1; // 1, `x` is declared before its initializer.
  int y[y]; // y[20], `y` has not been initialized.
}
```

### Declaration

> A `declaration` is a construct that introduces one or more `identifiers` into program. Consist of two distinct parts: `specifiers-and-qualifiers` and `declarators-and-initializers`.

- Each `declaration` ends with a semicolon (`;`).

```c
[specifiers-and-qualifiers] [declarators-and-initializers]
```

#### Specifier

##### Type Specifier

- `void`
- name of `arithmetic type`
- name of `atomic type`
- name earlier introduced by `typedef` declaration
- `struct`, `union` or `enum`

##### Storage-Class Specifier

- `typedef`
- `auto`
- `register`
- `static`
- `extern`
- `thread_local`

##### Function Specifier

- `inline`
- `_Noreturn`

##### Alignment Specifier

- `_Alignas`

#### Qualifier

##### Type Qualifier

- `const`
- `volatile`
- `restrict`
- `_Atomic`

#### Initializer

#### Declarator

`noptr-declarator` is any other declarator except unparenthesized pointer declarator.

```c
// simply identifier
identifier

// introde pointers to arrays or functions
(declarator)

// pointer declarator
* qualifiers(optional) declarator

// array declarator
noptr-declarator[static(optional) qualifiers(optional) expression]
noptr-declarator [ qualifiers(optional) * ]

// function declarator
noptr-declarator(parameters-or-identifiers)
```

#### Definition

> A `definition` is a `declaration` providing all information about the `identifiers` itself.

- For `enum` and `typedef`, a declaration is a definition.
- For `function`, a declaration with function body is a definition.
- For `object`, a declaration that allocates storage(`automatic` of `static`, but not `extern`) is a definition.
- For `struct` and `union`, a declaration specifying the list of members is a definition.

#### Redeclaration

`declaration` cannot introduce a same `identifier` in a scope, except:

- A `declaration` of `object with linkage` (external or internal):
```c
extern int x;
int x = 10; // OK
extern int x; // OK
static int n;
static int n = 10; // OK
static int n; // OK
```

- `Non-VLA typedef` naming the same type:
```c
typedef int int_t;
typedef int int_t; // OK
```

- `struct` and `union` declarations:
```c
struct X;
struct X { int n; };
struct X;
```

- Empty declaration is prohibited.

- Declaration of `variably-modified types` may appear only at `block scope` or `function prototype scope`, and cannot be members of `struct` and `union`.

#### *Variably-Modified Type

> If any part of a declarator is a `VLA array declarator`, the entire declarator's type is known as `variably-modified type`. Types defined from variably-modified types are also `variably modified (VM)`.

#### Pointer

- `Pointers` are used for indirection, which is a ubiquitous programming technique; they can be used to implement pass-by-reference semantics, to access objects with `dynamic storage duration`, to implement `optional types` (using the null pointer value), aggregation relationship between `structs`, `callbacks` (using pointers to functions), generic interfaces (using pointers to void), and much more.

### Type

> `Objects`, `functions`, and `expressions` have a property called `type`, which determines the `interpretation` of the `binary value` stored in an `object` or evaluated by the `expression`.

#### Classification

| Category         | Classification            | Operators                                                                                                   |
| ---------------- | ------------------------- | ----------------------------------------------------------------------------------------------------------- |
| void type        | Void                      | `void`                                                                                                      |
| basic types      |                           |                                                                                                             |
|                  | Char                      | `char`                                                                                                      |
|                  | Signed Integer            | `signed char`, `short`, `int`, `long`, `long long`(c99)                                                     |
|                  | Extended Signed Integer   | implementation-defined, e.g. `__int128`                                                                     |
|                  | Standard Unsigned Integer | `unsigned char`, `unsigned short`, `unsigned int`, `unsigned long`, `unsigned long long`(c99), `_Bool`(c99) |
|                  | Extended Unsigned Integer | implementation-defined, e.g. `__uint128`                                                                    |
|                  | Real Floating             | `float`, `double`, `long double`                                                                            |
|                  | Complex Floating          | `float _Complex`, `double _Complex`, `long double _Complex`                                                 |
|                  | Imaginary Floating        | `float _Imaginary`, `double _Imaginary`, `long double _Imaginary`                                           |
| Enumerated Types |                           |                                                                                                             |
| Derived Types    |                           |                                                                                                             |
|                  | Array                     |                                                                                                             |
|                  | Structure                 |                                                                                                             |
|                  | Union                     |                                                                                                             |
|                  | Function                  |                                                                                                             |
|                  | Pointer                   |                                                                                                             |
|                  | Atomic                    |                                                                                                             |
|                  |                           |

#### Group

| Group             | Member                                 |
| ----------------- | -------------------------------------- |
| Object Types      | all but not function types.            |
| Character Types   | `char`, `signed char`, `unsigned char` |
| Integer Types     | `char`, `integer`, `enumeration`       |
| Real Types:       | `integer`, `real floating`             |
| Arithmetic Types: | `integer`, `floating`                  |
| Scalar Types:     | `arithmetic`, `pointer`                |
| Aggregate Types   | `array`, `structure`                   |
| Derived Types     | `array`, `function`, `pointer`         |
| Compatible Types  |                                        |
| Composite Types   |                                        |
| Incomplete Types  |                                        |
|                   |                                        |

#### Compatible Types

> If two declarations refer to the same object or function and do not use compatible types, the behavior of the program is undefined.

- Same Type, which are same name or aliases (`typedef`).
- Both `Pointer` Types, pointing to compatible types.
- Identically cvr-qualified versions of compatible unqualified types.
- Both `Array` Types, and whose element types are compatible and if both have constant size which requested to be the same.
- Both `Structure`/`Union`/`Enumeration` types, and
  - if one is declared with a tag, another requested to be same.
  - if both `Completed` Types, their members must correspond exactly in number, be declared with compatible types, and have matching names.
  - if both `Enumeration` types, corresponding members must also have the same values.
  - if both `Structure` or `Union` types,
    - Corresponding members must be declared in the same order (structures only).
    - Corresponding bit fields must have the same widths.
- One `Enumerated` Type, other is `Enumeration's Underlying` type.
- Both `Function` Types, and
  - `Return` types are compatible.
  - they both use parameter lists, the number of parameters (including the use of the ellipsis) is the same, and the corresponding parameter, after applying array-to-pointer and function-to-pointer type adjustments and after stripping top-level qualifiers, have compatible types.
  - one is an old-style (parameter-less) definition, the other has a parameter list, the parameter list does not use an ellipsis and each parameter is compatible (after function parameter type adjustment) with the corresponding old-style parameter after default argument promotions.
  - one is an old-style (parameter-less) declaration, the other has a parameter list, the parameter list does not use an ellipsis, and all parameters (after function parameter type adjustment) are unaffected by default argument promotions.

#### Composite Types

> A composite type can be constructed from two types that are compatible; it is a type that is compatible with both of the two types.

- If Both `Array` types, rules applied:
  - if one is constant size, the `Composite` type is and array of the size.
  - if Both with unknown size, the `Composite` type is and array of unknown size.
- If only one `Function` type with a parameter type list (a function prototype), the composite type is a function prototype with the parameter type list.
- If both are `Function` types with parameter type lists, the type of each parameter in the composite parameter type list is the composite type of the corresponding parameters.

#### Incomplete Types

> An incomplete type is an object type that lacks sufficient information to determine the size of the objects of that type.

The following types are incomplete:

- `Void`, This type cannot be completed.
- `Array` of unknown size, completed by a later declaration that specifies the size.
- `Structure` or `Union` of unknown content, completed by a declaration of the same structure or union that defines its content later in the same scope.

#### Enumeration

> An `enumerated type` is a distinct type whose value is a value of its underlying type.

```c
enum [identifier] {
  [enumerator-constant],
  [enumerator-constant] = [constant-expression]
}
```

- `Enumerated Type` is `Integer Type`.

```c
enum { ONE = 1, TWO } e;
long n = ONE; // promotion
double d = ONE; // conversion
e = 1.2; // conversion, e is now ONE
e = e + 1; // e is now TWO
```

- Each `enumeration constant` becomes an integer constant with type `int` in the enclosing scope.

```c
enum color { RED, GREEN = 10, BLUE, CYAN = GREEN + BLUE };
enum color x = RED;
printf("%d, %d, %d", x, BLUE, CYAN); // 0, 11, 21
```

- The `identifier` itself, if used, becomes the name of the `Enumerated Type` in the `tag name space` and requires the use of the keyword `enum` (unless typedef'd into the `ordinary name space`).

```c
typedef enum color color_t;
color_t x = GREEN;
```

### Object and Alignment

> An `object` is region of `data storage` in the `execution environment`, the contents of which can represent values (a value is the meaning of the contents of an object, when interpreted as having a specific type).

- Objects have the same `object representation`, they compare `equal` (except floating-point `NaN`).
- Objects that compare `equal` may have different `object representations`.

#### Feature

- `size` (can be determined with `sizeof`)
- `alignment requirement` (can be determined by `_Alignof`) (since C11)
- `storage duration` (automatic, static, allocated, thread-local)
- `lifetime` (equal to storage duration or temporary)
- `effective type` (see below)
- `value` (which may be indeterminate)
- optionally, an `identifier` that denotes this object

#### Creation

- `declarations`
- `allocation function`
- `string literals`
- `compound literals`
- `non-lvalue expressions` that return `structures or unions with array members`.

#### Representation

> Objects are composed of `contiguous sequences bytes` (except for `bit fields`). Each consisting of `CHAR_BIT` bits, and can be copied with `memcpy` into an object of type `unsigned char[n]`, where n is the size of the object. The contents of the resulting array are known as `object representation`.

- Not every bit of the `object representation` needs to participate in the value. Such bits may be used for `padding` to satisfy `alignment requirement`, for `parity checks`, to indicate `trap representations`, etc.
- `char`, `signed char`, and `unsigned char`, every bit of the `object representation` is required to participate in the value representation and each possible bit pattern represents a distinct value (no `padding`, `trap bits`, or `multiple representations` allowed).

##### Trap Representation

> `Object representation` does not represent any value of the `object type`.

- Accessing a `trap representation` in any way other than reading it through an `lvalue expression` of `character type` is undefined behavior.
- The value of a `structure` or `union` is never a `trap representation`.

#### Effective Type

> Every object has an `effective type`, which determines which `lvalue accesses` are valid and which `violate` the strict `aliasing rules`.

- If the object was created by a `declaration`, the `declared type` of that object is the object's `effective type`.
- If the object was created by an `allocation function` (including `realloc`), it has no `declared type`. Such object acquires an `effective type` as follows:
  - The `first write` to that object through an `lvalue` that has a type other than `character type`, at which time the type of that lvalue becomes this object's `effective type` for that write and all subsequent reads.
  - `memcpy` or `memmove` copy another object into that object, at which time the `effective type` of the source object (if it had one) becomes the `effective type` of this object for that write and all subsequent reads.
  - Any other access to the object with no `declared type`, the `effective type` is the type of the `lvalue` used for the access.

#### Strict Aliasing

Given an object with effective type T1, using an lvalue expression (typically, dereferencing a pointer) of a different type T2 is undefined behavior, unless:
- T2 and T1 are compatible types.
- T2 is cvr-qualified version of a type that is compatible with T1.
- T2 is a signed or unsigned version of a type that is compatible with T1.
- T2 is an aggregate type or union type type that includes one of the aforementioned types among its members (including, recursively, a member of a subaggregate or contained union).
- T2 is a character type (char, signed char, or unsigned char).

#### Alignment

> Every complete object type has a property called `alignment requirement`, which is an integer value of type `size_t` representing the number of bytes between successive addresses at which objects of this type can be allocated. The valid alignment values are non-negative integral powers of two.

- (c11) The `alignment requirement` of a type can be queried with `_Alignof`.
- In order to satisfy `alignment requirements` of all members of a `struct`, `padding` may be inserted after some of its members.
- Each object type imposes its `alignment requirement` on every object of that type. The strictest (largest) fundamental alignment of any type is the alignment of `max_align_t`. The weakest (smallest) alignment is the alignment of the types `char`, `signed char`, and `unsigned char`, and equals 1.
- (c11) If an object's alignment is made stricter (larger) than `max_align_t` using `_Alignas`, it has `extended alignment requirement`. A `struct` or `union` type whose member has `extended alignment` is an `over-aligned type`. It is `implementation-defined` if `over-aligned` types are supported, and their support may be different in each kind of `storage duration`.

计算机CPU一次可以处理多个字节，就拿32位系统来说，CPUT一次可以处理32bit的数据，也就是4个字节。假设平台每次都从偶地址开始读取数据，有一个int型数据，存放在内存地址0x1的位置。CPU要读取这个int数据，需要先从地址0x0开始读取4字节数据，此时这个int型还有一个字节没有读到，就得再从地址0x4开始读取4字节数据， 并且还要进行位操作，把两次读取的数据合并为一个int型数据。多次读取，还要移位！—— 太麻烦，效率又低。那怎么办呢？为了简单高效地读取数据，干脆在存储时把这个int数据放在地址0x4的位置，0x1、0x2、0x3的位置都空着，CPU直接从0x4取数据，只需一次就取到了这个数据，还不用进行位操作。简而言之，就是拿空间换时间。

### Union

> A type consisting of a sequence members of `overlapped storage`. The value of at most one of the members can be stored in a `union` at any one time.

- The `union` is only as big as necessary to hold its largest member (additional unnamed trailing padding may also be added). The other members are allocated in the same bytes as part of that largest member.
- A `pointer` to a union can be cast to a `pointer` to each of its members (if a union has bit field members, the pointer to a union can be cast to the pointer to the bit field's underlying type). Likewise, a pointer to any member of a union can be cast to a pointer to the enclosing union.

### Struct

> A type consisting of a sequence members of `ordered storage` allocated.

### Bit Field

> Declares a member with explicit width, in `bits`. Adjacent bit field members may be packed to share and straddle the individual `bytes`.

- A `bit field` declaration is a `struct` or `union` member declaration.
- The width is an `integer constant expression` with a value greater or equal to zero and less or equal the number of bits in the `underlying type`.
- Bit fields can have only one of four types (possibly const or volatile qualified):
  - `unsigned int`, for unsigned bit fields (unsigned int b:3; has the range 0..7)
  - `signed int`, for signed bit fields (signed int b:3; has the range -4..3)
  - `int`, for bit fields with implementation-defined signedness (Note that this differs from the meaning of the keyword int everywhere else, where it means "signed int"). For example, int b:3; may have the range of values 0..7 or -4..3.
  - `_Bool`, for single-bit bit fields (bool x:1; has the range 0..1 and implicit conversions to and from it follow the boolean conversion rules
- Because bit fields do not necessarily begin at the beginning of a byte, address of a bit field cannot be taken. `Pointers` to bit fields are not possible. Bit fields cannot be used with `sizeof` and `alignas` (C11)

```c
struct S {
  // three-bit unsigned field,
  // allowed values are 0...7
  unsigned int b : 3;
};
// Multiple adjacent bit fields are permitted to be (and usually are) packed together:
struct S {
  // will usually occupy 4 bytes:
  // 5 bits: value of b1
  // 11 bits: unused
  // 6 bits: value of b2
  // 2 bits: value of b3
  // 8 bits: unused
  unsigned b1 : 5, : 11, b2 : 6, b3 : 2;
};
// The special unnamed bit field of width zero breaks up padding: it specifies that the next bit field begins at the beginning of the next allocation unit:
struct S {
  // will usually occupy 8 bytes:
  // 5 bits: value of b1
  // 27 bits: unused
  // 6 bits: value of b2
  // 15 bits: value of b3
  // 11 bits: unused
  unsigned b1 : 5;
  unsigned :0; // start a new unsigned int
  unsigned b2 : 6;
  unsigned b3 : 15;
};
```

### Operator

#### Classification

| Type          | Member                                                                        |
| ------------- | ----------------------------------------------------------------------------- |
| Assignment    | `=`, `+=`, `-=`, `*=`, `/=`, `%=`, `&=`, `|=`, `^=`, `<<=`, `>>=`, `++`, `--` |
| Arithmetic    | `+`, `-`, `*`, `/`, `%`, `~`, `&`, `|`, `^`, `<<`, `>>`                       |
| Logical       | `!`, `&&`, `||`                                                               |
| Comparison    | `==`, `!=`, `<`, `>`, `<=`, `>=`                                              |
| Member Access | `[]`, `*`, `&`, `->`, `.`                                                     |
| Other         | `a(...)`, `a, b`, `(type) a`, `sizeof`, `_Alignof`(c11)                       |
| *Alternative  | `#include <iso646.h>`                                                         |
|               |                                                                               |

#### Alternative

| Primary | Alternative |
| ------- | ----------- |
| &&      | and         |
| &=      | and_eq      |
| &       | bitand      |
| \|      | bitor       |
| ~       | compl       |
| !       | not         |
| !=      | not_eq      |
| \|\|    | or          |
| \|=     | or_eq       |
| ^       | xor         |
| ^=      | xor_eq      |
| {       | <%          |
| }       | %>          |
| [       | <:          |
| ]       | :>          |
| #       | %:          |
| ##      | %:%:        |
| {       | ??<         |
| }       | ??>         |
| [       | ??(         |
| ]       | ??)         |
| #       | ??=         |
| \       | ??/         |
| ^       | ??'         |
| \|      | ??!         |
| ~       | ??-         |
|         |             |

### Expression

> A sequence of `operators` and their `operands`, that specifies a computation. Such as `operator with arguments`, `function call`, a `constant`, a `variable name`, etc.

- `Expression` is characterized by 2 independent properties: `type` and `value category`.
- `Expression` belongs to one of three `value categories`, including `lvalue`, `non-value object`(`rvalue`), and `function designator`.

#### Value Category

##### Lvalue Expression

> `Lvalue expression` is any expression with `object type` other than the type `void`, which evaluates to the `object identity`.

##### Non-lvalue Object Expression (Rvalue)

> `Non-lvalue object expressions` are the expressions of `object types` that do not designate objects, but rather values that have no `object identity` or `storage location`.

##### Function Designator Expression

> A `function designator` (the `identifier` introduced by a `function declaration`) is an expression of `function type`. When used in any context other than the address-of operator, `sizeof`, and `_Alignof` (the last two generate compile errors when applied to functions), the `function designator` is always converted to a `non-lvalue pointer to function`. Note that the `function-call operator` is defined for `pointer to function` and not for `function designator` itself.

#### Order of Evaluation

> `Order of evaluation` of the `operands` of any C `operator` is `unspecified` (except where noted below). The `compiler` will evaluate them in any order, and may choose another order when the same `expression` is evaluated again.

```c
int i = 3;
int x = (++i) + (++i) + (++i); // `x` is uncertain.
```

##### Evaluation

> There are two kinds of evaluations performed by the `compiler`.

###### Value Computation

###### Side Effect

> Access (read or write) to an `object` designated by a `volatile lvalue`, modification (writing) to an `object`, `atomic synchronization` (since c11), modifying a `file`, modifying the `floating-point environment` (if supported), or calling a function that does any of those operations.

##### Ordering

> `sequenced-before` is an asymmetric, transitive, pair-wise relationship between `evaluations` within the same `thread` (it may extend across `threads` if `atomic types` and `memory barriers` are involved).

##### Sequence-Before

- If a `sequence point` is present between the subexpressions E1 and E2, then both `value computation` and `side effects` of E1 are `sequenced-before` every `value computation` and `side effect` of E2.
- (c11) If `evaluation` A is sequenced before `evaluation` B, then `evaluation` of A will be complete before `evaluation` of B begins.
- (c11) If A is not sequenced before B and B is sequenced before A, then `evaluation` of B will be complete before `evaluation` of A begins.
- (c11) If A is not sequenced before B and B is not sequenced before A, then two possibilities exist:
  - `evaluations` of A and B are `unsequenced`: they may be performed in any order and may overlap (within a single thread of execution, the compiler may interleave the CPU instructions that comprise A and B).
  - `evaluations` of A and B are `indeterminably-sequenced`: they may be performed in any order but may not overlap: either A will be complete before B, or B will be complete before A. The order may be the opposite the next time the same expression is evaluated.

##### Sequence Point

> A `sequence point` defines any point in a computer program's execution at which it is guaranteed that all `side effects` of previous `evaluations` will have been performed, and no `side effects` from `subsequent evaluations` have yet been performed.

- There is a `sequence point` after the evaluation of all `function arguments` and of the `function designator`, and before the actual `function call`.
- There is a `sequence point` after evaluation of the first (left) `operand` and before evaluation of the second (right) `operand` of the following binary operators: `&&` (logical AND), `||` (logical OR), and `,` (comma).
- There is a `sequence point` after evaluation of the first (left) `operand` and before evaluation of the second or third `operand` (whichever is evaluated) of the conditional operator `?:`
- There is a `sequence point` after the evaluation of a `full expression` (an expression that is not a `subexpression`: typically something that ends with a semicolon or a controlling statement of `if`/`switch`/`while`/`do`) and before the next `full expression`.
- (c99) There is a `sequence point` at the end of a `full declarator`.
- (c99) There is a `sequence point` immediately before the return of a `library function`.
- (c99) There is a `sequence point` after the action associated with each `conversion specifier` in `formatted I/O` (in particular, it is well-formed for `scanf` to write different fields into the same variable and for `printf` to read and modify or modify the same variable more than once using `%n`)
- (c99) There are `sequence points` before and immediately after each call to a `comparison function` made by the library functions `qsort` and `bsearch`, as well as between any call to the `comparison function` and the movement of the associated objects made by `qsort`
- (c11) The `value computations` (but not the side-effects) of the `operands` to any `operator` are sequenced before the `value computation` of the result of the `operator` (but not its side-effects).
- (c11) The `side effect` (modification of the left argument) of the `direct assignment operator` and of all `compound assignment operators` is sequenced after the `value computation` (but not the side effects) of both left and right `arguments`.
- (c11) The `value computation` of the `postincrement` and `postdecrement` operators is sequenced before its `side-effect`.
- (c11) A `function call` that is not `sequenced before` or `sequenced after` another `function call` is `indeterminately sequenced` (CPU instructions that constitute different function calls cannot be interleaved, even if the functions are inlined)
- (c11) In `initialization list expressions`, all `evaluations` are `indeterminately sequenced`
- (c11) With respect to an `indeterminately-sequenced function call`, the operation of `compound assignment operators`, and both prefix and postfix forms of `increment` and `decrement` operators are `single evaluations`.

##### Undefined Behavior

- If a `side effect` on a `scalar object` is unsequenced relative to another `side effect` on the same `scalar object`, the behavior is undefined.
- If a `side effect` on a `scalar object` is unsequenced relative to a `value computation` using the value of the same `scalar object`, the behavior is undefined.
- The above rules apply as long as at least one allowable ordering of `subexpressions` permits such an unsequenced `side-effect`.

### Statement

> `Statements` are fragments of the C program that are executed in sequence.

#### Classification

##### Compound Statements

> `{...}`. A compound statement, or `block`, is a brace-enclosed sequence of statements and declarations.

##### Expression Statements

> `;`. an **expression followed by a semicolon** is an expression statement.

- an expression statement without an expression is called `null statement`.

##### Selection Statements

> `if`, `switch`.

##### Iteration Statements

> `while`, `do...while`, `for`.

##### Jump Statements

> `break`, `continue`, `return`, `goto`.

#### Label

> providing a name followed by a colon before statement itself.

- any `Statements` can be labeled.
- `Label` names have `Function Scope`, so must(only) be unique with the enclosing function.
- `case`, `default` are labels.
- any statement can preceded by any number of labels.

### Variable

```c
// [type] [variable_list] (= [value])
int n = 1;
// #define [variable] [value]
#define HI "Hello"

// const [type] [variable] (= [value])
const int m = 2;
```

## Phrases of Translation

> The C source file is processed by the compiler as if the following phases take place, in this exact order.

### Phrase 1

> Mapping individual bytes to `source character set`.

- `OS-dependent` `end-of-line indicators` are replaced by `newline characters`.
- `Trigraph sequences` are replaced by corresponding single-character representations.

#### Source Character Set

> Source character set is a multibyte character set including the `basic source character set` as a signle-byte subset, consisting 96 characters:

- 5 `whitespace characters`, including `space`, `horizontal tab`, `vertical tab`, `new-line`, `form-feed`)
- 10 `digit characters`, including `0-9`
- 52 `letters`, including `a-z` and `A-Z`
- 29 `punctuation characters`, including `{` `}` `[` `]` `(` `)` `<` `>` `_` `#` `?` `:` `;` `,` `.` `+` `-` `*` `/` `%` `^` `&` `|` `~` `!` `=` `\` `"` `'`

### Phrase 2

> Combining source lines.

Combining two source lines into one logical line.

- whenever backslash appears at the end of a line, both backslash and newline are deleted.
- This is a `single-pass` operation: a line ending in two backslashes followed by an empty line does not combine three lines into one.

### Phrase 3

> Decomposing source file.

Decomposing source file into `comments`(replaced by one space character), sequences of `whitespace` characters(space, horizontal tab, new line, vertical tab and form-feed), and `preprocessing tokens`.

#### Maximal Munch

> if the input has been parsed into `preprocessing tokens` up to a given character, the next `preprocessing token` is generally taken to be the longest sequence of characters that could constitute a `preprocessing token`, even if that would cause subsequent analysis to fail.

```c
int foo = 1;
int bar = 0xE+foo;   // error: invalid preprocessing number 0xE+foo
int baz = 0xE + foo; // OK
int quux = bar+++++baz; // error: bar++ ++ +baz, not bar++ + ++baz.
```

##### * Sole Exception

- Header name `preprocessing tokens` are only formed within a `#include` directive and in `implementation-defined` locations within a `#pragma` directive.

```c
#define MACRO_EXPR (MACRO_1 <MACRO_2> MACRO_3) // OK: <MACRO_2> is not a header-name
```

#### Preprocessing Tokens

- header names: `<stdio.h>` or `myfile.h`
- `identifiers`
- preprocessing numbers, covering `integer constants` and `floating constants`, also some `invalid tokens`.
- `character constants` and `string literals`
- `operators` and `punctuators`
- other non-whitespace characters

### Phrase 4

> Preprocessing by `Preprocessor`.

- Each file introduced with `#include` directive goes through `phrase 1` through `phrase 4`, recursively.
- At the end of this phrase, all preprocessor directives are removed.

### Phrase 5

> Converting `source character set` to `execution character set`.

All `characters` and `escape sequences` in `character constants` and `string literals` are converted from `source character set` to `execution character set`.

#### Execution Character Set

> Maybe a multibyte character set such as UTF-8, all characters from basic `source character set` in `phrase 1` have single-byte representations.

- If the character specified by an `escape sequence` isn't a member of the `execution character set`, the result is `implementation-defined`, but is guaranteed to not be a `null (wide) character`.

#### * Command Options

> Conversion performed at this stage can be controlled by command line options in some implementations.

`gcc` and `clang` use `-finput-charset` to specify the encoding of the `source character set`, `-fexec-charset` and `-fwide-exec-charset` to specify the encodings of the `execution character set` in the string literals and character constants that don't have an `encoding prefix` (since C11).

### Phrase 6

> Concatenating adjacent `string literals`.

### Phrase 7

> Compiling by compilation.

The `tokens` are `syntactically` and `semantically` analyzed and translated as a `translation unit`.

### Phrase 8

> Linking takes place.

`Translation units` and `library components` needed to satisfy external references are collected into a `program image` which contains information needed for execution in its `execution environment` (the OS).

## Macro

> The preprocessor supports `text macro replacement` and `function-like text macro replacement`.

```c
#define identifier replacement-list

#define identifier(parameters) replacement-list
#define identifier(parameters, ...) replacement-list
#define identifier(...) replacement-list

#undef identifier
```

### `__VA_ARGS__`

> The `additional arguments` can be accessed using `__VA_ARGS__` identifier.

### Stringification: `#`

> In `function-like macro`, a `#` operator before an `identifier` in `replacement-list`
> runs the `identifier` through parameter replacement and encloses the result in quotes, effectively creating a `string literal`.

- When `#` appears before `__VA_ARGS__`, the entire expanded `__VA_ARGS__` is enclosed in quotes:

```c
#define showlist(...) puts(#__VA_ARGS__)
showlist(); // puts("")
showlist(1, "x", int); // puts("1, \"x\", int")
```

### Concatenation (or Token Pasting): `##`

> A `##` operator between two successive `identifiers` in the `replacement-list`
> runs parameter replacement on the two `identifiers` and then `concatenates` the result.

```c
#include <stdio.h>
// function factory
#define FUNCTION(name, a) int func_##name(int x) { return a * x; }
FUNCTION(quadruple, 4)
FUNCTION(double, 2)

#undef FUNCTION
#define FUNCTION 34
#define OUTPUT(a) puts( #a )

int main(void)
{
    printf("%d\n", func_quadruple(13)); // 52
    printf("%d\n", func_double(21)); // 42
    printf("%d\n", FUNCTION); // 34
    OUTPUT(million); // million
}
```

### Predefined Macros

Following macros are predefined in any `translation unit`:

|                          |                                                                                                                                                                                                                                  |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `__STDC__`               | expands to the `integer constant 1`. This macro is intended to indicate a conforming implementation                                                                                                                              |
| `__STDC_VERSION__` (c99) | `long Integer`, value increases with version of the C standard                                                                                                                                                                   |
| `__STDC_HOSTED__` (c99)  | expands to the integer constant 1 if the implementation is hosted (runs under an OS), ​0​ if freestanding (runs without an OS)                                                                                                   |
| `__FILE__`               | expands to the name of the current file, as a character string literal, can be changed by the `#line` directive                                                                                                                  |
| `__LINE__`               | expands to the source file line number, an integer constant, can be changed by the #line directive                                                                                                                               |
| `__DATE__`               | expands to the date of translation, a character string literal of the form "Mmm dd yyyy". The name of the month is as if generated by asctime and the first character of "dd" is a space if the day of the month is less than 10 |
| `__TIME__`               | expands to the time of translation, a character string literal of the form "hh:mm:ss", as in the time generated by `asctime()`                                                                                                   |

## Storage Duration

[keyword]: https://en.cppreference.com/w/c/keyword
[expression]: https://en.cppreference.com/w/c/language/expressions
[identifier]: https://en.cppreference.com/w/c/language/identifier
[reserved_identifier]: https://en.cppreference.com/w/c/language/identifier#Reserved_identifiers
[object]: https://en.cppreference.com/w/c/language/object

## * cppreference.com show toc

```js
document.getElementById('toc').style.display = ''
```
