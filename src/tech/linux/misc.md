---
title: Misc
date: 2020-09-16T03:04:17.021Z
---

# 操作符

|                     |     |     |
| ------------------- | --- | --- |
| 整数操作符          |     |     |
| `+`                 |     |     |
| `+=`                |     |     |
| `–`                 |     |     |
| `-=`                |     |     |
| `*`                 |     |     |
| `*=`                |     |     |
| `**`                |     |     |
| `/`                 |     |     |
| `/=`                |     |     |
| `%`                 |     |     |
| `%=`                |     |     |
| `++)`               |     |     |
| `++`                |     |     |
| `—`                 |     |     |
| `–`                 |     |     |
| `-eq`               |     |     |
| `-ne`               |     |     |
| `-gt`               |     |     |
| `-ge`               |     |     |
| `-lt`               |     |     |
| `-le`               |     |     |
| `<`                 |     |     |
| `<=`                |     |     |
| `>`                 |     |     |
| `>=`                |     |     |
| 逻辑运算符          |     |     |
| `&&`                |     |     |
| `                   |     | `   |  |  |
| `!`                 |     |     |
| `-a`                |     |     |
| `-o`                |     |     |
| 位操作符            |     |     |
| `&`                 |     |
| `&=`                |     |
| `\|`                |     |
| `\|=`               |     |
| `^`                 |     |
| `^=`                |     |
| `~`                 |     |
| `<<`                |     |
| `<<=`               |     |
| `>>`                |     |
| `>>=`               |     |
| 字符串操作符        |     |     |
| `=`                 |     |     |
| `==`                |     |     |
| `!=`                |     |     |
| `<`                 |     |     |
| `>`                 |     |     |
| `-z`                |     |     |
| `-n`                |     |     |
| 文件操作符          |     |     |
| `-e`                |     |     |
| `-f`                |     |     |
| `-s`                |     |     |
| `-d`                |     |     |
| `-b`                |     |     |
| `-c`                |     |     |
| `-p`                |     |     |
| `-h`                |     |     |
| `-L`                |     |     |
| `-S`                |     |     |
| `-t`                |     |     |
| `-r`                |     |     |
| `-w`                |     |     |
| `-x`                |     |     |
| `-g`                |     |     |
| `-u`                |     |     |
| `-k`                |     |     |
| `-O`                |     |     |
| `-G`                |     |     |
| `-N`                |     |     |
| `-nt`               |     |     |
| `-ot`               |     |     |
| `-ef`               |     |     |
| 三元操作符          |     |     |
| `?:`                |     |     |
| 逗号操作符          |     |     |
| `,`                 |     |     |
| *here-string*操作符 |     |     |
| `<<<`               |     |     |

# 逻辑运算

操作符用于条件语句和计算语句中：

## `[`

> 单中括号，即`test`命令

注意点：

- ~~`>`, `<`~~ 在比较字符串时，需要转义，即`\>`, `\<`

- 不支持 ~~`&&`, `||`~~，用 `-a`, `-o` 替代

```bash
if [ 2 > 1 ]; then echo '2 > 1'; fi
```

## `[[`

> 双中括号，是bash关键字，比`[`支持更多运算符

注意点：

- `=~` 字符串正则匹配

- `&&`, `||`

- `=`，在进行字符串比较时需要注意使用引号标注字符串，否则可能会进行模式匹配

```bash
if [[ hello = 'he*' ]]; then echo 'unreachable'; fi
# *为模式匹配元字符，若未用引号标注字符串，会进行模式匹配
if [[ hello = he* ]]; then echo 'hello begins with he'; fi
```

## `((`

> 双括号，整数运算，符合并支持所有C运算

```bash
if (( 2 >= 1 )); then echo '2 >= 1'; fi
```

# 整数运算

## `$(())`

```bash
echo $((1 + 2))
```

# 浮点数运算

## `bc`

> `bc`支持高精度运算（`scale`），并支持书写条件语句。

```bash
bc <<< 'scale=2;2/3' # 0.66
```

四舍五入：

```bash
bc <<< 'scale=3;2/3' | xargs printf '%.2f' # 0.67
```

## `awk`

```bash
awk 'BEGIN { print 1/2 }' # 0.5
```

