// pages/account_type/account_type.ts
import { getAllType as getAllTypeApi } from "../../api/account_type/index";
Page({
  data: {
    incomeAccounts: [],
    expenditureAccounts: [],
    incomeOrExpenditureType: "1", // 1支出，0收入
    bookTypeList:[], // 类型列表
    deleteBtnIdx:-1, // 显示删除按钮的索引
  },
  onLoad: function (options) {
    this.getAllType()
    if(options.type){
      this.setData({
        "incomeOrExpenditureType":options.type
      })
    }
  },
  onShow(){
    this.getBookList();
    
  },
  // 切换收支
  changeType(){
    if(this.data.incomeOrExpenditureType == "0"){
      this.setData({
        "incomeOrExpenditureType": "1",
        "bookTypeList": this.data.expenditureAccounts
      })
    } else {
      this.setData({
        "incomeOrExpenditureType": "0",
        "bookTypeList": this.data.incomeAccounts
      })
    }
  },
  getBookList(){//获取类型列表
    let _this = this;
  },

  // 加载所有分类
  getAllType() {
    getAllTypeApi().then((res:any) => {
      let data = JSON.parse(res.result)
      console.log(data)
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
      if(this.data.incomeOrExpenditureType == "1"){
        this.setData({
          // @ts-ignore
          "bookTypeList": expenditureAccounts
        })
      } else {
        this.setData({
          // @ts-ignore
          "bookTypeList": incomeAccounts
        })
      }
    })
  },
  // 新增分类
  addBookType(){
    wx.showModal({
      title: "新增分类",
      editable: true, // 显示输入框
      placeholderText: '请输入分类名称...',
      // @ts-ignore
      content: '', // 显示输入框信息
      success: res => {
        if (res.confirm) { // 点击了确认
          // @ts-ignore
          console.log(res.content)// 用户输入的值
        } else {
          console.log('用户点击了取消')
        }
      }
    })
  },
  showDeleteBtn(e:any){//显示删除按钮
    let idx = e.currentTarget.dataset.idx;
    this.setData({
      deleteBtnIdx:idx
    });
  },
  hideDeleteBtn(){//隐藏删除按钮
    this.setData({
      deleteBtnIdx:-1
    });
  },
  deleteBookType(e: { currentTarget: { dataset: { idx: any; }; }; }){
    let idx = e.currentTarget.dataset.idx;
    let item = this.data.bookTypeList[idx],
        _this = this;
    // @ts-ignore
    if(item.user == ''){
      app.showModal('暂时无法删除公用类别!');return;
    }
    // 删除请求
  },
  setAmtType(e:any){ // 选择收入支出
    this.setData({
      incomeOrExpenditureType:e.currentTarget.dataset.type
    });
    this.getBookList();
  }
})