const fetch  = require('node-fetch')
const config = require('../configs')

/**
 * Check if an object is JSON
 * @param   object  an object to be parsed to JSON
 * @return  return valid object if it is JSON, and return `null` if it isn't
 */
function tryJSON(object) {
  try { return JSON.parse(object) }
  catch (e) { return null }
}

/**
 * Set Unique Array Function
 * @param array array of string to be checked
 */
function setUniqueArray(array) {
  return array.filter((value, index, self) => self.indexOf(value) === index)
}

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item))
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
function mergeDeep(target, ...sources) {
  if (!sources.length) return target
  const source = sources.shift()

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} })
        mergeDeep(target[key], source[key])
      } else {
        Object.assign(target, { [key]: source[key] })
      }
    }
  }
  return mergeDeep(target, ...sources)
}

module.exports = { tryJSON, setUniqueArray, mergeDeep }
