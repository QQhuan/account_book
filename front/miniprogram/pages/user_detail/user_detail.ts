// pages/user_detail/user_detail.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "空腹不能吃饭",
    showGender: false,
    columns: ['男', '女', '其他'],
    onChange: 0,
    phone: '4564679',
    gender: '男',
    myImage: ''
  },
  uploadimg(){
    //声明this，这里面嵌套的太多，里面拿不到this
    let _that = this

    wx.chooseImage({
      count: 1,
      success (res) {
      // tempFilePath可以作为img标签的src属性显示图片
      const tempFilePaths = res.tempFilePaths
      //获取到每张图片的名字
      const fileName=res.tempFilePaths[0].slice(11)
      // console.log(res.tempFilePaths[0])
      //console.log(res.tempFilePaths[0].slice(11))
      wx.cloud.uploadFile({
      //这里拼接的字符串也可以使用模板字面量
      //cloudPath: `img/${fileName}.png`, 
          cloudPath: 'imgs/'+fileName+'.png', // 上传至云端的路径
          filePath: tempFilePaths[0], // 小程序临时文件路径
          success: res => {
            // 返回文件 ID
            console.log(res)
            _that.setData({
                myImage: res.fileID
            })
            wx.setStorageSync("bg", res.fileID)
          },
          fail: console.error
          })
          }
        })
  },
  confirm(e:any) {
    console.log(e.detail.value)
    this.setData({gender: e.detail.value})
    this.onClose()
  },
  onClose() {
    this.setData({showGender: false})
  },
  onChange(e:any) {
    console.log(e)
  },
  updateName(){
    let that = this
    wx.showModal({
      title: "修改昵称",
      editable: true, // 显示输入框
      // @ts-ignore
      content: this.data.name, // 显示输入框信息
      success: (res:any) => {
        if (res.confirm) { // 点击了确认
          // @ts-ignore
          // that.addAccountType(res.content)
          that.setData({
            name: res.content
          })
        } else {
          console.log('用户点击了取消')
        }
      }
    })
  },
  updatePhone(){
    let that = this
    wx.showModal({
      title: "修改手机号码",
      editable: true, // 显示输入框
      // @ts-ignore
      content: this.data.phone, // 显示输入框信息
      success: (res:any) => {
        if (res.confirm) { // 点击了确认
          // @ts-ignore
          // that.addAccountType(res.content)
          that.setData({
            phone: res.content
          })
        } else {
          console.log('用户点击了取消')
        }
      }
    })
  },
  updateGender(){
    this.setData({showGender: true})
    return
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})