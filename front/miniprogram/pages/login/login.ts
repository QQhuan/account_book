// pages/login/login.ts
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
    wx.redirectTo({
      url: '../index/index'
    })
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
