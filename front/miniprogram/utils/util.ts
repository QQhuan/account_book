/**
 * @description: 格式化日期
 * @return eg:"2023/10/01 00:00:00"
 */
export const formatTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

/**
 * @description: 格式化日期
 * @return eg:"2023/10/01 00:00:00"
 */
export const formatTime2 = (date: string) => {
  const [year, month, day] = date.split('-')
  return [year, month, day].map(formatNumber).join('-')
}
// 获取月日
export const formatDate = (d: Date | string, ch:string) => {
  const date = new Date(d)
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [month, day].join(ch)
}

/**
 * @description: 格式化日期
 * @return eg:"2023/10/01 00:00:00"
 */
export const formatChinese = (date1: Date, type: string) => {
  let date = new Date(date1)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()

  let res = ''
  if(type == 'ym') {
    res = `${year}月${month}日`
  } else if(type == 'ymd') {
    res = `${year}年${month}月${day}日`
  } else if(type == 'md') {
    res = `${month}月${day}日`
  } else if(type == 'mdh') {
    res = `${year}年${month}月${day}日 ${hour}时${minute}分`
  }

  return res
}

/**
 * @description: 格式化日期的补零函数
 * @return "10 01 00:00:00"
 * @note 不导出
 */
const formatNumber = (n: number|string) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}

/**
 * @description: 页面跳转
 * @return null
 */
export const switchTab = (url: string) => {
  wx.switchTab({ url })
}
export const navigate = (url: string) => {
  wx.navigateTo({ url })
}
export const relaunch = (url: string) => {
  wx.reLaunch({ url })
}
export const redirect = (url: string) => {
  wx.redirectTo({ url })
}

/**
 * @description: 确认或者取消框
 * @return null
 */
export const showModal = (title: string, content: string | any, success: any, fail: any) => {
  wx.showModal({
    title,
    content,
    showCancel: true,
    success(res) {
      if (res.confirm) {
        if (success) {
          success()
        }
      } else if (res.cancel) {
        if (fail) {
          fail()
        }
      }
    }
  })
}

export const getweekday = (date: string) => {
  var weekArray = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
  var week = weekArray[new Date(date.replace(/\-/g,'\/')).getDay()]; // 注意此处必须是先new一个Date
  return week;
}