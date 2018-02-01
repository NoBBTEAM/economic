import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MicrocosmicComponent } from '../microcosmic.component';
import { EventNoticeComponent } from '../event-notice/event-notice.component';
import { TrackComponent } from '../event-notice/track/track.component';
import { EarlyWarningComponent } from '../event-notice/early-warning/early-warning.component';
import { RecommendComponent } from '../event-notice/recommend/recommend.component';
import { CompanyListComponent } from '../company-list/company-list.component';
import { CompanyDetailComponent } from '../company-detail/company-detail.component';
import { BreedTrackComponent } from '../event-notice/breed-track/breed-track.component';
import { CompanyBasicInfoComponent } from '../company-detail/company-basic-info/company-basic-info.component';
import { CompanyBusinessInfoComponent } from '../company-detail/company-business-info/company-business-info.component';
import { CompanyCreditInfoComponent } from '../company-detail/company-credit-info/company-credit-info.component';
import { CompanyEconomicInfoComponent } from '../company-detail/company-economic-info/company-economic-info.component';
import { CompanyEconomicForecastComponent } from '../company-detail/company-economic-forecast/company-economic-forecast.component';
import { CompanyQualificationsInfoComponent } from '../company-detail/company-qualifications-info/company-qualifications-info.component';
import { CompanyOperatorNexusInfoComponent } from '../company-detail/company-operator-nexus-info/company-operator-nexus-info.component';
import { CompanyOverviewInfoComponent } from '../company-detail/company-overview-info/company-overview-info.component';

export const routes: Routes = [
  { path: '', component: MicrocosmicComponent },
  {
    path: 'eventNotice',
    component: EventNoticeComponent,
    children: [
      {path: '', redirectTo: './track', pathMatch: 'full'},
      {path: 'track', component: TrackComponent},
      {path: 'earlyWarning', component: EarlyWarningComponent},
      {path: 'recommend', component: RecommendComponent},
      {path: 'breedTrack', component: BreedTrackComponent},
    ]
  },
  {path: 'companyList', component: CompanyListComponent},
  {
    path: 'companyDetail/:rowKey',
    component: CompanyDetailComponent,
    children: [
      // 基本信息
      {path: 'basic', component: CompanyBasicInfoComponent},
      // 业务关联
      {path: 'businessContext', component: CompanyBusinessInfoComponent},
      // 信用信息
      {path: 'credit', component: CompanyCreditInfoComponent},
      // 经济指标
      {path: 'economicIndicators', component: CompanyEconomicInfoComponent},
      // 经济预测
      {path: 'economicForecast', component: CompanyEconomicForecastComponent},
      // 企业资质信息
      {path: 'qualifications', component: CompanyQualificationsInfoComponent},
      // 经营者关联
      {path: 'operatorNexus', component: CompanyOperatorNexusInfoComponent},
      // 综合评价
      {path: 'overview', component: CompanyOverviewInfoComponent},
      {path: '**', redirectTo: 'basic', pathMatch: 'full'}
    ]
  },
];

export const routing = RouterModule.forChild(routes);

@NgModule({
  imports: [
    routing
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class MicrocosmicRoutingModule { }
