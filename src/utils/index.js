/*
 * @文件描述: 文件描述
 * @作者: 作者
 * @Date: 2019-01-18 18:09:34
 * @LastEditors: L
 * @LastEditTime: 2019-12-05
 */

export function parseTime (time, cFormat) {
  console.log(time)
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}

export function formatTime (time, option) {
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - time) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

export function formatDate (val, formats) {
  if (typeof val === 'string') val = val.replace(/-/g, '/').replace(/\./g, '/') // 兼容safari
  const date = new Date(val)
  const year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  const format = formats === true ? formats : 'yyyy/MM/dd hh:mm:ss'
  return format
    .replace(/yyyy/g, year)
    .replace(/MM/g, ('0' + month).slice(-2))
    .replace(/dd/g, ('0' + day).slice(-2))
    .replace(/hh/g, ('0' + hour).slice(-2))
    .replace(/mm/g, ('0' + minute).slice(-2))
    .replace(/ss/g, ('0' + second).slice(-2))
}
