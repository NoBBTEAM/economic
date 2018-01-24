import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MicrocosmicComponent } from '../microcosmic.component';
import { EventNoticeComponent } from '../event-notice/event-notice.component';
import { TrackComponent } from '../event-notice/track/track.component';
import { EarlyWarningComponent } from '../event-notice/early-warning/early-warning.component';
import { RecommendComponent } from '../event-notice/recommend/recommend.component';
import { CompanyListComponent } from '../company-list/company-list.component';
import { CompanyDetailComponent } from '../company-detail/company-detail.component';

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
    ]
  },
  {path: 'companyList', component: CompanyListComponent},
  {path: 'companyDetail/:id', component: CompanyDetailComponent},
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
