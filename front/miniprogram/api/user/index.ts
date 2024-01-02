
const getUserInfo = (id:string) => {
  return wx.cloud.callFunction({
    name: 'getUserInfo', // 云函数名称
    data: {
      url: 'http://8.130.98.135:6666/account_book/user/get_user_by_id',
      info: `${id}`
    }
  })
}


const updateUser = (data:Object) => {
  return wx.cloud.callFunction({
    name: 'updateUser', // 云函数名称
    data: {
      url: 'http://8.130.98.135:6666/account_book/user/update',
      info: data
    }
  })
}


export { getUserInfo, updateUser }