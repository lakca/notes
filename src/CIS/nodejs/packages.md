---
title: NPM Packages
---

# 工具类

## 字符串处理
  - `leven`: 比较两个字符串的不同
  - `anymatch`: Matches strings against configurable strings, globs, regular expressions, and/or functions.
  - *format*
    - `slug`: Slugifies even utf-8 chars!
    - `github-slugger`

## 日期

- `date-fns`
- `moment`

## 加密
  - `crypto-random-string`: Generate a cryptographically strong random string

## 命令行
  - `inquirer`: provides the user interface and the inquiry session flow.
  - `enquirer`: Stylish CLI prompts that are user-friendly, intuitive and easy to create.
  - `commander`
  - `vorpal`: Conquer the command-line.
  - *spinner*
    - `ora`: Elegant terminal spinner.
    - `listr`: Terminal task list.

## 路径解析
  - `normalize-path`

## 文件系统
  - `chokidar`: Minimal and efficient cross-platform file watching library.
  - `fs-extra`: Such as recursive mkdir, copy, and remove.
  - `readdirp`
  - *find or traverse*
    - `walker`: A simple directory tree walker. Broadcasts events for various file types.
    - `walk`: A node port of python's os.walk.
    - `ignore-walk`: Walk a directory creating a list of entries, parsing any .ignore files met along the way to exclude files.
    - `globby`: User-friendly glob matching.
    - `find-up`: Find a file or directory by walking up parent directories.
  - `hasha`: Get the hash of a buffer/string/stream/file.
  - `lockfile`: A very polite lock file utility, which endeavors to not litter, and to wait patiently for others.
  - `proper-lockfile`: An inter-process and inter-machine lockfile utility that works on a local or network file system.
  - `adm-zip`
  - `tar-fs`
  - `temp-write`: Write string/buffer/stream to a random temp file.
  - `tempy`: Get a random temporary file or directory path.

## 数据模拟
  - `mock-fs`

# 体系类

## ORM

|             | MySQL | SQLite | PostgreSQL | MongoDB | ...                 |
| ----------- | ----- | ------ | ---------- | ------- | ------------------- |
| `prisma`    | Yes   | Yes    | Yes        | Yes     | MariaDB, SQL Server |
| `mikro-orm` | Yes   | Yes    | Yes        | Yes     | MariaDB             |
| `knex`      |       |        |            |         | -                   |
| `type-orm`  |       |        |            |         | -                   |
| `sequelize` |       |        |            |         | -                   |
| `mongoose`  |       |        |            |         | -                   |

|             | Client | Migration                                   | TypeScript | DSL | Transaction                                   | Read/Write Splitting | Schema Generator                                  |
| ----------- | ------ | ------------------------------------------- | ---------- | --- | --------------------------------------------- | -------------------- | ------------------------------------------------- |
| `prisma`    | Yes    | Yes                                         | Yes        | Yes | Yes                                           | Yes                  | Yes                                               |
| `mikro-orm` |        | [Yes](https://mikro-orm.io/docs/migrations) | Yes        | No  | [Yes](https://mikro-orm.io/docs/transactions) |                      | [Yes](https://mikro-orm.io/docs/schema-generator) |
| `knex`      |        |                                             |            |     |                                               |                      |                                                   |
| `type-orm`  |        |                                             | Yes        |     |                                               |                      |                                                   |
| `sequelize` |        |                                             |            |     |                                               |                      |                                                   |
| `mongoose`  |        |                                             |            |     |                                               |                      |                                                   |

|             | Raw Query | Sub Query | Cascading                                  | QueryBuilder                                    | Result Caching                            | Filter                                    | Logging                                  |
| ----------- | --------- | --------- | ------------------------------------------ | ----------------------------------------------- | ----------------------------------------- | ----------------------------------------- | ---------------------------------------- |
| `prisma`    | Yes       | Yes       |                                            |                                                 |                                           |                                           | -                                        |
| `mikro-orm` |           |           | [Yes](https://mikro-orm.io/docs/cascading) | [Yes](https://mikro-orm.io/docs/query-builder/) | [Yes](https://mikro-orm.io/docs/caching/) | [Yes](https://mikro-orm.io/docs/filters/) | [Yes](https://mikro-orm.io/docs/logging) |
| `knex`      |           |           |                                            |                                                 |                                           |                                           | -                                        |
| `type-orm`  |           |           |                                            |                                                 |                                           |                                           | -                                        |
| `sequelize` |           |           |                                            |                                                 |                                           |                                           | -                                        |
| `mongoose`  |           |           |                                            |                                                 |                                           |                                           | -                                        |

1. [`prisma`](https://github.com/prisma/prisma)

- [should-you-use-prisma](https://www.prisma.io/docs/concepts/overview/should-you-use-prisma)
- [TypeORM](https://www.prisma.io/docs/concepts/more/comparisons/prisma-and-typeorm)
- [Sequelize](https://www.prisma.io/docs/concepts/more/comparisons/prisma-and-sequelize)
- [Mongoose](https://www.prisma.io/docs/concepts/more/comparisons/prisma-and-mongoose)
