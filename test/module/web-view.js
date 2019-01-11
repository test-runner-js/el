class TestRunnerView extends HTMLElement {
  connectedCallback () {
    this.innerHTML = ``
  }
}

customElements.define('test-runner', TestRunnerView)

const view = ViewBase => class extends ViewBase {
  start (count) {
    const li = π('li')
    li.textContent = `1..${count}`
    viewEl.appendChild(li)
  }
  testPass (test, result) {
    const li = π('li')
    li.textContent = `ok ${test.index} ${test.name}`
    viewEl.appendChild(li)
  }
  testFail (test, err) {
    const li = π('li')
    li.textContent = `not ok ${test.index} ${test.name}`
    viewEl.appendChild(li)
  }
  end () {
    const li = π('li')
    li.textContent = `end`
    viewEl.appendChild(li)
  }
}

export { view, TestRunnerView }
