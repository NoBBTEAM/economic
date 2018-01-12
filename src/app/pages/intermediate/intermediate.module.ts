import { NgModule } from '@angular/core';
import { IntermediateComponent } from './intermediate.component';
import { IntermediaRoutingModule } from './intermedia-routing/intermedia-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    IntermediaRoutingModule
  ],
  declarations: [IntermediateComponent]
})
export class IntermediateModule { }
