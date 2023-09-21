// index.ts
// 获取应用实例
const app = getApp()

Page({
  data: {
    active: 0
  },
  onChange(event: any) {
    this.setData({ active: event.detail })
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    // @ts-ignore
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  }
})
