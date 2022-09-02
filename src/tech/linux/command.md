---
title: Commands
date: 2021-06-26T09:06:35.429Z
---

# 程序类型

## utility
## facility
## program

# 系统数据库

- `/etc/hosts`
- `/etc/networks`
- `/etc/protocols`
- `/etc/services`
- `/etc/paths`
- `/etc/manpaths`
- `/etc/shells`
- `/etc/ttys`

# 信息

## uname

> *Unix name*
- `-m`, *machine* hardware name. e.g. `x86_64`
- `-n`, *node* name，e.g. `xxxMacBook-Air.local`
- `-p`, machine *processor* architecture name. e.g. `i386`
- `-r`, operating system *release*. e.g. `19.5.0`
- `-s`, operating *system* name. e.g. `darwin`
- `-v`, operating system *version*. e.g. `darwin`
- `-a`

## uptime

# 定位

## which

> The which utility takes a list of command names and searches the path for each executable file that would be run had these commands actually been invoked.

## type

> For each *name*, indicate how it would be interpreted if used as a command name.

## whatis

> search the whatis database for complete words. whatis 在一组包含系统命令简短描述的数据库文件中搜索关键字，并将结果显示在标准输出中。仅显示完整的单词匹配。

## apropos

## whereis

> The whereis utility checks the standard binary directories for the specified programs.

## locate

> The locate program searches a database for all pathnames which match the specified pattern.  The database is recomputed periodically (usually weekly or daily), and contains the pathnames of all files which are publicly accessible.

## command

# 搜索

## compgen (zsh)

> Display the possible completions depending on the options. 显示命令补全列表。

- `-a`, *alias*
- `-b`, *builtin*
- `-c`, *command*
- `-d`, *directory*
- `-e`, *export*
- `-f`, *file*
- `-g`, *group*
- `-j`, *job*
- `-k`, *keyword*
- `-u`, *user*
- `-v`, *variable*

## find

> 选项中的数字参数（`n`）前可带上加减号（`+`,`-`），表示超过和少于。

操作符选项：

> 操作符用于修饰选项。

- `()`
- `-not|! <expression>`
- `-true`
- `-false`
- `<expression> -or <expression>`
- `<expression> -and <expression>`

```shell
> find / \! -name "*.c" -print

> find / \( -newer ttt -or -user wnj \) -print
```

其他选项：

- `-E`：`-regex`/`-iregex` 支持扩展正则表达式

- `-print0`：以 `NUL` 分割返回的条目，可以配合 `xargs -0` 使用

- `-prune`：排除当前文件

遍历方式：

- `-d`：深度优先遍历

- `-depth <n>`：遍历深度

- `-maxdepth <n>`：最大遍历深度

- `-mindepth <n>`：最小遍历深度

- `-s`：按字母顺序遍历

针对基础属性：

- `-name <pattern>`，`-iname <pattern>`：指定文件名称的模式

- `-lname <pattern>`，`-ilname <pattern>`：指定文件名称的模式，遇到软链接以源文件代替

- `-path/-wholename <pattern>`，`-ipath/-iwholename <pattern>`：指定路径名的模式

- `-regex <pattern>`，`-iregex`：使用正则表达式指定路径匹配的模式

- `-size <n><unit>`：文件大小（四舍五入）
  - 单位可以是 B `c`、KB `k`、MB `M`、GB `G`、TB `T`、PB `P`
  - 如 `-size -1M -and -size +1k`

- `-type <type>`：文件类型
  - 类型可以是块文件 `b`、字符文件 `c`、目录 `d`、常规文件 `f`、软链接 `l`、FIFO `p`、套接字 `s`）

- `-xattr`，`-xattrname <name>`：文件是否有扩展属性（扩展属性是由程序定义的，区别于系统固定属性）

- `-inum <n>`：指定inode

- `-empty`：找出内容为空的文件/文件夹

针对时间：

