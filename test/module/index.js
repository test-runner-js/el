import './test-runner-el.js'
import Tom from '../../node_modules/test-object-model/index.mjs'
import sleep from '../../node_modules/sleep-anywhere/index.mjs'
import TestRunner from '../../index.mjs'
const π = document.createElement.bind(document)
const $ = document.querySelector.bind(document)

const tom = new Tom()
tom.test('fetch something 1', async function () {
  await sleep(2000)
  return true
})
tom.test('fetch something 2', async function () {
  await sleep(100)
  return true
})
tom.test('this fails', async function () {
  await sleep(3000)
  throw new Error('broken')
})

const runner = new TestRunner({ tom })
const testRunnerEl = π('test-runner')
$('body').appendChild(testRunnerEl)
testRunnerEl.setRunner(runner)
runner.start()
