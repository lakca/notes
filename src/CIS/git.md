---
title: Git
date: 2021-03-22T07:01:30.074Z
---

# 前言

1. 以下所有内容基本都可以在[官方英文文档](officialDoc)找到，若感觉到有描述不清晰的地方，建议通过查看[官方英文文档](officialDoc)以了解准确含义。
2. 对于有些词汇，比起中文翻译来说，使用英文原词汇会表达得更为直接准确。例如：`add`比`添加`就更准确直观，因为`add`在语境中是被特化的，就是指将文件从工作区添加到索引区的这一动作；也比`添加到暂存区`或者`添加到索引区`更为简洁直观。

# 基本概念

## 简化的git的工作过程

1. `local repository`
   1. `working directory`；
   2. 通过`add`命令，让`git`保存`working directory`的`snapshot`；
   3. 通过`commit`命令，把`snapshot`保存到`local repository`；
2. `append to remote repository`
   1. 通过`push`命令，将本地仓库的`commit history`同步到`remote repository`；
## 工作区（working directory / working tree）

> `working directory`，可以简单理解为排除了特定目录（如`./.git`）或文件的`git`项目文件夹（`git project folder with certain directories/files excluded`）;

## 索引区 (index / staging area)

> `staging area`，实际上是保存了一份`working directory`的当前快照（snapshot）；
> `staging area`对应的是`.git/index`二进制文件，切换分支时索引文件也会相应的重置到新分支的部分；

## 本地仓库 (repository)

> 对应的是`.git/objects`文件夹，存储了本地的所有提交。

## 引用（refs）

> 引用，相当于是给特定的`commit`对象取的别名，引用指向该`commit`。
> 引用实例存储在`.git/refs`文件夹下面，包括`heads`、`tags`、`remotes`，分别对应着本地分支、标签和远程分支。

## 头（HEAD）

> `HEAD`即当前所在的引用（各个引用可以通过`git checkout`来切换）。

# 常用子命令

> 所有命令用法均可以通过`git <command> --help`查看详情，或者[官网](officialSite)查询。

## add

> Add file contents to the index.

基础用法：

```bash
git add <files>

# 交互式添加文件：
-i，--interactive
# 交互式添加补丁块（patching chunk）：
-p，--patch

# 列出（list, no adding）会被添加的文件：
-n, --dry-run
```

过滤：

```bash

# excluding ignored：
-A, --all, --no-ignore-removal
# excluding ignored and removed：
--no-all, --ignore-removal
# only tracked（added earlier）:
-u，--update
# ignored:
-f，--force
```

其他：

```bash
# 修改 staging area 中文件的可执行（executable）属性，本地属性不会变：
--chmod=(+|-)x
```

## commit

> Record changes to the repository.

常见用法：

```bash
# 提交所有跟踪过（tracked）的文件：
-a, --all

# 进入文件选择补丁块（chunks of patch）进行提交：
-p, --patch
# 例如，如果修改中有本地调试代码，使用该选项提交，可以不用每次提交前删除、stash或者切换分支等；

# 使用之前的 commit message 来提交：
-c <commit>, --reuse-message=<commit>
```

## amend

常见用法：

```bash
# 不打开编辑器编辑提交信息：
--no-edit
```

## push

> Update remote refs along with associated objects.

## log

> list all commit logs.
> 下列所涉及的 `pattern` 均指 `glob pattern`；

```bash
git log [<options>] [<revision range>] [[--] <path>...]
```

指定路径（文件、文件夹）：

```bash
<path>
```

指定文件行区间：

```bash
# 指定开始和结束的绝对行号
-L <start>,<end>:<file>

git log -L 1,10:test.sh # 查找test.sh有修改第1到第10行的log

# 指定开始行号和总行数
-L <start>,<+count>:<file> # 向后数
-L <start>,<-count>:<file> # 向前数

git log -L 1,+10:test.sh # 查找test.sh有修改从第1开始总共10行的log。

# start和end也可以是正则表达式
-L </regex/>,</regex/>:<file>

git log -L /echo/,+10:test.sh # 查找test.sh有修改从匹配正则表达式/echo/的行开始总共10行的log
```

指定引用（提交）区间：

```bash
<A>..<B> # 包括 A，不包括 B
<A>...<B> # 包括 A 和 B
^<A> # 不包括 A
```

指定日志数量：

```bash
# 限制最多输出的log数
-<number>

# 跳过数量：
--skip=<number>
```

匹配文本内容：

```bash
-S<string>
-G<regex>
-S<string> --pickaxe-regex
```

匹配作者信息：

```bash
# 指定作者/提交人
--author=<pattern>
--committer=<pattern>
```

匹配提交时间：

```bash
# 指定时间：
--since=, --after=
--until=, --before=
```

匹配*commit message*：

