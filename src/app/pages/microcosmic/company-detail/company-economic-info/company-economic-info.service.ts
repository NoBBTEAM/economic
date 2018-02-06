import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';

export interface CompanyCreditResponse {
    data: {
        // 招中标信息
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
export class CompanyEconomicInfoService {
    companyRowkey: any;
    /*获取营业收入信息*/
    private companyIncomeStatisticsUrl = '/v1/eIIRevenueAndStaffPojo/findIncomeStatisticsByCompanyName';
    /*获取收入占比信息*/
    private companyRevenueShareUrl = '/v1/eIIRevenueAndStaffPojo/findRevenueShareByCompanyName';
    /*获取在职人数信息*/
    private companyNumberOfActiveStaffUrl = '/v1/eIIRevenueAndStaffPojo/findNumberOfActiveStaffByCompanyName';
    /*获取收入同比信息*/
    private companyRevenueYearOnYearUrl = '/v1/eIIRevenueAndStaffPojo/findRevenueYearOnYearByCompanyName';
    /*取园区人数占比信息*/
    private companyParkNumberUrl = '/v1/eIIRevenueAndStaffPojo/findParkNumberByCompanyName';
    /*根据公司名称,获取企业关联方信息*/
    private companyRelationPeopleUrl = '/v1/eIIRelationPojo/findListByCompanyName';
    /*政企对接联系人信息*/
    private companyGobernmentContactsUrl = '/v1/eIIRelationPojo/findGobernmentContactsByCompanyName';
    /*政府项目申报信息*/
    private companyProjectDeclarationUrl = '/v1/eETProjectDeclarationPojo/findListByCompanyName';
    /*招中标信息*/
    private WinningBidUrl = '/v1/EIIWinningBid/findWinningBidPage';
    /*公司公告列表信息*/
    private companyNoticesUrl = '/v1/EIIAnnouncements/findAnnouncementPage';
    constructor(private http: HttpClient) { }

    getIncomeStatistics(company): Observable<any> {
        return this.http.get(`${this.companyIncomeStatisticsUrl + '?companyName=' + company}`);
    }
    getRevenueShare(company, time): Observable<any> {
        console.log(company);
        return this.http.get(`${this.companyRevenueShareUrl}?companyName=${company}&year=${time}`);
    }
    getNumberOfActiveStaff(company): Observable<any> {
        return this.http.get(`${this.companyNumberOfActiveStaffUrl}?companyName=${company.companyName}&pageSize=${company.pageSize}`);
    }
    getRevenueYearOnYear(company): Observable<any> {
        return this.http.get(`${this.companyRevenueYearOnYearUrl + '?companyName=' + company}`);
    }
    getParkNumber(company): Observable<any> {
        return this.http.get(`${this.companyParkNumberUrl + '?companyName=' + company}`);
    }
    getRelationPeople(company): Observable<any> {
        return this.http.get(`${this.companyRelationPeopleUrl + '?companyName=' + company}`);
    }
    getGobernmentContacts(company): Observable<any> {
        return this.http.get(`${this.companyGobernmentContactsUrl + '?companyName=' + company}`);
    }
    getProjectDeclaration(company): Observable<any> {
        return this.http.get(`${this.companyProjectDeclarationUrl + '?companyName=' + company}`);
    }
    getNotices(company): Observable<any> {
        return this.http.get(`${this.companyNoticesUrl + '?enterpriseName=' + company}`);
    }

    findListByCompanyName(findParams, type): Observable<any> {
        let paramsString = '';
        for (const key in findParams) {
            if (findParams.hasOwnProperty(key)) {
                paramsString += findParams[key] ? `${key}=${findParams[key]}&` : '';
            }
        }
        const params = new HttpParams({ fromString: paramsString });
        return this.http.get<CompanyCreditResponse>(this.WinningBidUrl, { params });
    }
    findListByUrl(findParams, type): Observable<any> {
        let paramsString = '';
        const url = this[type];
        for (const key in findParams) {
            if (findParams.hasOwnProperty(key)) {
                paramsString += findParams[key] ? `${key}=${findParams[key]}&` : '';
            }
        }
        const params = new HttpParams({ fromString: paramsString });
        return this.http.get(url, { params });
    }

}
