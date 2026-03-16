/**
 * Frieren ECharts 图表主题配置
 *
 * 提供统一的 ECharts 图表样式工厂函数，与 --module-accent 颜色体系对接。
 * 这些函数在 build.js 中调用，生成注入到 HTML <script> 中的 JS 代码字符串。
 *
 * 使用示例（在 build.js 中）：
 *   const { getEChartsThemeScript } = require('../shared/echarts-config');
 *   // 然后在生成的 HTML 末尾注入：
 *   const script = `<script>
 *     ${getEChartsThemeScript('#00d9ff', '#8b5cf6')}
 *     // ... 模块自身的图表逻辑，可直接调用 FRIEREN_CHART 上的方法
 *   <\/script>`;
 */

/**
 * 生成 ECharts 公共主题变量 JS 代码（注入到 HTML 中使用）
 *
 * @param {string} accent  - 模块主色（十六进制，如 '#00d9ff'）
 * @param {string} accent2 - 模块副色（十六进制，如 '#8b5cf6'）
 * @returns {string} 可注入到 <script> 中的 JS 代码字符串
 */
function getEChartsThemeScript(accent, accent2) {
  return `
var FRIEREN_CHART = {
  accent: "${accent}",
  accent2: "${accent2}",

  /** ECharts tooltip 公共配置 */
  tooltip: function() {
    return {
      backgroundColor: "rgba(30, 30, 46, 0.95)",
      borderColor: "${accent}4d",
      textStyle: { color: "#e0e7ff", fontFamily: "Outfit, sans-serif" }
    };
  },

  /** X/Y 轴公共样式 */
  axis: function() {
    return {
      axisLine:  { lineStyle: { color: "${accent}4d" } },
      axisLabel: { color: "${accent}", fontSize: 11 },
      axisTick:  { lineStyle: { color: "${accent}4d" } },
      splitLine: { lineStyle: { color: "${accent}1a" } }
    };
  },

  /**
   * 折线/面积图 series 配置
   * @param {Array} labels - X 轴标签数组
   * @param {Array} values - 数据数组
   */
  lineOption: function(labels, values) {
    var self = this;
    return {
      backgroundColor: "transparent",
      grid: { top: 20, right: 20, bottom: 30, left: 60 },
      xAxis: Object.assign({ type: "category", data: labels }, self.axis()),
      yAxis: Object.assign({ type: "value" }, self.axis()),
      series: [{
        data: values,
        type: "line",
        smooth: true,
        areaStyle: {
          color: {
            type: "linear", x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: "${accent}66" },
              { offset: 1, color: "${accent2}1a" }
            ]
          }
        },
        lineStyle:  { color: "${accent}", width: 2 },
        itemStyle:  { color: "${accent}" },
        symbol:     "circle",
        symbolSize: 6
      }]
    };
  },

  /**
   * 环形饼图 series 配置
   * @param {Array} data - [{ name, value, itemStyle: { color } }] 数组
   */
  pieOption: function(data) {
    var self = this;
    return {
      backgroundColor: "transparent",
      tooltip: Object.assign({ trigger: "item", formatter: "{b}: {c} ({d}%)" }, self.tooltip()),
      series: [{
        type: "pie",
        radius: ["45%", "75%"],
        center: ["50%", "50%"],
        data: data,
        label: { color: "#e0e7ff", fontSize: 11, formatter: "{b}\\n{d}%" },
        labelLine: { lineStyle: { color: "${accent}80" } },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "${accent}80"
          }
        }
      }]
    };
  },

  /**
   * 柱状图 series 配置
   * @param {Array} labels - X 轴标签数组
   * @param {Array} values - 数据数组
   */
  barOption: function(labels, values) {
    var self = this;
    return {
      backgroundColor: "transparent",
      grid: { top: 20, right: 20, bottom: 30, left: 60 },
      xAxis: Object.assign({ type: "category", data: labels }, self.axis()),
      yAxis: Object.assign({ type: "value" }, self.axis()),
      series: [{
        data: values,
        type: "bar",
        itemStyle: {
          color: {
            type: "linear", x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: "${accent}" },
              { offset: 1, color: "${accent2}80" }
            ]
          },
          borderRadius: [4, 4, 0, 0]
        }
      }]
    };
  }
};
`.trim();
}

/**
 * 生成完整的 ECharts 脚本标签（含 CDN 引入 + 主题变量）
 *
 * @param {string} accent  - 模块主色
 * @param {string} accent2 - 模块副色
 * @param {string} [echartsVersion='5.5.0'] - ECharts 版本号
 * @returns {string} 完整的 <script> HTML 字符串
 */
function getEChartsScriptTags(accent, accent2, echartsVersion = '5.5.0') {
  return `<script src="https://cdn.jsdelivr.net/npm/echarts@${echartsVersion}/dist/echarts.min.js"><\/script>
<script>${getEChartsThemeScript(accent, accent2)}<\/script>`;
}

module.exports = {
  getEChartsThemeScript,
  getEChartsScriptTags,
};
