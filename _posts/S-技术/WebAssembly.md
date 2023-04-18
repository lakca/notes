---
date: 2022-03-15T18:42:34+08:00
title: WebAssembly-基本教程
---

# 资源

- [Awesome Wasm](https://github.com/mbasso/awesome-wasm)

# WASM

> 即[*WebAssembly*](https://github.com/WebAssembly/design)的缩写。*WebAssembly*是一种[字节码](https://github.com/WebAssembly/design/blob/main/Semantics.md)。
>
> 通常见于*WebAssembly*二进制源文件的后缀名`.wasm`，旨在实现高效传输（文件大小）和加载（加载时间）。

由于JS的解释性语言和动态类型的特性，引擎在实现高效运行时需对其进行解析、动态转译和优化（AST、类型观察、编译机器码、热点机器码缓存、垃圾回收等）。而*WebAssembly*从其名字 *Web汇编* 可以看出，其本身定位为一种汇编码，接近于机器码，直接加载和运行于虚拟机（沙箱），因而在替代JS工作时能大幅提升运行效率。

*WebAssembly*本身是一种字节码标准，一般不用于直接编写，而是通过高级语言编写，由编译器转译而来。由于其静态性，所以一般会选用具有静态类型的编译型语言来编写，根据生态的完善和活跃性，常见的是*C/C++*, [*Rust*](Rust.md#WebAssembly)等。

# WAT

> 即*WebAssembly Textual Format*的缩写，为*WebAssembly*的文本表示格式。

`.wasm`是一种二进制文件，一般不用于直接编写，而是通过编译器生成，因而提供了一种可读性的文本格式`.wat`，用于学习、调试和优化等。在浏览器中通过[查看源码](https://github.com/WebAssembly/design/blob/main/FAQ.md#will-webassembly-support-view-source-on-the-web)观察到的*wasm*文件内容即为该格式，而非二进制源文件。

# WASI

> 全称*WebAssembly System Interface*，由[Wasmtime](https://github.com/bytecodealliance/wasmtime)项目发起和设计的一族独立于引擎和Web体系、面向系统调用（主要为I/O调用）的*WebAssembly*接口。

尽管*WebAssembly*核心并不依赖运行环境，但由于*WebAssembly*原生于Web，旨在提升Web应用的性能体验，在Web中自然使用Web API与外界相互调用，而在非Web环境中并没有一个统一标准的API，在不同环境移植将会比较麻烦，*WASI*便是用来解决这个问题的一族标准API设计。

# WASMTIME

> [wasmtime](https://wasmtime.dev/): 一个*WebAssembly*独立运行时（类似*NodeJS*之于*JavaScript*，区别于浏览器）。
