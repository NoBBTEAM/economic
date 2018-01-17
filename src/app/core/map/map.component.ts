import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { Amap } from '../../core/amap-ngrx/amap.model';
import { ViewEncapsulation } from '@angular/core';
declare var AMap: any;
declare var $: any;

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-map',
  template: `<div id='t-amap' class='t-amap'></div>`,
  styleUrls: ['map.component.css']
})
export class MapComponent implements OnInit {

  tagState$: Observable<Amap>;
  constructor(private store: Store<Amap>) {
    this.tagState$ = this.store.select('amap');
  }

  AMAPOBJ: any;
  amap: any;
  action: any;


  ngOnInit() {
    this.tagState$.subscribe((state: Amap) => {
      console.log(this.AMAPOBJ);
    });
    setTimeout(() => {
      const map = new AMap.Map('t-amap');
      this.AMAPOBJ = map;
      this.action = {
        'openInfo': (data) => {
          const infoWindow = new AMap.InfoWindow({
            content: data.contentArray.join('<br/>')  // 使用默认信息窗体框样式，显示信息内容
          });
          infoWindow.open(map, map.getCenter());
        }
      };
      this.tagState$.subscribe((state: Amap) => {
        console.log(state);
        if (state.action) {
          // console.log('this.map.action', this.amap.action);
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
        let idustryParkName = null;
        const markers = [];
        const provinces = [
          {
            'name': '天府新谷',
            'center': '104.05568,30.586697',
            'type': 0,
            'subDistricts': []
          },
          {
            'name': '成都高新孵化园',
            'center': '104.063923,30.57371',
            'type': 1,
            'subDistricts': []
          },
          {
            'name': '天府生命科技园',
            'center': '104.030421,30.61563',
            'type': 1,
            'subDistricts': []
          },
          {
            'name': '天府软件园',
            'center': '104.071199,30.541204',
            'type': 1,
            'subDistricts': []
          }
        ];

        for (let i = 0; i < provinces.length; i++) {
          const marker = new AMap.Marker({
            position: provinces[i].center.split(','),
            title: provinces[i].name,
            map: map,
            content: `<div class='mapMarker'>
              <span>${provinces[i].name}</span>
              </div>`
          });
          markers.push(marker);
          marker.on('click', function (e) {
            $('.mapMarker').removeClass('active');
            /*重新setContent实现动画*/
            this.setContent(`<div class='mapMarker active'><span>${e.target.getTitle()}</span></div>`);
            console.log(e);
            console.log(this);
            console.log(e.target.getTitle());
            idustryParkName = e.target.getTitle();
            $('.middle-view>.column_title_box h3').eq(1).click();

            //            $('.industry-menu li:first-child').click();
            if ($('.industry-menu .menu-row:last-child li.active').length) {
              $('.industry-menu .menu-row:last-child li.active').click();
            } else {
              $('.industry-menu .menu-row:last-child li:first-child').click();
            }
          }); // 园区覆盖物点击事件
        }
        /*添加已绘制园区地图标记*/
        $('.middle-view>.column_title_box h3').eq(1).addClass('hasParkMark');
        map.setFitView();
        map.panBy(-580, 40);
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
