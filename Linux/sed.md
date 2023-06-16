---
title: '`sed`-文本处理'
date: 2020-09-14T07:18:08.540Z
---

# sed

> 流处理器，用于过滤或转换文本内容。

用法：`sed <options> <addresses><commands> <file>`

## 模式空间（*Pattern Space*）和保持空间（*Hold Space*）

简而言之，模式空间是用来存储脚本（expression）当前的输入输出，而保持空间是一个缓存空间，用于临时交换数据。

sed是从输入流循环地读取一行处理一轮的，当需要同时处理多行的时候就需要一些高级操作，甚至使用保持空间。

## options:

- `-n`, `--quiet`, `--silent`: 抑制自动打印*模式空间*（见[How `sed` Works](https://www.gnu.org/software/sed/manual/sed.html#Execution-Cycle)）

- `-e <script>`, `--expression=<script>`: （顺序执行，可以多次添加）添加sed脚本

- `-f <script-file>`, `--file=<script-file>`: 作用同上，指定脚本文件

- `-i[SUFFIX]`, `--in-place[=SUFFIX]`: 修改操作默认只会应用到输出中，加上该选项会同时包括输入（源文件）。若提供`[SUFFIX]`，将会自动备份源文件

- `--follow-symlinks`: 如果输入文件是一个符号链接，则修改操作对源文件生效

- `-r`, `--regexp-extended`: 使用扩展正则表达式，见[Extended regular expressions](https://www.gnu.org/software/sed/manual/sed.html#ERE-syntax)

- `-u`, `--unbuffered`: 尽可能少地加载输入，尽可能快（频繁）地输出处理结果

- `-z`, `--null-data`: 使用`NUL`作为行分隔符

## addresses:

- `1`: 第1行

- `1!`: 非第1行。在addresses后面加上`!`，表示反义

- `1,10`: 第1行到第10行

- `1,$`: 第1行到最后一行。`$`表示最后一行

- `/<regexp>/`: 匹配`<pattern>`的行

## commands：

- `{cmd; cmd...}`: 聚合多个命令

  - 如：`n;p`，打印偶数行

- `=`: 打印当前行号

- `p`（*print*）: 打印*Pattern*内容

- `P`: 打印*Pattern*第一个换行（newline）后的内容

- `l`（*list*）: 以*list*的方式（显示不可见字符）打印*Pattern*内容

- `n`（*next*）: 读入下一行替换*Pattern*内容

- `N`: 向*Pattern*追加一个换行（newline）和读入下一行内容

- `z`（*zap*）: 清空*Pattern*

- `d`（*delete*）: 删除*Pattern*内容

- `D`: 当*Pattern*有多个换行（newline）时，循环进行分别处理

- `s/<regexp>/<replacement>/[flags]`（*substitute*）: 搜索并替换*Pattern*内容

- `y/<src>/<dst>/`: 使用`<dst>`中的字符一一替换遇到的`<src>`中的字符

- `a\<NL><text>`（*append*）: 向行尾（即换行符后）追加内容`<text>`。其中`<NL>`表示换行符，另外，GNU扩展可以省略`\<NL>`。

  - 如：`'1a\'$'\n''hello world'$'\n'`，在第一行尾追加一行`hello world`

- `i\<NL><text>`（*insert*）: 向行首追加内容`<text>`

- `c\<NL><text>`（*change*）: 更改行内容

- `r <filename>`（*read*）: 向行后追加`<filename>`的内容

  - 如：`1rdemo.txt`，将`demo.txt`的内容追加到第一行后

- `R <filename>`: 向行后追加`<filename>`*一行*（从头开始，每次该命令读一行）内容

  - 如: `-e '1Rdemo.txt' -e '1Rdemo.txt'`，追加从`demo.txt`读取的两行内容

- `w <filename>`（*write*）: 将*Pattern*内容写入`<filename>`

- `W <filename>`: 将*Pattern*内容的第一行写入`<filename>`

- `e`（*eval*）: 将*Pattern*内容作为命令进行执行，并用输出替换*Pattern*内容

- `e <command>`: 以*Pattern*内容作为`<command>`参数进行执行

  - 如，`e ls`

- `F`: 打印当前输入文件的文件名

- `q[exit-code]`: 退出脚本

- `Q[exit-code]`: 同`q`，但会抑制打印*Pattern*内容

### 模式空间和保持空间的操作：

- `x`（*exchange*）: 交换*Pattern*和*Hold*内容

- `g`: 使用*Hold*内容替换*Pattern*内容

- `G`: 向*Pattern*追加一个换行（newline）和*Hold*内容

- `h`: 使用*Pattern*内容替换*Hold*内容

- `H`: 向*Hold*追加一个换行（newline）和*Pattern*内容

### 标签

- `:<label>`: 创建标签

- `t <label>`: 执行替换（`s`）有成功的时候或读入最后一行时，跳转到`<label>`

- `T <label>`: 执行替换（`s`）均失败或读入最后一行时，跳转到`<label>`

- `b <label>`: 无条件地跳转到`<label>`，如果未提供`<label>`则开始下一轮
