import { Component, OnInit } from '@angular/core';
import { IntermediateService } from '../intermediate.service';
import {ADD_MARKER_MID, CLEAR_MARKER} from '../../../core/amap-ngrx/amap.actions';
import {Amap} from '../../../core/amap-ngrx/amap.model';
import { Store } from '@ngrx/store';

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
  constructor(private intermediateService: IntermediateService, private storeAmap: Store<Amap>) { }

  ngOnInit() {
    this.storeAmap.dispatch({
      type: ADD_MARKER_MID,
      payload: {
        action: 'ADD_MARKER_MID',
        data: [
          {
            'name': '高新西区',
            'center': '103.922278,30.77348',
            'type': 1,
            'subDistricts': []
          }
        ]
      }
    });

    const DATA = this.intermediateService.getData('Add')
      .subscribe((res) => {
        this.optionMainPart = res.optionMainPart;
        this.optionMainPart1 = res.optionMainPart1;
        this.optionMainPart2 = res.optionMainPart2;
        this.optionMainPart3 = res.optionMainPart3;
        this.optionHeatMap = res.optionHeatMap;
        this.optionHeatMap1 = res.optionHeatMap1;
        this.optionHeatMap2 = res.optionHeatMap2;
        this.optionHeatMap3 = res.optionHeatMap3;
      });
  }

}
