// pages/detail/detail.ts
import { formatChinese, getweekday } from "../../utils/util";
import { addAccount as addAccountApi, getAccountAll as getAccountAllApi, getAccountByYear as getAccountByYearApi, getAccountByMonth as getAccountByMonthApi } from "../../api/account/index";
import { getAllType as getAllTypeApi } from "../../api/account_type/index";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    incomeAccounts: [], // 收入类型
    expenditureAccounts: [], // 支出
    income_or_expenditure_type: '',

    // 账单数据
    accountList: [], //  传给detail-card组件的数据
    // 界面展示的类型，默认展示全部
    typeId: '',
    // 界面展示的月份，默认当前月份
    currentMonth: new Date().getMonth()+1,
    // 年份
    currentYear: new Date().getFullYear(),

    /// 引入, 新增账单相关数据
    typePlateShow: false, // 分类面板
    account_type_id: '', // 新增or修改时的分类id
    activeType:false,
    detail:'', // 备注
    amount:'0.00',
    today:'', // 今天日期
    record_time:'', // 选择的日期
    editFlag:false, // 未修改
    remarkArr:{}, // 备注列表
    selectTypeRemarks:[], // 选中类型的remark列表
  },

  

  addAccount() {
    let typeName = ''
    if(this.data.income_or_expenditure_type == '0') {
      this.data.incomeAccounts.forEach((element:{accountTypeId:string, accountTypeName:string}) => {
        if(element.accountTypeId == this.data.account_type_id) {
          typeName = element.accountTypeName
        }
      })
    } else {
      this.data.expenditureAccounts.forEach((element:{accountTypeId:string, accountTypeName:string}) => {
        if(element.accountTypeId == this.data.account_type_id) {
          typeName = element.accountTypeName
        }
      })
    }
    let data = {
      "recordTime": this.data.record_time,
      "detail": this.data.detail,
      "amount": this.data.amount,
      "incomeOrExpenditureType": this.data.income_or_expenditure_type,
      "accountTypeId": this.data.account_type_id,
      //"accountTypeName": typeName,
      "userId": wx.getStorageSync("userId")
    }
    console.log(data)
    addAccountApi(data).then((res:any) => {
      console.log(res.result)
      // 成功通知
      // Notify({ type: 'success', message: "记账成功！"})
      wx.showToast({title: '记账成功！'})
      let that = this
      that.onAddClose()
      that.getAccountAll()
    })
  },
  // add的时候分类选择
  changeType(e:any) {
    this.setData({"account_type_id": e.target.dataset.id})
    this.setData({"income_or_expenditure_type": e.target.dataset.income})
    this.onPlateClose()  // 关闭分类面板
    this.openPlateAdd()  // 打开输入数据面板
  },
  // 面板开关
  onPlateClose() {
    this.setData({ typePlateShow: false })
    this.getTabBar().setData({
      show: true
    })
  },
  openPlatePicker() {
    this.setData({ typePlateShow: true })
    this.getTabBar().setData({
      show: false
    })
  },
  // add面板开关
  // 面板开关
  onAddClose() {
    this.setData({ activeType: false })
    this.getTabBar().setData({
      show: true
    })
  },
  openPlateAdd() {
    this.setData({ activeType: true })
    this.getTabBar().setData({
      show: false
    })
  },

  // 键盘操作函数
  initDate(){ // 初始化日期
    let date = new Date();
    let dateArr = [
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    ];
    let dateStr = dateArr.join('-');
    this.setData({
      today: dateStr,
      record_time: dateStr
    });
  },
  bindDateChange(e:any){ // 选择日期
    this.setData({
      record_time:e.detail.value
    });
  },
  setAmt(e:any){ //输入金额
    let val = e.currentTarget.dataset.val;
    switch(val){
      case '.':
        this.setDott();
        break;
      default:
        let amount = this.data.amount;
        let setDatas = {};
        // if(this.data.bookId && this.data.editFlag == false){
        //   amount = 0;
        //   setDatas.editFlag = true;
        // }
        if(amount == '0.00' || amount == '0' || amount == '00'){
          amount = '';
        }
        let amtArr = amount.split('.'); // ['0', '00']
        if (amtArr.length == 2) {
          if (amtArr[1].length < 2){  // 确保小数点后两位
            amount += val;
          }
        } else {
          amount += val;
        }
        // @ts-ignore
        setDatas.amount = amount;
        this.setData(setDatas);
        break;
    }
  },
  delAmt(){ // 删除
    let amount = this.data.amount;
    amount = amount.substring(0,amount.length-1);
    if(amount == ''){
      amount = '0';
    }
    this.setData({
      amount: amount
    });
  },
  setDott(){ // 输入 .
    let amount = this.data.amount
    let setDatas= {}
    // if(this.data.bookId && this.data.editFlag==false){
    //   amount = '0.00'
    //   setDatas.editFlag = true
    // }
    if(amount == '0.00'){
      amount = '0.'
    }
    if(amount.indexOf('.') != -1){
      return;
    }else{
      amount += '.';
    }
    // @ts-ignore
    setDatas.amount = amount;
    this.setData(setDatas);
  },
  setDetail(e:any){ // 输入备注
    this.setData({
      detail: e.detail.value
    });
  },


  // 加载所有分类
  getAllType() {
    getAllTypeApi().then((res:any) => {
      let data = JSON.parse(res.result)
      let incomeAccounts: any[] = []
      let expenditureAccounts: any[] = []
      // 转换数据为对象，其中键为收入或支出类型，值为相关账户类型数组  
      data.forEach((cur:any) => {  
        // console.log(cur)
        if(cur.incomeOrExpenditureType == 1) {
          // 支出
          expenditureAccounts.push(cur)
        } else {
          // 收入
          incomeAccounts.push(cur)
        }
      })  
      // @ts-ignore
      this.setData({"incomeAccounts": incomeAccounts})
      // @ts-ignore
      this.setData({"expenditureAccounts": expenditureAccounts})
      // console.log("收入分类:", incomeAccounts);  
      // console.log("支出分类:", expenditureAccounts);
      this.getAccountAll()
    })
  },
  // 加载个人所有账单
  getAccountAll() {
    getAccountAllApi(wx.getStorageSync("userId")).then((res) => {
      const data = res.result
      // @ts-ignore
      this.processData(JSON.parse(data))
    })
  },
  // 预处理数据
  processData(data:any) {
    let accountList: ({ date: Date; output: number; input: number; weekday: string; } & { detail: any[]; })[] = []
    // @ts-ignore
    data = data.sort((a:any, b:any) => {return new Date(b.recordTime)-new Date(a.recordTime)})
    console.log(data)
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
      // console.log(item)
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
      detail.forEach((element:any) => {
        let typeId = element.accountTypeId
        let ioe = element.incomeOrExpenditureType
        let name = ""
        if(ioe == 0) 
          this.data.incomeAccounts.forEach((ele:any) => {
            if(ele.accountTypeId == typeId)
              name = ele.accountTypeName
          })
        else 
          this.data.expenditureAccounts.forEach((ele:any) => {
            if(ele.accountTypeId == typeId)
              name = ele.accountTypeName
          })
        element["accountTypeName"] = name
      })
      // @ts-ignore
      accountList.push(Object.assign(accountObj, {'detail': detail}))
    }
    // @ts-ignore
    this.setData({"accountList": accountList})
    wx.hideLoading()
    console.log(accountList)
  },
  // 跳转分类管理页面
  jump() {
    console.log(1)
    wx.navigateTo({url: "/pages/account_type/account_type"})
  },
  // 删除数据重新获取
  delTrigger(obj:any) {
    this.getAccountAll()
    return
    console.log(obj.detail.params)
    const date = obj.detail.params.date
    const accountId = obj.detail.params.accountId
    let aList = this.data.accountList
    let index = 0
    for(let i = 0; i < aList.length; i++) {
      // @ts-ignore
      if(aList[i].date == date) {
        index = i
        break
      }
    }
    // @ts-ignore
    let list = aList[index].detail
    let newList = []
    for(let i = 0; i < list.length; i++) {
      if(list[i].accountId != accountId) {
        newList.push(list[i])
      }
    }
    // @ts-ignore
    aList[index].detail = newList
    this.setData({
      "accountList": aList
    })

  },

  // 指定月份
  changeMonth(obj:any){
    const year = obj.detail.year
    const month = obj.detail.month
    this.setData({
      "currentMonth": month,
      "currentYear": year
    })
    const uid = wx.getStorageSync("userId")
    const _this = this
    if(tid == 'all') {
      
    } else {
      
    }
  },
  // 指定类型
  changeCategory(obj:any){
    const tid = obj.detail.tid
    const uid = wx.getStorageSync("userId")
    const _this = this
    if(tid == 'all') {
      // 全部类型
      getAccountByMonthApi(uid, this.data.currentYear, this.data.currentMonth, 1).then((res:any) => {
        const d1 = JSON.parse(res.result)
        getAccountByMonthApi(uid, this.data.currentYear, this.data.currentMonth, 0).then((res2:any) => {
          const d2 = JSON.parse(res2.result)
          _this.processData(d1.concat(d2)) 
        })
      })
    } else {
      getAccountByMonthApi(uid, this.data.currentYear, this.data.currentMonth, 1).then((res:any) => {
        const d1 = JSON.parse(res.result)
        getAccountByMonthApi(uid, this.data.currentYear, this.data.currentMonth, 0).then((res2:any) => {
          const d2 = JSON.parse(res2.result)
          _this.processData(d1.concat(d2)) 
        })
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    wx.showLoading({
      title: "加载中",
      mask: true  // 开启蒙版遮罩
    })
    this.initDate()
    this.getAllType()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    // this.data.scrollEvent = this.wx('#scroll-container').on('scroll', this.handleScroll);  
  },
  handleScroll() {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
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
