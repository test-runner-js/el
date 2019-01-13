import Tom from '../../node_modules/test-object-model/index.mjs'
import sleep from '../../node_modules/sleep-anywhere/index.mjs'

const tom = new Tom()
tom.test('fetch something 1', async function () {
  await sleep(2000)
  return true
})
tom.test('fetch something 2', async function () {
  await sleep(100)
  return true
})
tom.test('fetch something 4', async function () {
  await sleep(4000)
  return true
})
tom.test('this fails', async function () {
  await sleep(3000)
  throw new Error('broken')
})

export default tom