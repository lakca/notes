---
title: 技术-Vim
date: 2020-10-09T07:22:16.283Z
---

# 快捷键

## change.txt

### Deleting Text

| Command                    | Synonym       | Usage                                  |                                                                 |
| -------------------------- | ------------- | -------------------------------------- | --------------------------------------------------------------- |
| Deleting text (*deleting*) |               |                                        |                                                                 |
| `.`                        |               |                                        | **Repeat** last change                                          |
| `x`                        | `dl`, `<Del>` | `[count]x`                             | **Cut** [count] characters under and after cursor into register |
| `X`                        | `dh`          | `[count]X`                             | **Cut** [count] characters before cursor into register          |
| `d`                        |               | `[count]d{motion}`                     | **Cut** <motion> text into register                             |
| `:d`                       |               | `:[range]d[elete]`,`:[range]d [count]` | **Cut** <range> text into register                              |
| `dd`                       |               | `[count]dd`                            | **Cut** [count] lines into register                             |
| `D`                        | `d$`          | `[count]D`                             | **Cut** to end of [count] lines into register                   |
| `J`                        |               | `[count]J`                             | **Join** [count] lines, replacing indent with 2 spaces          |
| `gJ`                       |               | `[count]gJ`                            | **Join** [count] lines                                          |
| `:j`                       |               | `:[range]j[oin]`                       | **Join** [range] lines, replacing indent with 2 spaces          |
|                            |               | `:[range]j[oin]!`                      | **Join** [range] lines                                          |

### Delete and Insert (Replace)

| Command                         | Synonym | Usage                 |                                                           |
| ------------------------------- | ------- | --------------------- | --------------------------------------------------------- |
| Delete and Insert (*replacing*) |         |                       |                                                           |
| `R`                             |         |                       | **Replace Mode**: replace under cursor as typing          |
| `c`                             |         | `[count]c{motion}`    | **Change**(*Cut* & *Insert*) <motion> [count] text        |
| `cc`                            |         | `[count]cc`           | **Change** [count] lines                                  |
| `C`                             | `c$`    | `[count]C`            | **Change** to end of [count] lines                        |
| `:c`                            |         | `:[range]c[hange][!]` | **Change** [range] lines, with `!` to toggle `autoindent` |
| `s`                             | `cl`    | `[count]s`            | **Substitute**(*Cut* & *Insert*) [count] characters       |
| `S`                             | `cc`    | `[count]S`            | **Substitute** [count] lines                              |
|                                 |         |                       |                                                           |

### Simple Changes

| Command                          | Synonym | Usage                   |                                                                  |
| -------------------------------- | ------- | ----------------------- | ---------------------------------------------------------------- |
| Simple Changes (*simple-change*) |         |                         |                                                                  |
| `r`                              |         | `[count]r{char}`        | **Replace** [count] character under cursor with {char}           |
| `~`                              |         | `[count]~`              | **Switch Case** of [count] characters under cursor               |
| `g~` (`U`, `u`, `?`)             |         | `g~{motion}`            | **Switch Case** (upper, lower, ROT13) of <motion> text           |
| `g~~` (`U`, `u`, `?`)            | `g~g~`  | `g~~`                   | **Switch Case** (upper, lower, ROT13) of current line            |
| `ctrl+a`                         |         | `[count]ctrl+a`         | **Increment** the (continuous) number under cursor with [count]  |
| `ctrl+x`                         |         | `[count]ctrl+x`         | **Decrement** the (continuous) number under cursor with [count]  |
| `<` (`>`)                        |         | `<{motion}`             | **Shift** <motion> lines one `shiftwidth` leftwards (rightwards) |
| `<<` (`>>`)                      |         | `[count]<<`             | **Shift** [count] lines one `shiftwidth` leftwards (rightwards)  |
| `:<` (`>`)                       |         | `:[range]<`             | **Shift** [range] lines one `shiftwidth` leftwards (rightwards)  |
| `:left`                          |         | `:[range]left [indent]` | **Align** [range] lines with [indent]                            |
|                                  |         |                         |                                                                  |

### Complex Changes

| Command                            | Synonym    | Usage                                                     |                                                                                                  |
| ---------------------------------- | ---------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Complex changes (*complex-change*) |            |                                                           |                                                                                                  |
| `:s` (`:smagic`,`:snomagic`)       |            | `:[range]s[ubstitute]/{pattern}/{string}/[flags] [count]` | **Substitute** [pattern] for each line in [range] with [string]. See [flags] with `:s_flags`     |
| `:&`                               | `:s`       | `:[range]&[&][flags] [count]`                             | **Repeat** last `:s` with same search pattern and substitute string, but without the same flags. |
| `:~`                               |            | `:[range]~[&] [flags] [count]`                            | **Repeat** last substitute with same substitute string but with last used search pattern.        |
| `g&`                               | `:%s//~/&` |                                                           | **Repeat** last substitute with last search pattern on all lines with the same flags             |
|                                    |            |                                                           |                                                                                                  |

### Copying and Moving Text

| Command                               | Synonym | Usage                        |                                                                              |
| ------------------------------------- | ------- | ---------------------------- | ---------------------------------------------------------------------------- |
| Copying and moving text (*copy-move*) |         |                              |                                                                              |
| `"`                                   |         | `"{a-zA-Z0-9.%#:-"}`         | use **Register** `{a-zA-Z0-9.%#:-"}` for next *Delete*, *Yank* or *Put*      |
| `:registers`                          |         | `:reg[isters] [name]`        | list **Registers** of [name]                                                 |
| `y`                                   |         | `["x][count]y{motion}`       | **Yank** <motion> text into register [x]                                     |
| `:y`                                  |         | `:[range]y[ank] [x]`         | **Yank** <range> lines into register [x]                                     |
|                                       |         | `:[range]y[ank] [x] [count]` | **Yank** [count] lines into register [x], starting from last line of [range] |
| `yy`                                  | `Y`     | `["x][count]yy`              | **Yank** [count] lines into register [x]                                     |
| `p`                                   |         | `["x][count]p`               | **Put** AFTER cursor [count] times from register [x]                         |
| `:p`                                  |         | `:[line]pu[t] [x]`           | **Put** AFTER [line] from register [x]                                       |
|                                       |         | `:[line]pu[t]! [x]`          | **Put** BEFORE [line] from register [x]                                      |
| `gp`                                  |         | `["x][count]gp`              | Same as `p`, but leave cursor just after the new text                        |
| `P`                                   |         | `["x][count]P`               | **Put** BEFORE cursor [count] times from register [x]                        |
| `gP`                                  |         | `["x][count]gP`              | Same as `P`, but leave cursor just after the new text                        |
|                                       |         |                              |                                                                              |

### Formating Text

| Command                        | Synonym | Usage                      |                                                                                                               |
| ------------------------------ | ------- | -------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Formatting text (*formatting*) |         |                            |                                                                                                               |
| `:center`                      |         | `:[range]ce[nter] [width]` | **Center** lines in [range] between [width] columns (default is `textwidth` or 80 when `textwidth` is 0)      |
| `:right`                       |         | `:[range]ri[ght] [width]`  | **Right-Align** lines in [range] between [width] columns (default is `textwidth` or 80 when `textwidth` is 0) |
| `:left`                        |         | `:[range]le[ft] [indent]`  | **Left-Align** lines in [range], set indent to [indent] (default 0)                                           |
| `gq`                           |         | `gq{motion}`               | **Format** lines that <motion> moves over                                                                     |
| `gqq`                          | `gqgq`  |                            | **Format** current line                                                                                       |
|                                |         |                            |                                                                                                               |
| `u`                            |         | `[count]u`                 | **Undo** [count] times                                                                                        |
| `U`                            |         | `U`                        | **Undo** all changes on one line                                                                              |
| `ctrl+r`                       |         | `[count]ctrl+r`            | **Redo** [count] times                                                                                        |

## insert.txt

| Command                                         | Synonym  | Usage                      |                                                                                   |
| ----------------------------------------------- | -------- | -------------------------- | --------------------------------------------------------------------------------- |
| Special keys (valid in **Insert/Replace Mode**) |          |                            |                                                                                   |
| `ctrl+h`                                        |          |                            | **Delete** character before cursor                                                |
| `ctrl+w`                                        |          |                            | **Delete** word before cursor                                                     |
| `ctrl+u`                                        |          |                            | **Delete** all before cursor in the line                                          |
| `ctrl+d`                                        |          |                            | **Delete** one `shiftwidth` of indent at start of current line                    |
| `0 ctrl+d`                                      |          |                            | **Delete** all indent at start of current line                                    |
| `^ ctrl+d`                                      |          |                            | **Delete** all indent at start of current line, but will be restored in next line |
| `ctrl+i`                                        | `<Tab>`  |                            | **Insert** one tab                                                                |
| `ctrl+j`                                        | `<NL>`   |                            | **Insert** new line                                                               |
| `ctrl+m`                                        | `<CR>`   |                            | **Insert** new line                                                               |
| `ctrl+@`                                        |          |                            | **Insert** previously inserted text and stop insert                               |
| `ctrl+a`                                        |          |                            | **Insert** previously inserted text                                               |
| `ctrl+r`                                        |          | `ctrl+r {register}`        | **Insert** contents of register                                                   |
| `ctrl+r ctrl+r`                                 |          | `ctrl+r ctrl+r {register}` | **Insert** contents of register **literally**                                     |
| `ctrl+r ctrl+o`                                 |          | `ctrl+r ctrl+o {register}` | **Insert** contents of register **literally**, without auto-indent                |
| `ctrl+r ctrl+p`                                 |          | `ctrl+r ctrl+p {register}` | **Insert** contents of register **literally**, with fixing indent                 |
| `ctrl+t`                                        |          |                            | **Insert** one `shiftwidth` of indent at start of current line                    |
| `ctrl+v`                                        | `ctrl+q` |                            | **Insert** next non-digit **literally**                                           |
| `ctrl+e`                                        |          |                            | **Insert** the character which is below the cursor                                |
| `ctrl+y`                                        |          |                            | **Insert** the character which is above the cursor                                |
|                                                 |          |                            |                                                                                   |

### Completion

| Command                       | Synonym | Usage |                                                                      |
| ----------------------------- | ------- | ----- | -------------------------------------------------------------------- |
| Completion (*ins-completion*) |         |       |                                                                      |
| `ctrl+x ctrl+l`               |         |       | **Completion** lines                                                 |
| `ctrl+x ctrl+n`               |         |       | **Completion** keywords in current file                              |
| `ctrl+x ctrl+k`               |         |       | **Completion** keywords in `dictionary`                              |
| `ctrl+x ctrl+t`               |         |       | **Completion** keywords in `thesaurus`                               |
| `ctrl+x ctrl+i`               |         |       | **Completion** keywords in current file and included files           |
| `ctrl+x ctrl+]`               |         |       | **Completion** tags                                                  |
| `ctrl+x ctrl+f`               |         |       | **Completion** file names                                            |
| `ctrl+x ctrl+d`               |         |       | **Completion** definitions and macros                                |
| `ctrl+x ctrl+v`               |         |       | **Completion** VIM command-line                                      |
| `ctrl+x ctrl+u`               |         |       | **Completion** user-defined completions                              |
| `ctrl+x ctrl+s`               |         |       | **Completion** spell suggestions (`:setlocal spell spelllang=en_us`) |
| `ctrl+x ctrl+o`               |         |       | **Completion** omni completion                                       |
|                               |         |       |                                                                      |

### Insert Mode Command

| Command                            | Synonym | Usage                 |                                                                  |
| ---------------------------------- | ------- | --------------------- | ---------------------------------------------------------------- |
| Insert mode commands (*inserting*) |         |                       |                                                                  |
| `i`                                |         | `[count]i`            | **Insert** before CURSOR [count] times                           |
| `:i`                               |         | `:[range]i[nsert][!]` | **Insert** several lines above [range], `!` toggles `autoindent` |
| `I`                                |         | `[count]I`            | **Insert** before first non-blank in LINE [count] times          |
| `gI`                               |         | `[count]gI`           | **Insert** before column 1 in line [count] times                 |
| `gi`                               |         | `[count]gi`           | **Insert** at where last insert mode was stopped [count] times   |
| `a`                                |         | `[count]a`            | **Append** after CURSOR [count] times                            |
| `:a`                               |         | `:[range]a[ppend][!]` | **Append** several lines below [range], `!` toggles `autoindent` |
| `A`                                |         | `[count]A`            | **Append** at the end of LINE [count] times                      |
| `o`                                |         | `[count]o`            | **Open** new line below [count] times                            |
| `O`                                |         | `[count]O`            | **Open** new line above [count] times                            |
|                                    |         |                       |                                                                  |

