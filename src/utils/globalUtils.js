import $ from 'jquery'

var globalUtils

const debounce = (func, wait) => {
  let timeout = '';
  return (v) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(v);
    }, wait);
  }
}

globalUtils = {
  formatBasicAuth: function (userName, password) {
    var basicAuthCredential = userName + ":" + password;
    var bace64 =  btoa(basicAuthCredential);
    return 'Basic ' + bace64;
  },

  noElementInArray: function (arr, obj, key) {
    let noElement = true
    arr.forEach(item => {
      if (item[key] === obj[key]) {
        noElement = false
      }
    })
    return noElement
  },

  findElementInArray: function (arr, value, key) {
    return arr.find(function (item) {
      return item[key] === value
    })
  },

  findParentTid: function (arr, value) {
    let return_item = {}
    arr.forEach(item => {
      if (item.tid == value) {
        return_item = item
      }

      if (item.children_ids.indexOf(value) !== -1) {
        return_item = item
      }
    })

    return return_item
  },

  /**
   * append a CSS file dynamically just once
   */
  loadCss: function loadCss (url) {
    if ($(`link[src="${url}"]`).length === 0) {
      let css = document.createElement('link')
      css.rel = 'stylesheet'
      css.href = url
      css.type = 'text/css'
      document.head.appendChild(css)
    }
  },
}

export { globalUtils, debounce }
