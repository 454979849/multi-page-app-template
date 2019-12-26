/**
 * 通用方法封装
 */
import jsCookie from 'js-cookie'

/**
 * 存储localStorage
 * @param name 名称
 * @param content 内容
 * @param expire 过期时间（单位： ms）
 */
export const setStore = (name, content, expire = 100 * 24 * 60 * 60 * 1000) => {
  if (!name) return
  let newContent = {
    content,
    time: Date.now(),
    expire
  }
  newContent = JSON.stringify(newContent)
  window.localStorage.setItem(name, newContent)
}
/**
 * 获取localStorage
 */
export const getStore = (name) => {
  if (!name) return
  const newContent = JSON.parse(window.localStorage.getItem(name))
  const time = _.get(newContent, 'time')
  const expire = _.get(newContent, 'expire')

  if (Date.now() - time > expire) {
    localStorage.removeItem(name)
    return null
  }
  return _.get(newContent, 'content')
}
/**
 * 删除localStorage
 */
export const removeStore = (name) => {
  if (!name) return
  window.localStorage.removeItem(name)
}

/**
 * 设置 cookie
 * @param name
 * @param value
 */
export const setCookie = (name, value, day) => {
  jsCookie.set(name, value, day)
}

/**
 * 获取cookie
 * @param name
 * @returns {string}
 */
export const getCookie = (name) => {
  jsCookie.get(name)
}

/**
 * 获取cookie(转obj)
 * @param name
 * @returns {any}
 */
export const getCookieWithJSON = (name) => {
  if (getCookie(name)) {
    return JSON.parse(getCookie(name))
  }
}
/**
 * 删除cookie
 * @param name
 */
export const removeCookie = (name) => {
  jsCookie.remove(name)
}
