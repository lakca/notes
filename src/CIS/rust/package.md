- [Rust awesome packages](#rust-awesome-packages)
  - [GUI](#gui)
    - [iced-保留模式的非原生UI](#iced-保留模式的非原生ui)
      - [保留模式](#保留模式)
    - [egui-即时模式的非原生UI](#egui-即时模式的非原生ui)
      - [即时模式](#即时模式)
      - [Who is egui for?](#who-is-egui-for)
    - [Azul-使用web技术(CSS/HTML-like)的非原生UI](#azul-使用web技术csshtml-like的非原生ui)

# Rust awesome packages

## GUI

### iced-保留模式的非原生UI

[![GitHub stars](https://img.shields.io/github/stars/iced-rs/iced?style=flat-square)](https://github.com/iced-rs/iced/stargazers)
[![GitHub license](https://img.shields.io/github/license/iced-rs/iced?style=flat-square)](https://github.com/iced-rs/iced/blob/master/LICENSE)
[![GitHub last commit](https://img.shields.io/github/last-commit/iced-rs/iced?style=flat-square)](https://github.com/iced-rs/iced/commits)

- Simple, easy-to-use, batteries-included API
- Type-safe, reactive programming model
- [Cross-platform support](https://github.com/hecrj/iced/blob/master/docs/images/todos_desktop.jpg?raw=true) (Windows, macOS, Linux, and [the Web](https://iced.rs/))
- Responsive layout
- Built-in widgets (including [text inputs](https://gfycat.com/alertcalmcrow-rust-gui), [scrollables](https://gfycat.com/perkybaggybaboon-rust-gui), and more!)
- Custom widget support (create your own!)
- [Debug overlay with performance metrics](https://gfycat.com/incredibledarlingbee)
- First-class support for async actions (use futures!)
- [Modular ecosystem](https://github.com/hecrj/iced/blob/master/ECOSYSTEM.md) split into reusable parts:
    - A [renderer-agnostic native runtime](https://github.com/hecrj/iced/tree/master/native) enabling integration with existing systems
    - A [built-in renderer](https://github.com/hecrj/iced/tree/master/wgpu) supporting Vulkan, Metal, DX11, and DX12
    - A [windowing shell](https://github.com/hecrj/iced/tree/master/winit)
    - A [web runtime](https://github.com/hecrj/iced/tree/master/web) leveraging the DOM

**iced is currently experimental software.** [Take a look at the roadmap](https://github.com/hecrj/iced/blob/master/ROADMAP.md), [check out the issues](https://github.com/hecrj/iced/issues), and [feel free to contribute!](https://github.com/iced-rs/iced#contributing--feedback)

#### 保留模式

*Retained Mode*, 图形库保存提交的UI状态，用于帧自动渲染，UI更新是通过程序提交命令来告诉图形库更新UI状态来实现的，相对地，一般通过监听UI事件来进行交互响应。相对的，有[即时模式](#即时模式)。

附：[Retained Mode Versus Immediate Mode](https://docs.microsoft.com/en-us/windows/win32/learnwin32/retained-mode-versus-immediate-mode)

![https://docs.microsoft.com/en-us/windows/win32/learnwin32/images/graphics06.png](https://docs.microsoft.com/en-us/windows/win32/learnwin32/images/graphics06.png)
![https://docs.microsoft.com/en-us/windows/win32/learnwin32/images/graphics07.png](https://docs.microsoft.com/en-us/windows/win32/learnwin32/images/graphics07.png)

### egui-即时模式的非原生UI

[![GitHub stars](https://img.shields.io/github/stars/emilk/egui?style=flat-square)](https://github.com/emilk/egui/stargazers)
[![GitHub license](https://img.shields.io/github/license/emilk/egui?style=flat-square)](https://github.com/emilk/egui/blob/master/LICENSE-MIT)
[![GitHub last commit](https://img.shields.io/github/last-commit/emilk/egui?style=flat-square)](https://github.com/emilk/egui/commits)

egui is a simple, fast, and highly portable immediate mode GUI library for Rust. egui runs on the web, natively, and in your favorite game engine (or will soon).

egui aims to be the easiest-to-use Rust GUI library, and the simplest way to make a web app in Rust.

egui can be used anywhere you can draw textured triangles, which means you can easily integrate it into your game engine of choice.

#### 即时模式

*Immediate mode*, 帧刷新时即渲染最新数据，无需手动提交状态，相对地，交互也在帧刷新时通过UI状态自动反馈，而无需保存引用和注册事件回调。详细可见官方解释 [Understanding immediate mode](https://docs.rs/egui/latest/egui/#understanding-immediate-mode)。相对保存模式（*Retained Mode*），即时模式用起来非常简单，但在处理响应布局上会很棘手，更多优缺点可见官方解释：[Why immediate mode](https://github.com/emilk/egui#why-immediate-mode)。

#### Who is egui for?

egui aims to be the best choice when you want a simple way to create a GUI, or you want to add a GUI to a game engine.

If you are not using Rust, egui is not for you. If you want a GUI that looks native, egui is not for you. If you want something that doesn't break when you upgrade it, egui isn't for you (yet).

But if you are writing something interactive in Rust that needs a simple GUI, egui may be for you.

### Azul-使用web技术(CSS/HTML-like)的非原生UI

[![GitHub stars](https://img.shields.io/github/stars/fschutt/azul?style=flat-square)](https://github.com/fschutt/azul/stargazers)
[![GitHub license](https://img.shields.io/github/license/fschutt/azul?style=flat-square)](https://github.com/fschutt/azul/blob/master/LICENSE)
[![GitHub last commit](https://img.shields.io/github/last-commit/fschutt/azul?style=flat-square)](https://github.com/fschutt/azul/commits)

Azul is a free, functional, reactive GUI framework for Rust and C++, built using the WebRender rendering engine and a CSS / HTML-like document object model for rapid development of beautiful, native desktop applications.

121212

12121212

sdklhbjslak