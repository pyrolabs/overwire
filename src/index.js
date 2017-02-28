import firebase from 'firebase'
import { isArray, isObject, map } from 'lodash'

let _cachedVendorBundle = null
let _head = document.getElementsByTagName('head')[0]
let _scripts = []

const determineRequiredBundles = () => {
  _cachedVendorBundle = localStorage.getItem('vendor-bundle')
  if (!_cachedVendorBundle) {
    _scripts.push(firebase.database().ref('/vendor-bundle').once('value'))
  }
  _scripts.push(firebase.database().ref('/app-bundle').once('value'))
}

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
        throw new Error('Miscalculated scripts')
      }
      _head.parentNode.insertBefore(s, _head)
    })
}

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
      for (key in scriptsUrlsArr) {
        s[key] = scriptsUrlsArr[key]
      }
    } else if (typeof scriptsUrlsArr === 'string') {
      s.src = scriptsUrlsArr
    } else {
      throw new Error('Script source undefined')
    }
    _head.parentNode.insertBefore(s, _head)
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