- `-Btime/-atime/-ctime/-mtime n[smhdw]`：文件的相关时间与当前时间间隔。
  - 时间类型 `Bacm` 分别表示创建时间、上次访问时间、上次改变时间、上次修改时间；
  - 单位 `smhdw` 分别表示秒、分、时、天、周；
  - 时间可以组合，如`-Btime -1h30m`；

- `-newerXY <file>`：文件的相关时间（`X`）晚于`file`的相关时间（`Y`）。
  - `X`、`Y` 取值范围为 `Bacm`，如`-newercB demo.txt`；
  - `Y` 值还可以是 `t`，表示参数 `file` 为时间，如`-newerct 1 minute ago`；

- `-newerXt <time>`：文件的相关时间（`X`）晚于`time`。
  - `X`、`Y` 取值范围为 `Bacm`；
  - 如`-newerct 1 minute ago`；

- `-newer <file>`：同 `-newermm <file>`

针对权限：

- `-perm [+|-]mode`：指定权限模式
  - 前缀 `+` 表示 `mode` 中任一位数与文件的该位相同即可；
  - 前缀 `-` 则表示指定的所有位数须全部相同。

- `-gid/-group <gname>`：所属组

- `-uid/-user <uname>`：所属用户

- `-nogroup`，`-nouser`：文件的组、用户未知

针对文件链接：

- `-L`：软链接显示其链接的源文件信息

- `-P`：软链接返回链接本身信息（这是默认行为）

- `-links <n>`：指定文件有n个链接（软链接和硬链接）

- `-samefile <file>`：指定文件是 `file` 的硬链接，如果指定了 `-L`，则是软链接。

执行命令：

- `-delete`：删除找到的文件

- `-exec <utility> [arguments...] ;`：在**当前工作目录**为找到的每个文件逐个执行命令。
  - 参数中使用 `{}` 指代当前找到的文件，如 `-exec echo {}\;`

- `-exec <utility> [arguments...] +`：同上，但将所有找到的文件作为整个参数执行一次命令。
  - 如 `-exec echo {} +`

- `-execdir ...`：同 `-exec ...`，但在**文件所在目录**执行命令。

- `-ok/-okdir ...`：同`-exec/-execdir ...`，但在执行命令前会请求用户确认。

## grep

# 执行脚本

## sh

> `sh` is a POSIX-compliant command interpreter (shell). It is implemented by re-execing as either bash(1), dash(1), or zsh(1) as determined by the symbolic link located at /private/var/select/sh.  If /private/var/select/sh does not exist or does not point to a valid shell, sh will use one of the supported shells.

## bash

> `Bash` is  an sh-compatible command language interpreter that executes commands read from the standard input or from a file.

## dash

> `dash` is the standard command interpreter for the system.

## command

> Runs command with arguments ignoring any shell function named command. Only shell builtin commands or commands found by searching the PATH are executed.

# 执行

## expr

> 执行表达式，并将结果输出到标准输出。

The `expr` utility evaluates expression and writes the result on standard output.

## xargs

> 将管道输入解析为参数用于执行命令，参数列表通过使用 *space*, *tab*, *newline*, *eof* 等符号切割得到。

*Execute a command with piped arguments coming from another command, a file, etc. The input is treated as a single block of text and split into separate pieces on spaces, tabs, newlines and end-of-file.*

- `-0`: 指定参数分隔符为空字符（*NUL (``\0'')*），一般配合 `find` 带 `-print0` 选项使用；如 `find . -name '*.backup' -print0 | xargs -0 rm -v`
- `-E <eofstr>`: 指定逻辑EOF
- `-n <number>`: 指定每次执行程序使用的参数个数；如 `echo 1 2 3 | xargs -n 1 echo`
- `-J <placeholder>`: 通过使用占位符，把输入整体作为一个参数（不进行切割）传入指定位置；如 `ls -1d [A-Z]* | xargs -J % cp -rp % destdir`
- `-I <placeholder>`: 通过使用占位符，自定义每个参数位置；如 `ls | xargs -I _ echo _ is a filename`
- `-R <holder_count>`: 指定 `-I` 选项执行替换的最大次数
- `-P <maxprocs>`: 指定程序最大并行数量；
- `-s <bytes>`: 指定程序命令行的最大字节数；
- `-o`: 在程序执行之前将输入重新用 */dev/tty* 打开，对执行的是交互式程序会很有用；如 `echo console.log('hello!') | xargs -o node`
- `-t`: 在每次执行程序前打印命令；
- `-p`: 在每次执行程序前打印命令并询问是否执行；

