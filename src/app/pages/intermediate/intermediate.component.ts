import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Amap } from '../../core/amap-ngrx/amap.model';
import {ADD_MARKER_MID, CLEAR_MARKER} from '../../core/amap-ngrx/amap.actions';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-intermediate',
  templateUrl: './intermediate.component.html',
  styleUrls: ['./intermediate.component.css']
})
export class IntermediateComponent implements OnInit {

  constructor(private storeAmap: Store<Amap>) { }

  ngOnInit() {
    this.storeAmap.dispatch({
      type: CLEAR_MARKER,
      payload: {
        action: 'CLEAR_MARKER',
        data: ''
      }
    });
    this.storeAmap.dispatch({
      type: ADD_MARKER_MID,
      payload: {
        action: 'ADD_MARKER_MID',
        data: [
          {
            'name': '高新南区',
            'center': '104.065706,30.592168',
            'type': 0,
            'subDistricts': []
          },
          {
            'name': '高新西区',
            'center': '103.922278,30.77348',
            'type': 1,
            'subDistricts': []
          },
          {
            'name': '高新东区',
            'center': '104.26881,30.277292',
            'type': 1,
            'subDistricts': []
          }
        ]
      }
    });
  }

}