### Inserting a file

| Command                             | Synonym | Usage                           |                                                             |
| ----------------------------------- | ------- | ------------------------------- | ----------------------------------------------------------- |
| Inserting a file (*inserting-file*) |         |                                 |                                                             |
|                                     |         |                                 |                                                             |
| `:r`                                |         | `:[range]r[ead] [++opt] [name]` | **Insert** [range] of the file [name], default current file |
|                                     |         | `:[range]r[ead] [++opt] !{cmd}` | **Insert** [range] of the {cmd} output                      |
| `:R`                                |         |                                 | **Replace Mode**                                            |
|                                     |         |                                 |                                                             |

## motion.txt

### Left-right Motions

| Command                                   | Synonym              | Usage     |                                                                                       |
| ----------------------------------------- | -------------------- | --------- | ------------------------------------------------------------------------------------- |
| Left-right motions (*left-right-motions*) |                      |           |                                                                                       |
| `h`                                       | `<Left>`, `ctrl+h`   |           |                                                                                       |
| `l`                                       | `<Right>`, `<Space>` |           |                                                                                       |
| `0`                                       | `<Home>`             |           | **Goto** first character of line, *exclusive*                                         |
| `^`                                       |                      |           | **Goto** first non-blank character of line, *exclusive*                               |
| `$`                                       | `<End>`              |           | **Goto** end of line, *inclusive*                                                     |
| `g_`                                      |                      |           | **Goto** the last non-blank character of the line, *inclusive*                        |
| `g0`                                      | `g<Home>`            |           | **Goto** the first character of *screen line* when `wrap` on, *exclusive*             |
| `g$`                                      | `g<End>`             |           | **Goto** the last character of *screen line* when `wrap` on, *exclusive*              |
| `g^`                                      |                      |           | **Goto** the first *non-blank* character of *screen line* when `wrap` on, *exclusive* |
| `g$`                                      |                      |           | **Goto** the first *non-blank* character of *screen line* when `wrap` on, *exclusive* |
| `gm`                                      |                      |           | **Goto** character in halfway a *screenwidth* to the right                            |
| `gM`                                      |                      |           | **Goto** character in halfway of line                                                 |
| `\|`                                      |                      |           | **Goto** screen column [count] in the current line, *exclusive*                       |
| `f`                                       |                      | `f{char}` | **Goto** [count]'th occurrence of {char} to the right, *inclusive*                    |
| `F`                                       |                      | `F{char}` | **Goto** [count]'th occurrence of {char} to the left, *exclusive*                     |
| `t`                                       |                      | `t{char}` | **Goto** before [count]'th occurrence of {char} to the right, *inclusive*             |
| `T`                                       |                      | `T{char}` | **Goto** before [count]'th occurrence of {char} to the left, *exclusive*              |
|                                           |                      |           |                                                                                       |

### Up-down Motions

| Command                             | Synonym                              | Usage       |                                                                                                                                                     |
| ----------------------------------- | ------------------------------------ | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Up-down motions (*up-down-motions*) |                                      |             |                                                                                                                                                     |
| `;`                                 |                                      |             | **Repeat** latest `f`, `t`, `F` or `T` [count] times                                                                                                |
| `,`                                 |                                      |             | **Repeat** latest `f`, `t`, `F` or `T` in opposite direction [count] times                                                                          |
| `k`                                 | `<Up>`, `ctrl+p`                     |             | **Goto** [count] lines upward *linewise*                                                                                                            |
| `j`                                 | `<Down>`, `ctrl+j`, `<NL>`, `ctrl+n` |             | **Goto** [count] lines downward *linewise*                                                                                                          |
| `gk`                                | `g<Up>`                              |             | **Goto** [count] display lines upward (differs from `k` when lines wrap)                                                                            |
| `gj`                                | `g<Down>`                            |             | **Goto** [count] display lines downward (differs from `j` when lines wrap)                                                                          |
| `-`                                 |                                      |             | **Goto** [count] lines upward, on the first non-blank character *linewise*                                                                          |
| `+`                                 | `ctrl+m`, `<CR>`                     |             | **Goto** [count] lines downward, on the first non-blank character *linewise*                                                                        |
| `_`                                 |                                      |             | **Goto** [count] - 1 lines downward, on the first non-blank character *linewise*                                                                    |
| `G`                                 |                                      |             | **Goto** line [count], default first line, on the first non-blank character *linewise*                                                              |
| `gg`                                |                                      |             | **Goto** line [count], default last line, on the first non-blank character *linewise*                                                               |
| `:[range]`                          |                                      |             | **Goto** the last line of [range]                                                                                                                   |
| `{count}%`                          |                                      |             | **Goto** {count} percentage in the file, on the first non-blank in the line *linewise*                                                              |
| `go`                                | `:[range]go[to] [count]`             | `[count]go` | **Goto** [count] byte in the buffer.  Default [count] is one, start of the file.  When giving [range], the last number in it used as the byte count |
|                                     |                                      |             |                                                                                                                                                     |

### Word Motions

| Command                       | Synonym | Usage |                                                                        |
| ----------------------------- | ------- | ----- | ---------------------------------------------------------------------- |
| Word motions (*word-motions*) |         |       |                                                                        |
| `w`                           |         |       | **Forward** [count] words, *exclusive*                                 |
| `W`                           |         |       | **Forward** [count] WORDS(continuous non-blank charaters), *exclusive* |
| `e`                           |         |       | **Forward** the end of word [count], *inclusive*                       |
| `E`                           |         |       | **Forward** the end of WORD [count], *inclusive*                       |
| `b`                           |         |       | **Backward** word [count]                                              |
| `B`                           |         |       | **Backward** WORD [count]                                              |
| `ge`                          |         |       | **Backward** the end of word [count], *inclusive*                      |
| `gE`                          |         |       | **Backward** the end of WORD [count], *inclusive*                      |
|                               |         |       |                                                                        |

### Text Object Motions

| Command                                | Synonym    | Usage |                                                         |
| -------------------------------------- | ---------- | ----- | ------------------------------------------------------- |
| Text-Object motions (*object-motions*) |            |       |                                                         |
| `(`, `)`                               |            |       | **Backward/Forward** [count] *sentences* , *exclusive*  |
| `{`, `}`                               |            |       | **Backward/Forward** [count] *paragraphs* , *exclusive* |
| `[[`, `]]`                             | `[]`, `][` |       | **Backward/Forward** [count] *sections* , *exclusive*   |
| `[[`                                   |            |       | **Goto** previous '{' in the first column               |
| `]]`                                   |            |       | **Goto** next '{' in the first column                   |
| `[]`                                   |            |       | **Goto** previous '}' in the first column               |
| `][`                                   |            |       | **Goto** next '}' in the first column                   |
|                                        |            |       |                                                         |

### Text Object Selection

| Command                                 | Synonym | Usage |                                                                           |
| --------------------------------------- | ------- | ----- | ------------------------------------------------------------------------- |
| Text Object Selection (*object-select*) |         |       |                                                                           |
| `aw`                                    |         |       | a **word**, leading or trailing white space is included, but not counted. |
| `iw`                                    |         |       | inner **word**                                                            |
| `aW`                                    |         |       | a **WORD**                                                                |
| `iW`                                    |         |       | inner **WORD**                                                            |
| `as`                                    |         |       | a **sentence**                                                            |
| `is`                                    |         |       | inner **sentence**                                                        |
| `ap`                                    |         |       | a **paragraph**                                                           |
| `ip`                                    |         |       | inner **paragraph**                                                       |
| `a"`, `a'`, `` a` ``                    |         |       | a **quote** string                                                        |
| `i"`, `i'`, `` i` ``                    |         |       | inner **quote** string                                                    |
| `a[`, `a]`                              |         |       | a **[]** block                                                            |
| `i[`, `i]`                              |         |       | inner **[]** block                                                        |
| `a(`, `a)`                              | `ab`    |       | a **()** block                                                            |
| `i(`, `i)`                              | `ib`    |       | inner **()** block                                                        |
| `a{`, `a}`                              | `aB`    |       | a **{}** block                                                            |
| `i{`, `i}`                              | `iB`    |       | inner **{}** block                                                        |
| `a<`, `a>`                              |         |       | a **<>** block                                                            |
| `i<`, `i>`                              |         |       | inner **<>** block                                                        |
| `at`                                    |         |       | a (html) **tag** block                                                    |
| `it`                                    |         |       | inner **tag** block                                                       |
|                                         |         |       |                                                                           |

### Marks

