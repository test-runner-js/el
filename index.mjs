import dommo from './node_modules/dommo/index.mjs'
const π = document.createElement.bind(document)

class TestRunnerEl extends HTMLElement {
  connectedCallback () {
    this.innerHTML = `<header>
      <runner-name>test-runner</runner-name>
      <state-indicator state=""></state-indicator>
      <runner-state>in-progress</runner-state>
      <span>duration: </span>
    </header>
    <tom-container></tom-container>`
    this.dom = {
      tomContainer: this.querySelector('tom-container'),
      runnerStateName: this.querySelector('runner-state'),
      runnerStateIndicator: this.querySelector('state-indicator')
    }
  }
  setRunner (runner) {
    this.dom.runnerStateName.textContent = runner.state
    this.dom.runnerStateIndicator.setAttribute('state', runner.state)
    this.loadTom(runner.tom)
    runner.on('state', state => {
      this.dom.runnerStateName.textContent = state
      this.dom.runnerStateIndicator.setAttribute('state', state)
    })
  }

  loadTom (tom) {
    for (const test of tom) {
      const tomEl = dommo(`<test-el>
        <state-indicator state="${test.state}"></state-indicator>
        <test-name>${test.name}</test-name>
      </test-el>`)
      tomEl.style.transform = `translateX(${test.level()}em)`
      test.on('state', function (state, prevState) {
        if (this !== test) return
        tomEl.children[0].setAttribute('state', state)
        tomEl.children[0].textContent = state
      })
      this.dom.tomContainer.appendChild(tomEl)
    }
  }
}

customElements.define('test-runner', TestRunnerEl)

export default TestRunnerEl
