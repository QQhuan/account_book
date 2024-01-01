// pages/userinfo/userinfo.ts
Page({
  /**
   * 页面的初始数据
   */
  data: {
    active: 2,
    bg_path: '', // 'cloud://cloud1-5g7ba78a12ce91dc.636c-cloud1-5g7ba78a12ce91dc-1323393116/imgs/4EWa9Npu1dK6af5fc0e081abce05e35263c9914cffc6.png.png'
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
  loadAvatar(id:string) {
    const that = this
    wx.cloud.downloadFile({
      fileID: id, // 文件 ID
      success: res => {
        // 返回临时文件路径
        console.log(res.tempFilePath)
        that.setData({bg_path: res.tempFilePath})
      },
      fail: console.error
    })
  },
  // 用户信息详细
  lookUserInfo() {
    wx.navigateTo({url: '/pages/user_detail/user_detail'})
  },
  loadUserInfo() {
    const user = JSON.parse(wx.getStorageSync("user"))
    this.setData({user})
    console.log(user)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.loadUserInfo()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getTabBar().init()
  },

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
