---
date: 2021-09-17T18:31:10+08:00
title: Svg
---

# 概念

## `group`
> Grouping elements can be useful if you want to transform a set of elements as if it were one. *All element within a group, maintain their position relative to the group they belong to.* Groups do not have a geometry of their own, it's inherited from their content. Therefore *groups do not listen to x, y, width and height attributes*.
## `use`
## `symbol`
> *The only difference between symbols and groups is that symbols are not rendered.* Therefore a symbol element is ideal in combination with the use element.
## `defs`
> *The <defs> element is a container for referenced elements.* Descendants of a <defs> node are not rendered directly. The <defs> node lives in the main <svg> document.

## `pattern`
