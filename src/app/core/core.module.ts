import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '../../../node_modules/_@angular_router@4.4.6@@angular/router/src/router_module';
import { MapComponent } from './map/map.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MapComponent],
  exports: [
    MapComponent
  ]
})
export class CoreModule { }
