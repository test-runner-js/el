const puppeteer = require('puppeteer')
const LocalWebServer = require('local-web-server')

async function start () {
  const localWebServer = new LocalWebServer()
  const server = localWebServer.listen({ port: 8000 })
  const browser = await puppeteer.launch({ headless: true })
  const page = (await browser.pages())[0]
  page.on('console', msg => console.log(msg.text()))
  await page.goto('http://127.0.0.1:8000/bin/')
  await page.addScriptTag({ url: 'https://www.chaijs.com/chai.js' })
  const state = await page.evaluate(async (tomPath) => {
    await import('./test-runner-el.mjs')
    const TestRunner = (await import('../index.mjs')).default
    const π = document.createElement.bind(document)
    const $ = document.querySelector.bind(document)

    const tom = (await import(tomPath)).default
    const runner = new TestRunner({ tom })
    const testRunnerEl = π('test-runner')
    $('body').appendChild(testRunnerEl)
    testRunnerEl.setRunner(runner)
    await runner.start()
    return runner.state
  }, './tom.mjs')
  console.log('state', state)
  await browser.close()
  server.close()
}

start().catch(console.error)
