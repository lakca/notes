const { execSync } = require('child_process')
const path = require('path')

const format = {
  $nameStatus() {
    return Object.fromEntries(this.map(line => line.split('\t').reverse()))
  }
}

/**
 *
 * @typedef {string} FilePath - File path to git project root.
 * @typedef {'A'|'C'|'D'|'M'|'R'|'T'|'U'|'X'|'B'} FileStatus - See `--diff-filter` of `git diff`
 */

module.exports = class Git {
  constructor(cwd = '') {
    this.cwd(cwd)
  }
  /** Set command working directory. */
  cwd(cwd) {
    this._cwd = path.isAbsolute(cwd) ? cwd : path.join(process.cwd(), cwd)
    return this
  }
  /** Run git command, return lines from output. */
  git(cmd) {
    return Object.assign(execSync(cmd).toString('utf-8').trim().split('\n').map(col => col.trim()), format)
  }
  get root() {
    return this.git('git rev-parse --show-toplevel')[0]
  }

  /**
   * untracked files
   * @return {FilePath[]}
   */
  untracked() {
    return this.git('git ls-files --others --exclude-standard')
  }
  /**
   * (working tree) modified files
   * @return {FilePath[]}
   */
  modified() {
    return this.git('git ls-files --modified --exclude-standard')
  }
  /**
   * (working tree) deleted files
   * @return {FilePath[]}
   */
  deleted() {
    return this.git('git ls-files --deleted --exclude-standard')
  }
  /**
   * files status differing from head.
   *
   * @return {Record<FilePath, FileStatus>}
   */
  head() {
    return this.git('git diff HEAD --name-status').$nameStatus()
  }
  /**
   * Files status on a ref (commit, tag, branch ...).
   * @param {string} ref
   * @returns
   */
  status(ref = 'HEAD') {
    return this.git(`git show ${ref} --name-status --pretty=`).$nameStatus()
  }
}
