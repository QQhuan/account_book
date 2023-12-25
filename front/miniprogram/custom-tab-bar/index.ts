// custom-tab-bar/index.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    active: 0,
    show: true,
    paths: ['detail', 'statistic', 'userinfo']
  },

  lifetimes: {
    ready: function () {
      // 绑上全局变量
      //let app = getApp()
      //this.setData({ active: 0 })
      //this.onChange({detail:0})
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event: any) {
      const app = getApp()
      const index = event.detail
      const url = this.data.paths[index]
      this.setData({ active: index })
      app.globalData.active = index // 修改全局状态
      //const jump = this.isTargetPage()
      //if(jump) {
      app.switchTab(`/pages/${url}/${url}`)
      //}
    },
    // isTargetPage() {
    //   // 获取当前页面路由路径，在login返回false，代表app.switchTab不执行
    //   const pages = getCurrentPages()
    //   const currentPage = pages[pages.length - 1]
    //   const currentRoute = currentPage.route.split('/')[2]
    //   console.log(currentPage.route)
    //   if (currentRoute == 'login') {
    //     return false
    //   } else {
    //     return true
    //   }
    // },
    init() {
      const page = getCurrentPages().pop()
      const route = (page ? page.route.split('?')[0] : '').split('/')[1]
      const active = this.data.paths.findIndex((item: string) => item == route)
      this.setData({ active })
    }
  }
})
