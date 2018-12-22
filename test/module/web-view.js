class WebView extends HTMLElement {
  start (count) {
    const li = π('li')
    li.textContent = `1..${count}`
    view.appendChild(li)
  }
  testPass (test, result) {
    const li = π('li')
    li.textContent = `ok ${test.index} ${test.name}`
    view.appendChild(li)
  }
  testFail (test, err) {
    const li = π('li')
    li.textContent = `not ok ${test.index} ${test.name}`
    view.appendChild(li)
    console.log(err)
  }
  end () {
    console.log('end')
  }
}

customElements.define('web-view', WebView)
