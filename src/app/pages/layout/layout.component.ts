import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemAnimate, CircleAnimate, ItemPositionAnimate } from '../../shared/animations';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ContainerStyle } from '../../core/container-ngrx/container.model';
import { Observable } from 'rxjs/Observable';
import { LayoutService } from './layout.service';
import { IntermediateService } from '../intermediate/intermediate.service';
import { ADD_MARKER_MID, CLEAR_MARKER } from '../../core/amap-ngrx/amap.actions';
import {Amap} from '../../core/amap-ngrx/amap.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  animations: [
    ItemAnimate,
    CircleAnimate,
    ItemPositionAnimate
  ],
  providers: [LayoutService]
})
export class LayoutComponent implements OnInit, OnDestroy {
  isShowParkBuildBar = false;
  showTimeColorControl = {
    isShowColorsBar: false,
    isShowTime: false,
    isShowEcoTime: false,
    isShowTopTime: false,
    isShowNatureColor: false,
    isShowInefficientColor: false,
    isShowTopColor: false,
    isShowEcoColor: false,
    isShowSingleColor: false
  };
  showBuildMarkerEl = false;
  choseBuildName: any = '楼宇列表';
  choseParkName: any = '园区';
  parkNameLists: any = [];
  isShowParkNameList: any;
  getShowHideDataFn: any;
  getParkNameFn: any;
  getTimeColorControlFn: any;
  // 其他组件会改变container的样式， 所以用一个Reduce来管理
  tagState$: Observable<ContainerStyle>;
  container: ContainerStyle;
  // 搜索框是否选择状态
  isSearchActive = false;
  // 搜索的关键字
  keyWord = '';
  // 右边面板是否显示
  isRirhtPanelShow = true;
  // 三个按钮
  isCircleMenuShow = false;
  // class = curr 是否添加class
  isCircleMenuShowCopy = false;
  // item动画的状态
  animateState = 'off';
  // item位置的动画状态
  itemPosition = {
    first: 'left',
    second: 'left',
    third: 'left'
  };
  // 三个按钮的路由
  ROUTES = {
    'left': '/mac',
    'middle': '/int',
    'right': '/mic'
  };
  // 是否有新的推送消息，来控制显示隐藏
  hasNotifycation = true;
  // 消息的内容主体的显示与隐藏
  canShowNotifyContent = false;
  constructor(private router: Router,
    private layoutService: LayoutService,
    private intermediateService: IntermediateService,
    private store: Store<ContainerStyle>,
    private storeAmap: Store<Amap>) {
    this.tagState$ = this.store.select('container');
  }

  search() {
    this.layoutService.search({
      keyWord: this.keyWord
    });
    this.router.navigate(['/mic/companyList']);
  }

  ngOnInit() {
    this.tagState$.subscribe((state: ContainerStyle) => {
      console.log(state.width);
      this.container = state;
    });
    this.getShowHideDataFn = this.intermediateService.getShowHideData().subscribe(res => {
      this.isShowParkBuildBar = res.isShowParkBuildBar ? res.isShowParkBuildBar : false;
      this.showBuildMarkerEl = res.showBuildMarkerEl ? res.showBuildMarkerEl : false;
      this.isShowParkNameList = res.isShowParkNameList ? res.isShowParkNameList : false;
      this.choseBuildName = res.choseBuildName ? res.choseBuildName : this.choseBuildName;
    });
    this.parkNameLists = this.intermediateService.getParkNameList();
    this.getParkNameFn = this.intermediateService.getParkName().subscribe(res => {
      this.choseParkName = res.choseParkName ? res.choseParkName : this.choseParkName;
    });
    this.getTimeColorControlFn = this.intermediateService.getTimeColorControl().subscribe(res => {
      this.showTimeColorControl.isShowColorsBar = res.isShowColorsBar;
      this.showTimeColorControl.isShowTime = res.isShowTime;
      this.showTimeColorControl.isShowEcoTime = res.isShowEcoTime;
      this.showTimeColorControl.isShowTopTime = res.isShowTopTime;
      this.showTimeColorControl.isShowNatureColor = res.isShowNatureColor;
      this.showTimeColorControl.isShowInefficientColor = res.isShowInefficientColor;
      this.showTimeColorControl.isShowTopColor = res.isShowTopColor;
      this.showTimeColorControl.isShowEcoColor = res.isShowEcoColor;
      this.showTimeColorControl.isShowSingleColor = res.isShowSingleColor;
    });

    setTimeout(() => {
      this.isCircleMenuShow = !this.isCircleMenuShow;
      this.animateState = this.animateState === 'on' ? 'off' : 'on';
      // 上面的动画执行完成之后，各自回到左中右
      setTimeout(() => {
        this.itemPosition = {
          first: 'left',
          second: 'middle',
          third: 'right'
        };
        this.isCircleMenuShowCopy = this.isCircleMenuShow;
      }, 600);
    }, 1000);

    // 模拟2秒来一个消息
    // TODO 接受到消息时显示消息框
    setInterval(() => {
      this.hasNotifycation = true;
    }, 60000);
  }
  ngOnDestroy() {
    this.getTimeColorControlFn.unsubscribe();
    this.getParkNameFn.unsubscribe();
    this.getShowHideDataFn.unsubscribe();
  }

