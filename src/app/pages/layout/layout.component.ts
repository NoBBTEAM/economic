import { Component, OnInit } from '@angular/core';
import { ItemAnimate, CircleAnimate, ItemPositionAnimate } from '../../shared/animations';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ContainerStyle } from '../../core/container-ngrx/container.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  animations: [
    ItemAnimate,
    CircleAnimate,
    ItemPositionAnimate
  ]
})
export class LayoutComponent implements OnInit {
  // 其他组件会改变container的样式， 所以用一个Reduce来管理
  tagState$: Observable<ContainerStyle>;
  container: ContainerStyle;
  // 搜索框是否选择状态
  isSearchActive = false;
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
    'left': '/mic',
    'middle': '/int',
    'right': '/mac'
  };
  // 是否有新的推送消息，来控制显示隐藏
  hasNotifycation = false;
  // 消息的内容主体的显示与隐藏
  canShowNotifyContent = false;
  constructor(private router: Router,
    private store: Store<ContainerStyle>) {
      this.tagState$ = this.store.select('container');
  }

  ngOnInit() {
    this.tagState$.subscribe((state: ContainerStyle) => {
      console.log(state.width);
      this.container = state;
    });

    // 模拟2秒来一个消息
    // TODO 接受到消息时显示消息框
    setInterval(() => {
      this.hasNotifycation = true;
    }, 60000)
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
      // 动画的过程，先统一到一个地方在回到左边
      this.itemPosition = {
        first: flag,
        second: flag,
        third: flag
      };
      setTimeout(() => {
        this.itemPosition = {
          first: 'left',
          second: 'left',
          third: 'left'
        };
        this.isCircleMenuShow = !this.isCircleMenuShow;
        this.isCircleMenuShowCopy = this.isCircleMenuShow;
        this.animateState = this.animateState === 'on' ? 'off' : 'on';
      }, 600);
      this.router.navigate([this.ROUTES[flag]]);
    }
  }

  notSearchActive() {
    this.isRirhtPanelShow = this.isSearchActive;
    this.isSearchActive = !this.isSearchActive;
  }

  notRirhtPanelShow() {
    this.isRirhtPanelShow = !this.isRirhtPanelShow;
  }

}
