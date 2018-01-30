import { Component, OnInit } from '@angular/core';
import { IntermediateService } from '../../../intermediate.service';
import { Store } from '@ngrx/store';
import { CHANGE } from '../../../../../core/container-ngrx/container.action';
import { ContainerStyle } from '../../../../../core/container-ngrx/container.model';
import { CLEAR_MARKER } from '../../../../../core/amap-ngrx/amap.actions';
import { Amap } from '../../../../../core/amap-ngrx/amap.model';
declare var AMap: any;

@Component({
  selector: 'app-land-nature',
  templateUrl: './land-nature.component.html',
  styleUrls: ['./land-nature.component.css']
})
export class LandNatureComponent implements OnInit {

  colors = {
    '储备用地': '#bf7eff',
    '工业用地': '#a57c52',
    '公共设施及其他用地': '#2a8ab8',
    '科研用地': '#ff7eff',
    '商服用地': '#ff0000',
    '住宅用地': '#ffd041'
  };
  constructor(private intermediateService: IntermediateService, private store: Store<ContainerStyle>, private storeAmap: Store<Amap>) {
    this.store.select('container');
  }
  landNatureEchat: any;

  ngOnInit() {
    this.store.dispatch({
      type: CHANGE,
      payload: {
        width: '60%'
      }
    });
    this.intermediateService.getLandNatureEchat()
      .subscribe(res => {
        const conutData = this.conutTypeData(res);
        setTimeout(() => {
          this.buildCharts(conutData);
        }, 500);
      });
    this.intermediateService.getLandNaturePolygon()
      .subscribe(res => {
        this.storeAmap.dispatch({
          type: CLEAR_MARKER,
          payload: {
            action: 'CLEAR_MARKER',
            data: ''
          }
        });
      });
  }
  creatPolygonO(res) {
    const colors = {
      '储备用地': '#bf7eff',
      '工业用地': '#a57c52',
      '公共设施及其他用地': '#2a8ab8',
      '科研用地': '#ff7eff',
      '商服用地': '#ff0000',
      '住宅用地': '#ffd041'
    };
    const pointsArr = [];
    for (let i = 0; i < res.length; i++) {
      // pointsArr.push(res[i].points);
      const point_x_y = [];
      const pointItem = {
        id: '',
        inefficient: '',
        landArea: '',
        landUsrNature: '',
        unifiedLandMark: '',
        rightHolder: '',
        landCardNumber: '',
        landIsLocated: '',
        generalType: '',
        usageArea: '',
        position: []
      };
      for (let j = 0; j < res[i].points.length; j++) {
        point_x_y.push([res[i].points[j].point_80_x, res[i].points[j].point_80_y]);
      }
      pointItem.id = res[i].id;
      pointItem.unifiedLandMark = res[i].unifiedLandMark;
      pointItem.rightHolder = res[i].rightHolder;
      pointItem.landCardNumber = res[i].landCardNumber;
      pointItem.landIsLocated = res[i].landIsLocated;
      pointItem.inefficient = res[i].inefficient;
      pointItem.generalType = res[i].generalType;
      /*实测面积*/
      pointItem.landArea = res[i].landArea;
      /*使用全面积*/
      pointItem.usageArea = res[i].usageArea;
      pointItem.landUsrNature = res[i].landUsrNature;
      pointItem.position = point_x_y;
      pointsArr.push(pointItem);
    }
    // dataPolygonNatureLands = pointsArr;
    const newpointers = pointsArr;
    // -----
    let color;
    for (let i = 0; i < newpointers.length; i++) {

      if (newpointers[i].generalType === '储备用地') {
        color = colors[0];
        // var color ='transparent'
      } else if (newpointers[i].generalType === '工业用地') {
        color = colors[1];
      } else if (newpointers[i].generalType === '公共设施及其他用地') {
        color = colors[2];
      } else if (newpointers[i].generalType === '科研用地') {
        color = colors[3];
      } else if (newpointers[i].generalType === '商服用地') {
        color = colors[4];
      } else if (newpointers[i].generalType === '住宅用地') {
        color = colors[5];
      } else {
        color = colors[6];
      }

      const polygonOptions = {
        map: map,
        strokeColor: '#fff',
        // strokeColor: color,
        strokeWeight: 2,
        fillColor: color,
        fillOpacity: 0.8,
        /*strokeStyle: 'dashed',
        strokeDasharray: [20,10],*/
        extData: {
          id: newpointers[i].id,
          type: newpointers[i].type,
          landType: newpointers[i].landType,
          landCardNumber: newpointers[i].landCardNumber,
          landArea: newpointers[i].landArea,
          usageArea: newpointers[i].usageArea,
          /*按性质分类*/
          generalType: newpointers[i].generalType,
          landUsrNature: newpointers[i].landUsrNature,
          unifiedLandMark: newpointers[i].unifiedLandMark,
          landIsLocated: newpointers[i].landIsLocated,
          rightHolder: newpointers[i].rightHolder,
          color: color,
          slected: false
        }
      };
      // 外多边形坐标数组和内多边形坐标数组
      const pointers = newpointers[i].position;
      const polygonNatureLand = new AMap.Polygon(polygonOptions);
      polygonNatureLand.on('click', function (e) {
        /*看数据*/
        console.log(this.getExtData());
        if (!this.getExtData().slected) {
          // var lanTitle = idustryParkName;
          const landArea = this.getExtData().landArea;
          const landUsrNature = this.getExtData().landUsrNature;
          const that = this;
          const unifiedLandMark = this.getExtData().unifiedLandMark;
          // chooseLanId = unifiedLandMark;
          // $('.industry-menu .menu-row:last-child li:first-child').click();
          // $('.industry-menu .menu-row:last-child li:first-child').siblings().hide();
          // 在地图上改变当前点击的多边形
          /*for(var i=0;i<polygonNatureLands.lands.length;i++){
            if(polygonNatureLands.lands[i].getExtData().slected){
              polygonNatureLands.lands[i].setOptions({strokeColor:'#fff',fillColor:polygonNatureLands.lands[i].getExtData().color});
              var oldExtData = polygonNatureLands.lands[i].getExtData();//先保存原始ExtData数据
              oldExtData.slected = false;//改变之前选中的状态为false
              polygonNatureLands.lands[i].setExtData(oldExtData)//更新之前选中的ExtData
              break;
            }
          }*/
          const newExtData = this.getExtData();
          newExtData.slected = true;
          // this.setOptions({strokeColor:selectedColor,fillColor:selectedColor});
          this.setExtData(newExtData);
          // var options = {lanTitle:lanTitle,landArea:landArea,landUsrNature:landUsrNature,polygon:that};
          // landInfoWindowFn(map,options,'polygonNatureLands');
          // viewLandPanel(this.getExtData())
        }
      });
      polygonNatureLand.on('mouseover', function (e) {
      });
      polygonNatureLand.on('mouseout', function (e) {
        // landInfoWindow.close()
      });
      // console.log(polygon)
      polygonNatureLand.setPath(pointers);
      // polygonNatureLands.lands.push(polygonNatureLand);
    }
  }
  /*组装为echart需要的数据*/
  conutTypeData(arr) {
    arr.shift();
    const result = [];
    arr.forEach(function (item, index) {
      result.push({
        name: item[1],
        value: item[0]
      });
    });
    return result;
  }
  buildCharts(conutData) {
    let newData = [];
    for (let i = 0; i < conutData.length; i++) {
      if (!conutData[i].build) {
        if (conutData[i].name !== '1' &&
          conutData[i].name !== '2' &&
          conutData[i].name !== '3' &&
          conutData[i].name !== '4' &&
          conutData[i].name !== '5' &&
          conutData[i].name !== '6' &&
          conutData[i].name !== '7' &&
          conutData[i].name !== '8' &&
          conutData[i].name !== '9' &&
          conutData[i].name !== '10') {
          newData.push(conutData[i]);
        }
      } else {
        newData = conutData;
      }
    }
    const industryType = newData;
    const legendData = [];
    const COLORS = [];
    for (let i = 0; i < industryType.length; i++) {
      legendData.push(industryType[i].name);
      COLORS.push(this.colors[industryType[i].name]);
    }
    console.log(industryType);
    console.log(legendData);
    const option = {
      color: COLORS,
      title: {
        text: '用地性质占比',
        x: 'center',
        textStyle: {
          color: '#fff',
          fontSize: 16
        },
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
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
      series: [
        {
          name: '用地性质占比',
          type: 'pie',
          radius: '45%',
          center: ['65%', '60%'],
          /*data:[
              {value:335, name:'国有企业'},
              {value:1548, name:'私营企业'},
              {value:234, name:'外商投资企业'},
              {value:135, name:'集体所有制企业'},
              {value:154, name:'股份制企业'}
          ],*/
          data: industryType,
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
    this.landNatureEchat = option;
  }
}