```bash
# 匹配 commit message，其中pattern可以且默认为正则表达式：
--grep=<pattern> ...
# （reflog）匹配 commit message：
--grep-reflog=<pattern> ...
# 指定pattern为纯字符而非正则表达式：
-F, --fixed-strings
# 指定pattern为扩展正则表达式：
-E, --extended-regexp
# 正则表达式忽略大小写：
-i, --regexp-ignore-case
# 不匹配提供的任何pattern：
--invert-grep
# 同时匹配所有pattern：
--all-match
```

匹配各种引用（分支、标签等）的message：

```bash
# 指定refs：
--glob[=<pattern>]
# 排除refs：
--exclude[=<pattern>]
# 指定分支（refs/heads）：
--branches[=<pattern>]
# 指定标签（refs/tags）：
--tags[=<pattern>]
# 指定远程仓库（refs/remotes）：
--remotes[=<pattern>]
```

指定父子关系数量：

```bash
# 指定父级提交的数量：
--min-parents=<number>
--max-parents=<number>
# 指定merge类型的commit：
--merges
--min-parents=2
# 指定非merge类型的commit：
--no-merges
--max-parents=1

```

筛选内容：

```bash
# 筛选提交内容的变动类型：
--diff-filter=[(A|C|D|M|R|T|U|X|B)…​[*]]
# 分别对应 Added, Copied, Deleted, Modified, Renamed, Changed（`T`）, unmerged, unknown（`X`）, pairing broken（`B`）；
# 也可以组合使用：
--diff-filter=DM

# 使用单词级别的diff：
--word-diff[=color|plain|porcelain|none]
# color：通过颜色来标记删减；
# plain：通过[-removed-]和{+added+}格式来标记；
# porcelain：通过将变动的部分单独成行来标记；
# none：不显示单词级别diff；

# （如何）显示子模块的提交内容：
--submodule[=short|log|diff]
```

其他：

```bash
# 显示 bytes of commit message
git log --log-size
```

格式化：

```bash
# 指定每条日志的整体格式：
--pretty=oneline|short|medium|full|fuller|reference|email|raw|format:<string>|tformat:<string>
# 一些常用的预先定义的格式：
--pretty=oneline --abbrev-commit, --oneline
--stat[=<width>[,<name-width>][,<count>]]
--compact-summary
--shortstat
--numstat
--name-only
--name-status

# 是否带颜色
--no-color
--color

# 指定日志中时间的格式：
--date=relative|local|iso|iso-strict|rfc|short|raw|human|unix|default|format:...

# 使用短的 Commit ID：
--abbrev-commit

# 是否/如何显示Commit信息中关于refs的部分，位于Commit ID右侧，表示当前和之前的Commit在哪个ref：
--no-decorate
--decorate[=short|full|auto|no]

# 设置文字编码：
--encoding=<encoding>

# 图形化：
--graph

# diff内容：
# 设置diff的符号：
--output-indicator-new=<char>
--output-indicator-old=<char>
--output-indicator-context=<char>

```

## shortlog（根据提交人分组统计提交）

## rev-list（列出某个提交中的对象）

## diff
> Show changes between commits, commit and working tree, etc.

将工作区（*tracked but not added*）与指定提交做对比：

```bash
git diff <commit=HEAD>
```

将暂存区（*added*）与指定提交做对比：

```bash
git diff --cached <commit=HEAD> # 或
git diff --staged <commit=HEAD>

# 暂存区对比HEAD~3，这将会包括HEAD~1,HEAD~2中的提交
git diff --cached HEAD~3
```

对比任意两个对象：

```bash
git diff <commit> <commit> # 或
git diff <commit>..<commit>

# 对比两个对象之间的区别
git diff HEAD..origin/master
```

对比文件系统中的任意路径：

```bash
git diff --no-index <path> <path>
git diff <path> <path> # 当path不都同属于一个git项目时，--no-index可以省略
```

只对比子目录中的文件：
```bash
git diff --relative[=<path>]
```

显示文件夹的变动比例：

```bash
git diff --dirstat
```

过滤变动类型：

```bash
git diff --diff-filter=<A,C,D,M,R,T,U,X,B>
# added, copied, deleted, modified, rename, changed (T), umerged, unknown (X), have pairing Broken (B)
```

过滤文本内容：

```bash
git diff -S<string>
git diff -G<regex>
git diff -S<string> --pickaxe-regex # 将string看作扩展POSIX正则表达式
# 显示上述匹配到内容所在的改变的整个块
--pickaxe-all
```

其他：

```bash
# 把所有文件当成文本文件
--text, -a

--no-color
--color

# 反向对比
-R

--ignore-cr-at-eol
--ignore-space-at-eol
--ignore-space-change, -b
--ignore-all-space, -w
--ignore-blank-lines
```

