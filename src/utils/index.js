const hexList = []
for (let i = 0; i <= 15; i++) {
  hexList[i] = i.toString(16)
}

class utils {
  /**
   *
   * 时间戳转换日期
   *
   * @param {String} value 传入的时间戳
   * @param {String} String 返回的时间
   */
  formatDate(value) {
    let date = new Date(value)
    let y = date.getFullYear()
    let MM = date.getMonth() + 1
    MM = MM < 10 ? '0' + MM : MM
    let d = date.getDate()
    d = d < 10 ? '0' + d : d
    let h = date.getHours()
    h = h < 10 ? '0' + h : h
    let m = date.getMinutes()
    m = m < 10 ? '0' + m : m
    let s = date.getSeconds()
    s = s < 10 ? '0' + s : s
    return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s
  }

  /**
   * 循环对象
   *
   * @param {Object|Array} obj 传入的值
   * @param {Function} fn 为每个项调用的回调
   */
  forEach(obj, fn) {
    if (obj === null || typeof obj === 'undefined') return

    // 如果还没有可写的东西，就强制一个数组
    if (typeof obj !== 'object') obj = [obj]

    if (this.isArray(obj)) {
      // 数组循环
      for (var i = 0, l = obj.length; i < l; i++) {
        fn.call(null, obj[i], i, obj)
      }
    } else {
      // 对象循环
      for (var key in obj) {
        /* 是否具有键 */
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          fn.call(null, obj[key], key, obj)
        }
      }
    }
  }

  /**
   * 确定值是否为数组
   *
   * @param {Object} val 传入的值
   * @returns {boolean} 如果值是数组，则为True，否则为false
   */
  isArray(val) {
    return Object.prototype.toString.call(val) === '[object Array]'
  }

  /**
   * 确定值是否为对象
   *
   * @param {Object} obj 传入的对象
   * @returns {String} 返回类型
   */
  getObjClass(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1)
  }

  /**
   * 深度克隆
   *
   * @param {Object} obj 传入需要克隆的对象
   * @returns {Object} 返回克隆好的对象
   */
  deepClone(obj) {
    let result
    let objClass = this.getObjClass(obj)

    if (objClass === 'Object') {
      result = {}
    } else if (objClass === 'Array') {
      result = []
    } else {
      return obj // 如果是其他数据类型不复制，直接将数据返回
    }

    // 遍历目标对象
    for (let key in obj) {
      let value = obj[key]
      result[key] = this.deepClone(value)
    }

    return result
  }


  /**
   * 递归合并两个对象
   *
   * @param {*} target
   * @param {*} sources
   * @return {*}
   * @memberof Common
   */
  assiginObj(target, sources) {
    let obj = target
    if (typeof target != 'object' || typeof sources != 'object' || typeof target) {
      return sources // 如果其中一个不是对象 就返回sources
    }
    for (let key in sources) {
      if (target.hasOwnProperty(key)) {
        obj[key] = this.assiginObj(target[key], sources[key])
      } else {
        // 不存在就直接添加
        obj[key] = sources[key]
      }
    }
    return obj
  }


  /**
 * 对象数组去重
 * @param {any} array:数组
 * @param {any} key:去重字段
 */
  arrayToDistinct(array, key) {
    let newArr = []
    array.forEach(item => {
      const model = newArr.find(arrModel => arrModel[key] === item[key]) || false;
      if (!model) {
        newArr.push(item);
      }
    })
    return newArr
  }

  /**
 * 单层数组不同数据类型去重
 * @param {any} array:数组
 * @param {any} type:输出srting或者number
 */
  stringNumberArrayDistinct(array, type = 'number') {
    let newArr = []
    array.forEach(item => {
      if (type == 'number') {
        if (!newArr.includes(Number(item))) {
          newArr.push(Number(item))
        }
      }
      if (type == 'string') {
        if (!newArr.includes(item.toString())) {
          newArr.push(item.toString())
        }
      }
    })
    return newArr
  }




  /**
 * 加载网络css文件
 * @param url css资源url
 */
  loadCss(url) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = url
    link.crossOrigin = 'anonymous'
    document.getElementsByTagName('head')[0].appendChild(link)
  }

  /**
  * 加载网络js文件
  * @param url js资源url
  */
  loadJs(url) {
    const link = document.createElement('script')
    link.src = url
    document.body.appendChild(link)
  }


  /**
 * 生成随机数
 * @param min 最小值
 * @param max 最大值
 * @returns 生成的随机数
 */
  randomNum(min, max) {
    switch (arguments.length) {
      case 1:
        return parseInt((Math.random() * min + 1).toString(), 10)
        break
      case 2:
        return parseInt((Math.random() * (max - min + 1) + min).toString(), 10)
        break
      default:
        return 0
        break
    }
  }

  /**
 * 生成全球唯一标识
 * @returns uuid
 */
  uuid() {
    let uuid = ''
    for (let i = 1; i <= 36; i++) {
      if (i === 9 || i === 14 || i === 19 || i === 24) {
        uuid += '-'
      } else if (i === 15) {
        uuid += 4
      } else if (i === 20) {
        uuid += hexList[(Math.random() * 4) | 8]
      } else {
        uuid += hexList[(Math.random() * 16) | 0]
      }
    }
    return uuid
  }


}

export default new utils()
