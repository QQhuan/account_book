// pages/statistic/statistic.ts
import { getAccountAll as getAccountAllApi, getAccountByYear as getAccountByYearApi, getAccountByMonth as getAccountByMonthApi } from "../../api/account/index";
import { formatChinese, getweekday, formatDate } from "../../utils/util";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    period: 0,
    amtType: 1,
    xList: [],
    yList: [],
    chartList: [],
    originData:[],
    sum: 0,
    year: new Date().getFullYear(),
    month: new Date().getMonth()+1,
    monthList: [1,2,3,4,5,6,7,8,9,10,11,12],
    monthActive: new Date().getMonth()+1,
    yearList: [2023, 2024],
    yearActive: new Date().getFullYear(),
    hasData: true
  },
  
  // load数据
  load() {

  },
  // 周、月、年的change
  changePeriod(e:any){
    this.setData({
      period: e.detail.name
    })
    switch(e.detail.name) {
      case 0: 
        this.loadWeek()
        break
      case 1:
        this.selectComponent('#month').resize();
        this.getDataByMonth()
        break
      case 2:
        this.selectComponent('#year').resize();
        this.getDataByYear() 
        break
      default:
        this.loadWeek()
        break
    }
  },
  /// 收支修改
  changeIO(e:any) {
    switch(e.detail.title) {
      case "支出": 
        this.setData({
          amtType: 1
        })
        break
      case "收入":
        this.setData({
          amtType: 0
        })
        break
      default:
        this.setData({
          amtType: 1
        })
        break
    }
    if(this.data.period == 0)
      this.loadWeek()
    else if(this.data.period == 1)
      this.getDataByMonth()
    else
      this.getDataByYear()
  }, 
  /// 周获取数据，仅显示当前周
  // 加载个人所有账单
  getAccountAll() {
    return getAccountAllApi(wx.getStorageSync("userId")).then((res) => {
      const data = res.result
      this.setData({
        // @ts-ignore
        "originData": JSON.parse(data)
      })
      // @ts-ignore
      return (this.processData(JSON.parse(data)))
    })
  },
  // 预处理数据
  processData(data:any) {
    console.log(data)
    let accountList: ({ date: Date; output: number; input: number; weekday: string; } & { detail: any[]; })[] = []
    // @ts-ignore
    data = data.sort((a:any, b:any) => {return new Date(a.recordTime.replace(/\-/g,'\/'))-new Date(b.recordTime.replace(/\-/g,'\/'))})
    let set = new Set()
    for(let i = 0; i < data.length; i++) {
      if(set.has(i)) {
        continue
      }
      const item = data[i];
      const datetime = item.recordTime
      const detail: any[] = []
      detail.push(item)
      set.add(i)
      let accountObj = {
        date: formatChinese(datetime, 'md'),
        output: 0,
        input: 0,
        weekday: getweekday(datetime)
      }
      for(let j = i+1; j < data.length; j++) {
        if(set.has(j)) {
          continue
        }
        if(datetime == data[j].recordTime) {
          detail.push(data[j])
          set.add(j)
        }
      }
      // 统计总收入、总支出
      detail.forEach((item:any) => {
        if(item.incomeOrExpenditureType == 0) {
          // 收入
          accountObj.input += item.amount
        } else {
          // 支出
          accountObj.output += item.amount
        }
      })
      // @ts-ignore
      accountList.push(Object.assign(accountObj, {'detail': detail}))
    }
    return accountList
  },
  // 周获取
  loadWeek() {
    this.getAccountAll().then((res:any) => {
      const data = res
      console.log(data)
      const dateArr = []
      const moneyArr = []
      // 获取当前日期  
      let currentDate = new Date();  
      // 计算当前日期所在周的起始时间  
      let weekStart = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1))
      weekStart.setHours(0);  // 设置小时  
      weekStart.setMinutes(0); // 设置分钟  
      weekStart.setSeconds(0);  // 设置秒
      // 计算当前日期所在周的结束时间  
      let weekEnd = new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000) // 下周的星期日 
      weekEnd.setHours(23);  // 设置小时  
      weekEnd.setMinutes(0); // 设置分钟  
      weekEnd.setSeconds(0);  // 设置秒 
      for(let i = 0; i < 7; i++) {
        let day = new Date(weekEnd.getTime() - i*24 * 60 * 60 * 1000)
        let m = day.getMonth()+1
        let d = day.getDate()
        let datetime = `${m}.${d}`
        let kmp = `${m}月${d}日`
        dateArr.unshift(datetime)
        let flag = 0
        for(let j = 0; j < data.length; j++) {
          if(kmp == data[j].date) {
            flag = 1
            if(this.data.amtType == 1) {
              moneyArr.unshift(data[j].output)
            } else {
              moneyArr.unshift(data[j].input)
            }
          }
        }
        if(flag == 0) {
          moneyArr.unshift(0)
        }
      }
      let sum = 0
      moneyArr.forEach((ele:any) => {
        sum += Number(ele)
      })
      // 从all原始数据获取分类的数据
      const list:any = this.data.originData.filter((val:any) => {
        const curDate = new Date(val.recordTime)
        return new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate(), 23,59,59).getTime() >= weekStart.getTime() && new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate(), 1,0,0).getTime()  <= weekEnd.getTime() && val.incomeOrExpenditureType == this.data.amtType
      })
      const map:Map<string, number> = new Map()
      for(let i = 0; i < list.length; i++) {
        if(map.has(list[i].accountTypeName)) {
          let n = map.get(list[i].accountTypeName)
          n += list[i].amount
          map.set(list[i].accountTypeName, n as number)
        } else {
          map.set(list[i].accountTypeName, list[i].amount)
        }
      }
      const list2:any = []
      map.forEach((val:number, key:string) => {
        list2.push({
          // @ts-ignore
          percent: `${(val/sum).toFixed(5)*100}`,
          count: val,
          TypeName: key
        })
      })
      list2?.sort((a:any, b:any) => b.percent-a.percent)
      // 更新lineChart表数据
      this.setData({
        // @ts-ignore
        "xList": dateArr,
        // @ts-ignore
        "yList": moneyArr,
        // @ts-ignore
        "chartList": list2,
        "sum": sum
      })
      if(list.length == 0) {
        this.shadeData()
      } else {
        this.showData()
      }
    })
  },
  // 是否显示empty
  shadeData(){
    this.setData({
      "hasData": false
    })
  },
  showData() {
    this.setData({
      "hasData": true
    })
  },
  // 月份修改，重新请求数据
  changeMonth(e:any) {
    this.setData({
      "month": Number(e.detail.name)
    })
    this.getDataByMonth()
  },
  getDataByMonth() {
    console.log(this.data.year, this.data.month, this.data.amtType)
    getAccountByMonthApi(wx.getStorageSync("userId"), this.data.year, this.data.month, this.data.amtType).then((res:any) => {
      this.reshapeData(res)
    })
  },

  // 年change
  changeYear(e:any) {
    this.setData({
      "year": Number(e.detail.name)
    })
    this.getDataByYear()
  },
  getDataByYear() {
    console.log(this.data.year, this.data.amtType)
    getAccountByYearApi(wx.getStorageSync("userId"), this.data.year, this.data.amtType).then((res:any) => {
      this.reshapeData(res, 'y')
    })
  },

  // 数据加工
  reshapeData(res:any, period:string='month') {
    const data = JSON.parse(res.result)
    console.log(data)
    let time = Object.keys(data?.time?data.time:{}) || []
    const yVal:number[] = []
    for(const ele in data?.time){
      yVal.push(data?.time[ele])
    }
    // 年月的数据不太一样
    if(period == 'month')
      time = time.map((item:any) => {
        return formatDate(item, '.')
      })
    console.log(time, yVal)
    this.setData({
      // @ts-ignore
      "xList": time,
      // @ts-ignore
      "yList": yVal
    })
    
    const type = data?.type || {}
    const list = []
    let sum = 0
    for(let name in type) 
      sum += Number(type[name])
    for(let name in type) {
      console.log(name, type[name])
      list.push({
        // @ts-ignore
        percent: `${(type[name]/sum).toFixed(5)*100}`,
        count: type[name],
        TypeName: name
      })
    }
    list.sort((a:any, b:any) => b.percent-a.percent)
      this.setData({
        // @ts-ignore
        "chartList": list,
        "sum": sum
      })
      if(list.length == 0) {
        this.shadeData()
      } else {
        this.showData()
      }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.loadWeek()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getTabBar().init()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {}
})
