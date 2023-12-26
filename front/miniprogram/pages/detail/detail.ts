// pages/detail/detail.ts
import { addAccount as addAccountApi } from "../../api/account/index";
import { getAllType as getAllTypeApi } from "../../api/account_type/index";
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    incomeAccounts: [], // 收入类型
    expenditureAccounts: [], // 支出
    typePlateShow: false, // 分类面板
    account_type_id: '', // 新增or修改时的分类id
    income_or_expenditure_type: '',

    /// 引入
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
    let data = {
      "record_time": this.data.record_time,
      "detail": this.data.detail,
      "income_or_expenditure_type": this.data.income_or_expenditure_type,
      "account_type_id": this.data.account_type_id,
    }
    addAccountApi(data).then(() => {
      // 成功通知
      Notify({ type: 'success', message: "记账成功！"})
      let that = this
      setTimeout(function() {  
        that.onAddClose()
      }, 1000);
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
        console.log(cur)
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
      console.log("收入分类:", incomeAccounts);  
      console.log("支出分类:", expenditureAccounts);
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.initDate()
    this.getAllType()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

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
