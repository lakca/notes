#!/usr/bin/env node
// @ts-nocheck
const { help, ROOT, parseMeta } = require('./help')

help(`parameters:

\tgithub\t-\tfit github page structure (no extension name etc.).
\tcommit\t-\tcommit generated index file.
\tforce \t-\tignore check, rewrite index file.
`)

const fs = require('fs')
const path = require('path')
const { execSync, spawnSync } = require('child_process')
const INDEX_FILE = 'README.md' // folder index file name.
const IS_GITHUB = process.argv.includes('github') // github page, no extension name,
const IS_COMMIT = process.argv.includes('commit') // commit index.
const IS_FORCE = process.argv.includes('force') // force generation.

const UNTRACKED = git('git ls-files --others --exclude-standard')
const TRACKED = git('git ls-tree -r master --full-name --name-only')
const COMMITTED = Object.fromEntries(git(`git show HEAD --name-status --pretty=''`).map((e, r) => (r = e.split(/\t+/), [r[r.length - 1], r[0]])))
const data = {
  files: [],
}

const files = TRACKED.filter(file => file !== '404.html' && !file.startsWith('assets/') && /^[^_\.].+\.(md|html)$/.test(file))

function getFileInfo(relpath) {
  const segments = relpath.split(path.sep)
  const level = segments.length
  const ext = path.extname(relpath)
  const name = path.basename(relpath).replace(/\.[^\.]+$/, '')
  const filename = path.basename(relpath)
  const realpath = path.join(ROOT, relpath)
  const stat = fs.statSync(realpath)
  const info = stat.isFile() && parseMeta(fs.readFileSync(realpath).toString().trim()) || null
  const fronter = info?.meta
  const h1 = info?.h1
  const title = titlize(info?.meta.title || info?.h1 || name)
  return { name, level, ext, filename, realpath, relpath, fronter, title, h1,
    created_at: stat.birthtime,
    updated_at: stat.mtime,
    segments,
 }
}

const indexes = []
let segments = []
for (const file of files) {
  const fileInfo = getFileInfo(file)
  if (fileInfo.name === 'README') continue
  data.files.push(pick(fileInfo, ['name', 'filename', 'relpath', 'segments', 'title', 'h1', 'fronter', 'created_at', 'updated_at']))
  const _segments = ['.', ...fileInfo.segments.slice(0, -1)]
  _segments.reduce((base, segment, i) => {
    base = path.join(base, segment)
    if (segments[i] == null) segments[i] = {}
    if (segments[i].segment !== segment) {
      // clear right segments if dfs backtracking
      while (segments[i].length > i) {
        const folder = segments[i].pop()
        folder.fd && fs.closeSync(fd)
      }
      segments[i].segment = segment
      // open index fd of current folder
      segments[i].fd = fs.openSync(path.join(ROOT, base, INDEX_FILE), 'w')
      // insert folder link in ancestors
      segments.reduce((b, s, i) => {
        b = path.join(b, s.segment)
        if (base !== b) {
          const text = renderFolder(base, b)
          fs.writeSync(s.fd, text)
        }
        return b
      }, '')
    }
    return base
  }, '')
  segments.length = fileInfo.segments.length
  // insert file link in ancestors
  segments.reduce((b, f) => {
    b = path.join(b, f.segment)
    const text = render(fileInfo, b)
    fs.writeSync(f.fd, text)
    return b
  }, '')
}
segments.forEach(e => fs.closeSync(e.fd))
fs.writeFileSync(path.join(ROOT, 'assets/script/data.js'), `window.site_data = ${JSON.stringify(data)}`)

function render(fileInfo, relative = '') {
  let relpath = fileInfo.relpath.replace(/\.[^\.]+$/, '')
  relpath = path.relative(relative, relpath)
  return [
    '  '.repeat(fileInfo.level - 1),
    `- [${fileInfo.title}](${encodeURI(relpath)})`,
    `<span style="font-size:.8em;float:right">`,
    `<span style="color:${COMMITTED[fileInfo.relpath] === 'A' ? 'green' : 'orange'}">${COMMITTED[fileInfo.relpath] || ''}</span>`,
    `<span style="padding-left:2em;color:gray;">${date(fileInfo.updated_at)}</span>`,
    `<span style="padding-left:2em;color:lightgray;">${date(fileInfo.created_at)}</span>`,
    `</span>`,
    '\n',
  ].join('')
}

function renderFolder(relpath, relative = '') {
  const name = path.basename(relpath)
  relpath = path.relative(relative, relpath) || '.'
  return [
    '  '.repeat(relpath.split(path.sep).length - 1),
    `- [${name}](${encodeURI(relpath)})`,
    '\n',
  ].join('')
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

function red() {
  return `\x1b[31m${arguments[arguments.length - 1]}\x1b[0m`
}
function green() {
  return `\x1b[32m${arguments[arguments.length - 1]}\x1b[0m`
}
// `
// # Index

// ${homeToc.join('')}

// # Contribute

// ## Hook

// Adding a \`post-commit\` hook to generate and commit newest notes index automatically.

// The hook will detect files change by comparing \`HEAD^\` with \`HEAD\`, only files more than \`README.md\` will take effect.

// \`\`\`bash
// ./prepare
// \`\`\`

// ## Commit

// No need to generate or commit \`README.md\` manually.

// `

if (IS_COMMIT) {
  spawnSync('git', ['add', '-f', `${ROOT}/${INDEX_FILE}`])
  spawnSync('git', ['add', '-f', `[^_]*/**/${INDEX_FILE}`])
  spawnSync('git', ['commit', '-m', 'update index'])
}
