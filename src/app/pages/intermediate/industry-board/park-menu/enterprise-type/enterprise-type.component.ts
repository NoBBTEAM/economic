import { Component, OnInit } from '@angular/core';
import { IntermediateService } from '../../../intermediate.service';

@Component({
  selector: 'app-enterprise-type',
  templateUrl: './enterprise-type.component.html',
  styleUrls: ['./enterprise-type.component.css']
})
export class EnterpriseTypeComponent implements OnInit {

  constructor(private intermediateService: IntermediateService) { }
  companyTypeNum: any;
  companyTypeIncome: any;

  colors = {
    '生物医药': '#ff7e9f',
    '电子信息': '#ff7e00',
    '精密制造': '#a57c52',
    '其他': '#7d7dff',
    '服务业': '#ff0000'
  }
  ngOnInit() {
    /*显示当前菜单二级菜单*/
    this.intermediateService.showIndustryMenus('ParkMenu');
    const chooseTime = new Date().getFullYear() - 1;
    this.intermediateService.getParkCompanyType()
      .subscribe(res => {
        const typeList = res;
        const conutData = this.conutTypeData(typeList)
        console.log(conutData)
        this.buildCharts(conutData);
      });
    this.intermediateService.getParkCompanyIncome(chooseTime)
      .subscribe(res => {
        this.setIncomeChart(res);
      });
  }
  /*组装为echart需要的数据*/
  conutTypeData(arr) {
    var nameArr = [];
    var result = [];
    for(var i=0;i<arr.length;i++){
      // console.log(arr[i]);
      var j;
      if(arr[i].total){
        if( (j=nameArr.indexOf(arr[i].type))>-1){
          /*for(var j=0;j<result.length;j++){
              if(result[j].name == arr[i]){
                  result[j].value +=1;
              }
          }*/
          result[j].value +=arr[i].total;
        }else{
          nameArr.push(arr[i]);
          result.push({
            value:arr[i].total,
            name:arr[i].type
          })
        }
      }else{
        if( (j=nameArr.indexOf(arr[i]))>-1){
          /*for(var j=0;j<result.length;j++){
              if(result[j].name == arr[i]){
                  result[j].value +=1;
              }
          }*/
          result[j].value +=1;
        }else{
          nameArr.push(arr[i]);
          result.push({
            value:arr[i][2],
            valueIncome: arr[i][0],
            name:arr[i][1],
            build: true
          })
        }
      }
    }
    return result;
  }
  buildCharts(conutData) {
    // var myChartIncome = echarts.init(document.getElementById('industry-type-income'));
    var newData = [];
    for(var i=0;i<conutData.length;i++){
      if(!conutData[i].build){
        if(conutData[i].name !="1" && conutData[i].name !="2" && conutData[i].name !="3" && conutData[i].name !="4" && conutData[i].name !="5" && conutData[i].name !="6" && conutData[i].name !="7" && conutData[i].name !="8" && conutData[i].name !="9" && conutData[i].name !="10"){
          newData.push(conutData[i]);
        }
      }else{
        newData = conutData;
      }
    }
    var industryType = newData;
    var industryTypeIncome = [];
    console.log("收入====================", industryTypeIncome)
    var legendData = [];
    var COLORS = [];
    for(var i=0;i<industryType.length;i++){
      legendData.push(industryType[i].name)
      COLORS.push(this.colors[industryType[i].name])
    }
    console.log(industryType)
    console.log(legendData)
    const option = {
      color : COLORS,
      title : {
        text: '企业类型的数量占比',
        x:'center',
        textStyle: {
          color: '#fff',
          fontSize: 16
        },
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)",
        axisPointer: {
          type: 'cross',
          crossStyleL: {
            color: '#999'
          }
        },
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        // data: ['国有企业','私营企业','外商投资企业','集体所有制企业','股份制企业'],
        data: legendData,
        textStyle: {
          color: '#fff',
          fontSize: 14
        },
        top: '10%'
      },
      series : [
        {
          name: '企业类型的数量占比',
          type: 'pie',
          radius : '45%',
          center: ['65%', '60%'],
          /*data:[
              {value:335, name:'国有企业'},
              {value:1548, name:'私营企业'},
              {value:234, name:'外商投资企业'},
              {value:135, name:'集体所有制企业'},
              {value:154, name:'股份制企业'}
          ],*/
          data:industryType,
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: true
            }
          },
          lableLine: {
            normal: {
              show: false
            },
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    this.companyTypeNum = option;
    // myChartIncome.setOption(optionIncome);
  }
  setIncomeChart(arr) {
    var industryTypeIncome = [];
    arr.forEach(function(item, index) {
      industryTypeIncome.push({
        name: item.enterpriseType,
        value: item.operatingIncome
      })
    })
    var legendData = [];
    var COLORS = [];
    for(var i=0;i<industryTypeIncome.length;i++){
      legendData.push(industryTypeIncome[i].name)
      COLORS.push(this.colors[industryTypeIncome[i].name]);
    }
    const optionIncome = {
      color : COLORS,
      title : {
        text: '企业类型的营业收入占比',
        x:'center',
        textStyle: {
          color: '#fff',
          fontSize: 16
        },
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)",
        axisPointer: {
          type: 'cross',
          crossStyleL: {
            color: '#999'
          }
        },
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        // data: ['国有企业','私营企业','外商投资企业','集体所有制企业','股份制企业'],
        data: legendData,
        textStyle: {
          color: '#fff',
          fontSize: 14
        },
        top: '10%'
      },
      series : [
        {
          name: '企业类型的营业收入占比',
          type: 'pie',
          radius : '45%',
          center: ['65%', '60%'],
          /*data:[
              {value:335, name:'国有企业'},
              {value:1548, name:'私营企业'},
              {value:234, name:'外商投资企业'},
              {value:135, name:'集体所有制企业'},
              {value:154, name:'股份制企业'}
          ],*/
          data:industryTypeIncome,
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: true
            }
          },
          lableLine: {
            normal: {
              show: false
            },
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    this.companyTypeIncome = optionIncome;
  }

}
