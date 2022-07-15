---
title: Rust
date: 2021-04-19T11:13:31.973Z
---

# 语言

- 现代语言
	- [开源](https://github.com/rust-lang)
	- [社区驱动](https://www.rust-lang.org/governance)
	- [定期更新](#工具链版本)
	- 优秀的[官方文档](#文档)
	- 丰富的[标准库](https://doc.rust-lang.org/std/)
	- 活跃的[开源社区](https://www.rust-lang.org/community)
	- 强大的[官方工具链](#版本和工具链管理-Rustup)
		- 编译
		- 测试
		- 文档
		- 包管理
		- 代码质量
		- 离线文档
		- 交叉编译
		- 工具链升级
		- 命令行补全
		- 语言服务器
		- ...
	- [集中包注册源-crates.io](https://crates.io)
	- [集中包文档-docs.rs](https://docs.rs)
	- [语言服务器协议](https://github.com/rust-analyzer/rust-analyzer)（[*LSP*](https://microsoft.github.io/language-server-protocol/)）
	- 无GC的[智能内存管理](#内存管理)
	- 增强型[模块化](#模块系统)
		- 文件内模块化能力
		- 模块内部对外默认不可见
		- 统一规范的模块组织结构
		- 命名空间式（区别于文件路径引用）的模块引用
	- 组合大于继承
		- 没有类（~~*class*~~）和继承概念，取而代之的是特征描述（`trait`）。
	- [元编程](#元编程)
		- 种类丰富的[宏（*Macros*）](#宏)
- 语言特性
	- 没有反射（~~*Reflection*~~）
	- 文件内模块化能力
	- 内存安全、智能内存管理
		- 所有权（*Ownership*）
		- 借用（*Borrowing*）
		- 生命周期（*Lifetime*）
	- 没有类(~~*Class*~~)，描述和组合大于实现和继承（`trait`和*Macros*）
	- 变量遮蔽（*Variable Shadowing*）
	- 严格的数据可变性（*Mutability*）
	- 表达式编程（*Everywhere Expressions*）
		- **非**用于项目声明作用的块`{}`都是表达式（声明作用的块如`struct Foo {}`），可以返回值（返回最后一个表达式）
		- 函数自动`return`(最后一个表达式)
	- 元编程（*Meta Programing*）
		- 宏（*Macros*）：Rust的宏不是简单的字符串替换，而是和函数一样具有丰富的高阶编程能力和自定义返回值。有：
			- 声明宏（*Declarative Macros*），匹配Rust提供的特定语法结构以执行相应代码，如`vec!`
			- 过程宏（*Procedural Macros*），解析属性备注的字符流（`TokenStream`）并执行代码
				- 派生宏（*Derive*），如`#[derive(Clone)]`
				- 类属性宏（*Attribute-Like*），如`#[route(GET, "/")]`
				- 类函数宏（*Function-Like*），如`html! { <h1>{ "Hello World" }</h1> }`
	- 闭包（*Closure*）
	- 运算符重载（*Overload*）
	- 强大的模式匹配（*Pattern Matching*）
	- 内联的工具链
		- 内联测试：依托宏强大的表达能力，测试代码可以直接写在源文件中
		- 备注文档：直接由代码备注生成文档，发布包时自动集成在[社区文档网站](https://docs.rs)中，页面格式统一、功能齐全。

# 准备

 ## 工具

- [Rust Search Extension](https://rust.extension.sh/)：在浏览器中搜索*Rust*文档、库等的终极解决方案，强烈建议安装。

## 查阅

### 文档

[Learn Rust](https://www.rust-lang.org/learn)

- Rust 教程（*The Book*）：[The Rust Programming Language](https://doc.rust-lang.org/book/)，[中文翻译](https://kaisery.github.io/trpl-zh-cn/)
- Rust 实例教程：[Rust by Example (RBE)](https://doc.rust-lang.org/rust-by-example/)
- Rust 练习式教程（*Rustlings*）：[🦀 Small exercises on the command line!](https://github.com/rust-lang/rustlings/)
- Rust 语言文档：[The Rust Reference](https://doc.rust-lang.org/reference)
- Rust 标准库文档：[The Rust Standard Library](https://doc.rust-lang.org/std/)
- Rust 宏详解：[The Little Book of Rust Macros](https://danielkeep.github.io/tlborm/book/index.html)
- Rust 语言速查表：[Rust Language Cheat Sheet](https://cheats.rs/)
- Rust 语言术语：[Glossary](https://doc.rust-lang.org/reference/glossary.html)
- Rust 编译器：[rustc: Compiler for the Rust](https://doc.rust-lang.org/rustc/)
- Rust 黑魔法：[Rustonomicon: the dark arts of unsafe Rust](https://doc.rust-lang.org/nomicon/)
- Rust 语言版本：[What are Editions?](https://doc.rust-lang.org/edition-guide/editions/index.html#what-are-editions)
- 如何用 Rust 编写命令行工具：[Command line apps in Rust](https://rust-cli.github.io/book/)
- 如何用 Rust 和 [WebAssembly](https://webassembly.org/)：[Rust 🦀 and WebAssembly 🕸](https://rustwasm.github.io/docs/book/)
- 如何用 Rust 编写嵌入式系统：[Embedded Rust](https://doc.rust-lang.org/embedded-book)
- 如何设计 Rust API：[Rust API Guidelines](https://rust-lang.github.io/api-guidelines/#rust-api-guidelines)
- Rust 社区仓库：[The Rust community’s crate registry](https://crates.io/)
- Rust 社区仓库文档：[documentation host for crates](https://docs.rs/)
- Rust 仓库目录：[Catalog of programs and libraries written in the Rust](https://lib.rs/)
- Rust 编译错误查询文档：[Rust Compiler Error Index](https://doc.rust-lang.org/error-index.html)
- Cargo：[The Cargo Book](http://localhost/rust/cargo/index.html#the-cargo-book)
- Rustup：[The Rustup Book](https://rust-lang.github.io/rustup/index.html#introduction)
- Rust 和 WebAssembly：[Rust and WebAssembly Documentation](https://rustwasm.github.io/docs)

### 非官方

- [Rust 官方文档中文教程](https://rustwiki.org/)
  - [Rust 程序设计语言](https://rustwiki.org/zh-CN/book)
  - [通过例子学 Rust](https://rustwiki.org/zh-CN/rust-by-example)
  - [rustlings](https://github.com/rust-lang-cn/rustlings-cn)
  - [Rust 参考手册](https://rustwiki.org/zh-CN/reference)
  - [Rust 标准库](https://rustwiki.org/zh-CN/std)
  - [Rust Cookbook](https://rustwiki.org/zh-CN/rust-cookbook)
  - [Cargo 手册](https://rustwiki.org/zh-CN/cargo)
  - [Rust 版本指南](https://rustwiki.org/zh-CN/edition-guide)
  - [rustdoc 手册](https://rustwiki.org/zh-CN/rustdoc)
  - [rustc 手册](https://rustwiki.org/zh-CN/rustc)
  - [Rust 编译错误索引表](https://rustwiki.org/zh-CN/error-index)
  - [Rust 规范文档](https://rustwiki.org/wiki)
  - [Rust 语言术语中英文对照表](https://rustwiki.org/wiki/translate/english-chinese-glossary-of-rust)
- [给初学者的Rust中文教程](https://rustcc.gitbooks.io/rustprimer)
- [The Little Book of Rust Macros](https://danielkeep.github.io/tlborm/book/index.html), [Rust宏小册 中文版](https://www.bookstack.cn/read/DaseinPhaos-tlborm-chinese/README.md)

### 常见速查

- [Operators and Symbols](https://doc.rust-lang.org/book/appendix-02-operators.html#appendix-b-operators-and-symbols)
- [Keywords](https://doc.rust-lang.org/book/appendix-01-keywords.html#appendix-a-keywords)
- [Derivable Traits](https://doc.rust-lang.org/book/appendix-03-derivable-traits.html#appendix-c-derivable-traits)
- 交叉编译：[Cross-compilation](https://rust-lang.github.io/rustup/cross-compilation.html#cross-compilation)
- [Rustc command-line arguments](http://localhost/rust/rustc/command-line-arguments.html#command-line-arguments)
- [Specifying Dependencies](http://localhost/rust/cargo/reference/specifying-dependencies.html#specifying-dependencies)
- 链接库：[Linkage](https://doc.rust-lang.org/reference/linkage.html#linkage)
- 开发工具：[Useful Development Tools](https://doc.rust-lang.org/book/appendix-04-useful-development-tools.html#appendix-d---useful-development-tools)
- 自动升级项目语言版本：[Transitioning an existing project to a new edition](https://doc.rust-lang.org/edition-guide/editions/transitioning-an-existing-project-to-a-new-edition.html#transitioning-an-existing-project-to-a-new-edition)，[Advanced migration strategies](https://doc.rust-lang.org/edition-guide/editions/advanced-migrations.html#advanced-migration-strategies)
- 替换crate源：[Crates Source Replacement](https://doc.rust-lang.org/cargo/reference/source-replacement.html#source-replacement)

## 语言周边

### 吉祥物

> [Ferris](https://www.rustacean.net/): ![Ferris](https://rustacean.net/assets/rustacean-orig-noshadow.svg)

### 语言习惯

- 类型名用 *PascalCase* ；

- 常量用 *UPPER_SNAKE_CASE* ；

- 变量名、函数名、属性名等一般标识符使用 *lower_snake_case* ；

### Rustacean

> [*Rustacean*](https://www.rustaceans.org/)：Rust 用户。
> *Rustaceans are people who use Rust, contribute to Rust, or are interested in the development of Rust.*

### Rustonomicon

> *Rustonomicon*：Rust 高级技巧。
> *The Dark Arts of Advanced and Unsafe Rust Programming.*

## 版本和工具链管理-Rustup

> [Rustup](https://rust-lang.github.io/rustup/)：*Rust*语言和工具链的版本安装和管理器。对于开发者来说应当作为*Rust*语言安装和版本管理的首选工具。

*Rustup*的本地[配置文件](https://rust-lang.github.io/rustup/configuration.html#configuration) 位于：`${RUSTUP_HOME}/settings.toml`

### 工具链

通过`rustup toolchain`命令可以查看、安装和删除[不同版本工具链](#工具链版本)。

Rustup提供了交叉编译能力，你可以在本地安装不同平台的工具链进行代码生产，也可以同时安装同一平台工具链的不同版本，具体可见[构建-工具链版本](#工具链版本)。

通过`rustup target`可以查看、添加和删除目标平台标准库，以支持[交叉编译](#目标平台和交叉编译)。

### 工具链组件

通过 `rustup component`命令可以查看、安装和删除当前工具链的所有组件。Rustup提供的核心[组件包括](https://rust-lang.github.io/rustup-components-history/)：

- Rust编译器[Rustc](https://doc.rust-lang.org/rustc/)
- Rust包管理器[Cargo](https://github.com/rust-lang/cargo/)
- Rust语言服务器[RLS](https://github.com/rust-lang/rls)
- Rust离线文档[Rust-docs](https://rust-lang.github.io/rust-docs/)
- Rust代码格式化工具[Rustfmt](https://github.com/rust-lang/rustfmt)
- Rust代码质量和风格检查工具（*linter*）[Clippy](https://github.com/rust-lang/rust-clippy)
- Rust中间码解释器[Miri](https://github.com/rust-lang/miri/)
- ......

### 升级

通过`rustup check/update`检查/升级Rustup和工具链的更新。

通过`rustup self update/uninstall`可以升级和移除*Rustup*。

### 其他

通过`rustup doc`命令可以查看[Rust-docs](https://rust-lang.github.io/rust-docs/)提供的离线文档。如：
  - `rustup doc --book`：查看语言教程（*the book*）
  - `rustup doc --reference`：语言参考
  - `rustup doc --std [paths|keyword]`：标准库文档
  - `rustup doc --core [topic]`：核心库文档

通过`rustup completions`给当前终端添加命令补全。

## 包管理器-Cargo

> [Cargo](https://doc.rust-lang.org/cargo)：*Rust* 包（Crate）管理和构建工具。

### 配置

[Configuration](https://doc.rust-lang.org/cargo/reference/config.html#configuration)

配置清单保存在`.cargo/config`（或`.cargo/config.toml`，若同时存在则用*config*）文件中：
- 全局配置目录位于`$CARGO_HOME`（即`$HOME/.cargo/config`）。
- 项目本地配置位于所有项目源文件目录（即`<repo>/**/.cargo/config`）。

多个配置文件（本地、全局）会进行**深度合并**，其中数组会进行连接。

[所有配置概览](https://doc.rust-lang.org/cargo/reference/config.html#configuration-format)：
```toml
[alias] # 命令别名
b = "build"
space_example = ["run", "--release", "--", "\"command list\""]

[build]
jobs = 1                      # number of parallel jobs, defaults to # of CPUs
rustc = "rustc"               # the rust compiler tool
rustc-wrapper = "…"           # run this wrapper instead of `rustc`
rustc-workspace-wrapper = "…" # run this wrapper instead of `rustc` for workspace members
rustdoc = "rustdoc"           # the doc generator tool
target = "triple"             # 目标三元组（编译的目标运行环境架构，如x86_64-pc-windows-msvc）
target-dir = "target"         # 生成文件的存放目录
rustflags = ["…", "…"]        # custom flags to pass to all compiler invocations
rustdocflags = ["…", "…"]     # custom flags to pass to rustdoc
incremental = true            # 增量编译
dep-info-basedir = "…"        # path for the base directory for targets in depfiles
pipelining = true             # rustc pipelining

[doc]
browser = "chromium"          # browser to use with `cargo doc --open`,
                              # overrides the `BROWSER` environment variable

[env]
# Set ENV_VAR_NAME=value for any process run by Cargo
ENV_VAR_NAME = "value"
# Set even if already present in environment
ENV_VAR_NAME_2 = { value = "value", force = true }
# Value is relative to .cargo directory containing `config.toml`, make absolute
ENV_VAR_NAME_3 = { value = "relative/path", relative = true }

[cargo-new]
vcs = "none"              # VCS to use ('git', 'hg', 'pijul', 'fossil', 'none')

[http]
debug = false               # HTTP debugging
proxy = "host:port"         # HTTP proxy in libcurl format
ssl-version = "tlsv1.3"     # TLS version to use
ssl-version.max = "tlsv1.3" # maximum TLS version
ssl-version.min = "tlsv1.1" # minimum TLS version
timeout = 30                # timeout for each HTTP request, in seconds
low-speed-limit = 10        # network timeout threshold (bytes/sec)
cainfo = "cert.pem"         # path to Certificate Authority (CA) bundle
check-revoke = true         # check for SSL certificate revocation
multiplexing = true         # HTTP/2 multiplexing
user-agent = "…"            # the user-agent header

[install]
root = "/some/path"         # `cargo install` destination directory

[net]
retry = 2                   # network retries
git-fetch-with-cli = true   # use the `git` executable for git operations
offline = true              # do not access the network

[patch.<registry>]
# Same keys as for [patch] in Cargo.toml

[profile.<name>]         # Modify profile settings via config.
opt-level = 0            # Optimization level.
debug = true             # Include debug info.
split-debuginfo = '...'  # Debug info splitting behavior.
debug-assertions = true  # Enables debug assertions.
overflow-checks = true   # Enables runtime integer overflow checks.
lto = false              # Sets link-time optimization.
panic = 'unwind'         # The panic strategy.
incremental = true       # Incremental compilation.
codegen-units = 16       # Number of code generation units.
rpath = false            # Sets the rpath linking option.
[profile.<name>.build-override]  # Overrides build-script settings.
# Same keys for a normal profile.
[profile.<name>.package.<name>]  # Override profile for a package.
# Same keys for a normal profile (minus `panic`, `lto`, and `rpath`).

[registries.<name>]  # registries other than crates.io
index = "…"          # URL of the registry index
token = "…"          # authentication token for the registry

[registry]
default = "…"        # name of the default registry
token = "…"          # authentication token for crates.io

[source.<name>]      # source definition and replacement
replace-with = "…"   # replace this source with the given named source
directory = "…"      # path to a directory source
registry = "…"       # URL to a registry source
local-registry = "…" # path to a local registry source
git = "…"            # URL of a git repository source
branch = "…"         # branch name for the git repository
tag = "…"            # tag name for the git repository
rev = "…"            # revision for the git repository

[target.<triple>]
linker = "…"            # linker to use
runner = "…"            # wrapper to run executables
rustflags = ["…", "…"]  # custom flags for `rustc`

[target.<cfg>]
runner = "…"            # wrapper to run executables
rustflags = ["…", "…"]  # custom flags for `rustc`

[target.<triple>.<links>] # `links` build script override
rustc-link-lib = ["foo"]
rustc-link-search = ["/path/to/foo"]
rustc-flags = ["-L", "/some/path"]
rustc-cfg = ['key="value"']
rustc-env = {key = "value"}
rustc-cdylib-link-arg = ["…"]
metadata_key1 = "value"
metadata_key2 = "value"

[term]
verbose = false        # whether cargo provides verbose output
color = 'auto'         # whether cargo colorizes output
progress.when = 'auto' # whether cargo shows progress bar
progress.width = 80    # width of progress bar

```

### 包来源

详见 [Source Replacement - The Cargo Book](https://doc.rust-lang.org/cargo/reference/source-replacement.html)

包主要有三个来源：注册源（*registry*）、*git*仓库、本地文件夹（*vendor*）。

[*registry*](https://doc.rust-lang.org/cargo/reference/source-replacement.html#registry-sources)：注册源，一个集中管理*crate*的数据库。该数据库存储*crate*包装文件（`.crates`）并通过维护索引（*index*）来分发包。

[*vendor*](https://doc.rust-lang.org/cargo/reference/source-replacement.html#directory-sources)：供给文件夹，一个直接存储*crate*源文件夹（*unpacked*）的文件夹（*/path/to/vendor/package...*）。

可通过*cargo-local-registry*（`cargo install local-registry`）维护[本地注册源](https://doc.rust-lang.org/cargo/reference/source-replacement.html#local-registry-sources)。

*Rust crates*的默认注册源为 [crates.io](https://crates.io)，可通过以下方式可以[修改注册源](https://doc.rust-lang.org/cargo/reference/source-replacement.html#configuration)：

1. 修改配置文件

```toml
[source.crates-io]
# 替换成`[source.my-vendor-source]`的配置
replace-with = "my-vendor-source"

[source.my-vendor-source]
# 远程注册源
registry = "https://example.com/path/to/index"
# 本地注册源（通过`cargo-local-registry`管理）
local-registry = "path/to/registry"
# 本地文件夹
directory = "path/to/vendor"
# git源
git = "https://example.com/path/to/repo"
# branch = "master"
# tag = "v1.0.1"
# rev = "313f44e8"
```

### 开发流

#### 工具

- `cargo install/uninstall`：安装可执行文件（命令）

- `cargo vendor`：（下载）创建本地注册源目录

#### 创建

```toml
[package]
name = "demo"
version = "0.1.0"
edition = "2021" # 设置rustc大版本
```

- `cargo new`：创建（新目录）项目

- `cargo init`：初始化（当前目录）项目；

#### 依赖

[Specifying Dependencies](http://localhost/rust/cargo/reference/specifying-dependencies.html#specifying-dependencies)

```toml
[dependencies]
# 1. 默认注册源
foo = "0.1.12"
bar = { version = "0.1.12" }
# 2. 指定注册源
baz = { registry = "other-registry", version = "1.0.0" }
# 3. git仓库
regex = { git = "https://github.com/rust-lang/regex", branch = "next" }
regex = { git = "...", tag = "1.0.0" }
regex = { git = "...", rev = "4c59b707" } # 其他任意头
# 4. 本地路径，仅本地可用
hello_utils = { path = "hello_utils" }

# * 多来源，同时提供version字段来定义发布后使用注册源
hello_utils = { path = "hello_utils", version = "1.0.0" }
smallvec = { git = "https://github.com/servo/rust-smallvec", version = "1.0" }

[dev-dependencies]

[build-dependencies]
```

平台特定依赖：

```toml
[target.'cfg(windows)'.dependencies]
winhttp = "0.4.0"
[target.'cfg(target_arch = "x86")'.dependencies]
native = { path = "native/i686" }
[target.'cfg(target_arch = "x86_64")'.dependencies]
native = { path = "native/x86_64" }
```

- `cargo search`

- `cargo fetch`：从网络下载项目依赖包到本地（用于离线编译）

- `cargo update`

#### 开发

- `cargo run`：直接运行代码（编译+运行可执行文件）；（如果没有提前下载）会自动下载依赖。

- `cargo clean`：清理Cargo生成的工件；

#### 测试

- `cargo test`：执行测试代码；

- `cargo bench`： 性能测试；

#### 质量

- `cargo check/fix`：检查项目及其依赖的错误（通过编译）；

```rust
// 代码中调整检查策略
#[allow(clippy::needless_lifetimes)]
#[deny(clippy::needless_lifetimes)]
#[warn(clippy::needless_lifetimes)]
#[forbid(clippy::needless_lifetimes)]
```

- `cargo clippy`：检查代码质量和风格（类似 *eslint*）；由 [*rust-clippy*](https://github.com/rust-lang/rust-clippy) （`rustup component add clippy`）组件实现；

```bash
cargo clippy --fix
cargo clippy --no-deps
```

- `cargo fmt`：格式化代码；由[*rustfmt*](https://github.com/rust-lang/rustfmt) （`rustup component add rustfmt`）组件实现；

#### 编译

见[构建](#构建)

`cargo build`：默认以开发模式编译代码（输出位于 *target/debug*），包含debug信息、代码未经编译器优化。

1. 修改编译器配置（如优化策略、调试符号等）：

```toml
[profile.dev]
opt-level = 1               # Use slightly better optimizations.
overflow-checks = false     # Disable integer overflow checks.
```
2. 修改*rustc*参数：

```toml
[target.xxx]
rustflags = []
```

#### 发布

[Publishing on crates.io](https://doc.rust-lang.org/cargo/reference/publishing.html#publishing-on-cratesio)

与发布相关的重要[配置字段](https://doc.rust-lang.org/cargo/reference/manifest.html)：

```toml
[package]
# ...
description = "A short description of my package"
keywords = ["gamedev", "graphics"]
categories = ["command-line-utilities", "development-tools::cargo-plugins"]
readme = "README.md"
homepage = "https://serde.rs/"
documentation = "https://docs.rs/bitflags"
repository = "https://github.com/rust-lang/cargo/"
license = "MIT OR Apache-2.0"
license-file = "LICENSE.txt"

version = "1.0.0"
# include会覆盖exclude
include = [
	"**/*.rs",
	"Cargo.toml",
	"LICENSE",
]
exclude = [
	"assets/*",
]
```

- `cargo package`：打包项目文件（*.crate*），等同于`cargo publish --dry-run`。
	- [ctates.io](https://crates.io) 限制一个包最大*10MB*，可通过`cargo package --list`命令查看打包后的文件列表，确认是否包含了必要和多余文件。
	- 打包前会自动执行一些检查，比如检测本地代码是否提交、*Cargo.toml*的规范性验证等。
	- 打包完成后还会自动解压到临时目录执行一次编译验证。

- `cargo login/logout`：

- `cargo publish`

- `cargo yank`：撤销已发布版本。
	- 该命令不会删除任何源文件（所以若上传了密码等机密信息只能重置它们）。
	- 如果撤销的版本已经在其他项目的*Cargo.lock*（可以看到*checksum*字段）中存在，这些项目仍将使用撤销的版本。

```bash
cargo yank --vers 1.1.0
cargo yank --vers 1.1.0 --undo # 取消撤回操作
```

- `cargo owner`：管理包的拥有人（可以多个）。
	- Owner可以发布和撤销包版本，必须是Github用户（`cargo owner --add <github_user>`）或团队（`cargo owner --add github:<org>:<team>`）。
	- 只有用户Owner可以添加和删除Owner。

#### 其他

- `cargo doc`： 生成项目文档；通过 [*rustdoc*](https://doc.rust-lang.org/rustdoc/) 实现，Rust 发行版自带。


### Cargo环境变量

完整的环境列表可见[Environment Variables - The Cargo Book](https://doc.rust-lang.org/cargo/reference/environment-variables.html)

- `CARGO_HOME`
- `RUSTC`
- `CARGO_TARGET_DIR`：生成工件的存放目录，对应配置`build.target-dir`，默认为当前项目的*target*目录

### 第三方工具

[Third-party-cargo-subcommands](https://github.com/rust-lang/cargo/wiki/Third-party-cargo-subcommands)

- `cargo-cache`：查看和清理cargo缓存

## 构建

完整构建一个项目可能包括：组织项目结构、声明项目元信息、管理项目依赖、构建开发环境、功能测试、性能测试、编译代码、打包源文件、对外发布......，即使*Rustup*已经为我们提供了各环节的工具链，但无论单独配置每个环节还是整合这些工作依然是繁琐和杂乱的。

不过，通过前面我们已经知道了官方提供了[包管理器-Cargo](#包管理器-Cargo)这一工具，没错，在*Rust*中最简单的项目构建方式就是通过创建*Cargo*来进行。通过编写*Cargo.toml*进行各环节的配置，如配置语言版本、工具链、依赖库、编译条件、环境变量......各种参数，然后执行少许命令就可以自动化地构建项目。

这一章主要针对项目编译这一环节进行描述，其他主要环节可以在[开发流](#开发流)一章节中查阅。

### 语言版本

[What are Editions?](https://doc.rust-lang.org/edition-guide/editions/index.html#what-are-editions)

虽然*Rust*尽可能提供了前向兼容，但经过语言快速发展，也诞生了很多新的语法特性，尤其是关键字（比如`async`, `await`）等，所以仍存在不同的语言版本。

[`--edition`: specify the edition to use](https://doc.rust-lang.org/rustc/command-line-arguments.html#--edition-specify-the-edition-to-use)

查看目前已有的版本：

```bash
rustc --help | grep '\--edition'
```

通过以下方式可以设置版本：

```toml
[package]
edition = 2018
```
```bash
rustc --edition 2018
```

### 工具链版本

[How Rust is Made and “Nightly Rust”](https://doc.rust-lang.org/book/appendix-07-nightly-rust.html#appendix-g---how-rust-is-made-and-nightly-rust)

[Toolchains](https://rust-lang.github.io/rustup/concepts/toolchains.html#toolchains)

Rust官方工具链对外发布有三种[渠道（*channel*）](https://doc.rust-lang.org/book/appendix-07-nightly-rust.html#choo-choo-release-channels-and-riding-the-trains)[版本](https://rust-lang.github.io/rustup/concepts/toolchains.html#toolchain-specification)：

- *nightly*：每天发布一个版本
- *beta*：每六周发布一个版本
- *stable*：当前*beta*版本发布六周后正式发布

查看已安装的版本：

```bash
rustup toolchain list
```
```plain
stable-x86_64-apple-darwin (default)
```

安装[其他版本工具链](https://rust-lang.github.io/rustup/concepts/toolchains.html#toolchain-specification)：

```bash
# 版本格式：<channel>[-<date>][-<host>]

rustup toolchain install stable
rustup toolchain install nightly-2022-02-22
# 指定编译的目标平台
rustup toolchain install stable-x86_64-pc-windows-msvc
# channel除了可以是stable, beta, nightly，还可以是版本号如1.42.1
rustup toolchain install 1.42.1
```

> x86_64-pc-windows-msvc 为编译目标平台的特征值（*目标三值*），详细可见[目标平台和交叉编译](#目标平台和交叉编译)。

切换全局（默认）工具链：`rustup default`

```bash
rustup default stable
```

也可以在项目中配置特定工具链：`rustup override`

```bash
cd /path/to/project
rustup override set nightly
```

当工具链不是由*Rustup*进行维护时，你也可以将这些以其他方式添加的工具链加入*Rustup*：

```bash
rustup toolchain link my-toolchain path/to/my-toolchain
```

### 条件编译

[Conditional compilation](http://localhost/rust/reference/conditional-compilation.html#conditional-compilation)

> 条件编译源码：编译器通过判断源码中特定声明的条件，选择是否加入相关代码进行编译、或在源码中加入特定声明中提供的[属性](http://localhost/rust/reference/attributes.html)、或返回特定声明中的条件是否满足的真值。

代码中编译条件有三种表达方式：

- 通过[`#[cfg(...)]`](http://localhost/rust/reference/conditional-compilation.html#the-cfg-attribute) 属性，选择是否加入相关代码进行编译
- 通过[`#[cfg_attr(...)]`](http://localhost/rust/reference/conditional-compilation.html#the-cfg_attr-attribute) 属性，选择是否在源码中加入提供的特定属性
- 通过[`cfg!(...)`](http://localhost/rust/reference/conditional-compilation.html#the-cfg-macro)类函数[宏](http://localhost/rust/reference/macros.html) ，获取条件断言

无论哪种表达方式，其[配置条件](#配置条件)的表达式格式都是相同的。

#### 配置条件

条件表达式可以是一个*配置项*（*configuration option*），也可以是一个*配置断言*（*configuration predicate*）。

*配置项*则是一个*配置名称*（*configuration name*）如`unix`，或者*配置键值对*（*configuration key-value pair*）如`target_os="unix"`。

*配置断言*则由多个*配置项*组合而成，组合的方式有三种`all()`、`any()`、`not()`。如`all(target_os="window", target_arch="x86_64")`

#### 显隐代码

`#[cfg(<condition>)]`

例如：

- 配置名称：`#[cfg(unix)]`
- 配置键值对：`#[cfg(target_arch="x86_64")]`
- 配置断言：`#[cfg(any(foo, bar)]`、`#[cfg(all(unix, target_pointer_width = "32"))]

#### 添加属性

`#[cfg_attr(<condition>, <attributes...>)]`

通过断言判断是否展开后续属性，如果后续属性是`cfg_attr`属性，则继续展开。

比如：

```rust
#[cfg_attr(feature = "magic", sparkles, crackles)]
```

如果`feature="magic"`条件满足，则展开为：

```rust
#[sparkles]
#[crackles]
```

#### 获取断言

`cfg!(<conditio>)`

通过宏获取断言以在函数内判断当前环境。

```rust
#![allow(unused)]
fn main() {
	let machine_kind = if cfg!(unix) {
	  "unix"
	} else if cfg!(windows) {
	  "windows"
	} else {
	  "unknown"
	};
}
```

#### [features]

通过在*Cargo.toml*中定义特征可以简化配置条件。比如：

```toml

```

`[features]`

### 目标平台和交叉编译

[Cross-compilation](https://rust-lang.github.io/rustup/cross-compilation.html#cross-compilation)

[Rust支持交叉编译](https://rust-lang.github.io/rustup/cross-compilation.html)（在A平台编译出B平台所用的软件），可以通过*rustup*官网查看[支持的所有编译平台](https://rust-lang.github.io/rustup-components-history/)。

*rustc*默认即支持交叉编译：

```bash
rustc --target=aarch64-apple-ios
```

查看*rustc*支持的目标平台：

```bash
rustc --print target-list
```
```plain
aarch64-apple-darwin
aarch64-apple-ios
...
```

`rustup target`：**尽管*rustc*本身支持交叉编译，但标准库（*std*, *core*等）仍然需要自行添加**。

查看所有可用平台（标准库）：

```bash
rustup target list
```
```plain
aarch64-apple-darwin
aarch64-apple-ios
...
x86_64-apple-darwin (installed)
...
```
```bash
rustup target list --installed
```
```plain
x86_64-apple-darwin (installed)
```

添加目标平台（标准库）：

```bash
# 当前工具链
rustup target add aarch64-apple-ios
# 指定工具链
rustup target add aarch64-apple-ios --toolchain stable
```

在项目中选择编译平台：

```toml
[build]
target = "aarch64-apple-ios"

[target.aarch64-apple-ios]
rustflags = [...]
```

#### 目标三值（target）

> *Target triplets*，一个描述软件运行平台的特征值，一般来说由三个部分组成：**CPU架构（*target_arch*）**、**平台厂商（*target_vendor*）**、**操作系统（*target_os*）**。编译器通过这些特征值可以将软件以合适的方式编译到不同的平台运行。
>
> 随着平台发展的多样化，目标三值更多是概念性表达，而非只有三个值。
>
> 比如，有些平台可能同时存在多种工具链（如*gnu*和*msvc*），它们编译出来的软件和运行方式会存在区别（比如*msvc*提供了更多库函数，使得编译出的软件更小、兼容性更强），所以在这些平台还可能有额外值用来指示**工具链（*target_env*）**。
>
> 再比如，并非所有的编译目标都是直接运行在原始平台上，如*WebAssembly*是运行在虚拟机，所以我们可以看到*Rust*提供的wasm三值如`wasm32-wasi`并没有厂商和操作系统信息。

通过`rustc --print=cfg`命令可以查看当前平台特征信息，比如：
```plain
debug_assertions
target_arch="x86_64"
target_endian="little"
target_env=""
target_family="unix"
target_feature="fxsr"
target_feature="sse"
target_feature="sse2"
target_feature="sse3"
target_feature="ssse3"
target_os="macos"
target_pointer_width="64"
target_vendor="apple"
unix
```

各特征常见值如：

- CPU架构：`x86_64`, `aarch64`, `arm` ......
- 平台厂商：`pc`, `apple`, `linux` ......
- 操作系统：`windows`, `darwin`, `ios` ......
- 工具链：`msvc`, `gnu` ......

常见平台如：

- [aarch64-apple-darwin](https://rust-lang.github.io/rustup-components-history/aarch64-apple-darwin.html)：M系列（arm平台）macbook
- [aarch64-apple-ios](https://rust-lang.github.io/rustup-components-history/aarch64-apple-ios.html)：iOS系列产品
- [x86_64-pc-windows-msvc](https://rust-lang.github.io/rustup-components-history/x86_64-pc-windows-msvc.html)
- [x86_64-unknown-linux-gnu](https://rust-lang.github.io/rustup-components-history/x86_64-unknown-linux-gnu.html)
- [aarch64-linux-android](https://rust-lang.github.io/rustup-components-history/aarch64-linux-android.html)：安卓系列产品
- [x86_64-apple-darwin](https://rust-lang.github.io/rustup-components-history/x86_64-apple-darwin.html)：I系列（x64平台）macbook

更多可见[Rust官方支持的目标编译平台](https://rust-lang.github.io/rustup-components-history/)

#### 编译WebAssembly

见[WebAssembly](#WebAssembly)

### 文件类型（正式）

[`--crate-type`: a list of types of crates for the compiler to emit](https://doc.rust-lang.org/rustc/command-line-arguments.html#--crate-type-a-list-of-types-of-crates-for-the-compiler-to-emit)

```bash
rustc --help | grep '\--crate-type'
```

- `bin`：生成可执行文件
- `lib`：生成编译器首选的库文件类型，目前为`rlib`
- `rlib`：*Rust*规范的静态库文件（`rlib`）
- `dylib`：*Rust*规范的动态库文件（`.so`,`.dylib`,`.dll`）
- `cdylib`：*C*语言规范的动态库，适用于跨语言调用（`.so`,`.dylib`,`.dll`）
- `staticlib`：*C*语言规范的静态库，适用于跨语言调用（`.a`,`.lib`）
- `proc-macro`：*Rust*过程宏库

关于库文件详见：[Linkage - The Rust Reference](https://doc.rust-lang.org/reference/linkage.html)

```bash
rustc --crate-type cdylib
```

```toml
[lib]
crate-type = ["cdylib"]
```

```rust
#[crate_type = "cdylib"]
```

### 文件类型（调试）

[`--emit`: specifies the types of output files to generate](https://doc.rust-lang.org/rustc/command-line-arguments.html#--emit-specifies-the-types-of-output-files-to-generate)

```bash
rustc --help | grep '\--emit'
```

-   `asm` ：汇编代码（`.s`）
-   `dep-info` ：包含生成crate所有源文件依赖关系的*Makefile*文件（`.d`）
-   `link` ：由`--crate-type`选项指定输出文件类型，为选项的默认值。
-   `llvm-bc` — LLVM字节码文件（[LLVM bitcode](https://llvm.org/docs/BitCodeFormat.html)`.bc`）
-   `llvm-ir` — LLVM中间码文件（[LLVM IR](https://llvm.org/docs/LangRef.html)`.ll`）
-   `metadata` — 包含crate元数据的文件（`.rmeta`）
-   `mir` — *rustc*中间码文件（`.mir`），可以通过[Miri](https://github.com/rust-lang/miri/)解释
-   `obj` — 原生对象文件（`.o`）

### 打印编译信息（调试）

[`--print`: print compiler information](https://doc.rust-lang.org/rustc/command-line-arguments.html#--print-print-compiler-information)

这个选项会忽略执行`--emit`这一步

-   `crate-name`
-   `file-names` — The names of the files created by the `link` emit kind.
-   `sysroot` — Path to the sysroot.
-   `target-libdir` - Path to the target libdir.
-   `cfg` — List of cfg values. See [conditional compilation](https://doc.rust-lang.org/reference/conditional-compilation.html) for more information about cfg values.
-   `target-list` — List of known targets. The target may be selected with the `--target` flag.
-   `target-cpus` — List of available CPU values for the current target. The target CPU may be selected with the [`-C target-cpu=val` flag](https://doc.rust-lang.org/rustc/codegen-options/index.html#target-cpu).
-   `target-features` — List of available target features for the current target. Target features may be enabled with the [`-C target-feature=val` flag](https://doc.rust-lang.org/rustc/codegen-options/index.html#target-feature). This flag is unsafe. See [known issues](https://doc.rust-lang.org/rustc/targets/known-issues.html) for more details.
-   `relocation-models` — List of relocation models. Relocation models may be selected with the [`-C relocation-model=val` flag](https://doc.rust-lang.org/rustc/codegen-options/index.html#relocation-model).
-   `code-models` — List of code models. Code models may be selected with the [`-C code-model=val` flag](https://doc.rust-lang.org/rustc/codegen-options/index.html#code-model).
-   `tls-models` — List of Thread Local Storage models supported. The model may be selected with the `-Z tls-model=val` flag.
-   `native-static-libs` — This may be used when creating a `staticlib` crate type. If this is the only flag, it will perform a full compilation and include a diagnostic note that indicates the linker flags to use when linking the resulting static library. The note starts with the text `native-static-libs:` to make it easier to fetch the output.

# 变量

- *Immutable*: 变量默认是不可变的；

- *Infer*: 变量类型可由初始化值推断；

- *Shadowing*: 变量可遮蔽，即可声明同名变量（覆盖旧有变量）；

- 声明类型后，变量可不初始化；

```rust
// 完整声明变量
let foo: &str = "hello";

// 初始化不是必要的
let mut bar: &str;

// 也可由初始化自动推断类型
let x;
x = 1; // i32

let foo = 1; // i32

// 变量遮蔽（Shadowing）：声明同名变量
let foo = foo.len(); // usize

// 变量默认不可变
let foo = 1;

// 可变变量（Mutable）
let mut foo = 2;

```

# 常量

```rust
// 必须声明类型
const MAX: u8 = 100;
```

- 常量在编译时确定；

- 可在任意域声明，包括全局域；

- 必须是常量表达式，不能是运行时返回的值；

- 存活于程序运行全程；

# 内存管理（Memory Management）

## 有效性

> 有效性决定了变量是否失效、数据是否会被回收。

- 数据（*Value*, *Rvalue*, *右值*）的有效范围就是变量（*Variable*, *LValue*, *左值*, *Owner*）的有效范围。

- 变量的有效域：从变量在作用域（*Block Scope*: `{}`）中出现开始，到该变量最后一次被调用。

由上，我们可以在同一个作用域中声明同名变量，即 *Shadowing*：

```rust
let a = 1;
println!("{}", a);
let a = "ha"; //声明新的 a 的时候，Rust 可以判定旧的 a 已失效
println!("{}", a);
```

## 所有权（Ownership）

> 与手动释放内存（*manully free*）或垃圾回收（*Garbage Collection*）不同，Rust 通过在**编译时的所有权（*Ownership*）检查机制**来保证能够在运行时自动释放内存，这种机制没有任何运行时的额外开销。
> *In Rust, memory is managed through a system of ownership with a set of rules that the compiler checks at compile time. None of the ownership features slow down your program while it’s running.*

![ownership](./ownership.svg)

如图，在*Rust*中所有值（*Value*）**都有且只有一个**所有者（*Owner*）标记。

与C语言等的传统指针不同的是，所有者指针是强单向绑定的，即指针指向的内存（语言规范，由编译器限制）必须依赖指针而存在，一旦指针生命周期结束了（作用域失效了），该块内存便被释放，这一机制是由编译器保障的。

```rust
fn main() {
	{
		let x = 1;
	}
}
```
```rust{3}
fn main() {
	{
		let x = 1;
		drop();
	}
}
```

1. 所有者（*Owner*），就是指向该值的变量（*Variable*）。

2. 值（*Value*）的所有者（*Owner*）是可以改变（*Move*）的，比如变量间赋值、作为参数给函数调用、以及函数返回等；

3. 值（*Value*）同时刻只有一个所有者（*Owner*），即当存在上述所有权的移交（*Move*）的操作时，移交前的变量将会失去指向。如果后续在该变量未被再次赋值前调用，为了安全考虑，编译器将会报错而不是返回空指针。

4. 当所有者（*Owner*）的作用域结束时，若值（*Value*）没被移交（*Move*），其值（*Value*）便会被自动 *Drop*。
（*the memory is automatically returned once the variable that owns it goes out of scope.*）。

所有权规则：

- 在 *Rust* 中所有 *value* 都有一个表示其 *owner* 的变量；

- 任何时刻都只有一个 *owner* ；

- 当 *Owner* 超出其 *Scope* 时，*Value* 会被删除；

### 移交（Move）

- 变量赋值
- 传入函数
- 函数返回
- 模式匹配（`match`，`if let`等）
- ......

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

### 借用（Borrow）

\* 以下所提及的 **赋值** 都是指的广义的赋值，包括等号赋值（*assignment*）、传递函数参数（*argument passing*）、函数返回（*function returning*）、模式匹配（*matching*）等涉及到内存拷贝的操作。

**赋值** 操作的对象有两个值，即等号左边的 **左值**（此处左值是狭义的，仅指代被赋值的值） 和等号右边的 **右值**（此处右值是狭义的，仅指代赋值的值）。执行 **赋值** 即将右值的内存拷贝（*Copy*）给左值，其中既包括栈内存（存储对象的指针信息，或者存储非对象的值）又包括堆内存（存储对象的值）。

对于对象来说，它的结构比较复杂：因为对象的动态性，其各属性值并不是在堆中连续存储的，每个属性都需要根据指针在堆中寻址找到其值的位置、根据容量来确定值的内存边界等等。如果我们在赋值对象的时候拷贝堆内存相比于栈将会非常耗时，而很多时候在程序中操作对象时，我们关心的是它的值的内容，并不关心值存储在了内存中的什么位置，尤其是当我们打开外部对象时（如文件），我们的操作一般都是针对原对象的，因而我们可以想到，在很多时候，赋值时若不拷贝堆内存将会是一个非常完美的选择，既可以节省赋值操作的时间，又可以直接操作原对象。因此，就有了 *拷贝栈内存，不拷贝堆内存* 的操作。

但此时将会有个问题：赋值后将会有两个变量（栈内存）同时指向该值（堆内存）。如果我们在不同的地方（函数、线程等等）分别对两个变量进行修改操作，将会操作到同一个对象值上面去，即产生了数据竞争（*Data Races*）。若我们在操作一个值时不能明确知道该值会否被其他地方修改，将会增加编程复杂度，并使操作结果变得不可预期，从而影响程序的安全性。因而，为了程序的安全性，*Rust* 将会在赋值后销毁（*Drop*）源变量（即右值的栈内存）。

以上就是 *Rust* 中值的 *Move*（*Move Ownership*）策略，简单来说就是赋值时拷贝变量（栈），不拷贝值（堆），并将源变量销毁。

与之相对应的，对于非对象赋值（栈拷贝）或者我们就想对某数据类型的对象赋值时也拷贝值（堆拷贝），就是所谓的 *Copy* 策略。

因为 *Rust* 要实现 *“用完即毁”* 的内存释放策略，所以在赋值完成后右值。

```rust
let mut a = String::from("hello");
let b = &mut a; // b 是一个无效引用，所以并不影响 c
let c = &a;
println!("{}", c);
```

\* 被 *借用* 是一个引用是 *有效引用* 的条件：

创建引用时，我们在栈中存储了一个指针指向一个值（*Value*），该指针在未被使用前，即没有操作柄（*Handle*），无法改变最终指向的值（*Value*），反之，值（*Value*）被其他 操作柄（*Handle*）改变时，就该指针而言也没有可影响的操作柄（*Handle*），此时该指针不是有效存在的。只有在该指针被使用（*Value Borrowed*）后，双方的操作柄（*Handle*）才会互相影响。

## 引用（Reference）

### 悬空引用（Dangling Reference）

> 所谓悬空引用（*dangling reference*），即引用的变量的作用域结束后，该引用仍被使用。
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

## 生命周期（Lifetime）

> 由于存在

### 生命周期省略规则（Lifetime Elision）

## 字符串切片

> *A string slice is a reference to part of a String.*

> *The `str` type, also called a ‘string slice’, is the most primitive string type. It is usually seen in its borrowed form, `&str`. It is also the type of string literals, `&'static str`.*

## 字符串字面量

\* 字面量是程序代码的一部分，直接存储在程序文件中，因而程序文件加载后常驻于内存，拥有静态生命周期。 ^25d384

> 在 *Rust* 中，字符串并不是元类型，是由 `char` 组成的对象，类型为 `String` 。而字符串字面量由于其特殊性：常驻内存、只读，故其是对 `String` 类型的切片，用 `&str`  或 `&'static str`）来表示其类型。

> *String literals being stored inside the binary. it’s a slice pointing to that specific point of the binary. They are `'static` because they’re stored directly in the final binary, and so will be valid for the `'static` duration.*）

字符串字面量可以用于创建 `String` 对象：

```rust
let s = String::from("hello");
let s = "hello".into();
let s = "hello".to_owned();
let s = "hello".to_string();
```

# 数据类型

[Type System](https://doc.rust-lang.org/reference/types.html)

|           |                  |                                                                                     |
| --------- | ---------------- | ----------------------------------------------------------------------------------- |
| Scalar    | *integer*        | `i8`,`u8`,`i16`,`u16`,`i32`（默认）,`u32`,`i64`,`u64`,`i128`,`u128`,`isize`,`usize` |
|           | *floating-point* | `f32`,`f64`（默认）                                                                 |
|           | *boolean*        | `bool`                                                                              |
|           | *character*      | `char`                                                                              |
| Compound  | *tuple*          | `()`                                                                                |
|           | *array*          | `[]`                                                                                |

|           |                  |                                                                                     |
| --------- | ---------------- | ----------------------------------------------------------------------------------- |
| Function  |                  | `fn`                                                                                |
| Reference |                  | `&`                                                                                 |
|           | *slice*          | `&[]`, `str`                                                                        |
| Never     |                  | `!`                                                                                 |

- *Scalar type* represents a single value.
- *Compound types* can group multiple values into one type.

## 数字

- 默认整型为 `i32` ，默认浮点型为 `f64`。

- 支持运算符： `+-*/%` ;

- 若赋值超出声明的类型范围，如 `i8` 范围为 `0 ~ 255`，发布编译（`--release`）的执行时不会检查报错，而是遵循 *two’s complement wrapping* 规则，进行溢出偏移，如 `let i: i8 = 260; assert_eq!(i, 4)`；非发布编译则会报错，若溢出偏移为程序正常设计，可通过 `#![allow(overflowing_literals)]` 声明来允许该功能；

数字字面量（`Number Literals`）:

```rust
// 整型字面量可以使用 _ 分隔符增强可读性
let i = 1_000_000；
// 后缀声明类型
let i = 10u8;

// 十六进制
let i = 0xff;
// 八进制
let i = 0o77;
// 二进制
let i = 0b11;
// 字节（u8）
let i = b'a'; // 等价 let i = 97
```

## 字符（`char`）

> 表示一个 *unicode* 字符，4个字节。

`char` is a ‘Unicode scalar value’, which is similar to, but not the same as, a ‘Unicode code point’.

- 字符范围：*U+0000* ~ *U+D7FF* 和 *U+E000* ~ *U+10FFFF* 。

- 字符用单引号 `''` 标注。

```rust
let c = 'A';
let c = '😻';
```

## 字符串（`str`）

> `str`是一个未知长度的字符数组，即`[u8]`。

A value of type `str` is represented the same way as `[u8]`, it is a slice of 8-bit unsigned bytes.

## Never（`!`）

> **这是一个试验性的功能。** `!` 表示 *never* 类型，表示没有返回值。(*`!` represents the type of computations which never resolve to any value at all.*)

## 元组（`Tuple`）

> *tuple*：一组任意类型（*different types*）但长度固定（*fixed length*）的序列（*sequence*）值。

```rust
// 完整定义
let tup: (i32, char) = (10, 'A');
// 推断 infer
let mut tup = (10, 'A');
// 解构 destructuring
let (a, b) = tup;
// 索引 indexing
let a = tup.0;
// 赋值
tup.0 = 12;
```

单元元组（`Unit`）:

> 没有值的元组 `()`，一般为没有明确返回值的函数的返回值。

## 数组（`Array`）

> *array*：一组类型相同（*homogenous type*）、长度固定（*fixed length*）的序列（*sequence*）值。（相对地，变长数组见 `Vector` ）

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

## 引用（`&`）

> 引用，一种借用（不拥有但使用）数据的手段。

[![reference](./reference.svg)](https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html#references-and-borrowing)

根据[所有权](#所有权)章节我们知道，直接赋值会转移（*Move*）数据的所有权（*Ownership*），使原变量失效。
但在有些时候这样做会产生很多不便，比如在调用函数时传入数据，如果当前作用域仍想继续调用该数据，则需要函数返回该数据来实现，或在与数据地址无关的调用（不要求源数据）情况下通过数据克隆实现。
很显然，这些方法很重，前者上下文关联性强，为函数引入了额外逻辑（返回源数据），后者则引入了额外的时空损失。因而 *Rust* 提供了引用（*Reference*）类型。

*A reference is just a pointer that is assumed to be aligned, not null, and pointing to memory containing a valid value of T.*

- 引用分为可变引用（`&mut`, `ref mut`）和不可变引用（`&`, `ref`）。（*You can get one by using the `&` or `&mut` operators on a value, or by using a `ref` or `ref mut` pattern.*）

- 引用也是一个变量（广义左值），其有效作用域（有效存在）开始于引用声明，结束于该引用最后一次使用。（*A reference’s scope starts from where it is introduced and continues through the last time that reference is used.*）

- 在不造成数据竞争（*Date Races*）的情况下，引用可以同时存在多个：

   - 同时 *有效存在* 多个不可变引用；

   - 同时 *有效存在* 多个可变引用；

   - 不可~~同时 *有效存在* 可变和不可变引用~~；

- 引用比较的是地址，不是值。（*Reference equality by address, instead of comparing the values pointed to.*）

- 动态引用可以转换成静态引用。（*`&mut T` references can be freely coerced into `&T` references with the same referent type*）

- 长周期引用可以转换成短周期引用。（*references with longer lifetimes can be freely coerced into references with shorter ones.*）

> Note: *Historically, Rust kept the borrow alive until the end of scope, so these examples might fail to compile with older compilers. Also, there are still some corner cases where Rust fails to properly shorten the live part of the borrow and fails to compile even when it looks like it should. These'll be solved over time. [https://doc.rust-lang.org/nomicon/lifetimes.html](https://doc.rust-lang.org/nomicon/lifetimes.html)*

```rust
fn main() {
  // 引用不移交所有权
  let a = String::from("hello");
  let b = &a;
  println!("{}", b);
  println!("{}", a);

  // 不能同时存在多个有效的可变引用
  let mut a = String::from("hello");
  let b = &mut a;
  let c = &mut a; // 报错，b在后续使用了，故此时b仍存在
  println!("{}", b);

  // 多个不可变引用可同时存在
  let mut a = String::from("hello");
  let b = &a;
  let c = &a;
  println!("{}, {}", b, c);

  // 不能同时存在有效可变引用和有效不可变引用
  let mut a = String::from("hello");
  let b = &a;
  let c = &mut a; // 报错
  println!("{}, {}", b);

  // 有效性结束于最后一次被调用
  let mut a = String::from("hello");
  let b = &a; // b后续没有被使用，此行结束b已失效
  let c = &mut a;
  println!("{}", c);

  let mut a = String::from("hello");
  demo(&mut a);
  demo(&mut a); // 两个 demo 中的引用先后创建和失效，不存在冲突
  println!("{}", a);

  let mut a = String::from("hello");
  let mut b = &mut a;
  let mut c = &mut a;
  demo(&mut c); // 报错，b 在后续使用，仍有效存在
  demo(&mut b);

  let mut a = String::from("hello");
  let b = &a;
  {
    let b = &mut a; // 报错，父作用域中的引用在当前作用域结束后被使用
  }
  println!("{}", b);
}

fn demo(a: &mut String) {
  a.push_str(", world")
}
```

### 借用

> 引用实现了就叫做借用（*Borrow*），与转移（*Move*）所有权相对应。

若一个变量只是被赋值了一个引用，而该变量并没有被调用（借用），那么这个变量相当于无效变量，引用也是一个无效的引用。

## 切片（`Slice`）

> 切片是数据的一个视口（与引用不同的是：不可变性、可以引用部分数据）。视口，顾名思义，用来看（读取）某个空间里面的内容（数据），其可大可小，需要记录视口开始位置（开始地址`ptr`）和大小（切片长度`len`）。

Slices are a view into a block of memory represented as a pointer and a length.

[![slice](./slice.svg)](http://doc.rust-lang.org/book/ch04-03-slices.html#string-slices)

### 字符串切片（`&str`）

> 即 `&String[..]`

## 向量（`Vector`）

> *Vectors* allow you to store more than one value in a single data structure that puts all the values next to each other in memory. Vectors can only store values of the same type.*

- *homogenous*

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

assert_eq!(&3, &v.len());
assert_eq!(&3, &v.capacity());

assert_eq!(&0, &v[0]);
assert!(std::panic::catch_unwind(|| { &v[10] }).is_err()); // * 这里用到了匿名函数

assert_eq!(&Some(&0), &v.get(0));
assert_eq!(&None, &v.get(10));

assert_eq!(&Some(&mut 0), &v.get_mut(0));
assert_eq!(&None, &v.get(10));

assert_eq!(&(), &v.push(1));
assert_eq!(&Some(1), &v.pop());
```

## 字符串（`String`）

> 实际代表的是一个字符向量，即：`Vec<u8>`。

a collection of characters.

- 与 `char` 一样为 *UTF-8* 编码；

```rust
let s = String::new();

let s = "hello".to_string();

let s = String::from("hello");
```

```rust
let mut s = String::from("hello");
s.push_str(" world"); // string
s.push('!'); // char
s += "!";
```

## 字典（`HashMap`）

- *homogenous*

`HashMap` 没有预先引入（*prelude*）：

```rust
use std::collections::HashMap;
```

```rust
// 标准创建
let mut scores: HashMap<String, i32> = HashMap::new();

// 推断创建
let mut scores = HashMap::new();

// 通过 key 和 value 集合间接创建
let teams = vec![String::from("Blue")];
let initial_scores = vec![10];
// collect() 可以返回不同的数据结构，使用 HashMap<_, _> 后可以指定为 HashMap
// 使用 <_, _> 的原因是 Rust 可以根据两个 collections 推断出来
let mut scores: HashMap<_, _> = teams.into_iter().zip(initial_scores.into_iter()).collect();
```

```rust
scores.insert(String::from("Red"), 50); // add or overwrite when value is not equal
scores.insert(String::from("Blue"), 20);
scores.entry(String::from("Blue")).or_insert(30); // only add
assert_eq!(Some(&20), scores.get("Blue"));
assert_eq!(None, scores.get("Yellow"));
```


# 空和错误

# 语言基础

## 变量和项目

>[项目](http://localhost/rust/reference/items.html)，是程序文件的一部分，在编译期确定并编译入程序文件，在程序执行期间常驻于内存中，通常是只读内存。如`struct`,`trait`,`const`等。为可在模块（*Modules*）全局范围内出现的任何声明。
>
>[变量](https://doc.rust-lang.org/reference/variables.html)，是执行栈帧的一部分，在执行期间建立，用于指向内存数据。包括函数的命名参数（*named function parameter*）、局部命名变量（*named local variable*，`let`声明）、[匿名临时变量](https://doc.rust-lang.org/reference/expressions.html#temporaries)（*annoymous temporary*，表达式中的字面量或中间值可能是在执行时临时分配的）。

### 变量（Variable）

> [变量](https://doc.rust-lang.org/reference/variables.html)

```rust
fn hello(word: &str) {
	println!("{}", word);
}

let word = "hello";
```

### 项目（Item）

> [项目](https://doc.rust-lang.org/reference/items.html)

#### 模块（Module）

> [模块](http://localhost/rust/reference/items/modules.html)，是多[[#项目（ Item ）]]的容器，用于项目的访问性隔离。*A module is a container for zero or more [items](http://localhost/rust/reference/items.html).*

- 同名模块不能声明多次（不支持遮蔽和扩展）
- 模块与[[#类型系统]]共享命名空间，且不能遮蔽
- 文件模块有*mod-rs*和*non-mod-rs*两种类型，其中*mod-rs*，包括根模块*main.rs*和*lib.rs*, 以及目录模块*mod.rs*
- *Cargo.toml*中声明的依赖，以及外链库（`rustc --extern`）是不需要单独加载的，这些属于[预导入包（Preludes）](#预导入包（Preludes）)。

```rust
// 内联模块：
mod inline {}

// 文件模块：
mod a; // a.rs

// 文件夹模块：
mod b; // b/mod.rs
```
加载自定义路径模块：
```rust
#[path="path/to/file.rs"]
mod external;

// 对于声明在内联模块的自定义路径模块，mod-rs与non-mod-rs有些不同：

// mod-rs:

mod inline {
	#[path="x.rs"]
	pub mod x; // inline/x.rs
}

// non-mod-rs: other.rs

mod inline {
	#[path="x.rs"]
	pub mod x; // other/inline/x.rs
}
```
使用模块：
```rust
mod inline {
	pub mod a {
		fn hello() {
			println!("hello world!");
		}
		pub fn hi() {
			self::hello(); // 访问同模块
			// 或直接访问
			hello();
		}
	}
	pub mod b {
		pub fn hi() {
			super::a::hi(); // 访问父模块
		}
	}
}

fn main() {
	inline::a::hi();
	inline::b::hi();

	// 如果当前文件为：main.rs, lib.rs
	crate::inline::a::hi();
	// 如果当前文件为：foo/mod.rs
	crate::foo::inline::a::hi();

	// 引入命名空间
	use inline::a;
	a::hi();

	use inline::a::{hi as hello};
	hello();

	use inline::b::*;
	hi();
}
```

##### 预导入包（Preludes）

> [Preludes](http://localhost/rust/reference/names/preludes.html#extern-prelude): 是一组被自动引入到所有模块的名称。但这些名称并不属于这些模块（不能通过`self::xxx`的方式调用）。

分为五种类型：

-   [标准库预导入包（Standard library prelude）](http://localhost/rust/reference/names/preludes.html#standard-library-prelude)
	- [`std::prelude::v1`](http://localhost/rust/std/prelude/index.html)（使用`no_std`会改变该行为，详见[The `no_std` attribute](http://localhost/rust/reference/names/preludes.html#the-no_std-attribute)）
-   [外部预导入包（Extern prelude）](http://localhost/rust/reference/names/preludes.html#extern-prelude)
	- 核心包：[`core`](http://localhost/rust/core/index.html)
	- 编译时链接的外部包（`rustc --extern xxx`）
	- 项目根模块中引入的外部包（`extern crate xxx`）
-  [语言预导入包（Language prelude）](http://localhost/rust/reference/names/preludes.html#language-prelude)
	- 布尔值、数字、文本（`char`, `str`）等内置类型
	- 内置属性，详见[Built-in attributes index](http://localhost/rust/reference/attributes.html#built-in-attributes-index)
-   [`macro_use` prelude](http://localhost/rust/reference/names/preludes.html#macro_use-prelude)
	- 通过`#[macro_use]`属性修饰`extern crate xxx`引入的外库宏，例如[The `macro_use` attribute](http://localhost/rust/reference/macros-by-example.html#the-macro_use-attribute)
-   [工具预导入包（Tool prelude）](http://localhost/rust/reference/names/preludes.html#tool-prelude)
	- 如目前*rustc*识别的*rustfmt*, *clippy*等工具，详见[tool attributes](http://localhost/rust/reference/attributes.html#tool-attributes)。如`#[rustfmt::skip]`

#### 外链库（Extern Crate）

> [外链库](http://localhost/rust/reference/items/extern-crates.html)，在编译时链接的其他（二进制文件）库（*ABI*, *Application Binary Interface*）。尤其用于与其他语言进行交互（*[FFI](https://rustcc.cn/article?id=3b8241d0-c4ca-4f49-8e07-0a5142b00f59)*, *Foregin Function Interface*）

```rust
// main.rs
extern crate hello; // rust2018开始不再需要，见备注

fn main() {
	hello::public_fn();
}
```
 > Note: [No more `extern crate`](https://doc.rust-lang.org/edition-guide/rust-2018/path-changes.html#no-more-extern-crate)

直接编译：
```bash
rustc main.rs --extern hello="path/to/hello"
```

cargo引入：
```toml
[dependencies]
hello = { path: "path/to/hello" }
```

## 表达式和语句

> Rust主要是一门[表达式语言](https://doc.rust-lang.org/reference/statements-and-expressions.html)，绝大多数计算值或执行副作用的计算式都是表达式，一般地，表达式结尾加上分号即形成了语句。

> [语句](https://doc.rust-lang.org/reference/statements-and-expressions.html)（Statement）为程序（不是处理器）的最小完整执行单元（本质上也叫程序，我们通常所言的程序是复杂程序，由很多单元程序组成）。
>
> [表达式](https://doc.rust-lang.org/reference/expressions.html)（*Expression*）则是语句的构成元，不单独存在。一个语句可以有一个或多个表达式构成，一个表达式也可以包含多个表达式，这样的表达式可以叫复合表达式。

程序，本质上来说是一系列抽象逻辑，逻辑即语句，即一个有意义的独立存在。而逻辑的过程即表达式，逻辑的过程是无法独立存在的，它需要表达出这个逻辑才有意义。

高级编程语言，封装多层抽象通过转义在语法层面上实现了很多高级表达式。

编程语言（编译器或解释器）至少会将**换行符**或**文件结尾**认定为语句的界定符以结束一个程序单元，而大多数编程语言还会将**分号**、**大括号**、**特定逻辑界定符**（逻辑界定符是语言认定的一种词法界定逻辑，一般不是一个全局通用的符号，比如Rust数组`[1,2]`中的逗号界定符、元组`(1,2)`中的逗号界定符和函数参数`foo("hello", "world")`逗号界定符等等，虽然都是逗号，但他们的意义是完全不同的，属于特定语法界定符）等当做语句界定符。

所以简单地说：

**表达式**是语法的最小单元，拥有语法上的完整意义。看一段字符是不是表达式，就看它是否在语法上是否完整，如字面量`1`是元表达式（不可拆分），运算式子`1+2`是复合表达式（元表达式和表达式连接运算符构成），调用`println!("hello")`也是复合表达式（函数调用或宏调用属于结构比较特殊的连接运算符号，比如我们可以定义更直白的调用：`print using hello`）。

**语句**是程序的最小单元，拥有独立成程序的完整结构。看一段字符是不是语句，就看它是否可以独立运行，比如字面量语句`1;`，运算语句`1+2;`，调用`println!("hello");`都是语句，只不过前两个语句是*unused*，没有什么实际意义。

比如 `1 + 2`这段代码（注意，1和2前后没有任何符号，包括前述的任何界定符）：对于任何编程语言来说这是一个表达式，意即处理器可以执行，但这不是一个（完整）语句，即一个单元的程序（编译器/解释器）并不会就此结束，仍将继续读取后续字符以找到语句界定符以结束一个完整语句。在Rust中结束这段语句，我们可以加上分号（语言显式语句界定符`;`） `1 + 2;`，或置于大括号前（语言显式语句界定符`{}`）`{1 + 2}`，函数调用（语言显式语句界定符`()`）`println!(1 + 2)`等等。

```rust
1
// error: 这是一个字面量表达式，但不是一个语句
// 因为它虽然语法上拥有完整语义，但不能独立存在，因为这段程序还没终止。

1;
// pass: 这是一个语句，一段完整的程序，因为分号是Rust的语句界定符。
```

- 当表达式没有明确返回值的时候，返回的是空元组（`()`）。

### 语句（Statement）

> [语句](https://doc.rust-lang.org/reference/statements.html)：

除了项目的声明语句（*Item Declaration Statement*）外，如声明结构：`struct Foo {}`，语句通常以分号`;`结尾。

#### 声明语句（Declaration Statement）

##### 项目声明语句（Item Declaration）

##### 变量声明语句（Variable Declaration）

#### 表达式语句（Expression Statement）

### 表达式（Expression）

#### 字面量表达式（Literal）

> [字面量](https://doc.rust-lang.org/reference/tokens.html#literals)，不需要名称（如变量）引用，直接表达一个值的量。

[主要有](https://doc.rust-lang.org/reference/tokens.html#literals)数字字面量、布尔值字面量、字符字面量、字符串字面量。

#### 路径表达式（Path）

> [路径](https://doc.rust-lang.org/reference/paths.html)：由命名空间限定符`::`逻辑分隔的一个或多个路径分段序列，用于返回变量（*Variable*）或项目（*Item*）。

如：
- `x` ：本地变量或项目
- `x::y::z`：深度项目
- `::x`：外部（`extern`）crate。（Rust2018之前，这种写法同`self::x`，只代表当前crate根）

特殊路径段：

- `self`（当前模块） `super`（父级模块）, `crate`（crate根）
- `Self`：表示当前结构的类型（`struct`），用在标注方法返回类型。
- `$crate`：表示crate根，但只用在宏（*macros*）定义里面。

```rust
pub fn increment(x: u32) -> u32 {
    x + 1
}

#[macro_export]
macro_rules! inc {
    ($x:expr) => ( $crate::increment($x) )
}
fn main() { }
```

#### 块表达式（Block）

> [块](https://doc.rust-lang.org/reference/expressions/block-expr.html)：包括控制流（如`if {}`）表达式，和独立存在的匿名命名空间（`{}`）。
> (A _block expression_, or _block_, is a control flow expression and anonymous namespace scope for items and variable declarations.)

- 块表达式未显式赋值给其他变量时，期待返回类型为单元`()`

```rust
// error: 未赋值，应该返回空元组
{
	1
};

// pass: 返回 ()
{
	()
};

// pass: 返回 ()
{

};

// paas
let x = {
	1
};
```

## 类型系统

### 内置类型（Built-in Types）



## 控制流程

 ### `if`

- 条件的类型必须为 `bool` ；

- 条件不要求必须有 `else`（*may incomprehensive*）；

```rust
// 圆括号可以省略
if true {
  println!("hello")
}

// 获取返回值
let x = if true { 1 } else { 2 }; // 注意返回值必须类型相同，因为 Rust 是静态类型，类型在编译时就确定。
```

### `while`

- 条件的类型必须为 `bool` ；

```rs
while x {}
```

### `for`

```rs
for x in iter {}
```

### `loop`

> 无条件循环。

无限循环：

```rust
loop {}
```

中断循环：

```rust
loop {
  println!("hello");
  break // 实际上返回了空元组：()
}
```

中断外层循环

```rust
'loopLabel: loop {
  println!("hello");
  loop {
    println!("world");
    break 'loopLabel
  }
}
```

返回值：

```rust
let a = loop { break 1 }
```

## 指针

> *Raw, unsafe pointers, `*const T`, and `*mut T`.*

# 面向过程

## 函数

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

# 面向对象

## 结构

> *Struct*: 用以创建特定结构的类型。实际上是一组有名字的值（*Fields*）的模版（*Template*）。

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

### 关联函数（associated functions）：

> `impl`里面的函数统称为结构的**关联函数**。

- 第一个参数为`self`的关联函数特称为**方法（*methods*）**，通过点表示符调用，如`"hello".to_string()`。

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

- 除了方法外的关联函数通过双冒号表示符调用，如`String::from("hello")`（在某些语言中称之为*静态方法*）。

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

### 元组结构

> *Tuple struct*: 自定义名称的元组类型。

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

### 单元结构

> *Unit struct*

```rs
struct A;
```

### 自动引用和解引用

> *automatic referencing and dereferencing*: *when you call a method with object.something(), Rust automatically adds in &, &mut, or * so object matches the signature of the method.*

上述例子中结构方法 `grow` 和 `greet` 虽然对 `self` 的使用不同，但是我们调用方法时，并没有什么区别。这里就是 *Rust* 给我们自动引用和解引用了。

## 特征

# 元编程

## 属性

## 宏

# 模式匹配

## 枚举

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

## `Option`

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

## `match`

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

## `if let`

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

# 模块系统

## 包

> 包（*Package*）是一个包含包配置文件（*Cargo.toml*）和库（*Crates*）的文件夹。（*A package is one or more crates that provide a set of functionality. A package contains a Cargo.toml file that describes how to build those crates.*）

- 一个包（*package*）只可以包含一个库资源文件（*crate library*）树；

- 一个包（*package*）可以包含多个库可执行文件（*crate binary*）树；

## 库

> 库（*crate*）是 rust 的一个编译单元。
> 库（*crate*）可以是一个可执行文件（*Crate binary*）的源文件树，或一个库资源文件（*Crate library*）的源文件树。（*A crate is a binary or library. A tree of modules that produces a library or executable.*）

库资源文件（*crate library*）：用于代码引入，所以一个 *package* 只有一个 *crate library*，且与 *package* 同名。

可执行文件（*crate binary*）：用于编译成可执行文件文件直接单独运行，所以可以有多个。

文件树，是因为入口文件可以引入其他依赖文件。

*Cargo* 约定：

- *src/main.rs* 作为 *package* 同名 *crate binary* 的入口文件；

- *src/lib.rs* 作为 *package* 同名 *crate library* 的入口文件；

- *src/bin* 作为一个存放其他 *crate binary* 的文件夹；

## 路径

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

## 模块

> 通过模块（*Module*）封装代码，创建作用域（*Scope*）隔离功能层次，并控制代码的可见性（*public or private*）。（*Let you control the organization, scope, and privacy of paths.*）

实际上可以把模块（*module*）理解为一个具名的作用域（*named scope*），特殊之处是在该作用域中可以手动控制其内部资源的暴露并通过特殊方式访问。所以默认情况下，模块有作用域同样的规则：

- 模块内部对模块父域（*parent scope*）默认不可见，通过 `pub` 暴露；

- 同级域的资源（*siblings*）互相可见；

- 父域（*parent scope*）对其中的模块（*module in the scope*）可见；

具体用法：

### 创建模块-`mod`

> 通过 `mod` 标记创建模块（*module*）。

```rust
mod a {
  fn demo() {}
}
```

### 加载模块-`mod`

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

### 暴露模块-`pub`

> 通过 `pub` 标记暴露模块（*module*）或模块内容（*module inners*）给父域（*parent scope*）。

```rust
pub mod a {
  pub fn demo() {}
}
```

> 还可以在导出模块时自定义模块的可见性。

仅模块自己可见，相当于 `pub`

```rs
pub(self) a
```

最远到父模块可见

```rs
pub(super) a
```

最远到项目可见

```rs
pub(crate) a
```

最远到指定祖先模块可见

```rs
pub(in a::b) a
```

### 相对路径之库根模块-`crate`

> 用 `crate` 表示当前crate根（*current crate root*）。

```rust
// src/lib.rs 是 library 的入口文件，故而 C 应该是 src/lib.rs 文件中的一级 module
crate::C::demo();
```

### 相对路径之父级模块-`super`

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

### 相对路径之当前模块-`self`

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
  /// 若结构本身及其属性有未声明 pub 的，则结构无法直接在外部使用（初始化结构）
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

### 引入路径-`use`

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

# WebAssembly

[Game of Life tutorial](https://rustwasm.github.io/docs/book/game-of-life/introduction.html)

[Rust and WebAssembly Documentation](https://rustwasm.github.io/docs)

[Awesome Rust and Webassembly](https://github.com/rustwasm/awesome-rust-and-webassembly)

*Rust*目前提供了四种*WebAssembly*工具链，分别对应了不同的运行时：

- `wasm32-unknown-unknown`：*Rust*原生的*WebAssembly*编译器，运行在没有IO接口（如浏览器等）的环境。
- `wasm32-unknown-emscripten`：使用[*emscripten*](https://github.com/kripken/emscripten)编译，在项目依赖了*C*/*C++*等语言时使用。
- `asmjs-unknown-emscripten`：编译成[*asm.js*](http://asmjs.org/)（*WebAssembly*前身）
- `wasm32-wasi`：目标环境提供了IO接口。

## wasm-pack

> [`wasm-pack`](https://rustwasm.github.io/docs/wasm-pack/): 用于一站式构建、测试和发布*Rust*创建的*WebAssembly*包。

`wasm-pack`之于（*Rust-generated*）*WebAssembly*类似于*Cargo*之于*Rust*。

通过`wasm-pack new`可以快速**创建**一个用于构建*WebAssembly*的项目（*Crate*），项目中会预置一些必要的依赖包（如`wasm-bindgen`），预设一些常见配置（如`crate-type = ["cdylib", "rlib"]`）等。

通过`wasm-pack build`**编译**项目，`wasm-pack publish`**发布** *npm*包......

## wasm-bindgen

> [`wasm-bindgen`](https://github.com/rustwasm/wasm-bindgen)：*wasm*和*JavaScript*之间高级特性的实现。

`wasm-bindgen`实现了*wasm*和*JavaScript*之间在*WebAssembly*标准之外的一些高级特性的转接。比如，JS/wasm之间除了使用标准中的数字类型数据进行通信，还可以直接使用字符串、对象、类等数据类型；再比如调用`document.querySelector`等*DOM*操作、`window.alert`等环境方法......

```rust
use wasm_bindgen::prelude::*;

// Import the `window.alert` function from the Web.
#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

// Export a `greet` function from Rust to JavaScript, that alerts a
// hello message.
#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}!", name));
}
```
```javascript
import { greet } from "./hello_world";

greet("World!");
```

# Others

```rust
// 获取数据的类型名称
fn get_type(_: &T) -> &'static str {
  std::any::type_name::<T>()
}
```
