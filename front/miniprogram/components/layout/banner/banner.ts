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
    currentDate_year: '2023',
    currentDate_month: '11',
    show: false,
    currentChoose: '',

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
    changeType(e:any) {
      console.log(e.target.dataset)
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