格式化：
```bash
--shortstat
# 9 files changed, 141 insertions(+), 73 deletions(-)
--name-only
# src/.obsidian/community-plugins.json
# src/.obsidian/graph.json
# ...
--name-status
# M src/.obsidian/community-plugins.json
# D src/.obsidian/graph.json
# ...
--numstat
# 3 4 src/.obsidian/community-plugins.json
# 0 11 src/.obsidian/graph.json
# ...
--compact-summary
# src/.obsidian/community-plugins.json | 7 ++--
# src/CIS/rust/main.c                  | 11 -------
# ...
# 9 files changed, 139 insertions(+), 72 deletions(-)
--summary
```

## tag

> Create, list, delete or verify a tag object signed with GPG.

1. * 使用GPG签名创建的tag，若没有该签名私钥，其他用户是不能修改的；对于正式版本，使用签名可以相对保持版本安全；关于GPG签名及密钥生成，自行搜索了解即可；

常见用法：

```bash
# list:
git tag
git tag -l|--list
git tag -l <pattern>...
--contains [<commit>]
--no-contains [<commit>]

# create:
git tag <tagname>
git tag <tagname> <point: commit|object> # point refer, 默认为 HEAD
## annotate with editor:
-a, --annotate
## annotate with message directly，可以使用多次该选项，每个message都会被当成单独的段落：
-m <msg>, --message=<msg>
## annotate with message from file：
-F <file>, --file=<file>
## edit annotation message with editor：
-e, --edit

# force：
-f, --force

# * 创建/不创建tag的reflog：
--create-reflog # 配置 core.logAllRefUpdates，全局开启reflog for tag；
--no-create-reflog # 该选项只能取消 --create-reflog，无法覆盖全局配置；
```

标签签名（Sign）：

```bash
# 使用  the default e-mail address’s key 作为密钥签名创建tag：
-s, --sign
# 使用GPG密钥签名创建tag：
-u <keyid>, --local-user=<keyid>
# 对于正式的稳定版本，使用签名可以保证版本的安全性，防止篡改。

# 验证标签的签名：
-v, --verify
```

## branch

常见用法：
```bash
# 创建
git branch <name> # = git branch <name> HEAD
git branch <name> <start-point: a commit|tag|branch>

# 创建分支时同时设置upstream
-t, --track

# 删除
-d <name>, --delete
-D <name>, -delete --force

# 详情
-v, --verbose
# 详情中附加upstream名称
-vv

# 重命名
-m, --move
-M, -move --force

# 复制分支（包括reflog）
-c, --copy
-C, --copy --force

# 设置upstream
-u <upstream>, --set-upstream-to=<upstream>

# 删除/列出分支时，同时附加该分支追踪的远程分支：
-r, --remotes

# * 创建/不创建branch的reflog：
# This activates recording of all changes made to the branch ref;
--create-reflog # 配置 core.logAllRefUpdates，全局开启reflog for branch；
--no-create-reflog # 该选项只能取消 --create-reflog，无法覆盖全局配置；
```

## blame

blame指定的文件行：

`git blame -L <start>,<end> <filename>`

## rm

将文件从`staging area`移除，但不删除文件，文件将变成`untracked`状态：

```bash
git rm —cached
```

将文件从`staging area`和文件系统中同时删除：

```bash
git rm -f
```

递归：

```bash
git rm -r
```

## ls-files

> 用于列出`working directory`和`staging area`中的文件；
> 相较于`git status`，作用更为单纯，尤其适合在脚本中使用；

常用选项：

```bash
# 使用相对git项目根目录的路径列出，默认是相对于当前目录的；
--full-name

# 同时列出子模块的文件
--recurse-submodules

# 筛选文件，pattern 为 shell wildcard pattern：
git ls-files <pattern>
# 如排除markdown文件：
git ls-files ':!:*.md'

# 筛选出 modified 文件：
-m, --modified

# 筛选出 untracked 文件：
-o, --others

# 筛选出 deleted 文件：
-d, --deleted

# 筛选出 ignored 文件：
-i, --ignored

## 排除某些 untracked 文件：
-x <pattern>, --exclude=<pattern>
# 也可以使用git的标准exclusion文件，包括`.gitignore`, `.git/info/exclude`和用户的全局排除文件等文件：
--exclude-standard
# 也可以使用指定的exclusion文件：
--exclude-from=<file>
# 也可以只指定exclusion文件的名称，当有目录中出现了该文件，则该目录及其子目录都会应用该文件的配置：
--exclude-per-directory=<file>
```

列出未被跟踪的（`untracked`）文件：

```bash
git ls-files --others --exclude-standard
```

列出忽略的（`ignored`）文件：

```bash
git ls-files --ignored --exclude-standard
```

## update-index

> Register file contents in the working tree to the index.

