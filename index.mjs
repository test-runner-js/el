import TestRunner from './node_modules/test-runner/index.mjs'

/**
 * @module test-runner-web
 */

/**
 * @alias module:test-runner-web
 */
class TestRunnerWeb extends TestRunner {
  set autoStart (val) {
    this._autoStart = val
    if (val) {
      window.addEventListener('load', this._beforeExitCallback)
    } else {
      window.removeEventListener('load', this._beforeExitCallback)
    }
  }
  get autoStart () {
    return this._autoStart
  }
}

export default TestRunnerWeb
