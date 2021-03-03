- [Productivity](#productivity)
  - [CLI](#cli)
    - [`autojump`](#autojump)
    - [`zsh`](#zsh)
      - [`zsh-autosuggestions`](#zsh-autosuggestions)
      - [`zsh-completions`](#zsh-completions)
      - [`zsh-syntax-highlighting`](#zsh-syntax-highlighting)
      - [`pure-prompt`](#pure-prompt)
      - [`tldr`: Simplified and community-driven man pages](#tldr-simplified-and-community-driven-man-pages)
      - [`thefuck`: Correct errors in previous console commands.](#thefuck-correct-errors-in-previous-console-commands)
  - [Editor](#editor)
    - [`vscode`](#vscode)
      - [`change-case`](#change-case)
      - [`Code Runner`](#code-runner)
      - [`Markdown All in One`](#markdown-all-in-one)
      - [`Markdown+Math`: LaTeX Math for Markdown](#markdownmath-latex-math-for-markdown)
      - [`npm intellisense`](#npm-intellisense)
      - [`Path Intellisense`](#path-intellisense)
      - [`Polacode`: Polaroid for your code](#polacode-polaroid-for-your-code)
      - [`Quokka`: Live Scratchpad for JavaScript](#quokka-live-scratchpad-for-javascript)
      - [`REST Client`](#rest-client)
      - [`Sort JSON objects`](#sort-json-objects)
      - [`Sort JS obejct keys`](#sort-js-obejct-keys)
      - [`Terminal`: Run in Text Editor Directly](#terminal-run-in-text-editor-directly)
      - [`Terminal Tabs`: Add Each Terminal Tab to Status Bar](#terminal-tabs-add-each-terminal-tab-to-status-bar)
      - [`Todo Tree`](#todo-tree)
      - [`WakaTime`: Metrics, insights, and time tracking automatically generated from your programming activity.](#wakatime-metrics-insights-and-time-tracking-automatically-generated-from-your-programming-activity)
    - [Font](#font)
      - [`Fira Code`](#fira-code)
      - [`Operator Mono`](#operator-mono)
  - [MacOS](#macos)
    - [`brew`: Package Manager](#brew-package-manager)
    - [更改源](#更改源)
    - [`Dash`: API Documentation Browser and Code Snippet Manager](#dash-api-documentation-browser-and-code-snippet-manager)
  - [SaaS](#saas)
    - [`Analyse your HTTP response headers`](#analyse-your-http-response-headers)
    - [`FunDebug`: 专业的应用错误监控平台](#fundebug-专业的应用错误监控平台)
  - [Other](#other)
    - [`asciinema`: Record terminal session](#asciinema-record-terminal-session)
    - [`you-get`: Command-line utility to download media contents (videos, audios, images) from the Web.](#you-get-command-line-utility-to-download-media-contents-videos-audios-images-from-the-web)
    - [`cloc`: Count lines of code.](#cloc-count-lines-of-code)

# Productivity

## CLI

### `autojump`

> https://github.com/wting/autojump

### `zsh`

#### `zsh-autosuggestions`

> https://github.com/zsh-users/zsh-autosuggestions

#### `zsh-completions`

> https://github.com/zsh-users/zsh-completions

#### `zsh-syntax-highlighting`

> https://github.com/zsh-users/zsh-syntax-highlighting

#### `pure-prompt`

> https://github.com/sindresorhus/pure

#### `tldr`: Simplified and community-driven man pages

> https://github.com/tldr-pages/tldr

#### `thefuck`: Correct errors in previous console commands.

> https://github.com/nvbn/thefuck

## Editor

### `vscode`

#### `change-case`

#### `Code Runner`

#### `Markdown All in One`

#### `Markdown+Math`: LaTeX Math for Markdown

#### `npm intellisense`

#### `Path Intellisense`

#### `Polacode`: Polaroid for your code

#### `Quokka`: Live Scratchpad for JavaScript

#### `REST Client`

#### `Sort JSON objects`

#### `Sort JS obejct keys`

#### `Terminal`: Run in Text Editor Directly

#### `Terminal Tabs`: Add Each Terminal Tab to Status Bar

#### `Todo Tree`

#### `WakaTime`: Metrics, insights, and time tracking automatically generated from your programming activity.

### Font

#### `Fira Code`

> https://github.com/tonsky/FiraCode

#### `Operator Mono`

> https://github.com/coderJianXun/Operator-Mono

## MacOS

### `brew`: Package Manager

- `brew commands`: list commands
- `brew search`
- `brew upgrade`
- `brew missing`
- `brew leaves`
- `brew uses`
- `brew outdated`
- `brew pin/unpin`
- `brew postinstall`
- `brew reinstall`
- `brew options`
- `brew shellenv`
- `brew --repo`

### 更改源

1. [Homebrew](http://mirrors.ustc.edu.cn/help/brew.git.html):

```sh
cd "$(brew --repo)"
git remote set-url origin https://mirrors.ustc.edu.cn/brew.git
```

2. [Homebrew-Core](http://mirrors.ustc.edu.cn/help/homebrew-core.git.html):

```sh
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin https://mirrors.ustc.edu.cn/homebrew-core.git
```

3. [Homebrew-Cask](http://mirrors.ustc.edu.cn/help/homebrew-cask.git.html):

```sh
cd "$(brew --repo)"/Library/Taps/homebrew/homebrew-cask
git remote set-url origin https://mirrors.ustc.edu.cn/homebrew-cask.git
```

4. [Homebrew-Bottles](http://mirrors.ustc.edu.cn/help/homebrew-bottles.html)

设置环境变量`HOMEBREW_BOTTLE_DOMAIN`为`https://mirrors.ustc.edu.cn/homebrew-bottles`

例如:
```sh
echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles' >> ~/.bash_profile
source ~/.bash_profile
```

### `Dash`: API Documentation Browser and Code Snippet Manager

## SaaS

### `Analyse your HTTP response headers`

> https://securityheaders.com

### `FunDebug`: 专业的应用错误监控平台

> https://www.fundebug.com/

## Other

### `asciinema`: Record terminal session

### `you-get`: Command-line utility to download media contents (videos, audios, images) from the Web.

> https://github.com/soimort/you-get

### `cloc`: Count lines of code.

> https://github.com/AlDanial/cloc

> cloc counts blank lines, comment lines, and physical lines of source code in many programming languages.
