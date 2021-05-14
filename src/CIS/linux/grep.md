
> 如果没有指定文件，则使用标准输入作为搜索内容。

退出状态：
- `0`: One or more lines were selected.
- `1`: No lines were selected.
- `>1`: An error occurred.

- 搜索递归子目录：`-r`, `-R`, `--recursive`
- 搜索指定多个匹配模式（正则表达式）：`-e <pattern>`, `--regexp=`
  - 默认情况下，不加选项时，只有一个匹配模式：`grep ... <pattern> <file>`
  - 当有多个匹配模式时，通过该选项完成：`grep -e <pattern1> -e <pattern2> <pattern3> <file>`
- 搜索使用扩展正则表达式（force grep to behave as `egrep`）：`-E <pattern>`, `--extended-regexp=`
- 搜索使用纯字符串匹配（force grep to behave as `fgrep`）：`-F`, `--fixed-strings`
- 搜索使用解压缩匹配（force grep to behave as `zgrep`, `zegrep`, `zfgrep`）：`-Z`, `-z`, `--decompress`
- 搜索限制最大匹配数（停止匹配）：`-m <num>`, `--max-count=<num>`
- 搜索返回模式没有匹配到的行：`-v`, `--invert-match`
- 搜索包括/排除文件（包括子目录）：`--include=`, `--exclude=`
- 搜索包括/排除目录（包括子目录）：`--include-dir=`, `--exclude-dir=`
  - 多个模式如：`--exclude-dir={pattern1, pattern2...}`
- 搜索忽略大小写：`-i`
- 搜索忽略二进制文件：`-I`
- 搜索二进制文件：`-U`, `--binary`
- 搜索不包括符号链接目录（如果递归搜索的话）（默认）：`-P`
- 搜索包括符号链接目录（如果递归搜索的话）（默认）：`-S`
- 输出中只包含模式匹配到的内容（默认显示整行）：`-o`, `--only-matching`
- 输出中包含匹配行的后续多行：`-A <num>`, `--after-context=<num>`
- 输出中包含匹配行的前面多行：`-B <num>`, `--before-context=<num>`
- 输出中包含匹配行的前后多行：`-C <num>`, `--context=<num>`
- 输出中包含文件行：`-n`, `--line-number`
- 输出中包含文件偏移字节（距离文件开始）：`-b`, `--byte-offset`
- 输出中只匹配到的文件（默认）：`-l`, `--files-with-match`
- 输出中只未匹配到的文件：`-L`, `--files-without-match`
- 输出中包含文件名（默认）：`-H`
- 输出中只包含每个文件匹配到的次数：`-c`, `--count`
- 输出中不显示文件名：`-h`, `--no-filename`
- 控制输出的颜色：`--color=<never|always|auto>`, `--colour=`
- 控制针对目录的行为：`-d <read|skip|recurse>`, `--directories=`
- 控制针对设备、FIFOs和Sockets的行为：`-D <read|skip>`, `--devices=`

常见用法示例：

```sh
grep --exclude-dir={node_modules,dist} -onr <pattern> .
```
