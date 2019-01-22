import dommo from './node_modules/dommo/index.mjs'
const π = document.createElement.bind(document)

class TestRunnerEl extends HTMLElement {
  connectedCallback () {
    this.innerHTML = `<header>
      <runner-name>test-runner</runner-name>
      <state-indicator state="in-progress"></state-indicator>
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
    runner.on('start', count => {
      this.runnerStart(runner)
    })
    runner.on('state', state => {
      this.dom.runnerStateName.textContent = state
      this.dom.runnerStateIndicator.setAttribute('state', state)
    })
  }

  runnerStart (runner) {
    this.loadTom(runner.tom)
  }

  loadTom (tom) {
    for (const test of tom) {
      // const tomEl = dommo(`<test-el><test-name>${test.name}</test-name> <span></span></test-el>`)
      const tomEl = dommo(`<test-el>
        <state-indicator state="${test.state}"></state-indicator>
        <test-name>${test.name}</test-name>
      </test-el>`)
      tomEl.style.transform = `translateX(${test.level()}em)`
      test.on('state', (state, test) => {
        tomEl.children[0].setAttribute('state', state)
      })
      this.dom.tomContainer.appendChild(tomEl)
    }
  }
}

customElements.define('test-runner', TestRunnerEl)

export default TestRunnerEl
