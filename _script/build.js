#!/usr/bin/env node

// @ts-nocheck

const { ROOT, parseMeta, git, titlize, pick, date } = require('./help')

if (process.argv.includes('-h')) {
  console.log(`
    node ${__filename} <cmd>

    \x1b[32mgithub\x1b[0m \x1b[2mfit github page structure (no extension name etc.).\x1b[0m
    \x1b[32mcommit\x1b[0m \x1b[2mcommit generated index file.\x1b[0m
    \x1b[32mforce\x1b[0m  \x1b[2mignore check, rewrite index file.\x1b[0m
  `)
  process.exit(0)
}

const fs = require('fs')
const path = require('path')
const { spawnSync } = require('child_process')
const INDEX_FILE = 'README.md' // folder index file name.
const UNTRACKED = git('git ls-files --others --exclude-standard')
const TRACKED = git('git ls-tree -r master --full-name --name-only')
const COMMITTED = Object.fromEntries(git(`git show HEAD --name-status --pretty=''`).map((e, r) => (r = e.split(/\t+/), [r[r.length - 1], r[0]])))
const files = TRACKED.filter(file => /^(?!(404|README)).*\.(html|md)$/i.test(file))
const data = { files: [] }

function getFileInfo(relpath) {
  const segments = relpath.split(path.sep)
  const level = segments.length
  const ext = path.extname(relpath)
  const name = path.basename(relpath).replace(/\.[^.]+$/, '')
  const filename = path.basename(relpath)
  const realpath = path.join(ROOT, relpath)
  const stat = fs.statSync(realpath)
  const info = stat.isFile() ? parseMeta(fs.readFileSync(realpath).toString().trim()) : null
  const fronter = info?.meta
  const h1 = info?.h1
  const title = titlize(info?.meta.title || info?.h1 || name)
  return {
    name,
    level,
    ext,
    filename,
    realpath,
    relpath,
    fronter,
    title,
    h1,
    created_at: stat.birthtime,
    updated_at: stat.mtime,
    segments
  }
}

function render(fileInfo, relative = '') {
  let relpath = fileInfo.relpath.replace(/\.[^.]+$/, '')
  relpath = path.relative(relative, relpath)
  return [
    '  '.repeat(fileInfo.level - 1),
    `- [${fileInfo.title}](${encodeURI(relpath)})`,
    `<span style="font-size:.8em;float:right">`,
    `<span style="color:${COMMITTED[fileInfo.relpath] === 'A' ? 'green' : 'orange'}">${COMMITTED[fileInfo.relpath] || ''}</span>`,
    `<span style="padding-left:2em;color:gray;">${date(fileInfo.updated_at)}</span>`,
    `<span style="padding-left:2em;color:lightgray;">${date(fileInfo.created_at)}</span>`,
    `</span>`,
    '\n'
  ].join('')
}

function renderFolder(relpath, relative = '') {
  const name = path.basename(relpath)
  relpath = path.relative(relative, relpath) || '.'
  return [
    '  '.repeat(relpath.split(path.sep).length - 1),
    `- [${name}](${encodeURI(relpath)})`,
    '\n'
  ].join('')
}

const SEGMENTS = []
for (const file of files) {
  const fileInfo = getFileInfo(file)
  if (fileInfo.name === 'README') continue
  data.files.push(pick(fileInfo, ['name', 'filename', 'relpath', 'segments', 'title', 'h1', 'fronter', 'created_at', 'updated_at']))
  const segments = ['.', ...fileInfo.segments.slice(0, -1)]
  segments.reduce((base, segment, i) => {
    base = path.join(base, segment)
    if (SEGMENTS[i] == null) SEGMENTS[i] = {}
    if (SEGMENTS[i].segment !== segment) {
      // clear right segments if dfs backtracking
      while (SEGMENTS[i].length > i) {
        const folder = SEGMENTS[i].pop()
        folder.fd && fs.closeSync(folder.fd)
      }
      SEGMENTS[i].segment = segment
      // open index fd of current folder
      SEGMENTS[i].fd = fs.openSync(path.join(ROOT, base, INDEX_FILE), 'w')
      // insert folder link in ancestors
      SEGMENTS.reduce((b, s, i) => {
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
  SEGMENTS.length = fileInfo.segments.length
  // insert file link in ancestors
  SEGMENTS.reduce((b, f) => {
    b = path.join(b, f.segment)
    const text = render(fileInfo, b)
    fs.writeSync(f.fd, text)
    return b
  }, '')
}
SEGMENTS.forEach(e => fs.closeSync(e.fd))
fs.writeFileSync(path.join(ROOT, 'assets/script/data.js'), `window.site_data = ${JSON.stringify(data)}`)

if (process.argv.includes('commit')) {
  spawnSync('git', ['add', '-f', `${ROOT}/${INDEX_FILE}`])
  spawnSync('git', ['add', '-f', `[^_]*/**/${INDEX_FILE}`])
  spawnSync('git', ['reset', `node_modules/**/${INDEX_FILE}`])
  spawnSync('git', ['commit', '-m', 'update index'])
}
