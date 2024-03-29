---
date: 2021-12-24T18:35:16+08:00
title: 快捷键
---

# Bash

| Shortcut          | Action                                   |
| ----------------- | ---------------------------------------- |
| Move              |                                          |
| `ctrl+a`          | move to line start (`Home`)              |
| `ctrl+e`          | move to line end (`End`)                 |
| `ctrl+f`          | move character forward (`⇨`)             |
| `ctrl+b`          | move character backward (`⇦`)            |
| `alt+f`           | move word forward                        |
| `alt+b`           | move word backward                       |
| `ctrl+xx`         | move between start and current           |
| Edit              |                                          |
| `ctrl+d`          | delete character under cursor            |
| `alt+del`         | delete word backward                     |
| `alt+d`           | delete word forward                      |
| `ctrl+h`          | delete character backward (`⌫`)          |
| `ctrl+w`          | cut word backward                        |
| `ctrl+k`          | cut to line end                          |
| `ctrl+u`          | cut to line start                        |
| `ctrl+u (zsh)`    | cut line                                 |
| `ctrl+y`          | paste last cut                           |
| `ctrl+t`          | swap character forward                   |
| `alt+t`           | swap character backward                  |
| `esc+t`           | swap word backward                       |
| `ctrl+-`          | undo                                     |
| `alt+u`           | uppercase from cursor to word end        |
| `alt+l`           | lowercase from cursor to word end        |
| `alt+c`           | uppercase character and move to word end |
| `alt+r`           | uppercase from cursor to word end        |
| Special Keys      |                                          |
| `ctrl+i`          | `tab`                                    |
| `ctrl+j`          | `newline`                                |
| `ctrl+m`          | `enter`                                  |
| `ctrl+[`          | `escape`                                 |
| History           |                                          |
| `ctrl+p`          | history backward (`⇧`)                   |
| `ctrl+n`          | history forward (`⇩`)                    |
| `ctrl+r`          | search history backward                  |
| `ctrl+s`          | search history forward                   |
| `ctrl+o`          | execute ctrl+r/ctrl+s                    |
| `ctrl+g`          | escape from history searching mode       |
| Process           |                                          |
| `ctrl+c`          | kill process                             |
| `ctrl+z`          | suspend process to background            |
| `(cmd) fg %num`   | restore suspended process foreground     |
| `(cmd) bg %num`   | restore suspended process background     |
| `(cmd) kill %num` | kill suspended process background        |
| `(cmd) jobs`      | list shell background processes          |
| `ctrl+d`          | exit shell                               |
| `ctrl+[[`         | sudo                                     |

# VSCode

