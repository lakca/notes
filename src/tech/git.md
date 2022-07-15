---
title: Git
date: 2021-03-22T07:01:30.074Z
---

# 前言

1. 以下所有内容基本都可以在[官方英文文档](officialDoc)找到，若感觉到有描述不清晰的地方，建议通过查看[官方英文文档](officialDoc)以了解准确含义。
2. 对于有些词汇，比起中文翻译来说，使用英文原词汇会表达得更为直接准确。例如：`add`比`添加`就更准确直观，因为`add`在语境中是被特化的，就是指将文件从工作区添加到索引区的这一动作；也比`添加到暂存区`或者`添加到索引区`更为简洁直观。

# 基本概念

## 简化的git的工作过程

```shell
# working directory, then
> git add .
# index, then
> git commit -m 'commit something.'
# repository, then
> git push
# remote
```

## Git项目中文件的状态

- `Untracked`：Git已知的文件，即被提交过（*committed*）或者暂存过（*staged*）的文件。（*Untracked files are everything else — any files in your working directory that were not in your last snapshot and are not in your staging area.*）
- `Unmodified`：已跟踪过，但工作区内容与最新提交过（*staged or committed*）的内容不一致的文件。
- `Modified`：当前内容与上次提交过的内容不一致的文件。
- `Staged`：提交到暂存区的文件。

