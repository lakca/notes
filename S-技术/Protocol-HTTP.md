---
title: 网络协议-HTTP
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

- HTTP/2 帧机制是在 HTTP/1.x 语法和底层传输协议之间增加了一个新的中间层
- 二进制协议
- 服务器推送
- 多路复用、并发请求
- 标头缓存、压缩 (HPACK)

问题：

- 丢包重传：阻塞通道内所有请求 (Head-of-Line blocking)

# HTTP/3

特点：

- UDP

# 同域（Same Origin）

> `scheme` (`protocol`) + `domain` + `port`

# 同站（Same Site）

> 直白地理解就是可注册的域名，如 `foo.com`, `bar.com.cn`。

# 常用消息头（Headers）

[HTTP 标头](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers)

- 👆: 在请求端发送
- 👇: 在响应端发送
- 🙌：在请求端和响应端发送
- 😈：用法或示例
- ✅：参数选项

## 实体属性（Body）

### 👇 `Content-Encoding`

- 😈 `Content-Encoding: deflate, gzip`
- ✅ `gzip`
- ✅ `compress`
- ✅ `deflate`
- ✅ `br`

### 👇 `Content-Language`

### 🙌 `Content-Length`

- ✅ *decimal* (*int16*)

### 👇 `Content-Location`

> 指示返回数据的地址，原则上这个地址不应该再次跳转。注意 `Location` 是指示响应地址（*response location*），而 `Content-Location` 是数据地址（*data location*），同一个数据可以被不同请求响应。

- ✅ *url*

### 👇 `Content-Type`

- 😈 `Content-Type: text/html; charset=UTF-8`
- ✅ `<MIME>`
- ✅ `charset=<charset>`
- ✅ `boundary=<boundary>`

### 👇 `Content-Location`

> 告知返回实体（*Body*）的直接地址。注意与`Location`区分

### 👇 `Location`

> 告知请求响应（*Response*）的（最新）地址，客户端需要重新请求该地址，即重定向。

## 实体协商（Negotiation）

### 👆 `Accept`

> 表明客户端接受的（响应的）MIME类型

- 😈 `Accept: text/html, application/xhtml+xml, application/xml;q=0.9, */*;q=0.8`
- ✅ `<MIME_type>/<MIME_subtype>`
- ✅ `<MIME_type>/*`
- ✅ `*/*`
- ✅ `;q=`：表示该选项的权重

### 👆 `Accept-Charset`

> 表明客户端可处理的字符集

- 😈 `Accept-Charset: utf-8, iso-8859-1;q=0.5`
- ✅ `<charset>`
- ✅ `*`
- ✅ `;q=`：表示该选项的权重

### 👆 `Accept-Encoding`

> 表明客户端可处理的压缩算法

