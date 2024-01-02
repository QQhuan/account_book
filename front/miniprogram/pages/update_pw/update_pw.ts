// pages/update_pw/update_pw.ts
import {getUserInfo, updateUser} from '../../api/user/index'
Page({  
  data: {  
    currentPassword: '',  
    newPassword: '',
    confirmNewPassword: '',
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
  submitForm(){  
    console.log(this.data.newPassword)
    if(this.data.user.password != this.data.currentPassword) {
      // 原密码不对
      wx.showToast({
        title: "原密码错误！",
        icon: 'none'
      })
      return
    }
    if(this.data.user.password != this.data.confirmNewPassword) {
      // 密码不一致
      wx.showToast({
        title: "两次密码输入不一致！",
        icon: 'none'
      })
      return
    }
    let obj = this.data.user
    Object.assign(obj, {password: this.data.confirmNewPassword})
    this.setData({user:obj})
    this.updateUserInfo()
  },
  cpw(e:any) {
    this.setData({currentPassword: e.detail})
  },
  npw(e:any) {
    this.setData({newPassword: e.detail})
  },
  ccpw(e:any) {
    this.setData({confirmNewPassword: e.detail})
  },
  // 更新方法接口
  updateUserInfo(){
    updateUser(this.data.user).then((res:any) => {
      wx.showToast({title: res.result})
      this.loadUserInfo()
    })
  },
  loadUserInfo() {
    getUserInfo(wx.getStorageSync("userId")).then((d:any) => {
      wx.setStorageSync("user", d.result) // 更新缓存
      // 更新data
      this.setData({
        user:JSON.parse(d.result),
        currentPassword: '',  
        newPassword: '',
        confirmNewPassword: ''})
    })
  },
  onLoad(){
    this.loadUserInfo()
  },
  contact() {
    wx.navigateTo({url: "/pages/about/about"})
  }
})