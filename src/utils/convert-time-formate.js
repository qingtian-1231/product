/**
 * 将UTC时间字符转换为标准时间字符串输出
 */
function convertUTCTimeToLocalTime (UTCDataString, noTime = false) {
    let date = new Date(UTCDataString)
    let year = date.getFullYear()
    let month = formatFunc(date.getMonth() + 1)
    let day = formatFunc(date.getDate())
    let hour = date.getHours()
    let noon = hour >= 12 ? '下午' : '上午'
    hour = hour >= 12 ? hour - 12 : hour
    hour = formatFunc(hour)

    let min = formatFunc(date.getMinutes())
    return year + '年' + month + '月' + day + '日' + (noTime ? '' : noon + ' ' + hour + ':' + min)
}

/**
 * 将UTC时间字符转换为标准时间，如：1983.12.32 33:22
 */
function convertUTCTimeToLocalTimeShort (UTCDataString) {
    let date = new Date(UTCDataString)
    let year = date.getFullYear()
    let month = formatFunc(date.getMonth() + 1)
    let day = formatFunc(date.getDate())
    let hour = date.getHours()
    let min = formatFunc(date.getMinutes())
    return year + '.' + month + '.' + day + ' ' + hour + ':' + min
}

/**
 * 将UTC时间字符转换为多久时间之前的时间格式输出，当前设置小于两月则输出 **** 之前。大于两月输出完整格式
 */
function convertUTCTimeBeforeTime (UTCDataString, noTime = false) {
    let dateTime = new Date(UTCDataString)
    let now = new Date()
    let milliseconds = Date.parse(now.toDateString()) - dateTime.getTime()
    let timeSpanStr

    if (milliseconds <= 1000 * 60 * 1) {
        timeSpanStr = '刚刚'
    } else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
        timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前'
    } else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
        timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前'
    } else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 7) {
        timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前'
    } else if (1000 * 60 * 60 * 24 * 7 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 30) {
        timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24 * 7)) + '周前'
    } else if (1000 * 60 * 60 * 24 * 30 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 30 * 2) {
        timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24 * 30)) + '月前'
    } else {
        timeSpanStr = convertUTCTimeToLocalTime(UTCDataString, noTime)
    }
    return timeSpanStr
}

/**
 * 格式化日期中的数字
 * @param  {String} str
 * @return {String}            str
 */
function formatFunc (str) {
    return str > 9 ? str : '0' + str
}

export {
    convertUTCTimeToLocalTimeShort,
    convertUTCTimeBeforeTime,
    convertUTCTimeToLocalTime
}
