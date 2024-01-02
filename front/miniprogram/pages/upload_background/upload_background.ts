// pages/upload_background/upload_background.ts
import {getUserInfo, updateUser} from '../../api/user/index'
Page({
  data: {
    myImage: '',
    selctedimg:'',
    bg_path: '', // 'cloud://cloud1-5g7ba78a12ce91dc.636c-cloud1-5g7ba78a12ce91dc-1323393116/imgs/4EWa9Npu1dK6af5fc0e081abce05e35263c9914cffc6.png.png'
    user: {
      gender: "",
      backgroundPath: '',
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
      const fileName = res.tempFilePaths[0].slice(11)
      // console.log(res.tempFilePaths[0])
      //console.log(res.tempFilePaths[0].slice(11))
      wx.cloud.uploadFile({
      //这里拼接的字符串也可以使用模板字面量
      //cloudPath: `img/${fileName}.png`, 
          cloudPath: 'imgs/'+fileName+'.png', // 上传至云端的路径
          filePath: tempFilePaths[0], // 小程序临时文件路径
          success: res => {
            // 返回文件 ID
            let obj = that.data.user
            Object.assign(obj, {backgroundPath:res.fileID})
            that.setData({user:obj})
            that.updateUserInfo()
          },
          fail: console.error
          })
          }
        })
  },
  loadBg(id:string) {
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
  loadUserInfo() {
    getUserInfo(wx.getStorageSync("userId")).then((d:any) => {
      wx.setStorageSync("user", d.result)
      const user = JSON.parse(d.result)
      this.loadBg(user.backgroundPath) // 更新bg
      this.setData({user})
    })
  },
  updateUserInfo(){
    updateUser(this.data.user).then((res:any) => {
      console.log(res.result)
      wx.showToast({title: res.result})
      this.loadUserInfo()
    })
  },
  onLoad() {
    this.loadUserInfo()
  }
})