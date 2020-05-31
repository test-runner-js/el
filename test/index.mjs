import tom from './tom.mjs'
import TestRunner from '/node_modules/test-runner-core/dist/index.mjs'
import sleep from '/node_modules/sleep-anywhere/index.mjs'

const $ = document.querySelector.bind(document)

async function start () {
  const runner = new TestRunner(tom)
  window.runner = runner
  $('test-runner').setRunner(runner)
  await sleep(1000)
  await runner.start()
}

start().catch(console.error)

