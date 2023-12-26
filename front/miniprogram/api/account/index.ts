const addAccount = (myData:any) => {
  return wx.cloud.callFunction({
    name: 'addAccount', // 云函数名称
    data: {
      url: 'http://8.130.98.135:6666/account_book/account/add',
      info: myData
    }
  })
}
export { addAccount }