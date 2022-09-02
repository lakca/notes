---
title: SSH
date: 2020-11-02T09:03:36.632Z
---

# 检查SSH连接

```bash
# returns 0 / success
ssh $server "true"
```

# 密钥

```bash
ssh-keygen
  # 密钥长度
  [-b bits]

  # 密钥备注
  [-C comment]

  # 密钥文件名
  [-f output_keyfile]

  # 密钥指纹的算法：md5, sha256
  [-E fingerprint_hash]

  # 密钥格式：RFC4716, PKCS8, PEM
  [-m key_format]

  # 密钥类型: dsa | ecdsa | ed25519 | rsa
  [-t key_type]
```

# 上传公钥

```bash
ssh-copy-id [-i [identify_file]] [-p port] [user@]hostname
```

# 证书

```bash
ssh-keygen
  # 用于签名的CA公钥（user_ca或host_ca）
  [-s ca_key]

  # 与`-s`结合使用，表明密钥存在ssh-agent
  [-U]

  # 证书序列号，类似ID
  [-z serial_number]

  # 证书备注
  [-I certificate_identity]

  # 证书的有效周期
  [-V validity_interval]
  # 如`+52d1d`（往后52周1天）、`-1d:20110101`（昨天到20110101）、`20110101123000:forever`（20110101123000起永远有效）

  # 证书的验证信息（用户名或主机名），多个信息用逗号隔开
  [-n principals]
  # 如`host.domain,alternate.host.domain`，表明该证书仅对这两个域名有效
  # 如`user1,user2`，表明该证书仅对这两个用户有效

  # 创建服务器证书（而不是用户证书）
  [-h]

  # 要签名的公钥
  [pub_key]
```

```bash
ssh-keygen

  [-L] # 查看证书信息

  [-f filename] # 制定密钥或证书文件
```

> 证书认证无需上传公钥给服务器保存，且可以设置有效周期。

CA认证的流程大致是（[SSH证书登录教程](https://www.ruanyifeng.com/blog/2020/07/ssh-certificate.html)）：

1. CA生成两对密钥：服务器密钥host_ca和用户密钥user_ca
2. 服务器生成自己的密钥host_key，并将公钥上传给CA，由CA使用host_ca签名host_key，生成服务器证书host_cert
3. 类似服务器，用户也生成自己的密钥，并由CA生成自己的证书user_cert

## 服务器配置

配置服务器证书（配置完后重启ssh服务器）：

```properties
# /etc/ssh/sshd_config

# 服务器证书
HostCertificate /etc/ssh/host-cert.pub
```

配置服务器所有账户都信任CA签发的证书：

```properties
# CA签发用户证书的公钥
TrustedUserCAKeys /etc/ssh/user_ca.pub
```

配置某个服务器账户信任CA：

```properties
# ~/.ssh/authorized_keys

# `principals`为用户登陆的服务器账户名, `user_ca`为CA用于签发用户证书的公钥
# 详细可以看sshd(8)中的*AUTHORIZED_KEYS FILE FORMAT*
@cert-authority principals=<principals> ssh-rsa <user_ca>
```

## 客户端配置

类似服务器，将CA签发服务器证书的公钥保存在 `/etc/ssh/ssh_known_hosts`（全局） 或 `~/.ssh/known_hosts`（用户）

```properties
# `principals`为服务器名称，可以用通配符
@cert-authority <principals> ssh-rsa <host_ca>
```

# ssh-agent

```bash
```

# 代理转发

[SSH 基本用法](https://zhuanlan.zhihu.com/p/21999778)

```bash
ssh
  # 正向转发（将本机（端口或socket）转发到远程主机）
  [-L [bind_address:]port:host:hostport]
  [-L [bind_address:]port:remote_socket]
  [-L local_socket:host:hostport]
  [-L local_socket:remote_socket]

  # 反向转发（将远程主机（端口或socket）转发到本机）
  [-R [bind_address:]port:host:hostport]
  [-R [bind_address:]port:local_socket]
  [-R remote_socket:host:hostport]
  [-R remote_socket:local_socket]
  [-R [bind_address:]port]

  # 动态端口转发（在指定端口创建SOCKS（会话层协议）代理服务转发所有应用层访问到远程主机），支持socks4和socks5协议
  [-D [bind_address:]port]

  # 压缩传输
  [-C]

  # 不执行远程命令，仅用于建立代理转发
  [-N]
```

```bash
# h3上的8022端口访问将转发到h2的22端口
u2@h2:~$ ssh -N -R localhost:8022:localhost:22 u3@h3
# 在本机访问8022端口将转发到h3的8022端口
$ ssh -N -L localhost:8022:localhost:8022 u3@h3
```