- 删除文件：`find . -name '*.backup' -print0 | xargs -0 rm -v`

# 文本处理

## tr

> *Translate Characters*：一一对应地替换字符集，或删除字符集。

- `tr <from_charset> <to_charset>`，替换字符集。如 `tr a-z A-Z <<< hello` 输出 `HELLO`
- `tr -d <charset>`，删除字符集。
- `tr -s <charset>`，压缩（*Squeeze*）连续重复的字符集。如 `tr -s l <<< hello` 输出 `helo`
- `tr -C <charset>`，`<from_charset>` 取 *from_charset* 的字符补集（*Complement*）。如 `tr -Cd '[:alpha:]' <<< hello!` 输出 `hello`

特殊字符集：

```
[:class:]  Represents all characters belonging to the defined character class.  Class names are:

          alnum        <alphanumeric characters>
          alpha        <alphabetic characters>
          blank        <whitespace characters>
          cntrl        <control characters>
          digit        <numeric characters>
          graph        <graphic characters>
          ideogram     <ideographic characters>
          lower        <lower-case alphabetic characters>
          phonogram    <phonographic characters>
          print        <printable characters>
          punct        <punctuation characters>
          rune         <valid characters>
          space        <space characters>
          special      <special characters>
          upper        <upper-case characters>
          xdigit       <hexadecimal characters>
```

## wc

> *Word Count*：统计字节 `wc -c`、字符 `wc -m`、单词 `wc -w`、行 `wc -l` 等。

## head

> 获取输入文本的前面多行 `head -n`、或多个字节 `head -c`。

## tail

> 获取输入文本的后面多行 `tail -n`、或多个字节 `tail -c`。

- `-f`，当读到 **文件 (FIFO)** （即对`pipe`不生效）末尾的时候不退出程序，若文件继续增长则持续读入。
- `-F`，与`-f`类似，但会检测文件名的变化，若检测到则会关闭并重新打开文件。

## uniq

> 重复行去重。(*report or filter out repeated lines in a file*)

## sort

> 排序或者合并文本行。（sort or merge records (lines) of text and binary files.）

- `-u/--unique`, 保留唯一行（去重）；
- `-s`, 稳定排序，即保持重复行的原始顺序；
- `-m/--merge`: 只合并；

## cut

> 获取输入文本的行段，字节 `cut -b`、字符 `cut -c`。

cut out selected portions of each line of a file.

- `-d`，指定行段的分隔符，默认是制表符。
- `-f`，指定保留的行段序号，多个行段由逗号分隔。

## column

> The column utility formats its input into multiple columns.

```bash
echo "
dkbm:oqyr:qyodd
lzgv:ortz:zyvf
" | cut -d : -f 1,3
# dkbm:qyodd
# lzgv:zyvf
```

## less

> 交互式阅读文件，可以搜索、翻页等

- 显示行号：`-N`
- 连续空行显示为一行：`-s`
- *tab*显示为空格：`-x <N>`
- 输出保存到文件：`-o <file>`

## sed

