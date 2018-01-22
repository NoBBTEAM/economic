import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
declare var echarts: any;

@Injectable()
export class IntermediateService {

  constructor() { }

  getData(flag) {
    // 天府软件园企业数和经济总值
    const mainData = {
      number: { data: [4.5, 5.8, 8.9, 9.9, 12.5, 14], name: '企业数量', type: 'bar' },
      value: { data: [2300, 2100, 3000, 3500, 4800, 6678], name: '经济产值', type: 'line' }
    };
    // 高新孵化园企业数和经济总值
    const mainData1 = {
      number: { data: [4, 5, 7, 8, 8.5, 9], name: '企业数量', type: 'bar' },
      value: { data: [2000, 2100, 2678, 3000, 3256, 4200], name: '经济产值', type: 'line' }
    };
    // 天府生命科技园企业数和经济总值
    const mainData2 = {
      number: { data: [1.3, 3.7, 7.8, 8, 8.9, 9], name: '企业数量', type: 'bar' },
      value: { data: [1234, 2100, 3000, 3500, 4800, 5000], name: '经济产值', type: 'line' }
    };
    // 天府新谷企业数和经济总值
    const mainData3 = {
      number: { data: [1.3, 3.7, 7.8, 8, 8.9, 9], name: '企业数量', type: 'bar' },
      value: { data: [1234, 2100, 3000, 3500, 500, 6000], name: '经济产值', type: 'line' }
    };
    const years = ['2012', '2013', '2014', '2015', '2016', '2017'];
    // 指定图表的配置项和数据
    const option = {
      color: ['#1eb5d4', '#f9b621', 'white', 'green', 'pink'],
      title: {
        //                text: '南部园区',
        textStyle: {
          color: '#fff',
          fontSize: 16
        },
        x: 'center'
      },
      tooltip: {
        show: true,
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyleL: {
            color: '#999'
          }
        },
        formatter: '{b} 年<br/>{a}: {c} 万' + '<br/>{a1}: {c1} 亿元'
      },
      legend: {
        data: ['企业数量', '经济产值'],
        //                top: 30,
        textStyle: {
          color: '#fff',
          fontSize: 14
        }
      },
      toolbox: {},
      grid: {
        left: '20',
        right: '10',
        bottom: '20',
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        splitLine: { show: false },
        data: years,
        axisLabel: {
          show: true,
          textStyle: {
            color: '#B2B2B2',
            fontSize: 12,
          },
          interval: 0,
        },
        axisTick: { length: 6 },
      }],
      dataZoom: [],
      yAxis: [{
        type: 'value',
        name: '企业数量（万）',
        min: 0,
        interval: 5,
        axisLabel: {

          show: true,
          textStyle: {
            color: '#B2B2B2',
            fontSize: 12,
          },
          interval: 0,
        },
        nameTextStyle: {
          color: '#B2B2B2',
          fontSize: 12
        },
        splitLine: {
          show: false
        }
      }, {
        type: 'value',
        name: '经济产值（亿）',
        min: 0,
        max: 8000,
        interval: 1000,
        axisLabel: {
          show: true,
          textStyle: {
            color: '#B2B2B2',
            fontSize: 12,
          },
          interval: 0,
        },
        nameTextStyle: {
          color: '#B2B2B2',
          fontSize: 12
        },
        splitLine: {
          show: false
        }
      }],
      series: []
    };
    const Item = () => {
      return {
        name: '',
        type: '',
        yAxisIndex: 0,
        data: [],
        barWidth: '40%'
      };
    };
    // 填充数据

    // ---------------天府软件园区
    const Series = [];
    // 企业数量
    const jsonNumber = mainData.number;
    const number = Item();
    number.name = jsonNumber.name;
    number.type = jsonNumber.type;
    number.data = jsonNumber.data;
    Series.push(number);
    // 经济总值
    const jsonValue = mainData.value;
    const value = Item();
    value.name = jsonValue.name;
    value.type = jsonValue.type;
    value.data = jsonValue.data;
    value.yAxisIndex = 1;
    Series.push(value);

    option.series = Series;
    const optionMainPart = JSON.parse(JSON.stringify(option));
    // ---------------高新孵化园
    const Series1 = [];
    // 企业数量
    const jsonNumber1 = mainData1.number;
    const number1 = Item();
    number1.name = jsonNumber1.name;
    number1.type = jsonNumber1.type;
    number1.data = jsonNumber1.data;
    Series1.push(number1);
    // 经济总值
    const jsonValue1 = mainData1.value;
    const value1 = Item();
    value1.name = jsonValue1.name;
    value1.type = jsonValue1.type;
    value1.data = jsonValue1.data;
    value1.yAxisIndex = 1;
    Series1.push(value1);

    option.series = Series1;
    const optionMainPart1 = JSON.parse(JSON.stringify(option));
    // ---------------生命科技园
    const Series2 = [];
    // 企业数量
    const jsonNumber2 = mainData2.number;
    const number2 = Item();
    number2.name = jsonNumber2.name;
    number2.type = jsonNumber2.type;
    number2.data = jsonNumber2.data;
    Series2.push(number2);
    // 经济总值
    const jsonValue2 = mainData2.value;
    const value2 = Item();
    value2.name = jsonValue2.name;
    value2.type = jsonValue2.type;
    value2.data = jsonValue2.data;
    value2.yAxisIndex = 1;
    Series2.push(value2);

    option.series = Series2;
    const optionMainPart2 = JSON.parse(JSON.stringify(option));

    // ---------------天府新谷
    const Series3 = [];
    // 企业数量
    const jsonNumber3 = mainData3.number;
    const number3 = Item();
    number3.name = jsonNumber3.name;
    number3.type = jsonNumber3.type;
    number3.data = jsonNumber3.data;
    Series3.push(number3);
    // 经济总值
    const jsonValue3 = mainData3.value;
    const value3 = Item();
    value3.name = jsonValue3.name;
    value3.type = jsonValue3.type;
    value3.data = jsonValue3.data;
    value3.yAxisIndex = 1;
    Series3.push(value3);

    option.series = Series3;
    const optionMainPart3 = JSON.parse(JSON.stringify(option));
    return new Observable<any>((observer) => {
      observer.next({
        optionMainPart: optionMainPart,
        optionMainPart1: optionMainPart1,
        optionMainPart2: optionMainPart2,
        optionMainPart3: optionMainPart3,
      });
    });
  }
}
