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
    let return_item
    let self = this
    arr.forEach(item => {

      // 如果自己就是父亲层级就返回自己
      if (item.tid === value) {
        return_item = item
      }

      if (item.children_ids.indexOf(value) !== -1) {
        return_item = item
      }

      if (item.children.length > 0 && !return_item) {
        return_item = self.findParentTid(item.children, value)
      }
    })

    return return_item
  },

  findProductParentItem: function (arr, parentId) {
    let return_item
    let self = this

    arr.forEach(item => {
      if (item.tid === parentId) {
        return_item = item
      }

      if (!return_item) {
        return_item = self.findProductParentItem(item.children, parentId)
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
