// import './web-view.js'
import Tom from '../../node_modules/test-object-model/index.mjs'
import TestRunner from '../../index.mjs'
const π = document.createElement.bind(document)
const $ = document.querySelector.bind(document)

const webView = π('web-view')

const view = ViewBase => class RunnerView extends ViewBase {
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
  }
  end () {
    const li = π('li')
    li.textContent = `end`
    webView.appendChild(li)
  }
}

$('body').appendChild(webView)

const tom = new Tom()
tom.test('pass', function () {
  console.assert(this.name === 'pass')
  return true
})
tom.test('fail', function () {
  throw new Error('broken')
})

const runner = new TestRunner({ tom, view })
runner.start()
  .then(results => {
    console.assert(results[0] === true)
  })
