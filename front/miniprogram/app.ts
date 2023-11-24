// app.ts
import * as myFun from './utils/util'
// @ts-ignore
App<IAppOption>({
  globalData: {
    active: 0
  },
  onLaunch() {
    wx.cloud.init({
      env: "mycloudapi-3g0x3wlbb79ff164"
    })
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录--功能：如果有用户信息，那么直接登录跳转index，如果没有则显示登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  ...myFun
})
