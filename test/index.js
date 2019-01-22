import '../index.mjs'
import tom from './tom.mjs'
import TestRunner from '../node_modules/test-runner-core/index.mjs'
const π = document.createElement.bind(document)
const $ = document.querySelector.bind(document)

const runner = new TestRunner({ tom })
const testRunnerEl = π('test-runner')
$('body').appendChild(testRunnerEl)
testRunnerEl.setRunner(runner)
runner.start()
