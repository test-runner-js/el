import './web-view.js'
import testRunnerSuite from './test-runner.mjs'
import TestRunner from '../../index.mjs'
import mix from '../../node_modules/create-mixin/index.mjs'
import ViewBase from '../../node_modules/test-runner/lib/view-base.mjs'
const π = document.createElement.bind(document)
const $ = document.querySelector.bind(document)

const webView = π('web-view')

const runnerView = ViewBase => class RunnerView extends ViewBase {
  start (count) {
    const li = π('li')
    li.textContent = `1..${count}`
    webView.appendChild(li)
  }
  testPass (test, result) {
    const li = π('li')
    li.textContent = `ok ${test.index} ${test.name}`
    webView.appendChild(li)
  }
  testFail (test, err) {
    const li = π('li')
    li.textContent = `not ok ${test.index} ${test.name}`
    webView.appendChild(li)
    console.log(err)
  }
  end () {
    console.log('end')
  }
}

$('body').appendChild(webView)

testRunnerSuite(console.assert, TestRunner, runnerView)
  .catch(function (err) {
    console.error(err)
  })
