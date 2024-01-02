// pages/wechat_bind/wechat_bind.ts
import {getUserInfo, updateUser} from '../../api/user/index'
import {getOpenId} from '../../api/login/index'
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    user: {
      gender: "",
      headPortraitPath: "",
      introduction: "",
      password: "111",
      tel: "1",
      totalAmount: 0,
      totalDate: 0,
      userId: "",
      userName: "",
      wechatId: "",
    }
  },
  onLoad() {
    this.loadUserInfo()
    // @ts-ignore
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e:any) {
    const that = this
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    // @ts-ignore
    wx.getUserProfile({
      desc: '仅用于绑定随手记小程序账号', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res:any) => {
        getOpenId().then((d:any)=>{
          const wechatId = d.result.openid
          let user = that.data.user
          Object.assign(user, {wechatId})
          that.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
            user
          })
          that.updateUserInfo()
        })
        
      }
    })
  },
  getUserInfo2(e:any) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  updateUserInfo(){
    updateUser(this.data.user).then((res:any) => {
      wx.showToast({title: res.result})
      this.loadUserInfo()
    })
  },
  loadUserInfo() {
    getUserInfo(wx.getStorageSync("userId")).then((d:any) => {
      wx.setStorageSync("user", d.result)
      const user = JSON.parse(d.result)
      this.setData({user})
    })
  },
})