![Git中文件的状态](https://git-scm.com/book/en/v2/images/lifecycle.png)

## 工作区（Working Tree）

> 工作区（*working directory*, *working tree*），可以简单理解为排除了特定目录（如`.git`）或文件的Git项目文件夹（*git project folder with certain directories/files excluded*），文件或文件内容在被声明前（*stage*）都处于工作区。

## 暂存区（Staging Area）

> 暂存区（*staging area*, *index*），是[工作区](#工作区working-tree)和[版本库](#仓库repository)之间的一层缓冲区，内容在提交（*commit*）之前需先暂存（*stage*）于工作区，其内容存储在`.git/index`二进制文件中。

对于简单的修改提交而言，可能暂存区没什么意义，但有了暂存区，我们就可以：

- 快速对内容进行选择性提交或分次提交。（如在主线任务中穿插的小的修改）
- 在提交在合并发生冲突时停下来解决冲突。（因为冲突后，Git会将未冲突的代码将会保存在暂存区中，冲突和修改就可以发生在工作区，两不干扰）
- 保存无需提交的修改。（如本地调试代码）
- ......

## 仓库（Repository）

> 广义地讲，Git仓库（*Repository*）是Git数据库，存储了Git元数据和Git对象，对应的实体是Git目录（*Git Directory*）`./.git`。

> 狭义地讲，也是我们一般所说的Git仓库，是*Commit对象库*、*快照库*、*版本库*，即通过`git commit`实现的永久存储。

## 对象（Object）

> Git是对项目文件系统进行快照存储和调用来进行版本控制的，在实现上，通过*key-value*形式的存储构建一个内容可寻址的文件系统，来对快照信息存储和索引，其中*value*即为Git对象，*key*为对象的*SHA1*哈希值。
>
> 所以，[Git对象（*Object*）](https://git-scm.com/book/en/v2/Git-Internals-Git-Objects)，是Git的数据（如文件、提交、标签、分支......）模型，底层是一个以其存储内容的SHA1为名称（实际是文件夹名称+文件名）的文件，存储于`.git/objects`文件夹，可通过`git cat-file -p`命令查看内容。

查看对象：

```shell
> ls .git/objects/36
049069ed448142208ece96f24bc5973a40e5a1 1e275573431469f9d3b44c0192b4b0500ea62c 586ad664fe49bc278838313c258b48d00db990 e9f6ce0abecc76f88d0f32a0351d1bef2b7279
08357fc04e9a03be92e0cb3a209400d0486403 2e8d4e49c23265edd9b32f8a977ad84371f463 af3c8aacfe102e6de816181ff7e3376aca8a80 ebef39c9050cfdca4ba6c1802fb24fd6c99ac4
0a8a1267f4a23ae91f4a49d9e55ae297d0063f 4130ae2eba9aa19c4a06abf0eccd812aeb1480 dfecc81832f84e60a094ce3be6184dda9bf701
```

查看某个commit：

```shell
> git cat-file -p 36049069ed448142208ece96f24bc5973a40e5a1
tree fa76d812a0ea86c341fc807b439de63ff68df300
parent 416e02829c971eadd56f8a5b4c7ffc21c891f76a
author lakca <912910011@qq.com> 1657004979 +0800
committer lakca <912910011@qq.com> 1657004983 +0800

update index
```

查看*tree*对象，可以看到引用了一系列其他对象：

```shell
> git cat-file -p fa76d812a0ea86c341fc807b439de63ff68df300
100644 blob abdb414b694f40d84514b77e9801ea609b4ee9ee	.gitignore
100644 blob 086a5c9ea988c5a4d37acc5f8ea089e37cb19371	404.html
100644 blob 0125c33c46071fecf35c095eae25009299966b52	README.md
100644 blob 985955792818c2b4eb89b3bc1e2c0a12dfec28d5	_config.yml
040000 tree abe56721e3150cb441c8196b97ebc6c6f74f8ab5	_layouts
040000 tree dd5318d970a8f3bcf8d8a8298258f4a9f4b81194	assets
100644 blob 1bb85c2df02bf3673331bd4337e745061c5dba53	package.json
100644 blob 53e6b266edfcdb8ea93d318da8dcec335bdf7988	pnpm-lock.yaml
100755 blob dc67133decc3f8a1a61e3049bc414d483412a4b2	prepare
040000 tree c952480116841bfc9f53838b2461c14d3df5b0da	script
040000 tree c64bb8182f7f8f5188013c2dd035135fa759cd5d	src
```

查看*blob*对象，可以看到直接显示（当次提交时的）整个文件的内容：

```shell
> git cat-file -p abdb414b694f40d84514b77e9801ea609b4ee9ee
html
node_modules
vendor
_site
.DS_Store
```

在上述结果中，Git对象的哈希*key*前面是对象的类型，我们也可以通过`git cat-file -t <sha1>`命令查看一个对象类型。有三种：

- *blob* 为文件对象，用于存储文件内容，也是Git的原子对象，类似文件系统中的文件；
- *tree* 为树对象，用于表示一组文件对象的集合，类似文件系统中的文件夹；
- *commit* 为提交对象，其存储的信息包括对当次提交产生的根级树对象的引用、对父提交的引用和当次提交的元信息；

注意，*parent* 只是*commit*类型的对象在特定语境下的别名，我们可以通过`git cat-file -t <sha1>`来查看。

### 树对象（Tree Object）

> Git对象是*key-value*的存储结构，对于多文件的存储，是通过存储文件对象的*key*来直接引用，或通过存储引用了文件对象的树对象*key*来间接引用。这种存储一组多个文件的对象即为[树对象](https://git-scm.com/book/en/v2/Git-Internals-Git-Objects#_tree_objects)，类比文件系统中的文件夹。

### 相关命令

- [`cat-file`](https://git-scm.com/docs/git-cat-file)
- [`ls-tree`](https://git-scm.com/docs/git-ls-tree)：List the contents of a tree object.

#### 提交（Commit）

> 提交（*commit*）：使用暂存区信息创建一个[提交对象（*commit object*）](https://git-scm.com/book/en/v2/Git-Internals-Git-Objects#_commit_objects)。

## 引用（Reference）

> [引用（*References*）](https://git-scm.com/book/en/v2/Git-Internals-Git-References)，是对某个[对象](#对象object)创建的别名。引用信息存储在`.git/refs`文件夹下面，包括*heads*、
*tags*、*stash*、*remotes*等，分别对应着本地分支头、标签、暂存和远程分支头。


## 头（Head）

> 我们知道，在版本控制系统中可以切换到（检出）不同的历史版本进行操作，而记录所处版本的实体在Git中称之为头（*head*）。在Git中，头本质上是一个存储了其引用版本的哈希值的文件，其中当前头（*HEAD*）的存储位置在`.git/HEAD`，其他头见[分支](#分支branch)。

\* 注意*head*和*HEAD*的区别，前者表示的是创建的所有头，后者代表的是当前所处的头。

## 分支（Branch）

> [分支（*Branch*）](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell)，是版本控制系统提供并发任务能力或任务分解能力的核心支撑。在Git中，分支是由创建多个[头](#头head)来实现的，换句话来说，分支是具有名字的头（无名的头叫*detached head*）。其中，本地分支的头信息存储在`.git/refs/heads`，远程分支的头信息存储在`.git/refs/remotes`。

# 常用子命令

> 所有命令用法均可以通过`git <command> --help`查看详情，或者[官网](officialSite)查询。

## branch（分支）

> 增删改查分支。*List, create, or delete branches.*

（基于指定对象）创建新分支：

- 基于远程分支创建时，默认会（`branch.autoSetupMerge`配置为true）自动设置为上游分支，可设置`--no-track`避免。
- 基于本地分支创建时，需要手动设置`-t`上游分支。

```shell
git branch <branchname> [<object=HEAD>] [-t/--track <upstream>]
```

（v2.35.0）基于当前HEAD创建新分支，并设置相同的上游分支：

```shell
git branch <branchname> --track=inherit
```

（v2.35.0）基于远程分支创建本地分支，并以之为上游分支：

```shell
git branch <branchname> <upstream> --track=direct
```

设置upstream：

```shell
(-u <upstream> | --set-upstream-to=<upstream>) [<branchname>]

--unset-upstream [<branchname>]
```

```shell
# 给当前分支设置upstream
> git branch -u origin/develop

# 给指定分支dev设置upstream
> git branch -u origin/develop dev
```

```shell
# 同时删除跟踪的远程分支
> git branch -d -r dev
```

重命名：

```shell
(-m | -M) [<oldbranch>] <newbranch>
```

```shell
# 将当前分支名称改为dev
> git branch -m dev

# 将dev分支名称改为develop
> git branch -m dev develop
```

复制分支（包括reflog）：

```shell
(-c, --copy | -C, --copy --force) [<oldbranch>] <newbranch>
```

删除：

```shell
(-d, --delete | -D, --delete --force) <branchname>…
```

列表：

```shell
-a, --all
# 列出分支名称
-l, --list
# 同时显示HEAD信息
-v, --verbose
# 同时显示upstream名称
-vv

--contains <commit>

--no-contains <commit>

# 过滤出已完全合并到当前分支的分支：
--merged

# 过滤出有提交未合并到当前分支的分支：
--no-merged

# 过滤出head为某个对象的分支：
--points-at <object>
```

（在删除或列表时）作用于远程分支：

```
-r, --remotes
```

其他

```shell
# * 创建/不创建branch的reflog：
# This activates recording of all changes made to the branch ref;
--create-reflog # 配置 core.logAllRefUpdates，全局开启reflog for branch；
--no-create-reflog # 该选项只能取消 --create-reflog，无法覆盖全局配置；
```

## add（暂存）

> 将工作区变动移存到暂存区。（*Add file contents to the index.*）

```shell
git add [<options>] [--] <pathsepc>...
```

```bash
# 交互式添加文件：
-i，--interactive
# 交互式添加补丁块（patching chunk）：
-p，--patch
```

所有未忽略的（*unignored*）文件：

```shell
-A, --all, --no-ignore-removal
```

只添加当前目录（包括子目录）下的所有未忽略的（*unignored*）文件：

```shell
git add .
```

仅暂存已跟踪过的（*tracked*）文件：

```shell
-u，--update
```

包括忽略的（*ignored*）文件：

```shell
-f，--force
```

忽略删除的（*removed*）文件：

```shell
--ignore-removal, --not-all
```

列出会被添加的文件：

```shell
-n, --dry-run
```

修改索引区中文件的可执行性（*executable bit*），文件在本地文件系统中的属性不会变：

```shell
--chmod=+x
--chmod=-x
```

## stash（贮藏）

> 将工作区和暂存区的内容提交（*Git Object*也是*commit*类型）到一个独立的储藏栈（区别于当前分支），最近一次的stash信息存储于`refs/stash`。（*saves your local modifications away and reverts the working directory to match the `HEAD` commit.*）

```shell
git stash push [<options>] [<pathspec>...]

# 仅stash指定文件
<pathspec>

# 不包含暂存区内容
-k, --keep-index

# 包含暂存区内容
--no-keep-index

# 包含untracked文件
-u, --include-untracked

# 包含所有变动，包括ignored文件
-a, --all

# 交互性地选择stash内容，隐含--keep-index
-P, --patch

# 仅stash暂存区内容
-S, --staged

# 设置备注
-m, --message
```

列出历史 stash（选项同 `git log`）：

```shell
git stash list [<options>]

> git stash list -1 --name-status
```

查看某个 stash（选项同 `git diff`）：

```shell
git stash show [<options>] [<stash=stash@{0}>]

> git stash show -p stash{0}
```

调用历史 stash：

```shell
git stash apply [--index] <stash>

# 应用栈中第一个stash
> git stash apply stash@{0}
```

弹出（应用并删除记录）历史 stash：

```shell
git stash pop [--index] [<stash=stash@{0}>]
```

基于创建 stash 的 commit 创建一个新分支，并弹出该stash：

```shell
git stash branch <branchname> [<stash=stash@{0}>]
```

清理 stash：

```shell
# 清理指定 stash
git stash drop [<stash=stash@{0}>]

# 直接清空
git stash clear
```

列出已被清理的 stash：

```shell
git fsck --unreachable |
grep commit | cut -d\  -f3 |
xargs git log --merges --no-walk --grep=WIP
```

## commit（提交）

> 将暂存区内容提交到当前分支。(*Record changes to the repository.*)

```shell
git commit [<options>] [--] <pathspec>...
```

提交所有跟踪过（*tracked*）的文件（跳过索引区）：

```shell
-a, --all
```

只提交指定文件：

```shell
-o, --only
```

手动选择要提交的数据块：

```shell
# 进入文件选择补丁块（chunks of patch）进行提交：
-p, --patch
# 例如，如果修改中有本地调试代码，使用该选项提交，可以不用每次提交前删除、stash或者切换分支等；
```

修改上一个提交：

```shell
--amend
```

使用之前的 *commit message*：

```shell
-C <commit>, --reuse-message=<commit>
-c <commit>, --reedit-message=<commit>
```

指定元信息如何提交：

```shell
--date <date>
--author <author>
--reset-author
--no-edit
```

提交给之前的提交：

```shell
> git commit -m 'feature A'
> git commit -m 'feature B'
> git log --oneline
f90eb05 (HEAD -> dev) feature B
d48a90d feature A

```

示例提交给feature A：

1. 使用`--fixup`提交：
```shell
# 通过 --fixup 标记创建的提交为feature A的修改
> git commit --fixup d48a90d
44251ec (HEAD -> dev) fixup! feature A
f90eb05 feature B
d48a90d feature A
# 稍后，将修改压缩（squash）进去：
> git rebase -i --autosquash d48a90d~
0c0d4b4 (HEAD -> dev) feature B
780572e feature A
```
2. 或者，如果需要在合并（*rebase*）的时候修改合并消息，使用`--squash`：
```shell
> git commit --squash d48a90d
44251ec (HEAD -> dev) fixup! feature A
f90eb05 feature B
d48a90d feature A
...
```

绕过钩子：

```shell
# 绕过 pre-commit, commit-msg
-n, --no-verify
# 绕过 post-rewrite
--no-post-rewrite
```

其他钩子，比如*post-commit*，
没有内置选项可以绕过，但可以通过变通，比如在脚本里面加入环境变量做判断，比如：
```shell
# post-commit
[ $SKIP_POST_COMMIT ] && exit 0
...
```
```shell
> SKIP_POST_COMMIT=1 git commit -m '...'
```

## checkout（检出）

> 检出某个对象：切换分支，或者复原工作区文件（到*HEAD*状态）。（*Switch branches or restore working tree files.*）

```shell
git checkout [<options>] [<branchname>] [--] <pathspec>...
```

丢弃工作区变动：

```
git checkout <pathspec>

# 丢弃所有修改
> git checkout .
# 将索引区（index tree）复原到工作区（working tree）
> git reset HEAD
```

切换分支，或检出（唯一）远程同名分支：

```shell
git checkout <branchname>

# 若本地分支不存在，但存在同名远程分支，则创建本地分支并追踪该远程分支，等同于：

git checkout -b <branchname> -t/--track <remote>/<branchname>
```

从远程分支检出同名新分支：

```shell
git checkout --track <upstream>
```

```shell
git checkout --track origin/develop
```

强制切换分支（丢弃未提交的变动）

```shell
-f, --force
```

基于当前*HEAD*检出新分支：

```shell
-b <branchname>
```

检出一个孤儿分支（HEAD为空的分支）：

```shell
--orphan <branchname>
```

对尚未合并（`rebase`或`merge`）的文件检出不同版本（*current changes*或*incomming changes*）：

```shell
# current changes:
-2, --ours
# incomming changes:
-3, --theirs
```

## push（推送）

> Update remote refs along with associated objects.

## log（日志）

> 列出提交日志。（*list all commit logs.*）。下列所涉及的 `pattern` 均指 `glob pattern`。

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

## diff（对比）

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

## tag（标签）

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

## blame（追溯）

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

> Show information about files in the index and the working tree.

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

## rev-list（列出某个提交中的对象）

## shortlog（根据提交人分组统计提交）

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
