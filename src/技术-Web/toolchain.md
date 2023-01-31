---
date: 2022-03-23T18:45:33+08:00
title: Toolchain
---

# eslint

## 插件

- [eslint-plugin-import](https://github.com/import-js/eslint-plugin-import/): ESLint plugin with rules that help validate proper imports.
	- [eslint-import-resolver-alias](https://github.com/johvin/eslint-import-resolver-alias): This is a simple Node.js module import resolution plugin for [`eslint-plugin-import`](https://www.npmjs.com/package/eslint-plugin-import), which supports native Node.js module resolution, module alias/mapping and custom file extensions.
- [eslint-plugin-simple-import-sort](https://github.com/lydell/eslint-plugin-simple-import-sort/): Easy autofixable import sorting.

# esbuild

*esbuild*支持两种编译模式：
  - *Transform*：直接编译字符串，不访问文件系统。通常由标准输入传入。
  - *Build*：（必要时）通过文件系统寻找依赖进行编译。通过**传入文件**或**`--bundle`选项**来启用。

```shell
> echo "console.log(hello)" | esbuild --define:hello='"hello world!"'
console.log("hello world");
```
```shell
> esbuild app.tsx --bundle --outdir=.
> ls
app.js
```
```javascript
require('esbuild').build({
  entryPoints: ['app.jsx'],
  bundle: true,
  outfile: 'out.js',
}).catch(() => process.exit(1))
```

| Option        | CLI Option  | Type                 | Example           |
| ------------- | ----------- | -------------------- | ----------------- |
| `entryPoints` | `<file>...` | *string*, *string[]* | `esbuild home.ts` |
| `bundle`      | `--bundle`  | *boolean*            | -                 |

## 打捆源码

`--bundle`

> 顾名思义，将所有引用文件编译到一个文件中。

## 编译入口

`--entry`

*esbuild*编译入口支持：
  - *javascript*
  - *typescript*
  - *jsx*
  - *css*

多入口：

```shell
> esbuild home.ts settings.ts --bundle --outdir=.
> ls
home.js settings.js
```
```shell
> esbuild out1=home.ts out2=settings.ts --bundle --outdir=.
> ls
out1.js out2.js
```

## 内容加载器

`--loader`

*esbuild*[内置*loader*](https://esbuild.github.io/content-types/)：

| content types   | loader       | target          | default enabled extensions    |
| --------------- | ------------ | --------------- | ----------------------------- |
| *javascript*    | *js*         | -               | `.js`,`.cjs`,`.mjs`           |
| *typescript*    | *ts*, *tsx*  | -               | `.ts`, `.tsx`, `.mts`, `.cts` |
| *jsx*           | *jsx*, *tsx* | -               | `.jsx`, `.tsx`                |
| *json*          | *json*       | -               | `.json`                       |
| *css*           | *css*        | -               | `.css`                        |
| *text*          | *text*       | `String`        | `.txt`                        |
| *binary*        | *binary*     | `Unit8Array`    |                               |
| *base64*        | *base64*     | *Base64 String* |                               |
| *data URL*      | *dataurl*    | *Data URL*      |                               |
| *external file* | *file*       | *file name*     |                               |

- *json* 支持**顶级属性**的局部导入，如：

```javascript
import { version } from './package.json'
console.log(version)
```

## 内容替换

### define

> 替换全局标识符（*Global Identifiers*）。

`--define`

支持使用标识符（*Identifier*）或JSON格式的常量（*JSON Syntax Constant*）进行替换：

```shell
# 标识符替换：
> echo "console.log('hello ' + b)" | esbuild --define:b=world
console.log("hello " + world);
# 常量替换：
> echo "console.log('hello ' + b)" | esbuild --define:b='"world"'
console.log("hello world");
```

对象（*Object*）和数组（*Array*）形式的常量将自动产生单独变量，并以变量形式进行替换：

```shell
> echo "let a = o" | esbuild --define:o='{"a":1}'
var a = 1;
var define_o_default = { a };
let a2 = define_o_default;
```

通过间接书写常量，避免转义符号：

```shell
> echo "let a = o" | esbuild --define:o=`node -p "JSON.stringify({a:1})"`
```

注意，不会~~替换局部变量~~：

```shell
> echo "function test() { console.log(hello) }" | esbuild --define:hello=x
function test() {
  console.log(x);
}
> echo "function test(hello) { console.log(hello) }" | esbuild --define:hello=x
function test(hello) {
  console.log(hello);
}
```

### inject

> 引入指定文件中的变量。

`--inject`

```javascript
// process-shim.js
export let process = {
  cwd: () => ''
}
```

```javascript
// entry.js
console.log(process.cwd())
```

```shell
> esbuild entry.js --inject:process-shim.js
var process = {
  cwd: () => ""
};
console.log(process.cwd());

```
