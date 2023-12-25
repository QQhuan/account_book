// pages/bar/index.ts
// @ts-ignore
import * as echarts from '../../ec-canvas/echarts.js'
// @ts-ignore
function initChart(canvas: { setChart: (arg0: any) => void; }, width: any, height: any, dpr: any) {
  // @ts-ignore
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // 像素比
  });
  canvas.setChart(chart);

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
      data: ['12.25', '12.26', '12.27', '12.28', '12.29', '12.30', '12.31'],
      boundaryGap: false,
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line',
        emphasis: {
          focus: 'series'
        },
      }
    ]
  };
  chart.setOption(option);
  return chart;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      onInit: initChart
    }
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