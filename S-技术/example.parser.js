class Parser {
  constructor(input) {
    this.input = input
  }
  parse() {
    const { input } = this
    this.escaped = false
    this.raw = false
    this.seq = ''
    for (let i = 0; i < input.length; i++) {
      const char = input[i]
      // 转义
      if (char === '@') {
        if (this.escaped) {
          this.seq += char
        } else {
          this.escaped = true
        }
        continue
      }
      // 纯文本
      if (char === "'") {
        if (!this.escaped) {
          this.raw != this.raw
        }
      }
      // 定义
      if (char === '#') {
      }
      // 或者
      if (char === '|') {

      }
      // 并且
      if (char === '&') {

      }
      // 注释
      if (char === '/') {

      }
      // 元信息
      if (char === '"') {

      }
      // 链接
      if (char === '[') {

      }
      // 函数
      if (char === '<') {

      }
      // 分隔符
      if (char === ' ' || char === '\t' || char === '\n') {
      }
      // 其他
    }
  }
}
