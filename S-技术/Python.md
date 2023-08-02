---
title: Python-基本教程
date: 2021-05-08T09:01:36.275Z
---

- [文档](#文档)
- [基础语法](#基础语法)
- [builtin](#builtin)
- [包](#包)
- [FAQ](#faq)
  - [根据文件绝对路径引入模块](#根据文件绝对路径引入模块)
  - [在低版本Python使用未来特性](#在低版本python使用未来特性)
- [字符串格式化](#字符串格式化)
  - [`%`](#)
  - [`format()`](#format)

# 文档

- [https://python3-cookbook.readthedocs.io/](https://python3-cookbook.readthedocs.io/)

# 基础语法

```python
# 解构
a, b, c = (1, 2, 3)

a, b, c = [1, 2, 3]

a, b, c = { 'a': 1, 'b': 2, 'c': 3 }.items()
a, b, c = (a[1], b[1], c[1])

# 排序
from functools import cmp_to_key
[1, 3, 2].sort()
['a', 'b', 'A'].sort(key=str.lower)
[1, 3, 2].sort(key=cmp_to_key(lambda a, b: a - b))

# 捕获异常
try:
  # 抛出异常
  raise ValueError('...')
except ValueError as err:
  print('ValueError', err)
except RuntimeError as err:
  print('RuntimeError', err)
except Exception as err:
  print('Other Exception:', err)
else:
  print('print when no error raised')
finally:
  print('print anyhow')

# 捕获异常组
try:
  raise ExceptionGroup("eg", [ValueError(1), TypeError(2), OSError(3), OSError(4)])
except* TypeError as e:
  print(f'caught {type(e)} with nested {e.exceptions}')
except* OSError as e:
  print(f'caught {type(e)} with nested {e.exceptions}')
```

# builtin

- `vars()`
- `enumerate()`
- `iter()`
- `repr()`

# 包

- `inspect`: 获取活动对象的信息，比如
  - `ismethod()`
  - `getsourcefile()`
  - `getdoc()`
  - `getcallargs()`
  - `signature()`
  - ...
- `types`: 提供环境预加载（*prelude*）类型（如`str`, `int`）以外的内置类型，比如
  - `BuiltinFunctionType`
  - `GeneratorType`
  - `MethodType`
  - ...
- `typing`
  - ...
- `collections`
  - ...
- `__future__`: 引入Python未来版本中的特性，比如
  - `annotations`: 类型注释
  - `print_method`: `print()`函数
  - ...
- `os`: 系统相关的信息或操作，比如
  - 环境变量：`environ`
  - 系统信息：`cpu_count`
  - 执行系统命令：`system()`, `execl()`...
  - 文件系统操作：`open()`, `close()`, `stat()`, `chmod()`...
  - ...
- `sys`: 当前Python环境信息或操作，比如
  - `argv`: 命令行参数
  - ...
- `re`: 正则表达式工具模块
  - `search()`: 搜索第一个满足条件的子串
  - `findall()`: 搜索所有满足条件的子串
  - `sub()`, `subn()`: 替换满足条件的子串，后者会返回替换次数
  - `finditer()`
  - `split()`
  - `compile()`, `purge()`
  - `escape()`
  - ...
- `functools`: 针对函数或可调用对象（`Callable`）的工具模块
  - `cmp_to_key()`: 将函数转换成sortkey
  - ...
- `datetime`: 时间工具模块
  - `datetime.fromtimestamp()`
  - ...
- `urllib.parse`: URL解析
  - `urlparse()`
  - `urljoin()`
  - ...
- `urllib.request`: 内置HTTP模块
  - ...
- `random`: 伪随机数工具模块
  - `seed()`: 设置随机种子，默认是当前时间戳
  - `random()`, `randuniform()`, `randint()`, `randrange()`, `randbytes()`:
  - `choice()`, `choices()`: 随机返回列表中的一个/n个值，可以指定权重
  - `sample()`: 随机返回列表中的n个不同值
  - `shuffle()`: 随机打乱列表
  - `getrandbits()`: 随机n位的二进制
  - `normalvariate()`, `gauss()`, `paretovariate()`, ...: 正态分布、高斯分布、帕累托分布...
  - ...
- `pathlib`: 路径工具模块
  - `Path()`
  - ...

- `argparse`: 命令行参数解析模块
- `requests`: HTTP模块

# FAQ

## 根据文件绝对路径引入模块

> [How to import a module given the full path?](https://stackoverflow.com/questions/67631/how-to-import-a-module-given-the-full-path)

```py
# For Python 3.5+ use:

import importlib.util
spec = importlib.util.spec_from_file_location("module.name", "/path/to/file.py")
foo = importlib.util.module_from_spec(spec)
spec.loader.exec_module(foo)
foo.MyClass()

# For Python 3.3 and 3.4 use: (deprecated in Python 3.4.)

from importlib.machinery import SourceFileLoader
foo = SourceFileLoader("module.name", "/path/to/file.py").load_module()
foo.MyClass()

# For Python 2 use:

import imp
foo = imp.load_source('module.name', '/path/to/file.py')
foo.MyClass()
```

## 在低版本Python使用未来特性

```python
# 引进`print()`函数，可以在2.x使用
from __future__ import print_method
# 引进类型标注
from __future__ import annotations
```

# 字符串格式化

## `%`

```python
print("hello, %s!" % "world")
```

## `format()`

```python
print("hello, {}!".format('world'))

print("hello, {0}!".format('world'))

print("hello, {name}!".format(name='world'))

print("Price is: {price:.2f}".format(price=1.1892))
```

| :<  | Try it | Left aligns the result (within the available space)                                                     |
| --- | ------ | ------------------------------------------------------------------------------------------------------- |
| :>  | Try it | Right aligns the result (within the available space)                                                    |
| :^  | Try it | Center aligns the result (within the available space)                                                   |
| :=  | Try it | Places the sign to the left most position                                                               |
| :+  | Try it | Use a plus sign to indicate if the result is positive or negative                                       |
| :-  | Try it | Use a minus sign for negative values only                                                               |
| :   | Try it | Use a space to insert an extra space before positive numbers (and a minus sign before negative numbers) |
| :,  | Try it | Use a comma as a thousand separator                                                                     |
| :_  | Try it | Use a underscore as a thousand separator                                                                |
| :b  | Try it | Binary format                                                                                           |
| :c  |        | Converts the value into the corresponding unicode character                                             |
| :d  | Try it | Decimal format                                                                                          |
| :e  | Try it | Scientific format, with a lower case e                                                                  |
| :E  | Try it | Scientific format, with an upper case E                                                                 |
| :f  | Try it | Fix point number format                                                                                 |
| :F  | Try it | Fix point number format, in uppercase format (show inf and nan as INF and NAN)                          |
| :g  |        | General format                                                                                          |
| :G  |        | General format (using a upper case E for scientific notations)                                          |
| :o  | Try it | Octal format                                                                                            |
| :x  | Try it | Hex format, lower case                                                                                  |
| :X  | Try it | Hex format, upper case                                                                                  |
| :n  |        | Number format                                                                                           |
| :%  | Try it | Percentage format                                                                                       |
