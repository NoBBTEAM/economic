import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Amap } from '../../../core/amap-ngrx/amap.model';
import { Store } from '@ngrx/store';
import { CHANGE } from '../../../core/container-ngrx/container.action';
import { MicrocosmicService } from '../microcosmic.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  rowKey: string;
  isFollow: boolean;
  constructor(
    private routeInfo: ActivatedRoute,
    private microcomicService: MicrocosmicService,
    private store: Store<Amap>
  ) { }

  ngOnInit() {
    this.store.dispatch({
      type: CHANGE,
      payload: {
        width: '60%'
      }
    });

    this.subscription = this.microcomicService.getCompanyName()
      .subscribe(res => {
        console.log('CompanyName ==============>', res.companyName);
      });
  }

  notFollow() {
    this.isFollow = !this.isFollow;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
