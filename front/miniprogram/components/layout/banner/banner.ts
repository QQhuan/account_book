// components/layout/banner/banner.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      incomeAccounts: {
        type: Array
      },
      expenditureAccounts: {
        type: Array
      },
      outputSum: {
        type: Number
      },
      inputSum: {
        type: Number
      },
    // year: {
    //   type: Number,
    //   value: 2023 // 给个默认值2023
    // }
  },

  /**
   * 组件的初始数据
   */
  data: {
    minHour: 0,
    maxHour: 24,
    minDate: new Date(1998,1,1).getTime(),
    maxDate: new Date().getTime(),
    currentDate: new Date().getTime(),
    currentDate_year: new Date().getFullYear(),
    currentDate_month: new Date().getMonth()+1,
    show: false,
    currentChoose: '',
    activeTypeName: '全部类型',

    // 类型选择面板数据
    typePlateShow: false, // 类型选择组件
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 类型选择面板处理
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
    // 指定类型
    changeType(e:any) {
      const tid = e.target.dataset.id
      const name = e.target.dataset.name
      this.triggerEvent('changeCategory', {tid})
      this.setData({
        typePlateShow: false,
        activeTypeName: name
      })
    },
    // 时间选择面板处理
    openPicker() {
      this.setData({ show: true })
      this.getTabBar().setData({
        show: false
      })
    },
    onConfirm(e) {
      this.setData({ show: false, currentChoose: this.formatDate(new Date(e.detail)) })
      this.getTabBar().setData({
        show: true
      })
      const year = new Date(e.detail).getFullYear()
      const month = new Date(e.detail).getMonth()+1
      this.setData({
        currentDate_year: year,
        currentDate_month: month
      })
      this.triggerEvent('changeMonth', {year, month})
    },
    onClose() {
      this.setData({ show: false })
      this.getTabBar().setData({
        show: true
      })
    },
    onCancel() {
      this.setData({ show: false })
      this.getTabBar().setData({
        show: true
      })
    },
    formatDate(date) {
      let taskStartTime
      if (date.getMonth() < 9) {
        taskStartTime = date.getFullYear() + "-0" + (date.getMonth() + 1) + "-"
      } else {
        taskStartTime = date.getFullYear() + "-" + (date.getMonth() + 1) + "-"
      }
      if (date.getDate() < 10) {
        taskStartTime += "0" + date.getDate()
      } else {
        taskStartTime += date.getDate()
      }
      taskStartTime += " " + date.getHours() + ":" + date.getMinutes()
      this.setData({
        taskStartTime: taskStartTime,
      })
      return taskStartTime;
    }
  }
})