  noticeClose() {
    this.hasNotifycation = false;
    this.canShowNotifyContent = false;
  }

  showNotifyContent() {
    this.canShowNotifyContent = !this.canShowNotifyContent;
  }

  itemClick(flag: string) {
    if (!this.isCircleMenuShow) {
      this.isCircleMenuShow = !this.isCircleMenuShow;
      this.animateState = this.animateState === 'on' ? 'off' : 'on';
      // 上面的动画执行完成之后，各自回到左中右
      setTimeout(() => {
        this.itemPosition = {
          first: 'left',
          second: 'middle',
          third: 'right'
        };
        this.isCircleMenuShowCopy = this.isCircleMenuShow;
      }, 600);
    } else {
      if (this.ROUTES[flag] === '/mic') {
        this.container = {
          width: '60%'
        };
      }
      // 动画的过程，先统一到一个地方在回到左边
      if (flag) {
        this.itemPosition = {
          first: flag,
          second: flag,
          third: flag
        };
      } else {
        this.itemPosition = {
          first: 'right',
          second: 'right',
          third: 'right'
        };
      }

      setTimeout(() => {
        this.itemPosition = {
          first: 'left',
          second: 'left',
          third: 'left'
        };
        this.isCircleMenuShow = !this.isCircleMenuShow;
        this.isCircleMenuShowCopy = this.isCircleMenuShow;
        this.animateState = this.animateState === 'on' ? 'off' : 'on';
        const TEST = flag ? this.router.navigate([this.ROUTES[flag]]) : '';
      }, 600);
    }
  }

  notSearchActive() {
    this.isRirhtPanelShow = this.isSearchActive;
    this.isSearchActive = !this.isSearchActive;
  }

  notRirhtPanelShow() {
    this.isRirhtPanelShow = !this.isRirhtPanelShow;
  }

  changeParkName(park) {

    this.storeAmap.dispatch({
      type: CLEAR_MARKER,
      payload: {
        action: 'CLEAR_MARKER',
        data: ''
      }
    });
    let parkData;
    switch (park) {
      case '高新南区':
        parkData = [{
            'name': '高新南区',
            'center': '104.065706,30.592168',
            'type': 0,
            'subDistricts': []
          }];
        break;
      case '高新西区':
        parkData = [{
          'name': '高新西区',
          'center': '103.922278,30.77348',
          'type': 1,
          'subDistricts': []
          }];
        break;
      case '高新东区':
        parkData = [{
          'name': '高新东区',
          'center': '104.26881,30.277292',
          'type': 1,
          'subDistricts': []
          }];
        break;
    }
    this.storeAmap.dispatch({
      type: ADD_MARKER_MID,
      payload: {
        action: 'ADD_MARKER_MID',
        data: parkData
      }
    });
    this.isShowParkNameList = false;
    this.showBuildMarkerEl = false;
    this.intermediateService.changeParkName(park);
  }
  showParkNameList() {
    this.isShowParkNameList = !this.isShowParkNameList;
    this.showBuildMarkerEl = false;
  }

}
