// components/common/detail-card/detail-card.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    detail: Object,
    accountList: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    default: {
      date: "11月23日",
      output: "102",
      input: "0",
      weekday: "星期四",
      detail: [{
        time: "9:00",
        type: "购物",
        count: "+28",
        icon: "",
        des: "我是描述信息",
      },{
        time: "9:00",
        type: "购物",
        count: "+28",
        icon: "",
        des: "我是描述信息",
      },{
        time: "9:00",
        type: "购物",
        count: "+28",
        icon: "",
        des: "我是描述信息",
      }]}
  },

  /**
   * 组件的方法列表
   */
  methods: {}
})
