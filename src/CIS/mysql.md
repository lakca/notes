# 文档

- [内置函数和操作符](https://dev.mysql.com/doc/refman/en/built-in-function-reference.html)
- [可加载的函数](https://dev.mysql.com/doc/refman/en/loadable-function-reference.html)
- [表达式](https://dev.mysql.com/doc/refman/en/expressions.html)
- [类型转换](https://dev.mysql.com/doc/refman/en/type-conversion.html)
- [算术操作符](https://dev.mysql.com/doc/refman/en/arithmetic-functions.html)
- [逻辑操作符](https://dev.mysql.com/doc/refman/en/logical-operators.html)
- [赋值操作符](https://dev.mysql.com/doc/refman/en/assignment-operators.html)
- [位函数和操作符](https://dev.mysql.com/doc/refman/en/bit-functions.html)
- [常用分类函数](https://dev.mysql.com/doc/refman/en/functions.html)
	- [控制流函数](https://dev.mysql.com/doc/refman/en/flow-control-functions.html)
	- [数学函数](https://dev.mysql.com/doc/refman/en/mathematical-functions.html)
	- [时间函数](https://dev.mysql.com/doc/refman/en/date-and-time-functions.html)
	- [字符串比较函数](https://dev.mysql.com/doc/refman/en/string-comparison-functions.html)
	- [正则表达式](https://dev.mysql.com/doc/refman/en/regexp.html)
	- [全文搜索函数](https://dev.mysql.com/doc/refman/en/fulltext-search.html)
	- [加解密函数](https://dev.mysql.com/doc/refman/en/encryption-functions.html)
	- [锁函数](https://dev.mysql.com/doc/refman/en/locking-functions.html)
	- [信息函数（获取相关数据的元信息）](https://dev.mysql.com/doc/refman/en/information-functions.html)
	- [聚合函数（多数据分析）](https://dev.mysql.com/doc/refman/en/aggregate-functions.html)
	- [杂项函数](https://dev.mysql.com/doc/refman/en/miscellaneous-functions.html)

官方完整文档

- [Preface and Legal Notices](https://dev.mysql.com/doc/refman/en/preface.html)
- [General Information](https://dev.mysql.com/doc/refman/en/introduction.html)
- [Installing and Upgrading MySQL](https://dev.mysql.com/doc/refman/en/installing.html)
- [Tutorial](https://dev.mysql.com/doc/refman/en/tutorial.html)
- [MySQL Programs](https://dev.mysql.com/doc/refman/en/programs.html)
- [MySQL Server Administration](https://dev.mysql.com/doc/refman/en/server-administration.html)
- [Security](https://dev.mysql.com/doc/refman/en/security.html)
- [Backup and Recovery](https://dev.mysql.com/doc/refman/en/backup-and-recovery.html)
- [Optimization](https://dev.mysql.com/doc/refman/en/optimization.html)
- [Language Structure](https://dev.mysql.com/doc/refman/en/language-structure.html)
- [Character Sets, Collations, Unicode](https://dev.mysql.com/doc/refman/en/charset.html)
- [Data Types](https://dev.mysql.com/doc/refman/en/data-types.html)
- [Functions and Operators](https://dev.mysql.com/doc/refman/en/functions.html)
- [SQL Statements](https://dev.mysql.com/doc/refman/en/sql-statements.html)
- [The InnoDB Storage Engine](https://dev.mysql.com/doc/refman/en/innodb-storage-engine.html)
- [Alternative Storage Engines](https://dev.mysql.com/doc/refman/en/storage-engines.html)
- [Replication](https://dev.mysql.com/doc/refman/en/replication.html)
- [Group Replication](https://dev.mysql.com/doc/refman/en/group-replication.html)
- [MySQL Shell](https://dev.mysql.com/doc/refman/en/mysql-shell-userguide.html)
- [Using MySQL as a Document Store](https://dev.mysql.com/doc/refman/en/document-store.html)
- [InnoDB Cluster](https://dev.mysql.com/doc/refman/en/mysql-innodb-cluster-introduction.html)
- [MySQL NDB Cluster 7.5 and NDB Cluster 7.6](https://dev.mysql.com/doc/refman/en/mysql-cluster.html)
- [Partitioning](https://dev.mysql.com/doc/refman/en/partitioning.html)
- [Stored Objects](https://dev.mysql.com/doc/refman/en/stored-objects.html)
- [INFORMATION_SCHEMA Tables](https://dev.mysql.com/doc/refman/en/information-schema.html)
- [MySQL Performance Schema](https://dev.mysql.com/doc/refman/en/performance-schema.html)
- [MySQL sys Schema](https://dev.mysql.com/doc/refman/en/sys-schema.html)
- [Connectors and APIs](https://dev.mysql.com/doc/refman/en/connectors-apis.html)
- [MySQL Enterprise Edition](https://dev.mysql.com/doc/refman/en/mysql-enterprise.html)
- [MySQL Workbench](https://dev.mysql.com/doc/refman/en/workbench.html)
- [MySQL 5.7 Frequently Asked Questions](https://dev.mysql.com/doc/refman/en/faqs.html)
- [Error Messages and Common Problems](https://dev.mysql.com/doc/refman/en/error-handling.html)
- [Indexes](https://dev.mysql.com/doc/refman/en/indexes.html)
- [MySQL Glossary](https://dev.mysql.com/doc/refman/en/glossary.html)

# 存储引擎

## MyISAM

# 锁

  | Engine   | 表锁 | 行锁    | 页锁 |
  | -------- | ---- | ------- | ---- |
  | `InnoDB` | Y    | Y(默认) |
  | `MyISAM` | Y    |
  | `MEMORY` | Y    |
  | `BDB`    |      |         | Y    |

# InnoDB

- 行锁
  - **共享锁（S）（读锁）**：与~~排他锁（X）~~不共存
  - **排他锁（X）（写锁）**：与~~共享锁（S）~~和~~排他锁（X）~~不共存
- 表锁（意向锁）
  - **意向共享锁（IS）**：共享锁（S）加锁前，必须获取意向共享锁（IS）
  - **意向排他锁（IX）**：排他锁（X）加锁前，必须获得意向排他锁（IX）

锁，建立的目的是，解决非原子性操作的原子性问题，避免不一致（意外的中间状态）的出现。

**行锁，建立在索引的基础上**。如果查询的字段没有索引，那么会默认锁住所有行。

对于`UPDATE`/`DELETE`/`INSERT`语句，*InnoDB*自动给涉及的数据集加*排他锁（X）*。

# 常用语句

## 系统

```sql
-- 查看数据库所有引擎
SHOW ENGINES;

-- 查看存储引擎状态
SHOW ENGINE INNODB STATUS;
```

## 表格

```sql
-- 获取表字段描述
DESCRIBE table_one;
SHOW FIELDS FROM table_one;

-- 获取表创建语句
SHOW CREATE TABLE table_one;

-- 查看索引信息
SHOW INDEX FROM table_one;
SHOW KEYS FROM table_one;

-- UPDATE
UPDATE table_one SET field1=value1, filed2=value2 WHERE ...;
UPDATE table_one SET field1=REPLACE(field1, 'hello', 'hi') WHERE ...;
```

## 创建表格

```sql
-- 普通创建
CREATE [TEMPORARY] TABLE [IF NOT EXISTS] table_name
  [(create_definition,...)]
  [table_option[[,] table_option]...]
  [partition_options];

-- 从其他表格复制字段信息
CREATE [TEMPORARY] TABLE [IF NOT EXISTS] table_name
  [(create_definition,...)]
  [table_options]
  [partition_options]
  select_statement;

-- 复制其他表格结构
CREATE [TEMPORARY] TABLE [IF NOT EXISTS] tbl_name
    { LIKE old_tbl_name | (LIKE old_tbl_name) }
```

#### create_definition

```sql
col_name column_definition

| [CONSTRAINT [symbol]] PRIMARY KEY [index_type] (index_col_name,...)
    [index_option] ...

| {INDEX|KEY} [index_name] [index_type] (index_col_name,...)
    [index_option] ...

| [CONSTRAINT [symbol]] UNIQUE [INDEX|KEY] [index_name] [index_type] (index_col_name,...)
    [index_option] ...

| {FULLTEXT|SPATIAL} [INDEX|KEY] [index_name] (index_col_name,...)
    [index_option] ...

| [CONSTRAINT [symbol]] FOREIGN KEY [index_name] (index_col_name,...)
    reference_definition

| CHECK (expr)
```

#### index_col_name

```sql
col_name [(length)] [ASC | DESC]
```

#### index_type

```sql
USING {BTREE | HASH}
```

#### index_option

```sql
  KEY_BLOCK_SIZE [=] value
| index_type
| WITH PARSER parser_name
| COMMENT 'string'
```

#### column_definition

```sql
data_type
  [NOT NULL | NULL]
  [DEFAULT default_value]
  [AUTO_INCREMENT]
  [UNIQUE [KEY] | [PRIMARY] KEY]
  [COMMENT 'string']
  [COLUMN_FORMAT {FIXED|DYNAMIC|DEFAULT}]
  [reference_definition]

| data_type
  [GENERATED ALWAYS] AS (expression)
  [VIRTUAL | STORED]
  [UNIQUE [KEY]]
  [COMMENT comment]
  [NOT NULL | NULL]
  [[PRIMARY] KEY]
```

#### data_type

```sql
-- 数字
BIT[(length)]
TINYINT[(length)]            [UNSIGNED] [ZEROFILL]
SMALLINT[(length)]           [UNSIGNED] [ZEROFILL]
MEDIUMINT[(length)]          [UNSIGNED] [ZEROFILL]
INT[(length)]                [UNSIGNED] [ZEROFILL]
INTEGER[(length)]            [UNSIGNED] [ZEROFILL]
BIGINT[(length)]             [UNSIGNED] [ZEROFILL]
REAL[(length,decimals)]      [UNSIGNED] [ZEROFILL]
DOUBLE[(length,decimals)]    [UNSIGNED] [ZEROFILL]
FLOAT[(length,decimals)]     [UNSIGNED] [ZEROFILL]
DECIMAL[(length[,decimals])] [UNSIGNED] [ZEROFILL]
NUMERIC[(length[,decimals])] [UNSIGNED] [ZEROFILL]
-- 字符/二进制
CHAR[(length)]               [BINARY]  [CHARACTER SET charset_name] [COLLATE collation_name]
VARCHAR(length)              [BINARY]  [CHARACTER SET charset_name] [COLLATE collation_name]
TINYTEXT                     [BINARY]  [CHARACTER SET charset_name] [COLLATE collation_name]
TEXT                         [BINARY]  [CHARACTER SET charset_name] [COLLATE collation_name]
MEDIUMTEXT                   [BINARY]  [CHARACTER SET charset_name] [COLLATE collation_name]
LONGTEXT                     [BINARY]  [CHARACTER SET charset_name] [COLLATE collation_name]
ENUM(value1,value2,value3,...)         [CHARACTER SET charset_name] [COLLATE collation_name]
SET(value1,value2,value3,...)          [CHARACTER SET charset_name] [COLLATE collation_name]
BINARY[(length)]
VARBINARY(length)
-- 时间
DATE
TIME[(fsp)]
TIMESTAMP[(fsp)]
DATETIME[(fsp)]
YEAR
-- BLOB
TINYBLOB
BLOB
MEDIUMBLOB
LONGBLOB
-- 结构化数据
JSON
spatial_type
```

#### reference_definition

```sql
REFERENCES tbl_name (index_col_name,...)
[MATCH FULL | MATCH PARTIAL | MATCH SIMPLE]
[ON DELETE reference_option]
[ON UPDATE reference_option]
```

#### reference_option

```sql
RESTRICT | CASCADE | SET NULL | NO ACTION
```

#### select_statement

```sql
[IGNORE | REPLACE] [AS] SELECT ...   (Some valid select statement);
```

#### table_option

```sql
ENGINE                  [=] engine_name
AUTO_INCREMENT          [=] value
AVG_ROW_LENGTH          [=] value
[DEFAULT] CHARACTER SET [=] charset_name
CHECKSUM                [=] {0 | 1}
[DEFAULT] COLLATE       [=] collation_name
COMMENT                 [=] 'string'
COMPRESSION             [=] { ZLIB | LZ4 | NONE }
CONNECTION              [=] 'connect_string'
DATA DIRECTORY          [=] 'absolute path to directory'
DELAY_KEY_WRITE         [=] {0 | 1}
INDEX DIRECTORY         [=] 'absolute path to directory'
INSERT_METHOD           [=] { NO | FIRST | LAST }
KEY_BLOCK_SIZE          [=] value
MAX_ROWS                [=] value
MIN_ROWS                [=] value
PACK_KEYS               [=] {0 | 1 | DEFAULT}
PASSWORD                [=] 'string'
ROW_FORMAT              [=] {DEFAULT|DYNAMIC|FIXED|COMPRESSED|REDUNDANT|COMPACT}
STATS_AUTO_RECALC       [=] {DEFAULT|0|1}
STATS_PERSISTENT        [=] {DEFAULT|0|1}
STATS_SAMPLE_PAGES      [=] value
TABLESPACE                  tablespace_name
UNION                   [=] (tbl_name[,tbl_name]...)
```

#### partition_options:

```sql
PARTITION BY {
    [LINEAR] HASH(expr)
  | [LINEAR] KEY [ALGORITHM={1|2}] (column_list)
  | RANGE{(expr) | COLUMNS(column_list)}
  | LIST{(expr) | COLUMNS(column_list)}
}
[PARTITIONS num]
[SUBPARTITION BY {
      [LINEAR] HASH(expr)
    | [LINEAR] KEY [ALGORITHM={1|2}] (column_list)
  }
  [SUBPARTITIONS num]
]
[(partition_definition [, partition_definition] ...)]
```

#### partition_definition

```sql
PARTITION partition_name
[VALUES {
    LESS THAN {(expr | value_list) | MAXVALUE}
  | IN (value_list)
}]
[[STORAGE] ENGINE         [=] engine_name]
[COMMENT                  [=] 'comment_text' ]
[DATA DIRECTORY           [=] 'data_dir']
[INDEX DIRECTORY          [=] 'index_dir']
[MAX_ROWS                 [=] max_number_of_rows]
[MIN_ROWS                 [=] min_number_of_rows]
[TABLESPACE               [=] tablespace_name]
[(subpartition_definition [, subpartition_definition] ...)]
```

#### subpartition_definition

```sql
SUBPARTITION logical_name
[[STORAGE] ENGINE [=] engine_name]
[COMMENT          [=] 'comment_text' ]
[DATA DIRECTORY   [=] 'data_dir']
[INDEX DIRECTORY  [=] 'index_dir']
[MAX_ROWS         [=] max_number_of_rows]
[MIN_ROWS         [=] min_number_of_rows]
[TABLESPACE       [=] tablespace_name]
```

## 插入数据

```sql
-- 插入多条（或一条）数据

INSERT
  [LOW_PRIORITY | DELAYED | HIGH_PRIORITY]
  [IGNORE] -- 将错误降级为警告（注意，遇到数据类型错误不会停止更新该数据，而是使用最接近的有效值）
  -- https://dev.mysql.com/doc/refman/en/sql-mode.html#ignore-strict-comparison
  [INTO]
  table_name
  [PARTITION (partition_name,...)]
  [(col_name,...)]
  {VALUES | VALUE} ({expr | DEFAULT},...),(...),...
  [ON DUPLICATE KEY UPDATE col_name=expr [, col_name=expr] ... ]

-- or: 插入一条数据

INSERT
  [LOW_PRIORITY | DELAYED | HIGH_PRIORITY]
  [IGNORE]
  [INTO]
  table_name
  [PARTITION (partition_name,...)]
  SET col_name={expr | DEFAULT}, ...
  [ON DUPLICATE KEY UPDATE col_name=expr [, col_name=expr] ... ]

-- or: 从表格选取数据插入

INSERT
  [LOW_PRIORITY | HIGH_PRIORITY]
  [IGNORE]
  [INTO]
  table_name
  [PARTITION (partition_name,...)]
  [(col_name,...)]
  SELECT ...
  [ON DUPLICATE KEY UPDATE col_name=expr [, col_name=expr] ... ]
```

## 更新数据

```sql
-- Single-table syntax:

UPDATE
  [LOW_PRIORITY] -- 在只支持表锁的引擎（如MyISAM）中，等到没有任何会话读取要更新的表格时才会执行。
  [IGNORE]
  table_reference
  SET col_name1={expr1|DEFAULT} [, col_name2={expr2|DEFAULT}] ...
  [WHERE where_condition]
  [ORDER BY ...]
  [LIMIT row_count]

-- Multiple-table syntax:

UPDATE
  [LOW_PRIORITY]
  [IGNORE]
  table_references
  SET col_name1={expr1|DEFAULT} [, col_name2={expr2|DEFAULT}] ...
  [WHERE where_condition]
```

## 查询数据

```sql
SELECT
  [ALL | DISTINCT | DISTINCTROW ]
  [HIGH_PRIORITY]
  [MAX_STATEMENT_TIME = N]
  [STRAIGHT_JOIN]
  [SQL_SMALL_RESULT]
  [SQL_BIG_RESULT]
  [SQL_BUFFER_RESULT]
  [SQL_CACHE | SQL_NO_CACHE]
  [SQL_CALC_FOUND_ROWS]
  select_expr [, select_expr ...]
  [
    FROM table_references
    [PARTITION partition_list]
    [WHERE where_condition]
    [GROUP BY {col_name | expr | position} [ASC | DESC], ... [WITH ROLLUP]]
    [HAVING where_condition]
    [ORDER BY {col_name | expr | position} [ASC | DESC], ...]
    [LIMIT {[offset,] row_count | row_count OFFSET offset}]
    [PROCEDURE procedure_name(argument_list)]
    [INTO OUTFILE 'file_name'
        [CHARACTER SET charset_name]
        export_options
      | INTO DUMPFILE 'file_name'
      | INTO var_name [, var_name]
    ]
    [FOR UPDATE | LOCK IN SHARE MODE]
  ]

-- 联合数据
SELECT ...
UNION [ALL | DISTINCT] SELECT ...
[UNION [ALL | DISTINCT] SELECT ...]
```

## 会话

```sql
-- 获取活动连接
SHOW PROCESSLIST;

-- 杀死连接
KILL process_id;

-- 当前连接ID
SELECT CONNECTION_ID();
```

## 锁

```sql
SHOW STATUS LIKE 'table%';

-- 查看当前在缓存中被打开的表
SHOW OPEN TABLES;

-- 查看当前有被锁的表
SHOW OPEN TABLES WHERE IN_USE > 0;

-- 表锁
LOCK TABLES table_one READ;
LOCK TABLES table_one WRITE;
UNLOCK TABLES;

-- 行锁
SELECT * FROM table_one WHERE ... LOCK IN SHARE MODE; -- 在事务中才生效
SELECT * FROM table_one WHERE ... FOR UPDATE; -- 在事务中才生效

-- 查看当前存在的锁
SELECT * FROM INFORMATION_SCHEMA.INNODB_LOCKS;
SELECT * FROM PERFORMANCE_SCHEMA.DATA_LOCKS;

-- 查看等待锁的信息
SELECT * FROM INFORMATION_SCHEMA.INNODB_LOCK_WAITS;
SELECT * FROM PERFORMANCE_SCHEMA.DATA_LOCK_WAITS;

-- 查看锁的情况
SHOW STATUS LIKE 'innodb_row_lock_%';
-- Innodb_row_lock_current_waits : 当前等待锁的数量
-- Innodb_row_lock_time : 系统启动到现在，锁定的总时间长度
-- Innodb_row_lock_time_avg : 每次平均锁定的时间
-- Innodb_row_lock_time_max : 最长一次锁定时间
-- Innodb_row_lock_waits : 系统启动到现在总共锁定的次数
```

## 事务

```sql
-- 设置事务参数
SET TRANSACTION ISOLATION_LEVEL isolation_level;
-- 事务访问模式（读写/只读）
SET TRANSACTION READ WRITE; -- 默认
SET TRANSACTION READ ONLY;

-- 开启事务
BEGIN;

-- 提交事务
COMMIT;

-- 回滚事务
ROLLBACK;

-- 查看当前连接的事务信息
SELECT * FROM INFORMATION_SCHEMA.INNODB_TRX  WHERE TRX_MYSQL_THREAD_ID = CONNECTION_ID();

-- 查看当前运行的所有事务
SELECT * FROM INFORMATION_SCHEMA.INNODB_TRX;
SELECT trx_id as 事务ID,
       trx_mysql_thread_id as 事务所在会话id,
       trx_state as 事务状态,
       trx_isolation_level as 隔离级别,
       trx_started as 事务开始时间,
       trx_query as 事务执行语句 FROM INFORMATION_SCHEMA.INNODB_TRX;

```

## 隔离级别

```sql
HELP ISOLATION;
```

  | Isolation Level    |     |
  | ------------------ | --- |
  | `REPEATABLE READ`  |     |
  | `READ COMMITTED`   |     |
  | `READ UNCOMMITTED` |     |
  | `SERIALIZABLE`     |     |

```shell
--transaction-isolation=<READ-UNCOMMITTED|READ-COMMITTED|REPEATABLE-READ|SERIALIZABLE>
```

```sql
-- 设置当前会话下一个事务的隔离级别（不允许在已开启事务的情况下执行）
SET TRANSACTION ISOLATION LEVEL isolation_level;
-- 设置当前会话接下来所有事物的隔离级别
SET SESSION TRANSACTION ISOLATION LEVEL isolation_level;
SET SESSION tx_isolation=isolation_level;
-- 设置系统后续所有事物的隔离级别
SET GLOBAL TRANSACTION ISOLATION LEVEL isolation_level;
SET GLOBAL tx_isolation=isolation_level;

-- 查看当前事务隔离级别
SELECT @@GLOBAL.tx_isolation, @@tx_isolation;
```

## 环境参数

- 参数分为**系统参数**和**会话参数**；
- **会话参数初始值**由创建会话时定义和从系统参数继承而来；
- **动态类型参数**会立即派发到已建立的会话；

```sql
HELP VARIABLE;
HELP SHOW VARIABLES;
```

```sql
-- 系统参数
SELECT @@global.xxx;
SHOW GLOBAL VARIABLES LIKE ...;
SHOW GLOBAL VARIABLES WHERE ...;
SET GLOBAL variable=value;
SET @@global.variable=value;

-- 会话参数（LOCAL是SESSION同义词）
SELECT @@session.xxx;
SHOW SESSION VARIABLES LIKE ...;
SHOW SESSION VARIABLES WHERE ...;
SET SESSION variable=value;
SET @@session.variable=value;
-- 如果不加前缀，默认就是SESSION
SELECT @@xxx;
SHOW VARIABLES LIKE ...;
SHOW VARIABLES WHERE ...;
SET variable=value;
SET @@variable=value;

-- 查看超时时间
SHOW VARIABLES LIKE '%timeout%';

-- 查看行锁相关参数
SHOW STATUS LIKE 'innodb_row_lock_%';

-- 查看当前默认隔离级别
SELECT @@global.tx_isolation;

-- 查看当前是否默认自动提交事务
SELECT @@global.autocommit;
SHOW GLOBAL VARIABLES LIKE 'autocommit';
```

一些参数解读：

- [Server System Variables](https://dev.mysql.com/doc/refman/en/server-system-variables.html)
- [Persisted System Variables](https://dev.mysql.com/doc/refman/en/persisted-system-variables.html)
- [Dynamic System Variables](https://dev.mysql.com/doc/refman/en/dynamic-system-variables.html)
- [InnoDB Parameters](https://dev.mysql.com/doc/refman/en/innodb-parameters.html)
- [InnoDB Startup Options and System Variables](https://dev.mysql.com/doc/refman/en/innodb-parameters.html)
- [Server Status Variables](https://dev.mysql.com/doc/refman/8.0/en/server-status-variables.html)

| Variable                     |                                                        | Global | Session | Dynamic |
| ---------------------------- | ------------------------------------------------------ | ------ | ------- | ------- |
| `innodb_lock_wait_timeout`   | *InnoDB*锁等待超时时间（秒）                           | Y      | Y       | Y       |
| `innodb_rollback_on_timeout` | 是否在锁等待超时后自动回滚整个事务                     | Y      |         |         |
| `autocommit`                 | 默认是否自动提交事务                                   | Y      | Y       | Y       |
| `tx_isolation`               | 默认隔离级别                                           | Y      | Y       | Y       |
| `tx_read_only`               | 是否事务默认只读模式                                   | Y      | Y       | Y       |
| `connect_timeout`            | **连接超时**时间（秒）                                 | Y      |         | Y       |
| `wait_timeout`               | 非交互式连接**活动超时**（即最长不活动时间）时间（秒） | Y      | Y       | Y       |
| `interactive_timeout`        | 交互式连接活动超时时间（秒）                           | Y      | Y       | Y       |
| `lock_wait_timeout`          | 所有类型锁的等待超时时间（秒）                         | Y      | Y       | Y       |
| `default_storage_engine`     | 默认存储引擎                                           | Y      | Y       | Y       |
| `tmp_table_size`             | 临时表格大小                                           | Y      | Y       | Y       |
| `time_zone`                  | 时区                                                   | Y      | Y       | Y       |
| `system_time_zone`           | 系统时区                                               | Y      |         |         |

## 诊断

```sql
-- 显示当前会话的历史警告
SHOW WARNINGS;
-- 显示当前会话的历史错误
SHOW ERRORS;
```

# 状态解读（STATUS）

- `Table_locks_immediate`:
- `Innodb_row_lock_current_waits`: 当前等待锁的数量
- `Innodb_row_lock_time`: 系统启动到现在，锁定的总时间长度
- `Innodb_row_lock_time_avg`: 每次平均锁定的时间
- `Innodb_row_lock_time_max`: 最长一次锁定时间
- `Innodb_row_lock_waits`: 系统启动到现在总共锁定的次数

# Explain

```sql
EXPLAIN
```

  | 字段            | 值                                                    | 含义                                                                                                                              |
  | --------------- | ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
  | `id`            |                                                       | 按照sql语法解析后分层后的编号，可能重复                                                                                           |
  | `select_type`   |                                                       |                                                                                                                                   |
  |                 | `SIMPLE`                                              | 简单的select查询,不使用union及子查询                                                                                              |
  |                 | `PRIMARY`                                             | 最外层的select查询                                                                                                                |
  |                 | `UNION`                                               | UNION 中的第二个或随后的 select 查询,不依赖于外部查询的结果集                                                                     |
  |                 | `DEPENDENT UNION`                                     | UNION 中的第二个或随后的 select 查询,依赖于外部查询的结果集                                                                       |
  |                 | `SUBQUERY`                                            | 子查询中的第一个 select 查询,不依赖于外部查询的结果集                                                                             |
  |                 | `DEPENDENT SUBQUERY`                                  | 子查询中的第一个 select 查询,依赖于外部查询的结果集                                                                               |
  |                 | `DERIVED`                                             | 用于 from子句里有子查询的情况。 MySQL会递归执行这些子查询, 把结果放在临时表里。                                                   |
  |                 | `UNCACHEABLE SUBQUERY`                                | 结果集不能被缓存的子查询,必须重新为外层查询的每一行进行评估。                                                                     |
  |                 | `UNCACHEABLE UNION`                                   | UNION 中的第二个或随后的 select 查询,属于不可缓存的子查询                                                                         |
  | `table`         |                                                       | 涉及的表，如果SQL中表有赋别名，这里出现的是别名                                                                                   |
  | `type`          |                                                       |                                                                                                                                   |
  |                 | `system`                                              | 从系统表读一行。这是const联接类型的一个特例。                                                                                     |
  |                 | `const`                                               | 表最多有一个匹配行,它将在查询开始时被读取。因为仅有一行,在这行的列值可被优化器剩余部分认为是常数。const表很快,因为它们只读取一次! |
  |                 | `eq_ref`                                              | 查询条件为等于                                                                                                                    |
  |                 | `ref`                                                 | 条件查询不等于                                                                                                                    |
  |                 | `ref_or_null`                                         | 同ref(条件查询),包含NULL值的行。                                                                                                  |
  |                 | `index_merge`                                         | 索引联合查询                                                                                                                      |
  |                 | `unique_subquery`                                     | 利用唯一索引进行子查询                                                                                                            |
  |                 | `index_subquery`                                      | 用非唯一索引进行子查询                                                                                                            |
  |                 | `range`                                               | 索引范围扫描                                                                                                                      |
  |                 | `index`                                               | 索引全扫描                                                                                                                        |
  |                 | `ALL`                                                 | 全表扫描。                                                                                                                        |
  | `possible_keys` |                                                       | 可能使用的索引                                                                                                                    |
  | `key`           |                                                       | sql中使用的索引                                                                                                                   |
  | `key_len`       |                                                       | 索引长度                                                                                                                          |
  | `ref`           |                                                       | 使用哪个列或常数与key一起从表中选择行。                                                                                           |
  | `rows`          |                                                       | 显示MYSQL执行查询的行数，简单且重要，数值越大越不好，说明没有用好索引                                                             |
  | `Extra`         |                                                       | 该列包含MySQL解决查询的详细信息。                                                                                                 |
  |                 | `Distinct`                                            |                                                                                                                                   | 去重，返回第一个满足条件的值 |
  |                 | `Not exists`                                          | 使用not exists查询                                                                                                                |
  |                 | `Range checked for each record`                       | 有索引，但索引选择率很低                                                                                                          |
  |                 | `Using filesort`                                      | 有序查询                                                                                                                          |
  |                 | `Using index`                                         | 索引全扫描                                                                                                                        |
  |                 | `Using index condition`                               | 索引查询                                                                                                                          |
  |                 | `Using temporary`                                     | 临表表检索                                                                                                                        |
  |                 | `Using where`                                         | where条件查询                                                                                                                     |
  |                 | `Using sort_union`                                    | 有序合并查询                                                                                                                      |
  |                 | `Using union`                                         | 合并查询                                                                                                                          |
  |                 | `Using intersect`                                     | 索引交叉合并                                                                                                                      |
  |                 | `Impossible WHERE noticed after reading const tables` | 读取const tables,查询结果为空                                                                                                     |
  |                 | `No tables used`                                      | 没有使用表                                                                                                                        |
  |                 | `Using join buffer (Block Nested Loop)`               | 使用join buffer(BNL算法)                                                                                                          |
  |                 | `Using MRR(Multi-Range Read)`                         | 使用辅助索引进行多范围读                                                                                                          |
[ref](https://cloud.tencent.com/developer/article/1401617)

# 常见函数