| Command                | Synonym                      | Usage        |                                                                                        |
| ---------------------- | ---------------------------- | ------------ | -------------------------------------------------------------------------------------- |
| Marks (*mark-motions*) |                              |              |                                                                                        |
| `m`                    |                              | `m{a-zA-Z}`  | **Mark** {a-zA-Z} at cursor position                                                   |
| `'`                    |                              | `'{mark}`    | **Goto** {mark}                                                                        |
| `` ` ``                |                              | `` `{mark}`` | **Goto** {mark}                                                                        |
| `'[`, `']`             | `` `[ ``, `` `] ``           |              | **Goto** the first/last character previously changes or yanked                         |
| `'<`, `'>`             | `` `< ``, `` `> ``           |              | **Goto** the first/last line or character of last selected Visual area                 |
| `'(`, `')`             | `` `( ``, `` `) ``, `(`, `)` |              | **Goto** the start/end of current sentence                                             |
| `'{`, `'}`             | `` `{ ``, `` `} ``, `{`, `}` |              | **Goto** the start/end of current paragraph                                            |
| `''`                   | ` `` `                       |              | **Goto** the position before the latest jump                                           |
| `'"`                   | `` `" ``                     |              | **Goto** the cursor position when last exiting the current buffer                      |
| `'^`                   | `` `^ ``                     |              | **Goto** the position where the cursor was the last time when Insert mode was stopped. |
| `'.`                   | `` `. ``                     |              | **Goto** the position where the last change was made                                   |
|                        |                              |              |                                                                                        |

### Jumps

| Command                | Synonym | Usage           |                                                       |
| ---------------------- | ------- | --------------- | ----------------------------------------------------- |
| Jumps (*jump-motions*) |         |                 |                                                       |
| `:jumps`               |         | `:ju[mps]`      | **Print** *jump list*                                 |
| `:changes`             |         |                 | **Print** *change list*                               |
| `:clearjumps`          |         | `:cle[arjumps]` | **Clear** *jump list* of current window               |
| `ctrl+o`               |         |                 | **Goto** [count] older cursor position in *jump list* |
| `ctrl+i`               | `<Tab>` |                 | **Goto** [count] newer cursor position in *jump list* |
| `g;`                   |         |                 | **Goto** [count] older position in *change list*      |
| `g,`                   |         |                 | **Goto** [count] newer position in *change list*      |
|                        |         |                 |                                                       |

### Various

| Command                     | Synonym | Usage |                                                                                           |
| --------------------------- | ------- | ----- | ----------------------------------------------------------------------------------------- |
| Various (*various-motions*) |         |       |                                                                                           |
| `%`                         |         |       | **Goto** the other side of symbol pairs like `{}`,`[]`,`()`..., see `matchpairs` options  |
| `[(`, `[{`                  |         |       | **Goto** [count] previous unmatched '(' or '{' , *exclusive*                              |
| `](`, `]{`                  |         |       | **Goto** [count] next unmatched '(' or '{' , *exclusive*                                  |
| `[m`, `[M`                  |         |       | **Goto** [count] previous start/end of a method , *exclusive*                             |
| `]m`, `]M`                  |         |       | **Goto** [count] next start/end of a method , *exclusive*                                 |
| `[*`                        | `[/`    |       | **Goto** [count] previous start of a C comment "/*", *exclusive*                          |
| `]*`                        | `]/`    |       | **Goto** [count] next end of a C comment "*/", *exclusive*                                |
| `H`                         |         |       | **Goto** first non-blank character of line [count] from top (Home) of window, *exclusive* |
| `M`                         |         |       | **Goto** first non-blank character of Middle line of window, *exclusive*                  |
| `L`                         |         |       | **Goto** first non-blank character of line [count] from bottom of window, *exclusive*     |
| 选择模式                    |         |       |                                                                                           |
| `v`                         |         |       | **View**：开启选择模式                                                                    |
| `V`                         |         |       | 开启行选择模式                                                                            |
| `ctrl+v`                    |         |       | 开启矩形选择模式                                                                          |
| 搜索                        |         |       |
| `/`                         |         |       | `/{pattern}[/[offset]]<CR>`前向（forward）搜索                                            |
| `?`                         |         |       | `?{pattern}[?[offset]]<CR>`后向（backward）搜索                                           |
| `n`, `N`                    |         |       | 重复、反向重复上次搜索                                                                    |
| `*`, `#`                    |         |       | 前向、后向搜索当前光标处标识符（单词）                                                    |
| `gd`, `gD`                  |         |       | 查找当前光标处标识符（类似变量）的本地、全局定义位置                                      |

## repeat.txt

### Simple Repeat

| Command                         | Synonym | Usage       |                                                                      |
| ------------------------------- | ------- | ----------- | -------------------------------------------------------------------- |
| Single Repeat (*single-repeat*) |         |             |                                                                      |
| `.`                             |         | `[count].`  | **Repeat** last change [count] times, also `y`, but not command-line |
| `@:`                            |         | `[count]@:` | **Repeat** last command-line [count] times                           |

### Complex Repeats

| Command                            | Synonym | Usage                  |                                                    |
| ---------------------------------- | ------- | ---------------------- | -------------------------------------------------- |
| Complex repeats (*complex-repeat*) |         |                        |                                                    |
| `q`                                |         | `q{0-9a-zA-Z"}`        | **Record** typed characters (macro) into register  |
|                                    |         | `q`                    | **Stop Recording**                                 |
| `@`                                |         | `[count]@{0-9a-zA-Z"}` | **Execute** the contents of register [count] times |
| `@@`                               |         | `[count]@@`            | **Repeat** previous `@{0-9a-z":*}` [count] times   |

## various.txt

| Command     | Synonym            | Usage                              |                                                                                                                     |
| ----------- | ------------------ | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `:version`  |                    | `:vegpuMemoryUsager[sion]`         |                                                                                                                     |
| `ga`        | `:as[cii]`         |                                    | **Print** the ascii value of the character under the cursor in decimal, hexadecimal and octal.                      |
| `8g8`       |                    |                                    | **Find** an illegal UTF-8 byte sequence at or after the cursor.                                                     |
| `:print`    |                    | `:[range]p[rint] [flags]`          | **Print** [range] lines (default current line), flag varies `#`(line number), `l`(like `:list`), `p`(like `:print`) |
|             |                    | `:[range]p[rint] {count} [flags]`  | **Print** [count] lines starting with [range] (default current line)                                                |
| `:list`     |                    | `:[range]l[ist] {count} [flags]`   | Just like `:print`, but display unprintable characters                                                              |
| `:number`   | `:#`               | `:[range]nu[mber] {count} [flags]` | Just like `:print`, but precede each line with line number                                                          |
| `:#!`       |                    |                                    | Ignored (**Comment**)                                                                                               |
| `:[range]=` |                    |                                    | **Print** the last line number in [range]                                                                           |
| `:.=`       |                    |                                    | **Print** current line number                                                                                       |
| `:shell`    |                    | `:sh[ell]`                         | Start a shell, defined by `shell` option                                                                            |
| `:!`        |                    | `:!{cmd}`                          | **Execute** {cmd} with the shell                                                                                    |
| `:!!`       |                    |                                    | **Repeat** last `:!{cmd}`                                                                                           |
| `:redir`    |                    | `:redi[r][!] > {file}`             | **Redirect** (output) messages to (append with `>>`) {file}                                                         |
|             |                    | `:redi[r] @{a-z}[>]`               | **Redirect** messages to (append with `>>`) register @{a-z}                                                         |
|             |                    | `:redi[r] @{A-Z}`                  | **Append** to register @{a-z}                                                                                       |
|             |                    | `:redi[r] @">`                     | **Redirect** messages to (append with `>>`) unnamed register                                                        |
|             |                    | `:redi[r] @+>`                     | **Redirect** messages to (append with `>>`) clipboard                                                               |
|             |                    | `:redi[r] => {var}`                | **Redirect** messages to (append with `==>`) variable                                                               |
|             |                    | `:redi[r] END`                     | End redirecting                                                                                                     |
| `:silent`   |                    | `:sil[ent][!] [cmd]`               | **Execute** {cmd} silently(no output messages, even error messages with using `!`), corresponding with `:unsilent`  |
| `K`         |                    |                                    | **Run** a program (`keywordprg`, default is `man`) to lookup the keyword under the cursor.                          |
| `:sleep`    | `:gs` (goto sleep) | `:[N]sl[eep] [N] [m]`              | **Sleep** [N] seconds, default is one, or milliseconds with [m]                                                     |

## editing.txt

### Editing a file

| Command                        | Synonym                                 | Usage                                     |                                                                                                  |
| ------------------------------ | --------------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Editing a file (*edit-a-file*) |                                         |                                           |                                                                                                  |
| `:files`                       | `:buffers[!] [flags]`, `:ls[!] [flags]` | `:files[!] [flags]`                       | **List** all buffers. indicators: `%`(current buffer), `#`(alternate buffer) and ...             |
| `:write`                       |                                         | `:[range]w[rite][!] [++opt] [>>] [file]`  | **Write** or **Append** (with `>>`) [range] of current buffer to the [file]                      |
| `:update`                      |                                         | `:[range]up[date][!] [++opt] [>>] [file]` | **Write** or **Append** (with `>>`) [range] of current buffer to the [file] only buffer modified |
| `:saveas`                      |                                         | `:sav[eas][!] [++opt] {file}`             | **Save** current buffer under the name {file}                                                    |
| `:file`                        |                                         | `:f[ile][!] {name}`                       | **Set** name of current buffer to {file}                                                         |
| `:0file`                       |                                         | `:0f[ile][!]`                             | **Remove** name of current buffer                                                                |
| `:edit`                        |                                         | `:e[dit][!] [++opt] [+cmd] [file]`        | **Open** [file], or re-edit current file                                                         |
|                                | `[count]ctrl+^`                         | `:e[dit] [++opt] [+cmd] #[count]`         | **Open** the [count]th buffer (as shown by `:files`)                                             |
| `:find`                        |                                         | `:[count]fin[d][!] [++opt] [+cmd] {file}` | **Find** [count]th match of {file} in `path` and then `:edit` it                                 |
| `:enew`                        |                                         | `:ene[w][!]`                              | **Open** a new, unnamed buffer                                                                   |
|                                | `:e #[count]`                           | `[count]ctrl+^`                           | **Open** [count]th file in the buffer list                                                       |
| `gf`                           |                                         | `[count]gf`                               | **Open** file under or after cursor                                                              |
| `gF`                           |                                         | `[count]gF`                               | **Open** file under or after cursor of certain line if a number follows the file name            |
| `ctrl+^`                       |                                         |                                           | **Switch** to previously edited file                                                             |
| `ctrl+g`                       | `:file`                                 |                                           | **Print** current file name, status                                                              |
| `g ctrl+g`                     |                                         |                                           | **Print** cursor position in detail                                                              |
|                                |                                         |                                           |                                                                                                  |

### Argument List

| Command                                        | Synonym        | Usage                                            |                                                                                                        |
| ---------------------------------------------- | -------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| The argument list (*argument-list*, *arglist*) |                |                                                  |                                                                                                        |
| `:args`                                        |                | `:ar[gs]`                                        | **Print** argument list                                                                                |
| `:argadd`                                      |                | `:arga[dd] [name] ...`                           | **Add** file [name] or current buffer to argument list                                                 |
| `:argedit`                                     |                | `:[count]arge[dit][!] [++opt] [+cmd] {name} ...` | **Add** file {name} to argument list and edit it                                                       |
| `:argdelete`                                   |                | `:argd[elete] {pattern} ...`                     | **Delete** files of {pattern} from argument list                                                       |
|                                                |                | `:[range]argd[elete]`                            | **Delete** files in {range} of argument list, e.g. current `argd`, 10 to last `:10,$argd`, all `%argd` |
| `:argument`                                    |                | `:[count]argu[ment][!] [count] [++opt] [+cmd]`   | **Open** file [count] in argument list                                                                 |
| `:next`                                        |                | `:[count]n[ext][!] [++opt] [+cmd]`               | **Open** next file in list                                                                             |
| `:previous`                                    | `:Next`        | `:[count]N[ext][!] [++opt] [+cmd]`               | **Open** previous file in list                                                                         |
| `:first`                                       | `:rewind`      | `:[count]fir[st][!] [++opt] [+cmd]`              | **Open** first one                                                                                     |
| `:last`                                        |                | `:[count]la[st][!] [++opt] [+cmd]`               | **Open** last one                                                                                      |
| `:wnext`                                       |                | `:[count]wn[ext][!] [++opt] [+cmd]`              | **Write** current and **Open** next one                                                                |
| `:wNext`                                       | `:wp[revious]` | `:[count]wN[ext][!] [++opt] [+cmd]`              | **Write** current and **Open** previous one                                                            |

## tabpage.txt

| Command        | Synonym                           | Usage                                         |                                                                                                    |
| -------------- | --------------------------------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `:tabs`        |                                   |                                               | **List** tabs                                                                                      |
| `:tabedit`     | `:tabnew`                         | `:[count]tabe[dit][!] [++opt] [++cmd] [file]` | **New** tab appearing after tab [count] or current tab, and edit [file]                            |
| `:tabfind`     |                                   | `:[count]tabf[ind] [++opt] [++cmd] {file}`    | **New** tab, and open {file}                                                                       |
| `:tab`         |                                   | `:[count]tab {cmd}`                           | **New** tab instead of window when *execute* {cmd} opening new window                              |
| `ctrl+w gf`    |                                   |                                               | **New** tab, and open file under or after cursor                                                   |
| `ctrl+w gF`    |                                   |                                               | **New** tab, and open file under or after cursor of certain line if a number follows the file name |
| `:tabclose`    |                                   | `:tabc[lose][!]`                              | **Close** current tab                                                                              |
|                | `:tabc[lose][!] [count]`          | `:[count]tabc[lose][!]`                       | **Close** the tab [count] (two previous `-2`, next `+`, third `3`, last `$`...)                    |
| `:tabonly`     |                                   | `:tabo[nly][!] [count]`                       | **Close** all tabs, except [count] or current one                                                  |
| `:tabnext`     | `gt`                              | `:tabn[ext]`                                  | **Switch** to next tab                                                                             |
|                | `[count]gt`                       | `:tabn[ext] [count]`                          | **Switch** to tab [count], the first is number one                                                 |
| `:tabprevious` | `:tabN[ext]`, `gT`                | `:tabp[revious]`                              | **Switch** to previous tab                                                                         |
|                | `:tabN[ext] [count]`, `[count]gT` | `:tabp[revious] [count]`                      | **Switch** to [count] tab back                                                                     |
| `:tabfirst`    | `:tabr[ewind]`                    | `:tabfir[st]`                                 | **Switch** to first tab                                                                            |
| `:tablast`     |                                   | `:tabla[st]`                                  | **Switch** to last tab                                                                             |
| `:tabmove`     | `:[N]tabm[ove]`                   | `:tabm[ove] [N]`                              | **Move** current tab to after tab [N]                                                              |
|                |                                   | `:tabm[ove] {+/-}[N]`                         | **Move** current tab [N] places to the right/left                                                  |

## Range

> Range (*[range]*/*cmdline-ranges*) 可以由多个行说明符*line specifiers*组成，以逗号`,`或分号`;`隔开。
> 以逗号`,`隔开时，紧随的行说明符匹配光标行之后的行；
> 以分号`;`隔开时，紧随的行说明符匹配上一个行说明符所在行之后的行；

| Line Specifiers |       |                                                       |
| --------------- | ----- | ----------------------------------------------------- |
| `{number}`      |       | an absolute line number                               |
| `.`             |       | current line number                                   |
| `$`             |       | last line number in file                              |
| `%`             | `1,$` |                                                       |
| `'t`            |       | position of mark t                                    |
| `'T`            |       | position of mark T, invalid if T is in another file   |
| `/{pattern}[/]` |       | next line where pattern matches                       |
| `?{pattern}[?]` |       | previous line where pattern matches                   |
| `\/`            |       | next line where previously search pattern matches     |
| `\?`            |       | previous line where previously search pattern matches |
| `\&`            |       | next line where previously substitute pattern matches |

- 以下所有模式都可以在后面加减数字: `[+|-] [number]`，如 `.+3`
- 如果在命令的分号`:`前面写上数字表示行数`[count]`，即此时`:`等价于`:.,.+(count - 1)`

## Mark

> Mark (*mark-motions*)，可以通过反引号`` ` ``和单引号`'`两种方式进行跳转，其中反引号`` ` ``跳转是*exclusive*的，即在非*linewise*时是不包括结束字符的。

特殊标记：

| Name       |                    |                                                                        |
| ---------- | ------------------ | ---------------------------------------------------------------------- |
| `'[`, `']` | `` `[ ``, `` `] `` | **Goto** the first/last character previously changes or yanked         |
| `'<`, `'>` | `` `< ``, `` `> `` | **Goto** the first/last line or character of last selected Visual area |
| `''`       | ` `` `             | **Goto** the position before the latest jump                           |
| `'"`       | `` `" ``           | **Goto** the cursor position when last exiting the current buffer      |

## Register

特殊寄存器：

| Name     |                                                                                                            |
| -------- | ---------------------------------------------------------------------------------------------------------- |
| `_`      | **black hole** register                                                                                    |
| `-`      | **small delete** register (less than one line)                                                             |
| `"`      | regardless of specific register, always filled with text deleted with `d`, `c`, `s`, `x`, or yank with `y` |
| `0`      | **yank** register                                                                                          |
| `1`      | **delete** register (no less than one line)                                                                |
| `.`      | last inserted text                                                                                         |
| `+`, `*` | clipboard contents                                                                                         |
| `%`      | file name                                                                                                  |
| `#`      | alternate file name                                                                                        |
| `/`      | last search pattern                                                                                        |
| `:`      | last command-line                                                                                          |
| `=`      | expression register                                                                                        |

## Pattern

| Pattern                     |                                                           |
| --------------------------- | --------------------------------------------------------- |
| `\m`                        | `magic`                                                   |
| `\M`                        | `nomagic`                                                 |
| `\v`                        | very magic                                                |
| `\V`                        | very nomagic                                              |
| `\c`                        | `ignorecase`                                              |
| `\C`                        | match case                                                |
| `\(\)`                      | group, likes `()`                                         |
| `\%(\)`                     | group, without counting as a sub-expression, likes `(?:)` |
| `\@=`                       | for preceding atom, likes `(?=pattern)` in Perl           |
| `\@123=`                    | same as `\@=`, but only look back 123 bytes               |
| `\@!`                       | for preceding atom, likes `(?!pattern)` in Perl           |
| `\@<=`                      | for preceding atom, likes `(?<=pattern)` in Perl          |
| `\@<!`                      | for preceding atom, likes `(?<!pattern)` in Perl          |
| `\@>`                       | for preceding atom, likes `(?>pattern)` in Perl           |
| `\{}`                       | any, as many as possible, same as `*`                     |
| `\{m,n}`                    | between m and n, as many as possible                      |
| `\{-}`                      | any, as few as possible                                   |
| `\{-m,}`                    | at least m, as few as possible                            |
| `\{-,n}`                    | at most n, as few as possible                             |
| `\{-m,n}`                   | between m and n, as few as possible                       |
| `.`                         | any character, but not end-of-line                        |
| `\_.`                       | any character or end-of-line                              |
| `^`, `$`                    | start/end-of-line (at end of pattern)                     |
| `\_^`, `\_$`                | start/end-of-line (used anywhere)                         |
| `\<`, `\>`                  | beginning/end of **word**                                 |
| `\%^`, `\%$`                | beginning/end of **file**                                 |
| `\%V`                       | inside **Visual area**                                    |
| `\%#`                       | at **cursor** position                                    |
| `\%23l`, `\%<23l`, `\%>23l` | at/above/below **line** 23                                |
| `\%23c`, `\%<23c`, `\%>23c` | at/before/after **col** 23                                |
| `\%'m`, `\%<'m`, `\%>'m`    | at/before/after **mark** m                                |
| `\u`                        | next character made uppercase                             |
| `\U`                        | following characters made uppercase, until `\E`           |
| `\l`                        | next character made lowercase                             |
| `\L`                        | following characters made lowercase, until `\E`           |
| `\e`, `\E`                  | end of `\u`, `\U`, `\l` and `\L`                          |

字符集

| magic | nomagic |                                                                                   |
| ----- | ------- | --------------------------------------------------------------------------------- |
| `\i`  | `\i`    | identifier character (see `isident` option)                                       |
| `\I`  | `\I`    | like `\i`, but excluding digits                                                   |
| `\k`  | `\k`    | keyword character (see `iskeyword` option)                                        |
| `\K`  | `\K`    | like `\k`, but excluding digits                                                   |
| `\f`  | `\f`    | file name character (see `isfname` option)                                        |
| `\F`  | `\F`    | like `\f`, but excluding digits                                                   |
| `\p`  | `\p`    | printable character (see `isprint` option)                                        |
| `\P`  | `\P`    | like `\p`, but excluding digits                                                   |
| `\s`  | `\s`    | whitespace character: `<Space>` and `<Tab>`                                       |
| `\S`  | `\S`    | non-whitespace character; opposite of `\s`                                        |
| `\d`  | `\d`    | digit:    `[0-9]`                                                                 |
| `\D`  | `\D`    | non-digit:   `[^0-9]`                                                             |
| `\x`  | `\x`    | hex digit:   `[0-9A-Fa-f]`                                                        |
| `\X`  | `\X`    | non-hex digit:   `[^0-9A-Fa-f]`                                                   |
| `\o`  | `\o`    | octal digit:   `[0-7]`                                                            |
| `\O`  | `\O`    | non-octal digit:  `[^0-7]`                                                        |
| `\w`  | `\w`    | word character:   `[0-9A-Za-z_]`                                                  |
| `\W`  | `\W`    | non-word character:  `[^0-9A-Za-z_]`                                              |
| `\h`  | `\h`    | head of word character:  `[A-Za-z_]`                                              |
| `\H`  | `\H`    | non-head of word character: `[^A-Za-z_]`                                          |
| `\a`  | `\a`    | alphabetic character:  `[A-Za-z]`                                                 |
| `\A`  | `\A`    | non-alphabetic character: `[^A-Za-z]`                                             |
| `\l`  | `\l`    | lowercase character:  `[a-z]`                                                     |
| `\L`  | `\L`    | non-lowercase character: `[^a-z]`                                                 |
| `\u`  | `\u`    | uppercase character:  `[A-Z]`                                                     |
| `\U`  | `\U`    | non-uppercase character  `[^A-Z]`                                                 |
| `\_x` | `\_x`   | where x is any of the characters above: character class with end-of-line included |

| very magic `\v` | magic `\m` | nomagic `\M` | very nomagic `\V` |                                  |
| --------------- | ---------- | ------------ | ----------------- | -------------------------------- |
| `$`             | `$`        | `$`          | `\$`              | end-of-line                      |
| `.`             | `.`        | `\.`         | `\.`              | any character except end-of-line |
| `*`             | `*`        | `\*`         | `\*`              | 0 or more previous atom          |
|                 | `\+`       | `\+`         |                   | 1 or more                        |
|                 | `\=`       | `\=`         |                   | 0 or 1                           |
|                 | `\?`       | `\?`         |                   | 0 or 1                           |
| `~`             | `~`        | `\~`         | `\~`              | latest substitute string         |
| `()`            | `\(\)`     | `\(\)`       | `\(\)`            | grouping into an atom            |
| `{}`            | `\{}`      | `\{}`        | `\{}`             | number of preceding atom         |
| `\|`            | `\\|`      | `\\|`        | `\\|`             | separating alternatives          |
| `\a`            | `\a`       | `\a`         | `\a`              | alphabetical character           |
| `\\`            | `\\`       | `\\`         | `\\`              | literal backslash                |
| `\.`            | `\.`       | `.`          | `.`               | literal '.'                      |
| `\{`            | `{`        | `{`          | `{`               | literal '{'                      |
| `a`             | `a`        | `a`          | `a`               | literal 'a'                      |

| Flags |                                                          |
| ----- | -------------------------------------------------------- |
| `g`   | Replace all occurrences in the line                      |
| `i`   | Ignore case for pattern                                  |
| `I`   | Do not ignore case for pattern                           |
| `n`   | Report the number of matches, do not actually substitute |
| `c`   | **Confirm** each substitution                            |
| `&`   | Must be the first one                                    |
| `p`   | Print the line containing the last substitute            |
| `#`   | Like `p`, with prepending line number                    |
| `l`   | Like `p` but print the text like `:list`                 |

## Spell Checking

- 开启拼写检查：`:setlocal spell spelllang=en_us`

| Commands |                                                   |
| -------- | ------------------------------------------------- |
| `]s`     | Move to next misspelled word                      |
| `[s`     | Move to previous misspelled word                  |
| `zg`     | Add word as a good word                           |
| `zG`     | Same as `zg`, but add word to `internal-wordlist` |
| `zw`     | Add word as a wrong word                          |
| `zW`     | Same as `zw`, but add word to `internal-wordlist` |

## 常见操作：

|             |                                                                                        |                       |
| ----------- | -------------------------------------------------------------------------------------- | --------------------- |
| `0`         | 移动到行首                                                                             |                       |
| `^`         | 移动到行首个非空字符                                                                   |                       |
| `$`         | 移动到行尾                                                                             |                       |
| `{n}G`      | 移动到n行首个非空字符                                                                  |                       |
| ` `` `,`''` | 跳回上个标记的地方（[*Mark*](http://vimdoc.sourceforge.net/htmldoc/motion.html#mark)） |                       |
|             |                                                                                        |                       |
| `cc`        | 清空当前行，开启输入模式                                                               |                       |
|             |                                                                                        |                       |
| `zz`        | 滚动视口使光标行居中                                                                   |                       |
|             |                                                                                        |                       |
| `*`, `#`    | 查找当前单词（backward，forward）                                                      |                       |
| `/`, `?`    | 开启正则表达式查找（backward，forward），使用`n`/`N`重复/反向重复上次查找              |                       |
|             |                                                                                        |                       |
| `o`, `O`    | 插入一行（below，above）                                                               |                       |
| `yy`, `dd`  | 复制、剪切当前行                                                                       |                       |
| `y0`, `y$`  | 复制（从光标开始）到行首、行尾（剪切同理）                                             |                       |
|             |                                                                                        |                       |
| `x`         | 删除字符                                                                               |                       |
| `X`         | 删除前一个字符                                                                         |                       |
| `diw`       | 删除单词                                                                               | **delete inner word** |
| `daw`       | 删除单词，包括其两边空格                                                               | **delete inner word** |

# 命令

## 命令小技巧

- 通过在配置名称前加上`no`，关闭配置，如 `:set nonumber`

- 通过在命令后面加上`!`，切换开关型配置值，如 `:set number!`

- 通过在命令后面加上`?`，获取命令值，如 `:set number?`

## 常用命令：

| `command` |     |
| --------- | --- |
| `:retab`  |     |

## 常用配置：

| `:set ...`       |                          |
| ---------------- | ------------------------ |
| `expandtab`      | 空格替代Tab              |
| `wrap`           | 折行                     |
| `number`         | 显示行号                 |
| `relativenumber` | 显示相对（可视区域）行号 |

## vim元信息

- vim启动的源文件列表：`:scriptnames/:scr`

## 获取配置项

`set <option>?`，如`set ruler?`

## 切换开关配置项

`set <option>!`，如`set ruler!`

## 编辑

`:edit <filename>`

## 设置鼠标操作

`set mouse`

- `n`：Normal mode and Terminal modes
- `v`：Visual mode
- `i`：Insert mode
- `c`：Command-line mode
- `h`：all previous modes when editing a help file
- `a`：all previous modes
- `r`：for |hit-enter| and |more-prompt| prompt

## 设置光标样式

`set guicursor/gcr`

- `n`：Normal mode
- `v`：Visual mode
- `ve`：Visual mode with 'selection' "exclusive" (same as 'v', if not specified)
- `o`：Operator-pending mode
- `i`：Insert mode
- `r`：Replace mode
- `c`：Command-line Normal (append) mode
- `ci`：Command-line Insert mode
- `cr`：Command-line Replace mode
- `sm`：showmatch in Insert mode
- `a`：all modes

值：

- `hor{N}`
- `ver{N}`
- `block`
- `blinkwait{N}`
- `blinkon{N}`
- `blinkoff{N}`
- `{group-name}`
- `{group-name}/{group-name}`

例如：

`n-c-v:block-nCursor`: in Normal, Command-line and Visual mode, use a block cursor with colors from the "nCursor" highlight group

## 光标位置

显示坐标：`set ruler`

显示坐标轴：`set cursorline/cul/nocursorline/nocul`，`set cursorcolumn/cuc/nocursorcolumn/nocuc`

## marks

- 列出标记：`:marks`

## 文件编码

`set fileencoding=utf-8`

可以提供多个编码，vim会从左到右尝试每个编码直至成功或者为空：

`set fileencoding=utf-8,latin1`

## 文件行号

- 显示绝对行号：`set number` 或 `set nu`

- 隐藏绝对行号：`set nonumber` 或 `set nonu`

- 开关绝对行号：`set number!` 或 `set nu!`

- 显示相对（光标的）行号：`set relativenumber` 或 `set rnu`

- 隐藏相对（光标的）行号：`set norelativenumber` 或 `set nornu`

- 开关相对（光标的）行号：`set norelativenumber!` 或 `set rnu!`

## 折行

`set wrap`,`set nowrap`

## 语法高亮

开关语法高亮：`:sy/:syn/:syntax enable/on/off/manual`（`on`是以默认值开启，`enable`保留通过`:highlight`自定义的样式）

- 显示当前语言的语法项：`:sy`

- 显示当前高亮主题名称：`:colo/:colorscheme`

- 显示当前高亮主题定义：`:hi/:highlight [{group-name}]`

- 禁用主题中的高亮：`:hi {group-name} NONE`

- 配置主题：`:hi [default] {group-name} {key}={arg} ..`

## 查找

- `\c` 忽略大小写；`\C` 区分大小写；也可通过[搜索选项](#搜索选项)全局设置；

```vim
/[\c|\C]<pattern>
```

## 查找替换

- `m`, `n` 均为行数，`%` 表示最后一行；
- `g` 表示替换所有：

```vim
:[<m>,[<n>]]s/<pattern>/<replacement>[/g]
```

例如：

```vim
<!-- 替换当前行所有的foo -->
:s/foo/bar/g

:5s/foo/bar/g

<!-- 替换1-10行，每行只替换一次 -->
:1,10s/foo/bar
```

## 搜索选项

- 忽略大小写：`:set ignorecase/ic`,`:set noignorecase`

- 高亮匹配结果：`:set hlsearch`, `:set nohlsearch`

- 增量搜索（增量搜索时，会在输入搜索模式时实时匹配结果，配合开启高亮很实用）：`:set incsearch`, `:set noincsearch`

- 循环搜索（到达文件首尾继续搜索）：`:set wrapscan`, `:set nowrapscan`

## Tab和Space

- 用space替代tab：`:set expandtab`

- 将tab的宽度设置为2个space：`:set tabstop=2`

- 设置自动缩进的宽度：`:set shiftwidth=2`

- 自动转换tab和space：`:set softtabstop=6`。一般用在`shiftwidth`和`tabstop`不匹配时，如：

  - 如果`tabstop=2`，`softtabstop=6`将是3个tab；

  - 如果`tabstop=4`，`softtabstop=6`将是1个tab和2个space；

## 提示和补全

- 命令行（tab）自动提示：`:set wildmenu`

- Insert-Mode自动补全：`:set completeopt=menu/menuone/longest/preview/popup/popuphidden/noinsert/noselect`

## 自动缩进

以下选项后者覆盖前者：

- 使用上一行的缩进：`:set autoindent`

- 同上，但会识别一些C-like语法进行调整，一般使用这个即可：`:set smartindent`

- 更智能，有更多风格选项可选：`:set cindent`

- 最灵活，通过`indent-expression`定义：`:set indentexpr`

## 粘贴模式

`set paste`，粘贴模式下，会关闭很多格式化的选项（退出模式恢复原值），比如自动缩进、tab转换等。

## 不可见字符

- 显示不可见字符：`:set list`

- 查看所有特殊字符及对应的显示字符：`:digraphs`

- 设置不可见字符的显示字符：`:set listchars/lcs=<type>:<char>`

type:

- SpecialKeys:
  - `tab`
  - `space`
  - `trail`: 行尾空白符
  - `nbsp`: [不换行空格](https://zh.wikipedia.org/wiki/%E4%B8%8D%E6%8D%A2%E8%A1%8C%E7%A9%BA%E6%A0%BC)
- NonText
  - `eol`
  - `extends`: 当没开启折行（`wrap`）时的最后一列
  - `precedes`: 行首字符
  - `conceal`: 隐藏字符（一些特殊字符不占宽度，但实际存在）

## 查看vim启用了哪些特性

- 查看当前vim版本信息：`:version`

- vim编译时才可启用的特性：`:help +feature-list`

## 加密

- 设置加密密码：`:X`, `:set key=`

- 设置加密方法：`:set cm=zip/blowfish/blowfish2`

## 粘贴模式

`:set paste`

# 键名查询

- 获取所有按键代码（名称）: `:h keycodes`

| notation             | meaning                                                                               | equivalent | decimal          | value(s) ~                    |
| -                    | -                                                                                     | -          | -                | -                             |
| `<Nul>`              | zero                                                                                  | `CTRL-@`   | 0 (stored as 10) | *`<Nul>`*                     |
| `<BS>`               | backspace                                                                             | `CCTRL-H`  | 8                | *backspace*                   |
| `<Tab>`              | tab                                                                                   | `CCTRL-I`  | 9                | *tab* *Tab*  *linefeed*       |
| `<NL>`               | linefeed                                                                              | `CCTRL-J`  | 10               | (used for `<Nul>`)            |  |
| `<FF>`               | formfeed                                                                              | `CCTRL-L`  | 12               | *formfeed*                    |
| `<CR>`               | carriage return                                                                       | `CCTRL-M`  | 13               | *carriage-return*             |
| `<Return>`           | same as `<CR>`                                                                        |            |                  | *`<Return>`*                  |
| `<Enter>`            | same as `<CR>`                                                                        |            |                  | *`<Enter>`*                   |
| `<Esc>`              | escape                                                                                | `CTRL-[`   | 27               | *escape* *`<Esc>`*            |
| `<Space>`            | space                                                                                 |            | 32               | *space*                       |
| `<lt>`               | less-than                                                                             | `<`        | 60               | *`<lt>`*                      |
| `<Bslash>`           | backslash                                                                             | `\`        | 92               | *backslash* *`<Bslash>`*      |
| `<Bar>`              | vertical bar                                                                          | `\|`       | 124              | *`<Bar>`*                     |
| `<Del>`              | delete                                                                                |            | 127              |                               |
| `<CSI>`              | command sequence intro                                                                | `ALT-Esc`  | 155              | *`<CSI>`*                     |
| `<xCSI>`             | CSI when typed in the GUI                                                             |            |                  | *`<xCSI>`*                    |
| `<EOL>`              | end-of-line (can be `<CR>`, `<LF>` or `<CR><LF>`, depends on system and 'fileformat') |            |                  | *`<EOL>`*                     |
| `<Up>`               | cursor-up                                                                             |            |                  | *cursor-up* *cursor_up*       |
| `<Down>`             | cursor-down                                                                           |            |                  | *cursor-down* *cursor_down*   |
| `<Left>`             | cursor-left                                                                           |            |                  | *cursor-left* *cursor_left*   |
| `<Right>`            | cursor-right                                                                          |            |                  | *cursor-right* *cursor_right* |
| `<S-Up>`             | shift-cursor-up                                                                       |            |                  |                               |
| `<S-Down>`           | shift-cursor-down                                                                     |            |                  |                               |
| `<S-Left>`           | shift-cursor-left                                                                     |            |                  |                               |
| `<S-Right>`          | shift-cursor-right                                                                    |            |                  |                               |
| `<C-Left>`           | control-cursor-left                                                                   |            |                  |                               |
| `<C-Right>`          | control-cursor-right                                                                  |            |                  |                               |
| `<F1>` - `<F12>`     | function keys 1 to 12                                                                 |            |                  | *function_key* *function-key* |
| `<S-F1>` - `<S-F12>` | shift-function keys 1 to 12                                                           |            |                  | *`<S-F1>`*
| `<Help>`             | help key                                                                              |            |                  |                               |
| `<Undo>`             | undo key                                                                              |            |                  |                               |
| `<Insert>`           | insert key                                                                            |            |                  |                               |
| `<Home>`             | home                                                                                  |            |                  | *home*                        |
| `<End>`              | end                                                                                   |            |                  | *end*                         |
| `<PageUp>`           | page-up                                                                               |            |                  | *page_up* *page-up*           |
| `<PageDown>`         | page-down                                                                             |            |                  | *page_down* *page-down*       |
| `<kHome>`            | keypad home (upper left)                                                              |            |                  | *keypad-home*                 |
| `<kEnd>`             | keypad end (lower left)                                                               |            |                  | *keypad-end*                  |
| `<kPageUp>`          | keypad page-up (upper right)                                                          |            |                  | *keypad-page-up*              |
| `<kPageDown>`        | keypad page-down (lower right)                                                        |            |                  | *keypad-page-down*            |
| `<kPlus>`            | keypad +                                                                              |            |                  | *keypad-plus*                 |
| `<kMinus>`           | keypad -                                                                              |            |                  | *keypad-minus*                |
| `<kMultiply>`        | keypad *                                                                              |            |                  | *keypad-multiply*             |
| `<kDivide>`          | keypad /                                                                              |            |                  | *keypad-divide*               |
| `<kEnter>`           | keypad Enter                                                                          |            |                  | *keypad-enter*                |
| `<kPoint>`           | keypad Decimal point                                                                  |            |                  | *keypad-point*                |
| `<k0>` - `<k9>`      | keypad 0 to 9                                                                         |            |                  | *keypad-0* *keypad-9*         |
| `<S-...>`            | shift-key                                                                             |            |                  | *shift* *<S-*                 |
| `<C-...>`            | control-key                                                                           |            |                  | *control* *ctrl* *<C-*        |
| `<M-...>`            | alt-key or meta-key                                                                   |            |                  | *meta* *alt* *<M-*            |
| `<A-...>`            | same as `<M-...>`                                                                     |            |                  | *<A-*                         |
| `<D-...>`            | command-key (Macintosh only)                                                          |            |                  | *<D-*                         |
| `<t_xx>`             | key with "xx" entry in termcap                                                        |            |                  |                               |

# 文档

[VIM REFERENCE MANUAL](http://vimdoc.sourceforge.net/htmldoc/quickref.html)

[VIM USER MANUAL](http://vimdoc.sourceforge.net/htmldoc/usr_toc.html):

**Getting Started** Read this from start to end to learn the essential commands.

- [usr\_01.txt](http://vimdoc.sourceforge.net/htmldoc/usr_01.html) About the manuals
  - [01.1](http://vimdoc.sourceforge.net/htmldoc/usr_01.html#01.1) Two manuals
  - [01.2](http://vimdoc.sourceforge.net/htmldoc/usr_01.html#01.2) Vim installed
  - [01.3](http://vimdoc.sourceforge.net/htmldoc/usr_01.html#01.3) Using the Vim [tutor](http://vimdoc.sourceforge.net/htmldoc/usr_01.html#tutor)
  - [01.4](http://vimdoc.sourceforge.net/htmldoc/usr_01.html#01.4) Copyright
- [usr\_02.txt](http://vimdoc.sourceforge.net/htmldoc/usr_02.html) The first steps in Vim
  - [02.1](http://vimdoc.sourceforge.net/htmldoc/usr_02.html#02.1) Running Vim for the First Time
  - [02.2](http://vimdoc.sourceforge.net/htmldoc/usr_02.html#02.2) Inserting text
  - [02.3](http://vimdoc.sourceforge.net/htmldoc/usr_02.html#02.3) Moving around
  - [02.4](http://vimdoc.sourceforge.net/htmldoc/usr_02.html#02.4) Deleting characters
  - [02.5](http://vimdoc.sourceforge.net/htmldoc/usr_02.html#02.5) Undo and Redo
  - [02.6](http://vimdoc.sourceforge.net/htmldoc/usr_02.html#02.6) Other editing commands
  - [02.7](http://vimdoc.sourceforge.net/htmldoc/usr_02.html#02.7) Getting out
  - [02.8](http://vimdoc.sourceforge.net/htmldoc/usr_02.html#02.8) Finding help
- [usr\_03.txt](http://vimdoc.sourceforge.net/htmldoc/usr_03.html) Moving around
  - [03.1](http://vimdoc.sourceforge.net/htmldoc/usr_03.html#03.1) Word [movement](http://vimdoc.sourceforge.net/htmldoc/intro.html#movement)
  - [03.2](http://vimdoc.sourceforge.net/htmldoc/usr_03.html#03.2) Moving to the start or end of a line
  - [03.3](http://vimdoc.sourceforge.net/htmldoc/usr_03.html#03.3) Moving to a character
  - [03.4](http://vimdoc.sourceforge.net/htmldoc/usr_03.html#03.4) Matching a paren
  - [03.5](http://vimdoc.sourceforge.net/htmldoc/usr_03.html#03.5) Moving to a specific line
  - [03.6](http://vimdoc.sourceforge.net/htmldoc/usr_03.html#03.6) Telling where you are
  - [03.7](http://vimdoc.sourceforge.net/htmldoc/usr_03.html#03.7) Scrolling around
  - [03.8](http://vimdoc.sourceforge.net/htmldoc/usr_03.html#03.8) Simple searches
  - [03.9](http://vimdoc.sourceforge.net/htmldoc/usr_03.html#03.9) Simple search patterns
  - [03.10](http://vimdoc.sourceforge.net/htmldoc/usr_03.html#03.10) Using marks
- [usr\_04.txt](http://vimdoc.sourceforge.net/htmldoc/usr_04.html) Making small changes
  - [04.1](http://vimdoc.sourceforge.net/htmldoc/usr_04.html#04.1) Operators and motions
  - [04.2](http://vimdoc.sourceforge.net/htmldoc/usr_04.html#04.2) Changing text
  - [04.3](http://vimdoc.sourceforge.net/htmldoc/usr_04.html#04.3) Repeating a change
  - [04.4](http://vimdoc.sourceforge.net/htmldoc/usr_04.html#04.4) [Visual](http://vimdoc.sourceforge.net/htmldoc/visual.html#Visual) mode
  - [04.5](http://vimdoc.sourceforge.net/htmldoc/usr_04.html#04.5) Moving text
  - [04.6](http://vimdoc.sourceforge.net/htmldoc/usr_04.html#04.6) Copying text
  - [04.7](http://vimdoc.sourceforge.net/htmldoc/usr_04.html#04.7) Using the [clipboard](http://vimdoc.sourceforge.net/htmldoc/gui.html#clipboard)
  - [04.8](http://vimdoc.sourceforge.net/htmldoc/usr_04.html#04.8) Text [objects](http://vimdoc.sourceforge.net/htmldoc/index.html#objects)
  - [04.9](http://vimdoc.sourceforge.net/htmldoc/usr_04.html#04.9) [Replace](http://vimdoc.sourceforge.net/htmldoc/insert.html#Replace) mode
  - [04.10](http://vimdoc.sourceforge.net/htmldoc/usr_04.html#04.10) Conclusion
- [usr\_05.txt](http://vimdoc.sourceforge.net/htmldoc/usr_05.html) Set your settings
  - [05.1](http://vimdoc.sourceforge.net/htmldoc/usr_05.html#05.1) The [vimrc](http://vimdoc.sourceforge.net/htmldoc/starting.html#vimrc) file
  - [05.2](http://vimdoc.sourceforge.net/htmldoc/usr_05.html#05.2) The example [vimrc](http://vimdoc.sourceforge.net/htmldoc/starting.html#vimrc) file explained
  - [05.3](http://vimdoc.sourceforge.net/htmldoc/usr_05.html#05.3) Simple mappings
  - [05.4](http://vimdoc.sourceforge.net/htmldoc/usr_05.html#05.4) Adding a [plugin](http://vimdoc.sourceforge.net/htmldoc/usr_05.html#plugin)
  - [05.5](http://vimdoc.sourceforge.net/htmldoc/usr_05.html#05.5) Adding a help file
  - [05.6](http://vimdoc.sourceforge.net/htmldoc/usr_05.html#05.6) The option [window](http://vimdoc.sourceforge.net/htmldoc/windows.html#window)
  - [05.7](http://vimdoc.sourceforge.net/htmldoc/usr_05.html#05.7) Often used [options](http://vimdoc.sourceforge.net/htmldoc/options.html#options)
- [usr\_06.txt](http://vimdoc.sourceforge.net/htmldoc/usr_06.html) Using [syntax](http://vimdoc.sourceforge.net/htmldoc/syntax.html#syntax) highlighting
  - [06.1](http://vimdoc.sourceforge.net/htmldoc/usr_06.html#06.1) Switching it on
  - [06.2](http://vimdoc.sourceforge.net/htmldoc/usr_06.html#06.2) No or wrong colors?
  - [06.3](http://vimdoc.sourceforge.net/htmldoc/usr_06.html#06.3) Different colors
  - [06.4](http://vimdoc.sourceforge.net/htmldoc/usr_06.html#06.4) With colors or without colors
  - [06.5](http://vimdoc.sourceforge.net/htmldoc/usr_06.html#06.5) Printing with colors
  - [06.6](http://vimdoc.sourceforge.net/htmldoc/usr_06.html#06.6) Further reading
- [usr\_07.txt](http://vimdoc.sourceforge.net/htmldoc/usr_07.html) Editing more than one file
  - [07.1](http://vimdoc.sourceforge.net/htmldoc/usr_07.html#07.1) Edit another file
  - [07.2](http://vimdoc.sourceforge.net/htmldoc/usr_07.html#07.2) A list of files
  - [07.3](http://vimdoc.sourceforge.net/htmldoc/usr_07.html#07.3) Jumping from file to file
  - [07.4](http://vimdoc.sourceforge.net/htmldoc/usr_07.html#07.4) Backup files
  - [07.5](http://vimdoc.sourceforge.net/htmldoc/usr_07.html#07.5) Copy text between files
  - [07.6](http://vimdoc.sourceforge.net/htmldoc/usr_07.html#07.6) Viewing a file
  - [07.7](http://vimdoc.sourceforge.net/htmldoc/usr_07.html#07.7) Changing the file name
- [usr\_08.txt](http://vimdoc.sourceforge.net/htmldoc/usr_08.html) Splitting [windows](http://vimdoc.sourceforge.net/htmldoc/windows.html#windows)
  - [08.1](http://vimdoc.sourceforge.net/htmldoc/usr_08.html#08.1) Split a [window](http://vimdoc.sourceforge.net/htmldoc/windows.html#window)
  - [08.2](http://vimdoc.sourceforge.net/htmldoc/usr_08.html#08.2) Split a [window](http://vimdoc.sourceforge.net/htmldoc/windows.html#window) on another file
  - [08.3](http://vimdoc.sourceforge.net/htmldoc/usr_08.html#08.3) Window size
  - [08.4](http://vimdoc.sourceforge.net/htmldoc/usr_08.html#08.4) Vertical splits
  - [08.5](http://vimdoc.sourceforge.net/htmldoc/usr_08.html#08.5) Moving [windows](http://vimdoc.sourceforge.net/htmldoc/windows.html#windows)
  - [08.6](http://vimdoc.sourceforge.net/htmldoc/usr_08.html#08.6) Commands for all [windows](http://vimdoc.sourceforge.net/htmldoc/windows.html#windows)
  - [08.7](http://vimdoc.sourceforge.net/htmldoc/usr_08.html#08.7) Viewing differences with [vimdiff](http://vimdoc.sourceforge.net/htmldoc/diff.html#vimdiff)
  - [08.8](http://vimdoc.sourceforge.net/htmldoc/usr_08.html#08.8) Various
- [usr\_09.txt](http://vimdoc.sourceforge.net/htmldoc/usr_09.html) Using the [GUI](http://vimdoc.sourceforge.net/htmldoc/gui.html#GUI)
  - [09.1](http://vimdoc.sourceforge.net/htmldoc/usr_09.html#09.1) Parts of the [GUI](http://vimdoc.sourceforge.net/htmldoc/gui.html#GUI)
  - [09.2](http://vimdoc.sourceforge.net/htmldoc/usr_09.html#09.2) Using the mouse
  - [09.3](http://vimdoc.sourceforge.net/htmldoc/usr_09.html#09.3) The [clipboard](http://vimdoc.sourceforge.net/htmldoc/gui.html#clipboard)
  - [09.4](http://vimdoc.sourceforge.net/htmldoc/usr_09.html#09.4) [Select](http://vimdoc.sourceforge.net/htmldoc/visual.html#Select) mode
- [usr\_10.txt](http://vimdoc.sourceforge.net/htmldoc/usr_10.html) Making big changes
  - [10.1](http://vimdoc.sourceforge.net/htmldoc/usr_10.html#10.1) Record and playback commands
  - [10.2](http://vimdoc.sourceforge.net/htmldoc/usr_10.html#10.2) Substitution
  - [10.3](http://vimdoc.sourceforge.net/htmldoc/usr_10.html#10.3) Command ranges
  - [10.4](http://vimdoc.sourceforge.net/htmldoc/usr_10.html#10.4) The global command
  - [10.5](http://vimdoc.sourceforge.net/htmldoc/usr_10.html#10.5) [Visual](http://vimdoc.sourceforge.net/htmldoc/visual.html#Visual) block mode
  - [10.6](http://vimdoc.sourceforge.net/htmldoc/usr_10.html#10.6) Reading and [writing](http://vimdoc.sourceforge.net/htmldoc/editing.html#writing) part of a file
  - [10.7](http://vimdoc.sourceforge.net/htmldoc/usr_10.html#10.7) Formatting text
  - [10.8](http://vimdoc.sourceforge.net/htmldoc/usr_10.html#10.8) Changing [case](http://vimdoc.sourceforge.net/htmldoc/change.html#case)
  - [10.9](http://vimdoc.sourceforge.net/htmldoc/usr_10.html#10.9) Using an external program
- [usr\_11.txt](http://vimdoc.sourceforge.net/htmldoc/usr_11.html) Recovering from a crash
  - [11.1](http://vimdoc.sourceforge.net/htmldoc/usr_11.html#11.1) Basic [recovery](http://vimdoc.sourceforge.net/htmldoc/recover.html#recovery)
  - [11.2](http://vimdoc.sourceforge.net/htmldoc/usr_11.html#11.2) Where is the swap file?
  - [11.3](http://vimdoc.sourceforge.net/htmldoc/usr_11.html#11.3) Crashed or not?
  - [11.4](http://vimdoc.sourceforge.net/htmldoc/usr_11.html#11.4) Further reading
- [usr\_12.txt](http://vimdoc.sourceforge.net/htmldoc/usr_12.html) Clever tricks
  - [12.1](http://vimdoc.sourceforge.net/htmldoc/usr_12.html#12.1) [Replace](http://vimdoc.sourceforge.net/htmldoc/insert.html#Replace) a [word](http://vimdoc.sourceforge.net/htmldoc/motion.html#word)
  - [12.2](http://vimdoc.sourceforge.net/htmldoc/usr_12.html#12.2) Change "Last, First" to "First Last"
  - [12.3](http://vimdoc.sourceforge.net/htmldoc/usr_12.html#12.3) Sort a list
  - [12.4](http://vimdoc.sourceforge.net/htmldoc/usr_12.html#12.4) Reverse line order
  - [12.5](http://vimdoc.sourceforge.net/htmldoc/usr_12.html#12.5) Count words
  - [12.6](http://vimdoc.sourceforge.net/htmldoc/usr_12.html#12.6) Find a man page
  - [12.7](http://vimdoc.sourceforge.net/htmldoc/usr_12.html#12.7) Trim blanks
  - [12.8](http://vimdoc.sourceforge.net/htmldoc/usr_12.html#12.8) Find where a [word](http://vimdoc.sourceforge.net/htmldoc/motion.html#word) is used

**Editing Effectively** Subjects that can be read independently.

- [usr\_20.txt](http://vimdoc.sourceforge.net/htmldoc/usr_20.html) Typing command-line commands quickly
  - [20.1](http://vimdoc.sourceforge.net/htmldoc/usr_20.html#20.1) Command line editing
  - [20.2](http://vimdoc.sourceforge.net/htmldoc/usr_20.html#20.2) Command line [abbreviations](http://vimdoc.sourceforge.net/htmldoc/map.html#abbreviations)
  - [20.3](http://vimdoc.sourceforge.net/htmldoc/usr_20.html#20.3) Command line completion
  - [20.4](http://vimdoc.sourceforge.net/htmldoc/usr_20.html#20.4) Command line [history](http://vimdoc.sourceforge.net/htmldoc/cmdline.html#history)
  - [20.5](http://vimdoc.sourceforge.net/htmldoc/usr_20.html#20.5) Command line [window](http://vimdoc.sourceforge.net/htmldoc/windows.html#window)
- [usr\_21.txt](http://vimdoc.sourceforge.net/htmldoc/usr_21.html) Go away and come back
  - [21.1](http://vimdoc.sourceforge.net/htmldoc/usr_21.html#21.1) Suspend and resume
  - [21.2](http://vimdoc.sourceforge.net/htmldoc/usr_21.html#21.2) Executing shell commands
  - [21.3](http://vimdoc.sourceforge.net/htmldoc/usr_21.html#21.3) Remembering information; [viminfo](http://vimdoc.sourceforge.net/htmldoc/starting.html#viminfo)
  - [21.4](http://vimdoc.sourceforge.net/htmldoc/usr_21.html#21.4) Sessions
  - [21.5](http://vimdoc.sourceforge.net/htmldoc/usr_21.html#21.5) Views
  - [21.6](http://vimdoc.sourceforge.net/htmldoc/usr_21.html#21.6) Modelines
- [usr\_22.txt](http://vimdoc.sourceforge.net/htmldoc/usr_22.html) Finding the file to edit
  - [22.1](http://vimdoc.sourceforge.net/htmldoc/usr_22.html#22.1) The file explorer
  - [22.2](http://vimdoc.sourceforge.net/htmldoc/usr_22.html#22.2) The current directory
  - [22.3](http://vimdoc.sourceforge.net/htmldoc/usr_22.html#22.3) Finding a file
  - [22.4](http://vimdoc.sourceforge.net/htmldoc/usr_22.html#22.4) The buffer list
- [usr\_23.txt](http://vimdoc.sourceforge.net/htmldoc/usr_23.html) Editing other files
  - [23.1](http://vimdoc.sourceforge.net/htmldoc/usr_23.html#23.1) [DOS](http://vimdoc.sourceforge.net/htmldoc/os_dos.html#DOS), [Mac](http://vimdoc.sourceforge.net/htmldoc/os_mac.html#Mac) and [Unix](http://vimdoc.sourceforge.net/htmldoc/os_unix.html#Unix) files
  - [23.2](http://vimdoc.sourceforge.net/htmldoc/usr_23.html#23.2) Files on the [internet](http://vimdoc.sourceforge.net/htmldoc/intro.html#internet)
  - [23.3](http://vimdoc.sourceforge.net/htmldoc/usr_23.html#23.3) Encryption
  - [23.4](http://vimdoc.sourceforge.net/htmldoc/usr_23.html#23.4) Binary files
  - [23.5](http://vimdoc.sourceforge.net/htmldoc/usr_23.html#23.5) Compressed files
- [usr\_24.txt](http://vimdoc.sourceforge.net/htmldoc/usr_24.html) Inserting quickly
  - [24.1](http://vimdoc.sourceforge.net/htmldoc/usr_24.html#24.1) Making corrections
  - [24.2](http://vimdoc.sourceforge.net/htmldoc/usr_24.html#24.2) Showing matches
  - [24.3](http://vimdoc.sourceforge.net/htmldoc/usr_24.html#24.3) Completion
  - [24.4](http://vimdoc.sourceforge.net/htmldoc/usr_24.html#24.4) Repeating an insert
  - [24.5](http://vimdoc.sourceforge.net/htmldoc/usr_24.html#24.5) Copying from another line
  - [24.6](http://vimdoc.sourceforge.net/htmldoc/usr_24.html#24.6) Inserting a [register](http://vimdoc.sourceforge.net/htmldoc/sponsor.html#register)
  - [24.7](http://vimdoc.sourceforge.net/htmldoc/usr_24.html#24.7) [Abbreviations](http://vimdoc.sourceforge.net/htmldoc/map.html#Abbreviations)
  - [24.8](http://vimdoc.sourceforge.net/htmldoc/usr_24.html#24.8) Entering special characters
  - [24.9](http://vimdoc.sourceforge.net/htmldoc/usr_24.html#24.9) [Digraphs](http://vimdoc.sourceforge.net/htmldoc/digraph.html#Digraphs)
  - [24.10](http://vimdoc.sourceforge.net/htmldoc/usr_24.html#24.10) [Normal](http://vimdoc.sourceforge.net/htmldoc/intro.html#Normal) mode commands
- [usr\_25.txt](http://vimdoc.sourceforge.net/htmldoc/usr_25.html) Editing formatted text
  - [25.1](http://vimdoc.sourceforge.net/htmldoc/usr_25.html#25.1) Breaking lines
  - [25.2](http://vimdoc.sourceforge.net/htmldoc/usr_25.html#25.2) Aligning text
  - [25.3](http://vimdoc.sourceforge.net/htmldoc/usr_25.html#25.3) Indents and tabs
  - [25.4](http://vimdoc.sourceforge.net/htmldoc/usr_25.html#25.4) Dealing with long lines
  - [25.5](http://vimdoc.sourceforge.net/htmldoc/usr_25.html#25.5) Editing tables
- [usr\_26.txt](http://vimdoc.sourceforge.net/htmldoc/usr_26.html) Repeating
  - [26.1](http://vimdoc.sourceforge.net/htmldoc/usr_26.html#26.1) Repeating with [Visual](http://vimdoc.sourceforge.net/htmldoc/visual.html#Visual) mode
  - [26.2](http://vimdoc.sourceforge.net/htmldoc/usr_26.html#26.2) Add and subtract
  - [26.3](http://vimdoc.sourceforge.net/htmldoc/usr_26.html#26.3) Making a change in many files
  - [26.4](http://vimdoc.sourceforge.net/htmldoc/usr_26.html#26.4) Using Vim from a shell [script](http://vimdoc.sourceforge.net/htmldoc/usr_41.html#script)
- [usr\_27.txt](http://vimdoc.sourceforge.net/htmldoc/usr_27.html) Search commands and patterns
  - [27.1](http://vimdoc.sourceforge.net/htmldoc/usr_27.html#27.1) Ignoring [case](http://vimdoc.sourceforge.net/htmldoc/change.html#case)
  - [27.2](http://vimdoc.sourceforge.net/htmldoc/usr_27.html#27.2) Wrapping around the file end
  - [27.3](http://vimdoc.sourceforge.net/htmldoc/usr_27.html#27.3) Offsets
  - [27.4](http://vimdoc.sourceforge.net/htmldoc/usr_27.html#27.4) Matching multiple times
  - [27.5](http://vimdoc.sourceforge.net/htmldoc/usr_27.html#27.5) Alternatives
  - [27.6](http://vimdoc.sourceforge.net/htmldoc/usr_27.html#27.6) Character ranges
  - [27.7](http://vimdoc.sourceforge.net/htmldoc/usr_27.html#27.7) Character classes
  - [27.8](http://vimdoc.sourceforge.net/htmldoc/usr_27.html#27.8) Matching a line break
  - [27.9](http://vimdoc.sourceforge.net/htmldoc/usr_27.html#27.9) Examples
- [usr\_28.txt](http://vimdoc.sourceforge.net/htmldoc/usr_28.html) [Folding](http://vimdoc.sourceforge.net/htmldoc/fold.html#Folding)
  - [28.1](http://vimdoc.sourceforge.net/htmldoc/usr_28.html#28.1) What is [folding](http://vimdoc.sourceforge.net/htmldoc/fold.html#folding)?
  - [28.2](http://vimdoc.sourceforge.net/htmldoc/usr_28.html#28.2) Manual [folding](http://vimdoc.sourceforge.net/htmldoc/fold.html#folding)
  - [28.3](http://vimdoc.sourceforge.net/htmldoc/usr_28.html#28.3) Working with [folds](http://vimdoc.sourceforge.net/htmldoc/fold.html#folds)
  - [28.4](http://vimdoc.sourceforge.net/htmldoc/usr_28.html#28.4) Saving and restoring [folds](http://vimdoc.sourceforge.net/htmldoc/fold.html#folds)
  - [28.5](http://vimdoc.sourceforge.net/htmldoc/usr_28.html#28.5) [Folding](http://vimdoc.sourceforge.net/htmldoc/fold.html#Folding) by indent
  - [28.6](http://vimdoc.sourceforge.net/htmldoc/usr_28.html#28.6) [Folding](http://vimdoc.sourceforge.net/htmldoc/fold.html#Folding) with markers
  - [28.7](http://vimdoc.sourceforge.net/htmldoc/usr_28.html#28.7) [Folding](http://vimdoc.sourceforge.net/htmldoc/fold.html#Folding) by [syntax](http://vimdoc.sourceforge.net/htmldoc/syntax.html#syntax)
  - [28.8](http://vimdoc.sourceforge.net/htmldoc/usr_28.html#28.8) [Folding](http://vimdoc.sourceforge.net/htmldoc/fold.html#Folding) by [expression](http://vimdoc.sourceforge.net/htmldoc/eval.html#expression)
  - [28.9](http://vimdoc.sourceforge.net/htmldoc/usr_28.html#28.9) [Folding](http://vimdoc.sourceforge.net/htmldoc/fold.html#Folding) unchanged lines
  - [28.10](http://vimdoc.sourceforge.net/htmldoc/usr_28.html#28.10) Which fold method to use?
- [usr\_29.txt](http://vimdoc.sourceforge.net/htmldoc/usr_29.html) Moving through programs
  - [29.1](http://vimdoc.sourceforge.net/htmldoc/usr_29.html#29.1) Using [tags](http://vimdoc.sourceforge.net/htmldoc/tagsrch.html#tags)
  - [29.2](http://vimdoc.sourceforge.net/htmldoc/usr_29.html#29.2) The preview [window](http://vimdoc.sourceforge.net/htmldoc/windows.html#window)
  - [29.3](http://vimdoc.sourceforge.net/htmldoc/usr_29.html#29.3) Moving through a program
  - [29.4](http://vimdoc.sourceforge.net/htmldoc/usr_29.html#29.4) Finding global identifiers
  - [29.5](http://vimdoc.sourceforge.net/htmldoc/usr_29.html#29.5) Finding local identifiers
- [usr\_30.txt](http://vimdoc.sourceforge.net/htmldoc/usr_30.html) Editing programs
  - [30.1](http://vimdoc.sourceforge.net/htmldoc/usr_30.html#30.1) Compiling
  - [30.2](http://vimdoc.sourceforge.net/htmldoc/usr_30.html#30.2) Indenting C files
  - [30.3](http://vimdoc.sourceforge.net/htmldoc/usr_30.html#30.3) Automatic indenting
  - [30.4](http://vimdoc.sourceforge.net/htmldoc/usr_30.html#30.4) Other indenting
  - [30.5](http://vimdoc.sourceforge.net/htmldoc/usr_30.html#30.5) Tabs and spaces
  - [30.6](http://vimdoc.sourceforge.net/htmldoc/usr_30.html#30.6) Formatting comments
- [usr\_31.txt](http://vimdoc.sourceforge.net/htmldoc/usr_31.html) Exploiting the [GUI](http://vimdoc.sourceforge.net/htmldoc/gui.html#GUI)
  - [31.1](http://vimdoc.sourceforge.net/htmldoc/usr_31.html#31.1) The file browser
  - [31.2](http://vimdoc.sourceforge.net/htmldoc/usr_31.html#31.2) Confirmation
  - [31.3](http://vimdoc.sourceforge.net/htmldoc/usr_31.html#31.3) Menu shortcuts
  - [31.4](http://vimdoc.sourceforge.net/htmldoc/usr_31.html#31.4) Vim [window](http://vimdoc.sourceforge.net/htmldoc/windows.html#window) position and size
  - [31.5](http://vimdoc.sourceforge.net/htmldoc/usr_31.html#31.5) Various
- [usr\_32.txt](http://vimdoc.sourceforge.net/htmldoc/usr_32.html) The [undo](http://vimdoc.sourceforge.net/htmldoc/undo.html#undo) tree
  - [32.1](http://vimdoc.sourceforge.net/htmldoc/usr_32.html#32.1) Undo up to a file write
  - [32.2](http://vimdoc.sourceforge.net/htmldoc/usr_32.html#32.2) Numbering changes
  - [32.3](http://vimdoc.sourceforge.net/htmldoc/usr_32.html#32.3) Jumping around the tree
  - [32.4](http://vimdoc.sourceforge.net/htmldoc/usr_32.html#32.4) Time travelling

**Tuning Vim** Make Vim work [as](http://vimdoc.sourceforge.net/htmldoc/motion.html#as) you like it.

- [usr\_40.txt](http://vimdoc.sourceforge.net/htmldoc/usr_40.html) Make new commands
  - [40.1](http://vimdoc.sourceforge.net/htmldoc/usr_40.html#40.1) Key [mapping](http://vimdoc.sourceforge.net/htmldoc/map.html#mapping)
  - [40.2](http://vimdoc.sourceforge.net/htmldoc/usr_40.html#40.2) Defining command-line commands
  - [40.3](http://vimdoc.sourceforge.net/htmldoc/usr_40.html#40.3) Autocommands
- [usr\_41.txt](http://vimdoc.sourceforge.net/htmldoc/usr_41.html) Write a Vim [script](http://vimdoc.sourceforge.net/htmldoc/usr_41.html#script)
  - [41.1](http://vimdoc.sourceforge.net/htmldoc/usr_41.html#41.1) Introduction
  - [41.2](http://vimdoc.sourceforge.net/htmldoc/usr_41.html#41.2) Variables
  - [41.3](http://vimdoc.sourceforge.net/htmldoc/usr_41.html#41.3) Expressions
  - [41.4](http://vimdoc.sourceforge.net/htmldoc/usr_41.html#41.4) Conditionals
  - [41.5](http://vimdoc.sourceforge.net/htmldoc/usr_41.html#41.5) Executing an [expression](http://vimdoc.sourceforge.net/htmldoc/eval.html#expression)
  - [41.6](http://vimdoc.sourceforge.net/htmldoc/usr_41.html#41.6) Using [functions](http://vimdoc.sourceforge.net/htmldoc/eval.html#functions)
  - [41.7](http://vimdoc.sourceforge.net/htmldoc/usr_41.html#41.7) Defining a function
  - [41.8](http://vimdoc.sourceforge.net/htmldoc/usr_41.html#41.8) [Lists](http://vimdoc.sourceforge.net/htmldoc/eval.html#Lists) and [Dictionaries](http://vimdoc.sourceforge.net/htmldoc/eval.html#Dictionaries)
  - [41.9](http://vimdoc.sourceforge.net/htmldoc/usr_41.html#41.9) Exceptions
  - [41.10](http://vimdoc.sourceforge.net/htmldoc/usr_41.html#41.10) Various remarks
  - [41.11](http://vimdoc.sourceforge.net/htmldoc/usr_41.html#41.11) Writing a [plugin](http://vimdoc.sourceforge.net/htmldoc/usr_05.html#plugin)
  - [41.12](http://vimdoc.sourceforge.net/htmldoc/usr_41.html#41.12) Writing a [filetype](http://vimdoc.sourceforge.net/htmldoc/filetype.html#filetype) [plugin](http://vimdoc.sourceforge.net/htmldoc/usr_05.html#plugin)
  - [41.13](http://vimdoc.sourceforge.net/htmldoc/usr_41.html#41.13) Writing a compiler [plugin](http://vimdoc.sourceforge.net/htmldoc/usr_05.html#plugin)
  - [41.14](http://vimdoc.sourceforge.net/htmldoc/usr_41.html#41.14) Writing a [plugin](http://vimdoc.sourceforge.net/htmldoc/usr_05.html#plugin) that loads quickly
  - [41.15](http://vimdoc.sourceforge.net/htmldoc/usr_41.html#41.15) Writing library scripts
  - [41.16](http://vimdoc.sourceforge.net/htmldoc/usr_41.html#41.16) Distributing Vim scripts
- [usr\_42.txt](http://vimdoc.sourceforge.net/htmldoc/usr_42.html) Add new [menus](http://vimdoc.sourceforge.net/htmldoc/gui.html#menus)
  - [42.1](http://vimdoc.sourceforge.net/htmldoc/usr_42.html#42.1) Introduction
  - [42.2](http://vimdoc.sourceforge.net/htmldoc/usr_42.html#42.2) Menu commands
  - [42.3](http://vimdoc.sourceforge.net/htmldoc/usr_42.html#42.3) Various
  - [42.4](http://vimdoc.sourceforge.net/htmldoc/usr_42.html#42.4) Toolbar and popup [menus](http://vimdoc.sourceforge.net/htmldoc/gui.html#menus)
- [usr\_43.txt](http://vimdoc.sourceforge.net/htmldoc/usr_43.html) Using [filetypes](http://vimdoc.sourceforge.net/htmldoc/filetype.html#filetypes)
  - [43.1](http://vimdoc.sourceforge.net/htmldoc/usr_43.html#43.1) Plugins for a [filetype](http://vimdoc.sourceforge.net/htmldoc/filetype.html#filetype)
  - [43.2](http://vimdoc.sourceforge.net/htmldoc/usr_43.html#43.2) Adding a [filetype](http://vimdoc.sourceforge.net/htmldoc/filetype.html#filetype)
- [usr\_44.txt](http://vimdoc.sourceforge.net/htmldoc/usr_44.html) Your own [syntax](http://vimdoc.sourceforge.net/htmldoc/syntax.html#syntax) highlighted
  - [44.1](http://vimdoc.sourceforge.net/htmldoc/usr_44.html#44.1) Basic [syntax](http://vimdoc.sourceforge.net/htmldoc/syntax.html#syntax) commands
  - [44.2](http://vimdoc.sourceforge.net/htmldoc/usr_44.html#44.2) Keywords
  - [44.3](http://vimdoc.sourceforge.net/htmldoc/usr_44.html#44.3) Matches
  - [44.4](http://vimdoc.sourceforge.net/htmldoc/usr_44.html#44.4) Regions
  - [44.5](http://vimdoc.sourceforge.net/htmldoc/usr_44.html#44.5) Nested items
  - [44.6](http://vimdoc.sourceforge.net/htmldoc/usr_44.html#44.6) Following groups
  - [44.7](http://vimdoc.sourceforge.net/htmldoc/usr_44.html#44.7) Other arguments
  - [44.8](http://vimdoc.sourceforge.net/htmldoc/usr_44.html#44.8) Clusters
  - [44.9](http://vimdoc.sourceforge.net/htmldoc/usr_44.html#44.9) Including another [syntax](http://vimdoc.sourceforge.net/htmldoc/syntax.html#syntax) file
  - [44.10](http://vimdoc.sourceforge.net/htmldoc/usr_44.html#44.10) Synchronizing
  - [44.11](http://vimdoc.sourceforge.net/htmldoc/usr_44.html#44.11) Installing a [syntax](http://vimdoc.sourceforge.net/htmldoc/syntax.html#syntax) file
  - [44.12](http://vimdoc.sourceforge.net/htmldoc/usr_44.html#44.12) Portable [syntax](http://vimdoc.sourceforge.net/htmldoc/syntax.html#syntax) file layout
- [usr\_45.txt](http://vimdoc.sourceforge.net/htmldoc/usr_45.html) [Select](http://vimdoc.sourceforge.net/htmldoc/visual.html#Select) your language
  - [45.1](http://vimdoc.sourceforge.net/htmldoc/usr_45.html#45.1) Language for Messages
  - [45.2](http://vimdoc.sourceforge.net/htmldoc/usr_45.html#45.2) Language for Menus
  - [45.3](http://vimdoc.sourceforge.net/htmldoc/usr_45.html#45.3) Using another encoding
  - [45.4](http://vimdoc.sourceforge.net/htmldoc/usr_45.html#45.4) Editing files with a different encoding
  - [45.5](http://vimdoc.sourceforge.net/htmldoc/usr_45.html#45.5) Entering language text

 **Making Vim Run** Before you can use Vim.
- [usr\_90.txt](http://vimdoc.sourceforge.net/htmldoc/usr_90.html) Installing Vim
  - [90.1](http://vimdoc.sourceforge.net/htmldoc/usr_90.html#90.1) [Unix](http://vimdoc.sourceforge.net/htmldoc/os_unix.html#Unix)
  - [90.2](http://vimdoc.sourceforge.net/htmldoc/usr_90.html#90.2) [MS-Windows](http://vimdoc.sourceforge.net/htmldoc/os_win32.html#MS-Windows)
  - [90.3](http://vimdoc.sourceforge.net/htmldoc/usr_90.html#90.3) Upgrading
  - [90.4](http://vimdoc.sourceforge.net/htmldoc/usr_90.html#90.4) Common installation issues
  - [90.5](http://vimdoc.sourceforge.net/htmldoc/usr_90.html#90.5) Uninstalling Vim

# 插件

- [vim-plug](https://github.com/junegunn/vim-plug): 管理vim插件；
   - `:PlugInstall [name]`: 安装插件；
   - `:PlugUpdate [name]`: 升级插件；
   - `:PlugUpgrade`: 升级`vim-plug`本身；
   - `:PlugClean`: 清理不在配置列表里面的插件；
   - `:PlugSnapshot [output_path]`: 生成当前插件状态的快照文件（可以加载到快照状态）；
   - `:PlugStatus`
- [vim-fugitive](https://github.com/tpope/vim-fugitive): Git集成，除了Git本身的命令（如`:Git Blame`）外，还提供了如：
  - `:GBrowse`: 在托管网站中打开文件；
  - `:Gedit`: 加载任意版本和文件，如`:Gread HEAD~3:%`读取3次commit前的当前文件；
  - `:Gread`: 读取当前文件到vim buffer（相当于`git checkout -- <filename>`，但只会发生在vim的缓存中，不在git中实际发生）；
  - `:GWrite`: 将vim buffer写入当前文件（如果在工作区相当于`git add <filename>`，如果在历史版本则相当于`git checkout <filename>`）
- `vim-gitgutter`: Git侧边状态栏；
- `vim-surround`: 文本包围操作；
  - `ys`: *surround*，如`ys3aw"`, `ys2iw"`, `ys5w"`
  - `cs`: *change surround*
    - `cst`: *change surround tag*, `t`代表tag，类似的还有`dst`。如：`cst'`(`<em>hello</em>` to `'hello'`)
  - `ds`: *delete surround*
  - `yss`: *surround whole line*
- `tabular`: 文本对齐；
- `vim-markdown`: Markdown;

# 其他资源

- [Learn Vim](https://github.com/iggredible/Learn-Vim)
- [vim-galore](https://github.com/mhinz/vim-galore/blob/master/PLUGINS.md)
