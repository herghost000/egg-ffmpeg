 +(function () {
  Date.prototype.format = function (fmt) {
    var o = {
      'M+': this.getMonth() + 1, // 月份
      'd+': this.getDate(), // 日
      'h+': this.getHours(), // 小时
      'm+': this.getMinutes(), // 分
      's+': this.getSeconds(), // 秒
      'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
      'S': this.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt
  };
  Array.prototype.forEach = function forEach(callback) {
    var len = this.length
    if (typeof callback !== 'function') {
      throw new TypeError()
    }
    var thisArg = arguments[1],
      flag = ''
    for (var i = 0; i < len; flag != 'pause' ? i++ : i) {
      if (i in this) {
        flag = callback.call(thisArg, this[i], i, this)
      }
    }
  }
  !Array.isArray && (Array.isArray = function (val) {
    return Object.prototype.toString.call(val) === '[object Array]'
  })
  !Number.isNumber && (Number.isNumber = function (val) {
    return Object.prototype.toString.call(val) === '[object Number]'
  })
  /* Number.prototype.toFixed = function(s) {
    var times = Math.pow(10,s)
    var des = this * times + 0.5
    des = parseInt(des, 10) / times
    return des
  } */
  !String.isString && (String.isString = function (val) {
    return Object.prototype.toString.call(val) === '[object String]'
  })
  !Object.isObject && (Object.isObject = function (val) {
    return Object.prototype.toString.call(val) === '[object Object]'
  })
  !Function.isFunction && (Function.isFunction = function (val) {
    return Object.prototype.toString.call(val) === '[object Function]'
  })
  !Object.isDOM && (
    Object.isDOM = (typeof HTMLElement === 'object')
    ? function (obj) {
        return obj instanceof HTMLElement
    }
    : function (obj) {
        return obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string'
    }
  )
  !Function.isFunction && (Function.isFunction = function (val) {
    return Object.prototype.toString.call(val) === '[object Function]'
  })
  !Object.isNotEmpty && (Object.isNotEmpty = function (val) {
    let ret = true
    if (String.isString(val) && val.trim().length == 0) {
      ret = false
    }
    if (String.isString(val) && val == 'NaN') {
      ret = false
    }
    if (val == undefined) {
      ret = false
    }
    if (val == null) {
      ret = false
    }
    if (Number.isNaN(val)) {
      ret = false
    }
    if (Number.isNumber(val) && !Number.isFinite(val)) {
      ret = false
    }
    if (Object.isObject(val)) {
      let f = false
      for (const i in val) {
        f = true
        break
      }
      ret = f
    }
    if (Array.isArray(val) && val.length == 0) {
      ret = false
    }
    return ret
  })
  !Object.isEmpty && (Object.isEmpty = function (val) {
    let ret = false
    if (String.isString(val) && val.trim().length == 0) {
      ret = true
    }
    if (String.isString(val) && val == 'NaN') {
      ret = true
    }
    if (val == undefined) {
      ret = true
    }
    if (val == null) {
      ret = true
    }
    if (Number.isNaN(val)) {
      ret = true
    }
    if (Number.isNumber(val) && !Number.isFinite(val)) {
      ret = true
    }
    if (Object.isObject(val)) {
      let f = true
      for (const i in val) {
        f = false
        break
      }
      ret = f
    }
    if (Array.isArray(val) && val.length == 0) {
      ret = true
    }
    return ret
  })
  !Object.rmNull && (Object.rmNull = function (obj) {
    for (const i in obj) {
      if (obj[i] == null) {
        obj[i] = {}
      } else if (Object.isObject(obj[i]) || Array.isArray(obj[i])) {
        Object.rmNull(obj[i])
      }
    }
  })
  // 定义assign方法
  !Object.assign && (Object.defineProperty(Object, 'assign', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function (target) { // assign方法的第一个参数
      'use strict'
      // 第一个参数为空，则抛错
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert first argument to object')
      }

      var to = Object(target)
      // 遍历剩余所有参数
      for (var i = 1; i < arguments.length; i++) {
        var nextSource = arguments[i]
        // 参数为空，则跳过，继续下一个
        if (nextSource === undefined || nextSource === null) {
          continue
        }
        nextSource = Object(nextSource)

        // 获取改参数的所有key值，并遍历
        var keysArray = Object.keys(nextSource)
        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
          var nextKey = keysArray[nextIndex]
          var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey)
          // 如果不为空且可枚举，则直接浅拷贝赋值
          if (desc !== undefined && desc.enumerable) {
            to[nextKey] = nextSource[nextKey]
          }
        }
      }
      return to
    }
  }))

  function getType(obj) {
    // tostring会返回对应不同的标签的构造函数
    var toString = Object.prototype.toString
    var map = {
      '[object Boolean]': 'boolean',
      '[object Number]': 'number',
      '[object String]': 'string',
      '[object Function]': 'function',
      '[object Array]': 'array',
      '[object Date]': 'date',
      '[object RegExp]': 'regExp',
      '[object Undefined]': 'undefined',
      '[object Null]': 'null',
      '[object Object]': 'object'
    }
    if (obj instanceof Element) {
      return 'element'
    }
    return map[toString.call(obj)]
  };
  !Object.deepClone && (Object.deepClone = function (data) {
    var type = getType(data)
    var obj
    if (type === 'array') {
      obj = []
    } else if (type === 'object') {
      obj = {}
    } else {
      // 不再具有下一层次
      return data
    }
    if (type === 'array') {
      for (var i = 0, len = data.length; i < len; i++) {
        obj.push(Object.deepClone(data[i]))
      }
    } else if (type === 'object') {
      if (data[Symbol.iterator]) {
        obj[Symbol.iterator] = data[Symbol.iterator]
      }
      for (var key in data) {
        obj[key] = Object.deepClone(data[key])
      }
    }
    return obj
  })
})()
