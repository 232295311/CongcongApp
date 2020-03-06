import Vue from 'vue'

// 金额数据处理
// @param value 调用过滤器时，调用的文本
Vue.filter('priceValue', function (value) {
  // 如果文本不存在，返回空字符
  if (!value) {
    return '0.00'
  }

  // 文本转化为float
  let result = parseFloat(value)

  // 如果文本为Integer类型的文本,表示当前文本没有小数
  if (Number.isInteger(result)) {
    return result
  }

  // 文本包含小数，result.toFixed(2)
  return result.toFixed(2)
})

// 时间过滤器
Vue.filter('filterTime', function (value) {
  if (!value) {
    return ''
  }
  //   如果不是一个时间表达格式就原样返回
  if (value.indexOf(':') === -1) {
    return value
  }

  let result = ''
  //   arr[0]对应小时
  //   arr[1]对应分钟
  //   arr[2]对应秒
  const arr = value.split(':')

  // 小时
  if (parseInt(arr[0]) < 10) {
    result = '0' + arr[0]
  } else {
    result = arr[0]
  }

  // 分
  if (parseInt(arr[1]) < 10) {
    result = result + ':0' + arr[1]
  } else {
    result = result + ':' + arr[1]
  }

  // 秒
  if (parseInt(arr[2]) < 10) {
    result = result + ':0' + arr[2]
  } else {
    result = result + ':' + arr[2]
  }
  return result
})
