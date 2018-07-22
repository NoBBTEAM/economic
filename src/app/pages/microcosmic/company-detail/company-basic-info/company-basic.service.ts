import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CompanyBasicService {
  companyRowkey: any;
  private companyDetailUrl = '/v1/epBaseInfoPojo/';
  private companyMainStaffUrl = '/v1/epMainStaffPojo/findAll';
  private companyChangeInfoUrl = '/v1/epChangeInfo/findListByCompanyName';
  private companyTaxationUrl = '/v1/epTaxationPojo/findListByCompanyName';
  constructor(private http: HttpClient) {}

  getCompanyDetail(rowkey): Observable<any> {
      return this.http.get(`${this.companyDetailUrl + rowkey}`)
          .map(res => (res));
  }
  getCompanyMainStaff(company): Observable<any> {
      return this.http.get(`${this.companyMainStaffUrl + '?enterpriseName=' + company}`)
          .map(res => (res));
  }
  getCompanyChangeInfo(company): Observable<any> {
      return this.http.get(`${this.companyChangeInfoUrl + '?companyName=' + company}`)
          .map(res => (res));
  }
  getCompanyTaxation(company): Observable<any> {
      return this.http.get(`${this.companyTaxationUrl + '?companyName=' + company}`)
          .map(res => (res));
  }

}
