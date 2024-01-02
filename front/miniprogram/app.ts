// app.ts
import * as myFun from './utils/util'
// @ts-ignore
App<IAppOption>({
  globalData: {
    active: 0,
    user: null,
    listeners: []
  },
  // // 注册监听器函数的方法
  // registerListener: function (listener:Function) {
  //   this.globalData.listeners.push(listener);
  // },
  // // 触发监听器函数的方法
  // triggerListeners: function () {
  //   var listeners = this.globalData.listeners;
  //   for (var i = 0; i < listeners.length; i++) {
  //     listeners[i]();
  //   }
  // },
  onLaunch() {
    wx.cloud.init({
      env: "cloud1-5g7ba78a12ce91dc"
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
