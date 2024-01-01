// pages/bar/index.ts
// @ts-ignore
import * as echarts from '../../ec-canvas/echarts.js'

function lineSet(chart:any, xList:any, yList:any) {
  var option = {
    title: {
      // text: 'ECharts 入门示例'
    },
    grid: {
      top: '8%',
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    tooltip: {
      // 指示器
      trigger: 'axis',
      axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
    },
    legend: {
      // data: ['销量']
    },
    xAxis: {
      type: 'category',
      data: xList,
      boundaryGap: false,
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: yList,
        type: 'line',
        emphasis: {
          focus: 'series'
        },
      }
    ]
  };
  chart.setOption(option);
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      lazyLoad: true
    },
    oneComponent: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    let oneComponent = this.selectComponent('#mychart-dom-bar')
    this.setData({
      // @ts-ignore
      "oneComponent": oneComponent
    })
  },
 initChart(xList:AnyArray, yList:AnyArray) {
   // @ts-ignore
   this.data.oneComponent.init((canvas: { setChart: (arg0: any) => void; }, width: any, height: any, dpr: any) => {
     // @ts-ignore
    const chart = echarts.init(canvas, null, {
      width: width,
      height: height,
      devicePixelRatio: dpr // 像素比
    });
    canvas.setChart(chart);

    lineSet(chart, xList, yList)
    return chart;
   })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})