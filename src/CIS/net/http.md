---
title: Http
date: 2021-06-22T06:33:51.205Z
---

# HTTP/1.1

特点：

- 文本协议
- 支持 Keep Alive
- 支持 Chunked Responses
- 支持 Cache Control
- 依赖压缩减少带宽占用

问题：

- 串行复用
- 压缩占用计算资源

# HTTP/2

特点：

- 二进制协议
- 服务器推送
- 多路复用、并发请求
- 标头缓存、压缩 (HPACK)

问题：

- 丢包重传：阻塞通道内所有请求 (Head-of-Line blocking)

# HTTP/3

特点：

- UDP

# Distinguish

## 同域（`same-origin`）

> `scheme` (`protocol`) + `domain` + `port`

## 同站（`same-site`）

> 直白地理解就是可注册的域名，如 `foo.com`, `bar.com.cn`。

# 常用消息头（Headers）

- 👆: Send in Request
- 👇: Send in Response

## [缓存（HTTP Caching）](http-caching)

- *cache*: 缓存，是一个服务（如代理服务器的缓存、浏览器的缓存等）
- *store*: 存储，是一个行为
- *private cache*: 私有缓存，即终端缓存，一般是浏览器缓存
- *public cache*: 公共缓存，即非终端缓存，如代理服务器等

|图标|标头|常见用法|描述|其他|
|---------|---------|---------|---------|---------|
|👇|`Expires`|
|👆👇|[`Cache-Control`](header-cache-control)||对 响应端👆，或请求端👇 的缓存指令|
|👆👇||`no-cache`|响应可能被缓存存储（*cache may store*），但每次使用前必须（*must validate every time*）先到服务器验证是否有效|
|👆👇||`no-store`|表示响应不会（*cache may not store*）被存储|
|👆👇||`max-age=<seconds>`|指定资源被视为新鲜的最长时间|
|👆👇||`no-transform`|指示缓存不可编辑响应内容（*cache cannot edit response*），比如浏览器转换图像以最小化缓存存储或慢速连接的数据|
|👇||`public`|响应可以由任何缓存存储（*any cache can store*），即使响应通常是不可缓存的|
|👇||`private`|响应只能由浏览器的缓存存储（*only browser's cache can store*），即使响应通常是不可缓存的|
|👆||`min-fresh=<seconds>`|表示客户端希望响应至少在指定的秒数内仍然是新鲜的（*expected fresh period*）|
|👆||`max-stale[=<seconds>]`|表示客户端可接受过时的响应（*stale is acceptable*），并可指定过时的上限|
|👆||`only-if-cached`|表示客户端希望缓存用存储的数据进行响应，或者使用 504 状态代码进行响应（*expect response directly by cache*）|
|👇||`immutable`|表示响应正文（*response body*）不会随时间变化，如果未过期，不应发送验证信息（如~~`If-None-Match`~~, ~~`If-Modified-Since`~~等）|
|👇||`must-revalidate`|表示一旦资源变得陈旧（*if stale*），缓存不得使用其陈旧副本，除非在源服务器上成功验证（*must validate*）|
|👇||`s-maxage=`|覆盖`max-age`或`Expires`标头，但仅适用于共享缓存（例如，代理）。 被私有缓存忽略（*for middle cache*）|
|👇||`proxy-revalidate`|与 `must-revalidate` 类似，但仅适用于共享缓存（例如，代理）。 被私有缓存忽略（*for middle cache*）|
|👇|[`Age`](header-age)||表示资源在代理服务器中已缓存的时长（秒）|
|👆|[`If-Match`]()|
|👆|[`If-None-Match`]()|
|👆|[`If-Modified-Since`]()|
|👆|[`If-Unmodified-Since`]()|
|👇|[`Last-Modified`]()|

## 连接（Connection）

|图标|标头|常见用法|描述|其他|
|---------|---------|---------|---------|---------|
|👇|[`Connection`](header-connection)|`keep-alive`, `close`|表示当前请求完成后是否保持连接|
|||`close`|
|||`keep-alive`|

## 跨域（Cross-Origin Resource Sharing）

