import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';

export interface CompanyCreditResponse {
    data: {
        // 行政处罚
        eCIAdministrativePenaltyPojos?: any[],
        // 司法判决 / 被执行人
        eCIJudicialDecisionPojos?: any[];
        // 经营异常
        eCIAbnormalBusinessPojos?: any[];
        // 开庭公告 / 裁判文书 / 法院公告
        eCIProclamationPojos?: any[];
        // 税务违法
        eCITaxIllegalPojos?: any[];
        pagination: {
            lastRowKey: string
        }
    };
    responseCode: string;
    errorMsg: string;
    timestemp: any;
}

@Injectable()
export class CompanyCreditService {
    companyRowkey: any;

    URLS = {
        // 行政处罚信息
        AdministrativePenalty: '/v1/ECIAdministrativePenalty/findAdministrativePenaltyPage',
        // 司法判决
        JudicialDecision: '/v1/ECIJudicialDecision/findJudicialDecisionPage',
        // 失信被执行人
        DebtorInfo: '/v1/ECIDebtorInfo/findDebtorInfoPage',
        // 被执行人
        Debtor: '/v1/ECIDebtorInfo/findDebtorPage',
        // 经营异常
        AbnormalBusiness: '/v1/ECIAbnormalBusiness/findAbnormalBusinessPage',
        // 开庭公告
        Proclamation: '/v1/ECIProclamation/findECIProclamationPage',
        // 裁判文书
        RefereeDocuments: '/v1/ECIProclamation/findRefereeDocumentsPage',
        // 法院公告
        CourtNotice: '/v1/ECIProclamation/findCourtNoticePage',
        // 税务违法
        ECITaxIllegal: '/v1/ECITaxIllegal/findECITaxIllegalPage',
    };
    // 政府表彰信息
    private companyGovernmentHonorUrl = '/v1/eCIHonorPojo/getGOVERNMENTByCompany';
    // 行政奖励信息
    private companyAdministrationHonorUrl = '/v1/eCIHonorPojo/getADMINISTRATIVEByCompany';
    // 表彰奖励信息
    private companyCommendHonorUrl = '/v1/eCIHonorPojo/getRECOGNIZEByCompany';
    // 获取其他荣誉
    private companyOtherHonorUrl = '/v1/eCIHonorPojo/getOTHERByCompany';
    // 行政处罚信息
    private AdministrativePenaltyUrl = '/v1/ECIAdministrativePenalty/findAdministrativePenaltyPage';
    constructor(private http: HttpClient) { }

    getGovernmentHonor(company): Observable<any> {
        return this.http.get(`${this.companyGovernmentHonorUrl + '?companyName=' + company}`);
    }

    getAdministrationHonor(company): Observable<any> {
        return this.http.get(`${this.companyAdministrationHonorUrl + '?companyName=' + company}`);
    }

    getCommendHonor(company): Observable<any> {
        return this.http.get(`${this.companyCommendHonorUrl + '?companyName=' + company}`);
    }

    getOtherHonor(company): Observable<any> {
        return this.http.get(`${this.companyOtherHonorUrl + '?companyName=' + company}`);
    }

    findListByCompanyName(findParams, type): Observable<any> {
        let paramsString = '';
        for (const key in findParams) {
            if (findParams.hasOwnProperty(key)) {
                paramsString += findParams[key] ? `${key}=${findParams[key]}&` : '';
            }
        }
        const params = new HttpParams({ fromString: paramsString });
        return this.http.get<CompanyCreditResponse>(this.URLS[type], { params });
    }
}
