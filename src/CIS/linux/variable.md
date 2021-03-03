- [Variable](#variable)
  - [特殊变量](#特殊变量)
    - [`$#`](#)
    - [`$*`](#-1)
    - [`$$`](#-2)
    - [`$!`](#-3)
    - [`$@`](#-4)
    - [`$-`](#-)
    - [`$?`](#-5)
  - [Dynamic Variable](#dynamic-variable)

# Variable

## 特殊变量

### `$#`
> 参数个数

### `$*`
> 以单字符串显示所有参数

### `$$`
> 当前脚本进程号

### `$!`
> 后台运行的最后一个进程号

### `$@`
> 同`$*`，但每个参数均加引号

### `$-`
> 显示Shell使用的当前选项，与`set`命令功能相同

### `$?`
> 显示最后的命令推出状态，`0`为正常，其他表示有错误

## Dynamic Variable

- `${!}`

```bash
ver='v1.0'
var='ver'
echo ${!var}
```

- `declare`

```bash
var='ver'
declare $var='v1.0'
echo $ver
```

- `eval`

```bash
var='ver'
eval $var='v1.0'
echo $ver
```

- `read`

```bash
var='ver'
read -r -d '' $var <<< 'v1.0'
echo "$ver"
```
