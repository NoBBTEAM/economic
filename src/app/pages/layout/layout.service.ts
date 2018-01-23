import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class LayoutService {

  private searchUrl = '/company/listCompanysPage';

  constructor(private http: HttpClient) { }

  search(keyWord): Observable<any> {
    return this.http.get(`${this.searchUrl}?keyWord=${keyWord}`)
      .map(res => JSON.stringify(res));
  }

}
