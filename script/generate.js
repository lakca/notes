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
const SRC_REL = path.relative(ROOT, SRC_ROOT)
const INDEX_FILE = 'README.md' // folder index file name.
const UNTRACKED = gitlist('git ls-files --others --exclude-standard')
const IS_GITHUB = process.argv.includes('github') // github page, no extension name,
const IS_COMMIT = process.argv.includes('commit') // commit index.
const IS_FORCE = process.argv.includes('force') // force generation.
const LATEST_COMMITTED = getLatestCommit()

if (!IS_FORCE) {
  // no .md committed
  if (!Object.keys(LATEST_COMMITTED)
    .filter(e => !new RegExp(`(^|${SRC}\/(.*\/)*)${INDEX_FILE}$`).test(e))
    .some(e => /\.(md|html)$/.test(e))) {
    process.exit(0)
  }
}

function getLatestCommit() {
  const status = {}
  const reg = new RegExp(`\\W${SRC_REL}\/`)
  gitlist(`git show HEAD --name-status --pretty=''`)
    .forEach(e => {
      if (reg.test(e)) {
        const r = e.split(/\t+/)
        status[r[r.length - 1]] = r[0]
      }
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
  return str.split(/\s+|-/).map(capitalize).join(' ')
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

class FileInfo {
  /**
   * @param {string} filepath
   * @param {string} relRoot
   * @param {number} level
   */
  constructor(filepath, relRoot, level) {
    this.level = level
    this.relRoot = relRoot
    this.relName = path.relative(relRoot, filepath)
    this.filepath = filepath
    this.file = path.basename(filepath)
    this.ext = path.extname(this.file)
    this.name = path.basename(this.file, this.ext)
    this.stat = fs.statSync(filepath)
    this.rank = 0
    if (this.stat.isDirectory()) {
      this.rank += 10
    }
    if (['readme', 'index'].includes(this.name.toLowerCase())) {
      this.rank += -1
    }
    const info = this.stat.isFile() && parseMeta(fs.readFileSync(filepath).toString().trim()) || null
    this.meta = info?.meta
    this.h1 = info?.h1
    this.title = titlize(this.name)
  }
}

/**
 * @param {FileInfo} fileInfo
 * @param {(fileInfo: FileInfo) => any} cb
 * @param {number} level
 * @returns
 */
function readFolder(fileInfo, cb, level = 0) {
  if (!fileInfo.stat.isDirectory()) return
  fs.readdirSync(fileInfo.filepath).map(file => {
    return new FileInfo(path.join(fileInfo.filepath, file), fileInfo.relRoot, level)
  }).sort((info1, info2) => {
    return info1.name.localeCompare(info2.name)
  }).forEach(info => {
    if (!level && info.file === INDEX_FILE) return
    if (info.stat.isFile() && ['.md', '.html'].includes(info.ext)) {
      cb(info)
    } else if (info.stat.isDirectory() && info.file[0] !== '.') {
      cb(info)
      readFolder(info, cb, level + 1)
    }
  })
}

/**
 * @param {FileInfo} fileInfo
 */
function renderTocItem(fileInfo, level) {
  const collapse = fileInfo.level - level
  const relName = collapse ? fileInfo.relName.split(path.sep).slice(collapse + 1).join(path.sep) : fileInfo.relName
  const relUrl = IS_GITHUB ? noext(relName, true).replace(/README$/, '') : relName
  if (['readme'].includes(fileInfo.name.toLowerCase())) return
  return '  '.repeat(level) +
    `- [${fileInfo.title}](${encodeURI(relUrl)})` +
    `<span style="font-size:.8em;float:right">` +
    `<span style="color:${LATEST_COMMITTED[fileInfo.relName] === 'A' ? 'green' : 'orange'}">${LATEST_COMMITTED[fileInfo.relName] || ''}</span>` +
    `<span style="padding-left:2em;color:gray;">${date(fileInfo.stat.mtime)}</span>` +
    `<span style="padding-left:2em;color:lightgray;">${date(fileInfo.stat.birthtime)}</span>` +
    `</span>` +
    '\n'
}

const structures = []
const homeToc = []

readFolder(new FileInfo(SRC_ROOT, ROOT, 0), (fileInfo) => {
  if (UNTRACKED.includes(fileInfo.relName)) return
  homeToc[homeToc.length] = renderTocItem(fileInfo, fileInfo.level)
  structures[structures.length] = fileInfo
})

// generate index of subdirectories.
;(function generateSubTocs(branches) {
  const levelArr = []
  const tocArr = []

  function saveToc(fileInfo) {
    for (let lv = fileInfo.level; lv--;) {
      if (levelArr[lv]) {
        if (!tocArr[lv]) tocArr[lv] = []
        tocArr[lv].push(renderTocItem(fileInfo, fileInfo.level - lv - 1))
      }
    }
  }

  function tryRenderToc(level) {
    if (level == null) {
      return levelArr.forEach((e, lv) => tryRenderToc(lv))
    }
    if (levelArr[level]) {
      if (tocArr[level] && tocArr[level].length) {
        tocArr[level].sort((a, b) => a.localeCompare(b))
        fs.writeFileSync(path.join(levelArr[level].filepath, INDEX_FILE),
          tocArr[level].join(''))
      }
      levelArr[level] = null
      tocArr[level] = null
    }
  }

  for (const fileInfo of branches) {
    tryRenderToc(fileInfo.level)
    if (fileInfo.stat.isDirectory()) {
      levelArr[fileInfo.level] = fileInfo
    }
    saveToc(fileInfo)
  }

  tryRenderToc()
}(structures))

fs.writeFileSync(path.join(ROOT, INDEX_FILE), `
# Index

${homeToc.join('')}

# Contribute

## Hook

Adding a \`post-commit\` hook to generate and commit newest notes index automatically.

The hook will detect files change by comparing \`HEAD^\` with \`HEAD\`, only files more than \`README.md\` will take effect.

\`\`\`bash
./prepare
\`\`\`

## Commit

No need to generate or commit \`README.md\` manually.

`)

if (IS_COMMIT) {
  spawnSync('git', ['add', '-f', `${ROOT}/${INDEX_FILE}`])
  spawnSync('git', ['add', '-f', `${SRC_ROOT}/**/${INDEX_FILE}`])
  spawnSync('git', ['commit', '-m', 'update index'])
}
