import { Component, OnInit } from '@angular/core';
import { CompanyOverviewInfoService } from './company-overview-info.service';
declare var $: any;

@Component({
  selector: 'app-company-overview-info',
  templateUrl: './company-overview-info.component.html',
  styleUrls: ['./company-overview-info.component.css'],
  providers: [CompanyOverviewInfoService]
})
export class CompanyOverviewInfoComponent implements OnInit {

  constructor(private companyOverviewInfoService: CompanyOverviewInfoService) { }
  radarMapEchartData: any;
  inferiorityLists = [];
  echartsParams = { enterpriseName: 'test1', currentPage: 0, pageSize: 20, lastRowKey: '' };
  ngOnInit() {
    this.companyOverviewInfoService.findListByUrl(this.echartsParams, 'companyEvaluationScoreUrl').subscribe(res => {
      this.creatRadarMap(res.data.eAEvaluationPojos);
    });
    this.companyOverviewInfoService.findListByUrl(this.echartsParams, 'companyEvaluationTagUrl').subscribe(res => {
      this.creat3DcloudTag(res.data.eAEvaluationPojos);
    });
    this.companyOverviewInfoService.findListByUrl(this.echartsParams, 'companyInferiorityUrl').subscribe(res => {
      console.log(res);
      this.inferiorityLists = res.data.eAEvaluationPojos;
    });
  }
  /*绘制评价雷达图*/
  creatRadarMap(options) {
    const echartData = {indicatorData: [], serviceData: []};
    options.forEach((v, i) => {
      echartData.indicatorData.push({ text: v.scoringType, max: 10 , color: '#f9b620'});
      echartData.serviceData.push(v.score);
    });
    const option = {
      title: {
        text: '评分',
        left: 'center',
        textStyle: {
          color: '#bcbdbf'
        }
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
      legend: {
        data: ['评分', '评价'],
        textStyle: {
          color: '#bcbdbf'
        },
        top: 40
      },
      radar: [
        {
          indicator: echartData.indicatorData,
          radius: 135
        }
      ],
      series: [
        {
          name: '评分 (分)',
          type: 'radar',
          data: [
            {
              // value: JSON.parse(result.evaluate).num,
              value: echartData.serviceData,
              name: '评分',
              label: {
                normal: {
                  color: '#20d1f9',
                  show: true,
                  formatter: function(params) {
                    return params.value + '分';
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: '#20d1f9',
                }
              },
              lineStyle: {
                normal: {
                  color: '#20d1f9'
                }
              }
            }
          ]
        }
      ]
    };
    this.radarMapEchartData = option;
  }
  /*创建3D云标签*/
  creat3DcloudTag(options) {
    // --------------------------3D 词云图 -----------------
      const entries = [
        { label: '', fontColor: 'red', fontSize: 38, target: '_button' },
        { label: '', fontColor: '#C71585', fontSize: 28, target: '_top' },
        { label: '', url: '', target: '_top' },
        { label: '', fontColor: '#0000FF', fontSize: 28, target: '_top' },
        { label: '',  target: '_top' },
        { label: '',  target: '_top' },
        { label: '', target: '_top' },
        { label: '',  target: '_top' },
        { label: '',  target: '_top' },
        { label: '',  target: '_top' },
        { label: '', fontColor: '#6495ED', fontSize: 28,  target: '_top' },
        { label: '',  target: '_top' },
        { label: '',  target: '_top' },
        { label: '',  target: '_top' },
        { label: '', fontColor: '#98FB98', fontSize: 28,  target: '_top' },
        { label: '',  target: '_top' },
        { label: '',  target: '_top' },
        { label: '', target: '_top' },
        { label: '',  target: '_top' },
        { label: '',  target: '_top' },
        { label: '',  target: '_top' },
        { label: '',  target: '_top' },
        { label: '',  target: '_top' },
        { label: '',  target: '_top' },
        { label: '',  target: '_top' },
        { label: '',  target: '_top' },
        { label: '',  target: '_top' },
        { label: '',  target: '_top' },
      ];
      options.forEach((v, i) => {
        entries[i].label = v.label;
      })
      /*for (let i = 0; i < options.value.length; i++) {
        entries[i].label = options.value[i];
      }*/
      const settings = {
        entries: entries,
//                width: "100%",
        width: 500,
        height: 500,
//                radius: '65%',//图像大小
        radiusMin: 75,
        bgDraw: true,
        bgColor: 'transparent',
        opacityOver: 1.00,
        opacityOut: 0.3, // 控制悬停与一个标签上时,其他标签的透明度
        opacitySpeed: 6,
        fov: 800,
        speed: 0.5, // 控制旋转速度
        fontFamily: 'Oswald, Arial, sans-serif',
        fontSize: '18',
        fontColor: '#8B4513',
        fontWeight: 'normal', // bold
        fontStyle: 'normal', // italic
        fontStretch: 'normal', // wider, narrower, ultra-condensed, extra-condensed
        fontToUpperCase: true,
        tooltipFontFamily: 'Oswald, Arial, sans-serif',
        tooltipFontSize: '11',
        tooltipFontColor: 'red',
        tooltipFontWeight: 'normal', // bold
        tooltipFontStyle: 'normal', // italic
        tooltipFontStretch: 'normal', // wider, narrower, ultra-condensed, extra-condensed, condensed
        tooltipFontToUpperCase: false,
        tooltipTextAnchor: 'left',
        tooltipDiffX: 0,
        tooltipDiffY: 10

      };

      // var svg3DTagCloud = new SVG3DTagCloud( document.getElementById( 'holder'  ), settings );
      $( '#holder' ).svg3DTagCloud( settings );
  }

}
