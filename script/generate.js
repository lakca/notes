#!/usr/bin/env node

const { help, ROOT, SRC, SRC_ROOT, parseMeta } = require('./help')

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

const files = TRACKED.filter(file => file.startsWith(SRC) && (file.endsWith('.md') || file.endsWith('.html')))

function getFileInfo(relpath) {
  const segments = relpath.split(path.sep)
  segments.shift()
  const level = segments.length - 1
  const ext = path.extname(relpath)
  const name = path.basename(relpath).replace(/\.[^\.]+$/, '')
  const filename = path.basename(relpath)
  const realpath = path.join(ROOT, relpath)
  const stat = fs.statSync(realpath)
  const info = stat.isFile() && parseMeta(fs.readFileSync(realpath).toString().trim()) || null
  const fronter = info?.meta
  const h1 = info?.h1
  const title = titlize(info?.meta.title || info?.h1 || name)
  const folder = path.dirname(path.relative(SRC_ROOT, relpath))
  return { folder, name, level, ext, filename, realpath, relpath, fronter, title, h1, stat, }
}

const indexes = []
let folder = null
for (const file of files) {
  const fileInfo = getFileInfo(file)
  if (fileInfo.folder !== '.' && (!folder || folder !== fileInfo.folder)) {
    indexes.push([
      '  '.repeat(fileInfo.level - 1),
      `- [${path.basename(fileInfo.folder)}](${encodeURI(path.dirname(fileInfo.relpath))})`,
      '\n',
    ].join(''))
    folder = fileInfo.folder
  }
  indexes.push([
    '  '.repeat(fileInfo.level),
    `- [${fileInfo.title}](${encodeURI(fileInfo.relpath)})`,
    `<span style="font-size:.8em;float:right">`,
    `<span style="color:${COMMITTED[fileInfo.relName] === 'A' ? 'green' : 'orange'}">${COMMITTED[fileInfo.relName] || ''}</span>`,
    `<span style="padding-left:2em;color:gray;">${date(fileInfo.stat.mtime)}</span>`,
    `<span style="padding-left:2em;color:lightgray;">${date(fileInfo.stat.birthtime)}</span>`,
    `</span>`,
    '\n',
  ].join(''))
}
fs.writeFileSync(path.join(ROOT, INDEX_FILE), indexes.join(''))

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
  spawnSync('git', ['add', '-f', `${SRC_ROOT}/**/${INDEX_FILE}`])
  spawnSync('git', ['commit', '-m', 'update index'])
}
