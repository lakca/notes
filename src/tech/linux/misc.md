---
title: Misc 
date: 2020-09-16T03:04:17.021Z
---

# 变量

## 数组

在 *bash* 中，数组下标以 `0` 开始，在 *zsh* 中，则以 `1` 开始。数组切片语法 `${arr:offset:len}` ，两者则表现一致。另外，*zsh* 支持反向（负数）索引，如 `${arr[-1]}`。

```bash
arr=()
arr+=(1 2 3)
```

## 特殊参数

### `$1`-第一个变量

> 类似还有第二个 `$2`、第三个 `$3` ...等等变量

### `$#`-变量数量

### `$*`-以单字符串表示所有变量

> 详见 `$@`

### `$@`-以独立字符串表示所有变量

```bash
function demo() {
  # good:
  demo2 "$@" # empty string also included
  demo2 "$*" # whole as a parameter
  # bad:
  demo2 $@ # empty string is ignored
  demo2 $* # empty string is ignored
}
function demo2() {
  echo $#
}
demo 1 2 ' ' ''
# 4
# 1
# 3
# 3
```

### `$$`-当前脚本进程号

### `$!`-后台运行的最后一个进程号

### `$-`-Shell使用的当前选项

> 与`set`命令功能相同

### `$?`-最后的命令推出状态

> `0`为正常，其他表示有错误

## 动态变量

### `${!}`-通过变量获取变量

```bash
ver='v1.0'
var='ver'
# bash:
echo ${!var}
# zsh:
echo ${(P)var}
```

### `$OPTIND`-当前变量索引

```bash
arg1=$1
arg2=$2
arg1and2=${@:1:2}
arg1=${!OPTIND}
shift
arg2=${!OPTIND}
```

### `declare`

```bash
foo='bar'
declare $foo='Emma Delgado'
echo $bar
```

### `eval`

```bash
foo='bar'
eval $foo='天塌下来你先顶着，我去找根棍子。'
echo $bar
```

### `read`

```bash
foo='bar'
read -r -d '' $foo <<< 'Estelle Estrada'
echo "$bar"
```

## 操作

