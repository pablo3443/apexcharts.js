import XAxis from './XAxis'
import YAxis from './YAxis'

export default class Axes {
  constructor(ctx) {
    this.ctx = ctx
    this.w = ctx.w
  }

  drawAxis(type, xyRatios) {
    let gl = this.w.globals
    let cnf = this.w.config

    let xAxis = new XAxis(this.ctx)
    let yAxis = new YAxis(this.ctx)
    let elXaxis, elYaxis
    if (this.w.config.chart.type === 'gantt') {
      elYaxis = yAxis.drawGanttYAxis(0)
      elXaxis = xAxis.drawGanttXAxis(0)

      gl.dom.elGraphical.add(elXaxis)
      gl.dom.elGraphical.add(elYaxis)
      return
    }

    if (gl.axisCharts && type !== 'radar') {
      if (gl.isBarHorizontal) {
        elYaxis = yAxis.drawYaxisInversed(0)
        elXaxis = xAxis.drawXaxisInversed(0)

        gl.dom.elGraphical.add(elXaxis)
        gl.dom.elGraphical.add(elYaxis)
      } else {
        elXaxis = xAxis.drawXaxis()
        gl.dom.elGraphical.add(elXaxis)

        cnf.yaxis.map((yaxe, index) => {
          if (gl.ignoreYAxisIndexes.indexOf(index) === -1) {
            elYaxis = yAxis.drawYaxis(index)
            gl.dom.Paper.add(elYaxis)
          }
        })
      }
    }
  }
}
