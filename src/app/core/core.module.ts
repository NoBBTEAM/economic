import { NgModule } from '@angular/core';
import { MapComponent } from './map/map.component';
import { MicrocosmicService } from '../pages/microcosmic/microcosmic.service';

@NgModule({
  imports: [
  ],
  declarations: [MapComponent],
  exports: [
    MapComponent
  ],
  providers: [MicrocosmicService]
})
export class CoreModule { }
