#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const ROOT = execSync('git rev-parse --show-toplevel').toString().trim()
const UNTRACKED = gitlist('git ls-files --others --exclude-standard')
const GITHUB = process.argv.reduce((p, c) => p && c !== 'normal', true)
const LATEST = lastCommit()
const FILENAME = 'README.md'

// console.log(LATEST, GITHUB)

// ignore if only commit README.
if (Object.keys(LATEST).length === 1 && LATEST[FILENAME]) process.exit(0)

function lastCommit() {
  const status = {}
  gitlist(`git diff HEAD^ HEAD --name-status`)
    .forEach(e => {
      const r = e.split(/\t+/)
      status[r[r.length - 1]] = r[0][0]
    })
  return status
}

/** @return {string[]} */
function gitlist(cmd) {
  return execSync(cmd).toString().trim().split(/\n\r?/)
}

function capitalize(str) {
  return str.replace(/^[a-z]/, e => e.toUpperCase())
}

function titlize(str) {
  return capitalize(str.trim()).replace(/( +[a-z])/g, e => ' ' + e.trim().toUpperCase())
}

function pad(n) {
  return n > 9 ? n : '0' + n
}

function date(d = new Date()) {
  d = new Date(d)
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

function noext(str, flag) {
  return flag && str.lastIndexOf('.') ? str.replace(/\.[^\.]+$/, '') : str
}

function readFolder(folder, cb, level = 0) {
  fs.readdirSync(folder).forEach(file => {
    if (!level && file === FILENAME) return
    const dir = path.join(folder, file)
    const stat = fs.statSync(dir)
    if (stat.isFile() && path.extname(file) === '.md') {
      cb(file.slice(0, -3), level, dir, stat)
    } else if (stat.isDirectory() && file[0] !== '.') {
      cb(file, level, dir, stat)
      readFolder(dir, cb, level + 1)
    }
  })
}

let md = `
# Notes

## Index

`

readFolder(ROOT, (file, level, dir, stat) => {
  if (stat.isDirectory()) dir = path.join(dir, FILENAME)
  const relName = path.relative(ROOT, dir)
  if (UNTRACKED.includes(relName)) return
  md += '  '.repeat(level) + `- <a href="${noext(encodeURI(relName), GITHUB)}">${titlize(file)}</a>` +
  `<span style="padding-left:2em;color:${LATEST[relName] === 'A' ? 'green' : 'orange'}">${LATEST[relName] || ''}</span>` +
  `<span style="color:gray;font-size:.8em;padding-left:2em">${date(stat.mtime)}</span>\n`
})

md += `
## Contribute

### Add Hook

> Adding a \`post-commit\` hook to generate and commit newest notes index automatically.

> The hook will detect files change by comparing \`HEAD^\` with \`HEAD\`, only files more than \`README.md\` will take effect.

\`\`\`bash
./prepare
\`\`\`

### Commit

No need to generate or commit \`README.md\` manually.

`

fs.writeFileSync(path.join(ROOT, FILENAME), md)

if (GITHUB) {
  execSync(`git add -f ${ROOT}/${FILENAME} && git commit -m 'update index.'`)
}
