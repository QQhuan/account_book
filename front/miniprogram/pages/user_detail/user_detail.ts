// pages/user_detail/user_detail.ts
import {getUserInfo, updateUser} from '../../api/user/index'
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
    myImage: '',
    
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
  uploadimg(){
    //声明this，这里面嵌套的太多，里面拿不到this
    let that = this
    wx.chooseImage({
      count: 1,
      success (res) {
      // tempFilePath可以作为img标签的src属性显示图片
      const tempFilePaths = res.tempFilePaths
      //获取到每张图片的名字
      const fileName=res.tempFilePaths[0].slice(11)
      wx.cloud.uploadFile({
      //这里拼接的字符串也可以使用模板字面量
      //cloudPath: `img/${fileName}.png`, 
          cloudPath: 'imgs/'+fileName+'.png', // 上传至云端的路径
          filePath: tempFilePaths[0], // 小程序临时文件路径
          success: res => {
            // 返回文件 ID
            let obj = that.data.user
            Object.assign(obj, {headPortraitPath:res.fileID})
            that.setData({user:obj})
            that.updateUserInfo()
          },
          fail: console.error
          })
          }
        })
  },
  confirm(e:any) {
    let obj = this.data.user
    Object.assign(obj, {gender: e.detail.value})
    this.setData({user: obj})
    this.updateUserInfo()
    this.onClose()
  },
  onClose() {
    this.setData({showGender: false})
  },
  onChange(e:any) {
    console.log(e)
  },
  updateUserInfo(){
    updateUser(this.data.user).then((res:any) => {
      console.log(res.result)
      wx.showToast({title: res.result})
      // getApp().globalData.user = Object.assign({}, this.data.user)
      // getApp().triggerListeners();
      this.loadUserInfo()
    })
  },
  updateName(){
    let that = this
    wx.showModal({
      title: "修改昵称",
      editable: true, // 显示输入框
      // @ts-ignore
      content: this.data.user.userName, // 显示输入框信息
      success: (res:any) => {
        if (res.confirm) { // 点击了确认
          // @ts-ignore
          // that.addAccountType(res.content)
          let obj = that.data.user
          Object.assign(obj, {userName:res.content})
          that.setData({user:obj})
          that.updateUserInfo()
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
      content: this.data.user.tel, // 显示输入框信息
      success: (res:any) => {
        if (res.confirm) { // 点击了确认
          let obj = that.data.user
          Object.assign(obj, {tel: res.content})
          that.setData({user: obj})
          that.updateUserInfo()
        } else {
          console.log('用户点击了取消')
        }
      }
    })
  },
  updateIntroduction(){
    let that = this
    wx.showModal({
      title: "修改个人简介",
      editable: true, // 显示输入框
      // @ts-ignore
      content: this.data.user.introduction, // 显示输入框信息
      success: (res:any) => {
        if (res.confirm) { // 点击了确认
          let obj = that.data.user
          Object.assign(obj, {introduction: res.content})
          that.setData({user: obj})
          that.updateUserInfo()
        } else {
          console.log('用户点击了取消')
        }
      }
    })
  },
  updateWechatId(){
    wx.navigateTo({url:"/pages/wechat_bind/wechat_bind"})
    return
    	// 登录
      wx.login({
        success: (res:any) => {
          // 发送 res.code 到后台换取 openId
          // 这里对请求操作进行封装，内部使用 wx.setStorageSync 实现了 token 的存储
          console.log(res.code)
        }
      })
  },
  updateGender(){
    this.setData({showGender: true})
  },
  loadAvatar(id:string) {
    const that = this
    wx.cloud.downloadFile({
      fileID: id, // 文件 ID
      success: res => {
        // 返回临时文件路径
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
    getUserInfo(wx.getStorageSync("userId")).then((d:any) => {
      wx.setStorageSync("user", d.result)
      const user = JSON.parse(d.result)
      this.loadAvatar(user.headPortraitPath) // 更新头像
      this.setData({user})
      console.log(user)
    })
  },
  logout() {
    wx.redirectTo({url:'/pages/login/login'})
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