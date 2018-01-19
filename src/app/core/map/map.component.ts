import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { Amap } from '../../core/amap-ngrx/amap.model';
import { ViewEncapsulation } from '@angular/core';
import { MicrocosmicService } from '../../pages/microcosmic/microcosmic.service';
declare var AMap: any;
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
    private microcosmicService: MicrocosmicService) {
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
      AMap.event.addListener(map, 'zoomend', function(){
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
    });
    }, 200);

  }

}
