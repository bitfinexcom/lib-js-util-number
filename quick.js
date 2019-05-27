'use strict'

const QN = Number

QN.prototype.abs = function () {
  return Math.abs(this)
}

QN.prototype.plus = function (x) {
  return this + +x
}

QN.prototype.minus = function (x) {
  return this - +x
}

QN.prototype.times = function (x) {
  return this * +x
}

QN.prototype.div = function (x) {
  return this / +x
}

QN.prototype.eq = function (x) {
  return this === +x
}

QN.prototype.lt = function (x) {
  return this < x
}

QN.prototype.lte = function (x) {
  return this <= x
}

QN.prototype.gt = function (x) {
  return this > x
}

QN.prototype.gte = function (x) {
  return this >= x
}

QN.prototype.dp = function (x) {
  return +this.toFixed(x)
}

QN.prototype.integerValue = function (x) {
  return x === 2 ? Math.ceil(this) : Math.floor(this)
}

QN.prototype.toNumber = function () {
  return this
}

QN.max = function () {
  return Math.max.apply(Math, arguments)
}

QN.min = function () {
  return Math.min.apply(Math, arguments)
}

QN.clone = function (q) {
  return QN(q)
}
