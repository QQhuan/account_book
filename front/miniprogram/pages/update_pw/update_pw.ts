// pages/update_pw/update_pw.ts
Page({  
  data: {  
    currentPassword: '',  
    newPassword: '',
    confirmNewPassword: ''
  },  
  submitForm(){  
    console.log(this.data.newPassword)
    if(this.data.newPassword != this.data.confirmNewPassword) {
      // 密码不一致
      wx.showToast({
        title: "两次密码输入不一致！",
        icon: 'none'
      })
      return
    }
  },
  cpw(e:any) {
    this.setData({currentPassword: e.detail})
  },
  npw(e:any) {
    this.setData({newPassword: e.detail})
  },
  ccpw(e:any) {
    this.setData({confirmNewPassword: e.detail})
  }
})