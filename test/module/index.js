import testRunnerSuite from './test-runner.mjs'
import TestRunner from '../../index.mjs'
const π = document.createElement.bind(document)
const $ = document.querySelector.bind(document)

class WebView extends HTMLElement {
  connectedCallback () {
  }
  start (count) {
    const li = π('li')
    li.textContent = `1..${count}`
    this.appendChild(li)
  }
  testPass (test) {
    const li = π('li')
    li.textContent = `ok ${test.index} ${test.name}`
    this.appendChild(li)
  }
  testFail (test) {
    const li = π('li')
    li.textContent = `not ok ${test.index} ${test.name}`
    this.appendChild(li)
  }
}

customElements.define('web-view', WebView)

const view = new WebView()
$('body').appendChild(view)

testRunnerSuite(console.assert, TestRunner, view)
  .catch(function (err) {
    console.error(err)
  })