将文件标记成*not changing*：

```bash
git update-index --assume-unchanged/--no-assume-unchanged <file>
```

> `Assume-unchanged bit`: the user promises not to change the file and allows Git to assume that the working tree file matches what is recorded in the index.

将文件标记成*index-only*：

```bash
git update-index --skip-worktree/--no-skip-worktree <file>
```

> `Skip-worktree bit`: When reading an entry, if it is marked as skip-worktree, then Git pretends its working directory version is up to date and read the index version instead.

## config

### 基础用法

指定配置文件：

```bash
# 仓库配置文件（.git/config）
--local
# 用户配置文件（~/.gitconfig）
--global
# 系统配置文件（$(prefix)/etc/gitconfig）
--system
# 具体配置文件：
-f <file>, --file <file>
```

列出配置：

```bash
-l, --list

# 显示配置项的来源文件
--show-origin

# 来源类型，local, global, system
--show-scope 

# 只显示配置名称
--name-only

git config -l --show-origin # 列出配置项及其来源文件
```

获取配置：

```bash
--get <name> [<value_regexp>] # 当有多行该配置，返回最后一个；
--get-all <name> [<value_regexp>] # 当有多行该配置，返回所有的；
--get-regexp <name_regexp> [<value_regexp>] # name使用正则表达式；
```

编辑配置项：

```bash
# 设置配置项，会直接在旧有配置行（多个的话第一个）上修改
<name> <value>

# 设置配置项，替换所有该配置出现的行
<name> <value> --replace-all

# 设置配置项，会直接新添一行配置，不修改原有行
--add <name> <value>

# 移除一行/多行配置
--unset <name> [<value_regexp>]
--unset-all <name> [<value_regexp>] # 匹配模式

# 指定配置项的属性
--type <bool|int|bool-or-int|path|expiry-date>

# 直接打开配置文件进行编辑：
-e, --edit
```

常见配置：

```ini
[user]
name = foo
email = foo@bar.com

[core]
editor = code --wait

[credential]
helper = store

[http]
proxy = http://localhost:1080

[https]
proxy = https://localhost:1080

[pager]
branch = false
log = false
```

配置认证信息存储的其他位置：`credential.helper`

> 如本地文件`git config credential.helper store`，配置存储在`~/.git-credentials`，配置内容如`https://username:password@domain`

配置认证时的默认用户名：`credential.username`

配置认证信息是否因url路径不同而不同：`credential.useHttpPath`

> 当该项为（默认为）false时，对于同一个origin，使用的是相同的认证信息；

对指定url配置认证信息：`credential.<url>.*`

> 所有`credential.*`都可以配置；

配置创建tag时是否创建reflog记录（create reflog for tag）：`core.logallrefupdates`

## 更多技巧

### 获取git项目根目录
> `git rev-parse --show-toplevel`

### 不检测指定文件变动
> `git update-index --assume-unchanged <file>`
> [REF](https://stackoverflow.com/questions/1274057/how-to-make-git-forget-about-a-file-that-was-tracked-but-is-now-in-gitignore#answer-20241145)

### `git update-index --skip-worktree <file>`

# Advanced

## cat-file
> Provide content or type and size information for repository objects(`blob`, `tree`, `commit`, `tag`), files are located in `.git/objects`

`-p`: print content.

`-s`: object size.

`-t`: object type (`blob`,`tree`,`commit`,`tag`)

## archive
> Create an archive of files from a named tree.

## rev-list

## rev-parse

## instaweb
> Instantly browse your working repository in gitweb, `git instaweb --httpd=python`.

## gc
> Clean up unnecessary files and optimize the local repository.


# Startup

- git init

- git clone

- git config

- git help



# Workflow

- git stash

- git apply

- git add

- git commit

- git cherry-pick

- git revert

- git rebase

- git reset

- git mv

- git rm



# Inspection

- git status

- git diff

> Show changes between commits, commit and working tree, etc.
>
> 查看工作区或当前提交与上一个提交之间的更改。
>
> - `git diff —name-only 只列出文件的名字

- git show

- git log

- git describe

- git shortlog

- git blame



# Branch

- git branch

- git checkout

- git merge

- git mergetool

- git tag

- git worktree



# Sharing

- git remote

- git push

- git fetch

- git pull

- git submodule



# Debugging

- git blame

- git bisect

- git grep



# Administration

- git clean

- git reflog

- * git gc

> Clean up unnecessary files and optimize the local repository.

- * git filter-branch

> Rewrite branches.

- * git instaweb

> Instantly browse your working repository in gitweb.

- * git archive

> Create a n archive of files from a named tree.

- * git bundle

> Move object and refs by archive.

# Github

# API

- 获取用户star的项目: `https://api.github.com/users/ddavison/starred`


[officialDoc]: https://www.git-scm.com/docs
