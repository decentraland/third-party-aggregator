const { override, babelInclude } = require('customize-cra')
const path = require('path')

module.exports = override([
  babelInclude([
    path.join(__dirname, 'src'),
    path.join(__dirname, 'node_modules/@metamask/utils/node_modules/superstruct'),
    path.join(__dirname, 'node_modules/@walletconnect'),
  ])
])
