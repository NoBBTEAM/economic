import { NgModule } from '@angular/core';
import { IntermediateComponent } from './intermediate.component';
import { IntermediaRoutingModule } from './intermedia-routing/intermedia-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { IndexAbstractComponent } from './index-abstract/index-abstract.component';
import { IndustryBoardComponent } from './industry-board/industry-board.component';

// 滚动条插件
import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { IntermediateService } from './intermediate.service';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
@NgModule({
  imports: [
    SharedModule,
    IntermediaRoutingModule,
    PerfectScrollbarModule,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    IntermediateService
  ],
  declarations: [IntermediateComponent, IndexAbstractComponent, IndustryBoardComponent]
})
export class IntermediateModule { }
