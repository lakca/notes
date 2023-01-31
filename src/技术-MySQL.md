---
date: 2022-03-31T18:29:47+08:00
title: Mysql
---

# 阅读

- [InnoDB and the ACID Model](https://dev.mysql.com/doc/refman/8.0/en/mysql-acid.html)
- [事务模型｜InnoDB Transaction Model](https://dev.mysql.com/doc/refman/8.0/en/innodb-transaction-model.html)
- [锁｜InnoDB Locking](https://dev.mysql.com/doc/refman/8.0/en/innodb-locking.html)
- [锁范围｜Locks Set by Different SQL Statements in InnoDB](https://dev.mysql.com/doc/refman/8.0/en/innodb-locks-set.html)
- [死锁｜Deadlocks in InnoDB](https://dev.mysql.com/doc/refman/8.0/en/innodb-deadlocks.html)
- [事务调度｜Transaction Scheduling](https://dev.mysql.com/doc/refman/8.0/en/innodb-transaction-scheduling.html)
- [INFORMATION_SCHEMA schema](https://dev.mysql.com/doc/refman/8.0/en/information-schema.html)
- [PERFORMANCE_SCHEMA schema](https://dev.mysql.com/doc/refman/8.0/en/performance-schema.html)
- [SYS schema](https://dev.mysql.com/doc/refman/8.0/en/sys-schema.html)
- [MYSQL schema](https://dev.mysql.com/doc/refman/8.0/en/system-schema.html)
- [数据类型｜Data Types](https://dev.mysql.com/doc/refman/en/data-types.html)
- [函数和操作符｜Functions and Operators](https://dev.mysql.com/doc/refman/en/functions.html)
- [语句｜SQL Statements](https://dev.mysql.com/doc/refman/en/sql-statements.html)
- [分区｜Partitioning](https://dev.mysql.com/doc/refman/en/partitioning.html)
- [存储对象｜Stored Objects](https://dev.mysql.com/doc/refman/5.7/en/stored-objects.html)
- [备份｜Backup and Recovery](https://dev.mysql.com/doc/refman/en/backup-and-recovery.html)
- [集群｜InnoDB Cluster](https://dev.mysql.com/doc/refman/8.0/en/mysql-innodb-cluster-introduction.html)
- [复制｜Replication](https://dev.mysql.com/doc/refman/en/replication.html)
- [组复制｜Group Replication](https://dev.mysql.com/doc/refman/8.0/en/group-replication.html)
- [副本集｜InnoDB ReplicaSet](https://dev.mysql.com/doc/refman/8.0/en/mysql-innodb-replicaset-introduction.html)
- [安全｜Security](https://dev.mysql.com/doc/refman/en/security.html)
- [参数｜Server System Variable Reference](https://dev.mysql.com/doc/refman/5.7/en/server-system-variable-reference.html)
- [状态｜Server Status Variable Reference](https://dev.mysql.com/doc/refman/5.7/en/server-status-variable-reference.html)
- [优化｜Optimization](https://dev.mysql.com/doc/refman/en/optimization.html)
- [日志｜MySQL Server Logs](https://dev.mysql.com/doc/refman/8.0/en/server-logs.html)
- [调试｜Debugging MySQL](https://dev.mysql.com/doc/refman/8.0/en/debugging-mysql.html)
- [错误信息｜Error Messages and Common Problems](https://dev.mysql.com/doc/refman/en/error-handling.html)
- [词汇表｜MySQL Glossary](https://dev.mysql.com/doc/refman/en/glossary.html)

# 存储引擎

| Engine   | 表锁 | 行锁    | 页锁 |
| -------- | ---- | ------- | ---- |
| `InnoDB` | Y    | Y(默认) |
| `MyISAM` | Y    |
| `MEMORY` | Y    |
| `BDB`    |      |         | Y    |

# InnoDB

- [InnoDB and the ACID Model](https://dev.mysql.com/doc/refman/8.0/en/mysql-acid.html)
- [InnoDB Locking and Transaction Model](https://dev.mysql.com/doc/refman/8.0/en/innodb-locking-transaction-model.html)
  - [InnoDB Locking](https://dev.mysql.com/doc/refman/8.0/en/innodb-locking.html)
  - [InnoDB Transaction Model](https://dev.mysql.com/doc/refman/8.0/en/innodb-transaction-model.html)
  - [Locks Set by Different SQL Statements in InnoDB](https://dev.mysql.com/doc/refman/8.0/en/innodb-locks-set.html)
  - [Deadlocks in InnoDB](https://dev.mysql.com/doc/refman/8.0/en/innodb-deadlocks.html)
  - [Transaction Scheduling](https://dev.mysql.com/doc/refman/8.0/en/innodb-transaction-scheduling.html)
- [InnoDB Parameters](https://dev.mysql.com/doc/refman/en/innodb-parameters.html)
- [InnoDB Startup Options and System Variables](https://dev.mysql.com/doc/refman/en/innodb-parameters.html)

## 锁

- 行锁
  - **共享锁（S）（读锁）**：与~~排他锁（X）~~不共存
  - **排他锁（X）（写锁）**：与~~共享锁（S）~~和~~排他锁（X）~~不共存
- 表锁（意向锁）
  - **意向共享锁（IS）**：共享锁（S）加锁前，必须获取意向共享锁（IS）
  - **意向排他锁（IX）**：排他锁（X）加锁前，必须获得意向排他锁（IX）

锁，建立的目的是，解决非原子性操作的原子性问题，避免不一致（意外的中间状态）的出现。

**行锁，建立在索引的基础上**。如果查询的字段没有索引，那么会使用表锁。

对于`UPDATE`/`DELETE`/`INSERT`语句，*InnoDB*自动给涉及的数据集加*排他锁（X）*。

# 基础概念

## Schema

## Charset

> 字符集*Charset*定义了字符的编码存储方式，最直接的影响就是可表示的字符范围和存储大小。

MySQL中的`utf8`只实现了部分**UTF-8**标准（基本平面字符BMP，最多三个字节，即最大*16bits*, *0xFFFF*, *65535*），`utf8mb4`(*utf8 most bytes 4*)实现了完整的**UTF-8**标准。

## Collation

> 为了存储和执行性能，在MySQL中，字符除了有字符集*Charset*以外，还细化出了整理集合*Collation*。
>
> 字符集定义了字符的存储方式，整理集定义了字符的范围和处理逻辑，如西欧各国字符、大小写敏感、重音符敏感等。
>
> 如`utf8_unicode_ci`为不区分大小写的*unicode*字符，`utf8_roman_ci`为不区分大小学的罗马字符

常见的整理集后缀含义：

| Suffix | Meaning            |
| ------ | ------------------ |
| `_ai`  | Accent-insensitive |
| `_as`  | Accent-sensitive   |
| `_ci`  | Case-insensitive   |
| `_cs`  | Case-sensitive     |
| `_ks`  | Kana-sensitive     |
| `_bin` | Binary             |

# 基础语句

复合语句：

```sql
-- 常用于创建存储过程或函数中
[label:] BEGIN [statement_list] END [label]
```

流程控制语句：

```sql
-- 中断流程
LEAVE label

-- 重新开始流程
ITERATE label

-- 函数返回
RETURN expr

-- 条件 if
IF search_condition THEN statement_list
    [ELSEIF search_condition THEN statement_list] ...
    [ELSE statement_list]
END IF

-- 条件 switch
CASE case_value
    WHEN when_value THEN statement_list
    [WHEN when_value THEN statement_list] ...
    [ELSE statement_list]
END CASE

CASE
    WHEN search_condition THEN statement_list
    [WHEN search_condition THEN statement_list] ...
    [ELSE statement_list]
END CASE

-- 循环语句：
[label:] LOOP
    statement_list
END LOOP [label]

[label:] REPEAT
    statement_list
UNTIL search_condition
END REPEAT [label]

[label:] WHILE search_condition DO
    statement_list
END WHILE [label]
```

# 常用语句

## 表格信息

```sql
-- 获取表字段描述
[DESCRIBE | SHOW COLUMNS] table_one;
SHOW FIELDS FROM table_one;

-- 获取表创建语句
SHOW CREATE TABLE table_one;

SHOW TABLE STATUS table_one;

-- 查看索引信息
SHOW INDEX FROM table_one;
SHOW KEYS FROM table_one;
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

## 创建记录

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

## 更新记录

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

## 查询记录

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

## 存储过程或函数

创建存储过程或函数：

```sql
-- 创建存储过程
CREATE
  [DEFINER = { user | CURRENT_USER }]
  PROCEDURE sp_name ([proc_parameter[,...]])
  [characteristic ...] routine_body
-- 创建函数
CREATE
  [DEFINER = { user | CURRENT_USER }]
  FUNCTION sp_name ([func_parameter[,...]])
  RETURNS type
  [characteristic ...] routine_body

proc_parameter: [ IN | OUT | INOUT ] param_name type

func_parameter: param_name type

type: Any valid MySQL data type

characteristic:
    COMMENT 'string'
  | LANGUAGE SQL
  | [NOT] DETERMINISTIC
  | { CONTAINS SQL | NO SQL | READS SQL DATA | MODIFIES SQL DATA }
  | SQL SECURITY { DEFINER | INVOKER }

routine_body: Valid SQL routine statement
```

调用存储过程/函数：

```sql
CALL sp_name;
```

查看存储过程/函数：

```sql
SELECT * FROM mysql.proc;

SHOW PROCEDURE STATUS;
SHOW FUNCTION STATUS;

SHOW CREATE PROCEDURE proc_name;
SHOW CREATE FUNCTION func_name;
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
SELECT * FROM table_one WHERE ... LOCK IN SHARE MODE; -- 共享锁，在事务中才生效
SELECT * FROM table_one WHERE ... FOR UPDATE; -- 排他锁，在事务中才生效

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
-- 开启事务
START TRANSACTION [transaction_characteristic [, ...]]
-- OR
BEGIN [WORK];

transaction_characteristic: {WITH CONSISTENT SNAPSHOT | READ WRITE | READ ONLY}

-- 提交事务
-- CHAIN: 是否在结束后立即开启一个同样参数的事务，关联参数: completion_type
-- RELEASE: 是否在结束后断开会话连接，关联参数: completion_type
COMMIT [WORK] [AND [NO] CHAIN] [[NO] RELEASE];

-- 回滚事务
ROLLBACK [WORK] [AND [NO] CHAIN] [[NO] RELEASE];

SET autocommit={0 | 1};

-- 设置全局或会话默认事务参数
SET GLOBAL TRANSACTION transaction_characteristic [, ...]
SET SESSION TRANSACTION transaction_characteristic [, ...]
-- 设置当前会话下一次事务参数（如果当前会话有已经开启的事务则无法设置）
SET TRANSACTION transaction_characteristic [, ...]

transaction_characteristic: {ISOLATION LEVEL isolation_level | READ WRITE | READ ONLY}

isolation_level: {REPEATABLE READ | READ COMMITTED | READ UNCOMMITTED | SERIALIZABLE}
```
```sql
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

## 系统参数

- 参数分为**系统参数**（`GLOBAL`修饰）和**会话参数**（`SESSION`修饰）；
- **会话参数初始值**由创建会话时定义和从系统参数继承而来；
- **动态类型参数**会立即派发到已建立的会话；
- 参数存储表格：`show tables from information_schema like '%variables%';`, `show tables from performance_schema like '%variables%';`

```sql
-- 查询参数值
SHOW [GLOBAL | SESSION] VARIABLES [LIKE 'pattern' | WHERE expr];
-- SHOW VARIABLES 有最大显示宽度限制，可以由此替代：
SELECT @@[{GLOBAL | SESSION}.]var_name;

-- 设置参数值
SET [GLOBAL | SESSION] var_name=var_value;
SET @@[{GLOBAL | SESSION}.]var_name=var_value;
```

```sql
-- 查看数据库所有引擎
SHOW ENGINES;

-- 查看存储引擎状态
SHOW ENGINE INNODB STATUS;

-- 查看超时时间
SHOW VARIABLES LIKE '%timeout%';

-- 查看当前默认隔离级别
SELECT @@global.tx_isolation;

-- 查看当前是否默认自动提交事务
SELECT @@global.autocommit;
SHOW GLOBAL VARIABLES LIKE 'autocommit';
```

## 系统状态

```sql
SHOW [GLOBAL | SESSION] STATUS [LIKE 'pattern' | WHERE expr]
```

```sql
-- 查看行锁相关参数
SHOW STATUS LIKE 'innodb_row_lock_%';
-- 显示当前会话的历史警告
SHOW WARNINGS;
-- 显示当前会话的历史错误
SHOW ERRORS;
```

# 账号和权限

- 用户表：`mysql.user`
- 权限表：`INFORMATION_SCHEMA.USER_PRIVILEGES`

## 账号（User）

创建账号

```sql
CREATE USER [IF NOT EXISTS]
    user [auth_option] [, user [auth_option]] ...
    [REQUIRE {NONE | tls_option [[AND] tls_option] ...}]
    [WITH resource_option [resource_option] ...]
    [password_option | lock_option] ...

user:
    (see Section 6.2.4, “Specifying Account Names”)

auth_option: {
    IDENTIFIED BY 'auth_string'
  | IDENTIFIED WITH auth_plugin
  | IDENTIFIED WITH auth_plugin BY 'auth_string'
  | IDENTIFIED WITH auth_plugin AS 'auth_string'
  | IDENTIFIED BY PASSWORD 'auth_string'
}

tls_option: {
   SSL
 | X509
 | CIPHER 'cipher'
 | ISSUER 'issuer'
 | SUBJECT 'subject'
}

resource_option: {
    MAX_QUERIES_PER_HOUR count
  | MAX_UPDATES_PER_HOUR count
  | MAX_CONNECTIONS_PER_HOUR count
  | MAX_USER_CONNECTIONS count
}

password_option: {
    PASSWORD EXPIRE
  | PASSWORD EXPIRE DEFAULT
  | PASSWORD EXPIRE NEVER
  | PASSWORD EXPIRE INTERVAL N DAY
}

lock_option: {
    ACCOUNT LOCK
  | ACCOUNT UNLOCK
}

-- 例如：
CREATE USER 'local'@'localhost' IDENTIFIED BY PASSWORD '123456';
CREATE USER 'local'@'localhost' IDENTIFIED BY PASSWORD '123456' PASSWORD EXPIRE INTERVAL 180 DAY;
```

其他

```sql
-- 账号列表（及账号权限）
SELECT * FROM mysql.user;
```

## 授权（Privilege）

- [权限类型](https://dev.mysql.com/doc/refman/5.7/en/privileges-provided.html)

相关数据库

- `mysql.columns_priv`
- `mysql.procs_priv`
- `mysql.proxies_priv`
- `mysql.tables_priv`
- `INFORMATION_SCHEMA.COLUMN_PRIVILEGES`
- `INFORMATION_SCHEMA.SCHEMA_PRIVILEGES`
- `INFORMATION_SCHEMA.TABLE_PRIVILEGES`
- `INFORMATION_SCHEMA.USER_PRIVILEGES`

```sql
GRANT
    priv_type [(column_list)]
      [, priv_type [(column_list)]] ...
    ON [object_type] priv_level
    TO user_specification [, user_specification] ...
    [REQUIRE {NONE | ssl_option [[AND] ssl_option] ...}]
    [WITH {GRANT OPTION | resource_option} ...]

GRANT PROXY ON user_specification
    TO user_specification [, user_specification] ...
    [WITH GRANT OPTION]

priv_type: -- https://dev.mysql.com/doc/refman/5.7/en/privileges-provided.html

object_type: {
    TABLE
  | FUNCTION
  | PROCEDURE
}

priv_level: {
    *
  | *.*
  | db_name.*
  | db_name.tbl_name
  | tbl_name
  | db_name.routine_name
}

user_specification:
    user [ auth_option ]

auth_option: {     -- Before MySQL 5.7.6
    IDENTIFIED BY 'auth_string'
  | IDENTIFIED BY PASSWORD 'hash_string'
  | IDENTIFIED WITH auth_plugin
  | IDENTIFIED WITH auth_plugin AS 'hash_string'
}

auth_option: {     -- As of MySQL 5.7.6
    IDENTIFIED BY 'auth_string'
  | IDENTIFIED BY PASSWORD 'hash_string'
  | IDENTIFIED WITH auth_plugin
  | IDENTIFIED WITH auth_plugin BY 'auth_string'
  | IDENTIFIED WITH auth_plugin AS 'hash_string'
}

ssl_option: {
    SSL
  | X509
  | CIPHER 'cipher'
  | ISSUER 'issuer'
  | SUBJECT 'subject'
}

resource_option: {
  | MAX_QUERIES_PER_HOUR count
  | MAX_UPDATES_PER_HOUR count
  | MAX_CONNECTIONS_PER_HOUR count
  | MAX_USER_CONNECTIONS count
}

-- 例如
GRANT
```

其他

```sql
-- 取消授权
INVOKE
-- 查看当前授权语句
SHOW GRANTS;
-- 查看授权详细
SELECT * FROM mysql.user WHERE User='local' AND Host='localhost';
SELECT * FROM INFORMATION_SCHEMA.USER_PRIVILEGES WHERE GRANTEE="'local'@'localhost'";
SELECT * FROM INFORMATION_SCHEMA.COLUMN_PRIVILEGES WHERE GRANTEE="'local'@'localhost'";
SELECT * FROM INFORMATION_SCHEMA.TABLE_PRIVILEGES WHERE GRANTEE="'local'@'localhost'";
SELECT * FROM INFORMATION_SCHEMA.SCHEMA_PRIVILEGES WHERE GRANTEE="'local'@'localhost'";
```

# 存储对象

> 所谓存储对象，即存储在服务器上一段供以后执行的代码，根据执行条件分为不同的类型。

MySQL**存储对象** (*Stored Object*)有如下类型：

- *存储程序* (*Stored Program*): 声明+调用
  - *存储例程* (*Stored Routine*): 手动调用，可传参数（*即普通意义的函数*）
    - **存储过程** (*Stored Procedure*): 通过`CALL`语句调用，没有返回值（*即没有返回值的函数*）
    - **存储函数** (*Stored Function*): 作为表达式调用，有返回值（*即有返回值的函数*）
  - **触发器** (*Trigger*): 在表执行特定动作（如`CREATE`）时触发（*即事件监听器*）
  - **事件** (*Event*): 定时执行语句（*即定时任务*）
- **视图** (*View*): 存储静态查询语句在被调用时生成数据集。（*即引用外部数据的虚拟表*）

相关数据库

- `INFORMATION_SCHEMA.ROUTINES`
- `mysql.proc`

## 存储过程 (Stored Procedure)

> 没有返回值的函数，由`CALL`语句调用。

查看

```sql
-- 列表
SHOW PROCEDURE STATUS;
-- 详情
SHOW CREATE PROCEDURE proc_name
-- 查看数据库有哪些存储过程
SELECT name FROM MYSQL.PROC WHERE type='PROCEDURE' AND db='sys';
SELECT ROUTINE_NAME FROM INFORMATION_SCHEMA.ROUTINES WHERE ROUTINE_TYPE='PROCEDURE' AND ROUTINE_SCHEMA='sys';
```

## 存储函数 (Stored Function)

> 有返回值的函数，可作为表达式调用。

查看

```sql
-- 列表
SHOW EVENTS FROM db_name;
SHOW FUNCTION STATUS;
-- 详情
SHOW CREATE FUNCTION func_name
-- 查看数据库有哪些存储函数
SELECT name FROM MYSQL.PROC WHERE type='FUNCTION' AND db='sys';
SELECT ROUTINE_NAME FROM INFORMATION_SCHEMA.ROUTINES WHERE ROUTINE_TYPE='FUNCTION' AND ROUTINE_SCHEMA='sys';
```

## 触发器 (Trigger)

> 监听永久表（~~临时表和视图~~不可以）的事件，执行程序。属于数据库对象。

监听器类型

- `INSERT`: 当有新行被插入时触发，包括`INSERT`, `LOAD DATA`, `REPLACE`。
- `UPDATE`: 当有行本身被直接修改时触发，包括`UPDATE`。
- `DELETE`: 当有行本身被直接删除时触发，包括`DELETE`和`REPLACE`等，~~`DROP`和`TRUNCATE`~~等不会调用`DELETE`的不会触发。

创建

```sql
CREATE
    [DEFINER = { user | CURRENT_USER }]
    TRIGGER trigger_name
    trigger_time trigger_event
    ON tbl_name FOR EACH ROW
    [trigger_order]
    trigger_body -- 触发代码中可以使用 OLD 和 NEW 指代被操作的行，如 OLD.col_name
    -- 注意，col_name 不能是间接生成的列

trigger_time: { BEFORE | AFTER }

trigger_event: { INSERT | UPDATE | DELETE }

trigger_order: { FOLLOWS | PRECEDES } other_trigger_name -- 定义与其他触发器之间的执行顺序

-- 如，
CREATE TRIGGER schema_name.trigger_name
AFTER INSERT ON tb_name
FOR EACH ROW
```

其他

```sql
-- 删除
DROP TRIGGER [IF EXISTS] [schema_name.]trigger_name
-- 列表
SHOW TRIGGERS [FROM schema_name] [like_or_where]
-- 详情
SHOW CREATE TRIGGER trigger_name
SELECT * FROM INFORMATION_SCHEMA.TRIGGERS
```

## 事件 (Event)

> 通过系统调度器，定时执行程序。属于数据库对象。

- 由`event_scheduler`参数控制系统调度器开关。

创建

```sql
CREATE
    [DEFINER = { user | CURRENT_USER }]
    EVENT
    [IF NOT EXISTS]
    event_name
    ON SCHEDULE schedule
    [ON COMPLETION [NOT] PRESERVE]
    [ENABLE | DISABLE | DISABLE ON SLAVE]
    [COMMENT 'comment']
    DO event_body;

schedule:
    AT timestamp [+ INTERVAL interval] ...
  | EVERY interval
    [STARTS timestamp [+ INTERVAL interval] ...]
    [ENDS timestamp [+ INTERVAL interval] ...]

interval:
    quantity {YEAR | QUARTER | MONTH | DAY | HOUR | MINUTE |
              WEEK | SECOND | YEAR_MONTH | DAY_HOUR | DAY_MINUTE |
              DAY_SECOND | HOUR_MINUTE | HOUR_SECOND | MINUTE_SECOND}

-- 如，一小时后调用存储过程myproc
CREATE EVENT db_name.ev_name
ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL 1 HOUR
DO CALL myproc;
-- 如，每天统计登录人数，并从6小时15分钟后开始第一次
CREATE EVENT db_name.ev_name
ON SCHEDULE EVERY 1 DAY STARTS CURRENT_TIMESTAMP + INTERVAL '6:15' HOUR_MINUTE
DO SELECT CURRENT_TIMESTAMP, COUNT(*) FROM activity.sessions;
```

其他

```sql
-- 修改
ALTER
    [DEFINER = { user | CURRENT_USER }]
    EVENT event_name
    [ON SCHEDULE schedule]
    [ON COMPLETION [NOT] PRESERVE]
    [RENAME TO new_event_name] -- 改名
    [ENABLE | DISABLE | DISABLE ON SLAVE] -- 开关
    [COMMENT 'comment']
    [DO event_body] -- 程序
-- 删除
DROP EVENT [IF EXISTS] ev_name
-- 列表
SHOW EVENTS FROM db_name
-- 详情
SHOW CREATE EVENT ev_name
SELECT * FROM INFORMATION_SCHEMA.EVENTS
SELECT * FROM MYSQL.EVENT
```

## 视图 (View)

> 在定义时，通过`SELECT`语句即时创建虚拟表，该表引用源数据，在被调用时实时生成数据集。

与函数和过程等对语句的动态处理不同，视图中的语句在创建的时候会编译成静态语句（即将`*`用真实字段名替代）。
如`SELECT * ...`会替换成类似`SELECT name, age ...`的语句。

创建视图

```sql
CREATE
    [OR REPLACE]
    [ALGORITHM = {UNDEFINED | MERGE | TEMPTABLE}]
    [DEFINER = { user | CURRENT_USER }]
    [SQL SECURITY { DEFINER | INVOKER }]
    VIEW view_name [(column_list)]
    AS select_statement
    [WITH [CASCADED | LOCAL] CHECK OPTION]

-- 如，
CREATE OR REPLACE VIEW myschema.
```

查看

```sql
-- 列表
SHOW VIEWS FROM db_name
SELECT * FROM INFORMATION_SCHEMA.VIEWS
-- 详情
SHOW CREATE VIEW view_name
```

# 索引

# 系统参数和状态

- [Server System Variables](https://dev.mysql.com/doc/refman/5.7/en/server-system-variables.html)
- [Server Status Variables](https://dev.mysql.com/doc/refman/8.0/en/server-status-variables.html)

| Status                          |                                  |
| ------------------------------- | -------------------------------- |
| `Table_locks_immediate`         |                                  |
| `Innodb_row_lock_current_waits` | 当前等待锁的数量                 |
| `Innodb_row_lock_time`          | 系统启动到现在，锁定的总时间长度 |
| `Innodb_row_lock_time_avg`      | 每次平均锁定的时间               |
| `Innodb_row_lock_time_max`      | 最长一次锁定时间                 |
| `Innodb_row_lock_waits`         | 系统启动到现在总共锁定的次数     |

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

# Explain

> 获取语句的执行计划。与`DESCRIBE`完全同义，只是习惯上将`DESCRIBE`用于获取表结构描述。

```sql
{EXPLAIN | DESCRIBE | DESC} tbl_name [col_name | wild]

{EXPLAIN | DESCRIBE | DESC} [explain_type] {explainable_stmt | FOR CONNECTION connection_id}

explain_type: { EXTENDED | PARTITIONS | FORMAT = format_name }

format_name: { TRADITIONAL | JSON }

explainable_stmt: { SELECT ... | DELETE ... | INSERT ... | REPLACE ... | UPDATE ... }
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

# 常用函数

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

|                                           |                                              |
| ----------------------------------------- | -------------------------------------------- |
| `AES_ENCRYPT(str, pass)`                  | AES加密                                      |
| 信息函数                                  |                                              |
| `DATABASE()`,`SCHEMA()`                   | 当前(`USE`)数据库                            |
| `CHARSET(str)`                            | 获取字符串的字符集                           |
| `COLLATION(str)`                          | 获取字符串的整理集                           |
| `CONNECTION_ID()`                         | 当前连接ID                                   |
| `CURRENT_USER()`,`CURRENT_USER`           | 当前会话用户账号名[^1]，如`demo@192.168.*.*` |
| `USER()`,`SESSION_USER()`,`SYSTEM_USER()` | 当前会话用户登录名，如`demo@l92.168.1.2`     |
| `VERSION()`                               | MySQL服务器版本                              |
| `FOUND_ROWS()`                            | 上一次查询结果数量                           |
| `ROW_COUNT()`                             | 上一个语句执行所影响的(*affected*)行数量     |
| `LAST_INSERT_ID()`                        | 上一次插入新行时自增字段的开始值             |
| 测试函数                                  |                                              |
| `BENCHMARK(count, expr)`                  | 对语句进行性能测试                           |

[^1]: MySQL用户名由**用户名称**和**主机名称**一起组成，而MySQL在配置账号时主机名称允许使用通配符，如`192.168.*.*`，故**账号名**和**登录名**可能有所不同：`demo@192.168.*.*`与`demo@192.168.1.1`。此外，当登录用户没有权限时，其账号名的用户部分为空，如`@192.168.1.1`
