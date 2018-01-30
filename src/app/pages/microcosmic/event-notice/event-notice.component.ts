import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Amap } from '../../../core/amap-ngrx/amap.model';
import { CHANGE } from '../../../core/container-ngrx/container.action';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-event-notice',
  templateUrl: './event-notice.component.html',
  styleUrls: ['./event-notice.component.css']
})
export class EventNoticeComponent implements OnInit {

  constructor(
    private store: Store<Amap>
  ) {
    this.store.select('amap');
  }

  ngOnInit() {
    this.store.dispatch({
      type: CHANGE,
      payload: {
        width: '60%'
      }
    });
  }

}
