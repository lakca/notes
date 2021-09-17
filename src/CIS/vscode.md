---
title: Vscode
date: 2020-08-04T09:26:34.574Z
---

- [View](#view)
- [Shortcut](#shortcut)
- [常用命令](#常用命令)
  - [toggle](#toggle)
  - [focus](#focus)
  - [close](#close)
  - [open](#open)
  - [copy](#copy)
  - [reveal](#reveal)
  - [maximize](#maximize)
  - [explorer](#explorer)
  - [run](#run)
  - [move](#move)
  - [fold](#fold)
  - [show](#show)
  - [*extension](#extension)
- [tip](#tip)
  - [breadcrumb](#breadcrumb)
  - [editor group](#editor-group)

## View

- activity bar
- side bar
- status bar
- workbench
- editor
- editor group
- tab
- breadcrumb
- minimap
- panel
- problem pane
- output pane
- debug pane
- terminal pane
- command palette

## Shortcut

⌥ (alternative/option)
⌃ (control)
⇧ (shift)
⌘ (command)

| Command                                          | Shortcut               | When               |
| ------------------------------------------------ | ---------------------- | ------------------ |
| Toggle SideBar                                   | `⌘ + B`                |
| Toggle Panel                                     | `⌘ + J`                |
| Split Editor                                     | `⌘ + \, ⌘ + \`         | !terminalFocus     |
|                                                  | `⌘ + \, ⌘ + ← (↑ → ↓)` |                    |
|                                                  | `⌃ + enter`            | SideBarFocused     |
|                                                  | `⌘ + enter`            | QuickOpen(`⌘ + P`) |
| Split Panel Terminal                             | `⌘ + \, ⌘ + \`         |
| Kill Panel Terminal                              | `⇧ + ⌘ + \`            |
|                                                  |                        |
| Focus Editor                                     | `⌘ + 1 (2...)`         |
| Focus SideBar                                    | `⌘ + 0, ⌘ + 0`         |
| Focus Panel                                      |
| Focus Panel Problem                              | `⌘ + 0, ⌘ + 1`         |
| Focus Panel Output                               | `⌘ + 0, ⌘ + 2`         |
| Focus Panel Debug                                | `⌘ + 0, ⌘ + 3`         |
| Focus Panel Terminal                             | `⌘ + 0, ⌘ + 4`         |
|                                                  |                        |
| cycle through files opened                       | `⌃ + tab`              |
| open previous/next editor                        | `⌥ + ⌘ + ← (→)`        |
| open first/last editor in group                  | `⌥ + ← (→)`            |
| open previous/next editor in group               | `⌘ + K, ⌥ + ⌘ + ← (→)` |
| move editor left/right                           | `⌘ + K, ⇧ + ⌘ + ← (→)` |
| move editor group left/up/right/down             | `⌘ + K, ← (↑ → ↓)`     |
| move editor into previous/above/next/below group | `⌃ + ⌘ + ← (↑ → ↓)`    |
| close all editors in the editor group            | `⌘ + K + W`            |
| close all editors                                | `⌘ + K, ⌘ + W`         |
| terminal: focus previous/next pane               | `⌥ + ⌘ + ← (→)`        |
| fold                                             | `⌥ + ⌘ + [`            |
| fold all                                         | `⌘ + K, ⌘ + 0`         |
| fold all block comments                          | `⌘ + K, ⌘ + /`         |
| fold recursively                                 | `⌘ + K, ⌘ + [`         |
| toggle fold                                      | `⌘ + K, ⌘ + L`         |
| select all occurrences of Find Match（Find All） | `⇧ + ⌘ + L`            |

## 常用命令

### toggle

- toggle editor area visibility
- toggle status bar visibility
- toggle activity bar visibility
- toggle integrated terminal
- toggle panel
- toggle maximized panel
- toggle render whitespace
- toggle auto save
- toggle breadcrumbs
- toggle tab visibility
- toggle zen mode
- toggle screencast mode (show activity in screen)
- toggle editor type (eg. edit mode and preview mode)
- toggle word wrap
- toggle minimap
- toggle full screen
- toggle problems
- toggle side bar position
- toggle column selection mode
- toggle editor group sizes

### focus

- focus breadcrumbs
- focus into side bar
- focus active editor group
- focus into panel
- focus above editor group
- focus below editor group
- focus left editor group
- focus right editor group
- focus previous editor group
- focus next editor group
- focus first editor group
- focus last editor group
- focus previous part
- focus next part
- focus terminal view
- focus debug console view
- focus output view
- focus problems view
- focus on files explorer
- focus search view
- focus on installed view
- explorer: focus on open editors view
- explorer: focus on folders view
- explorer: focus on timeline view
- explorer: focus on outline view

### close

- close saved editors in group
- close other editors in group
- close editors to the left in group
- close editors to the right in group
- close editors in other groups
- close editors in all groups
- close all editors in group
- close all editors
- close all editor groups

### open

- open settings(json)
- open settings(ui)
- open log file

### copy

- copy path of active file
- copy relative path of active file

### reveal

- reveal active file in side bar
- reveal in finder/explorer

### maximize

- maximize editor group
- maximize editor group and hide side bar
- toggle maximized panel

### explorer

- collapse folder in explorer

### run

- run active file in active terminal

### move

- move panel left/right
- move editor into first/last/left/right/above/below/next/previous group

### fold

- fold
- fold all
- fold all regions
- fold all block comments
- fold recursively

### show

- show all editors by appearance
- show all editors by recently used
- show editors in active group by recently used
- show editor context menu

### *extension

- sort lines
- sort json
- sort requires
- sort imports
- sort package.json

## tip

### breadcrumb

- `focus breadcrumb`
  - `alt + ←/→`
  - type to search
  - `enter` to select

### editor group

- toggle editor group sizes
- maximize editor group
- reset editor group sizes
- move editor into first/last/left/right/above/below/next/previous group
- move editor group left/right/up/down
- new editor group above/below
- new editor group to the left/right
- join editor group with next group
- join all editor groups
- focus first/last/left/right/above/below/next/previous editor group
- close editors to the left/right in group
- close editors in other groups
- close editors in all groups
- open first/last/next/previous editor in group