[Parameter Substitution](https://tldp.org/LDP/abs/html/parameter-substitution.html)
[Manipulate String](https://tldp.org/LDP/abs/html/string-manipulation.html)

### `${}`

> `${parameter}` 与  `$parameter` 相同，在某些情况下可以避免引号嵌套的烦恼。

```bash
a=hello
b=world
c=${a}-${b}
c2="$a-$b"
```

### `${:-}`,`${-}`-使用变量默认值

> `${:-}`（非严格判断），当变量为空（包括空字符串`''`）时，返回右侧值。
> `${-}`（严格判断），当变量未声明时，返回右侧值。

```bash
function greet() {
  echo ${1:-hello}, everyone
  echo ${1-hello}, everyone
}
greet
# hello, everyone
# hello, everyone
greet hi
# hi, everyone
# hi, everyone
greet ''
# hello, everyone
# , everyone
```

### `${:=}`,`{=}`-给变量赋予默认值

> 与 `${:-}`（非严格判断）， 和 `${-}`（严格判断），不同的是，操作符左侧的变量会被赋值。

```bash
a=''
${a:=hello}
echo $a
# hello
${b=hello}
echo $b
# hello
a=''
${a=hello}
echo $a
# ''
```

### `${:+}`,`${+}`-替代变量值

> 与 `${:-}`（非严格判断）， 和 `{-}`（严格判断）作用相对：如果变量被设置了值，则使用替换值。

```bash
function greet() {
  echo ${1:+hello}, everyone
  echo ${1+hello}, everyone
}
greet
# , everyone
# , everyone
greet hi
# hello, everyone
# hello, everyone
greet ''
# , everyone
# hello, everyone
```

### `${?}`,`${:?}`-变量断言

> 如果变量不存在则使用操作符右侧信息报错。
> 注意，两者的区别与前几个表现相反：`${?}` 是严格判断，`${:?}`是非严格判断。

```bash
foo=''
bar=${foo:?foo required} # exit 1 with 'parameter required'
```
```bash
foo=''
bar=${foo?foo required} # exit 0
```
```bash
bar=${foo:?foo required} # exit 1 with 'parameter required'
```
```bash
bar=${foo?foo required} # exit 1 with 'parameter required'
```

### `${:}`,`${::}`-切割变量

```bash
function demo() {
  echo "${@:1:1}"
  echo "${@:1:2}"
  echo "${@:1}"
}
demo 1 2 3
# 1
# 1 2
# 1 2 3
```

# 环境变量

## Bash

### 进程

#### `$$`

### `$PID`

### `$PPID`

### `$BASHPID`

### `$BASH_SUBSHELL`-当前 *sub-shell* 的嵌套数量

> 通过 `()` (分组), `|` (管道), `&` (异步), 命令替换 (`alias`) 等隐式生成的 *shell execution environment* 为 *sub-shell*。新的执行环境（函数、变量、别名等等）完全复制 (*fork*) 了父shell的执行环境（或者在进入sub-shell前保存shell状态，在sub-shell退出后恢复shell状态）。

```bash
echo $BASH_SUBSHELL # 0
(echo $BASH_SUBSHELL) # 1
( (echo $BASH_SUBSHELL) ) # 2
```

### `$SHLVL`-当前 *child-shell* 的嵌套数量

> 通过 *运行可执行文件或者显式调用shell解释器* 等生成的 *shell execution environment* 为 *child-shell*，即子进程。

```bash
echo $$, $SHLVL, $BASH_SUBSHELL
# 68237, 1, 0
bash -c 'echo $$, $PPID, $SHLVL, $BASH_SUBSHELL; (echo $$, $PPID, $SHLVL, $BASH_SUBSHELL)'
# 68980, 68237, 2, 0
# 68980, 68237, 2, 1
(echo $$, $SHLVL, $BASH_SUBSHELL)
# 68237, 1, 1
```

## ZSH

### `$ZSHPID`

# 转义（Quoting）

## 强制解释

> 通过在字符串前添加`$`符号，可以使某些程序转义字符串中特殊字符。

例如：

```bash
read -p $'\033[31mhello world!\033[0m'
```

## 常见ASCII转义序列

| 码点 | C转义 | Ctrl |                   |
| -    | -     | -    | -                 |
| 0    |       |      | 空字符（NUL）     |
| 7    | `\a`  | `^G` | 响铃（BEL）       |
| 8    | `\b`  | `^H` | 退格（BS）        |
| 9    | `\t`  | `^I` | 水平制表符（HT）  |
| 10   | `\n`  | `^J` | 换行（LF）        |
| 11   | `\v`  | `^K` | 垂直制表符（VT）  |
| 12   | `\f`  | `^L` | 换页（FF）        |
| 13   | `\r`  | `^M` | 回车（CR）        |
| 27   | `\e`  | `^[` | 换码、转义（ESC） |
| 28   |       |      | 文件分割符（FS）  |
| 29   |       |      | 分组符（GS）      |
| 30   |       |      | 记录分割符（RS）  |
| 31   |       |      | 单元分隔符（US）  |
| 127  |       |      | 删除（DEL）       |

### 控制序列导入器（CSI）

> 即*Control Sequence Introducer* (*CSI*), 以 `ESC[` （ESC的ASCII码为27, 等价于`\033[`, `\0x1b[`, `\e[`, `^[`）开头的ANSI转义序列，可以实现光标移动、清屏、字符渲染、终端控制等。

|                                                |                                         |
| -                                              | -                                       |
| 光标                                           |                                         |
| `ESC[H`                                        | 将光标移动到起始位置 (0, 0)             |
| `ESC[{line};{column}H,` `ESC[{line};{column}f` | 将光标移动到第 {line} 行,第 {column} 列 |
| `ESC[#A`                                       | 将光标向上移动 # 行                     |
| `ESC[#B`                                       | 将光标向下移动 # 行                     |
| `ESC[#C`                                       | 向右移动光标 # 列                       |
| `ESC[#D`                                       | 向左移动光标 # 列                       |
| `ESC[#E`                                       | 将光标移动到下一行的开头,向下 # 行      |
| `ESC[#F`                                       | 将光标移动到上一行的开头, # 行向上      |
| `ESC[#G`                                       | 将光标移动到列 #                        |
| `ESC[6n`                                       | 请求光标位置(报告为 `ESC[#;#R` )        |
| `ESCM`                                         | 将光标向上移动一行,如果需要滚动         |
| `ESC7`                                         | 保存光标位置 (DEC)                      |
| `ESC8`                                         | 将光标恢复到上次保存的位置 (DEC)        |
| `ESC[s`                                        | 保存光标位置 (SCO)                      |
| `ESC[u`                                        | 将光标恢复到上次保存的位置 (SCO)        |
| 擦除                                           |                                         |
| `ESC[J`                                        | 在显示中擦除(与 `ESC[0J` 相同)          |
| `ESC[0J`                                       | 从光标擦除直到屏幕结束                  |
| `ESC[1J`                                       | 从光标擦除到屏幕开头                    |
| `ESC[2J`                                       | 擦除整个屏幕                            |
| `ESC[3J`                                       | 删除保存的行                            |
| `ESC[K`                                        | 行内擦除(同 `ESC[0K)`                   |
| `ESC[0K`                                       | 从光标擦除到行尾                        |
| `ESC[1K`                                       | 擦除光标所在行的开头                    |
| `ESC[2K`                                       | 擦除整行                                |
| 私有（不是规范但实现）                         |                                         |
| `ESC[?25l`                                     | 隐藏光标                                |
| `ESC[?25h`                                     | 显示光标                                |
| `ESC[?47l`                                     | 回复屏幕                                |
| `ESC[?47h`                                     | 保存画面                                |
| `ESC[?1049h`                                   | 启用备用缓冲区                          |
| `ESC[?1049l`                                   | 禁用备用缓冲区                          |

#### 字符渲染指令（SGR）

> 即*Select Graphic Rendition*，格式为：`ESC[<style;color>m`。例如：`echo '\033[1,31mhello world\033[0m'`

|    |            |
| -  | -          |
| 0  | 默认值     |
| 1  | 粗体       |
| 22 | 非粗体     |
| 2  | 细体       |
| 22 | 取消细体   |
| 3  | 斜体       |
| 23 | 取消斜体   |
| 4  | 下划线     |
| 24 | 非下划线   |
| 5  | 闪烁       |
| 25 | 非闪烁     |
| 7  | 反显       |
| 27 | 非反显     |
| 8  | 隐藏       |
| 28 | 取消隐藏   |
| 9  | 删除线     |
| 29 | 取消删除线 |

| 前景色                  | 背景色 |                             |
| -                       | -      | -                           |
| 30                      | 40     | 黑色                        |
| 31                      | 41     | 红色                        |
| 32                      | 42     | 绿色                        |
| 33                      | 43     | 黄色                        |
| 34                      | 44     | 蓝色                        |
| 35                      | 45     | 洋红色                      |
| 36                      | 46     | 青色                        |
| 37                      | 47     | 白色                        |
| 39                      | 49     | 默认值                      |
| 扩展                    |        |                             |
| 90                      | 100    | 亮黑                        |
| 91                      | 101    | 亮红                        |
| 92                      | 102    | 亮绿色                      |
| 93                      | 103    | 亮黄的                      |
| 94                      | 104    | 亮蓝色                      |
| 95                      | 105    | 亮洋红色                    |
| 96                      | 106    | 亮青色                      |
| 97                      | 107    | 明亮的白色                  |
| 256色                   |        |                             |
| `ESC[38;5;#m`           |        | 设置前景色，#为颜色序号     |
| `ESC[48;5;#m`           |        | 设置背景颜色，#为颜色序号   |
| RGB                     |        |                             |
| `ESC[38;2;{r};{g};{b}m` |        | 前景色，{r}/{g}/{b}为分量值 |
| `ESC[48;2;{r};{g};{b}m` |        | 背景色，{r}/{g}/{b}为分量值 |

# 字符串操作

| 操作               | 命令                                                                                | 实例                 | 结果   |
| -                  | -                                                                                   | -                    | -      |
| 获取字符串长度     | `${#string}`                                                                        |                      |        |
|                    | `expr $string : '.*`                                                                |                      |        |
| 获取子串长度       | `expr $string : $substring` (如果`substring`带分组则会返回第一个分组而不是子串长度) |                      |        |
| 提取子串           | `${string:position}`                                                                | (a=hello) `${a:1}`   | `ello` |
|                    | `${string:position:length}`                                                         | (a=hello) `${a:1:1}` | `e`    |
| 从头删除最短子串   | `${string#substring}`                                                               |                      |        |
| 从头删除最长子串   | `${string##substring}`                                                              |                      |        |
| 从尾删除最短子串   | `${string%substring}`                                                               |                      |        |
| 从尾删除最长子串   | `${string%%substring}`                                                              |                      |        |
| 替换一次子串       | `${string/substring/replacement}`                                                   |                      |        |
| 替换所有子串       | `${string//substring/replacement}`                                                  |                      |        |
| 替换从头匹配的子串 | `${string/#substring/replacement}`                                                  |                      |        |
| 替换从尾匹配的子串 | `${string/%substring/replacement}`                                                  |                      |        |

# 链接

- [ANSI转义序列](https://blog.csdn.net/linux_rm/article/details/124732457)
- [ANSI escape code](https://en.wikipedia.org/wiki/ANSI_escape_code)
