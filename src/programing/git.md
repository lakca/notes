- [Git](#git)
  - [Concept](#concept)
    - [working tree](#working-tree)
    - [index (staging area)](#index-staging-area)
    - [commit (repository)](#commit-repository)
    - [HEAD](#head)
  - [Command](#command)
    - [`add`](#add)
      - [`git add -u`，`--update`](#git-add--u--update)
      - [`git add -A`，`--all`](#git-add--a--all)
      - [`git add -f`，`--force`](#git-add--f--force)
      - [`git add -p`，`--patch`](#git-add--p--patch)
      - [`git add -i`，`--interactive`](#git-add--i--interactive)
    - [`log`](#log)
      - [`git log --pretty=oneline`](#git-log---prettyoneline)
      - [`git log <filename>`](#git-log-filename)
      - [`git log -p <filename>`](#git-log--p-filename)
      - [`git log --author=<author>`](#git-log---authorauthor)
      - [`git log -L <start>,<end>:<filename>`](#git-log--l-startendfilename)
      - [`git show <commit-id> <filename>`](#git-show-commit-id-filename)
      - [`git log --no-merges`](#git-log---no-merges)
      - [`git log --branches --not --remotes=origin`](#git-log---branches---not---remotesorigin)
    - [`diff`](#diff)
      - [`git diff --cached`](#git-diff---cached)
      - [`git diff --name-only/--status-only/--name-status/compact-summary/numstat/shortstat`](#git-diff---name-only--status-only--name-statuscompact-summarynumstatshortstat)
      - [`git diff --diff-filter=<A,C,D,M,R,T,U,X,B>`](#git-diff---diff-filteracdmrtuxb)
    - [`tag`](#tag)
      - [`git tag -a v1.0.0 -m 'first tag'`](#git-tag--a-v100--m-first-tag)
      - [`git tag v1.0.0 <commit-id>`](#git-tag-v100-commit-id)
      - [`git tag`,`git tag -l 'v1.*'`](#git-taggit-tag--l-v1)
      - [`git tag show`](#git-tag-show)
      - [`git tag -d <tagname>, git push origin :refs/tags/<tagname>`](#git-tag--d-tagname-git-push-origin-refstagstagname)
    - [`branch`](#branch)
      - [`git checkout -b <branch> <remote>/<branch>`](#git-checkout--b-branch-remotebranch)
      - [`git branch —set-upstream-to=<remote>/<branch> <branch>`](#git-branch-set-upstream-toremotebranch-branch)
    - [`blame`](#blame)
      - [`git blame -L 1,10 README.md`](#git-blame--l-110-readmemd)
    - [`rm`](#rm)
      - [`git rm —cached`](#git-rm-cached)
      - [`git rm -f`](#git-rm--f)
      - [`git rm -r`](#git-rm--r)
    - [`config`](#config)
      - [`git config --list --show-origin`](#git-config---list---show-origin)
      - [`git config --global core.editor 'code --wait'`](#git-config---global-coreeditor-code---wait)
      - [`core.editor`](#coreeditor)
      - [`credential.helper`](#credentialhelper)
      - [`credential.username`](#credentialusername)
      - [`credential.<url>.*`](#credentialurl)
    - [More](#more)
      - [`git rev-parse --show-toplevel`](#git-rev-parse---show-toplevel)
      - [`git ls-files --others --exclude-standard`](#git-ls-files---others---exclude-standard)
  - [Advanced](#advanced)
    - [`cat-file`](#cat-file)
    - [`archive`](#archive)
    - [`instaweb`](#instaweb)
    - [* git gc](#ulligit-gcliul)
  - [Startup](#startup)
  - [Workflow](#workflow)
  - [Inspection](#inspection)
  - [Branch](#branch-1)
  - [Sharing](#sharing)
  - [Debugging](#debugging)
  - [Administration](#administration)
- [Github](#github)
  - [API](#api)

# Git

## Concept

### working tree

> 工作区，此区域内git能够发现我们所做的修改，但是还没有被git接管。

### index (staging area)

> 索引区、缓存区，当执行 `git add` 之后，修改信息就进入了**当前分支的索引区**。
> 索引区对应的实际上是`.git/index`二进制文件，切换分支时索引文件也会相应的重置到新分支的对应。

### commit (repository)

> 提交区，即本地仓库，执行 `git commit` 之后，修改将被应用到提交区。
> 对应的是`.git/objects`文件夹，存储了本地的所有版本提交的文件。

### HEAD

## Command


### `add`

#### `git add -u`，`--update`
> 只添加被追踪的文件

#### `git add -A`，`--all`
> 包含未被追踪的文件

#### `git add -f`，`--force`
> 包含忽略的文件

#### `git add -p`，`--patch`
> 交互式自主选择添加当前修改，可以细化到更改块

#### `git add -i`，`--interactive`
> 引导执行`git add`命令


### `log`

#### `git log --pretty=oneline`

#### `git log <filename>`
> 文件提交历史

#### `git log -p <filename>`
> 文件提交历史详细内容

#### `git log --author=<author>`

#### `git log -L <start>,<end>:<filename>`

#### `git show <commit-id> <filename>`
> 查看提交中文件的改动

#### `git log --no-merges`

#### `git log --branches --not --remotes=origin`
>

### `diff`
> Show changes between commits, commit and working tree, etc.

#### `git diff --cached`

#### `git diff --name-only/--status-only/--name-status/compact-summary/numstat/shortstat`

#### `git diff --diff-filter=<A,C,D,M,R,T,U,X,B>`

> `added`、`copied`、`deleted`、`modified`、`rename`、`changed`、`umerged`、`unknown`、`have pairing Broken`


### `tag`

#### `git tag -a v1.0.0 -m 'first tag'`
> 附注标签

#### `git tag v1.0.0 <commit-id>`
> 历史标签

#### `git tag`,`git tag -l 'v1.*'`
> 标签列表

#### `git tag show`
> 标签详情

#### `git tag -d <tagname>, git push origin :refs/tags/<tagname>`
> 删除tag


### `branch`

#### `git checkout -b <branch> <remote>/<branch>`
> 创建远程分支对应的本地分支

#### `git branch —set-upstream-to=<remote>/<branch> <branch>`
> 追踪远程分支


### `blame`

#### `git blame -L 1,10 README.md`

### `rm`

#### `git rm —cached`
> `Remove` file from `index`, but not delete directly from physics storage, file will be `untracked`.

#### `git rm -f`
> Directly `delete` file from `index`.

#### `git rm -r`


### `config`

#### `git config --list --show-origin`

#### `git config --global core.editor 'code --wait'`
> 将编辑器配置成vscode

#### `core.editor`
> 配置编辑器，比如`code.editor 'code --wait'`配置成 vscode

#### `credential.helper`
> 配置认证信息的存储方式，如本地文件`credential.helper store`，配置存储在`./.git-credentials`，配置内容如`http://username:password@xxx.github.com`

#### `credential.username`
> 配置认证用户名

#### `credential.<url>.*`
>配置某个地址的认证信息


### More

#### `git rev-parse --show-toplevel`
> 获取git项目根目录

#### `git ls-files --others --exclude-standard`
> 列出未跟踪(untracked)的文件


## Advanced

### `cat-file`
> Provide content or type and size information for repository objects(`blob`, `tree`, `commit`, `tag`), files are located in `.git/objects`

`-p`: 获取内容
`-s`: 获取文件大小
`-t`: 获取文件类型(blob,tree,commit,tag)

### `archive`
> Create an archive of files from a named tree.

### `instaweb`
> Instantly browse your working repository in gitweb, `git instaweb --httpd=python`.

### * git gc
> Clean up unnecessary files and optimize the local repository.


## Startup

- git init

- git clone

- git config

- git help



## Workflow

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



## Inspection

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



## Branch

- git branch

- git checkout

- git merge

- git mergetool

- git tag

- git worktree



## Sharing

- git remote

- git push

- git fetch

- git pull

- git submodule



## Debugging

- git blame

- git bisect

- git grep



## Administration

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

## API

- 获取用户star的项目: `https://api.github.com/users/ddavison/starred`
