---
title: NPM
date: 2021-04-14T08:53:17.468Z
---

## 获取全局/本地包安装位置：

本地：`npm root`

全局：`npm root -g`

## 引入非本地包：

1. 通过设置环境变量 `NODE_PATH` 引入更多的npm包搜索路径。

例如，引入全局安装包目录：`NODE_PATH=$(npm root --quiet -g)`

2. 链接全局安装包到本地：`npm link <name>`

3. 使用绝对路径引入包，不推荐
