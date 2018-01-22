import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Amap } from '../../core/amap-ngrx/amap.model';
import { CLEAR_MARKER } from '../../core/amap-ngrx/amap.actions';

@Component({
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
  }

}
