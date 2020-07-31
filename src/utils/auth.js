/*
 * @文件描述: cookie,sessionStorage
 * @作者: L
 */
import Cookies from 'js-cookie'

// 获取cookie
export function getCookie (name) {
  return Cookies.get(name)
}

// 设置cookie
export function setCookie (name, value) {
  return Cookies.set(name, value)
}

// 删除cookie
export function removeCookie (name) {
  return Cookies.remove(name)
}

// 获取sessionStorage
export function getSessionStorage (item) {
  return JSON.parse(sessionStorage.getItem(item))
}

// 设置sessionStorage
export function setSessionStorage (key, value) {
  return typeof value === 'object' ? sessionStorage.setItem(key, JSON.stringify(value)) : sessionStorage.setItem(key, JSON.stringify(`${value}`))
}

// 删除sessionStorage
export function removeSessionStorage (key) {
  return sessionStorage.removeItem(key)
}
