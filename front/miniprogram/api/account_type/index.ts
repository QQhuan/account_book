const getAllType = () => {
  return wx.cloud.callFunction({
    name: 'getAllType', // 云函数名称
    data: {
      url: 'http://8.130.98.135:6666/account_book/account_type/get_all',
      info: ''
    }
  })
}
export { getAllType }