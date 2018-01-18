import { Component, OnInit } from '@angular/core';
import { IntermediateService } from '../intermediate.service';

@Component({
  selector: 'app-index-abstract',
  templateUrl: './index-abstract.component.html',
  styleUrls: ['./index-abstract.component.css']
})
export class IndexAbstractComponent implements OnInit {

  // 天府软件园
  optionMainPart: any;
  optionHeatMap: any;
  optionMainPart1: any;
  optionHeatMap1: any;
  optionMainPart2: any;
  optionHeatMap2: any;
  optionMainPart3: any;
  optionHeatMap3: any;
  constructor(private intermediateService: IntermediateService) { }

  ngOnInit() {

    const DATA = this.intermediateService.getData('Add')
      .subscribe((res) => {
        this.optionMainPart = res.optionMainPart;
        this.optionMainPart1 = res.optionMainPart1;
        this.optionMainPart2 = res.optionMainPart2;
        this.optionMainPart3 = res.optionMainPart3;
      });
  }

}
