---
title: Variable
date: 2020-09-16T03:04:17.021Z
---

- [变量](#变量)
  - [特殊变量](#特殊变量)
    - [`$1`-第一个变量](#1-第一个变量)
    - [`$#`-变量数量](#-变量数量)
    - [`$*`-以单字符串表示所有变量](#-以单字符串表示所有变量)
    - [`$@`-以独立字符串表示所有变量](#-以独立字符串表示所有变量)
    - [`$$`-当前脚本进程号](#-当前脚本进程号)
    - [`$!`-后台运行的最后一个进程号](#-后台运行的最后一个进程号)
    - [`$-`-Shell使用的当前选项](#--shell使用的当前选项)
    - [`$?`-最后的命令推出状态](#-最后的命令推出状态)
  - [动态变量](#动态变量)
    - [`${!}`-通过变量获取变量](#-通过变量获取变量)
    - [`$OPTIND`-当前变量索引](#optind-当前变量索引)
    - [`declare`](#declare)
    - [`eval`](#eval)
    - [`read`](#read)
  - [操作](#操作)
    - [`${}`](#)
    - [`${:-}``${-}`-使用变量默认值](#---使用变量默认值)
    - [`${:=}``{=}`-给变量赋予默认值](#-给变量赋予默认值)
    - [`${:+}``${+}`-替代变量值](#-替代变量值)
    - [`${?}``${:?}`-变量断言](#-变量断言)
    - [`${:}``${::}`-切割变量](#-切割变量)
- [环境变量](#环境变量)
  - [Bash](#bash)
    - [进程](#进程)
      - [`$$`](#-1)
    - [`$PID`](#pid)
    - [`$PPID`](#ppid)
    - [`$BASHPID`](#bashpid)
    - [`$BASH_SUBSHELL`-当前 *sub-shell* 的嵌套数量](#bash_subshell-当前-sub-shell-的嵌套数量)
    - [`$SHLVL`-当前 *child-shell* 的嵌套数量](#shlvl-当前-child-shell-的嵌套数量)
  - [ZSH](#zsh)
    - [`$ZSHPID`](#zshpid)

# 变量

## 特殊变量

### `$1`-第一个变量

> 类似还有第二个 `$2`、第三个 `$3` ...等等变量

### `$#`-变量数量

### `$*`-以单字符串表示所有变量

> 详见 `$@`

### `$@`-以独立字符串表示所有变量

```shell
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

```shell
ver='v1.0'
var='ver'
echo ${!var}
```

### `$OPTIND`-当前变量索引

```shell
arg1=$1
arg2=$2
arg1and2=${@:1:2}
arg1=${!OPTIND}
shift
arg2=${!OPTIND}
```

### `declare`

```shell
foo='bar'
declare $foo='Emma Delgado'
echo $bar
```

### `eval`

```shell
foo='bar'
eval $foo='天塌下来你先顶着，我去找根棍子。'
echo $bar
```

### `read`

```shell
foo='bar'
read -r -d '' $foo <<< 'Estelle Estrada'
echo "$bar"
```

## 操作

[Parameter Substitution](https://tldp.org/LDP/abs/html/parameter-substitution.html)
[Manipulate String](https://tldp.org/LDP/abs/html/string-manipulation.html)

### `${}`

> `${parameter}` 与  `$parameter` 相同，在某些情况下可以避免引号嵌套的烦恼。

```shell
a=hello
b=world
c=${a}-${b}
c2="$a-$b"
```

### `${:-}``${-}`-使用变量默认值

> `${:-}`（非严格判断），当变量为空（包括空字符串`''`）时，返回右侧值。
> `${-}`（严格判断），当变量未声明时，返回右侧值。

```shell
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

### `${:=}``{=}`-给变量赋予默认值

> 与 `${:-}`（非严格判断）， 和 `${-}`（严格判断），不同的是，操作符左侧的变量会被赋值。

```shell
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

### `${:+}``${+}`-替代变量值

> 与 `${:-}`（非严格判断）， 和 `{-}`（严格判断）作用相对：如果变量被设置了值，则使用替换值。

```shell
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

### `${?}``${:?}`-变量断言

> 如果变量不存在则使用操作符右侧信息报错。
> 注意，两者的区别与前几个表现相反：`${?}` 是严格判断，`${:?}`是非严格判断。

```shell
foo=''
bar=${foo:?foo required} # exit 1 with 'parameter required'
```
```shell
foo=''
bar=${foo?foo required} # exit 0
```
```shell
bar=${foo:?foo required} # exit 1 with 'parameter required'
```
```shell
bar=${foo?foo required} # exit 1 with 'parameter required'
```

### `${:}``${::}`-切割变量

```shell
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
