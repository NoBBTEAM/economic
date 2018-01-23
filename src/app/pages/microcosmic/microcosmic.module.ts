import { NgModule } from '@angular/core';
import { MicrocosmicComponent } from './microcosmic.component';
import { SharedModule } from '../../shared/shared.module';
import { MicrocosmicRoutingModule } from './microcosmic-routing/microcosmic-routing.module';
import { EventNoticeComponent } from './event-notice/event-notice.component';
import { TrackComponent } from './event-notice/track/track.component';
import { EarlyWarningComponent } from './event-notice/early-warning/early-warning.component';
import { RecommendComponent } from './event-notice/recommend/recommend.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
// import { MicrocosmicService } from './microcosmic.service';

@NgModule({
  imports: [
    SharedModule,
    MicrocosmicRoutingModule,
    PerfectScrollbarModule
  ],
  declarations: [
    MicrocosmicComponent,
    EventNoticeComponent,
    TrackComponent,
    EarlyWarningComponent,
    RecommendComponent,
    CompanyDetailComponent,
    CompanyListComponent
  ],
})
export class MicrocosmicModule { }
