import { Component, OnInit, OnDestroy } from '@angular/core';
import { MicrocosmicService } from '../../microcosmic.service';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/retry';
import { CompanyDetailService, CompanyDetailResponse, RequestParams } from '../company-detail.service';

@Component({
  selector: 'app-company-qualifications-info',
  templateUrl: './company-qualifications-info.component.html',
  styleUrls: ['./company-qualifications-info.component.css']
})
export class CompanyQualificationsInfoComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  companyName = '';

  // 资质证书
  Certifications = [];
  // 高新技术
  HiTechCertifications = [];
  // 标准制定
  StandardSettings = [];
  // 名优产品
  FamousProduct = [];

  getCertificationParamas: RequestParams = { companyName: 'test1', pageSize: 3, lastRowKey: '', type: 'Certification' };
  getHiTechCertificationParamas: RequestParams = { companyName: 'test1', pageSize: 3, lastRowKey: '', type: 'HiTechCertification' };
  getStandardSettingParamas: RequestParams = { companyName: 'test1', pageSize: 3, lastRowKey: '', type: 'StandardSetting' };
  getFamousProductParamas: RequestParams = { companyName: 'test1', pageSize: 3, lastRowKey: '', type: 'FamousProduct' };
  constructor(
    private micService: MicrocosmicService,
    private companyDetailService: CompanyDetailService,
  ) {
    this.subscription = this.micService.getCompanyName()
      .subscribe(res => {
        this.companyName = res.companyName;
      });


  }

  ngOnInit() {
    this.getCertification();
    this.getHiTechCertification();
    this.getStandardSetting();
    this.getFamousProduct();
  }

  // 行业资质证书
  getCertification() {
    this.companyDetailService.findListByCompanyName(this.getCertificationParamas)
      .subscribe(res => {
        if (res.responseCode === '_200') {
          console.log(res.data.pagination.lastRowKey);
          this.getCertificationParamas.lastRowKey = res.data.pagination.lastRowKey;
          this.Certifications = [...this.Certifications, ...res.data.eQICertificationPojo];
        }
      });
  }

  // 高新技术信息
  getHiTechCertification() {
    this.companyDetailService.findListByCompanyName(this.getHiTechCertificationParamas)
      .subscribe(res => {
        console.log('查询到的高新技术信息=============>', res);
        this.getHiTechCertificationParamas.lastRowKey = res.data.pagination.lastRowKey;
        this.HiTechCertifications = [...this.HiTechCertifications, ...res.data.eQIHiTechCertificationPojo];
      });
  }

  // 标准制定
  getStandardSetting() {
    this.companyDetailService.findListByCompanyName(this.getStandardSettingParamas)
      .subscribe(res => {
        console.log('查询到的标准制定信息=============>', res);
        this.getStandardSettingParamas.lastRowKey = res.data.pagination.lastRowKey;
        this.StandardSettings = [...this.StandardSettings, ...res.data.eQIStandardSettingPojo];
      });
  }

  // 名优产品
  getFamousProduct() {
    this.companyDetailService.findListByCompanyName(this.getFamousProductParamas)
      .subscribe(res => {
        console.log('查询到的名优产品信息=============>', res);
        this.getFamousProductParamas.lastRowKey = res.data.pagination.lastRowKey;
        this.FamousProduct = [...this.FamousProduct, ...res.data.eQIFamousProductPojo];
      });
  }

  psYReachEnd(traget: string) {
    this[traget]();
    console.log('滚动到底部了==========>执行', traget);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
