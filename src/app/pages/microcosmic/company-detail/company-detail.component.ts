import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Amap } from '../../../core/amap-ngrx/amap.model';
import { Store } from '@ngrx/store';
import { CHANGE } from '../../../core/container-ngrx/container.action';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {

  id: string;
  isFollow: boolean;
  constructor(
    private routeInfo: ActivatedRoute,
    private store: Store<Amap>
  ) { }

  ngOnInit() {
    this.store.dispatch({
      type: CHANGE,
      payload: {
        width: '60%'
      }
    });
    this.routeInfo.params.subscribe((params) => {
      this.id = params.id;
      console.log(this.id);
    });
  }

  notFollow() {
    this.isFollow = !this.isFollow;
  }

}
