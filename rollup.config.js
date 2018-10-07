import resolve from 'rollup-plugin-node-resolve'
import commonJS from 'rollup-plugin-commonjs'
import gl from 'rollup-plugin-node-globals'
import babel from 'rollup-plugin-babel'
import pkg from './package.json'

/* Make sure that external dependencies pulled into the built distribution
  package but are only referenced */

export default {
  input: 'src/ubirch-protocol.js',
  
  plugins: [
    babel({ plugins: ['external-helpers'] }), 
    commonJS({
      include: 'node_modules/**'
    }),
 
    resolve({browser: true}),
    gl()
  ],
  output: [
    // { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'es' },
    { file: pkg.main, format: 'iife' }
  ],
}
