import { Component, OnInit } from '@angular/core';
import { CompanyEconomicInfoService } from './company-economic-info.service';

@Component({
  selector: 'app-company-economic-info',
  templateUrl: './company-economic-info.component.html',
  styleUrls: ['./company-economic-info.component.css'],
  providers: [CompanyEconomicInfoService]
})
export class CompanyEconomicInfoComponent implements OnInit {
  companyName: any;
  businessIncomeData: any;
  businessIncomeRatioData: any;
  numberOfActiveStaffData: any;
  parkNumberData: any;
  relationPeople: any;
  gobernmentContacts: any;
  projectDeclaration: any;
  notices: any;

  WinningBidParams = { enterpriseName: 'test1', currentPage: 0, pageSize: 10, lastRowKey: '' };
  WinningBid = [];

//   项目申报
  ProjectDeclarations = [];
  constructor(private companyEconomicInfoService: CompanyEconomicInfoService) { }

  ngOnInit() {
    this.companyName = 'test1';
    this.companyEconomicInfoService.getIncomeStatistics(this.companyName).subscribe(res => {
      this.creatBusinessIncomeEChart(res.data.eIIRevenueAndStaffPojo);
    });
    this.companyEconomicInfoService.getRevenueShare(this.companyName).subscribe(res => {
      this.creatBusinessIncomeRatioEChart(res.data.eIIRevenueAndStaffPojo);
    });
    /*获取销量*/
    this.companyEconomicInfoService.getNumberOfActiveStaff(this.companyName).subscribe(res => {
      this.creatNumberOfActiveStaff(res.data.eIIRevenueAndStaffPojo);
    });
    /*获取四季度收入同比数据*/
    this.companyEconomicInfoService.getRevenueYearOnYear(this.companyName).subscribe(res => {
        // console.log(res);
    });
    /*获取四季度收入同比数据*/
    this.companyEconomicInfoService.getParkNumber(this.companyName).subscribe(res => {
      this.creatParkNumber(res.data.eIIRevenueAndStaffPojo);
    });
    /*获取关联方数据*/
    this.companyEconomicInfoService.getRelationPeople(this.companyName).subscribe(res => {
      this.creatRelationPeople(res.data.eIIRelationPojo);
    });
    /*获取政企联系人*/
    this.companyEconomicInfoService.getGobernmentContacts(this.companyName).subscribe(res => {
      this.gobernmentContacts = res.data.eIIRelationPojo;
    });
    /*获取政府项目申报信息*/
    this.companyEconomicInfoService.getProjectDeclaration(this.companyName).subscribe(res => {
      console.log(res);
      this.ProjectDeclarations = res.data.kETProjectDeclarationPojo;
    });
    /*获取招中标信息*/
    // this.companyEconomicInfoService.findListByCompanyName(this.WinningBidParams, 'WinningBid').subscribe(res => {
    //   console.log(res);
    //   this.ProjectDeclarations = res.data.kETProjectDeclarationPojo;
    // });
    /*获公告列表信息*/
    this.companyEconomicInfoService.getNotices(this.companyName).subscribe(res => {
      console.log(res);
      this.notices = res.data.eIIAnnouncementsPojos;
    });
  }
  /*绘制营业收入图表*/
  creatBusinessIncomeEChart(options) {
      // const dataAxis = ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017'];
      const dataAxis = [];
      const yMax = 500;
      const dataShadow = [];
      // const tu1 = JSON.parse(options.income);
      let tu1 = options;
      /*7年*/
      if (tu1.length > 7) {
          tu1 = tu1.slice(tu1.length - 7, tu1.length);
      }
      const data = [];
      for (let i = 0; i < tu1.length; i++) {
          data.push(tu1[i].totalMoney / 100);
          dataAxis.push(tu1[i].year);
      }

      for (let i = 0; i < data.length; i++) {
          dataShadow.push(yMax);
      }

      const option = {
          tooltip : {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                  type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              },
              formatter: function (params) {
                  const tar = params[0];
                  // console.log(tar)
                  return tar.name + '年总收入' + ' : ' + tar.value + '万';
              }
          },
          title: {
              text: '公司几年内收入变化图',
              left: 'center', // 居中
              top: 20, // 距离上边框距离
              textStyle: {
                  color: '#bcbdbf'          // 主标题文字颜色
              }
          },
          xAxis: {
              name: '年份',
              nameTextStyle: {
                  color: '#bcbdbf'
              },
              position: 'bottom',
              data: dataAxis,
              axisLabel: {
                  inside: true,
                  textStyle: {
                      color: '#fff'
                  }
              },
              axisTick: {
                  show: true
              },
              axisLine: {
                  show: true
              },
              z: 10
          },
          yAxis: {
              name: '总销量(万)',
              nameTextStyle: {
                  color: '#bcbdbf'
              },
              axisLine: {
                  show: true
              },
              axisTick: {
                  show: false
              },
              axisLabel: {
                  textStyle: {
                      color: '#bcbdbf'
                  }
              }
          },
          dataZoom: [
              {
                  type: 'inside'
              }
          ],
          series: [
              { // For shadow
                  type: 'bar',
                  itemStyle: {
                      normal: {color: 'rgba(0,0,0,0.05)'}
                  },
                  barGap: '-100%',
                  barCategoryGap: '40%',
                  data: dataShadow,
                  animation: false
              },
              {
                  type: 'bar',
                  itemStyle: {
                      normal: {
                          color: '#1eb5d4'
                      },
                      emphasis: {
                          color: '#1eb5d4'
                      }
                  },
                  label: {
                      normal: {
                          show: true,
                          position: 'top',
                          formatter: function(params){
                              return params.data + '万';
                          }
                      }
                  },
                  data: data
              }
          ]
      };
      this.businessIncomeData = option;
    }
  /*绘制营业收入占比图表*/
  creatBusinessIncomeRatioEChart(options) {
    const data = [];
    for ( let i = 0; i < options.length; i++) {
        data.push({value: options[i].money / 100, name: options[i].type + i});
    }
    const option3 = {
        //            backgroundColor: '#2c343c',//背景颜色
        title: {
            text: '2017年收入占比',
            left: 'center', // 居中
            top: 20, // 距离上边框距离
            textStyle: {
                color: '#bcbdbf'
            }
        },

        tooltip : {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}万 ({d}%)'
        },

        visualMap: {
            show: false,
            min: 80,
            max: 600,
            inRange: {
                colorLightness: [0, 1]
            }
        },
        series : [
            {
                name: '收益来源',
                type: 'pie',
                radius : '60%', // 饼图大小
                center: ['50%', '50%'],
                data: data.sort(function (a, b) { return a.value - b.value; }),
                roseType: 'radius',
                label: {
                    normal: {
                        textStyle: {
                            color: '#bcbdbf'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        },
                        smooth: 0.2,
                        length: 10,
                        length2: 20
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#c23531',
                        shadowBlur: 200,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },

                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                    return Math.random() * 200;
                }
            }
        ]
    };
    this.businessIncomeRatioData = option3;
  }
  /*绘制销量同比图表*/
  creatNumberOfActiveStaff(options) {
    const data = {old: [], new: []};
    for (let i = 0; i < options.length; i++) {
      data.new.push(options[i].number - 10 * i);
      data.old.push(options[i].number - 1000 * i);
    }
    const option2 = {
      title: {
        text: '同比',
        left: 'center', // 居中
        textStyle: {
          color: '#bcbdbf'
        }
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['今年销量', '去年销量'],
        top: 25, // 距离上边框距离
        textStyle: {
          color: '#bcbdbf'          // 图例文字颜色
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        dataView: {readOnly: false},
        magicType: {type: ['line', 'bar']},
        feature: {
          saveAsImage: {}
        },
        iconStyle: {}
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['第一季度', '第二季度', '第三季度', '第四季度'],
        axisLabel: {
          textStyle: {
            color: '#bcbdbf'
          }
        }
      },
      yAxis: {
        name: '总销量(万)',
        nameTextStyle: {
          color: '#bcbdbf'
        },
        type: 'value',
        axisLabel: {
          textStyle: {
            color: '#bcbdbf'
          }
        }
      },
      series: [
        {
          name: '今年销量',
          type: 'line',
          lineStyle: {
            normal: {
              color: '#f43723'
            }
          },
          // data:JSON.parse(result.salesVolume).new
          data: data.new
        },
        {
          name: '去年销量',
          type: 'line',
          lineStyle: {
            normal: {
              color: '#f9b621'
            }
          },
          itemStyle: {
            normal: {
              color: '#f9b621',
              lineStyle: {
                color: '#f9b621'
              }
            }
          },
          // data:JSON.parse(result.salesVolume).old
          data: data.old
        }
      ]
    };
    this.numberOfActiveStaffData = option2;
  }
  /*绘制员工占比*/
  creatParkNumber(options) {
      const data = {xAxis: [], proportion: [], number: []};
      // data.xAxis = ['2010', '2011', '2012', '2013', '2014', '2015', '2016'];

      /*7年*/
      if (options.length > 7) {
          options = options.slice(options.length - 7, options.length);
      }
      options.forEach((v, i) => {
          data.xAxis.push(v.year);
          data.proportion.push(v.proportion);
          data.number.push(v.number);
      });
      const option4 = {
          title: {
              text: '2000-2016在职人员总数及园区占比',
              left: 'center', // 居中
              textStyle: {
                  color: '#bcbdbf'
              }
          },
          tooltip: {
              trigger: 'axis'
          },
          toolbox: {
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
          grid: {
              containLabel: true
          },
          legend: {
              data: ['在职人数', '园区占比(%)']
          },
          xAxis: [{
              type: 'category',
              axisTick: {
                  alignWithLabel: true
              },
              data: data.xAxis,
              axisLabel: {
                  textStyle: {
                      color: '#bcbdbf'
                  }
              }
          }],
          yAxis: [{
              type: 'value',
              name: '园区占比(%)',
              nameTextStyle: {
                  color: '#bcbdbf'
              },
              min: 0,
              max: 10,
              position: 'right',
              axisLabel: {
                  formatter: '{value} %',
                  textStyle: {
                      color: '#bcbdbf'
                  }
              }
          }, {
              type: 'value',
              name: '在职人数(人)',
              nameTextStyle: {
                  color: '#bcbdbf'
              },
              min: 0,
              position: 'left',
              axisLabel: {
                  textStyle: {
                      color: '#bcbdbf'
                  }
              }
          }],
          series: [{
              name: '占比值(%)',
              type: 'line',
              stack: '比值',
              label: {
                  normal: {
                      color: '#fff',
                      show: true,
                      position: 'top',
                  }
              },
              lineStyle: {
                  normal: {
                      width: 3,
                      color: '#f9b621',
                      shadowBlur: 10,
                      shadowOffsetY: 10
                  }
              },
              itemStyle: {
                  normal: {
                      color: '#f9b621',
                      lineStyle: {
                          color: '#f9b621'
                      }
                  }
              },
              data: data.proportion
          }, {
              name: '在职人数(人)',
              type: 'bar',
              color: ['#1eb5d4'],
              yAxisIndex: 1,
              stack: '总数',
              label: {
                  normal: {
                      show: true,
                      position: 'top',
                      formatter: function(param){
                          return param.data + '人';
                      }
                  }
              },
              data: data.number
          }]
      };
      this.parkNumberData = option4;
  }
  /*绘制关系方图表*/
  creatRelationPeople(options) {
      const categories = [
          {name: '自然人'},
          {name: '企业'}
      ];
      const data = {enterpriseName: options[0].enterpriseName, nodes: [], links: []};
      /*options.forEach(function (node) {
          node.itemStyle = null;
          node.value = node.symbolSize;
          node.symbolSize /= 1;
          node.label = {
              normal: {
                  show: true
              }
          };
          node.category = node.attributes.modularity_class;
      });*/

      options.forEach(function (node) {
          const nodeObj = {itemStyle: '', name: '', symbolSize: 10, label: {}};
          nodeObj.itemStyle = null;
          nodeObj.name = node.relationshipCompany;
          // node.value = node.symbolSize;
          nodeObj.label = {
              normal: {
                  show: true
              }
          };
          // node.category = node.attributes.modularity_class;
          data.nodes.push(nodeObj);
      });
      /*加入当前公司*/
      data.nodes.push({itemStyle: null, name: this.companyName, symbolSize: 15, label: {normal: {show: true}}});
      options.forEach((link) => {
          const linkObj = {source: this.companyName, target: '', label: {}};
          linkObj.target = link.relationshipCompany;
          linkObj.label = {
              normal: {
                  show: true,
                  formatter: link.relationship // 显示在指引线上的文字
              }
          };

          data.links.push(linkObj);
      });
      const guanxiOption = {
          title: {
              text: data.enterpriseName,
              textStyle: {
                  color: '#bcbdbf'
              },
//                subtext: 'Default layout',
//                top: 'bottom',
              left: 'center'
          },
          tooltip: {},
          animationDuration: 1500,
          animationEasingUpdate: 'quinticInOut',
          series : [
              {
                  name: data.enterpriseName,
                  type: 'graph',
                  layout: 'force',
                  data: data.nodes,
                  links: data.links,
                  categories: categories,
                  roam: true,
                  label: {
                      show: true,
                      normal: {
                          position: 'right',
                          formatter: '{b}' // 节点显示文字
                      }
                  },
                  lineStyle: {
                      normal: {
                          opacity: 0.9,
                          color: 'source',
                          curveness: 0.3
                      }
                  }
              }
          ]
      };
      this.relationPeople = guanxiOption;
  }

}
