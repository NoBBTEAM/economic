import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ContainerStyle } from '../../core/container-ngrx/container.model';
import { CHANGE } from '../../core/container-ngrx/container.action';

declare var echarts: any;

@Component({
  selector: 'app-microcosmic',
  templateUrl: './microcosmic.component.html',
  styleUrls: ['./microcosmic.component.css']
})
export class MicrocosmicComponent implements OnInit {

  // 四个表格
  option1: any;
  option2: any;
  option3: any;
  option4: any;
  // 集群行业
  option: any;

  // 区别四个区域
  title: string = '高新西区';

  constructor(private store: Store<ContainerStyle>) {
    this.store.select('container');
  }

  ngOnInit() {
    // 改变container的宽度
    this.store.dispatch({
      type: CHANGE,
      payload: {
        width: '60%'
      }
    });
    this.option = {
      //                    backgroundColor : '#000',
      title: {
        show: false,
        text: '六大集群行业体系',
        top: 'top',
        left: 'center'
      },
      tooltip: {
        formatter: function () {
          return;
        }
      },
      legend: [{
        show: false,
        formatter: function (name) {
          return echarts.format.truncateText(name, 40,
            '14px Microsoft Yahei', '…');
        },
        tooltip: {
          show: true
        },
        selectedMode: 'false',
        bottom: 20,
        data: ['集成电路', '软件及服务外包', '光电', '生物医药', '通信', '精密机械']
      }],
      toolbox: {
        show: false,
        bottom: 15,
        right: 5,
        feature: {
          dataView: {
            show: true,
            readOnly: false
          },
          restore: {
            show: true
          },
          saveAsImage: {
            show: true
          }
        }
      },
      animationDuration: 3000,
      animationEasingUpdate: 'quinticInOut',
      series: [{
        name: '成都高新',
        type: 'graph',
        layout: 'force',
        force: {
          repulsion: 500
        },
        focusNodeAdjacency: true,
        /*layout:'circular',
        circular:{
            rotateLabel:false
        },*/
        roam: true,
        label: {
          normal: {
            show: true,
            textStyle: {
              fontSize: 10,
              fibtWeight: 'normal', // 'normal'标准'bold'粗的'bolder'更粗的'lighter'更细的
              color: '#fff' // '#cde6c7'
            },
            position: 'inside'
          }
        },
        lineStyle: {
          normal: {
            color: 'source',
            width: '2',
            // 曲线程度
            curveness: 0.5,
            type: 'solid'
          }
        },
        // 边缘标签
        edgeLable: {
          normal: {
            show: true,
            textStyle: {
              fontSize: 10
            },
            formatter: '{c}'
          }
        },



        data: [{
          name: '成都高新',
          // symbol: '/economic/images/menu_bg_3.png',
          symbolSize: 60,
          // 节点是否可拖拽
          draggable: true,
          category: 0
        }, {
          'name': '集成电路',
          'symbolSize': 40,
          'category': '集成电路',
          'draggable': 'true'
        },
        {
          'name': '软件及服务外包',
          'symbolSize': 40,
          'category': '软件及服务外包',
          'draggable': 'true'
        }, {
          'name': '光电',
          'symbolSize': 40,
          'category': '光电',
          'draggable': 'true'
        }, {
          'name': '生物医药',
          'symbolSize': 40,
          'category': '生物医药',
          'draggable': 'true'
        }, {
          'name': '通信',
          'symbolSize': 40,
          'category': '通信',
          'draggable': 'true'
        }, {
          'name': '精密机械',
          'symbolSize': 40,
          'category': '精密机械',
          'draggable': 'true'
        }
        ],
        links: [{
          'source': '成都高新',
          'target': '集成电路',
          value: '产业集群'
        }, {
          'source': '集成电路',
          'target': '成都芯通科技股份有限公司'
        }, {
          'source': '集成电路',
          'target': '富泰华精密电子（成都）有限公司'
        }, {
          'source': '集成电路',
          'target': '成都畅达通检测技术股份有限公司'
        }, {
          'source': '集成电路',
          'target': '成都飞鱼星科技股份有限公司'
        }, {
          'source': '集成电路',
          'target': '成都科普尔电缆有限公司'
        }, {
          'source': '集成电路',
          'target': '成都方舟微电子有限公司'
        }, {
          'source': '成都高新',
          'target': '软件及服务外包',
          value: '产业集群'
        }, {
          'source': '软件及服务外包',
          'target': '成都芯通软件有限公司'
        }, {
          'source': '软件及服务外包',
          'target': '成都金本华电子有限公司'
        }, {
          'source': '软件及服务外包',
          'target': '成都任我行网络技术有限公司'
        }, {
          'source': '成都高新',
          'target': '光电',
          value: '产业集群'
        }, {
          'source': '光电',
          'target': '成都锦江电子系统工程有限公司'
        }, {
          'source': '光电',
          'target': '成都新锐鑫光通信技术有限公司'
        }, {
          'source': '光电',
          'target': '成都新易盛通信技术股份有限公司'
        }, {
          'source': '光电',
          'target': '成都维信电子科大新技术有限公司'
        }, {
          'source': '光电',
          'target': '成都新光微波工程有限责任公司'
        }, {
          'source': '光电',
          'target': '成都西南交大驱动技术有限责任公司'
        }, {
          'source': '光电',
          'target': '成都摩尔环宇测试技术有限公司'
        }, {
          'source': '成都高新',
          'target': '生物医药',
          value: '产业集群'
        }, {
          'source': '生物医药',
          'target': '四川双陆医疗器械有限公司'
        }, {
          'source': '生物医药',
          'target': '四川华德生物工程有限公司'
        }, {
          'source': '成都高新',
          'target': '通信',
          value: '产业集群'
        }, {
          'source': '通信',
          'target': '成都中联信通科技股份有限公司'
        }
          /*, {
                                      'source' : '通信',
                                      'target' : '成都中联信通科技股份有限公司'
                                  }*/
          , {
          'source': '通信',
          'target': '成都天翼空间科技有限公司'
        }, {
          'source': '通信',
          'target': '四川浩特通信有限公司'
        }, {
          'source': '通信',
          'target': '四川美讯达通讯有限责任公司'
        }, {
          'source': '成都高新',
          'target': '精密机械',
          value: '产业集群'
        }, {
          'source': '精密机械',
          'target': '成都凯泉铁路配件有限责任公司'
        }, {
          'source': '精密机械',
          'target': '成都三里汽车技术有限公司'
        }, {
          'source': '精密机械',
          'target': '成都五牛科技有限公司'
        }, {
          'source': '精密机械',
          'target': '四川蜀杰通用电气有限公司'
        }
        ],
        categories: [{
          name: '六大产业集群'
        }, {
          name: '集成电路'
        }, {
          name: '软件及服务外包'
        }, {
          name: '光电'
        }, {
          name: '生物医药'
        }, {
          name: '通信'
        }, {
          name: '精密机械'
        }]
      }]
    };
    this.option1 = {
      title: {
        text: '企业年产值',
        textStyle: {
          color: '#fff',
          fontSize: 14,
          fontWeight: 'none'
        }
      },
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        show: false
        /*feature: {
            saveAsImage: {}
        }*/
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['2010', '2011', '2012', '2013', '2014', '2015',
          '2016'
        ],
        axisLabel: {
          color: '#fff',
          lineStyle: {
            color: '#fff'
          }
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: '#fff'
        },
        splitLine: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        }
      },
      series: [{
        name: '高新西区AAA公司',
        type: 'line',
        stack: '总量',
        data: [34, 54, 80, 134, 90, 210, 190]
      }]
    };

    this.option2 = {
      title: {
        text: '企业数量',
        textStyle: {
          color: '#fff',
          fontSize: 14,
          fontWeight: 'none'
        }
      },
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        show: false
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['2010', '2011', '2012', '2013', '2014', '2015',
          '2016'
        ],
        axisLabel: {
          color: '#fff'
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#fff'
          }
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: '#fff'
        },
        splitLine: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        }
      },
      series: [{
        name: this.title,
        type: 'line',
        stack: '总量',
        data: [700, 500, 800, 934, 1290, 1500, 1120]
      }]
    };

    this.option3 = {
      title: {
        text: '产业规模',
        textStyle: {
          color: '#fff',
          fontSize: 14,
          fontWeight: 'none'
        }
      },
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        show: false
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['2010', '2011', '2012', '2013', '2014', '2015',
          '2016'
        ],
        axisLabel: {
          color: '#fff'
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#fff'
          }
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: '#fff'
        },
        splitLine: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        }
      },
      series: [{
        name: this.title,
        type: 'line',
        stack: '总量',
        data: [80, 150, 210, 335, 270, 199, 320]
      }]
    };

    this.option4 = {
      title: {
        text: '生产总值',
        textStyle: {
          color: '#fff',
          fontSize: 14
        }
      },
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        show: false
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['2010', '2011', '2012', '2013', '2014', '2015',
          '2016'
        ],
        axisLabel: {
          color: '#fff'
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#fff'
          }
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: '#fff'
        },
        splitLine: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        }
      },
      series: [{
        name: this.title,
        type: 'line',
        stack: '总量',
        data: [290, 330, 310, 220, 182, 191, 234]
      }]
    };
  }



}
