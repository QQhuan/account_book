
const login = (tel:string, pwd:string) => {
  return wx.cloud.callFunction({
    name: 'login', // 云函数名称
    data: {
      url: 'http://8.130.98.135:6666/account_book/user/login',
      info: `${tel} ${pwd}`
    }
  })
}

const register = (data:object) => {
  return wx.cloud.callFunction({
    name: 'register', // 云函数名称
    data: {
      url: 'http://8.130.98.135:6666/account_book/user/register',
      info: data
    }
  })
}

export { login, register }