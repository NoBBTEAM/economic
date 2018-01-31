import { Component, OnInit, OnDestroy } from '@angular/core';
import { IntermediateService } from '../../../intermediate.service';

@Component({
  selector: 'app-eco-top',
  templateUrl: './eco-top.component.html',
  styleUrls: ['./eco-top.component.css']
})
export class EcoTopComponent implements OnInit, OnDestroy {

  constructor(private intermediateService: IntermediateService) { }

  ngOnInit() {
    /*显示当前菜单二级菜单*/
    this.intermediateService.showIndustryMenus('LandMenu');

    this.intermediateService.changeTimeColorControl(['isShowColorsBar', 'isShowTopColor', 'isShowTime', 'isShowTopTime']);
  }
  ngOnDestroy() {
    this.intermediateService.changeTimeColorControl();
  }

}
