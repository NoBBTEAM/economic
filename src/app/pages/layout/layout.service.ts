import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';

export interface SearchParams {
  keyWord?: string;
  enterpriseType?: string;
  page?: number;
  size?: number;
}

export interface SearchResponse {
  data: {
    companys: any;
    enterpriseTypes: any;
    keyWord: string;
    pageParam: {
      currentpage: number;
      pagesize: number;
      total: number;
      totalPage: number;
    };
  };
  errorMsg: string;
  responseCode: string;
  timestemp: number;
}

@Injectable()
export class LayoutService {
  private subject = new Subject<any>();

  private searchUrl = '/company/listCompanysPage';

  constructor(private http: HttpClient) { }

  search(SearchParams) {
    let paramsString = '';
    for (const key in SearchParams) {
      if (SearchParams.hasOwnProperty(key)) {
        paramsString += SearchParams[key] ? `${key}=${SearchParams[key]}&` : '';
      }
    }
    const params = new HttpParams({fromString: paramsString});
    this.http.get<SearchResponse>(this.searchUrl, {params})
      .subscribe(res => {
        if (res.responseCode === '_200') {
          this.subject.next(res);
        } else {
          console.log(res.errorMsg);
        }

      }, err => {
        console.log(err);
      });
  }

  getSubject() {
    return this.subject.asObservable();
  }

}
