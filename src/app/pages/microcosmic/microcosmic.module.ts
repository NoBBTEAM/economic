import { NgModule } from '@angular/core';
import { MicrocosmicComponent } from './microcosmic.component';
import { SharedModule } from '../../shared/shared.module';
import { MicrocosmicRoutingModule } from './microcosmic-routing/microcosmic-routing.module';

@NgModule({
  imports: [
    SharedModule,
    MicrocosmicRoutingModule
  ],
  declarations: [MicrocosmicComponent]
})
export class MicrocosmicModule { }
