---
title: Basic
date: 2020-11-02T09:07:16.580Z
---

- [Basic](#basic)
  - [Parse command line arguments](#parse-command-line-arguments)
    - [Space-Separated](#space-separated)
    - [Equals-Separated](#equals-separated)
    - [`getopt`](#getopt)
  - [`read`](#read)
  - [`try ... catch ...`](#try--catch-)
# Basic

## Parse command line arguments

[REF](https://stackoverflow.com/questions/192249/how-do-i-parse-command-line-arguments-in-bash?page=1&tab=votes#tab-top)

### Space-Separated

```bash
while [[ "$#" -gt 0 ]]; do
  case $1 in
    -d|--deploy) deploy="$2"; shift;;
    -u|--uglify) uglify=1;;
    *) echo "Unknown parameter passed: $1"; exit 1;;
  esac
  shift
done
```

### Equals-Separated

```bash
for i in "$@"; do
  case $i in
    -e=*|--extension=*) EXTENSION="${i#*=}";;
    -s=*|--searchpath=*) SEARCHPATH="${i#*=}";;
    -l=*|--lib=*) LIBPATH="${i#*=}";;
    --default) DEFAULT=YES;;
    *) echo "Unknown parameter passed: $1"; exit 1;;
  esac
  shift
done
```

### `getopt`

```bash

```


## `read`

```bash
read -p $'\e[31mFoobar\e[0m: ' foo
```

```bash
read -p '^[[31mFoobar^[[0m: ' foo
```

## `try ... catch ...`

```bash
{
  # try
} || {
  # catch
}
```
