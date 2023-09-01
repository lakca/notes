---
title: MacOS深度使用
date: 2020-08-27T09:42:26.913Z
---

# 目录

| 目录             | 描述                     | `/System/Library/` | `/Library/` | `~/Library/` |
| ---------------- | ------------------------ | ------------------ | ----------- | ------------ |
| `Preferences/`   | 存放应用的配置文件       | Y                  | Y           | Y            |
| `LaunchDaemons/` | 存放系统级进程的配置文件 | Y                  | Y           |              |
| `LaunchAgents/`  | 存放用户级进程的配置文件 | Y                  | Y           | Y            |
| `StartupItems/`  | 存放启动项的配置文件     | Y                  | Y           |              |

# 调用系统脚本（`osascript`）

> [`osascript`](https://ss64.com/osx/osascript.html): execute OSA scripts (AppleScript, JavaScript, etc.)

```bash
osascript -e <script> [-l <language>]
```

OSX10.4以下使用的是MacRoman编码，unicode需要额外备注:

```bash
script='display notification ("您好" as unicode text)'
osascript -e $script
```

[AppleScript快速入门](https://juejin.cn/post/7055599089081122829)

## 常见命令

```bash
# 右上角通知
# https://developer.apple.com/library/archive/documentation/LanguagesUtilities/Conceptual/MacAutomationScriptingGuide/DisplayNotifications.html
display notification "hello world!"
  with title "Greet"
  subtitle "Everyone"
  sound name "Frog"
# 弹窗
display alert "Alert"
  message "Hello, ..."
  as critical
  buttons {"Don't Continue", "Continue"}
  default button "Continue"
  cancel button "Don't Continue"
display dialog "Dialog"
  buttons {"Don't Continue", "Continue"}
  default button "Continue"
  cancel button "Don't Continue"
  with icon caution
  giving up after 5 # 5秒后自动关闭
# 打开Safari
tell app "Safari" to activate
# 关闭Safari
quit app "safari.app"
# 调整音量
set volume input volume 40
set volume output volume 50
set volume output muted TRUE
set volume output muted not (output muted of (get volume settings))
# 直接关机、重启
tell app "System Events" to shut down
tell app "System Events" to restart
# 延时
delay 0.5 # 秒
```

## 获取软件的ID

`osascript -e 'id of app "Visual Studio Code"'`

# 管理进程（`launchctl`）

> `launchd`: System wide and per-user daemon/agent manager.

> `launchctl`: interfaces with launchd to manage and inspect daemons, agents and XPC services.

`launchd`是苹果系统（>10.4）管理进程的服务。通过*任务管理器*的*显示*菜单中选择*所有进程，分层显示*可以看到所有进程都是由`launchd`来管理的。

开机过程：

```mermaid
graph LR
kernel[OS Kernel]
	---> system-launchd[System Launchd]
	---> system-deamons[System Daemons<br/>/System/Library/LaunchDaemons] & third-party-deamons[Third-party Deamons<br/>/Library/LaunchDaemons]
	---> login{User Login<br/>loginwindow}
	---> user-launchd[User Launchd]
	---> system-agents[System Agents<br/>/System/Library/LaunchAgents] & user-agents[Third-party Agents<br/>/Library/LaunchAgents] & current-agents["Current User Agents<br/>~/Library/LaunchAgents"]
	---> ...((""))
```

```bash
# 列出用户进程状态
launchctl list
# 列出系统进程状态
sudo launchctl list
```

## daemon和agent

- `daemon`: 系统级进程，在系统启动时载入，在活动监视器中可以看到用户为*root*。
- `agent`: 用户级进程，在用户登录时载入，在活动监视器中可以看到用户为当前用户（`whoami`）。

[LaunchAgents与LaunchDaemon](https://www.wuliaole.com/2017/02/19/launchagents_and_launchdaemon_on_mac_osx/)

## 进程配置文件

```bash
# 系统自带的系统级进程配置文件
/System/Library/LaunchDaemons
# 系统自带的用户级进程配置文件
/System/Library/LaunchAgents
# 系统自带的进程间通信进程配置文件
/System/Library/xpc
# 管理员提供的（如安装软件）系统级进程配置文件
/Library/LaunchDaemons
# 管理员提供的用户级进程配置文件
/Library/LaunchAgents
# 当前登录用户自己的进程配置文件
~/Library/LaunchAgents
```

# 软件配置文件（`plist`）

> *launchd.plist*是*daemon*和*agent*任务的服务配置文件。

关于*plist*，可以查看`man plist`, `man launchd.plist`。

1. `RunAtLoad`：表示当前任务是否在配置载入（开机/登录）后自动启动。
2. `KeepAlive`：表示当前任务是否一直运行。当设置为`true`时，在退出后会自动重启（俗称关不掉的流氓程序）。
3. `SuccessfulExit`：表示是否在当前任务成功退出后自动重启。当该属性出现时，载入后一定会自动启动。
4. `Label`：该`.plist`文件代表的任务名称。
5. `Program`, `ProgramArguments`：任务的程序路径。
6. `WatchPaths`：监控路径，当路径变化时执行当前任务。

<details><summary>核心属性（详细可见<code>man launchd.plist</code>）</summary>

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<!-- 任务名称 -->
	<key>Label</key>
	<string>MyProgram</string>
	<!-- 工作目录 -->
	<key>WorkingDirectory</key>
	<string>/tmp</string>
	<!-- 程序路径，写法一 -->
	<key>Program</key>
	<string>/path/to/program</string>
	<!-- 程序路径，写法二 -->
	<key>ProgramArguments</key>
	<array>
		<string>/usr/bin/rsync</string>
		<string>--archive</string>
		<string>--compress-level=9</string>
		<string>/Volumes/Macintosh HD</string>
		<string>/Volumes/Backup</string>
	</array>
	<!-- 环境变量 -->
	<key>EnvironmentVariables</key>
	<dict>
		<key>PATH</key>
		<string>/bin:/usr/bin:/usr/local/bin</string>
	</dict>
	<!-- 标准输入输出 -->
	<key>StandardInPath</key>
	<string>/tmp/test.stdin</string>
	<key>StandardOutPath</key>
	<string>/tmp/test.stdout</string>
	<key>StandardErrorPath</key>
	<string>/tmp/test.stderr</string>
	<key>Debug</key>
	<true/>
  <!-- 权限：用户 -->
  <key>UserName</key>
  <string>nobody</string>
  <!-- 权限：用户组 -->
  <key>GroupName</key>
  <string>nobody</string>
  <!-- 权限：Umask -->
  <key>Umask</key>
  <!--
    0	read, write and execute/search
    1	read and write
    2	read and execute/search
    3	read only
    4	write and execute
    5	write only
    6	execute/search only
    7	none
  -->
  <string>0</string>
  <!-- 限流 -->
  <key>ThrottleInterval</key>
  <integer>60</integer>
  <!-- IO优先级 -->
  <key>LowPriorityIO</key>
  <true/>
	<!-- 限制可用资源 -->
	<key>HardResourceLimits</key>
  <!-- 包括：CPU, FileSize, NumberOfFiles, Core, Data, MemoryLock, NumberOfProcesses, ResidentSetSize, Stack -->
	<dict>
		<key>NumberOfFiles</key>
		<integer>2048</integer>
	</dict>
	<key>SoftResourceLimits</key>
	<dict>
		<key>NumberOfFiles</key>
		<integer>2048</integer>
	</dict>
	<!-- 运行条件：常驻运行（自动重启） -->
	<key>LaunchOnlyOnce</key>
	<true/>
	<key>KeepAlive</key>
	<true/>
	<!-- 运行条件：常驻运行（自动重启），有条件地 -->
	<key>KeepAlive</key>
  <dict>
    <key>SuccessfulExit</key>
    <true/>
    <key>Crashed</key>
    <true/>
    <key>NetworkState</key>
    <true/>
    <key>PathState</key>
    <dict>
      <key>/tmp/runJob</key>
      <true/>
    </dict>
    <key>OtherJobEnabled</key>
    <dict>
      <key>local.otherJob</key>
      <false/>
    </dict>
    <key>AfterInitialDemand</key>
    <dict>
      <key>local.otherJob</key>
      <true/>
    </dict>
  </dict>
	<!-- 运行条件：在开机后自动启动 -->
	<key>RunAtLoad</key>
	<true/>
  <!-- 运行条件：周期性启动，按时间间隔 -->
  <key>StartInterval</key>
  <integer>3600</integer>
  <!-- 运行条件：周期性启动，按日历 -->
  <key>StartCalendarInterval</key>
  <array>
  	<dict>
  		<key>Hour</key>
  		<integer>3</integer>
  		<key>Minute</key>
  		<integer>0</integer>
  	</dict>
  	<dict>
  		<key>Minute</key>
  		<integer>0</integer>
  		<key>Weekday</key>
  		<integer>0</integer>
  	</dict>
  </array>
  <!-- 运行条件：监控路径，当路径变动（创建、删除、写入）时启动 -->
  <key>WatchPaths</key>
  <array>
    <string>/path/to/directory_or_file</string>
  </array>
  <!-- 运行条件：监控目录，当目录不为空时启动 -->
  <key>QueueDirectories</key>
  <array>
    <string>/path/to/directory_or_file</string>
  </array>
</dict>
</plist>
```
</details>

- [Launchd，如何在Mac上运行服务](https://yishanhe.net/dive-into-launchd/)
- [launchd.info](https://www.launchd.info/)

# 管理plist配置文件（`plutil`）

> `plutil`: can be used to check the syntax of property list files, or convert a plist file from one format to another. Specifying - as an input file reads from stdin.

使用`plutil`可以轻松地修改*.plist*的属性和值，包括二进制格式的*.plist*文件。

例如，关闭Microsoft AutoUpdate软件的自动启动：

```bash
plutil -remove SuccessfulExit /Library/LaunchAgents/com.microsoft.update.agent.plist
plutil -replace RunAtLoad -bool NO /Library/LaunchAgents/com.microsoft.update.agent.plist
```

[launchd plist](#launchd%20plist)是*daemon*和*agent*任务的服务配置文件。

# 管理内核状态（`sysctl`）

> `sysctl`: get or set kernel state.

```bash
```

查看交换内存（*swap usage*）：

```bash
sysctl vm.swapusage
# vm.swapusage: total = 0.00M used = 0.00M free = 0.00M (encrypted)
```

# 管理Spotlight索引（`mdutil`）

管理建立*Spotlight*索引的服务（进程名称：`mds_stores`）

>  `mdutil`: Utility to manage Spotlight indexes.

```bash
# 关闭所有卷（volumes）的索引服务
mdutil -a -i off
# 开启
mdutil -a -i on
```

# 管理磁盘和卷（`diskutil`）

> `diskutil`: Utility to manage local disks and volumes.

```bash
# 列出磁盘的分区（Partitions）
diskutil list
# 获取磁盘或分区信息
diskutil info <disk>
```

# 开关系统（`shutdown`）

- 系统睡眠（*sleep*）：`shutdown -s`
- 系统关机（*halted*）：`shutdown -h`
- 将非超级用户用户踢下线（*kick*）：`shutdown -k`

# 控制系统睡眠（`caffeinate`）

> `caffeinate`: prevent the system from sleeping on behalf of a utility.

# 电源管理（`pmset`）

> `pmset`: manipulate power management settings.

设置（不同电源条件下）不同事件的

```bash
pmset
  [
    -a # all
    | -b # battery
    | -c # charger
    | -u # UPS
  ]
  [displaysleep|disksleep|sleep|...]
```

获取当前配置：

```bash
pmset -g [
  everything
  | stats # sleeps and wakes system has gone thru since boot.
  | ac,adapter
  | ps # ups
  | batt # battery
  | sched # scheduled events
  ...
]
```

## 定时开关机休眠唤醒

- `type`: *sleep*, *wake*, *poweron*, *shutdown*, *wakeorpoweron*

- `weekdays`: Subset of *MTWRFSU*

- `date+time`: *"MM/dd/yy HH:mm:ss"* (in 24 hour format; must be in quotes)

- `time`: *HH:mm:ss*

一次性：

```bash
pmset schedule [cancel|cancelall] <type> <date+time> [owner]
```

重复：

```bash
pmset repeat <type> <weekdays> <time>
pmset repeat cancel
```

相对上次休眠/关机进行唤醒/开机：

```bash
pmset relative [wake | poweron] <seconds>
```

# 朗读文本（`say`）

# 图片处理（`sips`）

```sh
# 获取图片所有属性
> sips --getProperty all <img>
# 获取图片所有属性，返回xml格式
> sips --getProperty allxml <img>
# 缩放图片
> sips --resampleHeightWidthMax 1024 <img> --out <resampledImg>
```

|常用选项|含义|
|-|-|
|`--helpProperties/-H`|查看支持的图片属性|
|`--formats`|查看支持的格式|
|`--out/-o`|输出文件夹/名|
|`--getProperty/-g`, `--setProperty/-s`, `--deleteProperty/-d`|获取/设置/删除图片属性|
|`--setProperty format <jpeg/tiff/png/gif/jp2/pict/bmp/qtif/psd/sgi/tga>`|转换图片格式|
|`--getProperty all`|获取图片的所有属性|
|`--resampleWidth`, `--resampleHeight`, `--resampleHeightWidth/-z <h> <w>`, `--resampleHeightWidthMax/-Z <max>`|缩放图片|
|`--cropToHeightWidth/-c <h> <w>`, `--cropOffset <x> <y>`|剪切图片|
|`--padToHeightWidth/-p <h> <w>`|通过填充内边框缩放图片，填充颜色通过`--padColor <hex=000000>`设置|
|`--rotate/-r <degree>`|旋转图片|
|`--flip/-f <horizontal,vertical>`|翻转图片|

# 图片处理（imagemagick）

> `brew install imagemagick`，安装后提供`display`, `convert`, `montage`, `identity`等命令。

```sh
# 查看支持的格式
> identify -list format
# 转换格式
> convert 1.jpg 1.png
> convert *.jpg *.png
# 特效
```

`convert`命令选项

|选项|含义||
|-|-|-|
|`-affine <matrix>`|仿射变换|*affine transform matrix*|
|`-adjoin`|合成多图片文件，如gif, tiff等|*join images into a single multi-image file*|
|`-antialias`|反锯齿|*remove pixel-aliasing*|
|`-authenticate <password>`|解密|*decipher image with this password*|
|`-attenuate <value>`|设置升噪衰减值|*lessen (or intensify) when adding noise to an image*|
|`-annotate geometry text`|添加备注|*annotate the image with text*|
|`-auto-gamma`| 自动调整伽马值|*automatically adjust gamma level of image*|
|`-auto-level`|自动调整|*automatically adjust color levels of image*|
|`-auto-orient`|自动调整|*automatically orient (rotate) image*|
|`-auto-threshold method`|自动调整|*automatically perform image thresholding*|
|`-background <none/<color>>`|设置背景色|
|`-bias <value>`|设置卷积偏离值|*add bias when convolving an image*｜
|`-bilateral-blur <geometry>`|双边滤波|*non-linear, edge-preserving, and noise-reducing smoothing filter*|
|`-black-threshold <value>`||*force all pixels below the threshold into black*|
|`-blur <geometry>`|模糊|*reduce image noise and reduce detail levels*|
|`-border <geometry>`, `-bordercolor <color>`|添加边框|*surround image with a border of color*|
|`-brightness-contrast <geometry>`|调整明度|*improve brightness / contrast of the image*|
|`-canny <geometry>`|（极简风格）边缘提取|*detect edges in the image*|
|`-charcoal <radius>`|炭笔化|*simulate a charcoal drawing*|
|`-chop <geometry>`|移除像素|*remove pixels from the image interior*|
|`-contrast` |调整对比度|*enhance or reduce the image contrast*|
|`-contrast-stretch <geometry>` |提高对比度|*improve contrast by 'stretching' the intensity range*|
|`-convolve <coefficients>`|卷积|*apply a convolution kernel to the image*|
|`-deskew <threshold>`|拉直图像|*straighten an image*|
|`-despeckle`|减少图片中的斑点|*reduce the speckles within an image*|
|`-distort <method> <args>`|扭曲图像|*distort images according to given method and args*|
|`-draw <string>`|注释图片|*annotate the image with a graphic primitive*|
|`-edge <radius>`|（细节）边缘提取|*apply a filter to detect edges in the image*|
|`-emboss <radius>`|浮雕化|*emboss an image*|
|`-enhance`|通过数字滤波器提升噪点|*apply a digital filter to enhance a noisy image*|
|`-equalize`|通过直方图均衡化图片|*perform histogram equalization to an image*|
|`-evaluate <operator> <value>`|进行数学运算、逻辑运算或关系运算|*evaluate an arithmetic, relational, or logical expression*|
|`-extent <geometry>`|设置图片大小|*set the image size*|
|`-extract <geometry>`|截取区域|*extract area from image*|
|`-flatten`|平滑序列|*flatten a sequence of images*|
|`-fft`|离散傅里叶变换|*implements the discrete Fourier transform (DFT)*|
|`-flip`|垂直翻转|*flip image vertically*|
|`-floodfill <geometry> <color>`|填充区域|*floodfill the image with color*|
|`-flop`|水平翻转|*flop image horizontally*|
|`-frame <geometry>`|用装饰性边框环绕图片|*surround image with an ornamental border*|
|`-function <name> <parameters>`|对图片数据执行函数|*apply function over image values*|
|`-gamma <level>`|伽马校正|*level of gamma correction*|
|`-gaussian-blur <geometry>`|高斯模糊|*reduce image noise and reduce detail levels*|
|`-grayscale <method>`|灰度图|*convert image to grayscale*|
|`-identify`|识别图片格式和特征|*identify the format and characteristics of the image*|
|`-ift`|反向离散傅里叶变换|*implements the inverse discrete Fourier transform (DFT)*|
|`-implode amount`|向中心坍缩|*implode image pixels about the center*|
|`-integral`|计算图片像素数|*calculate the sum of values (pixel values) in the image*|
|`-interpolative-resize geometry`|通过插值缩放图片|*resize image using interpolation*|
|`-kmeans <geometry>`|褪色|*K means color reduction*|
|`-kuwahara <geometry>`|保留边缘的降噪滤波|*edge preserving noise reduction filter*|
|`-lat geometr`|自适应局部图像阈值处理|*local adaptive thresholding*|
|`-level value`|对比度调平|*adjust the level of image contrast*|
|`-level-colors <color,color>`|（通过给定颜色进行）颜色调平|*level image with the given colors*|
|`-linear-stretch <geometry>`|通过拉伸饱和度提高对比度|*improve contrast by 'stretching with saturation'*|
|`-liquid-rescale geometry`|通过接缝雕刻（seam-carving）缩放图片|*rescale image with seam-carving*|
|`-local-contrast geometry`|增强局部对比|*enhance local contrast*|
|`-mean-shift geometry`|均值偏移|*delineate arbitrarily shaped clusters in the image*|
|`-median <geometry>`|中值滤波|*apply a median filter to the image*|
|`-mode <geometry>`|使每个像素都是相邻像素的主色|*make each pixel the 'predominant color' of the neighborhood*|
|`-modulate <value>`|调整明度、对比度和色调|*vary the brightness, saturation, and hue*|
|`-monochrome`|黑白图|*transform image to black and white*|
|`-motion-blur <geometry>`|模拟运动模糊|*simulate motion blur*|
|`-negate`|补色|*replace every pixel with its complementary color*|
|`-noise <geometry>`|提升或降低噪点|*add or reduce noise in an image*|

# Xcode命令行工具

> [Xcode Command Line Tools](https://mac.install.guide/commandlinetools/index.html)：将Xcode的底层功能提供到命令行中，以便脚本脚用和喜欢命令行操作的开发者。

工具目录：

```bash
ls /Library/Developer/CommandLineTools/usr/bin/
```

安装：

```bash
xcode-select --install
```

# 关闭流氓进程

1. 活动监视器查看进程的父进程，如果是`launchd`，执行后续操作

2. 找到开机启动配置文件

3. 使用[`plutil`](#管理plist文件：plutil)将配置文件中的`KeepAlive`改为`false`；删除`StartInterval`和`StartCalendarInterval`属性，删除`SuccessfulExit`属性；如果不需要开启启动，将`RunAtLoad`也改为`false`；

4. 如果父进程不是`launchd`，则继续执行第一步，找到最终进程即可

```bash
# 直接搜索配置文件（自动启动的服务），注意，对于二进制格式的.plist无法直接搜索，可以先找到文件。
grep -iw -e 'RunAtLoad' \
         -e 'KeepAlive' \
         -e 'StartInterval' \
         -e 'StartCalendarInterval' \
         -e 'SuccessfulExit' \
         /System/Library/Launch*/*.plist \
         /Library/Launch*/*.plist \
         ~/Library/LaunchAgents/*.plist
```

例如禁止*Microsoft AutoUpdate*（包括*Edge*）弹窗：

```bash
# 查找microsoft产品相关的配置文件，比如使用关键词 microsoft：
ls /System/Library/Launch*/*.plist \
   /Library/Launch*/*.plist \
   ~/Library/LaunchAgents/*.plist | grep -i microsoft

# 找到文件：
# /Library/LaunchAgents/com.microsoft.update.agent.plist
# /Library/LaunchDaemons/com.microsoft.autoupdate.helper.plist

# 删除定期开启（StartInterval）：
plutil -remove StartInterval /Library/LaunchAgents/com.microsoft.update.agent.plist
# 取消开机启动（RunAtLoad）：
plutil -replace RunAtLoad -bool NO /Library/LaunchAgents/com.microsoft.update.agent.plist
# 让系统加载最新的配置
launchctl load /Library/LaunchAgents/com.microsoft.update.agent.plist
```

# 通过命令设置文件的默认打开软件

参考：[Set vscode as the default editor for text files on mac](https://www.darraghoriordan.com/2021/09/15/vscode-default-text-files-mac/)

1. 先安装`duti`：

```bash
brew install duti
```

2. 设置vscode为默认打开软件

2.1 获取vscode的软件ID（*bundle ID*）

```bash
osascript -e 'id of app "Code"'
# 打印: com.microsoft.VSCode
```

```bash
while read -d ' ' line; do
  # program=$(duti -x $line 2>/dev/null | head -1)
  [[ $line ]] && duti -s com.microsoft.VSCode $line all
done <<< '.c .cpp .cs .css .go .java .js .sass .scss .less .vue .cfg .json .jsx .log .lua .md .php .pl .py .rb .rs .ts .tsx .txt .conf .yaml .yml .toml'
```
