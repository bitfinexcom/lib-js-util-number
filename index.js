const _ = require('lodash')
const BN = require('bignumber.js')

BN.config({ EXPONENTIAL_AT: [-20, 40] })

const nBN_valid = (v, dfl = null) => {
  let valid = false

  try {
    nBN(v)
    valid = true
  } catch (e) { }

  return valid
}

const nBN = (v, dfl = null) => {
  if (v instanceof BN) return v
  if (!_.isFinite(+v)) v = dfl
  if (_.isNull(v) || _.isUndefined(v) || !_.isFinite(+v)) {
    throw new Error('BigNum(' + v + '): invalid')
  }
  return new BN(v + '')
}

const nN = (v, dfl = null) => {
  if (v instanceof Number) return v
  if (!_.isFinite(+v)) v = dfl
  if (_.isNull(v) || _.isUndefined(v) || !_.isFinite(+v)) {
    throw new Error('Number(' + v + '): invalid')
  }
  return +v
}

function qn_num_fix (n, p = 8) {
  if (!_.isFinite(+n)) n = 0
  return (+n).toFixed(p)
}

const patchQN = () => {
  require(`${__dirname}/quick.js`)
}

module.exports = {
  BN: BN,
  nBN_valid: nBN_valid,
  nBN: nBN,
  nN: nN,
  patchQN: patchQN,
  qn_num_fix: qn_num_fix
}
