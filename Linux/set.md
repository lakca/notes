---
title: '`set`-终端配置'
date: 2020-10-10T06:57:14.375Z
---

# Set

[Reference](https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html)

## `set --`

## `set -o <option-name>`

| Option Name | 同义命令 | 作用                                                                                               | Default |
| ----------- | -------- | -------------------------------------------------------------------------------------------------- | ------- |
| allexport   | `set -a` | -------                                                                                            |         |
| braceexpand | `set -B` | -------                                                                                            | true    |
| emacs       |          | -------                                                                                            |         |
| *errexit*   | `set -e` | Exit immediately if a [`pipeline`](./basic.md#pipelines) returns a non-zero status                 |         |
| errtrace    | `set -E` | -------                                                                                            |         |
| functrace   | `set -T` | -------                                                                                            |         |
| hashall     | `set -h` | -------                                                                                            |         |
| histexpand  | `set -H` | -------                                                                                            |         |
| histroy     |          | -------                                                                                            |         |
| ignoreeof   |          | -------                                                                                            |         |
| keyword     | `set -k` | -------                                                                                            |         |
| monitor     | `set -m` | -------                                                                                            |         |
| noclobber   | `set -C` | -------                                                                                            |         |
| *noexec*    | `set -n` | Read commands but do not execute them. used to check syntax errors. ignored by interactive shells. |         |
| noglob      | `set -f` | -------                                                                                            |         |
| nolog       |          | -------                                                                                            |         |
| notify      | `set -b` | -------                                                                                            |         |
| *nounset*   | `set -u` | Treat unset variables and parameters as an error.                                                  |         |
| onecmd      | `set -t` | -------                                                                                            |         |
| physical    | `set -P` | -------                                                                                            |         |
| *pipefail*  |          | Return immediately when none-zero status met or return zero in a pipeline.                         |         |
| posix       |          | -------                                                                                            |         |
| privileged  | `set -p` | -------                                                                                            |         |
| verbose     | `set -v` | -------                                                                                            |         |
| vi          |          | -------                                                                                            |         |
| *xtrace*    | `set -x` | Print a trace of commands before executed.                                                         |         |
