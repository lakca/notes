---
date: 2022-02-25T18:54:08+08:00
title: Rapid
---

# 快速原型

## 开源CDN

[jsdelivr](https://cdn.jsdelivr.net)：支持任意[github](https://github.com), [npm](https://npmjs.org), [wordpress](wordpress.org)仓库

[unpkg](https://unpkg.com/): 支持任意[npm](https://npmjs.org)仓库

```
unpkg.com/:package@:version/:file
```

[cdnjs](https://cdnjs.com/)

## 字体

### Fira Code

[Fira Code: free monospaced font with programming ligatures](https://github.com/tonsky/FiraCode)

![Fira Code](https://github.com/tonsky/FiraCode/raw/master/extras/logo.svg)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/firacode@6.2.0/distr/fira_code.min.css">
<style>
  code {
    font-family: 'Fira Code';
  }
</style>
```

## Markdown渲染

### Marked

[Marked](https://marked.js.org/)

```html
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js" crossorigin="anonymous"></script>
```

## 代码高亮

### PrismJS

[PrismJS](https://prismjs.com/#basic-usage)

[CDN](https://www.jsdelivr.com/package/npm/prismjs)

[Plugins](https://prismjs.com/#plugins)

[A wider selection of Prism themes](https://github.com/PrismJS/prism-themes)

```html
<script src="https://cdn.jsdelivr.net/npm/prismjs@latest/components/prism-core.js" crossorigin="anonymous"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prismjs@latest/themes/prism-okaidia.css" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/prismjs@latest/plugins/autoloader/prism-autoloader.min.js" crossorigin="anonymous"></script>
<script>
document.addEventListener('DOMContentLoaded', () => {
  Prism.highlightAll()
})
</script>
```

## 极简CSS框架

### Pico

[官网](https://picocss.com/examples/preview/)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@latest/css/pico.min.css">
```

### Milligram

[官网](https://milligram.io/#Typography)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/milligram@latest/dist/milligram.min.css">
```

### Picnic

[官网](https://picnicss.com/documentation)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/picnic@latest">
```

### Pure

[官网](http://purecss.io/)

```html
<link rel="stylesheet" href="https://unpkg.com/purecss@latest/build/pure-min.css">
```

## 其他

### 自动生成页面目录

[awesome-toc](https://github.com/letiantian/awesome-toc)：自动生成页面目录（*toc*）

```html
<script src="https://cdn.jsdelivr.net/gh/jquery/jquery@1.11/dist/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/letiantian/awesome-toc@latest/src/awesome-toc.js"></script>
<script>
  $.awesome_toc({
    autoDetectHeadings: true,
    enableToTopButton: true,
    title: 'INDEX',
    css: {
      fontSize: '1rem',
      largeFontSize: '1.2rem',
    },
  });
</script>
```
