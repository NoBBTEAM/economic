import { Component, OnInit, OnDestroy } from '@angular/core';
import { IntermediateService } from '../../../intermediate.service';

@Component({
  selector: 'app-inefficient-land',
  templateUrl: './inefficient-land.component.html',
  styleUrls: ['./inefficient-land.component.css']
})
export class InefficientLandComponent implements OnInit, OnDestroy {

  constructor(private intermediateService: IntermediateService) { }

  ngOnInit() {
    /*显示当前菜单二级菜单*/
    this.intermediateService.showIndustryMenus('LandMenu');

    this.intermediateService.changeTimeColorControl(['isShowColorsBar', 'isShowInefficientColor']);
  }
  ngOnDestroy() {
    this.intermediateService.changeTimeColorControl();
  }

}
