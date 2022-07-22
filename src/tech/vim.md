---
title: Vim
date: 2020-10-09T07:22:16.283Z
---

# 快捷键

操作符（可单独使用，及被修饰使用）：

|                                |                                                                                    |
| ------------------------------ | ---------------------------------------------------------------------------------- |
| `d`                            | 开始剪切（组合其他命令使用，如`dd`,`d$`/`D`,`d0`）                                 |
| `y`                            | 开始复制（组合其他命令使用，如`yy`/`Y`,`y$`,`y0`）                                 |
| `x`                            | 删除当前文本u                                                                      |
| `X`                            | 删除上一个字符                                                                     |
| `p`, `P`                       | *paste*：粘贴于光标后、前                                                          |
| `u`                            | *undo*                                                                             |
| `ctrl+r`                       | *redo*                                                                             |
| `v`                            | *view*：开启选择模式                                                               |
| `V`                            | 开启行选择模式                                                                     |
| `ctrl+v`                       | 开启矩形选择模式                                                                   |
| 搜索                           |
| `/`                            | `/{pattern}[/[offset]]<CR>`前向（forward）搜索                                     |
| `?`                            | `?{pattern}[?[offset]]<CR>`后向（backward）搜索                                    |
| `n`, `N`                       | 重复、反向重复上次搜索                                                             |
| `*`, `#`                       | 前向、后向搜索当前光标处标识符（单词）                                             |
| `gd`, `gD`                     | 查找当前光标处标识符（类似变量）的本地、全局定义位置                               |
| 输入模式                       |
| `i`                            | 在当前光标前开启输入模式                                                           |
| `a`                            | 在当前光标后开启输入模式                                                           |
| `I`                            | 在当前行首（非空字符）开启输入模式                                                 |
| `A`                            | 在当前行尾（非空字符）开启输入模式                                                 |
| `o`                            | 下插一行，开启输入模式                                                             |
| `O`                            | 上插一行，开启输入模式                                                             |
| `s`                            | 删除当前文本（光标或选中区域），开启输入模式，相当于`xi`                           |
| `c`                            | 删除当前文本，开启输入模式                                                         |
| `cc`                           | 清空当前行，开启输入模式                                                           |
| `r`                            | 替换（用输入的字符逐个替换选中字符）                                               |
| 光标                           |                                                                                    |
| 光标标记                       |                                                                                    |
| `m{a-zA-Z}`                    | 在光标处设置标记                                                                   |
| `'{a-zA-Z}` 或 `` `{a-zA-Z} `` | 跳转到标记                                                                         |
| `'{a-zA-Z}` 或 `` `{a-zA-Z} `` | 跳转到标记                                                                         |
| `'[` 或 `` `[ ``               | 跳转到上次修改或粘贴的文本首字符                                                   |
| `']` 或 `` `] ``               | 跳转到上次修改或粘贴的文本尾字符                                                   |
| 光标位置-行                    |                                                                                    |
| `0`                            | 移动到行首                                                                         |
| `^`                            | 移动到行第一个非空字符                                                             |
| `$`                            | 移动到行尾                                                                         |
| `{count}G`                     | 移动到指定行                                                                       |
| `gg`                           | 移动到第一行                                                                       |
| `G`                            | 移动到最后一行                                                                     |
| `{count}%`                     | 按百分比移动到行                                                                   |
| `H`                            | *Home*：移动到可视区域的首行                                                       |
| `M`                            | *Middle*：移动到可视区域的中间行                                                   |
| `L`                            | *Last*：：移动到可视区域的尾行                                                     |
| 光标位置-词                    |
| `b`                            | 移动到单词首字符                                                                   |
| `e`                            | 移动到单词尾字符                                                                   |
| `w`                            | 移动到下个单词首字符                                                               |
| `W`                            | 移动到下个单词首字符，单词以空格界定                                               |
| 光标位置-字符                  |                                                                                    |
| `f{char}`                      | *find*：前向移动到第一次出现的该字符处                                             |
| `F{char}`                      | 后向移动到第一次出现的该字符处                                                     |
| `t{char}`                      | *to*：后向移动到第一次出现的该字符的前一个字符处                                   |
| `T{char}`                      | 后向移动到第一次出现的该字符的后一个字符处                                         |
| `;`                            | 重复`f`,`F`,`t`,`T`命令                                                            |
| `,`                            | 反向重复`f`,`F`,`t`,`T`命令，如`fx`变成`Fx`                                        |
| 块                             |                                                                                    |
| `%`                            | 移动到下一对括号或在括号对间跳转，默认有`{}`,`[]`,`()`，可通过`matchpairs`选项配置 |
| 其他                           |                                                                                    |
| `ctrl+g`                       | 显示当前光标位置信息                                                               |
| 视口                           |                                                                                    |
| `ctrl+y`                       | 向上滚动行                                                                         |
| `ctrl+e`                       | 向下滚动行                                                                         |
| `ctrl+b`                       | *backward*: 向上滚动页                                                             |
| `ctrl+f`                       | *forward*: 向下滚动页                                                              |
| `ctrl+u`                       | *up*: 向上滚动缓冲区，缓冲区大小可通过`scroll`选项配置                             |
| `ctrl+d`                       | *down*: 向下滚动缓冲区                                                             |
| `z<CR>`, `z.`, `z-`            | 滚动到光标行位于视口顶部、中间、底部位置，光标移至行首非空字符                     |
| `zt`, `zz`, `zb`               | 滚动到光标行位于视口顶部、中间、底部位置，保持光标列位置不变                       |
| `zh`/`z+left`, `zl`/`z+right`  | （开启了折行时）将视口文字：右向滚动、左向滚动；折行通过`wrap`选项配置             |
| `zH`, `zL`                     | （开启了折行时）将视口文字：右向滚动视口宽度一半、左向滚动视口宽度一半             |
| `zs`, `ze`                     | 以光标为开始、结束位置横向移动视口                                                 |
| `z{height}<CR>`                | 设置视口行数（无法超过窗口高度）                                                   |

操作对象（必须被操作符调用）：