> [sed](https://www.gnu.org/software/sed/manual/sed.html)：流编辑器。(*stream editor for filtering and transforming text.*）

```shell
sed
  (
    -e <script>, --expression=<script>

    | -f <script-file>, --file=<script-file>

    | <script>
  )

  # 对`l`命令，指定换行长度
  [-l <N>, --line-length=<N>]

  [-r, --regexp-extended]

  # 把输入的每个文件都看成单独的流，而不是一个连续流
  [-s, --separate]

  # 以 NUL 分割行
  [-z, --null-data]

  [--follow-symlinks]

  # 最小化加载数据量，输出更频繁
  [-u, --unbuffered]

  [-n, --quiet, --silent]

  <input-file>...
```

## awk

> Pattern-directed scanning and processing language. `awk` scans each input file for lines that match any of a set of patterns specified literally in prog or in one or more files specified as -f progfile.  With each pattern there can be an associated action that will be performed when a line of a  file  matches the  pattern.

## ed

> The `ed` utility is a line-oriented text editor. It is used to create, display, modify and otherwise manipulate text files.
> ( `red` )

## grep

> The `grep` utility searches any given input files, selecting lines that match one or more patterns.
> ( `egrep`, `fgrep`, `zgrep`, `zegrep`, `zfgrep` )

<!-- lsvfs(1), quota(1), fstatfs(2), getfsstat(2), statfs(2), getmntinfo(3), compat(5), fstab(5), mount(8), quot(8) -->
# 硬盘

## df

> display free disk space.

## du

> display disk usage statistics.

## quota

> display disk usage and limits

# 文件系统

<!-- file(1), ls(1), lstat(2), readlink(2), stat(2), printf(3), strftime(3) -->

## stat

> display file status. Read, write or execute permissions of the named file are not required, but all directories listed in the path name leading to the file must be searchable.

## readlink

> same as `stat`, but only for the target of the symbolic link.

## file

> determine file type.

## ls

> list directory contents.

- `-a`：包含名称以`.`开始的文件
- `-l`：长结果
- `-1`：每项独占一行
- `-i`：显示inode
- `-r`: 反向排序
- `-R`: 递归子目录
- `-S`：按文件大小排序
- `-t`：时间排序（默认为修改时间）
- `-T`：显示完整时间
- `-u`：用文件访问时间替代修改时间
- `-U`：用文件创建时间替代修改时间
- `-c`：用文件上次改变时间替代修改时间
- `-p`：在目录结尾显示斜杠`/`
- `-P`：显示软链接，而非其链接的文件
- `-n`：显示用户ID，而非名字
- `-F`：在项目后添加额外符号：文件夹`/`、可执行文件`*`、符号链接`@`、Socket`=`、whiteout`%`、FIFO`|`
- `-w`：强制显示不可打印字符原始值

## lsof

> list open files.

# 进程

<!-- kill(1), w(1), kvm(3), strftime(3), sysctl(8) -->
<!-- finger(1), ps(1), uptime(1), who(1) -->
<!-- last(1), mesg(1), users(1), getuid(2), utmpx(5) -->

## ps

> process status.

## top

> display and update sorted information about processes.

## kill

> terminate or signal a process.

## uptime

> The uptime utility displays the current time, the length of time the system has been up, the number of users, and the load average of the system over the last 1, 5, and 15 minutes.

## iostat

> report I/O statistics.

# 网络

## whois

> Internet domain name and network number directory service. 域名注册信息查询。

## netstat

> show network status.

## host

> DNS lookup utility.

## dig

> DNS lookup utility.

## ifconfig

> The ifconfig utility is used to assign an address to a network interface and/or configure network interface parameters.

## route

> manually manipulate the routing tables.

## arp

> The arp utility displays and modifies the Internet-to-Ethernet address translation tables used by the address resolution protocol.

## ndp

> control/diagnose IPv6 neighbor discovery protocol.

# 用户

## w

> display who is logged in and what they are doing.

## who, whoami

> display who is logged in.

## users

> list current users.

## finger

> The finger utility displays information about the system users.

## last

> list the sessions of specified users, ttys, and hosts, in reverse time order.

# 格式化

## strftime

> format date and time.

# 网络工具

## wget

- `-p`, `--page-requisites`: 把用于显示页面的必要的静态文件也下载，如js/css/图片/音频/视频等
- `-E`, `--adjust-extension`: 如果地址中没有(html/xml)文件后缀名，则下载的文件自动加上
- `-k`, `--convert-links`: 把页内链接转换成相对链接
- `-np`, `--no-parent`: 不递归到上级目录
- `-H`, `--span-hosts`: 扩展到（获取）域外资源，比如cdn，可以结合 `--domains` 使用。
- `-m`, `--mirror`: 镜像模式。会自动递归、并且打上时间戳（用于后续再次执行时更新本地文件）
- `-L`, `--relative`: 只追踪相对路径的链接
- `-P <prefix>`, `--directory-prefix=<prefix>`: 本地根目录，默认为 `.`
- `-I <list>`, `--include-directories=<list>`: 指定需要追踪的网站目录
- `-X <list>`, `--exclude-directories=<list>`: 指定不要追踪的网站目录
- `-D <domains>`, `--domains=<domains>`: 指定需要追踪的域名，多个以逗号隔开
- `--exclude-domains <domains>`: 指定不要追踪的域名，多个以逗号隔开。（注意，选项与参数之间没有等号）
- `--follow-tags=<tags>`: 指定需要追踪的html标签，多个以逗号隔开
- `--ignore-tags=<tags>`: 指定不要追踪的html标签，多个以逗号隔开
- `-A <list>`, `--accpet <list>`: 通过通配符或者扩展名过滤文件，多个模式以逗号隔开。如 `-A png,jpg`
- `-R <list>`, `--reject <list>`: 通过通配符或者扩展名过滤文件，多个模式以逗号隔开。如 `-R '*.log,*abc'`
- `--accpet-regex <urlregex>`
- `--reject-regex <urlregex>`
- `--regex-type <typeregex>`
- `--random-wait`
- `-w <seconds>`, `--wait=<seconds>`
- `--restrict-file-names=<modes>`: 转义URL中在对应模式下受限制的字符（用于本地存储文件名），包括 `unix, windows, nocontrol, ascii, lowercase, uppercase`。比如 `--restrict-file-names=windows`

使用：

- 下载文件并解压缩：`wget -qO- https://xxx | tar xvf - -C dist`
- 下载网站：`wget --mirror --convert-links --adjust-extension --page-requisites --no-parent -e robots=off --reject 'zip,gz,xz,msi,exe,pkg,iso,mp4,mp3,mov' https://nodejs.org/en/docs`

## curl

- 下载文件并以url中的文件名存储：`curl https://xxx -O`
- 下载文件并以header中指定的文件名存储：`curl https://xxx -J`

## lsof

# 进程

## ps

> *process status*

- `-c`: *command* 列只显示进程的可执行文件，而不是进程启动的完整命令
- `-d`: 只显示当前会话（用户）启动的进程

- 通过*grep*筛选时不显示*grep*进程本身：`ps aux | grep [n]ginx`, `ps aux | grep nginx | grep -v grep`

## pgrep

> *pgrep, pkill -- find or signal processes by name*
> 通过进程名称搜索进程，并返回进程ID（*pid*）；或向进程发送信号（*signal*）。

- `<porcess_name>`
- `-f`: 匹配完整命令（包括参数），如 `pgrep -f 'nginx -c nginx.s1.conf`
- `-a`: 包含祖先进程
- `-n`: 只显示最近启动的
- `-o`: 只显示最早启动的
- `-v`: 返回未匹配到的
- `-x`: 需要精确匹配，默认是模糊匹配（*substring*）
- `-d <delim>`: 设置进程ID的分隔符，默认是换行符
- `-F <piffile>`: 只搜索pid存在指定文件中的进程
- `-P <ppid>`: 指定父进程ID（*ppid*）
- `-u <uid>`: 指定用户ID（*uid*），如 `pgrep -u root nginx`

## pkill

> 向进程发送信号（`kill` 需要知道 *pid*），与`pgrep`部分参数相同。

- `-signal <signal>`: 向进程发送信号

## kill

> *terminate or signal a/some process*，通过 *pid* 向进程发送信号。

- `-signal_name, -s <signal_name>`: 如 `kill -s KILL <pid>`, `kill -KILL <pid>`
- `-signal_number`: 如 `kill -9 <pid>`

一些信号：

1  HUP (hang up)
2  INT (interrupt)
3  QUIT (quit)
6  ABRT (abort)
9  KILL (non-catchable, non-ignorable kill)
14 ALRM (alarm clock)
15 TERM (software termination signal)
