import firebase from 'firebase'
import { isArray, isObject, map } from 'lodash'

let _cachedVendorBundle = null
let _scripts = []

const determineRequiredBundles = () => {
  _cachedVendorBundle = localStorage.getItem('vendor-bundle')
  if (!_cachedVendorBundle) {
    _scripts.push(firebase.database().ref('/vendor-bundle').once('value'))
  }
  _scripts.push(firebase.database().ref('/app-bundle').once('value'))
}
const getHead = () => window.document.getElementsByTagName('head')[0]
const loadRequiredBundles = () => {
  let s = document.createElement('script')
  return Promise.all(_scripts)
    .then((snapshots) => {
      if (_scripts.length === 1) {
        console.debug('using cached vendor-bundle')
        s.innerHTML = _cachedVendorBundle + snapshots[0].val()
      } else if (_scripts.length === 2) {
        console.warn('vendor-bundle not found, caching new version')
        localStorage.setItem('vendor-bundle', snapshots[0].val())
        s.innerHTML = snapshots[0].val() + snapshots[1].val()
      } else {
        return Promise.reject('Miscalculated scripts')
      }
      getHead().parentNode.insertBefore(s, getHead())
    })
}
/**
 * @description Load a list of scripts
 * @param {Array|Object} scriptsUrlsArr - Array or object of URLS of scripts
 * to be loaded.
 */
const loadScripts = (scriptsUrlsArr) => {
  if (isArray(scriptsUrlsArr) || isObject(scriptsUrlsArr)) {
    return Promise.all(
      map(scriptsUrlsArr, (item) => loadScripts(item, scriptsUrlsArr))
    )
  }
  return new Promise((resolve, reject) => {
    let r = false
    let s = window.document.createElement('script')
    s.type = 'text/javascript'
    s.onerror = s.onabort = reject
    s.onload = s.onreadystatechange = function () {
      if (!r && (!this.readyState || this.readyState === 'complete')) {
        r = true
        resolve(this)
      }
    }
    if (typeof scriptsUrlsArr === 'object' && typeof scriptsUrlsArr.src !== 'undefined') {
      for (key in scriptsUrlsArr) { // eslint-disable-line no-undef
        s[key] = scriptsUrlsArr[key] // eslint-disable-line no-undef
      }
    } else if (typeof scriptsUrlsArr === 'string') {
      s.src = scriptsUrlsArr
    } else {
      return Promise.reject('Script source undefined')
    }
    getHead().parentNode.insertBefore(s, getHead())
  })
}

export default {
  load: () => {
    loadScripts()
      .then(() => {
        determineRequiredBundles()
        loadRequiredBundles()
      })
  }
}
