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
 * @description: 格式化日期的补零函数
 * @return "10 01 00:00:00"
 * @note 不导出
 */
const formatNumber = (n: number) => {
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
