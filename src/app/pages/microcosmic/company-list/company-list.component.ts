import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ContainerStyle } from '../../../core/container-ngrx/container.model';
import { CHANGE } from '../../../core/container-ngrx/container.action';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {

  hasLoading = false;
  constructor(private store: Store<ContainerStyle>) {
    this.store.select('container');
  }

  ngOnInit() {
    this.store.dispatch({
      type: CHANGE,
      payload: {
        width: '640px'
      }
    });
  }

}
