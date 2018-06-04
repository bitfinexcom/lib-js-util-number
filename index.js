const BN = require('bignumber.js')

BN.config({ EXPONENTIAL_AT: [-18, 30] })

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

module.exports = {
  nBN_valid: nBN_valid,
  nBN: nBN,
  nN: nN
}
