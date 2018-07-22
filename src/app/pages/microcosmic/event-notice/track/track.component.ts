import { Component, OnInit } from '@angular/core';
import { EventNoticeService, EventNoticeResponse, RequestParams } from '../event-notice.service';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css'],
  providers: [EventNoticeService]
})
export class TrackComponent implements OnInit {

  ContractParams: RequestParams = { currentPage: 0, pageSize: 10, lastRowKey: '', type: 'Contract' };
  Contracts = [];
  NewsParams: RequestParams = { currentPage: 0, pageSize: 10, lastRowKey: '', type: 'News' };
  News = [];
  constructor(private trackService: EventNoticeService) { }

  ngOnInit() {

    this.findContractPage();
    this.findNewsPage();
  }

  // 合同情况
  findContractPage() {
    this.trackService.findList(this.ContractParams)
      .subscribe(res => {
        if (res.responseCode === '_200') {
          this.Contracts = [...this.Contracts, ...res.data.kETContractPojos];
          this.ContractParams.lastRowKey = res.data.pagination.lastRowKey;
        }
      });
  }

  // 新闻
  findNewsPage() {
    this.trackService.findList(this.NewsParams)
      .subscribe(res => {
        if (res.responseCode === '_200') {
          this.News = [...this.News, ...res.data.kETNewsPojos];
          this.NewsParams.lastRowKey = res.data.pagination.lastRowKey;
        }
      });
  }

}
