
# Basic

## Parse command line arguments

[REF](https://stackoverflow.com/questions/192249/how-do-i-parse-command-line-arguments-in-bash?page=1&tab=votes#tab-top)

### Space-Separated

```sh
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

```sh
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

```sh

```


## `read`

```sh
read -p $'\e[31mFoobar\e[0m: ' foo
```

```sh
read -p '^[[31mFoobar^[[0m: ' foo
```
