import TestRunner from './node_modules/test-runner/index.mjs'

/**
 * @module test-runner-web
 */

/**
 * @alias module:test-runner-web
 */
class TestRunnerWeb extends TestRunner {
  set manualStart (val) {
    if (val) {
      window.removeEventListener('load', this._beforeExitCallback)
    } else {
      window.addEventListener('load', this._beforeExitCallback)
    }
  }
  get manualStart () {
    return this._manualStart
  }
}

export default TestRunnerWeb
