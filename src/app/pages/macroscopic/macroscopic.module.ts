import { NgModule } from '@angular/core';
import { MacroscopicComponent } from './macroscopic.component';
import { SharedModule } from '../../shared/shared.module';
import { MacroscopicRoutingModule } from './macroscopic-routing/macroscopic-routing.module';

@NgModule({
  imports: [
    SharedModule,
    MacroscopicRoutingModule
  ],
  declarations: [MacroscopicComponent]
})
export class MacroscopicModule { }
