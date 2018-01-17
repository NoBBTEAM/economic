import { NgModule } from '@angular/core';
import { IntermediateComponent } from './intermediate.component';
import { IntermediaRoutingModule } from './intermedia-routing/intermedia-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { IndexAbstractComponent } from './index-abstract/index-abstract.component';

@NgModule({
  imports: [
    SharedModule,
    IntermediaRoutingModule
  ],
  declarations: [IntermediateComponent, IndexAbstractComponent]
})
export class IntermediateModule { }
