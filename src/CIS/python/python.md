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
