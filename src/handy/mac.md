- [MAC OS](#mac-os)
  - [关闭流氓进程](#关闭流氓进程)

# MAC OS

## 关闭流氓进程

1. 活动监视器查看进程的父进程，如果是`launchd`，执行后续操作

2. 找到开机启动文件

3. 找到启动文件后，根据语义，比如`RunAtLoad`, `KeepAlive`等之类的，将`true`值改为`false`

4. 如果父进程不是`launchd`，则继续执行第一步，找到最终进程即可

```sh
# 启动文件可能在的地方
launch_folders=(
"${HOME}/Library/LaunchAgents"
'/Library/LaunchAgents'
'/Library/LaunchDaemons'
'/System/Library/LaunchAgents'
'/System/Library/LaunchDaemons'
)

for file in ${launch_folders[*]}
do
  files=`ls $file | grep -i $1`
  for f in ${files[*]}
  do
    if [ $f ]; then
      echo $file/$files
    fi
  done
done
```
