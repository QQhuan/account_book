// components/common/detail-card/detail-card.ts
import { delAccount } from "../../../api/account/index";

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    detail: Object,
    accountList: {
      type: Array
    },
    hasData: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    leftX: 0,
    topY: 0,
    display: 'none',
    // 定义选择框的样式和内容  
    functionBoxStyle: 'display: none; position: fixed; z-index: 100; background-color: #fff; border: 1px solid #ccc; padding: 10px;', 

    selectItem: {
      "date": '',
      "accountId": '',
      "detail": '',
      "incomeOrExpenditureType": '',
      "week": '',
      "amount": 0,
      "tname": ''
    },
    show: false,
  },
  lifetimes: {
    ready() {
      console.log(this.data.accountList)
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    openDetail() {
      const o = this.data.selectItem
      console.log(o)
      let obj = {
        "week": o.week,
        "date": o.date,
        "detail": o.detail,
        "amount": o.amount,
        "incomeOrExpenditureType": o.incomeOrExpenditureType,
        "tname": o.tname
      }
      console.log(JSON.stringify(obj))
      wx.setStorageSync("detail", JSON.stringify(obj))
      wx.navigateTo({url: '/pages/account_detail/account_detail'})
    },
    showPopup() {
      let that = this
      wx.showModal({
        editable:true, // 显示输入框
        placeholderText: '备注信息',
        // @ts-ignore
        content: that.data.selectItem.detail,//显示输入框提示信息
        success: res => {
          if (res.confirm) { //点击了确认
            // @ts-ignore
            console.log(res.content)//用户输入的值
          } else {
            console.log('用户点击了取消')
          }
        }
      })
    },
    onClose() {
      this.setData({ show: false });
    },
    showFunctionBox: function(e:any) { 
      console.log(e.currentTarget.dataset)
      this.setData({
        selectItem: {
          "date": e.currentTarget.dataset.date,
          "accountId": e.currentTarget.dataset.accountid,
          "detail": e.currentTarget.dataset.detail,
          "incomeOrExpenditureType": e.currentTarget.dataset.ie,
          "week": e.currentTarget.dataset.week,
          "amount": e.currentTarget.dataset.amount,
          "tname": e.currentTarget.dataset.tname
        }
      })
      console.log(e)
      // 获取长按的元素的位置  
      var offsetX = e.touches[0].clientX // e.detail.x - 40
      var offsetY = e.touches[0].clientY // e.detail.y + 20
      if(offsetY > 450) {
        offsetY /= 450 
        offsetY += 100
      }
      // 显示选择框，并设置其位置  
      this.setData({  
        leftX: offsetX>0?(offsetX>200?200:offsetX):10,
        topY: offsetY>340?offsetY-200:offsetY,
        display: 'block'
      });  
    },  
    displayShow() {
      this.setData({  
        display: 'none'
      });  
    },
    // 删除
    del() {
      console.log(this.data.selectItem)
      delAccount(this.data.selectItem.accountId).then((res:any) => {
        wx.showToast({title: res.result})
        this.triggerEvent('myevent', {params: this.data.selectItem})
      })
    }
  }
})
