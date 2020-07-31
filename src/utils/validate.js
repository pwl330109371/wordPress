/*
 * @文件描述: 常用公共方法
 * @作者: L
 */

// 是否是数组
export function isArray (arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString (str) {
  if (typeof str === 'string' || str instanceof String) {
    return true
  }
  return false
}
// 空值
export function isNullValue (value) {
  if (typeof (value) === 'undefined' || value === null || value === '') return false
  return true
}

// 手机
export function isPhone (value) {
  const verification = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
  return verification.test(value)
}

// 用户名
export function isUserName (value) {
  const verification = /^[A-Za-z0-9_]+$/
  return verification.test(value)
}

// 用户名 /^[A-Za-z0-9]+$/
// 手机   /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
// 身份证  /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/
// 邮箱   /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
