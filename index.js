const BN = require('bignumber.js')

BN.config({ EXPONENTIAL_AT: [-20, 40] })

const ERR_SIGNIFICANT_DIGITS = 'Significant digits must be 1 or greater'

const nBNValid = (v, dfl = null) => {
  let valid = false

  try {
    nBN(v)
    valid = true
  } catch (e) { }

  return valid
}

const nBNIsFinite = v => {
  let valid = false

  try {
    const n = nBN(v)
    valid = n.isFinite()
  } catch (e) {
    valid = false
  }

  return valid
}

const nBN = (v, dfl = null) => {
  if (v instanceof BN) return v
  if (!Number.isFinite(pF(v))) v = dfl
  // null and undefined parse to NaN, so this also rejects them
  if (!Number.isFinite(pF(v))) {
    throw new Error('BigNum(' + v + '): invalid')
  }
  return new BN(v + '')
}

const nN = (v, dfl = null) => {
  if (v instanceof Number) return v
  if (!Number.isFinite(pF(v))) v = dfl
  // null and undefined parse to NaN, so this also rejects them
  if (!Number.isFinite(pF(v))) {
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

const qnFloor = (x, digits = 0) => {
  const n = Math.pow(10, digits)
  return Math.floor(x * n) / n
}

const qnCeil = (x, digits = 0) => {
  const n = Math.pow(10, digits)
  return Math.ceil(x * n) / n
}

const qnToPrecFloor = (x, digits = 1) => {
  if (digits < 1) {
    throw new Error(ERR_SIGNIFICANT_DIGITS)
  }

  const scaleFactor = Math.floor(Math.log10(Math.abs(x)))
  return qnFloor(x, digits - scaleFactor - 1)
}

const qnToPrecCeil = (x, digits = 1) => {
  if (digits < 1) {
    throw new Error(ERR_SIGNIFICANT_DIGITS)
  }

  const scaleFactor = Math.floor(Math.log10(Math.abs(x)))
  return qnCeil(x, digits - scaleFactor - 1)
}

const qnToPrecRound = (x, digits = 1) => {
  if (digits < 1) {
    throw new Error(ERR_SIGNIFICANT_DIGITS)
  }

  const scaleFactor = Math.floor(Math.log10(Math.abs(x)))
  return qnRound(x, digits - scaleFactor - 1)
}

function qnNumFix (n, p = 8) {
  if (!Number.isFinite(pF(n))) n = 0
  return pF(n).toFixed(p)
}

const patchQN = () => {
  require(`${__dirname}/quick.js`)
}

module.exports = {
  pF,
  pI,
  qnToPrecFloor,
  qnToPrecCeil,
  qnToPrecRound,
  qnFloor,
  qnCeil,
  qnRound,
  BN,
  // Public snake_case names kept so existing consumers do not break.
  nBN_valid: nBNValid,
  nBN_isFinite: nBNIsFinite,
  nBN,
  nN,
  patchQN,
  qn_num_fix: qnNumFix
}
