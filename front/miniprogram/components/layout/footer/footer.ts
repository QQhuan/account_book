// components/layout/footer.ts
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
    paths: ['detail', 'statistic', 'userinfo']
  },

  lifetimes: {
    attached: function () {
      // 绑上全局变量
      let app = getApp()
      const index = app.globalData.active
      this.setData({ active: index })
      this.onChange({detail: 0}) // 手动显示明细页面
    }
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
      app.switchTab(`/pages/${url}/${url}`)
    },
    // 并没有什么用的方法
    init() {
      const page = getCurrentPages().pop()
      const route = (page ? page.route.split('?')[0] : '').split('/')[1]
      const active = this.data.paths.findIndex((item: string) => item == route)
      this.setData({ active })
    }
  }
})
