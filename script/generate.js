#!/usr/bin/env node

const { help, ROOT, SRC, SRC_ROOT } = require('./help')

help(`parameters:

\tgithub\t-\tfit github page structure (no extension name etc.).
\tcommit\t-\tcommit generated index file.
\tforce \t-\tignore check, rewrite index file.
`)

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
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
    .some(e => /\.md$/.test(e))) {
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
    if (!level && file === INDEX_FILE) return
    const filepath = path.join(folder, file)
    const stat = fs.statSync(filepath)
    if (stat.isFile() && path.extname(file) === '.md') {
      cb(file.slice(0, -3), level, filepath, stat)
    } else if (stat.isDirectory() && file[0] !== '.') {
      cb(file, level, filepath, stat)
      readFolder(filepath, cb, level + 1)
    }
  })
}

function renderTocItem(name, level, relName, stat) {
  return '  '.repeat(level) +
    `- [${titlize(name)}](${encodeURI(noext(relName, IS_GITHUB))})` +
    `<span style="padding-left:2em;color:${LATEST_COMMITTED[relName] === 'A' ? 'green' : 'orange'}">${LATEST_COMMITTED[relName] || ''}</span>` +
    `<span style="color:gray;font-size:.8em;padding-left:2em">${date(stat.mtime)}</span>` +
    '\n'
}

const structures = []
const homeToc = []

readFolder(SRC_ROOT, (name, level, filepath, stat) => {
  const relName = path.relative(ROOT, filepath)
  if (!IS_FORCE && UNTRACKED.includes(relName)) return
  const isDir = stat.isDirectory()
  homeToc[homeToc.length] = renderTocItem(name, level, relName, stat)
  structures[structures.length] = { name, level, filepath, stat, isDir }
})

// generate index of subdirectories.
;(function generateSubTocs(branches) {
  const levelArr = []
  const tocArr = []

  function saveToc(e) {
    for (let lv = e.level; lv--;) {
      if (levelArr[lv]) {
        if (!tocArr[lv]) tocArr[lv] = []
        tocArr[lv].push(renderTocItem(
          e.name,
          e.level - lv,
          path.relative(levelArr[lv].filepath, e.filepath),
          e.stat))
      }
    }
  }

  function tryRenderToc(level) {
    if (level == null) {
      return levelArr.forEach((e, lv) => tryRenderToc(lv))
    }
    if (levelArr[level]) {
      if (tocArr[level] && tocArr[level].length) {
        fs.writeFileSync(path.join(levelArr[level].filepath, INDEX_FILE),
          tocArr[level].join(''))
      }
      levelArr[level] = null
      tocArr[level] = null
    }
  }

  for (const e of branches) {
    tryRenderToc(e.level)
    if (e.isDir) {
      levelArr[e.level] = e
    }
    saveToc(e)
  }

  tryRenderToc()
}(structures))

fs.writeFileSync(path.join(ROOT, INDEX_FILE), `
# Notes

## Index

${homeToc.map(e => e.toc).join('')}

## Contribute

### Add Hook

> Adding a \`post-commit\` hook to generate and commit newest notes index automatically.

> The hook will detect files change by comparing \`HEAD^\` with \`HEAD\`, only files more than \`README.md\` will take effect.

\`\`\`bash
./prepare
\`\`\`

### Commit

No need to generate or commit \`README.md\` manually.

`)

if (IS_COMMIT) {
  execSync(`git add -f ${ROOT}/${INDEX_FILE} ${SRC_ROOT}/**/${INDEX_FILE} && git commit -m 'update index.'`)
}
