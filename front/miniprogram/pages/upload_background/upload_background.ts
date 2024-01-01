// pages/upload_background/upload_background.ts
Page({
  data: {
    myImage: '',
    selctedimg:'',
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
            console.log(res.fileID)
            _that.setData({
                selctedimg: res.fileID,
                myImage: res.fileID
            })
            wx.setStorageSync("bg", res.fileID)
          },
          fail: console.error
          })
          }
        })
  },
  onLoad() {
    const path = wx.getStorageSync("bg")
    this.setData({
      myImage: path
    })
  }
})