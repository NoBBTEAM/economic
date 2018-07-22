import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { Amap } from '../../core/amap-ngrx/amap.model';
import { ViewEncapsulation } from '@angular/core';
import { MicrocosmicService } from '../../pages/microcosmic/microcosmic.service';
import { IntermediateService } from '../../pages/intermediate/intermediate.service';
import { Router } from '@angular/router';
declare var AMap: any;
declare var AMapUI: any;
// declare var $: any;

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-map',
  template: `<div id='t-amap' class='t-amap'></div>`,
  styleUrls: ['map.component.css']
})
export class MapComponent implements OnInit {

  tagState$: Observable<Amap>;
  constructor(private store: Store<Amap>,
    private router: Router,
    private microcosmicService: MicrocosmicService,
    private intermediateService: IntermediateService) {
    this.tagState$ = this.store.select('amap');
  }

  AMAPOBJ: any;
  amap: any;
  action: any;


  ngOnInit() {
    // this.tagState$.subscribe((state: Amap) => {
    //   console.log(this.AMAPOBJ);
    // });
    setTimeout(() => {
      const map = new AMap.Map('t-amap');
      this.AMAPOBJ = map;
      this.action = {
        'openInfo': (data) => {
          const infoWindow = new AMap.InfoWindow({
            content: data.contentArray.join('<br/>')  // 使用默认信息窗体框样式，显示信息内容
          });
          infoWindow.open(map, map.getCenter());
        },
        'ADD_MARKER': (data) => {
          data.forEach((item, index) => {
            const marker = new AMap.Marker({
              position: item.center.split(','),
              title: item.name,
              map: map,
              content: `<div class="mapMarker"><span>${item.name}</span></div>`
            });
            marker.on('click', () => {
              console.log(marker.F.title);
              this.microcosmicService.changeData(marker.F.title);
            });
          });
          map.setFitView();
          map.panBy(-580, 10);
        },
        'ADD_MARKER_MID': (data) => {
          data.forEach((item, index) => {
            const marker = new AMap.Marker({
              position: item.center.split(','),
              title: item.name,
              map: map,
              content: `<div class="mapMarker"><span>${item.name}</span></div>`
            });
            marker.on('click', (e) => {
              console.log(marker.F.title);
              console.log(e);
              marker.setContent(`<div class="mapMarker active"><span>${item.name}</span></div>`);
              this.intermediateService.changeParkName(marker.F.title);
              /*点击中观园区进入园区数据看板*/
              this.router.navigate(['/int/industryBoard/parkMenu/registMoney']);
            });
          });
          map.setFitView();
          // map.setZoom(12);
          map.panBy(-580, 10);
        },
        'ADD_POLYGON': (data) => {
          map.clearMap();
          const polygonres = this.intermediateService.getSavePolygonLands(data);
          console.log(polygonres);
            if ( data === 'dataPolygonNatureLands' ) {
              if (polygonres.length < 1) {
              const PolygonData = this.intermediateService.getLandNaturePolygon()
                .subscribe(res => {
                  this.creatNaturePolygon(map, res);
                  this.intermediateService.changePolygonLands(data, res);
                  map.setFitView();
                  map.panBy(-540, 10);
                });
              }else {
                this.creatNaturePolygon(map, polygonres);
              }
            }else if ( data === 'dataPolygonSingleLands') {
              if (polygonres.length < 1) {
                this.intermediateService.getSingleFloorPolygon().subscribe(res => {
                  this.creatSingleFloorPolygon(map, res);
                  this.intermediateService.changePolygonLands(data, res);
                  map.setFitView();
                  map.panBy(-540, 10);
                });
              }else {
                this.creatSingleFloorPolygon(map, polygonres);
              }
            }
        },
        'ADD_BUILD_MARKER': (data) => {
          this.parkBuildInfo(map, data);
          map.off('zoomend', function (e) {
            console.log(e);
          });
        },
        'CLEAR_MARKER': (data) => {
          map.clearMap();
        }
      };
      this.tagState$.subscribe((state: Amap) => {
        if (state.action) {
          this.action[state.action](state.data);
        }
      });
      map.plugin('AMap.Geolocation', () => {
        const geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, // 是否使用高精度定位，默认:true
          timeout: 10000,          // 超过10秒后停止定位，默认：无穷大
          maximumAge: 0,           // 定位结果缓存0毫秒，默认：0
          convert: true,           // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          viewMode: '3D',
          zoom: '12',
          showButton: false,        // 显示定位按钮，默认：true
          buttonPosition: 'LB',    // 定位按钮停靠位置，默认：'LB'，左下角
          buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          showMarker: true,        // 定位成功后在定位到的位置显示点标记，默认：true
          showCircle: true,        // 定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: true,     // 定位成功后将定位到的位置作为地图中心点，默认：true
          zoomToAccuracy: true     // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        });
        map.addControl(geolocation);
      });
      /*AMap.event.addListener(map, 'zoomend', function(){
        const zoom = map.getZoom();
        const markers = map.getAllOverlays('marker');
        if (zoom <= 12) {
            markers.forEach(function(item, index) {
                item.show();
            });
        } else {
            markers.forEach(function(item, index) {
                item.hide();
            });
        }
        // map.getAllOverlays('marker')[0].hide()
    });*/
    }, 200);

  }
  creatNaturePolygon(map, res) {
    const _that = this;
    const colors = ['#fff', '#a57c52', '#2a8ab8', '#ff7eff', '#ff0000', '#ffdf7e', '#ffd041'];
    const selectedColor = '#41bb9a';
    const defaultBorderColor = '#8ee3a2';
    const defaultLandColor = 'transparent';
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

    // this.intermediateService.changePolygonNatureLands(pointsArr);
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
          // 在地图上改变之前点击的多边形
          const selectedLand = _that.intermediateService.getSelectedLand();
          if (selectedLand) {
            selectedLand.setOptions({strokeColor: '#fff', fillColor: selectedLand.getExtData().color});
            const oldExtData = selectedLand.getExtData(); // 先保存原始ExtData数据
            oldExtData.slected = false; // 改变之前选中的状态为false
            selectedLand.setExtData(oldExtData); // 更新之前选中的ExtData
          }
          // 保存当前点击的多边形
          _that.intermediateService.changeSelectedLand(this);
          const newExtData = this.getExtData();
          newExtData.slected = true;
          this.setOptions({strokeColor: selectedColor, fillColor: selectedColor});
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
  creatSingleFloorPolygon(map, res) {
    const _that = this;
    const selectedColor = '#41bb9a';
    const defaultBorderColor = '#8ee3a2';
    const defaultLandColor = 'transparent';
    const pointsArr = [];
    for (let i = 0; i < res.length; i++) {
      const point_x_y = [];
      const pointItem = {id: '',
        unifiedLandMark: '',
        rightHolder: '',
        landIsLocated: '',
        actualUsers: '',
        isFloor: '',
        landCardNumber: '',
        generalType: '',
        position: [],
        inefficient: '',
        landArea: '',
        usageArea: '',
        landUsrNature: ''};
      for (let j = 0; j < res[i].points.length; j++) {
        point_x_y.push([res[i].points[j].point_80_x, res[i].points[j].point_80_y]);
      }
      pointItem.id = res[i].id;
      pointItem.unifiedLandMark = res[i].unifiedLandMark;
      pointItem.rightHolder = res[i].rightHolder;
      pointItem.landIsLocated = res[i].landIsLocated;
      pointItem.inefficient = res[i].inefficient;
      pointItem.actualUsers = res[i].actualUsers;
      pointItem.isFloor = res[i].isFloor;
      pointItem.landCardNumber = res[i].landCardNumber;
      /*按性质分类*/
      pointItem.generalType = res[i].generalType;
      /*实测面积*/
      pointItem.landArea = res[i].landArea;
      /*使用全面积*/
      pointItem.usageArea = res[i].usageArea;
      pointItem.landUsrNature = res[i].landUsrNature;
      pointItem.position = point_x_y;
      pointsArr.push(pointItem);
    }
    // dataPolygons = pointsArr;
    const newpointers = pointsArr;
    // -----

    let color;
    for (let i = 0; i < newpointers.length; i++) {
      const borderColor = defaultBorderColor;
      if ((newpointers[i].actualUsers)) {
        color = '#4747f1';
        // var color ="transparent"
      }else if (newpointers[i].isFloor) {
        color = '#f9b620';
      }else {
        color = '#8fd9dd';
      }
      const polygonOptions = {
        map: map,
        strokeColor: '#fff',
        // strokeColor: color,
        strokeWeight: 2,
        fillColor: color,
        fillOpacity: 0.8,
        /*strokeStyle: "dashed",
        strokeDasharray: [20,10],*/
        extData: {
          id: newpointers[i].id,
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
      /*var pathArray = [
          pointers.outer,
          pointers.inner,
          pointers.inner2
      ];*/
      const polygon = new AMap.Polygon(polygonOptions);
      polygon.on('click', function(e){
        /*看数据*/
        console.log(this.getExtData())
        if (!this.getExtData().slected) {
          // const lanTitle = idustryParkName;
          const landArea = this.getExtData().landArea;
          const landUsrNature = this.getExtData().landUsrNature;
          const that = this;
          const unifiedLandMark = this.getExtData().unifiedLandMark;
          // chooseLanId = unifiedLandMark;
          // $(".industry-menu .menu-row:last-child li:first-child").click();
          // $(".industry-menu .menu-row:last-child li:first-child").siblings().hide();
          // 在地图上改变当前点击的多边形
         /* for (let i = 0; i<polygons.lands.length; i++){
            if(polygons.lands[i].getExtData().slected){
              polygons.lands[i].setOptions({strokeColor:"#fff",fillColor:polygons.lands[i].getExtData().color});
              var oldExtData = polygons.lands[i].getExtData();//先保存原始ExtData数据
              oldExtData.slected = false;//改变之前选中的状态为false
              polygons.lands[i].setExtData(oldExtData)//更新之前选中的ExtData
              break;
            }
          }*/
          // 在地图上改变之前点击的多边形
          const selectedLand = _that.intermediateService.getSelectedLand();
          if (selectedLand) {
            selectedLand.setOptions({strokeColor: '#fff', fillColor: selectedLand.getExtData().color});
            const oldExtData = selectedLand.getExtData(); // 先保存原始ExtData数据
            oldExtData.slected = false; // 改变之前选中的状态为false
            selectedLand.setExtData(oldExtData); // 更新之前选中的ExtData
          }
          // 保存当前点击的多边形
          _that.intermediateService.changeSelectedLand(this);
          const newExtData = this.getExtData();
          newExtData.slected = true;
          this.setOptions({strokeColor: selectedColor, fillColor: selectedColor});
          this.setExtData(newExtData);
          // var options = {lanTitle:lanTitle,landArea:landArea,landUsrNature:landUsrNature,polygon:that};
          // landInfoWindowFn(map,options,"polygons");
          // viewLandPanel(this.getExtData())
        }

      })
      polygon.on('mouseover', function(e){
        // console.log(e)
        // var lanTitle = idustryParkName;
        // var landArea = this.getExtData().landArea;
        // var landUsrNature = this.getExtData().landUsrNature;
        // var that = this;
        // var options = {lanTitle:lanTitle,landArea:landArea,landUsrNature:landUsrNature,polygon:that}
        // landInfoWindowFn(map,options);
      })
      polygon.on('mouseout', function(e){
        // landInfoWindow.close()
      })
      // console.log(polygon)
      polygon.setPath(pointers);
      // polygons.lands.push(polygon);

    }
  }
  /*楼宇信息*/
  parkBuildInfo(map, parkName) {
    const _that = this;
    AMapUI.loadUI(['misc/MarkerList', 'overlay/SimpleMarker', 'overlay/SimpleInfoWindow'],
      function(MarkerList, SimpleMarker, SimpleInfoWindow) {

        const defaultIconStyle = {
            src: '../assets/images/build_position_icon.png',
            style: {
              width: '40px',
              height: '50px'
            }
          }, // 默认的图标样式
          // hoverIconStyle = 'green', //鼠标hover时的样式
          hoverIconStyle = {
            src: '../assets/images/build_position_icon.png',
            style: {
              width: '60px',
              height: '70px'
            }
          }, // 鼠标hover时的样式
          selectedIconStyle = {
            src: '../assets/images/build_position_icon.png',
            style: {
              width: '60px',
              height: '70px'
            }
          } // 选中时的图标样式
        ;
        const iconOffset = {
          defaultOffset: new AMap.Pixel(-20, -35), // 默认的图标样式
          hoverOffset: new AMap.Pixel(-28, -50), // 鼠标hover时的样式
          selectedOffset: new AMap.Pixel(-28, -50) // 选中时的图标样式
        };
        const markerList = new MarkerList({
          map: map,
          // ListElement对应的父节点或者ID
          listContainer: 'myList', // document.getElementById("myList"),
          // 选中后显示

          // 从数据中读取位置, 返回lngLat
          getPosition: function(item) {
            // return [item.longitude, item.latitude];
            return item.position;
          },
          // 数据ID，如果不提供，默认使用数组索引，即index
          getDataId: function(item, index) {

            return item.id;
          },
          getInfoWindow: function(data, context, recycledInfoWindow) {
            const tpl = '<div class="build-info-window"><%- data.name %><div>';
            // MarkerList.utils.template支持underscore语法的模板
            const content = MarkerList.utils.template(tpl, {
              data: data
            });
            if (recycledInfoWindow) {

              // recycledInfoWindow.setInfoTitle(data.name);
              // recycledInfoWindow.setInfoBody(data.address);
              recycledInfoWindow.setContent(content);

              return recycledInfoWindow;
            }

            // return new SimpleInfoWindow({
            //     /*infoTitle: data.name,
            //     infoBody: data.address,*/
            //     offset: new AMap.Pixel(0, -37),
            //     content: content
            // });
            return new AMap.InfoWindow({
              /*infoTitle: data.name,
              infoBody: data.address,*/
              offset: new AMap.Pixel(-15, -37),
              content: content
            });
          },
          // 构造marker用的options对象, content和title支持模板，也可以是函数，返回marker实例，或者返回options对象
          getMarker: function(data, context, recycledMarker) {

            const label = String.fromCharCode('A'.charCodeAt(0) + context.index);

            if (recycledMarker) {
              recycledMarker.setIconLabel(label);
              return;
            }

            return new SimpleMarker({
              containerClassNames: 'build-marker',
              iconStyle: defaultIconStyle,
              // iconLabel: label,
              // 设置基点偏移
              offset: iconOffset.defaultOffset
            });
          },
          // 构造列表元素，与getMarker类似，可以是函数，返回一个dom元素，或者模板 html string
          getListElement: function(data, context, recycledListElement) {
            // console.log(data,context,recycledListElement)
            const label = String.fromCharCode('A'.charCodeAt(0) + context.index);

            // 使用模板创建
            const innerHTML = MarkerList.utils.template(
              '<div class="poi-info-left">' +
              '    <h5 class="poi-title"><span class="fa fa-building-o build-name-icon"></span>' +
              '        <%- data.name %>' +
              '    </h5>' +
              '</div>' +
              '<div class="clear"></div>', {
                data: data,
                label: label
              });

            if (recycledListElement) {
              recycledListElement.innerHTML = innerHTML;
              return recycledListElement;
            }

            return '<li class="poibox">' +
              innerHTML +
              '</li>';
          },
          // 列表节点上监听的事件
          listElementEvents: ['click', 'mouseenter', 'mouseleave'],
          // marker上监听的事件
          markerEvents: ['click', 'mouseover', 'mouseout'],
          // makeSelectedEvents:false,
          selectedClassNames: 'selected',
          autoSetFitView: false
        });

        // window.markerList = markerList;

        markerList.on('selectedChanged', function(event, info) {
          // $("#myList").hide();
          map.panBy(-580, 40);
          // $("#myList").slideUp("fast");
          // $(".build-arrow").removeClass("active");
          if (info.selected) {
            _that.intermediateService.getBuildCompanyList(info.selected.data.id);
            _that.intermediateService.changeShowHideData('showBuildMarkerEl', false, info.selected.data.name, info.selected.data.id);
            // $(".choose-park-buid-name").html(info.selected.data.name);
            // chooseBuildName = info.selected.data.name;
            // chooseBuildId = info.selected.data.id;

            /*if($(".industry-menu .menu-row:last-child li.active").length){
                $(".industry-menu .menu-row:last-child li.active").click();
            }else{
                $(".industry-menu .menu-row:last-child li:first-child").click();
            }*/
            console.log(info);

            if (info.selected.marker) {
              // 更新为选中样式
              info.selected.marker.setIconStyle(selectedIconStyle);
              info.selected.marker.setOffset(iconOffset.selectedOffset);
            }

            // 选中并非由列表节点上的事件触发，将关联的列表节点移动到视野内
            if (!info.sourceEventInfo.isListElementEvent) {

              if (info.selected.listElement) {
                // scrollListElementIntoView($(info.selected.listElement));
              }
            }
          }

          if (info.unSelected && info.unSelected.marker) {
            // 更新为默认样式
            info.unSelected.marker.setIconStyle(defaultIconStyle);
            info.unSelected.marker.setOffset(iconOffset.defaultOffset);
          }
        });

        markerList.on('listElementMouseenter markerMouseover', function(event, record) {

          if (record && record.marker) {

            forcusMarker(record.marker);

            // this.openInfoWindowOnRecord(record);

            // 非选中的id
            if (!this.isSelectedDataId(record.id)) {
              // 设置为hover样式
              record.marker.setIconStyle(hoverIconStyle);
              record.marker.setOffset(iconOffset.hoverOffset);
              // this.closeInfoWindow();
            }
          }
        });

        markerList.on('listElementMouseleave markerMouseout', function(event, record) {

          if (record && record.marker) {

            if (!this.isSelectedDataId(record.id)) {
              // 恢复默认样式
              record.marker.setIconStyle(defaultIconStyle);
              record.marker.setOffset(iconOffset.defaultOffset);
            }
          }
        });

        // 数据输出完成
        markerList.on('renderComplete', function(event, records) {
          map.setFitView();
          map.panBy(-580, 40);

        });

        // markerList.on('*', function(type, event, res) {
        //     console.log(type, event, res);
        // });

        // 加载数据
        function loadData(src, callback) {
          console.log(src)
          /*$.getJSON(src, function(data) {
              console.log(data.result)
  for(var i=0;i<data.result.length;i++){
                  if(parkName == data.result[i].name){

                      //渲染数据
                      markerList.render(data.result[i].info);
                  }
  }
          // markerList._dataSrc = src;

          //渲染数据
          // markerList.render(data);
          // markerList.render(testData);

          if (callback) {
              callback(null, data);
          }
          });*/
          // markerList.render(testData);
          /*$.ajax({
            // url:"/v1/company/getLet",
            url:"/v1/floor/findAll",
            type:"GET",
            dataType:"json",
            data:{},
            success:function(res){
              const result = [];
              for (let i = 0; i < res.length; i++) {
                if (res[i].coordinate) {
                  let list = {id: '', name: '', position: []};
                  list = res[i];
                  list.id = res[i].id;
                  list.name = res[i].floorName;
                  list.position = res[i].coordinate.split(',');
                  result.push(list);
                }
              }
              /!*for(var k in res){
                  var list={};
                  list.name = k;
                  list.position = res[k].split(",");
                  result.push(list);
              }*!/
              // 渲染数据
              markerList.render(result);
            },error:function(err){
              console.log(err)
            }


          })*/
        }
        _that.intermediateService.getBuildPositionList().subscribe(res => {
          const result = [];
          for (let i = 0; i < res.length; i++) {
            if (res[i].coordinate) {
              let list = {id: '', name: '', position: []};
              list = res[i];
              list.id = res[i].id;
              list.name = res[i].floorName;
              list.position = res[i].coordinate.split(',');
              result.push(list);
            }
          }
          // 渲染数据
          markerList.render(result);
        })
        // loadData($btns.attr('data-path'));
        // loadData("http://localhost:63342/economic/middleViews/test.json");
        // loadData("/economic/middleViews/test.json");
        // loadData();

        function forcusMarker(marker) {
          marker.setTop(true);
          // map.panBy(-580,40);
          // 不在地图视野内
          if (!(map.getBounds().contains(marker.getPosition()))) {

            // 移动到中心
            // map.setCenter(marker.getPosition());
          }
        }

        function isElementInViewport(el) {
          const rect = el.getBoundingClientRect();

          return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
          );
        }
      });
  }
}
