---
title: Python
date: 2021-05-08T09:01:36.275Z
---

- [cookbooks](#cookbooks)
- [FAQ](#faq)
  - [根据文件绝对路径引入模块](#根据文件绝对路径引入模块)

# cookbooks

- [https://python3-cookbook.readthedocs.io/](https://python3-cookbook.readthedocs.io/)

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
