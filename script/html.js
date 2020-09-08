const { help, ROOT, SRC_ROOT, HTML_ROOT } = require('./help')

help(`parameters:

\tgithub\t-\t Github theme.
`)

const fs = require('fs')
const path = require('path')
const cp = require('child_process')
const marked = require('marked')
const INDEX_FILE = 'index.html' // folder index file name.
const IS_GITHUB_THEME = process.argv.includes('github')

marked.setOptions({
  gfm: true,
  langPrefix: 'hljs language-',
  highlight: function(code, language) {
    const hljs = require('highlight.js');
    const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
    return hljs.highlight(validLanguage, code).value;
  }
})

const indexes = []
const theme = 'base16-solarized.css'
const codeTheme = 'monokai.min.css'
const themes = [
  'base16-3024.css',
  'base16-ashes.css',
  'base16-atelierdune.css',
  'base16-atelierforest.css',
  'base16-atelierheath.css',
  'base16-atelierlakeside.css',
  'base16-atelierseaside.css',
  'base16-bespin.css',
  'base16-brewer.css',
  'base16-chalk.css',
  'base16-codeschool.css',
  'base16-default.css',
  'base16-eighties.css',
  'base16-embers.css',
  'base16-flat.css',
  'base16-google.css',
  'base16-grayscale.css',
  'base16-greenscreen.css',
  'base16-isotope.css',
  'base16-londontube.css',
  'base16-marrakesh.css',
  'base16-mocha.css',
  'base16-monokai.css',
  'base16-ocean.css',
  'base16-paraiso.css',
  'base16-pop.css',
  'base16-railscasts.css',
  'base16-shapeshifter.css',
  'base16-solarized.css',
  'base16-tomorrow.css',
  'base16-twilight.css'
].sort()

const codeThemes = [
  'vs.css',
  'gml.css',
  'far.css',
  'idea.css',
  'nord.css',
  'dark.css',
  'arta.css',
  'nnfx.css',
  'xcode.css',
  'ocean.css',
  'xt256.css',
  'docco.css',
  'agate.css',
  'vs2015.css',
  'srcery.css',
  'hybrid.css',
  'github.css',
  'magula.css',
  'lioshi.css',
  'dracula.css',
  'darcula.css',
  'monokai.css',
  'ascetic.css',
  'zenburn.css',
  'rainbow.css',
  'default.css',
  'obsidian.css',
  'ir-black.css',
  'tomorrow.css',
  'pojoaque.jpg',
  'pojoaque.css',
  'routeros.css',
  'sunburst.css',
  'purebasic.css',
  'lightfair.css',
  'mono-blue.css',
  'nnfx-dark.css',
  'hopscotch.css',
  'grayscale.css',
  'a11y-dark.css',
  'night-owl.css',
  'a11y-light.css',
  'railscasts.css',
  'foundation.css',
  'googlecode.css',
  'brown-paper.css',
  'school-book.png',
  'an-old-hope.css',
  'school-book.css',
  'kimbie.dark.css'
].sort().map(e => e.replace(/\.css$/, '.min.css'))

function random(max) {
  return Math.ceil(Math.random() * max)
}

const select = `
<select onchange="select(event, 0)" value=${theme}>
  ${themes.map(e => '<option ' + (e === theme && 'selected="selected"') + '>' + e + '</option>')}
</select>
<select onchange="select(event, 2)" value=${codeTheme}>
  ${codeThemes.map(e => '<option ' + (e === codeTheme && 'selected="selected"') + '>' + e + '</option>')}
</select>
`
const script = `
<script>
  function select(e, i) {
    const link = document.querySelectorAll('link')[i]
    link.href = link.href.replace(/(?<=\\/)[^\/]+$/, e.target.value)
  }
</script>
`

function times(str) {
  return [].reduce.call(str, (p, v) => v === path.sep ? ++p : p, 0)
}

function mkdir(dir) {
  process.stdout.write(cp.execSync('mkdir -p ' + dir))
}

mkdir(HTML_ROOT)

;(function read(dir) {
  for (const file of fs.readdirSync(dir)) {
    const absPath = path.join(dir, file)
    const stat = fs.statSync(absPath)
    const relPath = path.relative(ROOT, absPath)
    const htmlRelPath = path.join(HTML_ROOT, relPath)
    const prefix = '  '.repeat(times(relPath))
    if (stat.isDirectory() && file[0] !== '.' && absPath !== HTML_ROOT) {
      indexes.push(prefix + `- ${file}`)
      mkdir(htmlRelPath)
      read(absPath)
    } else if (/\.md/.test(file) && stat.isFile()) {
      indexes.push(prefix + `- [${file.slice(0, -3)}](${htmlRelPath.replace(/\.md$/, '.html')})`)
      fs.writeFileSync(htmlRelPath.replace(/\.md$/, '.html'), `
      <meta chartset="utf-8">
      ${IS_GITHUB_THEME
        ? '<link rel="stylesheet" href="https://gitcdn.link/repo/iamnewton/base16-marked/master/' + theme + '">'
        : '<link rel="stylesheet" href="https://gitcdn.link/repo/hzlzh/MarkDown-Theme/master/CSS/GitHub-ReadMe.css">'
      }
      <link rel="stylesheet" href="https://cdn.bootcdn.net/ajax/libs/highlight.js/10.0.0/styles/${codeTheme}">
      <style>
        body {
          width: 800px;
          margin: auto;
          font-size: 20px!important;
        }
        select {
          position: fixed;
          left: 100px;
          top: 10px;
        }
        select:last-of-type {
          top: 50px;
        }
      </style>
      ${script}
      ${select}
      <a href="${path.relative(absPath, ROOT)}/index.html">HOME</a>
      ` + marked(fs.readFileSync(absPath).toString('utf-8')))
    }
  }
}(SRC_ROOT))

fs.writeFileSync(path.join(ROOT, INDEX_FILE), marked(indexes.join('\n')))
