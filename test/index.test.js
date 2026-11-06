'use strict'

const test = require('brittle')
const num = require('../')

// The "Error:" prefix proves an Error object is thrown, not a bare string.
const ERR_SIGNIFICANT_DIGITS = /^Error: Significant digits must be 1 or greater$/

test('public export names stay the same', t => {
  t.alike(Object.keys(num).sort(), [
    'BN', 'nBN', 'nBN_isFinite', 'nBN_valid', 'nN', 'pF', 'pI', 'patchQN',
    'qnCeil', 'qnFloor', 'qnRound', 'qnToPrecCeil', 'qnToPrecFloor',
    'qnToPrecRound', 'qn_num_fix'
  ])
})

test('pF and pI parse like parseFloat and parseInt', t => {
  t.is(num.pF('1.5x'), 1.5)
  t.is(num.pI('42.9'), 42)
})

test('qnRound, qnFloor and qnCeil work on decimal digits', t => {
  t.is(num.qnRound(1.2345, 2), 1.23)
  t.is(num.qnFloor(1.239, 2), 1.23)
  t.is(num.qnCeil(1.231, 2), 1.24)
})

test('qnToPrec* work on significant digits', async t => {
  t.is(num.qnToPrecRound(12345, 2), 12000)
  t.is(num.qnToPrecFloor(0.012345, 3), 0.0123)
  t.is(num.qnToPrecCeil(0.012341, 3), 0.0124)

  await t.exception(() => num.qnToPrecRound(1, 0), ERR_SIGNIFICANT_DIGITS)
  await t.exception(() => num.qnToPrecFloor(1, 0), ERR_SIGNIFICANT_DIGITS)
  await t.exception(() => num.qnToPrecCeil(1, 0), ERR_SIGNIFICANT_DIGITS)
})

test('nBN builds BigNumbers, with a default for invalid input', async t => {
  const bn = new num.BN(1)

  t.is(num.nBN(bn), bn)
  t.is(num.nBN('1.5').toString(), '1.5')
  t.is(num.nBN('x', 2).toString(), '2')
  t.is(num.nBN('0.00000000000000000001').toString(), '1e-20')
  await t.exception(() => num.nBN('x'), /BigNum\(null\): invalid/)
})

test('nN builds numbers, with a default for invalid input', async t => {
  t.is(num.nN('3'), 3)
  t.is(num.nN('x', 4), 4)
  await t.exception(() => num.nN('x'), /Number\(null\): invalid/)
})

test('nBN_valid and nBN_isFinite report without throwing', t => {
  t.ok(num.nBN_valid('1'))
  t.absent(num.nBN_valid('x'))
  t.ok(num.nBN_isFinite('2'))
  t.absent(num.nBN_isFinite(new num.BN(Infinity)))
})

test('qn_num_fix formats to fixed decimals, 0 for invalid input', t => {
  t.is(num.qn_num_fix(1.5, 2), '1.50')
  t.is(num.qn_num_fix('x'), '0.00000000')
})

test('patchQN adds BigNumber-like methods to Number', t => {
  num.patchQN()

  t.is((5).plus('2'), 7)
  t.is((1.239).dp(2), 1.24)
  t.ok((3).gt(2))
})
