---
title: Variable
date: 2020-09-16T03:04:17.021Z
---

- [参数/变量](#参数变量)
  - [特殊参数](#特殊参数)
    - [`$1`，第一个参数](#1第一个参数)
    - [`$#`，参数数量](#参数数量)
    - [`$*`，以单字符串表示所有参数](#以单字符串表示所有参数)
    - [`$@`，以独立字符串表示所有参数](#以独立字符串表示所有参数)
    - [`$$`，当前脚本进程号](#当前脚本进程号)
    - [`$!`，后台运行的最后一个进程号](#后台运行的最后一个进程号)
    - [`$-`，Shell使用的当前选项](#-shell使用的当前选项)
    - [`$?`，最后的命令推出状态](#最后的命令推出状态)
  - [动态参数](#动态参数)
    - [`${!}`，通过变量获取参数](#通过变量获取参数)
    - [`$OPTIND`，当前参数索引](#optind当前参数索引)
    - [`declare`](#declare)
    - [`eval`](#eval)
    - [`read`](#read)
  - [操作](#操作)
    - [`${foo:-bar}`，参数默认值](#foo-bar参数默认值)

# 参数/变量

## 特殊参数

### `$1`，第一个参数

> 类似还有第二个 `$2`、第三个 `$3` ...等等参数

### `$#`，参数数量

### `$*`，以单字符串表示所有参数

### `$@`，以独立字符串表示所有参数

### `$$`，当前脚本进程号

### `$!`，后台运行的最后一个进程号

### `$-`，Shell使用的当前选项

> 与`set`命令功能相同

### `$?`，最后的命令推出状态

> `0`为正常，其他表示有错误

## 动态参数

### `${!}`，通过变量获取参数

```bash
ver='v1.0'
var='ver'
echo ${!var}
```

### `$OPTIND`，当前参数索引

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

### `${foo:-bar}`，参数默认值

```bash
function greet() {
  msg=${1:-hello}
  echo $msg, everyone
}
greet # hello, everyone
greet hi # hi, everyone
```
