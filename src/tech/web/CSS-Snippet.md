---
title: CSS
date: 2021-06-22T03:21:09.055Z
---

- [居中](#居中)
  - [`flex` / `grid`](#flex--grid)
    - [（双向）](#双向)
    - [（双向）`margin`](#双向margin)
    - [（单向）伪元素](#单向伪元素)
  - [`position`](#position)
    - [（双向）`translate`](#双向translate)
    - [（双向）`margin`](#双向margin-1)
  - [（双向）`table`](#双向table)

## 居中

### `flex` / `grid`

#### （双向）

```css
.container{
  display: flex;
  justify-content: center;
  align-items: center;
}
.element{
}
```

```css
.container{
  display: flex;
}
.element{
  justify-self: center;
  align-self: center;
}
```

#### （双向）`margin`

```css
.container{
  display: flex;
}
.element{
  margin: auto;
}
```

```css
.container{
  display: flex;
}
.element{
  align-self: center;
  margin: 0 auto;
}
```

#### （单向）伪元素

```css
.container{
  display: flex;
}
.container::before,
.container::after{
  content: '';
  flex: 1;
}
```

### `position`

#### （双向）`translate`

```css
.container{
  position: relative;
}
.element{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

#### （双向）`margin`

```css
.container{
  position: relative;
}
.element{
  position: absolute;
  top: 0; bottom: 0; left: 0; right: 0;
  margin: auto;
  height: 20px;
  width: 20px;
}
```

### （双向）`table`

```css
.container{
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}
.element{
  display: inline-block;
}
```
