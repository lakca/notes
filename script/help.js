const path = require('path')
const { execSync } = require('child_process')

function stringifyMeta(meta) {
  return `---
${Object.entries(meta).map(e => e[0] + ': ' + e[1]).join('\n')}
---
`
}

function parseMeta(text) {
  const r = text.match(/^---(?:\r\n|\n|\r)([\S\s]+?)(?:\r\n|\n|\r)---(?:\r\n|\n|\r|$)/m)
  const meta = {}
  let content = text
  if (r) {
    content = text.replace(r[0], '')
    const reg = /^([^:]+):([\S\s]*?)(?:\r\n|\n|\r|$)/gm
    let line = null
    while (line = reg.exec(r[1])) {
      meta[line[1].trim()] = line[2].trim()
    }
  }
  const h1 = text.match(/^ *# +([^\n]+)/)?.[1]?.trim()
  return { meta, h1 }
}

function help(print) {
  if (process.argv.some(e => e === '-h' || e === '--help' || e === 'help')) {
    typeof print === 'function' ? print() : console.log(print +
    '\thelp, --help, -h\t-\tdisplay help.')
    process.exit(0)
  }
}

let root

module.exports = {
  stringifyMeta,
  parseMeta,
  help,
  get ROOT() {
    if (!root) {
      root = execSync('git rev-parse --show-toplevel').toString().trim()
    }
    return root
  },
  get SRC() {
    return '_posts'
  },
  get HTML() {
    return 'html'
  },
  get SRC_ROOT() { return path.join(this.ROOT, this.SRC) },
  get HTML_ROOT() { return path.join(this.ROOT, this.HTML) }
}
