// components/line_chart/index.ts
// @ts-ignore
import * as echarts from '../../ec-canvas/echarts.js'

Component({
  lifetimes: {
    ready: function() {
      // @ts-ignore
      this[this.data.chartLineId] = this.selectComponent('#' + this.data.chartLineId); //通过`id`获取echarts组件
      this.setOptions(this.data.xList, this.data.yList) // 异步请求数据
    },
    detached() {
      // @ts-ignore
      this[this.data.chartLineId] = null
      // @ts-ignore
      this[this.data.canvasId] = null
    },
  },
  /**
   * 组件的属性列表
   */
  properties: {
    xList: {
      type: Array,
      value: [],
      observer: function() {
        // console.log(val)
      }    
    },
    yList: {
      type: Array,
      value: [],
      observer: function() {
      }
    },
    chartLineId: { type: String },
    canvasId: { type: String },
  },
  observers: {
    'xList, yList': function(xList:Array<String>, yList:Array<String>) {
      this.setOptions(xList, yList)
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    ec: {
      lazyLoad: true
    },
    xLists: [],
    yLists: [],
    oneComponent: '',
    timer: '',
    options: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setOptions(xList, yList) {
      const option = {
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
      }
      this.setData({"options": option})
      this.initChart()
    },
    initChart() {
      // @ts-ignore
      this[this.data.chartLineId].init((canvas, width, height, dpr) => {
        const chart = echarts.init(canvas, null, {
            width: width,
            height: height,
            devicePixelRatio: dpr // new
        })
        chart.setOption(this.data.options)
        return chart
      })
     },
    lineSet(chart:any, xList:any, yList:any) {
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
  }
})