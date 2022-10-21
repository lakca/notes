
# 重定向

- `0`, `1`, `2` 分别代表 `/dev/stdin`, `/dev/stdout`, `/dev/stderr`.

- `>`, `>>`, `<` 分别代表 写、尾追加（写）、被写入

```bash
1>/var/logs/somelog 2>&1 0>&1
```


# 并列接受管道和参数

```bash
# Check to see if a pipe exists on stdin.
if [ -p /dev/stdin ]; then
        echo "Data was piped to this script!"
        # If we want to read the input line by line
        while IFS= read line; do
                echo "Line: ${line}"
        done
        # Or if we want to simply grab all the data, we can simply use cat instead
        # cat
else
        echo "No input was found on stdin, skipping!"
        # Checking to ensure a filename was specified and that it exists
        if [ -f "$1" ]; then
                echo "Filename specified: ${1}"
                echo "Doing things now.."
        else
                echo "No input given!"
        fi
fi
```

# 将管道数据存入变量

```bash
message=$(</dev/stdin)
```

```bash
read message
```
