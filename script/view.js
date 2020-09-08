
const path = require('path')
const { execSync } = require('child_process')
const { ROOT } = require('./help')
const index = path.join(ROOT, 'index.html')

execSync(`npm run html -- github`)

if (process.platform === 'win32') {
  execSync(`Start-Process ${index}`)
} else {
  execSync(`open ${index}`)
}
