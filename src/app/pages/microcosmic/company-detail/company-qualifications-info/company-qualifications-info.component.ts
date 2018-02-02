import { Component, OnInit, OnDestroy } from '@angular/core';
import { CompanyQualificationsInfoService, QualificationsInfoResponse } from './company-qualifications-info.service';
import { MicrocosmicService } from '../../microcosmic.service';
import { Subscription } from 'rxjs/Subscription';

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

  getCertificationParamas = { companyName: 'test1', currentPage: 0, pageSize: 3, lastRowKey: '' };
  getHiTechCertificationParamas = { companyName: 'test1', currentPage: 0, pageSize: 3, lastRowKey: '' };
  getStandardSettingParamas = { companyName: 'test1', currentPage: 0, pageSize: 3, lastRowKey: '' };
  getFamousProductParamas = { companyName: 'test1', currentPage: 0, pageSize: 3, lastRowKey: '' };
  constructor(
    private service: CompanyQualificationsInfoService,
    private micService: MicrocosmicService,
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
    this.service.findListByCompanyName(this.getCertificationParamas, 'Certification')
      .subscribe((res: QualificationsInfoResponse) => {
        if (res.responseCode === '_200') {
          console.log(res.data.pagination.lastRowKey);
          this.getCertificationParamas.lastRowKey = res.data.pagination.lastRowKey;
          this.Certifications = [...this.Certifications, ...res.data.eQICertificationPojo];
        }
      });
  }

  // 高新技术信息
  getHiTechCertification() {
    this.service.findListByCompanyName(this.getHiTechCertificationParamas, 'HiTechCertification')
      .subscribe((res: QualificationsInfoResponse) => {
        console.log('查询到的高新技术信息=============>', res);
        this.getHiTechCertificationParamas.lastRowKey = res.data.pagination.lastRowKey;
        this.HiTechCertifications = [...this.HiTechCertifications, ...res.data.eQIHiTechCertificationPojo];
      });
  }

  // 标准制定
  getStandardSetting() {
    this.service.findListByCompanyName(this.getStandardSettingParamas, 'StandardSetting')
      .subscribe((res: QualificationsInfoResponse) => {
        console.log('查询到的标准制定信息=============>', res);
        this.getStandardSettingParamas.lastRowKey = res.data.pagination.lastRowKey;
        this.StandardSettings = [...this.StandardSettings, ...res.data.eQIStandardSettingPojo];
      });
  }

  // 名优产品
  getFamousProduct() {
    this.service.findListByCompanyName(this.getFamousProductParamas, 'FamousProduct')
      .subscribe((res: QualificationsInfoResponse) => {
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