# 分组

## `{}`-分组

```bash
{ echo hello; echo world; } >/dev/null
```

## `{}`-分组扩展

```bash
echo {a,b,c}.sh # a.sh b.sh c.sh
echo {a..b}{1..2}.sh # a1.sh a2.sh b1.sh b2.sh
```

```bash
for i in {1..10}; do echo -n $i; done # 1 2 3 ... 10
```

## `()`-子进程

> 子进程可以使用，但不可回写父进程变量

通过`$()`获取子进程结果：

```bash
files=($(ls))
```

# 字符串

## 操作

| 操作               | 命令                                                                                | 实例                 | 结果   |
| ------------------ | ----------------------------------------------------------------------------------- | -------------------- | ------ |
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

## 字符串转数组

若使用默认定界符（空格、换行等），可以直接转换：

```bash
str='a b c'
array=($str)
```

有时候，当我们想给中间元素传空的时候，需要用上其他定界符：
```bash
IFS=',' read -r -a array <<< ",,c"
```

# 数组

在 *bash* 中，数组下标以 `0` 开始，在 *zsh* 中，则以 `1` 开始。数组切片语法 `${arr:offset:len}` ，两者则表现一致。另外，*zsh* 支持反向（负数）索引，如 `${arr[-1]}`。

```bash
arr=()
arr+=(1 2 3)
```

# 特殊变量

## `$0`-启动程序名称

```bash
# a.sh
echo $0

# b.sh
. a.sh # b.sh
source a.sh # b.sh
bash a.sh # a.sh
```

## `$1`-第一个变量

> 类似还有第二个 `$2`、第三个 `$3` ...等等变量

## `$#`-变量数量

## `$*`-以单字符串表示所有变量

> 详见 `$@`

## `$@`-以独立字符串表示所有变量

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

## `$$`-当前脚本进程号

## `$!`-后台运行的最后一个进程号

## `$-`-Shell使用的当前选项

> 与`set`命令功能相同

## `$?`-上个命令的退出状态

> `0`为正常，其他表示有错误

# 动态变量

## `${!}`-通过变量获取变量

```bash
ver='v1.0'
var='ver'
# bash:
echo ${!var}
# zsh:
echo ${(P)var}
```

## `$OPTIND`-当前变量索引

```bash
arg1=$1
arg2=$2
arg1and2=${@:1:2}
arg1=${!OPTIND}
shift
arg2=${!OPTIND}
```

## `declare`

```bash
foo='bar'
declare $foo='Emma Delgado'
echo $bar
```

## `eval`

```bash
foo='bar'
eval $foo='天塌下来你先顶着，我去找根棍子。'
echo $bar
```

## `read`

```bash
foo='bar'
read -r -d '' $foo <<< 'Estelle Estrada'
echo "$bar"
```

# 变量默认值和断言

