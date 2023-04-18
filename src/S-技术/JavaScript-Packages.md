---
title: JavaScript库
date: 2022-07-05T14:59:01+08:00
---

# 体系类

## ORM

|             | MySQL | SQLite | PostgreSQL | MongoDB | ...                 |
| ----------- | ----- | ------ | ---------- | ------- | ------------------- |
| `prisma`    | Yes   | Yes    | Yes        | Yes     | MariaDB, SQL Server |
| `mikro-orm` | Yes   | Yes    | Yes        | Yes     | MariaDB             |
| `knex`      |       |        |            |         | -                   |
| `type-orm`  |       |        |            |         | -                   |
| `sequelize` |       |        |            |         | -                   |
| `mongoose`  |       |        |            |         | -                   |

|             | Client | Migration                                   | TypeScript | DSL | Transaction                                   | Read/Write Splitting | Schema Generator                                  |
| ----------- | ------ | ------------------------------------------- | ---------- | --- | --------------------------------------------- | -------------------- | ------------------------------------------------- |
| `prisma`    | Yes    | Yes                                         | Yes        | Yes | Yes                                           | Yes                  | Yes                                               |
| `mikro-orm` |        | [Yes](https://mikro-orm.io/docs/migrations) | Yes        | No  | [Yes](https://mikro-orm.io/docs/transactions) |                      | [Yes](https://mikro-orm.io/docs/schema-generator) |
| `knex`      |        |                                             |            |     |                                               |                      |                                                   |
| `type-orm`  |        |                                             | Yes        |     |                                               |                      |                                                   |
| `sequelize` |        |                                             |            |     |                                               |                      |                                                   |
| `mongoose`  |        |                                             |            |     |                                               |                      |                                                   |

|             | Raw Query | Sub Query | Cascading                                  | QueryBuilder                                    | Result Caching                            | Filter                                    | Logging                                  |
| ----------- | --------- | --------- | ------------------------------------------ | ----------------------------------------------- | ----------------------------------------- | ----------------------------------------- | ---------------------------------------- |
| `prisma`    | Yes       | Yes       |                                            |                                                 |                                           |                                           | -                                        |
| `mikro-orm` |           |           | [Yes](https://mikro-orm.io/docs/cascading) | [Yes](https://mikro-orm.io/docs/query-builder/) | [Yes](https://mikro-orm.io/docs/caching/) | [Yes](https://mikro-orm.io/docs/filters/) | [Yes](https://mikro-orm.io/docs/logging) |
| `knex`      |           |           |                                            |                                                 |                                           |                                           | -                                        |
| `type-orm`  |           |           |                                            |                                                 |                                           |                                           | -                                        |
| `sequelize` |           |           |                                            |                                                 |                                           |                                           | -                                        |
| `mongoose`  |           |           |                                            |                                                 |                                           |                                           | -                                        |

1. [`prisma`](https://github.com/prisma/prisma)

- [should-you-use-prisma](https://www.prisma.io/docs/concepts/overview/should-you-use-prisma)
- [TypeORM](https://www.prisma.io/docs/concepts/more/comparisons/prisma-and-typeorm)
- [Sequelize](https://www.prisma.io/docs/concepts/more/comparisons/prisma-and-sequelize)
- [Mongoose](https://www.prisma.io/docs/concepts/more/comparisons/prisma-and-mongoose)

# 数据库

## rxdb

> [rxdb](https://github.com/pubkey/rxdb): 🔄 A _client_ side, offline-first, reactive _database_ for JavaScript Applications.

# 字符处理

## 比较

### `leven`

比较两个字符串的不同

### `anymatch`

Matches strings against configurable strings, globs, regular expressions, and/or functions.

## 格式化

### `slug`

Slugifies even utf-8 chars!

### `github-slugger`

# 路径处理

## `normalize-path`

# 日期

## date-fns

# 文件系统
## `chokidar`

Minimal and efficient cross-platform file watching library.
## `fs-extra`

Such as recursive mkdir, copy, and remove.
## `readdirp`
## 遍历
### `walker`

A simple directory tree walker. Broadcasts events for various file types.
### `walk`

A node port of python's os.walk.
### `ignore-walk`

Walk a directory creating a list of entries, parsing any .ignore files met along the way to exclude files.
### `globby`

User-friendly glob matching.
### `find-up`

Find a file or directory by walking up parent directories.
## `hasha`

Get the hash of a buffer/string/stream/file.
## `lockfile`

A very polite lock file utility, which endeavors to not litter, and to wait patiently for others.
## `proper-lockfile`

An inter-process and inter-machine lockfile utility that works on a local or network file system.
## `adm-zip`

## `tar-fs`
## `temp-write`

Write string/buffer/stream to a random temp file.
## `tempy`

Get a random temporary file or directory path.

# Mock

## `mock-fs`

# 加密相关

## `crypto-random-string`

Generate a cryptographically strong random string

# 命令行

## `inquirer`

**`Inquirer.js`** provides the user interface and the inquiry session flow. If you're searching for a full blown command line program utility, then check out [commander](https://github.com/visionmedia/commander.js), [vorpal](https://github.com/dthree/vorpal) or [args](https://github.com/leo/args).

[Plugins](https://www.npmjs.com/package/inquirer#Plugins):

- [**autocomplete**](https://github.com/mokkabonna/inquirer-autocomplete-prompt)
Presents a list of options as the user types, compatible with other packages such as fuzzy (for search)
- [**checkbox-plus**](https://github.com/faressoft/inquirer-checkbox-plus-prompt)
Checkbox list with autocomplete and other additions
![checkbox-plus](https://github.com/faressoft/inquirer-checkbox-plus-prompt/raw/master/demo.gif)
- [**inquirer-date-prompt**](https://github.com/haversnail/inquirer-date-prompt)
Customizable date/time selector with localization support
![Date Prompt](https://github.com/haversnail/inquirer-date-prompt/raw/master/examples/demo.gif)
- [**inquirer-select-line**](https://github.com/adam-golab/inquirer-select-line)
Prompt for selecting index in array where add new element
![inquirer-select-line gif](https://camo.githubusercontent.com/4de5918c906a8b73d903ab481da343ddf2aac67422da4c88eb063049648acb77/68747470733a2f2f6d656469612e67697068792e636f6d2f6d656469612f7855413762314d78706e67646455766448572f67697068792e676966)
- [**inquirer-fuzzy-path**](https://github.com/adelsz/inquirer-fuzzy-path)
Prompt for fuzzy file/directory selection.
[![inquirer-fuzzy-path](https://raw.githubusercontent.com/adelsz/inquirer-fuzzy-path/master/recording.gif)](https://raw.githubusercontent.com/adelsz/inquirer-fuzzy-path/master/recording.gif)
- [**inquirer-emoji**](https://github.com/tannerntannern/inquirer-emoji)
Prompt for inputting emojis.
[![inquirer-emoji](https://github.com/tannerntannern/inquirer-emoji/raw/master/demo.gif)](https://github.com/tannerntannern/inquirer-emoji/raw/master/demo.gif)
- [**inquirer-chalk-pipe**](https://github.com/LitoMore/inquirer-chalk-pipe)
Prompt for input chalk-pipe style strings
- [**inquirer-file-tree-selection-prompt**](https://github.com/anc95/inquirer-file-tree-selection)
Inquirer prompt for to select a file or directory in file tree

[![inquirer-file-tree-selection-prompt](https://github.com/anc95/inquirer-file-tree-selection/raw/master/example/screenshot.gif)](https://github.com/anc95/inquirer-file-tree-selection/blob/master/example/screenshot.gif)

- [**inquirer-table-prompt**](https://github.com/eduardoboucas/inquirer-table-prompt)
A table-like prompt for Inquirer.

[![inquirer-table-prompt](https://raw.githubusercontent.com/eduardoboucas/inquirer-table-prompt/master/screen-capture.gif)](https://raw.githubusercontent.com/eduardoboucas/inquirer-table-prompt/master/screen-capture.gif)
- ...

## `enquirer`

**Stylish CLI prompts that are user-friendly, intuitive and easy to create.**

\>\_ Prompts should be more like conversations than inquisitions▌

(Example shows Enquirer's [Survey Prompt](https://www.npmjs.com/package/enquirer#survey-prompt)) ![Enquirer Survey Prompt](https://raw.githubusercontent.com/enquirer/enquirer/master/media/survey-prompt.gif)

- **Fast** - [Loads in ~4ms](https://www.npmjs.com/package/enquirer#-performance) (that's about _3-4 times faster than a [single frame of a HD movie](http://www.endmemo.com/sconvert/framespersecondframespermillisecond.php) at 60fps_)
- **Lightweight** - Only one dependency, the excellent [ansi-colors](https://github.com/doowb/ansi-colors) by [Brian Woodward](https://github.com/doowb).
- **Easy to implement** - Uses promises and async/await and sensible defaults to make prompts easy to create and implement.
- **Easy to use** - Thrill your users with a better experience! Navigating around input and choices is a breeze. You can even create [quizzes](https://github.com/enquirer/enquirer/blob/HEAD/examples/fun/countdown.js), or [record](https://github.com/enquirer/enquirer/blob/HEAD/examples/fun/record.js) and [playback](https://github.com/enquirer/enquirer/blob/HEAD/examples/fun/play.js) key bindings to aid with tutorials and videos.
- **Intuitive** - Keypress combos are available to simplify usage.
- **Flexible** - All prompts can be used standalone or chained together.
- **Stylish** - Easily override semantic styles and symbols for any part of the prompt.
- **Extensible** - Easily create and use custom prompts by extending Enquirer's built-in [prompts](https://www.npmjs.com/package/enquirer#-prompts).
- **Pluggable** - Add advanced features to Enquirer using plugins.
- **Validation** - Optionally validate user input with any prompt.
- **Well tested** - All prompts are well-tested, and tests are easy to create without having to use brittle, hacky solutions to spy on prompts or "inject" values.
- **Examples** - There are numerous [examples](https://github.com/enquirer/enquirer/blob/HEAD/examples) available to help you get started.

## `vorpal`

Conquer the command-line. [Vorpal](http://vorpal.js.org/) is Node's first framework for building interactive CLI applications. With a simple and powerful API, Vorpal opens the door to a new breed of rich, immersive CLI environments like [cash](https://github.com/dthree/cash) and [wat](https://github.com/dthree/wat).

## `commander`

## `sade`

Smooth (CLI) operator 🎶. It enables default commands, git-like subcommands, option flags with aliases, default option values with type-casting, required-vs-optional argument handling, command validation, and automated help text generation!

## `args`

Git-style sub commands. Auto-generated usage information. Determines type of option by checking type of default value (e.g. ['hi'] => <list>). Automatically suggests a similar option, if the user entered an unknown one

## `shellwords`

Manipulate strings according to the word parsing rules of the UNIX Bourne shell.

## spinner

#### `ora`: Elegant terminal spinner.

#### `listr`: Terminal task list.
# 幻灯片

## `slidev`

- 📝 [**Markdown-based**](https://sli.dev/guide/syntax.html) - use your favorite editors and workflow
- 🧑‍💻 [**Developer Friendly**](https://sli.dev/guide/syntax.html#code-blocks) - built-in syntax highlighting, live coding, etc.
- 🎨 [**Themable**](https://sli.dev/themes/gallery.html) - theme can be shared and used with npm packages.
- 🌈 [**Stylish**](https://sli.dev/guide/syntax.html#embedded-styles) - [Windi CSS](https://windicss.org/) on-demand utilities, easy-to-use embedded stylesheets.
- 🤹 [**Interactive**](https://sli.dev/custom/directory-structure.html#components) - embedding Vue components seamlessly.
- 🎙 [**Presenter Mode**](https://sli.dev/guide/presenter-mode.html) - use another window, or even your phone to control your slides.
- 🧮 [**LaTeX**](https://sli.dev/guide/syntax.html#latex) - built-in LaTeX math equations support.
- 📰 [**Diagrams**](https://sli.dev/guide/syntax.html#diagrams) - creates diagrams with textual descriptions
- 🌟 [**Icons**](https://sli.dev/guide/syntax.html#icons) - access to icons from any iconset directly.
- 💻 [**Editors**](https://sli.dev/guide/editors.html) - integrated editor, or [extension for VS Code](https://github.com/slidevjs/slidev-vscode)
- 🎥 [**Recording**](https://sli.dev/guide/recording.html) - built-in recording and camera view.
- 📤 [**Portable**](https://sli.dev/guide/exporting.html) - export into PDF, PNGs, or even a hostable SPA.
- ⚡️ [**Fast**](https://vitejs.dev/) - instant reloading powered by [Vite](https://vitejs.dev/).
- 🛠 [**Hackable**](https://sli.dev/custom/config-vite.html) - using Vite plugins, Vue components, or any npm packages.

## `reveal.js`

The framework comes with a broad range of features including [nested slides](https://revealjs.com/vertical-slides/), [Markdown support](https://revealjs.com/markdown/), [Auto-Animate](https://revealjs.com/auto-animate/), [PDF export](https://revealjs.com/pdf-export/), [speaker notes](https://revealjs.com/speaker-view/), [LaTeX support](https://revealjs.com/math/), [syntax highlighted code](https://revealjs.com/code/) and much more.

# 动画和模型

## `lottie`

> 跨平台的 *After Effects* 动画直接渲染方案！

[Lottie](http://airbnb.io/lottie/) is a library for *Android*, *iOS*, *Web*, and *Windows* that parses [Adobe After Effects](http://www.adobe.com/products/aftereffects.html) animations exported as json with [Bodymovin](https://github.com/airbnb/lottie-web) and renders them natively on mobile and on the web!

![http://airbnb.io/lottie/images/Introduction_00_sm.gif](http://airbnb.io/lottie/images/Introduction_00_sm.gif)

[Lottie - 轻松实现复杂的动画效果](https://juejin.cn/post/6844903661760413704)

## `model-viewer`

> 显示可交互的3d模型。

[model-viewer](https://modelviewer.dev/), Easily display interactive 3D models on the web & in AR.

<iframe height="300" src="https://model-viewer.glitch.me/" style="object-fit: contain"></iframe>

## `zdog`

> 用2d技术(*Canvas*,*SVG*的2D接口)实时渲染实现的伪3d引擎，适用于简单的插图风格3d展示。

[zdog](https://zzz.dog/), Round, flat, designer-friendly, pseudo-3D engine for canvas & SVG.
Zdog was designed to bring the simplicity of vector illustration into 3D. Drawing circles and squares is easy and fun. Zdog just adds another dimension.
<iframe height="300" style="width: 100%;" scrolling="no" title="Zdog - On the go" src="https://codepen.io/desandro/embed/RerqWW?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/desandro/pen/RerqWW">
  Zdog - On the go</a> by Dave DeSandro (<a href="https://codepen.io/desandro">@desandro</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## `gsap`

> 无依赖、可以操控Javascript可以操作的所有内容进行动画。

[GSAP](https://github.com/greensock/GSAP): *GreenSock Animation Platform*. Animate CSS, SVG, canvas, React, Vue, WebGL, colors, strings, motion paths, generic objects...anything JavaScript can touch!

## `dynamics.js`

> 创建逼真的物理动画。

[dynamics.js](http://dynamicsjs.com/)

<div style="display:flex;flex-wrap:wrap">
<iframe style="height:280px;" src="http://dynamicsjs.com/examples/syncing.html"></iframe>
<iframe style="height:280px;" src="http://dynamicsjs.com/examples/loader.html"></iframe>
<iframe style="height:280px;" src="http://dynamicsjs.com/examples/pin.html"></iframe>
<iframe style="height:280px;" src="http://dynamicsjs.com/examples/menu.html"></iframe>
</div>

# 模版渲染

## `HTM`

> 类 *JSX* 的纯Javascript模版，但无需转译！

`htm` is **JSX-like syntax in plain JavaScript** - no transpiler necessary.

![lakca's GitHub stats](https://github-readme-stats.vercel.app/api?username=lakca&show_icons=true)
![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=lakca&layout=compact)
![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=lakca&repo=scripts)

# 算法类

## `image-compare-viewer`

> Compare before and after images, for grading, CGI and other retouching comparisons. Vanilla Javascript.

<iframe src="https://image-compare-viewer.netlify.app/"/>
