

# Base64
> 以**64个可打印字符**：`A-Za-z0-9+/`来**表示二进制数据**的方法。

## 规则

1. 将原始二进制数据编成字节数组；
2. 数组以3字节（24位）为一组；
3. 每组再按6位（64）为一段，若最后一段不足6位，以`0`填充低位，若不够4段，则记录缺少段数；
4. 每段前以`00`填充高位，凑齐1个字节；
5. 将上述字节用`A-Za-z0-9+/`对应顺序的符号进行替换编码；
6. 最后在编码后的字符串后面填充与第3步中缺少的段数相同数量的`=`；

如：（以下方法未经优化，以讲解步骤为要）

```javascript
const scheme = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
// ascii
function toBytes(text) {
	return text.split('').map(e => {
		const byte = e.charCodeAt(0).toString(2)
		return new Array(8 - byte.length).fill('0').join('') + byte
	})
}
function base64(text) {
	const bytes = toBytes(text)
	const groups = [[]]

	// 分组
	for (const byte of bytes) {
		if (groups[groups.length - 1].length < 3) {
			groups[groups.length - 1].push(byte)
		} else groups[groups.length] = [byte]
	}
	let padding = 0 // 这里有个取巧的方法：3 - groups[groups.length - 1].length

	let encoded = ''
	for (const group of groups) {
		// 分段
		const segments = group.join('').match(/\d{1,6}/g)
		// 最后一组可能会出现段数不足的情况：
	    if (group.length < 3) {
		    // 也可能会出现最后一段不够位数（6）的情况：
		    segments[segments.length - 1] += new Array(6 - segments[segments.length - 1].length ).fill('0').join('')
		    padding = 4 - segments.length
		}
		encoded += segments.map(e => scheme[parseInt(e, 2)]).join('')
	}
	// 缺段补=，方便解码
	encoded += new Array(padding).fill('=')
	return encoded
}

base64('Many hands make light work.')
// TWFueSBoYW5kcyBtYWtlIGxpZ2h0IHdvcmsu
```

# Base62x

> 无符号（去掉`+/`）版本。
