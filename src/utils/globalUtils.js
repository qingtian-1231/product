var globalUtils

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
  }
}

export { globalUtils }
