const fs = require('fs')
const path = require('path')
const readline = require('readline')
const os = require('os')

let building = false

async function removeAfter(filename, linePattern) {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: fs.createReadStream(filename)
    })

    let newLength = 0
    let found = false
    rl.on('line', function(line) {
      if (linePattern.test(line)) {
        found = true
        rl.close()
      } else {
        newLength += Buffer.from(line).byteLength + 1
      }
    })

    rl.on('close', function() {
      if (found) {
        fs.truncateSync(filename, newLength)
      }
      resolve(null)
    })
  })
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

function removeBetween(filename, startPattern, endPattern) {
  if (!fs.existsSync(filename)) return Promise.resolve(true)
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: fs.createReadStream(filename)
    })

    const lines = []
    let ignoring = 0
    rl.on('line', function(line) {
      if (startPattern.test(line)) {
        if (ignoring < 0) ignoring = 0
        ignoring += 1
      } else if (endPattern.test(line)) {
        ignoring -= 1
      } else if (ignoring < 1) {
        lines.push(line)
      }
    })

    rl.on('close', function() {
      setTimeout(() => {
        fs.writeFileSync(filename, lines.join(os.EOL))
        resolve(null)
      }, 0)
    })
  })
}

function ensureNewline(filePath) {
  const fd = fs.openSync(filePath, 'a+')
  const size = fs.fstatSync(fd).size
  const length = 1
  const buffer = Buffer.alloc(length)
  const position = size - length
  fs.readSync(fd, buffer, 0, length, position)
  buffer.toString() === '\n' || fs.writeSync(fd, '\n', size)
  fs.closeSync(fd)
}

async function append(output, themes, theme) {
  if (theme) {
    const filename = themes[theme]
    building = true
    const startIndicator = `/*---START:${theme}---*/`
    const endIndicator = `/*---END:${theme}---*/`
    await removeBetween(output, new RegExp('^\\s*' + escapeRegExp(startIndicator) + '\\s*$'), new RegExp('^\\s*' + escapeRegExp(endIndicator) + '\\s*$'))
    ensureNewline(output)
    fs.appendFileSync(output, `${startIndicator}\n` + build(filename, theme))
    ensureNewline(output)
    fs.appendFileSync(output, `${endIndicator}\n`)
    building = false
    console.log('built done!', new Date().toLocaleString())
  } else {
    for await (const theme of Object.keys(themes)) {
      await append(output, themes, theme)
    }
  }
}

function build(filename, theme) {
  const lines = fs.readFileSync(filename).toString().split('\n')

  const records = []

  for (let i = 0, line = lines[i]; i < lines.length; ++i, line = lines[i]) {
    if (!line.trim()) continue
    if (/^\s*(\/\/)/.test(line)) continue
    const level = line.match(/^\s*/)?.[0].length
    const last = records[records.length - 1]
    const phrases = records[records.length] = []
    let phrase = ''
    let quoted = false
    const push = function() {
      if (!phrase) return
      if (phrases.length) {
        phrases.push(phrase)
      } else {
        const leading = phrases[phrases.length] = []
        if (last) {
          for (let j = 0, el = last[0][j]; j < last[0].length; ++j, el = last[0][j]) {
            if (el[0] === level) break
            else leading.push(el)
          }
        }
        leading.push([level, phrase])
      }
      phrase = ''
    }
    for (let j = 0, token = line[j]; j < line.length; ++j, token = line[j]) {
      if (token === '"') {
        quoted && push()
        quoted = !quoted
      } else if (token === ' ') {
        if (quoted) {
          phrase += token
        } else if (phrase) {
          push()
        } else {
          continue
        }
      } else {
        phrase += token
      }
    }
    push()
  }
  let style = ''
  for (const record of records) {
    const [meta, cls, ...styles] = record
    if (!styles.length) continue
    style += `/* ${meta.map(e => e[1]).join('.')} */\n`
    for (const alternate of [`.theme--${theme} `, `[theme=${theme}] `]) {
      style += alternate
      // highlight block:
      if (!meta.slice(-1)[0][1].startsWith('^')) style += '.highlight '
      style += `${cls} { ${styles.map(s => s + '!important;').join('')} }`
      style += '\n'
    }
  }
  return style
}

function getThemes() {
  return Object.fromEntries(fs.readdirSync(__dirname).filter(file => file.endsWith(SUFFIX)).map(file => {
    return [file.slice(0, -SUFFIX.length), path.join(__dirname, file)]
  }))
}

const SUFFIX = '.theme.conf'

if (process.argv.includes('dev')) {
  const output = path.join(__dirname, './style.highlight.scss')
  fs.watch(__dirname, function(type, filename) {
    if (filename?.endsWith(SUFFIX)) {
      building || append(output, getThemes(), filename.slice(0, -SUFFIX.length))
    }
  })
} else if (process.argv.includes('alone')) {
  const output = path.join(__dirname, './style.highlight.scss')
  const themes = getThemes()
  const theme = process.argv.find(e => themes[e])
  building || append(output, themes, theme)
} else {
  const output = path.join(__dirname, './style.scss')
  const themes = getThemes()
  const theme = process.argv.find(e => themes[e])
  building || append(output, themes, theme)
}
