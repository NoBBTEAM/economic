import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CHANGE } from '../../../../../core/container-ngrx/container.action';
import { ContainerStyle } from '../../../../../core/container-ngrx/container.model';
import { IntermediateService } from '../../../intermediate.service';
import { Amap } from '../../../../../core/amap-ngrx/amap.model';
import { ADD_BUILD_MARKER } from '../../../../../core/amap-ngrx/amap.actions';
declare var AMapUI: any;

@Component({
  selector: 'app-build-information',
  templateUrl: './build-information.component.html',
  styleUrls: ['./build-information.component.css']
})
export class BuildInformationComponent implements OnInit {

  constructor(private intermediateService: IntermediateService, private store: Store<ContainerStyle>, private storeAmap: Store<Amap>) {
    this.store.select('container');
  }
  buildDataList: any;
  buildCompanyList: any;
  ngOnInit() {
    this.store.dispatch({
      type: CHANGE,
      payload: {
        width: '60%'
      }
    });
    this.storeAmap.dispatch({
      type: ADD_BUILD_MARKER,
      payload: {
        action: 'ADD_BUILD_MARKER',
        data: '高新西区'
      }
    });
    this.intermediateService.getBuildInformation().subscribe(res => {
      this.buildDataList = res;
      console.log(res);
    });
    this.intermediateService.changeShowHideData();
    this.intermediateService.getBuildCompanyList('b972af30-3160-457d-b30a-fdf47111a40f').subscribe(res => {
      this.buildCompanyList = res;
    });
  }
  /*起步园楼宇信息*/
  /*parkBuildInfo(map, parkName) {
    const _that = this;
    /!*const testData = [{
      "name": "天府创业园",
      /!*"longitude": "104.038272",
      "latitude": "30.625205"*!/
      "position": [103.951875,30.750365]
    }, {
      "name": "万安",
      "address": "望京街9号望京国际商业中心E座4层",
      // "longitude": "104.042587",
      // "latitude": "30.62061"
      "position": [103.95455,30.74993]
    }, {
      "name": "龙湖时代天街 ",
      "address": "望京阜通东大街6号院4号楼方恒购物中心4F层",
      // "longitude": "104.038154",
      // "latitude": "30.619601"
      "position": [103.920767,30.753842]
    }, {
      "name": "萃峰国际",
      "position": [103.974834,30.73939]
    }
      , {
        "name": "亚光",
        "position": [103.955894,30.748391]
      }
      , {
        "name": "四海产业园（西南国际医疗）",
        "position": [103.967366,30.737558]
      }
      , {
        "name": "智汇青年",
        "position": [103.921377,30.752295]
      }
      , {
        "name": "中衡网成都智能信息",
        "position": [103.965406,30.744592]
      }
      , {
        "name": "海科大厦",
        "position": [103.981461,30.72104]
      }
      , {
        "name": "融智总部工业园",
        "position": [103.944615,30.741166]
      }
      , {
        "name": "成都智能信息产业园",
        "position": [103.965587,30.744539]
      }
      , {
        "name": "创新中心（西区孵化园）",
        "position": [103.97243,30.732486]
      }
      , {
        "name": "电子科大西区科技园",
        "position": [103.974126,30.734139]
      }
      , {
        "name": "国腾（创智联邦）",
        "position": [103.970183,30.732598]
      }
      , {
        "name": "汇都总部公园",
        "position": [103.96571,30.737778]
      }
      , {
        "name": "顺康新科孵化楼",
        "position": [103.962295,30.737145]
      }
      , {
        "name": "中海社区（海科大厦）",
        "position": [103.981461,30.72104]
      }
      , {
        "name": "宝利根",
        "position": [103.926632,30.78936]
      }
      , {
        "name": "国腾科技园",
        "position": [103.969216,30.733314]
      }
      , {
        "name": "四川西南医疗",
        "position": [103.966301,30.737952]
      }
    ];*!/

    AMapUI.loadUI(['misc/MarkerList', 'overlay/SimpleMarker', 'overlay/SimpleInfoWindow'],
      function(MarkerList, SimpleMarker, SimpleInfoWindow) {

        // 即jQuery/Zepto
        // var $ = MarkerList.utils.$;

        const defaultIconStyle = {
            src: '/economic/images/build_position_icon.png',
            style: {
              width: '40px',
              height: '50px'
            }
          }, // 默认的图标样式
          // hoverIconStyle = 'green', //鼠标hover时的样式
          hoverIconStyle = {
            src: '/economic/images/build_position_icon.png',
            style: {
              width: '60px',
              height: '70px'
            }
          }, // 鼠标hover时的样式
          selectedIconStyle = {
            src: '/economic/images/build_position_icon.png',
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
            //     /!*infoTitle: data.name,
            //     infoBody: data.address,*!/
            //     offset: new AMap.Pixel(0, -37),
            //     content: content
            // });
            return new AMap.InfoWindow({
              /!*infoTitle: data.name,
              infoBody: data.address,*!/
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
            // $(".choose-park-buid-name").html(info.selected.data.name);
            chooseBuildName = info.selected.data.name;
            chooseBuildId = info.selected.data.id;

            /!*if($(".industry-menu .menu-row:last-child li.active").length){
                $(".industry-menu .menu-row:last-child li.active").click();
            }else{
                $(".industry-menu .menu-row:last-child li:first-child").click();
            }*!/
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
          /!*$.getJSON(src, function(data) {
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
          });*!/
          // markerList.render(testData);
          /!*$.ajax({
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


          })*!/
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
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /!*or $(window).height() *!/
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) /!*or $(window).width() *!/
          );
        }

       /!* function scrollListElementIntoView($listEle) {

          if (!isElementInViewport($listEle.get(0))) {
            $('#panel').scrollTop($listEle.offset().top - $listEle.parent().offset().top);
          }

          // 闪动一下
          $listEle
            .one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
              function(e) {
                $(this).removeClass('flash animated');
              }).addClass('flash animated');
        }*!/


      });
  }*/

}
