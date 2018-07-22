import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpParams } from '@angular/common/http';

export interface CompanyDetailResponse {
  data: {
    eQIStandardSettingPojo?: any[],
    eQIHiTechCertificationPojo?: any[];
    eQICertificationPojo?: any[];
    eQIFamousProductPojo?: any[];
    eIIAnnouncementsPojos?: any[];
    eIIEquityPledgedPojos?: any[];
    eIIChattelMortgagePojos?: any[];
    eIIRecruitPojos?: any[];
    pagination: {
      lastRowKey: string
    }
  };
  responseCode: string;
  errorMsg: string;
  timestemp: any;
}

export interface RequestParams {
  companyName?: string;
  enterpriseName?: string;
  currentPage?: number;
  pageSize?: number;
  lastRowKey?: string;
  type?: string;
  url?: string;
}

@Injectable()
export class CompanyDetailService {

  private URLS = {
    // 行业资质证书
    Certification: '/v1/eQICertificationPojo/findListByCompanyName',
    // 高新技术信息
    HiTechCertification: '/v1/eQIHiTechCertificationPojo/findListByCompanyName',
    // 标准制定
    StandardSetting: '/v1/eQIStandardSettingPojo/findListByCompanyName',
    // 名优产品
    FamousProduct: '/v1/eQIFamousProductPojo/getEQICertificationPojoByCompany',
    // 舆论列表
    PublicOpinion: '/v1/EIIAnnouncements/findPublicOpinionPage',
    // 招聘信息
    EIIRecruit: '/v1/EIIRecruit/findEIIRecruitPage',
    // 股权信息
    EquityPledged: '/v1/EIIEquityPledged/findEquityPledgedPage',
    // 动产抵押
    ChattelMortgage: '/v1/EIIChattelMortgage/findEquityPledgedPage',
  };

  constructor(private http: HttpClient) { }

  findListByCompanyName(data: RequestParams): Observable<CompanyDetailResponse> {

    const params = new HttpParams()
      .set('companyName', data.companyName ? data.companyName : '')
      .set('enterpriseName', data.enterpriseName ? data.enterpriseName : '')
      .set('lastRowKey', data.lastRowKey ? data.lastRowKey : '')
      .set('pageSize', data.pageSize ? data.pageSize.toString() : '');

    return this.http.get<CompanyDetailResponse>(this.URLS[data.type], { params });
  }

  findListByCompanyNameByUrl(data: RequestParams): Observable<CompanyDetailResponse> {

    const params = new HttpParams()
      .set('companyName', data.companyName ? data.companyName : '')
      .set('enterpriseName', data.enterpriseName ? data.enterpriseName : '')
      .set('lastRowKey', data.lastRowKey ? data.lastRowKey : '')
      .set('pageSize', data.pageSize ? data.pageSize.toString() : '');

    return this.http.get<CompanyDetailResponse>(data.url, { params });
  }

}
