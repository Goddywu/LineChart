<template>
    <div>
        <div id="echarts" />
    </div>
</template>

<script>
import {drawChart} from '@/assets/js/echartsEvent'
export default {
    name: 'HelloWorld',
    data () {
        return {
            dataInput: {
                chartNum: 2,   //折线图数量
                title: {
                    text: '雨量流量关系图',
                    subtext: '数据来自西安兰特水电测控技术有限公司'
                },
                xAxisData: ['2017-12-21', '2017-12-22', '2017-12-23', '2017-12-24', '2017-12-25', '2017-12-26', '2017-12-27'], //x轴数据
                yAxisName: ['流量图', '降雨量图'],
                series: [
                    [
                        {
                            name: '江苏流量',
                            data: [1,2,3,4,5,6,7]
                        },
                        {
                            name: '河北流量',
                            data: [7,6,5,4,3,2,1]
                        }
                    ], 
                    [
                        {
                            name: '江苏降雨量',
                            data: [1,2,3,4,5,6,7]
                        },
                        {
                            name: '河北降雨量',
                            data: [7,6,5,4,3,2,1]
                        }
                    ]
                ],
                event: [
                    [
                        {
                            title: '事件',
                            date: '2017-12-22',
                            content: '内容',
                            url: 'http://echarts.baidu.com/demo.html#grid-multiple'
                        },
                        {
                            title: '事件',
                            date: '2017-12-26',
                            content: '内容',
                            url: 'http://echarts.baidu.com/demo.html#grid-multiple'
                        }
                    ],
                    [
                        {
                            title: '事件',
                            date: '2017-12-26',
                            content: '内容',
                            url: 'http://echarts.baidu.com/demo.html#grid-multiple'
                        },
                        {
                            title: '事件',
                            date: '2017-12-22',
                            content: '内容',
                            url: 'http://echarts.baidu.com/demo.html#grid-multiple'
                        }
                    ]
                ]
            }
        }
    },
    mounted() {
        setTimeout(() => {
            drawChart(this.dataInput)
        }, 300)
    },
    methods: {
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#echarts {
    width: 1000px;
    margin: 20px auto;
}
</style>
