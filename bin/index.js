import './test-runner-el.mjs'
import TestRunner from '../index.mjs'
const π = document.createElement.bind(document)
const $ = document.querySelector.bind(document)

window.runner = new TestRunner({ tom })
const testRunnerEl = π('test-runner')
$('body').appendChild(testRunnerEl)
testRunnerEl.setRunner(runner)
// runner.start()
