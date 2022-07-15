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
| `r`                            | 替换（用输入的字符逐个替换选中字符）                                               |
| `cc`                           | 清空当前行，开启输入模式                                                           |
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

文档：

- [Vim QuickRef](http://vimdoc.sourceforge.net/htmldoc/quickref.html)
  - [Vim Options](https://vimdoc.sourceforge.net/htmldoc/quickref.html#option-list)
  - [Vim Search](https://vimdoc.sourceforge.net/htmldoc/quickref.html#Q_pa)
  - [Vim Cursor Motions](http://vimdoc.sourceforge.net/htmldoc/motion.html)
- [Vim User Manual](http://vimdoc.sourceforge.net/htmldoc/usr_toc.html)
- [Vim Help](http://vimdoc.sourceforge.net/htmldoc/help.html)
- [About the manuals](http://vimdoc.sourceforge.net/htmldoc/usr_01.html)
- [The first steps in Vim](http://vimdoc.sourceforge.net/htmldoc/usr_02.html)
- **[Moving around](http://vimdoc.sourceforge.net/htmldoc/usr_03.html)**
  - [Word movement](http://vimdoc.sourceforge.net/htmldoc/usr_03.html#03.1)
  - [Moving to the start or end of a line](http://vimdoc.sourceforge.net/htmldoc/usr_03.html#03.2)
  - [Moving to a character](http://vimdoc.sourceforge.net/htmldoc/usr_03.html#03.3)
  - [Matching a parenthesis](http://vimdoc.sourceforge.net/htmldoc/usr_03.html#03.4)
  - [Moving to a specific line](http://vimdoc.sourceforge.net/htmldoc/usr_03.html#03.5)
  - [Telling where you are](http://vimdoc.sourceforge.net/htmldoc/usr_03.html#03.6)
  - [Scrolling around](http://vimdoc.sourceforge.net/htmldoc/usr_03.html#03.7)
  - [Simple searches](http://vimdoc.sourceforge.net/htmldoc/usr_03.html#03.8)
  - [Simple search patterns](http://vimdoc.sourceforge.net/htmldoc/usr_03.html#03.9)
  - [Using marks](http://vimdoc.sourceforge.net/htmldoc/usr_03.html#03.10)
- **[Making small changes](http://vimdoc.sourceforge.net/htmldoc/usr_04.html)**
- **[Set your settings](http://vimdoc.sourceforge.net/htmldoc/usr_05.html)**
- **[Using syntax highlighting](http://vimdoc.sourceforge.net/htmldoc/usr_06.html)**
- [Editing more than one file](http://vimdoc.sourceforge.net/htmldoc/usr_07.html)
- **[Splitting windows](http://vimdoc.sourceforge.net/htmldoc/usr_08.html)**
- [Using the GUI](http://vimdoc.sourceforge.net/htmldoc/usr_09.html)
- **[Making big changes](http://vimdoc.sourceforge.net/htmldoc/usr_10.html)**
- [Recovering from a crash](http://vimdoc.sourceforge.net/htmldoc/usr_11.html)
- [Clever tricks](http://vimdoc.sourceforge.net/htmldoc/usr_12.html)

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

## 搜索选项

- 忽略大小写：`set ignorecase/ic`,`set noignorecase`

- 高亮匹配结果：`set hlsearch`, `set nohlsearch`

- 增量搜索（增量搜索时，会在输入搜索模式时实时匹配结果，配合开启高亮很实用）：`set incsearch`, `set noincsearch`

- 循环搜索（到达文件首尾继续搜索）：`set wrapscan`, `set nowrapscan`
