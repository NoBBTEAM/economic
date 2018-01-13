import { NgModule } from '@angular/core';
import { MicrocosmicComponent } from './microcosmic.component';
import { SharedModule } from '../../shared/shared.module';
import { MicrocosmicRoutingModule } from './microcosmic-routing/microcosmic-routing.module';
import { MicIndexComponent } from './mic-index/mic-index.component';

@NgModule({
  imports: [
    SharedModule,
    MicrocosmicRoutingModule,
  ],
  declarations: [MicrocosmicComponent, MicIndexComponent]
})
export class MicrocosmicModule { }
