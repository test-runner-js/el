const puppeteer = require('puppeteer')
const LocalWebServer = require('local-web-server')

async function start () {
  const localWebServer = new LocalWebServer()
  const server = localWebServer.listen({ port: 8000 })
  const browser = await puppeteer.launch({ headless: false })
  const page = (await browser.pages())[0]
  await page.goto('http://127.0.0.1:8000/bin/')
  // const result = await page.evaluate(() => runner.start())
  const state = await page.evaluate(async () => {
    await runner.start()
    return runner.state
  })
  console.log(state)
  await browser.close()
  server.close()
}

start().catch(console.error)
