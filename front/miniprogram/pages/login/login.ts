// pages/login/login.ts

import { login, register, loginByWechat } from "../../api/login/index";
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
import {getOpenId} from '../../api/login/index'
// import loginApi from '../../http/login/index'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    canIUseGetUserProfile: false, // 用于向前兼容
    cur: 0,
    telPhone: '',
    pwd: '',
    bg_url: '../../utils/imgs/login/login_default_bg.png'
  },

  // 切换登录注册的数据控制
  changeCur: function () {
    if (this.data.cur == 0) {
      this.setData({ cur: 1 })
    } else {
      this.setData({ cur: 0 })
    }
  },
  onShowTel() {
    Dialog.alert({
      message: '客服电话\n400-880-9800\n服务时间：工作日(10:00-11:30 14:30-17:00)',
      theme: 'round-button',
    }).then(() => {
      // on close
    });
  },
  user_login: function () {
    if(this.data.cur == 0) {
      login(this.data.telPhone, this.data.pwd).then( (res)=>{
        // 请求成功
        if(res.result == '账户不存在' || res.result == '密码错误'){
          wx.showToast({title: res.result, icon: 'none'})
          return
        }
        console.log(res);
        wx.setStorageSync('userId', res.result) // 本地存储用户ID
        wx.redirectTo({
          url: '../index/index'
        })
      }).catch( (res)=> {
      // 请求失败
        console.log(res);
      })
    } else {
      let data = {
        // "userId": '',
        "userName": '',
        "wechatId": '',
        "gender": '',
        "introduction": '',
        "headPortraitPath": '',
        "totalDate": 0,
        "totalAmount": 0,
        "tel": this.data.telPhone,
        "password":  this.data.pwd
      }
      console.log(data)
      register(data).then((res:any) => {
        wx.showToast({title: res.result, mask: true})
      })
    }
    	 

      // wx.request({
      //   url: 'http://8.130.98.135:6666/account_book/user/login', // 仅为示例，并非真实的接口地址
      //   data: "123456 123456",
      //   method: 'POST',
      //   header: {
      //     'content-type': 'application/json' // 默认值
      //   },
      //   success (res) {
      //     console.log(res.data)
      //   }
      // })
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    wx.clearStorageSync() // 清除用户信息
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
      desc: '仅用于登录随手记小程序账号', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: () => {
        getOpenId().then((d:any)=>{
          const wechatId = d.result.openid
          loginByWechat(wechatId).then((da:any)=>{
            console.log(da)
            wx.setStorageSync('userId', da.result) // 本地存储用户ID
            wx.redirectTo({
              url: '../index/index'
            })
          })
        })
      }
    })
  },
  wxLogin: function() {
    console.log("cannot")
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {}
})
