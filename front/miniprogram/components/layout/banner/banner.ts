// components/layout/banner/banner.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // year: {
    //   type: Number,
    //   value: 2023 // 给个默认值2023
    // }
  },

  /**
   * 组件的初始数据
   */
  data: {
    selectYear: '', // 年份
    selectMonth: '', // 月份
    date: '2023年10月',
    income: '', // 收入
    outcome: '', // 指出
    show: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showPopup() {
      this.setData({ show: true })
      wx.hideTabBar({})
    },
    onClose() {
      this.setData({ show: false })
    }
  }
})
