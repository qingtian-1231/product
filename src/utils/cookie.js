// 获取cookie
export function getCookie (cName) {
    let cStart, cEnd
    if (document.cookie.length > 0) {
        cStart = document.cookie.indexOf(cName + '=')
        if (cStart !== -1) {
            cStart = cStart + cName.length + 1
            cEnd = document.cookie.indexOf(';', cStart)
            if (cEnd === -1) {
                cEnd = document.cookie.length
            }
            return unescape(document.cookie.substring(cStart, cEnd))
        }
    }
    return ''
}

// 设置cookie,增加到vue实例方便全局调用
export function setCookie (cName, value, expireTime, path) {
    let now = new Date()
    let expireDate = new Date(now.getTime() + expireTime)
    if (path) {
        document.cookie = cName + '=' + escape(value) + ((expireTime == null) ? '' : ';expires=' + expireDate.toUTCString()) + ';path=' + path
    } else {
        document.cookie = cName + '=' + escape(value) + ((expireTime == null) ? '' : ';expires=' + expireDate.toUTCString())
    }
}

// 删除cookie
export function delCookie (name, path) {
    setCookie(name, '', -1, path)
}
