export default {
  input: 'test/module/index.js',
  output: {
    file: 'dist/test.index.js',
    format: 'umd',
    name: 'testSuite'
  },
  external: [ 'assert', 'events' ]
}
