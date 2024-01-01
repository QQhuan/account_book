const addAccount = (myData:any) => {
  return wx.cloud.callFunction({
    name: 'addAccount', // 云函数名称
    data: {
      url: 'http://8.130.98.135:6666/account_book/account/add',
      info: myData
    }
  })
}
const getAccountAll = (userId:string) => {
  return wx.cloud.callFunction({
    name: 'getAccountAll', // 云函数名称
    data: {
      url: 'http://8.130.98.135:6666/account_book/account/get_all',
      info: userId
    }
  })
}

const delAccount = (id:string) => {
  return wx.cloud.callFunction({
    name: 'delAccount', // 云函数名称
    data: {
      url: 'http://8.130.98.135:6666/account_book/account/delete',
      info: id
    }
  })
}

// 参数：用户id 年份 月份 支出or收入
const getAccountByMonth = (uid:string, year:number, month:number, io:number) => {
  return wx.cloud.callFunction({
    name: 'delAccount', // 云函数名称
    data: {
      url: 'http://8.130.98.135:6666/account_book/account/get_by_month',
      info: `${uid} ${year} ${month} ${io}`
    }
  })
}

// 参数：用户id 年份 月份 支出or收入
const getAccountByYear = (uid:string, year:number, io:number) => {
  return wx.cloud.callFunction({
    name: 'delAccount', // 云函数名称
    data: {
      url: 'http://8.130.98.135:6666/account_book/account/get_by_year',
      info: `${uid} ${year} ${io}`
    }
  })
}

export { addAccount, getAccountAll, delAccount, getAccountByMonth, getAccountByYear }