import { NgModule } from '@angular/core';
import { IntermediateComponent } from './intermediate.component';
import { SharedModule } from '../../shared/shared.module';
import { IndexAbstractComponent } from './index-abstract/index-abstract.component';
import { IndustryBoardComponent } from './industry-board/industry-board.component';

import {IntermediateRoutingModule} from './intermediate-routing/intermediate-routing.module';
// import { IntermediateService } from './intermediate.service';

@NgModule({
  imports: [
    SharedModule,
    IntermediateRoutingModule
  ],
  declarations: [IntermediateComponent, IndexAbstractComponent, IndustryBoardComponent]
})
export class IntermediateModule { }