| Shortcut                             | Action                                                  |
| ------------------------------------ | ------------------------------------------------------- |
| Goto                                 |                                                         |
| `cmd+k cmd+q`                        | Go to Last Edit Location                                |
| `ctrl+g`                             | Go to Line/Column...                                    |
| `cmd+t`                              | Go to Symbol in Workspace...                            |
| `cmd+shift+o` (`@`)                  | Go to Symbol in Editor...                               |
| `cmd+shift+\`                        | Go to Bracket                                           |
| `cmd+p`                              | Go to File...                                           |
| `cmd+k cmd+q`                        | Go to Last Edit Location                                |
| `ctrl+g` (`:`)                       | Go to Line/Column...                                    |
| `f8`                                 | Go to Next Problem in Files (Error, Warning, Info)      |
| `alt+f8`                             | Go to Next Problem (Error, Warning, Info)               |
| `f7`                                 | Go to Next Symbol Highlight                             |
| `f12`                                | Go to Definition                                        |
| `alt+f12`                            | Peek Definition                                         |
| `shift+f12`                          | Go to References                                        |
| Focus                                |                                                         |
| `alt+f alt+f`                        | Explorer: Focus on folders view                         |
| `alt+f alt+s`                        | Search: Focus on Search View                            |
| `alt+f alt+o`                        | Explorer: Focus on Outline View                         |
| `alt+f alt+i`                        | Output: Focus on Output View                            |
| `alt+f alt+d`                        | TODOs: Focus on TODOs View                              |
| `alt+f alt+c`                        | Debug Console: Focus on Debug Console View              |
| `alt+f alt+t`                        | Terminal: Focus on Terminal View                        |
| `cmd+shift+.`                        | Focus Breadcrumbs                                       |
| Toggle                               |                                                         |
| `alt+cmd+/`                          | Toggle Block Comment                                    |
| `cmd+k cmd+l`                        | Toggle Fold                                             |
| `alt+z`                              | View: Toggle Word Wrap                                  |
| `ctrl+shift+m`                       | Toggle Tab Key Moves Focus [Tab Trapping][tab-trapping] |
| `cmd+k z`                            | View: Toggle Zen Mode                                   |
| ``ctrl+` ``                          | View: Toggle Terminal                                   |
| `cmd+j`                              | View: Toggle Panel                                      |
| `cmd+up`                             | View: Toggle Maximized Panel                            |
| `cmd+b`                              | View: Toggle Side Bar Visibility                        |
| `cmd+shift+u`                        | View: Toggle Output                                     |
| `cmd+shift+y`                        | View: Toggle Debug Console                              |
|                                      | Toggle Window Tabs Bar                                  |
|                                      | View: Toggle Activity Bar Visibility                    |
|                                      | View: Toggle Breadcrumbs                                |
|                                      | View: Toggle Editor Area Visibility                     |
|                                      | View: Toggle Side Panel                                 |
| Reveal                               |                                                         |
| `alt+r alt+f`                        | File: Reveal Active File in Side Bar                    |
| `alt+cmd+c`                          | File: Copy Path of Active File                          |
| `alt+cmd+shift+c`                    | File: Copy Relative Path of Active File                 |
| `cmd+k o`                            | File: Open Active File in New Window                    |
| Cursor                               |                                                         |
| `cmd+u`                              | Cursor Undo                                             |
| `alt+left/right`                     | cursorWordLeft/cursorWordRight                          |
| `alt+shift+left/right`               | cursorWordLeftSelect/cursorWordRightSelect              |
| `ctrl+alt+left/right`                | cursorWordPartLeft/cursorWordPartRight                  |
| `ctrl+alt+shift+left/right`          | cursorWordPartLeftSelect/cursorWordPartRightSelect      |
| `alt+cmd+up/down`                    | Add Cursor Above/Below                                  |
| `cmd+k cmd+b`                        | Set Selection Anchor                                    |
| `cmd+k cmd+k`                        | Select From Anchor to Cursor                            |
| Line Editing                         |                                                         |
| `alt+up/down`                        | Move Line Up/Down                                       |
| `alt+cmd+up/down`                    | Add Cursor Above/Below                                  |
| `alt+shift+up/down`                  | Copy Line Up/Down                                       |
| `cmd+shift+k`                        | Delete Line                                             |
| `cmd+l`                              | Expand Line Selection                                   |
| `cmd+shift+enter`                    | Insert Line Above                                       |
| `ctrl+j`                             | Join Lines                                              |
| `cmd+backspace`                      | Delete All Left                                         |
| `cmd+delete`/`ctrl+k`                | Delete All Right                                        |
| `ctrl+shift+left/right`              | Expand Selection                                        |
| Fold                                 |                                                         |
| `cmd+k cmd+0/j`                      | Fold/Unfold All                                         |
| `alt+cmd+[/]`                        | Fold/Unfold                                             |
| `cmd+k cmd+l`                        | Toggle Fold                                             |
| `cmd+k cmd+[/]`                      | Fold/Unfold Recursively                                 |
| `cmd+k cmd+/`                        | Fold All Block Comments                                 |
| `cmd+k cmd+1`...                     | Fold Level 1 ...                                        |
| Format                               |                                                         |
| `cmd+k cmd+f`                        | Format Selection                                        |
| `alt+shift+f`                        | Format Document                                         |
| Selection                            |                                                         |
| `cmd+shift+l`                        | Select All Occurrences of Find Match                    |
| Show                                 |                                                         |
| `cmd+k cmd+i`                        | Show Hover                                              |
| `alt+space`                          | Trigger Suggest                                         |
| Others                               |                                                         |
| `cmd+k cmd+x`                        | Trim Trailing Whitespace                                |
| `cmd+shift+[/]`,`alt+cmd+left/right` | View: Open Previous/Next Editor                         |

[tab-trapping]:https://code.visualstudio.com/docs/editor/accessibility#_tab-trapping