[Parameter Substitution](https://tldp.org/LDP/abs/html/parameter-substitution.html)
[Manipulate String](https://tldp.org/LDP/abs/html/string-manipulation.html)

|         |                                                  |                           |
| ------- | ------------------------------------------------ | ------------------------- |
| `$`     |                                                  | `$msg`                    |
| `${}`   |                                                  | `${msg}`                  |
| `${:-}` | 若变量未声明或为空字符串时，返回右侧提供的默认值 | `${msg:-hello}`           |
| `${-}`  | 若变量未声明时，返回右侧提供的默认值             | `${msg-hello}`            |
| `${:=}` | 与`${:-}`相同，并同时改变原变量值                | `${msg:=hello}`           |
| `${=}`  | 与`${-}`相同，并同时改变原变量值                 | `${msg=hello}`            |
| `${:+}` | 与`${:-}`相反                                    | `${msg:+hello}`           |
| `${+}`  | 与`${-}`相反                                     | `${msg+hello}`            |
| `${:?}` | 断言，若变量未声明或为空字符串时，以右侧文本报错 | `${msg:?msg is empty}`    |
| `${?}`  | 断言，若变量未声明时，以右侧文本报错             | `${msg?msg is undefined}` |

# 切片

```bash
msg=hello
echo ${msg:1} # ello
echo ${msg:1:1} # e
```

# 环境变量

## 导出环境变量

```bash
export msg
```

```bash
declare -x msg
```

```bash
msg=<msg> <cmd>
```

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

## ANSI Escape Sequences

> [ANSI转义序列](https://en.wikipedia.org/wiki/ANSI_escape_code)

相关链接：

- [ANSI.SYS -- ansi terminal emulation escape sequences](https://web.archive.org/web/20060206022229/http://enterprise.aacc.cc.md.us/~rhs/ansi.html)
- [Xterm / Escape Sequences](http://invisible-island.net/xterm/ctlseqs/ctlseqs.html)

### C0 control codes

| C0   | C转义 | Ctrl |                   |
| :--- | :---- | :--- | :---------------- |
| 7    | `\a`  | `^G` | 响铃（BEL）       |
| 8    | `\b`  | `^H` | 退格（BS）        |
| 9    | `\t`  | `^I` | 水平制表符（HT）  |
| 10   | `\n`  | `^J` | 换行（LF）        |
| 11   | `\v`  | `^K` | 垂直制表符（VT）  |
| 12   | `\f`  | `^L` | 换页（FF）        |
| 13   | `\r`  | `^M` | 回车（CR）        |
| 27   | `\e`  | `^[` | 换码、转义（ESC） |

### Fe Escape sequences

> 如果`ESC`后面跟着一个`0x40~0x5F`范围内的字节，则为***Fe** Escape sequences*

> ANSI转义序列（不完整列表）：

| C1   | Fe (`ESC`) | 名称                                                | 作用                                                                                                                                                                                                          |
| :--- | :--------- | :-------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 0x8e | `N`        | SS2 – Single Shift Two                              | 从其中一个替代字符集中选择一个字符。在xterm中，SS2选择G2字符集，SS3选择G3字符集。                                                                                                                             |
| 0x8f | `O`        | SS3 – Single Shift Three                            |                                                                                                                                                                                                               |
| 0x90 | `P`        | DCS – 设备控制字符串（Device Control String）       | 控制设备。在xterm中，这个序列的使用包括定义用户自定义的密钥，以及请求或设置Termcap/Terminfo数据。                                                                                                             |
| 0x9b | `[`        | CSI - 控制序列导入器（Control Sequence Introducer） | 大部分有用的序列，请参阅下一节。结束于ASCII 64到126 (@到~/十六进制0x40到0x7E).                                                                                                                                |
| 0x9c | `\`        | ST – 字符串终止（String Terminator）                | 终止其他控件（包括APC，DCS，OSC，PM和SOS）中的字符串。                                                                                                                                                        |
| 0x9d | `]`        | OSC – 操作系统命令（Operating System Command）      | 启动操作系统使用的控制字符串。OSC序列与CSI序列相似，但不限于整数参数。通常，这些控制序列由ST终止。在xterm中，它们也可能被BEL终止。例如，在xterm中，窗口标题可以这样设置：OSC 0;this is the window title BEL。 |
| 0x98 | `X`        | SOS – 字符串开始（Start of String）                 | 引用由ST终止的一串文本的参数。这些字符串控制序列的用途由应用程序或私有规则来定义。这些函数没有实现，参数被xterm忽略。                                                                                         |
| 0x9e | `^`        | PM – 私有消息（Privacy Message）                    |                                                                                                                                                                                                               |
| 0x9f | `_`        | APC – 应用程序命令（Application Program Command）   |                                                                                                                                                                                                               |
|      | `c`        | RIS – 重置为初始状态（Reset to Initial State）      | 将设备重置为原始状态。可能包括（如果适用的话）：重置图形格式，清除制表符，重置为默认字体等等。                                                                                                                |

### CSI (Control Sequence Introducer) sequences

> CSI序列，即 `ESC[`序列，为`ESC[`后面跟任意数量的`0x30–0x3F`(即`0–9:;<=>?`)**参数字节**、以及任意数量的`0x20–0x2F`（即ANSI空格和`!"#$%&'()*+,-./`）**中间字节**、以及一个`0x40–0x7E`（即``@A–Z[\]^_`a–z{|}~``）**终止字节**。
> 可以实现诸如光标移动、清屏、字符渲染、终端控制等。

> CSI控制序列（不完整列表）：

| CSI (`ESC[`)，`n`为参数 | 名称                                               | 作用                                                                                                        |
| :---------------------- | :------------------------------------------------- | :---------------------------------------------------------------------------------------------------------- |
| `nA`                    | CUU – 光标上移（Cursor Up）                        | 光标向指定的方向移动`n`（默认1）格。如果光标已在屏幕边缘，则无效。                                          |
| `nB`                    | CUD – 光标下移（Cursor Down）                      |                                                                                                             |
| `nC`                    | CUF – 光标前移（Cursor Forward）                   |                                                                                                             |
| `nD`                    | CUB – 光标后移（Cursor Back）                      |                                                                                                             |
| `nE`                    | CNL – 光标移到下一行（Cursor Next Line）           | 光标移动到下面第`n`（默认1）行的开头。（非ANSI.SYS（英语：ANSI.SYS））                                      |
| `nF`                    | CPL – 光标移到上一行（Cursor Previous Line）       | 光标移动到上面第`n`（默认1）行的开头。（非ANSI.SYS）                                                        |
| `nG`                    | CHA – 光标水平绝对（Cursor Horizontal Absolute）   | 光标移动到第`n`（默认1）列。（非ANSI.SYS）                                                                  |
| `n;mH`                  | CUP – 光标位置（Cursor Position）                  | 光标移动到第`n`行、第`m`列。值从1开始，且默认为1（左上角）。                                                |
| `nJ`                    | ED – 擦除显示（Erase in Display）                  | 清除屏幕的部分区域。                                                                                        |
| `0J`,`J`                |                                                    | 清除从光标位置到屏幕末尾的部分。                                                                            |
| `1J`                    |                                                    | 清除从光标位置到屏幕开头的部分。                                                                            |
| `2J`                    |                                                    | 清除整个屏幕，并删除回滚缓存区中的所有行（这个特性是xterm添加的，其他终端应用程序也支持）。                 |
| `nK`                    | EL – 擦除行（Erase in Line）                       | 清除行内的部分区域。                                                                                        |
| `0K`,`K`                |                                                    | 清除从光标位置到该行末尾的部分。                                                                            |
| `1K`                    |                                                    | 清除从光标位置到该行开头的部分。                                                                            |
| `2K`                    |                                                    | 清除整行。光标位置不变。                                                                                    |
| `nS`                    | SU – 向上滚动（Scroll Up）                         | 整页向上滚动`n`（默认1）行。新行添加到底部。（非ANSI.SYS）                                                  |
| `nT`                    | SD – 向下滚动（Scroll Down）                       | 整页向下滚动`n`（默认1）行。新行添加到顶部。（非ANSI.SYS）                                                  |
| `n;mf`                  | HVP – 水平垂直位置（Horizontal Vertical Position） | 同CUP。                                                                                                     |
| `nm`                    | SGR – 选择图形再现（Select Graphic Rendition）     | 设置SGR参数，包括文字颜色。CSI后可以是0或者更多参数，用分号分隔。如果没有参数，则视为CSI 0 m（重置/常规）。 |
| `5i`                    | 打开辅助端口                                       | 启用辅助串行端口，通常用于本地串行打印机                                                                    |
| `4i`                    | 关闭辅助端口                                       | 禁用辅助串行端口，通常用于本地串行打印机                                                                    |
| `6n`                    | DSR – 设备状态报告（Device Status Report）         | 以`ESC[n;mR`就像在键盘上输入）向应用程序报告光标位置（CPR），其中`n`是行，`m`是列。                         |

> 一些私有的CSI控制序列：

| CSI (`ESC[`) | 名称                                                | 作用                   |
| :----------- | :-------------------------------------------------- | :--------------------- |
| `s`          | SCP,SCOSC – 保存光标位置（Save Cursor Position）    | 保存光标的当前位置。   |
| `u`          | RCP,SCORC – 恢复光标位置（Restore Cursor Position） | 恢复保存的光标位置。   |
| `?25h`       | DECTCEM                                             | 显示光标               |
| `?25l`       | DECTCEM                                             | 隐藏光标               |
| `?1049h`     |                                                     | (xterm) 启用备用缓冲区 |
| `?1049l`     |                                                     | (xterm) 禁用备用缓冲区 |
| `?47h`       |                                                     | 保存画面               |
| `?47l`       |                                                     | 回复屏幕               |

#### SGR (Select Graphic Rendition)

> SGR，即`ESC[nm`（`n`为参数）的CSI序列，用于控制显示属性。

> 样式：

| SGR参数 `n`   |                                                               |                                                             |
| :------------ | :------------------------------------------------------------ | :---------------------------------------------------------- |
| `0`           | 重置                                                          | Reset *or* normal                                           |
| `1`           | 粗体                                                          | Bold *or* increased intensity                               |
| `2`           | 细体                                                          | Faint, decreased intensity, *or* dim                        |
| `3`           | 斜体                                                          | Italic                                                      |
| `4`           | 下划线                                                        | Underline                                                   |
| `5`           | 闪烁                                                          | Slow blink                                                  |
| `6`           | 闪烁                                                          | Rapid blink                                                 |
| `7`           | 反显                                                          | Reverse video *or* invert                                   |
| `8`           | 隐藏                                                          | Conceal *or* hide                                           |
| `9`           | 删除线                                                        | Crossed-out, *or* strike                                    |
| `10`          | 默认字体                                                      | Primary/default font                                        |
| `11` ~ `19`   | 替换字体                                                      | Alternative font                                            |
| `20`          | 哥特体                                                        | Fraktur/Gothic                                              |
| `21`          | 取消粗体                                                      | Doubly underlined *or* not bold                             |
| `22`          | 取消细体                                                      | Normal intensity                                            |
| `23`          | 取消斜体                                                      | Neither italic, nor blackletter                             |
| `24`          | 取消下划线                                                    | Not underlined                                              |
| `25`          | 取消闪烁                                                      | Not blinking                                                |
| `26`          | 比例间距                                                      | Proportional spacing                                        |
| `27`          | 取消反显                                                      | Not reversed                                                |
| `28`          | 取消隐藏                                                      | Reveal                                                      |
| `29`          | 取消删除线                                                    | Not crossed out                                             |
| `30` ~ `37`   | 设置前景色                                                    | Set foreground color                                        |
| `38`          | 设置前景色，256色后跟`;5;#`，RGB后跟`;2;r;g;b`，#,r,g,b为色值 | Set foreground color                                        |
| `39`          | 默认前景色                                                    | Default foreground color                                    |
| `40` ~ `47`   | 设置背景色                                                    | Set background color                                        |
| `48`          | 设置背景色，256色后跟`;5;#`，RGB后跟`;2;r;g;b`，#,r,g,b为色值 | Set background color                                        |
| `49`          | 默认背景色                                                    | Default background color                                    |
| `50`          |                                                               | Disable proportional spacing                                |
| `51`          |                                                               | Framed                                                      |
| `52`          |                                                               | Encircled                                                   |
| `53`          |                                                               | Overlined                                                   |
| `54`          |                                                               | Neither framed nor encircled                                |
| `55`          |                                                               | Not overlined                                               |
| `58`          |                                                               | Set underline color                                         |
| `59`          |                                                               | Default underline color                                     |
| `60`          |                                                               | Ideogram underline or right side line                       |
| `61`          |                                                               | Ideogram double underline, or double line on the right side |
| `62`          |                                                               | Ideogram overline or left side line                         |
| `63`          |                                                               | Ideogram double overline, or double line on the left side   |
| `64`          |                                                               | Ideogram stress marking                                     |
| `65`          |                                                               | No ideogram attributes                                      |
| `73`          |                                                               | Superscript                                                 |
| `74`          |                                                               | Subscript                                                   |
| `75`          |                                                               | Neither superscript nor subscript                           |
| `90` ~ `97`   |                                                               | Set bright foreground color                                 |
| `100` ~ `107` |                                                               | Set bright background color                                 |

### 其他扩展CSI

| 来源  | 格式                    | 含义             |
| ----- | ----------------------- | ---------------- |
| iterm | `\033];{NEW_TITLE}\007` | 设置标签页的标题 |


# 链接

- [ANSI转义序列](https://blog.csdn.net/linux_rm/article/details/124732457)
- [ANSI escape code](https://en.wikipedia.org/wiki/ANSI_escape_code)