|     |                                                                           |
| --- | ------------------------------------------------------------------------- |
| `i` | *inner*：Select "a"n object, without white space, or just the white space |
| `a` | *a*：Select "a"n object, including white space                            |

上述*操作符*均可以进行有意义地组合实现更复杂操作。比如：

- 量词修饰：比如，`2dd`（剪切当前行开始的2行）；`2w`（跳到当前单词下2个单词的首字符）；`2ctrl+y`（向上滚动两行）
- 命令组合：比如，`dw`（剪切当前光标到下个单词首字符前）；
- 多种组合：比如，`d2w`（剪切当前光标到下2个单词首字符前）；

| 组合操作 |                                                                       |
| `*iw*`   | do *inner word*：操作于光标处单词                                     |
| `*iW*`   | do *inner word, with word delimited by blank*，以空格作为单词界定符号 |
| `*aw*`   | do *a word*：操作于光标处单词及其周围的空格                           |
| `*2iw*`  | do *2 inner word*：操作于光标处单词开始2个单词                        |

## 常见操作：

|             |                                                                                        |                     |
| ----------- | -------------------------------------------------------------------------------------- | ------------------- |
| `0`         | 移动到行首                                                                             |                     |
| `^`         | 移动到行首个非空字符                                                                   |                     |
| `$`         | 移动到行尾                                                                             |                     |
| `{n}G`      | 移动到n行首个非空字符                                                                  |                     |
| ` `` `,`''` | 跳回上个标记的地方（[*mark*](http://vimdoc.sourceforge.net/htmldoc/motion.html#mark)） |                     |
|             |                                                                                        |                     |
| `cc`        | 清空当前行，开启输入模式                                                               |                     |
|             |                                                                                        |                     |
| `zz`        | 滚动视口使光标行居中                                                                   |                     |
|             |                                                                                        |                     |
| `*`, `#`    | 查找当前单词（backward，forward）                                                      |                     |
| `/`, `?`    | 开启正则表达式查找（backward，forward），使用`n`/`N`重复/反向重复上次查找              |                     |
|             |                                                                                        |                     |
| `o`, `O`    | 插入一行（below，above）                                                               |                     |
| `yy`, `dd`  | 复制、剪切当前行                                                                       |                     |
| `y0`, `y$`  | 复制（从光标开始）到行首、行尾（剪切同理）                                             |                     |
|             |                                                                                        |                     |
| `x`         | 删除字符                                                                               |                     |
| `X`         | 删除前一个字符                                                                         |                     |
| `diw`       | 删除单词                                                                               | *delete inner word* |
| `daw`       | 删除单词，包括其两边空格                                                               | *delete inner word* |

# 命令

## vim元信息

- vim启动的源文件列表：`:scriptnames/:scr`

## 编辑

`:edit <filename>`

## 获取配置项

`set <option>?`，如`set ruler?`

## 切换开关配置项

`set <option>!`，如`set ruler!`

## 设置鼠标操作

`set mouse`

- `n`：Normal mode and Terminal modes
- `v`：Visual mode
- `i`：Insert mode
- `c`：Command-line mode
- `h`：all previous modes when editing a help file
- `a`：all previous modes
- `r`：for |hit-enter| and |more-prompt| prompt

## 设置光标样式

`set guicursor/gcr`

- `n`：Normal mode
- `v`：Visual mode
- `ve`：Visual mode with 'selection' "exclusive" (same as 'v', if not specified)
- `o`：Operator-pending mode
- `i`：Insert mode
- `r`：Replace mode
- `c`：Command-line Normal (append) mode
- `ci`：Command-line Insert mode
- `cr`：Command-line Replace mode
- `sm`：showmatch in Insert mode
- `a`：all modes

值：

- `hor{N}`
- `ver{N}`
- `block`
- `blinkwait{N}`
- `blinkon{N}`
- `blinkoff{N}`
- `{group-name}`
- `{group-name}/{group-name}`

例如：

`n-c-v:block-nCursor`: in Normal, Command-line and Visual mode, use a block cursor with colors from the "nCursor" highlight group

## 光标位置

显示坐标：`set ruler`

显示坐标轴：`set cursorline/cul/nocursorline/nocul`，`set cursorcolumn/cuc/nocursorcolumn/nocuc`

## 标记

- 列出标记：`:marks`

## 文件编码

`set fileencoding=utf-8`

可以提供多个编码，vim会从左到右尝试每个编码直至成功或者为空：

`set fileencoding=utf-8,latin1`

## 文件行号

- 显示绝对行号：`set number` 或 `set nu`

- 隐藏绝对行号：`set nonumber` 或 `set nonu`

- 开关绝对行号：`set number!` 或 `set nu!`

- 显示相对（光标的）行号：`set relativenumber` 或 `set rnu`

- 隐藏相对（光标的）行号：`set norelativenumber` 或 `set nornu`

- 开关相对（光标的）行号：`set norelativenumber!` 或 `set rnu!`

## 折行

`set wrap`,`set nowrap`

## 语法高亮

开关语法高亮：`:sy/:syn/:syntax enable/on/off/manual`（`on`是以默认值开启，`enable`保留通过`:highlight`自定义的样式）

- 显示当前语言的语法项：`:sy`

- 显示当前高亮主题名称：`:colo/:colorscheme`

- 显示当前高亮主题定义：`:hi/:highlight {group-name}`

- 禁用主题中的高亮：`:hi {group-name} NONE`

- 配置主题：`:hi [default] {group-name} {key}={arg} ..`

## 查找

- `\c` 忽略大小写；`\C` 区分大小写；也可通过[搜索选项](#搜索选项)全局设置；

```vim
/[\c|\C]<pattern>
```

## 查找替换

- `m`, `n` 均为行数，`%` 表示最后一行；
- `g` 表示替换所有：

```vim
:[<m>,[<n>]]s/<pattern>/<replacement>[/g]
```

例如：

```vim
<!-- 替换当前行所有的foo -->
:s/foo/bar/g

:5s/foo/bar/g

<!-- 替换1-10行，每行只替换一次 -->
:1,10s/foo/bar
```

## 搜索选项

- 忽略大小写：`set ignorecase/ic`,`set noignorecase`

- 高亮匹配结果：`set hlsearch`, `set nohlsearch`

- 增量搜索（增量搜索时，会在输入搜索模式时实时匹配结果，配合开启高亮很实用）：`set incsearch`, `set noincsearch`

- 循环搜索（到达文件首尾继续搜索）：`set wrapscan`, `set nowrapscan`

# 文档

[VIM REFERENCE MANUAL](http://vimdoc.sourceforge.net/htmldoc/quickref.html)

[VIM USER MANUAL](http://vimdoc.sourceforge.net/htmldoc/usr_toc.html):

**Getting Started** Read this from start to end to learn the essential commands.

- [usr\_01.txt](http://vimdoc.sourceforge.net/htmldoc/usr_01.html) About the manuals
  - [01.1](http://vimdoc.sourceforge.net/htmldoc/usr_01.html#01.1) Two manuals
  - [01.2](http://vimdoc.sourceforge.net/htmldoc/usr_01.html#01.2) Vim installed
  - [01.3](http://vimdoc.sourceforge.net/htmldoc/usr_01.html#01.3) Using the Vim [tutor](http://vimdoc.sourceforge.net/htmldoc/usr_01.html#tutor)
  - [01.4](http://vimdoc.sourceforge.net/htmldoc/usr_01.html#01.4) Copyright
- [usr\_02.txt](http://vimdoc.sourceforge.net/htmldoc/usr_02.html) The first steps in Vim
  - [02.1](http://vimdoc.sourceforge.net/htmldoc/usr_02.html#02.1) Running Vim for the First Time
  - [02.2](http://vimdoc.sourceforge.net/htmldoc/usr_02.html#02.2) Inserting text
  - [02.3](http://vimdoc.sourceforge.net/htmldoc/usr_02.html#02.3) Moving around
  - [02.4](http://vimdoc.sourceforge.net/htmldoc/usr_02.html#02.4) Deleting characters
  - [02.5](http://vimdoc.sourceforge.net/htmldoc/usr_02.html#02.5) Undo and Redo
  - [02.6](http://vimdoc.sourceforge.net/htmldoc/usr_02.html#02.6) Other editing commands
  - [02.7](http://vimdoc.sourceforge.net/htmldoc/usr_02.html#02.7) Getting out
  - [02.8](http://vimdoc.sourceforge.net/htmldoc/usr_02.html#02.8) Finding help
- [usr\_03.txt](http://vimdoc.sourceforge.net/htmldoc/usr_03.html) Moving around
  - [03.1](http://vimdoc.sourceforge.net/htmldoc/usr_03.html#03.1) Word [movement](http://vimdoc.sourceforge.net/htmldoc/intro.html#movement)
  - [03.2](http://vimdoc.sourceforge.net/htmldoc/usr_03.html#03.2) Moving to the start or end of a line
  - [03.3](http://vimdoc.sourceforge.net/htmldoc/usr_03.html#03.3) Moving to a character
  - [03.4](http://vimdoc.sourceforge.net/htmldoc/usr_03.html#03.4) Matching a paren
  - [03.5](http://vimdoc.sourceforge.net/htmldoc/usr_03.html#03.5) Moving to a specific line
  - [03.6](http://vimdoc.sourceforge.net/htmldoc/usr_03.html#03.6) Telling where you are
  - [03.7](http://vimdoc.sourceforge.net/htmldoc/usr_03.html#03.7) Scrolling around
  - [03.8](http://vimdoc.sourceforge.net/htmldoc/usr_03.html#03.8) Simple searches
  - [03.9](http://vimdoc.sourceforge.net/htmldoc/usr_03.html#03.9) Simple search patterns
  - [03.10](http://vimdoc.sourceforge.net/htmldoc/usr_03.html#03.10) Using marks
- [usr\_04.txt](http://vimdoc.sourceforge.net/htmldoc/usr_04.html) Making small changes
  - [04.1](http://vimdoc.sourceforge.net/htmldoc/usr_04.html#04.1) Operators and motions
  - [04.2](http://vimdoc.sourceforge.net/htmldoc/usr_04.html#04.2) Changing text
  - [04.3](http://vimdoc.sourceforge.net/htmldoc/usr_04.html#04.3) Repeating a change
  - [04.4](http://vimdoc.sourceforge.net/htmldoc/usr_04.html#04.4) [Visual](http://vimdoc.sourceforge.net/htmldoc/visual.html#Visual) mode
  - [04.5](http://vimdoc.sourceforge.net/htmldoc/usr_04.html#04.5) Moving text
  - [04.6](http://vimdoc.sourceforge.net/htmldoc/usr_04.html#04.6) Copying text
  - [04.7](http://vimdoc.sourceforge.net/htmldoc/usr_04.html#04.7) Using the [clipboard](http://vimdoc.sourceforge.net/htmldoc/gui.html#clipboard)
  - [04.8](http://vimdoc.sourceforge.net/htmldoc/usr_04.html#04.8) Text [objects](http://vimdoc.sourceforge.net/htmldoc/index.html#objects)
  - [04.9](http://vimdoc.sourceforge.net/htmldoc/usr_04.html#04.9) [Replace](http://vimdoc.sourceforge.net/htmldoc/insert.html#Replace) mode
  - [04.10](http://vimdoc.sourceforge.net/htmldoc/usr_04.html#04.10) Conclusion
- [usr\_05.txt](http://vimdoc.sourceforge.net/htmldoc/usr_05.html) Set your settings
  - [05.1](http://vimdoc.sourceforge.net/htmldoc/usr_05.html#05.1) The [vimrc](http://vimdoc.sourceforge.net/htmldoc/starting.html#vimrc) file
  - [05.2](http://vimdoc.sourceforge.net/htmldoc/usr_05.html#05.2) The example [vimrc](http://vimdoc.sourceforge.net/htmldoc/starting.html#vimrc) file explained
  - [05.3](http://vimdoc.sourceforge.net/htmldoc/usr_05.html#05.3) Simple mappings
  - [05.4](http://vimdoc.sourceforge.net/htmldoc/usr_05.html#05.4) Adding a [plugin](http://vimdoc.sourceforge.net/htmldoc/usr_05.html#plugin)
  - [05.5](http://vimdoc.sourceforge.net/htmldoc/usr_05.html#05.5) Adding a help file
  - [05.6](http://vimdoc.sourceforge.net/htmldoc/usr_05.html#05.6) The option [window](http://vimdoc.sourceforge.net/htmldoc/windows.html#window)
  - [05.7](http://vimdoc.sourceforge.net/htmldoc/usr_05.html#05.7) Often used [options](http://vimdoc.sourceforge.net/htmldoc/options.html#options)
- [usr\_06.txt](http://vimdoc.sourceforge.net/htmldoc/usr_06.html) Using [syntax](http://vimdoc.sourceforge.net/htmldoc/syntax.html#syntax) highlighting
  - [06.1](http://vimdoc.sourceforge.net/htmldoc/usr_06.html#06.1) Switching it on
  - [06.2](http://vimdoc.sourceforge.net/htmldoc/usr_06.html#06.2) No or wrong colors?
  - [06.3](http://vimdoc.sourceforge.net/htmldoc/usr_06.html#06.3) Different colors
  - [06.4](http://vimdoc.sourceforge.net/htmldoc/usr_06.html#06.4) With colors or without colors
  - [06.5](http://vimdoc.sourceforge.net/htmldoc/usr_06.html#06.5) Printing with colors
  - [06.6](http://vimdoc.sourceforge.net/htmldoc/usr_06.html#06.6) Further reading
- [usr\_07.txt](http://vimdoc.sourceforge.net/htmldoc/usr_07.html) Editing more than one file
  - [07.1](http://vimdoc.sourceforge.net/htmldoc/usr_07.html#07.1) Edit another file
  - [07.2](http://vimdoc.sourceforge.net/htmldoc/usr_07.html#07.2) A list of files
  - [07.3](http://vimdoc.sourceforge.net/htmldoc/usr_07.html#07.3) Jumping from file to file
  - [07.4](http://vimdoc.sourceforge.net/htmldoc/usr_07.html#07.4) Backup files
  - [07.5](http://vimdoc.sourceforge.net/htmldoc/usr_07.html#07.5) Copy text between files
  - [07.6](http://vimdoc.sourceforge.net/htmldoc/usr_07.html#07.6) Viewing a file
  - [07.7](http://vimdoc.sourceforge.net/htmldoc/usr_07.html#07.7) Changing the file name
- [usr\_08.txt](http://vimdoc.sourceforge.net/htmldoc/usr_08.html) Splitting [windows](http://vimdoc.sourceforge.net/htmldoc/windows.html#windows)
  - [08.1](http://vimdoc.sourceforge.net/htmldoc/usr_08.html#08.1) Split a [window](http://vimdoc.sourceforge.net/htmldoc/windows.html#window)
  - [08.2](http://vimdoc.sourceforge.net/htmldoc/usr_08.html#08.2) Split a [window](http://vimdoc.sourceforge.net/htmldoc/windows.html#window) on another file
  - [08.3](http://vimdoc.sourceforge.net/htmldoc/usr_08.html#08.3) Window size
  - [08.4](http://vimdoc.sourceforge.net/htmldoc/usr_08.html#08.4) Vertical splits
  - [08.5](http://vimdoc.sourceforge.net/htmldoc/usr_08.html#08.5) Moving [windows](http://vimdoc.sourceforge.net/htmldoc/windows.html#windows)
  - [08.6](http://vimdoc.sourceforge.net/htmldoc/usr_08.html#08.6) Commands for all [windows](http://vimdoc.sourceforge.net/htmldoc/windows.html#windows)
  - [08.7](http://vimdoc.sourceforge.net/htmldoc/usr_08.html#08.7) Viewing differences with [vimdiff](http://vimdoc.sourceforge.net/htmldoc/diff.html#vimdiff)
  - [08.8](http://vimdoc.sourceforge.net/htmldoc/usr_08.html#08.8) Various
- [usr\_09.txt](http://vimdoc.sourceforge.net/htmldoc/usr_09.html) Using the [GUI](http://vimdoc.sourceforge.net/htmldoc/gui.html#GUI)
  - [09.1](http://vimdoc.sourceforge.net/htmldoc/usr_09.html#09.1) Parts of the [GUI](http://vimdoc.sourceforge.net/htmldoc/gui.html#GUI)
  - [09.2](http://vimdoc.sourceforge.net/htmldoc/usr_09.html#09.2) Using the mouse
  - [09.3](http://vimdoc.sourceforge.net/htmldoc/usr_09.html#09.3) The [clipboard](http://vimdoc.sourceforge.net/htmldoc/gui.html#clipboard)
  - [09.4](http://vimdoc.sourceforge.net/htmldoc/usr_09.html#09.4) [Select](http://vimdoc.sourceforge.net/htmldoc/visual.html#Select) mode
- [usr\_10.txt](http://vimdoc.sourceforge.net/htmldoc/usr_10.html) Making big changes
  - [10.1](http://vimdoc.sourceforge.net/htmldoc/usr_10.html#10.1) Record and playback commands
  - [10.2](http://vimdoc.sourceforge.net/htmldoc/usr_10.html#10.2) Substitution
  - [10.3](http://vimdoc.sourceforge.net/htmldoc/usr_10.html#10.3) Command ranges
  - [10.4](http://vimdoc.sourceforge.net/htmldoc/usr_10.html#10.4) The global command
  - [10.5](http://vimdoc.sourceforge.net/htmldoc/usr_10.html#10.5) [Visual](http://vimdoc.sourceforge.net/htmldoc/visual.html#Visual) block mode
  - [10.6](http://vimdoc.sourceforge.net/htmldoc/usr_10.html#10.6) Reading and [writing](http://vimdoc.sourceforge.net/htmldoc/editing.html#writing) part of a file
  - [10.7](http://vimdoc.sourceforge.net/htmldoc/usr_10.html#10.7) Formatting text
  - [10.8](http://vimdoc.sourceforge.net/htmldoc/usr_10.html#10.8) Changing [case](http://vimdoc.sourceforge.net/htmldoc/change.html#case)
  - [10.9](http://vimdoc.sourceforge.net/htmldoc/usr_10.html#10.9) Using an external program
- [usr\_11.txt](http://vimdoc.sourceforge.net/htmldoc/usr_11.html) Recovering from a crash
  - [11.1](http://vimdoc.sourceforge.net/htmldoc/usr_11.html#11.1) Basic [recovery](http://vimdoc.sourceforge.net/htmldoc/recover.html#recovery)
  - [11.2](http://vimdoc.sourceforge.net/htmldoc/usr_11.html#11.2) Where is the swap file?
  - [11.3](http://vimdoc.sourceforge.net/htmldoc/usr_11.html#11.3) Crashed or not?
  - [11.4](http://vimdoc.sourceforge.net/htmldoc/usr_11.html#11.4) Further reading
- [usr\_12.txt](http://vimdoc.sourceforge.net/htmldoc/usr_12.html) Clever tricks
  - [12.1](http://vimdoc.sourceforge.net/htmldoc/usr_12.html#12.1) [Replace](http://vimdoc.sourceforge.net/htmldoc/insert.html#Replace) a [word](http://vimdoc.sourceforge.net/htmldoc/motion.html#word)
  - [12.2](http://vimdoc.sourceforge.net/htmldoc/usr_12.html#12.2) Change "Last, First" to "First Last"
  - [12.3](http://vimdoc.sourceforge.net/htmldoc/usr_12.html#12.3) Sort a list
  - [12.4](http://vimdoc.sourceforge.net/htmldoc/usr_12.html#12.4) Reverse line order
  - [12.5](http://vimdoc.sourceforge.net/htmldoc/usr_12.html#12.5) Count words
  - [12.6](http://vimdoc.sourceforge.net/htmldoc/usr_12.html#12.6) Find a man page
  - [12.7](http://vimdoc.sourceforge.net/htmldoc/usr_12.html#12.7) Trim blanks
  - [12.8](http://vimdoc.sourceforge.net/htmldoc/usr_12.html#12.8) Find where a [word](http://vimdoc.sourceforge.net/htmldoc/motion.html#word) is used

**Editing Effectively** Subjects that can be read independently.

- [usr\_20.txt](http://vimdoc.sourceforge.net/htmldoc/usr_20.html) Typing command-line commands quickly
  - [20.1](http://vimdoc.sourceforge.net/htmldoc/usr_20.html#20.1) Command line editing
  - [20.2](http://vimdoc.sourceforge.net/htmldoc/usr_20.html#20.2) Command line [abbreviations](http://vimdoc.sourceforge.net/htmldoc/map.html#abbreviations)
  - [20.3](http://vimdoc.sourceforge.net/htmldoc/usr_20.html#20.3) Command line completion
  - [20.4](http://vimdoc.sourceforge.net/htmldoc/usr_20.html#20.4) Command line [history](http://vimdoc.sourceforge.net/htmldoc/cmdline.html#history)
  - [20.5](http://vimdoc.sourceforge.net/htmldoc/usr_20.html#20.5) Command line [window](http://vimdoc.sourceforge.net/htmldoc/windows.html#window)
- [usr\_21.txt](http://vimdoc.sourceforge.net/htmldoc/usr_21.html) Go away and come back
  - [21.1](http://vimdoc.sourceforge.net/htmldoc/usr_21.html#21.1) Suspend and resume
  - [21.2](http://vimdoc.sourceforge.net/htmldoc/usr_21.html#21.2) Executing shell commands
  - [21.3](http://vimdoc.sourceforge.net/htmldoc/usr_21.html#21.3) Remembering information; [viminfo](http://vimdoc.sourceforge.net/htmldoc/starting.html#viminfo)
  - [21.4](http://vimdoc.sourceforge.net/htmldoc/usr_21.html#21.4) Sessions
  - [21.5](http://vimdoc.sourceforge.net/htmldoc/usr_21.html#21.5) Views
  - [21.6](http://vimdoc.sourceforge.net/htmldoc/usr_21.html#21.6) Modelines
- [usr\_22.txt](http://vimdoc.sourceforge.net/htmldoc/usr_22.html) Finding the file to edit
  - [22.1](http://vimdoc.sourceforge.net/htmldoc/usr_22.html#22.1) The file explorer
  - [22.2](http://vimdoc.sourceforge.net/htmldoc/usr_22.html#22.2) The current directory
  - [22.3](http://vimdoc.sourceforge.net/htmldoc/usr_22.html#22.3) Finding a file
  - [22.4](http://vimdoc.sourceforge.net/htmldoc/usr_22.html#22.4) The buffer list
- [usr\_23.txt](http://vimdoc.sourceforge.net/htmldoc/usr_23.html) Editing other files
  - [23.1](http://vimdoc.sourceforge.net/htmldoc/usr_23.html#23.1) [DOS](http://vimdoc.sourceforge.net/htmldoc/os_dos.html#DOS), [Mac](http://vimdoc.sourceforge.net/htmldoc/os_mac.html#Mac) and [Unix](http://vimdoc.sourceforge.net/htmldoc/os_unix.html#Unix) files
  - [23.2](http://vimdoc.sourceforge.net/htmldoc/usr_23.html#23.2) Files on the [internet](http://vimdoc.sourceforge.net/htmldoc/intro.html#internet)
  - [23.3](http://vimdoc.sourceforge.net/htmldoc/usr_23.html#23.3) Encryption
  - [23.4](http://vimdoc.sourceforge.net/htmldoc/usr_23.html#23.4) Binary files
  - [23.5](http://vimdoc.sourceforge.net/htmldoc/usr_23.html#23.5) Compressed files
- [usr\_24.txt](http://vimdoc.sourceforge.net/htmldoc/usr_24.html) Inserting quickly
  - [24.1](http://vimdoc.sourceforge.net/htmldoc/usr_24.html#24.1) Making corrections
  - [24.2](http://vimdoc.sourceforge.net/htmldoc/usr_24.html#24.2) Showing matches
  - [24.3](http://vimdoc.sourceforge.net/htmldoc/usr_24.html#24.3) Completion
  - [24.4](http://vimdoc.sourceforge.net/htmldoc/usr_24.html#24.4) Repeating an insert
  - [24.5](http://vimdoc.sourceforge.net/htmldoc/usr_24.html#24.5) Copying from another line
  - [24.6](http://vimdoc.sourceforge.net/htmldoc/usr_24.html#24.6) Inserting a [register](http://vimdoc.sourceforge.net/htmldoc/sponsor.html#register)
  - [24.7](http://vimdoc.sourceforge.net/htmldoc/usr_24.html#24.7) [Abbreviations](http://vimdoc.sourceforge.net/htmldoc/map.html#Abbreviations)
  - [24.8](http://vimdoc.sourceforge.net/htmldoc/usr_24.html#24.8) Entering special characters
  - [24.9](http://vimdoc.sourceforge.net/htmldoc/usr_24.html#24.9) [Digraphs](http://vimdoc.sourceforge.net/htmldoc/digraph.html#Digraphs)
  - [24.10](http://vimdoc.sourceforge.net/htmldoc/usr_24.html#24.10) [Normal](http://vimdoc.sourceforge.net/htmldoc/intro.html#Normal) mode commands
- [usr\_25.txt](http://vimdoc.sourceforge.net/htmldoc/usr_25.html) Editing formatted text
  - [25.1](http://vimdoc.sourceforge.net/htmldoc/usr_25.html#25.1) Breaking lines
  - [25.2](http://vimdoc.sourceforge.net/htmldoc/usr_25.html#25.2) Aligning text
  - [25.3](http://vimdoc.sourceforge.net/htmldoc/usr_25.html#25.3) Indents and tabs
  - [25.4](http://vimdoc.sourceforge.net/htmldoc/usr_25.html#25.4) Dealing with long lines
  - [25.5](http://vimdoc.sourceforge.net/htmldoc/usr_25.html#25.5) Editing tables
- [usr\_26.txt](http://vimdoc.sourceforge.net/htmldoc/usr_26.html) Repeating
  - [26.1](http://vimdoc.sourceforge.net/htmldoc/usr_26.html#26.1) Repeating with [Visual](http://vimdoc.sourceforge.net/htmldoc/visual.html#Visual) mode
  - [26.2](http://vimdoc.sourceforge.net/htmldoc/usr_26.html#26.2) Add and subtract
  - [26.3](http://vimdoc.sourceforge.net/htmldoc/usr_26.html#26.3) Making a change in many files
  - [26.4](http://vimdoc.sourceforge.net/htmldoc/usr_26.html#26.4) Using Vim from a shell [script](http://vimdoc.sourceforge.net/htmldoc/usr_41.html#script)
- [usr\_27.txt](http://vimdoc.sourceforge.net/htmldoc/usr_27.html) Search commands and patterns
  - [27.1](http://vimdoc.sourceforge.net/htmldoc/usr_27.html#27.1) Ignoring [case](http://vimdoc.sourceforge.net/htmldoc/change.html#case)
  - [27.2](http://vimdoc.sourceforge.net/htmldoc/usr_27.html#27.2) Wrapping around the file end
  - [27.3](http://vimdoc.sourceforge.net/htmldoc/usr_27.html#27.3) Offsets
  - [27.4](http://vimdoc.sourceforge.net/htmldoc/usr_27.html#27.4) Matching multiple times
  - [27.5](http://vimdoc.sourceforge.net/htmldoc/usr_27.html#27.5) Alternatives
  - [27.6](http://vimdoc.sourceforge.net/htmldoc/usr_27.html#27.6) Character ranges
  - [27.7](http://vimdoc.sourceforge.net/htmldoc/usr_27.html#27.7) Character classes
  - [27.8](http://vimdoc.sourceforge.net/htmldoc/usr_27.html#27.8) Matching a line break
  - [27.9](http://vimdoc.sourceforge.net/htmldoc/usr_27.html#27.9) Examples
- [usr\_28.txt](http://vimdoc.sourceforge.net/htmldoc/usr_28.html) [Folding](http://vimdoc.sourceforge.net/htmldoc/fold.html#Folding)
  - [28.1](http://vimdoc.sourceforge.net/htmldoc/usr_28.html#28.1) What is [folding](http://vimdoc.sourceforge.net/htmldoc/fold.html#folding)?
  - [28.2](http://vimdoc.sourceforge.net/htmldoc/usr_28.html#28.2) Manual [folding](http://vimdoc.sourceforge.net/htmldoc/fold.html#folding)
  - [28.3](http://vimdoc.sourceforge.net/htmldoc/usr_28.html#28.3) Working with [folds](http://vimdoc.sourceforge.net/htmldoc/fold.html#folds)
  - [28.4](http://vimdoc.sourceforge.net/htmldoc/usr_28.html#28.4) Saving and restoring [folds](http://vimdoc.sourceforge.net/htmldoc/fold.html#folds)
  - [28.5](http://vimdoc.sourceforge.net/htmldoc/usr_28.html#28.5) [Folding](http://vimdoc.sourceforge.net/htmldoc/fold.html#Folding) by indent
  - [28.6](http://vimdoc.sourceforge.net/htmldoc/usr_28.html#28.6) [Folding](http://vimdoc.sourceforge.net/htmldoc/fold.html#Folding) with markers
  - [28.7](http://vimdoc.sourceforge.net/htmldoc/usr_28.html#28.7) [Folding](http://vimdoc.sourceforge.net/htmldoc/fold.html#Folding) by [syntax](http://vimdoc.sourceforge.net/htmldoc/syntax.html#syntax)
  - [28.8](http://vimdoc.sourceforge.net/htmldoc/usr_28.html#28.8) [Folding](http://vimdoc.sourceforge.net/htmldoc/fold.html#Folding) by [expression](http://vimdoc.sourceforge.net/htmldoc/eval.html#expression)
  - [28.9](http://vimdoc.sourceforge.net/htmldoc/usr_28.html#28.9) [Folding](http://vimdoc.sourceforge.net/htmldoc/fold.html#Folding) unchanged lines
  - [28.10](http://vimdoc.sourceforge.net/htmldoc/usr_28.html#28.10) Which fold method to use?
- [usr\_29.txt](http://vimdoc.sourceforge.net/htmldoc/usr_29.html) Moving through programs
  - [29.1](http://vimdoc.sourceforge.net/htmldoc/usr_29.html#29.1) Using [tags](http://vimdoc.sourceforge.net/htmldoc/tagsrch.html#tags)
  - [29.2](http://vimdoc.sourceforge.net/htmldoc/usr_29.html#29.2) The preview [window](http://vimdoc.sourceforge.net/htmldoc/windows.html#window)
  - [29.3](http://vimdoc.sourceforge.net/htmldoc/usr_29.html#29.3) Moving through a program
  - [29.4](http://vimdoc.sourceforge.net/htmldoc/usr_29.html#29.4) Finding global identifiers
  - [29.5](http://vimdoc.sourceforge.net/htmldoc/usr_29.html#29.5) Finding local identifiers
- [usr\_30.txt](http://vimdoc.sourceforge.net/htmldoc/usr_30.html) Editing programs
  - [30.1](http://vimdoc.sourceforge.net/htmldoc/usr_30.html#30.1) Compiling
  - [30.2](http://vimdoc.sourceforge.net/htmldoc/usr_30.html#30.2) Indenting C files
  - [30.3](http://vimdoc.sourceforge.net/htmldoc/usr_30.html#30.3) Automatic indenting
  - [30.4](http://vimdoc.sourceforge.net/htmldoc/usr_30.html#30.4) Other indenting
  - [30.5](http://vimdoc.sourceforge.net/htmldoc/usr_30.html#30.5) Tabs and spaces
  - [30.6](http://vimdoc.sourceforge.net/htmldoc/usr_30.html#30.6) Formatting comments
- [usr\_31.txt](http://vimdoc.sourceforge.net/htmldoc/usr_31.html) Exploiting the [GUI](http://vimdoc.sourceforge.net/htmldoc/gui.html#GUI)
  - [31.1](http://vimdoc.sourceforge.net/htmldoc/usr_31.html#31.1) The file browser
  - [31.2](http://vimdoc.sourceforge.net/htmldoc/usr_31.html#31.2) Confirmation
  - [31.3](http://vimdoc.sourceforge.net/htmldoc/usr_31.html#31.3) Menu shortcuts
  - [31.4](http://vimdoc.sourceforge.net/htmldoc/usr_31.html#31.4) Vim [window](http://vimdoc.sourceforge.net/htmldoc/windows.html#window) position and size
  - [31.5](http://vimdoc.sourceforge.net/htmldoc/usr_31.html#31.5) Various
- [usr\_32.txt](http://vimdoc.sourceforge.net/htmldoc/usr_32.html) The [undo](http://vimdoc.sourceforge.net/htmldoc/undo.html#undo) tree
  - [32.1](http://vimdoc.sourceforge.net/htmldoc/usr_32.html#32.1) Undo up to a file write
  - [32.2](http://vimdoc.sourceforge.net/htmldoc/usr_32.html#32.2) Numbering changes
  - [32.3](http://vimdoc.sourceforge.net/htmldoc/usr_32.html#32.3) Jumping around the tree
  - [32.4](http://vimdoc.sourceforge.net/htmldoc/usr_32.html#32.4) Time travelling

**Tuning Vim** Make Vim work [as](http://vimdoc.sourceforge.net/htmldoc/motion.html#as) you like it.

- [usr\_40.txt](http://vimdoc.sourceforge.net/htmldoc/usr_40.html) Make new commands
  - [40.1](http://vimdoc.sourceforge.net/htmldoc/usr_40.html#40.1) Key [mapping](http://vimdoc.sourceforge.net/htmldoc/map.html#mapping)
  - [40.2](http://vimdoc.sourceforge.net/htmldoc/usr_40.html#40.2) Defining command-line commands
  - [40.3](http://vimdoc.sourceforge.net/htmldoc/usr_40.html#40.3) Autocommands
- [usr\_41.txt](http://vimdoc.sourceforge.net/htmldoc/usr_41.html) Write a Vim [script](http://vimdoc.sourceforge.net/htmldoc/usr_41.html#script)
  - [41.1](http://vimdoc.sourceforge.net/htmldoc/usr_41.html#41.1) Introduction
  - [41.2](http://vimdoc.sourceforge.net/htmldoc/usr_41.html#41.2) Variables
  - [41.3](http://vimdoc.sourceforge.net/htmldoc/usr_41.html#41.3) Expressions
  - [41.4](http://vimdoc.sourceforge.net/htmldoc/usr_41.html#41.4) Conditionals
  - [41.5](http://vimdoc.sourceforge.net/htmldoc/usr_41.html#41.5) Executing an [expression](http://vimdoc.sourceforge.net/htmldoc/eval.html#expression)
  - [41.6](http://vimdoc.sourceforge.net/htmldoc/usr_41.html#41.6) Using [functions](http://vimdoc.sourceforge.net/htmldoc/eval.html#functions)
  - [41.7](http://vimdoc.sourceforge.net/htmldoc/usr_41.html#41.7) Defining a function
  - [41.8](http://vimdoc.sourceforge.net/htmldoc/usr_41.html#41.8) [Lists](http://vimdoc.sourceforge.net/htmldoc/eval.html#Lists) and [Dictionaries](http://vimdoc.sourceforge.net/htmldoc/eval.html#Dictionaries)
  - [41.9](http://vimdoc.sourceforge.net/htmldoc/usr_41.html#41.9) Exceptions
  - [41.10](http://vimdoc.sourceforge.net/htmldoc/usr_41.html#41.10) Various remarks
  - [41.11](http://vimdoc.sourceforge.net/htmldoc/usr_41.html#41.11) Writing a [plugin](http://vimdoc.sourceforge.net/htmldoc/usr_05.html#plugin)
  - [41.12](http://vimdoc.sourceforge.net/htmldoc/usr_41.html#41.12) Writing a [filetype](http://vimdoc.sourceforge.net/htmldoc/filetype.html#filetype) [plugin](http://vimdoc.sourceforge.net/htmldoc/usr_05.html#plugin)
  - [41.13](http://vimdoc.sourceforge.net/htmldoc/usr_41.html#41.13) Writing a compiler [plugin](http://vimdoc.sourceforge.net/htmldoc/usr_05.html#plugin)
  - [41.14](http://vimdoc.sourceforge.net/htmldoc/usr_41.html#41.14) Writing a [plugin](http://vimdoc.sourceforge.net/htmldoc/usr_05.html#plugin) that loads quickly
  - [41.15](http://vimdoc.sourceforge.net/htmldoc/usr_41.html#41.15) Writing library scripts
  - [41.16](http://vimdoc.sourceforge.net/htmldoc/usr_41.html#41.16) Distributing Vim scripts
- [usr\_42.txt](http://vimdoc.sourceforge.net/htmldoc/usr_42.html) Add new [menus](http://vimdoc.sourceforge.net/htmldoc/gui.html#menus)
  - [42.1](http://vimdoc.sourceforge.net/htmldoc/usr_42.html#42.1) Introduction
  - [42.2](http://vimdoc.sourceforge.net/htmldoc/usr_42.html#42.2) Menu commands
  - [42.3](http://vimdoc.sourceforge.net/htmldoc/usr_42.html#42.3) Various
  - [42.4](http://vimdoc.sourceforge.net/htmldoc/usr_42.html#42.4) Toolbar and popup [menus](http://vimdoc.sourceforge.net/htmldoc/gui.html#menus)
- [usr\_43.txt](http://vimdoc.sourceforge.net/htmldoc/usr_43.html) Using [filetypes](http://vimdoc.sourceforge.net/htmldoc/filetype.html#filetypes)
  - [43.1](http://vimdoc.sourceforge.net/htmldoc/usr_43.html#43.1) Plugins for a [filetype](http://vimdoc.sourceforge.net/htmldoc/filetype.html#filetype)
  - [43.2](http://vimdoc.sourceforge.net/htmldoc/usr_43.html#43.2) Adding a [filetype](http://vimdoc.sourceforge.net/htmldoc/filetype.html#filetype)
- [usr\_44.txt](http://vimdoc.sourceforge.net/htmldoc/usr_44.html) Your own [syntax](http://vimdoc.sourceforge.net/htmldoc/syntax.html#syntax) highlighted
  - [44.1](http://vimdoc.sourceforge.net/htmldoc/usr_44.html#44.1) Basic [syntax](http://vimdoc.sourceforge.net/htmldoc/syntax.html#syntax) commands
  - [44.2](http://vimdoc.sourceforge.net/htmldoc/usr_44.html#44.2) Keywords
  - [44.3](http://vimdoc.sourceforge.net/htmldoc/usr_44.html#44.3) Matches
  - [44.4](http://vimdoc.sourceforge.net/htmldoc/usr_44.html#44.4) Regions
  - [44.5](http://vimdoc.sourceforge.net/htmldoc/usr_44.html#44.5) Nested items
  - [44.6](http://vimdoc.sourceforge.net/htmldoc/usr_44.html#44.6) Following groups
  - [44.7](http://vimdoc.sourceforge.net/htmldoc/usr_44.html#44.7) Other arguments
  - [44.8](http://vimdoc.sourceforge.net/htmldoc/usr_44.html#44.8) Clusters
  - [44.9](http://vimdoc.sourceforge.net/htmldoc/usr_44.html#44.9) Including another [syntax](http://vimdoc.sourceforge.net/htmldoc/syntax.html#syntax) file
  - [44.10](http://vimdoc.sourceforge.net/htmldoc/usr_44.html#44.10) Synchronizing
  - [44.11](http://vimdoc.sourceforge.net/htmldoc/usr_44.html#44.11) Installing a [syntax](http://vimdoc.sourceforge.net/htmldoc/syntax.html#syntax) file
  - [44.12](http://vimdoc.sourceforge.net/htmldoc/usr_44.html#44.12) Portable [syntax](http://vimdoc.sourceforge.net/htmldoc/syntax.html#syntax) file layout
- [usr\_45.txt](http://vimdoc.sourceforge.net/htmldoc/usr_45.html) [Select](http://vimdoc.sourceforge.net/htmldoc/visual.html#Select) your language
  - [45.1](http://vimdoc.sourceforge.net/htmldoc/usr_45.html#45.1) Language for Messages
  - [45.2](http://vimdoc.sourceforge.net/htmldoc/usr_45.html#45.2) Language for Menus
  - [45.3](http://vimdoc.sourceforge.net/htmldoc/usr_45.html#45.3) Using another encoding
  - [45.4](http://vimdoc.sourceforge.net/htmldoc/usr_45.html#45.4) Editing files with a different encoding
  - [45.5](http://vimdoc.sourceforge.net/htmldoc/usr_45.html#45.5) Entering language text

 **Making Vim Run** Before you can use Vim.
- [usr\_90.txt](http://vimdoc.sourceforge.net/htmldoc/usr_90.html) Installing Vim
  - [90.1](http://vimdoc.sourceforge.net/htmldoc/usr_90.html#90.1) [Unix](http://vimdoc.sourceforge.net/htmldoc/os_unix.html#Unix)
  - [90.2](http://vimdoc.sourceforge.net/htmldoc/usr_90.html#90.2) [MS-Windows](http://vimdoc.sourceforge.net/htmldoc/os_win32.html#MS-Windows)
  - [90.3](http://vimdoc.sourceforge.net/htmldoc/usr_90.html#90.3) Upgrading
  - [90.4](http://vimdoc.sourceforge.net/htmldoc/usr_90.html#90.4) Common installation issues
  - [90.5](http://vimdoc.sourceforge.net/htmldoc/usr_90.html#90.5) Uninstalling Vim
