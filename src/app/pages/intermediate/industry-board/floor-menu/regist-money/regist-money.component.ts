import { Component, OnInit, OnDestroy } from '@angular/core';
import { IntermediateService } from '../../../intermediate.service';

@Component({
  selector: 'app-regist-money',
  templateUrl: './regist-money.component.html',
  styleUrls: ['./regist-money.component.css']
})
export class RegistMoneyComponent implements OnInit, OnDestroy {

  constructor(private intermediateService: IntermediateService) { }

  ngOnInit() {
    /*显示当前菜单二级菜单*/
    this.intermediateService.showIndustryMenus('FloorMenu');
    this.intermediateService.changeShowHideData('isShowParkBuildBar', true);
  }
  ngOnDestroy() {
    this.intermediateService.changeShowHideData('isShowParkBuildBar', false);
  }

}
