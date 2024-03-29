---
date: 2022-08-15T18:25:56+08:00
title: 技术协议
---

# OSI

> 又称IPS (*Internet Protocol Suite*, 互联网协议套件, 互联网协议簇)

## 应用层

> 为应用程序提供网络服务。

### HTTP

> HTTP 没有规定其必须使用或支持的层，只要求**下层协议提供可靠传输**。

#### 持久链接（Keep-Alive）

> 通过`connection: keep-alive`开启保持Socket连接。1.1默认为`connection: keep-alive`。

#### 管道化（Pipelining）

> 始于1.1，把多个HTTP请求放在一个TCP连接（`connection: keep-alive`）中发送。但请求仍需按请求顺序进行响应，故而会导致队头阻塞（*HOL blocking*）。

#### HTTP2

### HTTPS

### RTSP

> 实时流协议（*Real Time Streaming Protocol*），属于TCP/IP协议簇。

### DNS

> 域名系统（*Domain Name System*）

### RPC

### RTCP

### SMTP

> 简单邮件传输协议（*Simple Mail Transfer Protocol*），属于TCP/IP协议簇。

### FTP

### SMTP

### TELNET

> 网络电传（*Teletype over the Network*），属于TCP/IP协议簇。

### POP

### NTP (UDP)

### DHCP (UDP)

> 动态主机配置协议（*Dynamic Host Configuration Protocol*）

## 表示层

> 提供数据加密、压缩和格式转换等服务。代表格式有ASCII, JPEG. PNG, MP3, WAV, AVI等。

## 会话层

> 定义了如何开始、控制和结束一个会话。

### SSH

### RPC

### SQL

### RTCP

## 传输层

代表：网关。

数据单元（PDU）：段（fragment）

### TCP

### UDP

### RTP

## 网络层

硬件代表：路由器。

数据单元（PDU）：包（packet）

### IP

### ARP

> 地址解析协议（*Address Resolution Protocol*）

### RARP

### NAT

> 网络地址转换（*Network Address Translation*）

### ICMP

### RIP

### IGMP

### OSPF

### BGP

### IPX

## 数据链路层

硬件代表：交换机、网桥。

数据单元（PDU）：帧（frame）

### PPP

> 点对点协议（*Point-to-Point Protocol*），在两个节点之间创建直接连接，并提供连接认证、传输加密以及压缩等功能。

#### PPPoE

> *PPP over Ethernet*

### Ethernet

> 以太网，标准为IEEE 802.3，是一种最常用的局域网组网技术，类似的还有令牌环（*Token-Ring*）和光线分布式数据接口（*FDDI*）。 以太网以双绞线作为传输媒介。

### WIFI

> 标准为IEEE 802.11

### Token-Ring

> 令牌环，采用同轴电缆作为传输媒介，抗干扰能力好，但网络结构不易改变。

### FDDI

> 光线分布式接口（*Fiber Dietributed Data Interface*），采用光纤传输，带宽大，适用于连接多个局域网的骨干网。

## 物理层

硬件代表：调制解调器、中继器、集线器、网线、网卡。

数据单元（PDU）：比特（bit）

### Modem

> 调制解调器（*modulator-demodulator*)，将数字信号调制成模拟信号进行传输，或将接收到的模拟信号解调为数字信号。
