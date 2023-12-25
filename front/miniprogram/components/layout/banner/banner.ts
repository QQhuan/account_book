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
    minHour: 0,
    maxHour: 24,
    minDate: new Date(1990,1,1).getTime(),
    maxDate: new Date(2099, 12, 31).getTime(),
    currentDate: new Date().getTime(),
    currentDate_year: '2023',
    currentDate_month: '11',
    show: false,
    currentChoose: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
