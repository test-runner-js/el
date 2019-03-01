/* updated to use tbody as parent div, so <tr>s can be added to it */
function domify (html, doc) {
  const div = (doc || document).createElement('tbody');
  div.innerHTML = html.trim();
  if (div.childNodes.length === 1) {
    return div.firstChild
  } else {
    const frag = (doc || document).createDocumentFragment();
    Array.from(div.childNodes).forEach(function (childNode) {
      frag.appendChild(childNode);
    });
    return frag
  }
}

const π = document.createElement.bind(document);

class TestRunnerEl extends HTMLElement {
  connectedCallback () {
    this.innerHTML = `<header>
      <runner-name>test-runner</runner-name>
      <state-indicator state=""></state-indicator>
      <runner-state>in-progress</runner-state>
      <span>duration: </span>
    </header>
    <tom-container></tom-container>`;
    this.dom = {
      tomContainer: this.querySelector('tom-container'),
      runnerStateName: this.querySelector('runner-state'),
      runnerStateIndicator: this.querySelector('state-indicator')
    };
  }
  setRunner (runner) {
    this.dom.runnerStateName.textContent = runner.state;
    this.dom.runnerStateIndicator.setAttribute('state', runner.state);
    this.loadTom(runner.tom);
    runner.on('state', state => {
      this.dom.runnerStateName.textContent = state;
      this.dom.runnerStateIndicator.setAttribute('state', state);
    });
  }

  loadTom (tom) {
    for (const test of tom) {
      const tomEl = domify(`<test-el>
        <state-indicator state="${test.state}"></state-indicator>
        <test-name>${test.name}</test-name>
      </test-el>`);
      tomEl.style.transform = `translateX(${test.level()}em)`;
      test.on('state', function (state, prevState) {
        if (this !== test) return
        tomEl.children[0].setAttribute('state', state);
        tomEl.children[0].textContent = state;
      });
      this.dom.tomContainer.appendChild(tomEl);
    }
  }
}

customElements.define('test-runner', TestRunnerEl);

export default TestRunnerEl;
