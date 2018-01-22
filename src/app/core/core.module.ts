import { NgModule } from '@angular/core';
import { MapComponent } from './map/map.component';
import { MicrocosmicService } from '../pages/microcosmic/microcosmic.service';
import { IntermediateService } from '../pages/intermediate/intermediate.service';

@NgModule({
  imports: [
  ],
  declarations: [MapComponent],
  exports: [
    MapComponent
  ],
  providers: [MicrocosmicService, IntermediateService]
})
export class CoreModule { }
