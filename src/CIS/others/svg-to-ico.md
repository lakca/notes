---
title: 通过SV G等创建logo文件（ico文件）
date: 2021-04-14T07:51:27.822Z
---

- [生成Icon文件（.svg, .png, .ico, .icns）](#生成icon文件svg-png-ico-icns)
  - [`SVG` 转 `.ico`/`.icns`](#svg-转-icoicns)
    - [NodeJS:](#nodejs)
  - [`PNG` 转 `.icns`](#png-转-icns)
    - [MacOS](#macos)
    - [NodeJS](#nodejs-1)
    - [Python](#python)
  - [`PNG` 转 `.ico`](#png-转-ico)
    - [Python:](#python-1)
    - [NodeJS:](#nodejs-2)
  - [`SVG` 转 `PNG`](#svg-转-png)
    - [Python:](#python-2)
    - [NodeJS:](#nodejs-3)

# 生成Icon文件（.svg, .png, .ico, .icns）

## `SVG` 转 `.ico`/`.icns`

### NodeJS:

[svg-app-icon](https://www.npmjs.com/package/svg-app-icon)，推荐。

`npx svg-app-icon < logo.svg`

## `PNG` 转 `.icns`

### MacOS

使用官方提供，系统自带工具 `sips` 和 `iconutil`。

1. 通过 `sips` 生成不同大小 `png` 文件，放在同一文件夹

```bash
sips -z 16 16     icon.png --out iconset/icon_16x16.png
sips -z 32 32     icon.png --out iconset/icon_16x16@2x.png
sips -z 32 32     icon.png --out iconset/icon_32x32.png
sips -z 64 64     icon.png --out iconset/icon_32x32@2x.png
sips -z 128 128   icon.png --out iconset/icon_128x128.png
sips -z 256 256   icon.png --out iconset/icon_128x128@2x.png
sips -z 256 256   icon.png --out iconset/icon_256x256.png
sips -z 512 512   icon.png --out iconset/icon_256x256@2x.png
sips -z 512 512   icon.png --out iconset/icon_512x512.png
sips -z 1024 1024 icon.png --out iconset/icon_512x512@2x.png
```

2. 通过 `iconutil` 使用上述 `png` 生成 `icns` 文件

```bash
iconutil -c icns iconset -o logo.icns
```

### NodeJS

[@fiahfy/icns-convert](https://www.npmjs.com/package/@fiahfy/icns-convert)，可以直接从单张 `.png` 生成 `.icns` 文件，推荐。

### Python

1. 通过 `pillow`（仅支持在 *MacOS* 直接生成 `icns` 文件）生成 `png`

```py
from PIL import Image

with Image.open('icon.png') as icon:
    icon.save('iconset/icon_16x16.png', size=(16, 16))
    icon.save('iconset/icon_16x16@2x.png', size=(32, 32))
    icon.save('iconset/icon_32x32.png', size=(32, 32))
    icon.save('iconset/icon_32x32@2x.png', size=(64, 64))
    icon.save('iconset/icon_128x128.png', size=(128, 128))
    icon.save('iconset/icon_128x128@2x.png', size=(256, 256))
    icon.save('iconset/icon_256x256.png', size=(256, 256))
    icon.save('iconset/icon_256x256@2x.png', size=(512, 512))
    icon.save('iconset/icon_512x512.png', size=(512, 512))
    icon.save('iconset/icon_512x512@2x.png', size=(1024, 1024))
```

2.

## `PNG` 转 `.ico`

### Python:

`pillow`：

```py
from PIL import Image

with Image.open('icon.png') as icon:
    icon.save('icon.ico', size=(128, 128)) # 大小根据需求自行调整
```

### NodeJS:

[@shockpkg/icon-encoder](https://www.npmjs.com/package/@shockpkg/icon-encoder)

## `SVG` 转 `PNG`

### Python:

`cairosvg`：

```bash
# 安装 cairosvg
pip install cairosvg

# 直接在命令行调用
cairosvg
  -f png # 输出 png 格式
  --output-width 1024 # 输出图片宽度
  --output-height 1024 # 输出图片高度
  -o icon.png # 输出文件名
  -W 100 # svg 文件宽度，viewBox
  -H 100 # svg 文件高度
  icon.svg # 指定 svg 文件
```

### NodeJS:

[`sharp`](https://www.npmjs.com/package/sharp)
