import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ContainerStyle } from '../../../core/container-ngrx/container.model';
import { CHANGE } from '../../../core/container-ngrx/container.action';
import { LayoutService } from '../../layout/layout.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit, OnDestroy {

  hasLoading = false;
  subscription: Subscription;
  constructor(
    private layoutService: LayoutService,
    private store: Store<ContainerStyle>) {
    this.store.select('container');
  }

  ngOnInit() {
    this.subscription = this.layoutService.getSubject()
      .subscribe(res => console.log('SUBJECT=====>\n', res));
    this.store.dispatch({
      type: CHANGE,
      payload: {
        width: '640px'
      }
    });
  }

  ngOnDestroy() {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

}
