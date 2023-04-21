---
date: 2022-07-05T14:59:01+08:00
title: unicode
---

# Unicode

> 统一编码

# UTF-8

> *Universal Character Set/Unicode Transformation Format*，用1至4个字节不定长度编码unicode的（存储）编码方案，作为UTF-32和UTF-16的中和方案，优势在于既有足够大（2^7 + 2^11 + 2^16 + 2^21 等于 2,164,864）的字符编码范围、又占用相对少的存储空间、且具有很好的容错性、又与ASCII相容，但由于不定长，编解码性能相对会差。

编码方式：
```
0xxxxxxx
110xxxxx 10xxxxxx
1110xxxx 10xxxxxx 10xxxxxx
11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
```

```javascript
function pad(str, len) {
    while (len > str.length) {
        str = '0' + str
    } return str
}

function utf8(char) {
    let code = char.charCodeAt(0)
    const codes = []
    if (code > 0b1111111) {
        do {
            codes.unshift(code & 0b111111)
            if (code < 1) break
        } while (code >>>= 6)
        codes[0] = pad('1'.repeat(codes.length) + '0' + pad(codes[0].toString(2), 7 - codes.length))
        for (let i = 1; i < codes.length; i++) {
            codes[i] = '10' + pad(codes[i].toString(2), 6)
        }
    } else {
        codes.push('0' + pad(code.toString(2), 7))
    }
    return codes
}
```
