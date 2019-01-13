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

const nBN_isFinite = v => {
  let valid = false

  try {
    let n = nBN(v)
    valid = n.isFinite()
  } catch (e) {
    valid = false
  }

  return valid
}

const nBN = (v, dfl = null) => {
  if (v instanceof BN) return v
  if (!_.isFinite(pF(v))) v = dfl
  if (_.isNull(v) || _.isUndefined(v) || !_.isFinite(pF(v))) {
    throw new Error('BigNum(' + v + '): invalid')
  }
  return new BN(v + '')
}

const nN = (v, dfl = null) => {
  if (v instanceof Number) return v
  if (!_.isFinite(pF(v))) v = dfl
  if (_.isNull(v) || _.isUndefined(v) || !_.isFinite(pF(v))) {
    throw new Error('Number(' + v + '): invalid')
  }
  return +v
}

const pF = v => {
  return parseFloat(v)
}

const pI = v => {
  return parseInt(v)
}

const qnRound = (x, digits = 0) => {
  const n = Math.pow(10, digits)
  return Math.round(x * n) / n
}

const qnFloor(x, digits = 0) => {
  const n = Math.pow(10, digits)
  return Math.floor(x * n) / n
}

const qnCeil(x, digits = 0) => {
  const n = Math.pow(10, digits)
  return Math.ceil(x * n) / n
}

function qnToPrecFloor(x, digits = 1) {
  if (digits < 1) {
    throw 'Significant digits must be 1 or greater'
  }

  const scaleFactor = Math.floor(Math.log10(Math.abs(x)))
  return qnFloor(x, digits - scaleFactor - 1)
}

function qnToPrecCeil(x, digits = 1) {
  if (digits < 1) {
    throw 'Significant digits must be 1 or greater'
  }

  const scaleFactor = Math.floor(Math.log10(Math.abs(x)))
  return qnCeil(x, digits - scaleFactor - 1)
}

function qnToPrecRound(x, digits = 1) {
  if (digits < 1) {
    throw 'Significant digits must be 1 or greater'
  }

  const scaleFactor = Math.floor(Math.log10(Math.abs(x)))
  return qnRound(x, digits - scaleFactor - 1)
}

function qn_num_fix (n, p = 8) {
  if (!_.isFinite(pF(n))) n = 0
  return pF(n).toFixed(p)
}

const patchQN = () => {
  require(`${__dirname}/quick.js`)
}

module.exports = {
  pF: pF,
  pI: pI,
  qnToPrecFloor: qnToPrecFloor,
  qnToPrecCeil: qnToPrecCeil,
  qnToPrecRound: qnToPrecRound,
  qnFloor: qnFloor,
  qnCeil: qnCeil,
  qnRound: qnRound,
  BN: BN,
  nBN_valid: nBN_valid,
  nBN_isFinite: nBN_isFinite,
  nBN: nBN,
  nN: nN,
  patchQN: patchQN,
  qn_num_fix: qn_num_fix
}
