const path = require('path')
const { execSync } = require('child_process')

function help(print) {
  if (process.argv.some(e => e === '-h' || e === '--help' || e === 'help')) {
    typeof print === 'function' ? print() : console.log(print +
    '\thelp, --help, -h\t-\tdisplay help.')
    process.exit(0)
  }
}

let root

module.exports = {
  help,
  get ROOT() {
    if (!root) {
      root = execSync('git rev-parse --show-toplevel').toString().trim()
    }
    return root
  },
  get SRC_ROOT() { return path.join(this.ROOT, 'src') },
  get HTML_ROOT() { return path.join(this.ROOT, 'html') }
}
