const { execSync } = require('child_process')
const ROOT = execSync('git rev-parse --show-toplevel').toString().trim()

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

/** @return {string[]} */
function git(cmd) {
  return execSync(cmd).toString().trim().split(/\n\r?/)
}

function capitalize(str) {
  return str.replace(/^[a-z]/, e => e.toUpperCase())
}

function titlize(str) {
  return str.split(/\s+|-/).map(capitalize).join(' ')
}

function pad(n) {
  return n > 9 ? n : '0' + n
}

function date(d = new Date()) {
  d = new Date(d)
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

function pick(obj, keys) {
  return Object.fromEntries(keys.map(k => [k, obj[k]]))
}

module.exports = { ROOT, stringifyMeta, parseMeta, git, capitalize, titlize, pad, date, pick }
