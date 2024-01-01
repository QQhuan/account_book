
const getUserInfo = (id:string) => {
  return wx.cloud.callFunction({
    name: 'getUserInfo', // 云函数名称
    data: {
      url: 'http://8.130.98.135:6666/account_book/user/get_user_by_id',
      info: `${id}`
    }
  })
}

export { getUserInfo }