---
date: 2021-09-17T18:31:10+08:00
title: CSS
---

# `@`规则
> 用来指示CSS如何表现。

## 普通规则

### `@charset`
```css
@charset "UTF-8";
```

### `@import`

见[@import][@import]

```css
@import url;
@import url list-of-media-queries;
@import url supports( supports-query );
@import url supports( supports-query ) list-of-media-queries;
```
```css
@import url("fineprint.css") print;
@import url("bluish.css") speech;
@import "common.css" screen;
@import url('landscape.css') screen and (orientation:landscape);
```

### `@namespace`
> 使用见[命名空间选择](#命名空间)

```css
@namespace <namespace-prefix>? [ <string> | <url> ];
where
<namespace-prefix> = <ident>
```
```css
/* Default namespace */
@namespace url(XML-namespace-URL);
@namespace "XML-namespace-URL";

/* Prefixed namespace */
@namespace prefix url(XML-namespace-URL);
@namespace prefix "XML-namespace-URL";

```

## 内联规则

```css
@IDENTIFIER (RULE) {

}

```

### `@page`
> 用来指示打印文档时的样式。

```css
@page {
  margin: 1cm;
}
@page :first {
  margin: 2cm;
}
```
### `@font-face`
> 用来定义外部（系统未安装）字体。
```css
@font-face {
  font-family: "Open Sans";
  src: url("/fonts/OpenSans-Regular-webfont.woff2") format("woff2"),
       url("/fonts/OpenSans-Regular-webfont.woff") format("woff");
}
/* <url> values */
src: url(https://somewebsite.com/path/to/font.woff); /* Absolute URL */
src: url(path/to/font.woff);                         /* Relative URL */
src: url(path/to/font.woff) format("woff");          /* Explicit format */
src: url('path/to/font.woff');                       /* Quoted URL */
src: url(path/to/svgfont.svg#example);               /* Fragment identifying font */

/* <font-face-name> values */
src: local(font);      /* Unquoted name */
src: local(some font); /* Name containing space */
src: local("font");    /* Quoted name */

/* Multiple items */
src: local(font), url(path/to/font.svg) format("svg"),
     url(path/to/font.woff) format("woff"),
     url(path/to/font.otf) format("opentype");

```
可以定义如下属性：
-  `descent-override`
-  `font-display`
-  `font-family`
-  `font-stretch`
-  `font-style`
-  `font-weight`
-  `font-variant`
-  `font-feature-settings`
-  `font-variation-settings`
-  `line-gap-override`
-  `size-adjust`
-  `src`
-  `unicode-range`

### `@keyframes`
### `@counter-style`

> 定义计数器的样式。即 `list-item-style`

```css
@counter-style circled-alpha {
  system: fixed;
  symbols: Ⓐ Ⓑ Ⓒ Ⓓ Ⓔ Ⓕ Ⓖ Ⓗ Ⓘ Ⓙ Ⓚ Ⓛ Ⓜ Ⓝ Ⓞ Ⓟ Ⓠ Ⓡ Ⓢ Ⓣ Ⓤ Ⓥ Ⓦ Ⓧ Ⓨ Ⓩ;
  suffix: " ";
}
@counter-style winners-list {
  system: fixed;
  symbols: url(gold-medal.svg) url(silver-medal.svg) url(bronze-medal.svg);
  suffix: " ";
}
```
### `@property`

> [@property][@property]: 自定义属性和属性值。

```css
@property --property-name {
  syntax: '<color>';
  inherits: false;
  initial-value: #c0ffee;
}
```

[`syntax`][@property:syntax] :
-  `"<length>"`
-  `"<number>"`
-  `"<percentage>"`
-  `"<length-percentage>"`
-  `"<color>"`
-  `"<image>"`
-  `"<url>"`
-  `"<integer>"`
-  `"<angle>"`
-  `"<time>"`
-  `"<resolution>"`
-  `"<transform-function>"`
-  `"<custom-ident>"`
-  `"<transform-list>"`

```css
syntax: '<color>'; /* 接收一个颜色值 */
syntax: '<length> | <percentage>'; /* 接收长度或百分比参数，但是二者之间不进行计算合并 */
syntax: 'small | medium | large'; /* 接收这些参数值之一作为自定义标识符 */
syntax: '*'; /* 任何有效字符 */
```

```javascript
window.CSS.registerProperty({
  name: '--my-color',
  syntax: '<color>',
  inherits: false,
  initialValue: '#c0ffee',
});
```

### 条件分组规则

> *Conditional Group Rules*: 可以继续嵌套其他规则的规则。

#### `@media`

> [媒体查询](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries)，支持 `and`, `not`, `only`, `or`（或`,`）

媒体类型：

- `all`,
- `print`
- `screen`

媒体特征：

- [`any-hover`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media/any-hover)
- [`any-pointer`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media/any-pointer)
- [`aspect-ratio`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media/aspect-ratio)
- [`color`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/color)
- [`color-gamut`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/color-gamut)
- [`color-index`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/color-index)
- [`device-aspect-ratio`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/device-aspect-ratio)
- [`device-height`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media/device-height)
- [`device-width`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/device-width)
- [`display-mode`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/display-mode)
- [`display`](https://developer.mozilla.org/zh-CN/docs/Web/Manifest#display)
- [`dynamic-range`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/dynamic-range)
- [`forced-colors`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors)
- [`grid`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/grid)
- [`height`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/height)
- [`hover`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media/hover)
- [`inverted-colors`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/inverted-colors)
- [`monochrome`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/monochrome)
- [`orientation`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media/orientation)
- [`overflow-block`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/overflow-block)
- [`overflow-inline`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/overflow-inline)
- [`pointer`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer)
- [`prefers-color-scheme`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media/prefers-color-scheme)：检测用户是否有将系统的主题色设置为亮色或者暗色，值`no-preference`, `dark`, `light`
- [`prefers-contrast`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast)：检测用户的系统是否被开启了动画减弱功能，值`no-preference`, `reduce`
- [`prefers-reduced-motion`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media/prefers-reduced-motion)
- [`resolution`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/resolution)
- [`scripting`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/scripting)：检测脚本（例如 JavaScript）是否可用，值`none`, `enabled`, `initial-only`
- [`update`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/update-frequency)
- [`video-dynamic-range`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/video-dynamic-range)
- [`width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media/width)：视口的宽度，包括纵向滚动条的宽度。

可以通过`window.matchMedia()`测试（和监听）媒体查询的状态：

```js
// 创建查询列表
const mediaQueryList = window.matchMedia("(orientation: portrait)");

if (mediaQueryList.matches) {
  /* 设备的旋转方向为纵向 portrait */
} else {
  /* 设备的旋转方向不是纵向，也就是横向 landscape */
}

// 定义回调函数
function handleOrientationChange(evt) {
  if (evt.matches) {
    /* The viewport is currently in portrait orientation */
  } else {
    /* The viewport is currently in landscape orientation */
  }
}


// 先运行一次回调函数
handleOrientationChange(mediaQueryList);

// 为查询列表注册监听器，同时将回调函数传给监听器
mediaQueryList.addListener(handleOrientationChange);

mediaQueryList.removeListener(handleOrientationChange);
```

#### `@supports`

> 浏览器CSS特性支持查询。支持 `and`, `or`, `not`, `selector()`

```css
/* 声明式语法 */
@supports (display: grid) {
  div {
    display: grid;
  }
}
/* 函数式语法：浏览器是否支持子元素选择器 */
@supports selector(A > B) {}
/* 操作符 */
@supports not (display: grid) {}
@supports not (not (transform-origin: 2px)) {}
@supports (display: grid) and (not (display: inline-grid)) {}
@supports (transform-style: preserve) or (-moz-transform-style: preserve) {}
```

# 选择器权重

> 选择器特异性（*Specificity*），即选择器权重。相同特异性选择器，后定义的样式将被应用。

1. 直接样式 > 继承样式；
2. `!important` > 内联样式 > 外部样式；
4. ID选择器（`#`） > 类选择器（`.`）, 属性选择器（`[]`）, 伪类选择器（`:`） > 类型(标签)选择器（`<tag>`）, 伪元素选择器（`::`）；
6. 肯定伪类（`:is()`）、否定伪类（`:not()`）自身不增加特异性，但参数特异性会保留；
5. 通用选择器（`*`）、选择器组合器（`+`, `>`, `~`, `' '`, `||`）等不增加特异性；
7. 特异性调整伪类（`:where()`）不增加特异性，且会屏蔽参数特异性；
3. 选择器间的接近程度对特异性没影响；

# 选择器
## 命名空间

```css
/* namespace为example */
example|h1 {
  /*  */
}
/* 声明了任何namespace */
*|h1 {
  /*  */
}
/* 没有声明namespace */
|h1 {
  /*  */
}
```

## 属性选择器

### `[attr]`,`[attr=]`, `[attr^=]`, `[attr$=]`, `[attr*=]`, `[attr~=]`, `[attr|=]`
> `[attr*=]`: 属性值包含等号后面的值。
> `[attr~=]`: 属性值（*whitespace-separated*）里面的某个单词等于等号后面的值。
> `[attr|=]`: 属性值或者属性值在连字符（*hyphen*）之前的部分为等号后面的值。

### `[attr operator value i]`, `[attr operator value s]`
> `[attr operator value i]`, `[attr operator value I]`: 忽略大小写。
> `[attr operator value s]`, `[attr operator value S]`: 区分大小写。

## 兄弟元素

### `~`
> 弟弟元素。即位于当前元素后面的兄弟元素。

### `+`
> 相邻弟弟元素。

## 伪元素

### `::after`, `::before`
### `::backdrop`
> 全屏元素下方的一个全屏（视口大小的）元素（只对一个全屏元素生效）。类似于窗口组件的覆盖层。

### `::cue`, `::cue-region`
> 用于所选元素内的 *[WebVTT][WebVTT]* 提示。

### `::first-letter`, `::first-line`
### `::file-selector-button`
> 表示 *type='file'* 的 `<input>`
### `::marker`
> 列表项目前的标记框。如 `<li>`, `<summary>`。

### `::part()`
> 影子元素 (*Shadow Tree*) 内 `part` 属性为括号内值的元素。\

### `::placeholder`
### `::selection`
### `::target-text`
> 与 [`:target`](#target) 相同，不过是文本节点。
## 伪类

### 语言

#### `:lang()`

> 元素的语言可能通过 `lang` 属性，`<meta>` 元素和协议（如 `HTTP` 头）等决定。

### 定位

#### `:visited`, `:link`, `:any-link`

#### `:target`

> 与当前页面URL相同的锚（`id`）。

#### `:scope`

### 用户动作

#### `:hover`
#### `:active`

> 元素被正在激活时触发。比如 *clicking/tapping*

#### `:focus`, `:focus-visible`, `:focus-within`

> `:focus`: 元素在被聚焦时触发。比如 *click*, *tap* 或 *tab* 到元素时触发。
> `:focus-visible`: 元素在被显式聚焦时触发，通常在默认情况下表现为元素有个淡蓝色的轮廓(*outline*)。比如 *tab* 到非输入性元素，或 *click/tap* 输入性元素时。
> `:focus-within`: 在自身或子孙元素被 *focus* 时都会生效。

### 表单元素

#### `:autofill`
#### `:enabled`, `:disabled`
#### `:read-only`,`:read-write`
#### `:placeholder-shown`
#### `:default`
> 一组同类表单元素中的默认（初始）选项，包括*Select*初始 `:selected` 、*Checkbox*初始 `:checked` 和表单的默认[提交按钮](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#implicit-submission)。
#### `:checked`
#### `:indeterminate`
> 不确定状态，只存在于显式设置`indeterminate`属性的*Checkbox*（表现为checkbox中有个短横线）, 还未被选中的*Radio*、未设置`value`和`max`属性的*Progress*。

#### `:valid`, `:invalid`, `:user-invalid`, `:in-range`, `:out-of-range`, `:required`, `:optional`
> `:valid`, `:invalid`: 校验（如 `type`, `required` 等属性）成功/不成功的表单。
> `:user-invalid`: 同 `:invalid`，但需要用户交互过的。
> `:in-range`, `:out-of-range`: 对应于 *type=number* 的 `min`, `max` 属性范围。
> `:required`, `:optional`: 对应 `required` 属性。

### 树结构

#### `:root`
> 文档根结点，html中为`<html>`.
#### `:empty`
> 没有子元素（`Element`）或文本节点（`Text`）的元素，不包括注释。
#### `:only-child`, `:only-of-type`
> 没有兄弟元素/同类兄弟元素的元素。
#### `:nth-child()`,`:nth-last-child()`,`:first-child`,`:last-child`,`:nth-of-type()`,`:nth-last-of-type()`,`:first-of-type`,`:last-of-type`
#### `:has()`
> 还未被浏览器支持。通过判断子元素选择元素。
#### `:is()`, `:not()`, `:where()`
> 选择/反选参数中列举的选择器匹配的元素。如 `:is(header, main, footer)`。
> `:where()`: 同 `:is()`，但 `:where()` 参数不会增加选择链的 [**Specificity**][Specificity]（可以理解为选择器权重），即参数中的选择器权重为0。

### 影子元素

> 在 *shadow DOM* 内选择其宿主元素及相关元素。
#### `:host`
> `:host`: 选择 *shadow root host*。

#### `:host()`
> `:host()`: 选择匹配参数中选择器的 *shadow root host*。如 `:host(.special)`

#### `:host-context()`
> `:host-context()`: 选择属于参数中选择器匹配的元素的后代 *shadow root host*。如 `:host-context(body.dark-theme)`

### 时间维度

#### `:current`
#### `:future`
#### `:past`
### 资源状态

#### `:playing`
#### `:paused`
#### `:picture-in-picture`

### 打印

#### `:left`, `:right`, `:first`
> 选择打印文档的左侧页面/右侧页面/第一页。配合 `@page` 使用。

### 其他

#### `:fullscreen`
#### `:defined`
> 浏览器定义的元素，以及通过[`CustomElementRegistry.define()`](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define)自定义的元素。

# 数据类型

> *[CSS Data Types][CSSTypes]*
# 背景

## `backdrop-filter`

> 值同 `filter`

```css
/* Keyword value */
backdrop-filter: none;

/* URL to SVG filter */
backdrop-filter: url(commonfilters.svg#filter);

/* <filter-function> values */
backdrop-filter: blur(2px);
backdrop-filter: brightness(60%);
backdrop-filter: contrast(40%);
backdrop-filter: drop-shadow(4px 4px 10px blue);
backdrop-filter: grayscale(30%);
backdrop-filter: hue-rotate(120deg);
backdrop-filter: invert(70%);
backdrop-filter: opacity(20%);
backdrop-filter: sepia(90%);
backdrop-filter: saturate(80%);

/* Multiple filters */
backdrop-filter: url(filters.svg#filter) blur(4px) saturate(150%);

/* Global values */
backdrop-filter: inherit;
backdrop-filter: initial;
backdrop-filter: revert;
backdrop-filter: unset;
```

## `backface-visibility`

> 元素背面是否可见。

```css
/* Keyword values */
backface-visibility: visible;
backface-visibility: hidden;

/* Global values */
backface-visibility: inherit;
backface-visibility: initial;
backface-visibility: revert;
backface-visibility: unset;
```

## `background-blend-mode`

> 定义 `background`（`background-image`和`background-color`）如何混合。

```css
/* One value */
background-blend-mode: normal;

/* Two values, one per background */
background-blend-mode: darken, luminosity;

/* Global values */
background-blend-mode: initial;
background-blend-mode: inherit;
background-blend-mode: revert;
background-blend-mode: unset;
```

-  `normal`
-  `multiply`
-  `screen`
-  `overlay`
-  `darken`
-  `lighten`
-  `color-dodge`
-  `color-burn`
-  `hard-light`
-  `soft-light`
-  `difference`
-  `exclusion`
-  `hue`
-  `saturation`
-  `color`
-  `luminosity`

## `background-clip`

> 定义 `background`（`background-image`和`background-color`）如何剪辑。

```css
/* Keyword values */
background-clip: border-box; /* default */
background-clip: padding-box;
background-clip: content-box;
background-clip: text;

/* Global values */
background-clip: inherit;
background-clip: initial;
background-clip: revert;
background-clip: unset;
```

## `background-attachment`
## `background-image`

```css
background-image:
  linear-gradient(to bottom, rgba(255,255,0,0.5), rgba(0,0,255,0.5)),
  url('catfront.png');

/* Global values */
background-image: inherit;
background-image: initial;
background-image: revert;
background-image: unset;
background-image: none; /* default */
```

## `background-origin`
## `background-position`
## `background-repeat`
## `background-size`

# 边框

## `border-image-slice`

# 滚动条

## `scroll-snap-type`

[Specificity]: https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity
[WebVTT]: https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API
[@import]: https://developer.mozilla.org/en-US/docs/Web/CSS/@import
[MediaQueries]: https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries
[CSSTypes]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Types
[@property]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/@property
[@property:syntax]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/@property/syntax
[AnimatedProperties]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties
[CSSLength]: https://developer.mozilla.org/en-US/docs/Web/CSS/length