- ✅ `gzip`：[*LZ77*](http://en.wikipedia.org/wiki/LZ77_and_LZ78#LZ77)压缩算法，及*32位CRC*校验的编码方式
- ✅ `compress`：[*LZW*](http://en.wikipedia.org/wiki/LZW)压缩算法
- ✅ `deflate`：采用[*zlib*](http://en.wikipedia.org/wiki/Zlib)结构和[*deflate*](http://en.wikipedia.org/wiki/DEFLATE)压缩算法
- ✅ `br`：*Brotli*压缩算法
- ✅ `identity`：未压缩或修改
- ✅ `*`
- ✅ `;q=`：表示该选项的权重

### 👆 `Accept-Language`

> 表明客户端期望的（响应内容的）自然语言

- 😈 `Accept-Language: fr-CH, fr;q=0.9, en;q=0.8, de;q=0.7, *;q=0.5`
- ✅ `<language>`
- ✅ `*`
- ✅ `;q=`：表示该选项的权重

## 传输编码（Encoding）

分块传输示例：

```HTTP
HTTP/1.1 200 OK
Content-Type: text/plain
Transfer-Encoding: chunked
Trailer: Expires

7\r\n
Mozilla\r\n
9\r\n
Developer\r\n
7\r\n
Network\r\n
0\r\n
Expires: Wed, 21 Oct 2015 07:28:00 GMT\r\n
\r\n
```

### 👇 `Transfer-Encoding`

> 告知实体（*Body*）的编码

- ✅ `chunked`：分块传输。对于一次性传输大量（或不确定大小的）数据，其`Content-Length`是无法获知的，故采用分块传输告知客户端。
- ✅ `compress`
- ✅ `deflate`
- ✅ `gzip`
- ✅ `identity`

### 👆 `TE`

> 表明客户端期望的实体（*Body*）编码

- 😈 `TE: trailers, deflate;q=0.5`
- ✅ `chunked`
- ✅ `compress`
- ✅ `deflate`
- ✅ `gzip`
- ✅ `trailers`
- ✅ `;q=`：表示该选项的权重

### 👆 `Trailer`

> 告知分块传输时，*Trailer*部分的标头名称


## 上下文信息（Context）

### 👇 `Allow`

> 告知资源支持的方法（*Method*）集，在返回`405`状态码时必须提供

- 😈 `Allow: GET, POST, HEAD`

### 👇 `Server`

> 告知服务器信息

### 👆 `From`

> 表明用户代理（客户端）身份（邮箱）。如跟随爬虫一起发送，站点管理员在认为请求不合法时可以给爬虫发送邮件。

- ✅ `<email>`

### 👆 `Host`

> 表明服务器地址

- 😈 `Host: <host>:<port>`

### 👆 `Referer`

> 表明当前请求的来源页面

- 👀 如果所在页面为本地文件（*file::*或*data::*），则不会发送该标头
- 👀 协议升级的情况下，即所在页面为*https*，而当前请求为*http*，则不会发送该标头
- ✅ `<url>`

### 👇 `Referrer-Policy`

> 告知客户端`Referer`的发送规则

- 😈 `<meta name="referrer" content="origin">`：通过页面的`<meta>`设置`Referer`的发送规则
- 😈 `<a href="http://example.com" referrerpolicy="origin">`： 通过 `<a>`、`<area>`、`<img>`、`<iframe>`、`<script>` 或者 `<link>`设置`referrerpolicy`的发送规则
- 😈 `<a href="http://example.com" rel="noreferrer">`： 通过 `<a>`、`<area>` 或者 `<link>` 等元素的`rel`属性设置`noreferrer`的发送规则
- ✅ `no-referrer`：从不发送
- ✅ `no-referrer-when-downgrade`：仅相同协议发送。协议降级（(HTTPS->HTTP）的情况下也不会发送
- ✅ `origin`：将所在页面的源作为引用地址。如在`https://example.com/page.html`页面中的请求的`Referer`为`https://example.com/`
- ✅ `origin-when-cross-origin`：对于同源请求发送所在页面地址，非同源请求发送所在页面的源
- ✅ `same-origin`：仅同源请求发送
- ✅ `strict-origin`：仅同源且相同协议的请求发送
- ✅ `strict-origin-when-cross-origin`：对于同源请求发送所在页面地址，非同源请求在相同协议的请求中发送所在页面的源
- ✅ `unsafe-url`：所在页面地址取出参数后作为`Referer`

### 👆 `User-Agent`

- 😈 `User-Agent: <product> / <product-version> <comment>`
- 😈 `User-Agent: Mozilla/<version> (<system-information>) <platform> (<platform-details>) <extensions>`

## 缓存（Caching）

[HTTP 缓存](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching)

- *cache*: 缓存，是一个服务（如代理服务器的缓存、浏览器的缓存等）
- *store*: 存储，是一个行为
- *private cache*: 私有缓存，即终端缓存，一般是浏览器缓存
- *public cache*: 公共缓存，即非终端缓存，如代理服务器等

常见缓存策略：

1. 验证新鲜度（*age*）（`Cache-Control: max-age` / `Expires`）
2. [HTTP 条件请求](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Conditional_requests)（`If-Modified-Since`、`ETag`）

### 👇 `Expires`

> HTTP1.0中控制新鲜度的标头，HTTP1.1中渐由`Cache-Control: max-age`代替，告知资源的过期时间。

- 😈 `Expires: Tue, 28 Feb 2022 22:22:22 GMT`

### 🙌 `Cache-Control`

> 对响应端或请求端的缓存指令。

- 😈 `Cache-Control: no-cache, private`
- ✅ 🙌 `no-cache`：响应可能被缓存存储（*cache may store*），但每次使用前必须（*must validate every time*）先到服务器验证是否有效
- ✅ 🙌 `no-store`：表示响应不会（*cache may not store*）被存储
- ✅ 🙌 `max-age=<seconds>` ：指定资源被视为新鲜的最长时间
- ✅ 🙌 `no-transform`：指示缓存不可编辑响应内容（*cache cannot edit response*），比如浏览器转换图像以最小化缓存存储或慢速连接的数据
- ✅ 👇 `public`：响应可以由任何缓存存储（*any cache can store*），即使响应通常是不可缓存的
- ✅ 👇 `private`：响应只能由浏览器的缓存存储（*only browser's cache can store*），即使响应通常是不可缓存的
- ✅ 👆 `min-fresh=<seconds>` ：表示客户端希望响应至少在指定的秒数内仍然是新鲜的（*expected fresh period*）
- ✅ 👆 `max-stale[=<seconds>]` ：表示客户端可接受过时的响应（*stale is acceptable*），并可指定过时的上限
- ✅ 👆 `only-if-cached`：表示客户端希望缓存用存储的数据进行响应，或者使用 504 状态代码进行响应（*expect response directly by cache*）
- ✅ 👇 `immutable`：表示响应正文（*response body*）不会随时间变化，如果未过期，不应发送验证信息（如~~`If-None-Match`~~, ~~`If-Modified-Since`~~等）
- ✅ 👇 `must-revalidate`：表示一旦资源变得陈旧（*if stale*），缓存不得使用其陈旧副本，除非在源服务器上成功验证（*must validate*）
- ✅ 👇 `s-maxage=` ：覆盖`max-age`或`Expires`标头，但仅适用于共享缓存（例如，代理）。 被私有缓存忽略（*for middle cache*）
- ✅ 👇 `proxy-revalidate`：与 `must-revalidate` 类似，但仅适用于共享缓存（例如，代理）。 被私有缓存忽略（*for middle cache*）

### 👇 `Age`

> 告知资源在代理服务器中已缓存的时长（秒）

### 👆 `Vary`

> 告知在请求的指定头不同时返回资源也会不同

  - 😈 `Vary: <header...>`

## 条件（Conditional）

[HTTP 条件请求](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Conditional_requests)

### 👇 `ETag`

> 告知响应资源的版本标识符

### 👆 `If-None-Match`

> 表明只有在请求资源版本（*etag*）不同时才返回，常与`ETag`同用

  - 😈 `If-None-Match: "bfc13a64729c4290ef5b2c2730249c88ca92d82d"`
  - ✅ `<etag>`
  - ✅ `<etag>, <etag>, ...`
  - ✅ `*`
### 👆 `If-Match`

> 类上

### 👆 `If-Modified-Since`

> 表明只有请求资源在指定时间后有修改才返回，常与`Last-Modified`同用

- ✅ `<day-name>, <day> <month> <year> <hour>:<minute>:<second> GMT`：GMT时间格式

### 👆 `If-Unmodified-Since`

> 类上

### 👇 `Last-Modified`

> 告知响应资源的最近修改时间

## 范围（Range）

### 👆 `If-Range`

> 与`Range`同用，表明所请求文件的版本信息，确保前后下载的文件一致

- ✅ `<etag>`
- ✅ `<day-name>, <day> <month> <year> <hour>:<minute>:<second> GMT`：GMT时间格式

### 👆 `Range`

> 表明请求的数据范围

- 😈 `Range: <unit>=<range-start>-`
- 😈 `Range: <unit>=<range-start>-<range-end>`
- 😈 `Range: <unit>=<range-start>-<range-end>, <range-start>-<range-end>`
- 😈 `Range: <unit>=<range-start>-<range-end>, <range-start>-<range-end>, <range-start>-<range-end>`

### 👇 `Accept-Ranges`

> 告知服务器是否支持范围请求

- ✅ `bytes`：范围请求的单位是 *bytes*。
- ✅ `none`：不支持范围请求

### 👇 `Content-Range`

> 告知返回的数据范围所在的位置

- 😈 `<unit> <range-start>-<range-end>/<size>`
- 😈 `<unit> <range-start>-<range-end>/*`
- 😈 `<unit> */<size>`
- ✅ `<unit>`：数据区间所采用的单位。通常是`byte`
- ✅ `<range-start>`：区间起始（包含）
- ✅ `<range-end>`：区间结束（包含）
- ✅ `<size>`：整个文件的大小

### 👇 `Content-Length`

> 告知响应资源的长度

- ✅ `<bytes>`

## 下载（Download）

### 🙌 `Content-Disposition`

> 告知返回的内容应该怎样展示。如内联还是附件

- 😈 `Content-Disposition: inline`：内联
- 😈 `Content-Disposition: attachment`：附件
- 😈 `Content-Disposition: attachment; filename="filename.jpg"`
- 😈 `Content-Disposition: form-data`：在`multipart/form-data`类型的表单中使用，如`Content-Type: multipart/form-data;boundary="boundary"`
- 😈 `Content-Disposition: form-data; name="fieldName"`
- 😈 `Content-Disposition: form-data; name="fieldName"; filename="filename.jpg"`

## 连接（Connection）

### 👇 `Connection`

> 告知当前事务完成后是否断开连接

- 😈 `Connection: keep-alive`
- ✅ `close`
- ✅ `keep-alive`
- ✅ `upgrade`：与`Upgrade`标头同用，用于升级当前连接的协议

### 👇👆 `Upgrade`

> 客户端或服务端想要升级当前连接的协议，与`Connection: Upgrade`同时发送。

- 😈 `Upgrade: HTTP/2.0, SHTTP/1.3, IRC/6.9, RTA/x11`
- 😈 `Upgrade: websocket`

### 👇 `Keep-Alive`

> 告知长连接的状态信息

- 😈 `Keep-Alive: timeout=5, max=1000`
- ✅ `timeout=<seconds>`：连接超时时长
- ✅ `max=<connections>`：连接最大数

## 跨域（Cross-Origin Resource Sharing）


### 👇 `Access-Control-Allow-Credentials`

> 告知跨域请求是否允许携带身份凭据。Credentials 包括 *cookies* 标头, *authorization* 标头 和 *TLS client certificates*

- ✅ `true`

### 👇 `Access-Control-Allow-Origin`

> 告知允许跨域请求的[域](#同域same-origin)

- 😈 `Access-Control-Allow-Origin: *`
- ✅ `<origin>, ...`
- ✅ `*`

### 👇 `Vary`

> 告知响应内容会随指定的头变化而变化，服务于内容协商算法（缓存应用策略）

- ✅ `<header-name>, ...`
- ✅ `*`

### 👇 `Access-Control-Allow-methods`

> 告知跨域请求允许使用的方法

- ✅ `<method>, ...`
- ✅ `*`

### 👇 `Access-Control-Allow-Headers`

> 告知跨域请求允许设置的标头。

- ✅ `<header-name>, ...`
- ✅ `*`
- 👀 [跨域安全标头][cors-safe-headers]

### 👇 `Access-Control-Expose-Headers`

> 告知客户端代码（JavaScript）可访问的响应标头

- ✅ `<header-name>, ...`
- ✅ `*`

### 👇 `Access-Control-Max-Age`

> 告知预检请求（*preflight*）的结果可以缓存的时长

- ✅ `<delta-seconds>`

### 👆 `Access-Control-Request-Methods`

> 表明实际请求会使用的方法，用于预检请求（*preflight*）

### 👆 `Access-Control-Request-Headers`

> 表明实际请求会使用的标头，用于预检请求（*preflight*）

### 👆 `Origin`

> 表明跨源请求的源站

## 认证（Authenticate）

### 👇 `WWW-Authenticate`

> 告知客户端获取资源访问权限所需进行身份验证的验证方法。

- 😈 `<type> realm=<realm>`
- ✅ `<realm>`：
  - ✅ `Basic`
  - ✅ `Bearer`
  - ✅ `Digest`
  - ✅ `HOBA`
  - ✅ `Mutual`
  - ✅ `Negotiate / NTLM`
  - ✅ `VAPID`
  - ✅ `SCRAM`
  - ✅ `AWS4-HMAC-SHA256`

### 👇 `Proxy-Authenticate`

> 类上，之于代理服务器

- 😈 `<type> realm=<realm>`

### 👆 `Authorization`

> 表明客户端身份信息

- 😈 `<type> <credentials>`

### 👆 `Proxy-Authorization`

> 类上，之于代理服务器

- 😈 `<type> <credentials>`

## 安全（Security）

### 👇 `Content-Security-Policy`

> 告知客户端可以从哪些地址获取资源。可以用于减少*XSS*攻击、资源嗅探等

- 😈 `<type> <value> ...`
- ✅ `default-src 'self' *.az1.com *.az2.com`
- ✅ `script-src *.cdn1.com *.cdn2.com`
- ✅ `style-src *.cdn2.com`
- ✅ `img-src *`
- ✅ `media-src https://onlinebanking.jumbobank.com`
- ✅ `report-uri http://reportcollector.example.com/collector.cgi`：将违例请求报告给指定地址

### 👇 `Content-Security-Policy-Report-Only`

> 类上，但客户端不会实际限制，只向指定地址进行报告，可以用于测试CSP

### 👇 `Strict-Transport-Security`

> 告知客户端强制进行HTTPS访问

- ✅ `max-age=<expire-time>`：收到该头后接下来的<expire-time>时间内均需要HTTPS访问
- ✅ `includeSubDomains`：此规则也适用于子域名

### 👇 `X-Content-Type-Options`

> 告知客户端请求时要严格遵循`Content-Type`的MIME设定

- ✅ `nosniff`：请求*Style*但MIME不是`text/css`将被阻止；请求*JavaScript*但MIME不是[JavaScript MIME 类型](https://html.spec.whatwg.org/multipage/scripting.html#javascript-mime-type)

### 👇 `X-Frame-Options`

> 告知客户端当前页面可否作为*frame*（`<frame>`、`<iframe>`、`<embed>` 或者 `<object>`）嵌入其他页面

- ✅ `DENY`
- ✅ `SAMEORIGIN`

### 👇 `Permissions-Policy`

> 告知是否启用浏览器特性，如摄像头、定位等等。

- 😈 `Permissions-Policy: <directive> <allowlist>`
- ✅ `<directive>`：
  - ✅ `autoplay`
  - ✅ `camera`
  - ✅ `document-domain`
  - ✅ `encrypted-media`
  - ✅ `fullscreen`
  - ✅ `geolocation`
  - ✅ `microphone`
  - ✅ `midi`
  - ✅ `payment`
  - ✅ `vr/xr`
- ✅ `<allowlist>`：
  - ✅ `*`：
  - ✅ `self`：
  - ✅ `src`：
  - ✅ `none`：

## Cookies

### 👇 `Set-Cookie`

- 😈 `Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT;`
- 👀 以 `__Secure-` 为前缀的 cookie，需要同时设置 `secure`
- 👀 以 `__Host-` 为前缀的 cookie，需要同时设置 `secure` 和 `Path=/`
- ✅ `<cookie-name>=<cookie-value>`：指定 cookie 内容
- ✅ `Secure`：限制Cookie仅在https请求中会被发送
- ✅ `Expires=<GMT_time>`：指定过期时间
- ✅ `Max-Age=<seconds>`：指定过期时长
- ✅ `Domain=<domain>`：指定 cookie 可以送达的主机名，只能是当前域或父域。如果未指定，则默认为设置 cookie 的同一主机，不包括子域。如果指定了域，则始终包含子域。
- ✅ `Path=<path>`：指定 cookie 存在的 URL 目录
- ✅ `HttpOnly`：仅在请求头中出现，无法通过脚本获取
- ✅ `SameSite`：指定跨站发送的规则
  - ✅ `Strict`：发送请求的位置必须是同一站点。（如从另外站点链接跳转到该站的时候就不会带该 cookie）
  - ✅ `Lax`（默认）：与 `Strict` 的唯一区别是在从另外站点链接跳转（`<a href>`, `<form method='GET'>`, `<link rel="prerender">`）到该站点的时候会发送。
  - ✅ `None`：可以在跨站请求时发送该 cookie，但必须设置 `Secure` 属性。

### 👆 `Cookie`

- 😈 `Cookie: name=value; name2=value2; name3=value3;`

## 逐跳传递标头（Hop-by-hop）

- `Connection`
- `Keep-Alive`
- `Proxy-Authenticate`
- `Proxy-Authorization`
- `TE`
- `Trailers`
- `Transfer-Encoding`
- `Upgrade`

# 常用响应代码（Status Codes）

| 分类           | 状态码 | 消息                              | 含义                                                                                                                                                                      |
| -------------- | ------ | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 信息响应       | `100`  | `Continue`                        |                                                                                                                                                                           |
|                | `101`  | `Switching Protocols`             |                                                                                                                                                                           |
|                | `102`  | `Processing`                      |                                                                                                                                                                           |
|                | `103`  | `Early Hints`                     |                                                                                                                                                                           |
| 成功响应       | `200`  | `OK`                              |                                                                                                                                                                           |
|                | `201`  | `Created`                         |                                                                                                                                                                           |
|                | `202`  | `Accepted`                        |                                                                                                                                                                           |
|                | `203`  | `Non-Authoritative Information`   |                                                                                                                                                                           |
|                | `204`  | `No Content`                      |                                                                                                                                                                           |
|                | `205`  | `Reset Content`                   |                                                                                                                                                                           |
|                | `206`  | `Partial Content`                 |                                                                                                                                                                           |
|                | `207`  | `Multi-Status`                    |                                                                                                                                                                           |
|                | `208`  | `Already Reported`                |                                                                                                                                                                           |
|                | `226`  | `IM Used`                         |                                                                                                                                                                           |
| 重定向消息     | `300`  | `Multiple Choice`                 | 表示请求结果有多种可能，用户应该选择其中一个。由于没有如何进行选择的标准方法，这个状态码极少使用。                                                                        |
|                | `301`  | `Moved Permanently`               | 永久重定向（`Location`），标准要求请求方法和请求体不应改变，但可能会被浏览器改变。                                                                                        |
|                | `226`  | `Found`                           | 临时重定向（`Location`），标准要求请求方法和请求体不应改变，但可能会被浏览器改变。                                                                                        |
|                | `303`  | `See Other`                       | 通常作为`Post`和`Put`的返回结果，表示重定向链接不是新上传的资源，而是另外一个页面，如显示进度的页面。                                                                     |
|                | `304`  | `Not Modified`                    | 告知客户端可以使用缓存                                                                                                                                                    |
|                | `307`  | `Temporary Redirect`              | 临时重定向（`Location`），请求方法和请求体不会改变。                                                                                                                      |
|                | `308`  | `Permanent Redirect`              | 永久重定向（`Location`），请求方法和请求体不会改变。                                                                                                                      |
| 客户端错误响应 | `400`  | `Bad Request`                     | 客户端请求错误，客户端不应在未作修改的情况下再次发送此请求。                                                                                                              |
|                | `401`  | `Unauthorized`                    | 缺乏目标资源的身份验证凭证。通常与`WWW-Authenticate`同时返回，告知验证方式。                                                                                              |
|                | `402`  | `Payment Required`                |                                                                                                                                                                           |
|                | `403`  | `Forbidden`                       | 服务端有能力处理该请求，但拒绝授权访问。                                                                                                                                  |
|                | `404`  | `Not Found`                       | 无法找到请求资源。如果明确知道请求资源永久丢失了，则用`410`。                                                                                                             |
|                | `405`  | `Method Not Allowed`              | 服务器禁止了使用当前方法进行请求。                                                                                                                                        |
|                | `406`  | `Not Acceptable`                  | 指代服务器端无法提供与 `Accept-Charset` 以及 `Accept-Language` 消息头指定的值相匹配的响应。服务端应该返回一个可用列表。                                                   |
|                | `407`  | `Proxy Authentication Required`   | 缺乏代理服务器身份验证凭证。通常与`Proxy-Authenticate`同时返回。                                                                                                          |
|                | `408`  | `Request Timeout`                 | 服务器将没有在使用的连接主动关闭。通常与`Connection: Close`同时返回。                                                                                                     |
|                | `409`  | `Conflict`                        | 请求与服务器端目标资源的当前状态相冲突。                                                                                                                                  |
|                | `410`  | `Gone`                            | 请求资源永久丢失。                                                                                                                                                        |
|                | `411`  | `Length Required`                 | 表示由于缺少确定的 `Content-Length` 首部字段，服务器拒绝客户端的请求。                                                                                                    |
|                | `412`  | `Precondition Failed`             | 先决条件失败。通常发生于 `If-Unmodified-Since` 或 `If-None-Match` 规定的先决条件不成立的情况下，进行上传或修改。                                                          |
|                | `413`  | `Payload Too Large`               | 请求主体大小超过了服务器处理意愿或能力，服务器可能会关闭连接以防客户端继续该请求。如果“超限”是暂时性的，服务器应该返回 `Retry-After` 首部字段，告知客户端多久后可以重试。 |
|                | `414`  | `URI Too Long`                    | 请求地址长度超限。如将`Post`请求使用`Get`发送、重定向黑洞、客户端攻击等等导致URI过长。                                                                                    |
|                | `415`  | `Unsupported Media Type`          | 表示服务器不支持其有效载荷的格式，从而拒绝接受客户端的请求。可能是 `Content-Type` 或 `Content-Encoding` 制定的格式，或者实际对负载进行检测的结果。                        |
|                | `416`  | `Range Not Satisfiable`           | 服务器无法处理所请求的数据区间，即 `Range`。通常应同时返回 `Content-Range`，表示错误区间和文件大小 `bytes <error_range>/<file_size>`。                                    |
|                | `417`  | `Expectation Failed`              | 服务器无法满足 `Expect` 请求消息头中的期望条件。                                                                                                                          |
|                | `418`  | `I'm a teapot`                    | 大意是你的请求是不合适的。一般是服务端认为客户端是爬虫，从而拒绝请求。                                                                                                    |
|                | `421`  | `Misdirected Request`             |                                                                                                                                                                           |
|                | `422`  | `Unprocessable Entity`            | 服务器理解请求实体的内容类型，并且请求实体的语法是正确的，但是服务器无法处理所包含的指令。                                                                                |
|                | `423`  | `Locked`                          |                                                                                                                                                                           |
|                | `424`  | `Failed Dependency`               |                                                                                                                                                                           |
|                | `425`  | `Too Early`                       | 一般由于还未建立起安全连接（如https），服务器不愿处理可能被重放攻击的请求。                                                                                               |
|                | `426`  | `Upgrade Required`                | 服务器拒绝处理客户端使用当前协议发送的请求，但是可以接受其使用升级后的协议发送的请求。通常会在返回中指定`Upgrade`                                                         |
|                | `428`  | `Precondition Required`           | 表示客户端没有发送先决条件。一般是缺少 `If-Match`。                                                                                                                                                                          |
|                | `429`  | `Too Many Requests`               | 请求超出频次限制。通常同时返回 `Retry-After` 告知客户端多久后再发送请求。                                                                                                                                                                          |
|                | `431`  | `Request Header Fields Too Large` |                                                                                                                                                                           |
|                | `451`  | `Unavailable For Legal Reasons`   |                                                                                                                                                                           |
| 服务端错误响应 | `500`  | `Internal Server Error`           | 服务器错误万能代码，具体原因通过返回信息表达。                                                                                                                                                                          |
|                | `501`  | `Not Implemented`                 |                                                                                                                                                                           |
|                | `502`  | `Bad Gateway`                     |                                                                                                                                                                           |
|                | `503`  | `Service Unavailable`             |                                                                                                                                                                           |
|                | `504`  | `Gateway Timeout`                 |                                                                                                                                                                           |
|                | `505`  | `HTTP Version Not Supported`      |                                                                                                                                                                           |
|                | `506`  | `Variant Also Negotiates`         |                                                                                                                                                                           |
|                | `507`  | `Insufficient Storage`            |                                                                                                                                                                           |
|                | `508`  | `Loop Detected`                   |                                                                                                                                                                           |
|                | `510`  | `Not Extended`                    |                                                                                                                                                                           |
|                | `511`  | `Network Authentication Required` |                                                                                                                                                                           |

[cors-safe-headers]: https://developer.mozilla.org/en-US/docs/Glossary/CORS-safelisted_response_header
[cookies]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
