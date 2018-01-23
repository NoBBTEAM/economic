import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

interface SearchResponse {
  data: {
    companys: any;
    enterpriseTypes: any;
    keyWord: string;
    total: number;
  };
  errorMsg: string;
  responseCode: string;
  timestemp: number;
}

@Injectable()
export class LayoutService {
  private subject = new BehaviorSubject<any>(0);

  private searchUrl = '/company/listCompanysPage';

  constructor(private http: HttpClient) { }

  search(keyWord) {
    this.http.get<SearchResponse>(`${this.searchUrl}?keyWord=${keyWord}`)
      .subscribe(res => {
        const companys = res.data.companys;
        const total = res.data.total;
        this.subject.next({
          companys: companys,
          total: total
        });
      });
  }

  getSubject() {
    return this.subject.asObservable();
  }

}
