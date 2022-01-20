---
title: Commands
date: 2021-06-26T09:06:35.429Z
---

- [程序类型](#程序类型)
  - [utility](#utility)
  - [facility](#facility)
  - [program](#program)
- [系统数据库](#系统数据库)
- [信息](#信息)
  - [`uname`](#uname)
- [定位](#定位)
  - [`which`](#which)
  - [`type`](#type)
  - [`whatis`](#whatis)
  - [`whereis`](#whereis)
  - [`locate`](#locate)
  - [`command`](#command)
- [搜索](#搜索)
  - [`compgen` (zsh)](#compgen-zsh)
  - [`find`](#find)
- [执行命令](#执行命令)
  - [`sh`](#sh)
  - [`bash`](#bash)
  - [`dash`](#dash)
  - [`command`](#command-1)
- [执行](#执行)
  - [`expr`](#expr)
  - [`xargs`](#xargs)
- [文本处理](#文本处理)
  - [`wc`](#wc)
  - [`head`](#head)
  - [`tail`](#tail)
  - [`cut`](#cut)
  - [`column`](#column)
  - [`sed`](#sed)
  - [`awk`](#awk)
  - [`ed`](#ed)
  - [`grep`](#grep)
- [硬盘](#硬盘)
  - [`df`](#df)
  - [`du`](#du)
  - [`quota`](#quota)
- [文件系统](#文件系统)
  - [`stat`](#stat)
  - [`readlink`](#readlink)
  - [`file`](#file)
  - [`ls`](#ls)
- [进程](#进程)
  - [`ps`](#ps)
  - [`top`](#top)
  - [`kill`](#kill)
  - [`uptime`](#uptime)
  - [`iostat`](#iostat)
- [网络](#网络)
  - [`whois`](#whois)
  - [`netstat`](#netstat)
  - [`host`](#host)
  - [`dig`](#dig)
  - [`ifconfig`](#ifconfig)
  - [`route`](#route)
  - [`arp`](#arp)
  - [`ndp`](#ndp)
- [用户](#用户)
  - [`w`](#w)
  - [`who`, `whoami`](#who-whoami)
  - [`users`](#users)
  - [`finger`](#finger)
  - [`last`](#last)
- [其他](#其他)
  - [`uptime`](#uptime-1)
- [格式化](#格式化)
  - [`strftime`](#strftime)
- [网络工具](#网络工具)
  - [`wget`](#wget)
  - [`curl`](#curl)
  - [`lsof`](#lsof)
- [进程](#进程-1)
  - [`ps`](#ps-1)
  - [`pgrep`](#pgrep)
  - [`pkill`](#pkill)
  - [`kill`](#kill-1)

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

## `uname`

> *Unix name*
- `-m`, *machine* hardware name. e.g. `x86_64`
- `-n`, *node* name，e.g. `xxxMacBook-Air.local`
- `-p`, machine *processor* architecture name. e.g. `i386`
- `-r`, operating system *release*. e.g. `19.5.0`
- `-s`, operating *system* name. e.g. `darwin`
- `-v`, operating system *version*. e.g. `darwin`
- `-a`

# 定位

## `which`

> The which utility takes a list of command names and searches the path for each executable file that would be run had these commands actually been invoked.

## `type`

> For each *name*, indicate how it would be interpreted if used as a command name.

## `whatis`

> search the whatis database for complete words. whatis 在一组包含系统命令简短描述的数据库文件中搜索关键字，并将结果显示在标准输出中。仅显示完整的单词匹配。

## `whereis`

> The whereis utility checks the standard binary directories for the specified programs.

## `locate`

> The locate program searches a database for all pathnames which match the specified pattern.  The database is recomputed periodically (usually weekly or daily), and contains the pathnames of all files which are publicly accessible.

## `command`

# 搜索

## `compgen` (zsh)

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

## `find`

> The find utility recursively descends the directory tree for each path listed, evaluating an expression (composed of the \`\`primaries'' and \`\`operands'' listed below) in terms of each file in the tree.

# 执行命令

## `sh`

> `sh` is a POSIX-compliant command interpreter (shell). It is implemented by re-execing as either bash(1), dash(1), or zsh(1) as determined by the symbolic link located at /private/var/select/sh.  If /private/var/select/sh does not exist or does not point to a valid shell, sh will use one of the supported shells.

## `bash`

> `Bash` is  an sh-compatible command language interpreter that executes commands read from the standard input or from a file.

## `dash`

> `dash` is the standard command interpreter for the system.

## `command`

> Runs command with arguments ignoring any shell function named command. Only shell builtin commands or commands found by searching the PATH are executed.

# 执行

## `expr`

> 执行表达式，并将结果输出到标准输出。

The `expr` utility evaluates expression and writes the result on standard output.

## `xargs`

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

## `wc`

> 统计字节 `wc -c`、字符 `wc -m`、单词 `wc -w`、行 `wc -l` 等。

## `head`

> 获取输入文本的前面多行 `head -n`、或多个字节 `head -c`。

## `tail`

> 获取输入文本的后面多行 `tail -n`、或多个字节 `tail -c`。

- `-f`，当读到 **文件 (FIFO)** （即对`pipe`不生效）末尾的时候不退出程序，若文件继续增长则持续读入。
- `-F`，与`-f`类似，但会检测文件名的变化，若检测到则会关闭并重新打开文件。

## `cut`

> 获取输入文本的行段，字节 `cut -b`、字符 `cut -c`。

cut out selected portions of each line of a file.

- `-d`，指定行段的分隔符，默认是制表符。
- `-f`，指定保留的行段序号，多个行段由逗号分隔。

## `column`

> The column utility formats its input into multiple columns.

```bash
echo "
dkbm:oqyr:qyodd
lzgv:ortz:zyvf
" | cut -d : -f 1,3
# dkbm:qyodd
# lzgv:zyvf
```

## `sed`

> `sed` is a stream editor.  A stream editor is used to perform basic text transformations on an input stream (a file or input from a pipeline).
## `awk`

> Pattern-directed scanning and processing language. `awk` scans each input file for lines that match any of a set of patterns specified literally in prog or in one or more files specified as -f progfile.  With each pattern there can be an associated action that will be performed when a line of a  file  matches the  pattern.

## `ed`

> The `ed` utility is a line-oriented text editor. It is used to create, display, modify and otherwise manipulate text files.
> ( `red` )

## `grep`

> The `grep` utility searches any given input files, selecting lines that match one or more patterns.
> ( `egrep`, `fgrep`, `zgrep`, `zegrep`, `zfgrep` )

<!-- lsvfs(1), quota(1), fstatfs(2), getfsstat(2), statfs(2), getmntinfo(3), compat(5), fstab(5), mount(8), quot(8) -->
# 硬盘

## `df`

> display free disk space.
## `du`

> display disk usage statistics.
## `quota`

> display disk usage and limits

# 文件系统

<!-- file(1), ls(1), lstat(2), readlink(2), stat(2), printf(3), strftime(3) -->
## `stat`

> display file status. Read, write or execute permissions of the named file are not required, but all directories listed in the path name leading to the file must be searchable.
## `readlink`

> same as `stat`, but only for the target of the symbolic link.
## `file`

> determine file type.
## `ls`

> list directory contents.

# 进程

<!-- kill(1), w(1), kvm(3), strftime(3), sysctl(8) -->
<!-- finger(1), ps(1), uptime(1), who(1) -->
<!-- last(1), mesg(1), users(1), getuid(2), utmpx(5) -->
## `ps`

> process status.
## `top`

> display and update sorted information about processes.
## `kill`

> terminate or signal a process.
## `uptime`

> The uptime utility displays the current time, the length of time the system has been up, the number of users, and the load average of the system over the last 1, 5, and 15 minutes.
## `iostat`

> report I/O statistics.

# 网络

## `whois`

> Internet domain name and network number directory service. 域名注册信息查询。

## `netstat`

> show network status.
## `host`

> DNS lookup utility.
## `dig`

> DNS lookup utility.
## `ifconfig`

> The ifconfig utility is used to assign an address to a network interface and/or configure network interface parameters.
## `route`

> manually manipulate the routing tables.
## `arp`

> The arp utility displays and modifies the Internet-to-Ethernet address translation tables used by the address resolution protocol.
## `ndp`

> control/diagnose IPv6 neighbor discovery protocol.

# 用户

## `w`

> display who is logged in and what they are doing.
## `who`, `whoami`

> display who is logged in.
## `users`

> list current users.
## `finger`

> The finger utility displays information about the system users.
## `last`

> list the sessions of specified users, ttys, and hosts, in reverse time order.

# 其他

## `uptime`

# 格式化

## `strftime`

> format date and time.

# 网络工具

## `wget`

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

## `curl`

- 下载文件并以url中的文件名存储：`curl https://xxx -O`
- 下载文件并以header中指定的文件名存储：`curl https://xxx -J`

## `lsof`

# 进程

## `ps`

> *process status*

- `-c`: *command* 列只显示进程的可执行文件，而不是进程启动的完整命令
- `-d`: 只显示当前会话（用户）启动的进程

- 通过*grep*筛选时不显示*grep*进程本身：`ps aux | grep [n]ginx`, `ps aux | grep nginx | grep -v grep`

## `pgrep`

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

## `pkill`

> 向进程发送信号（`kill` 需要知道 *pid*），与`pgrep`部分参数相同。

- `-signal <signal>`: 向进程发送信号

## `kill`

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
