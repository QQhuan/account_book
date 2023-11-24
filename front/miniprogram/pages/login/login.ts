// pages/login/login.ts
// import loginApi from '../../http/login/index'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cur: 0,
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
  user_login: function () {
    if(this.data.cur == 0) {
      // 测试请求
      wx.redirectTo({
        url: '../index/index'
      })
      return
      wx.cloud.callFunction({
        name: 'login', // 你的云函数名称
        data: {
          url: 'http://8.130.98.135:6666/account_book/user/login',
          info: "123456 123465"
        }
      }).then( (res)=>{
      // 请求成功
        console.log(res);
        
      }).catch( (res)=> {
      // 请求失败
        console.log(res);
      })
    } else {
      // 注册请求
      wx.cloud.callFunction({
        name: 'register', // 你的云函数名称
        data: {
          url: 'http://8.130.98.135:6666/account_book/user/register',
          data: JSON.stringify({
            userId: '',
            userName: '',
            wechatId: '',
            gender: '',
            introduction: '',
            headPortraitPath: '',
            totalDate: 0,
            totalAmount: 0,
            tel: '15521154941', password: '111'})
        }
      }).then( (res)=>{
      //请求成功
        console.log(res);
      }).catch( (res)=> {
      //请求失败
        console.log(res);
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
  onLoad() {},

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
