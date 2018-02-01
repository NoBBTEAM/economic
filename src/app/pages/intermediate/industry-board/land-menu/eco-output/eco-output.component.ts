import { Component, OnInit, OnDestroy } from '@angular/core';
import { IntermediateService } from '../../../intermediate.service';

@Component({
  selector: 'app-eco-output',
  templateUrl: './eco-output.component.html',
  styleUrls: ['./eco-output.component.css']
})
export class EcoOutputComponent implements OnInit, OnDestroy {

  constructor(private intermediateService: IntermediateService) { }

  ngOnInit() {
    /*显示当前菜单二级菜单*/
    this.intermediateService.showIndustryMenus('LandMenu');

    this.intermediateService.changeTimeColorControl(['isShowColorsBar', 'isShowEcoColor', 'isShowTime', 'isShowEcoTime']);
  }
  ngOnDestroy() {
    this.intermediateService.changeTimeColorControl();
  }

}
