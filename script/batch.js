
const fs = require('fs')
const path = require('path')
const moment = require('moment')
const startCase = require('lodash.startcase')
const { execSync } = require('child_process')
const SRC_ROOT = path.join(__dirname, '../src')

function gitList(cmd) {
  return execSync(cmd).toString().trim().split(/\r\n|\n|\r/)
}

function gitHead() {
  const items = gitList(`git show HEAD --name-status --pretty=''`)
  return Object.fromEntries(items.map(item => item.split('\t').reverse()))
}

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
  return { meta, content }
}

function extractFile(file) {
  const text = fs.readFileSync(file).toString().trim()
  return parseMeta(text)
}

function fileStat(file) {
  const stat = fs.statSync(file)
  return {
    birthtime: stat.birthtime,
    mtime: stat.mtime
  }
}

function* traverse(dir) {
  for (const dirent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (dirent.isDirectory()) {
      yield* traverse(path.join(dir, dirent.name))
    } else if (dirent.isFile()) {
      yield path.join(dir, dirent.name)
    }
  }
}

function getBirthtime(file) {
  const items = gitList(`git log --follow --format=%aI ${file} | tail -1`)
  return items[0]
}

const gitStatus = gitHead()

for (const file of traverse(SRC_ROOT)) {
  if (path.extname(file) === '.md') {
    const { meta, content } = extractFile(file)
    const stat = fileStat(file)
    if (!meta.date) meta.date = getBirthtime(file)
    meta.title = path.basename(file, '.md')
    const relPath = path.relative(SRC_ROOT, file)
    if (gitStatus[relPath]) {
      meta.gitStatus = gitStatus[relPath]
      meta.updatedAt = new Date(stat.mtime).toISOString()
    }
    fs.writeFileSync(file, [stringifyMeta(meta), content.trim(), ''].join('\n'))
  }
}
