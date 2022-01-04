---
title: Variable
date: 2020-09-16T03:04:17.021Z
---

- [参数](#参数)
  - [特殊参数](#特殊参数)
    - [`$1`-第一个参数](#1-第一个参数)
    - [`$#`-参数数量](#-参数数量)
    - [`$*`-以单字符串表示所有参数](#-以单字符串表示所有参数)
    - [`$@`-以独立字符串表示所有参数](#-以独立字符串表示所有参数)
    - [`$$`-当前脚本进程号](#-当前脚本进程号)
    - [`$!`-后台运行的最后一个进程号](#-后台运行的最后一个进程号)
    - [`$-`-Shell使用的当前选项](#--shell使用的当前选项)
    - [`$?`-最后的命令推出状态](#-最后的命令推出状态)
  - [动态参数](#动态参数)
    - [`${!}`-通过变量获取参数](#-通过变量获取参数)
    - [`$OPTIND`-当前参数索引](#optind-当前参数索引)
    - [`declare`](#declare)
    - [`eval`](#eval)
    - [`read`](#read)
  - [操作](#操作)
    - [`${}`](#)
    - [`${:-}``${-}`-使用参数默认值](#---使用参数默认值)
    - [`${:=}``{=}`-给参数赋予默认值](#-给参数赋予默认值)
    - [`${:+}``${+}`-替代参数值](#-替代参数值)
    - [`${?}``${:?}`-参数断言](#-参数断言)
    - [`${:}``${::}`-切割参数](#-切割参数)

# 参数

## 特殊参数

### `$1`-第一个参数

> 类似还有第二个 `$2`、第三个 `$3` ...等等参数

### `$#`-参数数量

### `$*`-以单字符串表示所有参数

> 详见 `$@`

### `$@`-以独立字符串表示所有参数

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

## 动态参数

### `${!}`-通过变量获取参数

```shell
ver='v1.0'
var='ver'
echo ${!var}
```

### `$OPTIND`-当前参数索引

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

### `${:-}``${-}`-使用参数默认值

> `${:-}`（非严格判断），当参数为空（包括空字符串`''`）时，返回右侧值。
> `${-}`（严格判断），当参数未声明时，返回右侧值。

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

### `${:=}``{=}`-给参数赋予默认值

> 与 `${:-}`（非严格判断）， 和 `${-}`（严格判断），不同的是，操作符左侧的参数会被赋值。

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

### `${:+}``${+}`-替代参数值

> 与 `${:-}`（非严格判断）， 和 `{-}`（严格判断）作用相对：如果参数被设置了值，则使用替换值。

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

### `${?}``${:?}`-参数断言

> 如果参数不存在则使用操作符右侧信息报错。
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

### `${:}``${::}`-切割参数

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
