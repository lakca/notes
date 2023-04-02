const fs = require('fs')
const path = require('path')
const readline = require('readline')
const os = require('os')

let building = false

async function removeAfter(filename, linePattern) {
  return new Promise((rsv, rej) => {
    const rl = readline.createInterface({
      input: fs.createReadStream(filename),
    });

    let newLength = 0
    let found = false
    rl.on('line', function (line) {
      if (linePattern.test(line)) {
        found = true
        rl.close()
      } else {
        newLength += Buffer.from(line).byteLength + 1
      }
    });

    rl.on('close', function () {
      if (found) {
        fs.truncateSync(filename, newLength);
      }
      rsv(null)
    });
  })
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function removeBetween(filename, startPattern, endPattern) {
  return new Promise((rsv, rej) => {
    const rl = readline.createInterface({
      input: fs.createReadStream(filename),
    });

    const lines = []
    let ignoring = 0
    rl.on('line', function (line) {
      if (startPattern.test(line)) {
        if (ignoring < 0) ignoring = 0
        ignoring += 1
      } else if (endPattern.test(line)) {
        ignoring -= 1
      } else if (ignoring < 1) {
        lines.push(line)
      }
    });

    rl.on('close', function () {
      setTimeout(() => {
        fs.writeFileSync(filename, lines.join(os.EOL))
        rsv(null)
      }, 0)
    });
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

async function append(target, themes, theme) {
  if (theme) {
    const filename = themes[theme]
    building = true
    const startIndicator = `/*---START:${theme}---*/`
    const endIndicator = `/*---END:${theme}---*/`
    await removeBetween(target, new RegExp('^\\s*' + escapeRegExp(startIndicator) + '\\s*$'), new RegExp('^\\s*' + escapeRegExp(endIndicator) + '\\s*$'))
    ensureNewline(target)
    fs.appendFileSync(target, `${startIndicator}\n` + build(filename, theme))
    ensureNewline(target)
    fs.appendFileSync(target, `${endIndicator}\n`)
    building = false
    console.log('built done!', new Date().toLocaleString())
  } else {
    for await (const theme of Object.keys(themes)) {
      await append(target, themes, theme)
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
    let phrase = ""
    let quoted = false
    const push = function () {
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
      phrase = ""
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

const suffix = '.theme.conf'
const themes = Object.fromEntries(fs.readdirSync(__dirname).filter(file => file.endsWith(suffix)).map(file => {
  return [file.slice(0, -suffix.length), path.join(__dirname, file)]
}))
const theme = process.argv.find(e => themes[e])

if (process.argv.includes('dev')) {
  const targetPath = path.join(__dirname, '../override/longpeng.me/notes/assets/css')
  let target = fs.readdirSync(targetPath).find(e => e.startsWith('style.css'))
  if (target) {
    target = path.join(targetPath, target)
    Object.entries(themes).forEach(([theme, filename]) => {
      fs.watchFile(filename, async stat => {
        return building || append(target, themes, theme)
      })
    })
  }
} else {
  const target = path.join(__dirname, './style.scss')
  building || append(target, themes, theme)
}
