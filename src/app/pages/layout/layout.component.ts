import { Component, OnInit } from '@angular/core';
import { ItemAnimate, CircleAnimate, ItemPositionAnimate } from '../../shared/animations';
import { Router } from '@angular/router';

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
  ROUTES = {
    'left': '/mic',
    'middle': '/int',
    'right': '/mac'
  };
  constructor(private router: Router) {

  }

  ngOnInit() {
  }

  itemClick(flag: string) {
    console.log(flag);
    if (!this.isCircleMenuShow) {
      this.isCircleMenuShow = !this.isCircleMenuShow;
      this.animateState = this.animateState === 'on' ? 'off' : 'on';
      setTimeout(() => {
        this.itemPosition = {
          first: 'left',
          second: 'middle',
          third: 'right'
        };
        this.isCircleMenuShowCopy = this.isCircleMenuShow;
      }, 600);
    } else {
      this.itemPosition = {
        first: flag,
        second: flag,
        third: flag
      };
      this.router.navigate([this.ROUTES[flag]]);
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