|图标|标头|常见用法|描述|其他|
|---------|---------|---------|---------|---------|
|👇|`Access-Control-Allow-Credentials`||Credentials 包括 *cookies* 标头, *authorization* 标头 和 *TLS client certificates*|
|||`true`|
|👇|`Access-Control-Allow-Origin`|`Access-Control-Allow-Origin: *`<br/>`Vary: Origin`|
|||`<origin>, ...`|
|||`*`|
|👇|`Vary`||服务于内容协商算法（缓存应用策略），表明响应内容随指定的头变化而变化|
|||`<header-name>, ...`|
|||`*`|
|👇|`Access-Control-Allow-methods`|
|||`<method>, ...`|
|||`*`|
|👇|`Access-Control-Allow-Headers`|||[跨域安全标头](cors-safe-headers)|
|||`<header-name>, ...`|
|||`*`|
|👇|`Access-Control-Expose-Headers`||指定代码（JavaScript）可访问的响应标头|
|||`<header-name>, ...`|
|||`*`|
|👇|`Access-Control-Max-Age`||指定预检请求（*preflight cache age*）的结果可以缓存的时间|
|||`<delta-seconds>`|
|👆|`Origin`|||
|👆|`Access-Control-Request-Methods`||用于预检请求（*preflight*），表明实际请求会使用的方法|
|👆|`Access-Control-Request-Headers`||用于预检请求（*preflight*），表明实际请求会使用的标头|

## 安全（Security）

|图标|标头|常见用法|描述|其他|
|---------|---------|---------|---------|---------|
|👇|`Content-Security-Policy`||

## 服务器声明（Server Statement）

|图标|标头|常见用法|描述|其他|
|---------|---------|---------|---------|---------|
|👇|`Allow`|`Allow: GET, POST, HEAD`|列出资源支持的方法集（*supported methods for the resource*），在返回`405`状态码时必须提供|
|👇|`Location`||指示页面重定向的地址，一般用在 `3xx`, `201` 等响应状态|

## 内容属性（Body）

|图标|标头|常见用法|描述|其他|
|---------|---------|---------|---------|---------|
|👇|`Content-Encoding`|`Content-Encoding: deflate, gzip`|
|||`gzip`|
|||`compress`|
|||`deflate`|
|||`br`|
|👇|`Content-Language`|
|👆👇|`Content-Length`|*decimal* (*int16*)|
|👇|`Content-Location`|*url*|指示返回数据的地址，原则上这个地址不应该再次跳转。注意 `Location` 是指示响应地址（*response location*），而 `Content-Location` 是数据地址（*data location*），同一个数据可以被不同请求响应。|
|👇|`Content-Type`|`Content-Type: text/html; charset=UTF-8`|
|||*MIME*|
|||`charset`|
|||`boundary`|
|👇|`Content-Range`|`Content-Range: bytes 200-1000/67589`|
|||`<unit> <range-start>-<range-end>/<size>`|
|||`<unit> <range-start>-<range-end>/*`|
|||`<unit> */<size>`|
|👆|`If-Range`|

# 常用响应代码（Status Codes）


# Cookies

- `Max-Age`
- `Expires`
- `Secure`
- `HttpOnly`
- `Path`：指定 cookie 存在的 URL 目录。
- `Domain`：如果未指定，则默认为设置 cookie 的同一主机，不包括子域。如果指定了域，则始终包含子域。
- `SameSite`：
  - `Strict`：发送请求的位置必须是同一站点。（如从另外站点链接跳转到该站的时候就不会带该 cookie）
  - `Lax`（默认）：与 `Strict` 的唯一区别是在从另外站点链接跳转（`<a href>`, `<form method='GET'>`, `<link rel="prerender">`）到该站点的时候会发送。
  - `None`：可以在跨站请求时发送该 cookie，但必须设置 `Secure` 属性。

[http-caching]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching
[header-cache-control]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control
[header-connection]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Connection
[header-content-type]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type
[cors-safe-headers]: https://developer.mozilla.org/en-US/docs/Glossary/CORS-safelisted_response_header
[header-age]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Age
[header-allow]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Allow
[cookies]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
