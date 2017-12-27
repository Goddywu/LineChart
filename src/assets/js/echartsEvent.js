/** 开放外部方法 */
import echarts from 'echarts'
export {drawChart}

/** 获取父组件元素 */
var chart;
// 基于准备好的dom，初始化echarts实例
var myChart;
var events = [];

/** 可配置变量 */
const data = {
    singleChartHeight: 300, //单个折线图图的高度
    singleAllChartHeight: 400, //单个折线图整体高度
    chart2top: 80, //整个折线图距离顶部高度
    chart2bot: 20, //整个折线图距离底部高度
    chart2left: 50, //整个折线图距离左侧高度
    chart2right: 50, //整个折线图距离右侧高度
    colorA: 0.8, //rgba的透明度
    event: {
    	width: 180,
    	height: 50
    }
}

/** 公用option */
const option = {
    title: {},
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            animation: false
        }
    },
    legend: {
        data:[],
        x: 'left'
    },
    toolbox: {
        feature: {
            restore: {},
            saveAsImage: {},
            dataView: {
            	readOnly: true
            }
        }
    },
    axisPointer: {
        link: {xAxisIndex: 'all'}
    },
    dataZoom: [
        {
            show: true,
            realtime: false,
            start: 0,
            end: 100,
            xAxisIndex: [0, 1]
        },
        {
            type: 'inside',
            realtime: false,
            start: 0,
            end: 100,
            xAxisIndex: [0, 1]
        }
    ],
    grid: [],
    xAxis: [],
    yAxis: [],
    series: []
};

/** 画图，核心方法 */
const drawChart = function(dataInput) {
	//初始化data数据
	initData(dataInput)
	//初始化事件
	initEvent(dataInput)
	//调整折线图总体高度
	initChart(dataInput)
	// 绘制图表
	setTimeout(() => {
		myChart.setOption(option);
	},300)
	
	//添加监听事件
	// ???
}

/** 初始化data数据 */
const initData = function(dataInput) {
	//配置title
	option.title = {
        text: dataInput.title.text,
        subtext: dataInput.title.subtext,
        x: 'center'
	}
	//遍历初始化各项内容
	for (var i = 0; i < dataInput.chartNum; i ++) {
		//配置x轴
		option.xAxis[i] = {
			gridIndex: i,
            type: 'category',
            boundaryGap: false,
            axisLine: {onZero: true},
            data: dataInput.xAxisData
        }
        //配置每个折线图的位置
        option.grid[i] = {
	        left: data.chart2left,
	        right: data.chart2right,
	        top: data.chart2top + data.singleAllChartHeight * i,
	        height: data.singleChartHeight
	    }
	    //配置y轴
	    option.yAxis[i] = {
            gridIndex: i,
            name : dataInput.yAxisName[i],
            type : 'value'
        }
	    for (var j = 0; j < dataInput.series[i].length; j++) {
	    	//配置图例
	    	option.legend.data[i * dataInput.chartNum + j] = dataInput.series[i][j].name
	        //配置折线
	    	option.series[i * dataInput.chartNum + j] = {
	            name: dataInput.series[i][j].name,
	            type:'line',
	            xAxisIndex: i,
	            yAxisIndex: i,
	            symbolSize: 8,
	            hoverAnimation: false,
	            data: dataInput.series[i][j].data
	        }
	    }
	}
	console.log(option)
}

/** 初始化事件 */
const initEvent = function(dataInput) {
	var eventInput = dataInput.event
	var count = 0; //第几个事件
	var maxZ = 2;
	for (var i in eventInput) {
		//遍历事件
		var toTop = 0
		var toTopIncrease = 10
		for (var j in eventInput[i]) {
			var event = {
				type: 'group', 
				bottom: data.chart2top + i * dataInput.chartNum + toTop, // ???
				time: eventInput[i][j].date,
				clickFlag: false,
				children: 
				[
					{
						type: 'rect',
						z: 1,
						left: 'center',
						top: 'middle',
						shape: {
							width: data.event.width, 
							height: data.event.height
						},
						style: {
	                        fill: getRandomColor(),
	                        lineWidth: 2,
	                        shadowBlur: 8,
	                        shadowOffsetX: 3,
	                        shadowOffsetY: 3,
	                        shadowColor: 'rgba(0,0,0,0.3)'
	                    },
	                    index: count, //表明是第几个事件
	                    invisible: false,
	                    onmouseover: function() {
	                    	events[this.index].children[0].z = maxZ;
	                        events[this.index].children[1].z = maxZ;
	                        myChart.setOption({graphic: events})
	                    },
	                    onmouseout: function() {
	                        events[this.index].children[0].z = 1;
	                        events[this.index].children[1].z = 1;
	                        myChart.setOption({graphic: events})
	                    }
					},
					{
						type: 'text',
	                    z: 1,
	                    left: 'center',
	                    top: 'middle',
	                    style: {
	                        fill: '#fff',
	                        text: eventInput[i][j].title + '\n\n' + eventInput[i][j].content,
	                        font: '12px Microsoft YaHei'
	                    },
	                    invisible: false,
	                    index: count, 
	                    url: eventInput[i][j].url,
	                    onmouseover: function() {
	                        events[this.index].children[0].z = maxZ;
	                        events[this.index].children[1].z = maxZ;
	                        myChart.setOption({graphic: events})
	                    },
	                    onmouseout: function() {
	                        events[this.index].children[0].z = 1;
	                        events[this.index].children[1].z = 1;
	                        myChart.setOption({graphic: events})
	                    },
	                    onclick:function(){
	                    	window.open(this.url)
	                    }
					}
				]
			}
			events.push(event)
			count ++
		}
		toTop += toTopIncrease
	}
	console.log(events)
	/** 处理所有事件位置 */
	dealEventLocation(dataInput)
}

/** 处理所有事件位置 */
const dealEventLocation = function(dataInput) {
	for (var i in events) {
		//
	}
}

/** 初始化折线图 */
const initChart = function(dataInput) {
	//因为必须重新画div才能渲染出折线图
	var height = data.chart2top 
		+ data.singleAllChartHeight * dataInput.chartNum
		+ data.chart2bot
	document.getElementById('echarts').innerHTML = 
		'<div id="myChart" style="width:100%;height:'
		+ height +'px;"></div>'
	chart = document.getElementById('myChart')
	myChart = echarts.init(chart)
	chart.style.height = height + 'px'
}



//--------- 工具方法start -------

/** 获取随机rgb颜色 */
var getRandomColor = function() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgba(" + r + ',' + g + ',' + b + ',' + data.colorA + ")";
}






