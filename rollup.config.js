import babel from 'rollup-plugin-babel'
import pkg from './package.json'

const externals = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
]

/* Keep subdirectories and files belonging to dependencies external */
const makeExternalPredicate = externalsArr => {
  if (externalsArr.length === 0) {
    return () => false
  }
  const externalPattern = new RegExp(`^(${externalsArr.join('|')})($|/)`)
  return id => externalPattern.test(id)
}

/* Make sure that external dependencies pulled into the built distribution
  package but are only referenced */

export default {
  input: 'src/ubirch-protocol.js',
  external: makeExternalPredicate(externals),
  plugins: [babel({ plugins: ['external-helpers'] })],
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'es' },
  ],
}
