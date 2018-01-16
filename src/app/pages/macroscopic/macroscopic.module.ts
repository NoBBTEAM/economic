import { NgModule } from '@angular/core';
import { MacroscopicComponent } from './macroscopic.component';
import { SharedModule } from '../../shared/shared.module';
import { MacroscopicRoutingModule } from './macroscopic-routing/macroscopic-routing.module';
import { ForecastComponent } from './forecast/forecast.component';

@NgModule({
  imports: [
    SharedModule,
    MacroscopicRoutingModule
  ],
  declarations: [
    MacroscopicComponent,
    ForecastComponent,
  ]
})
export class MacroscopicModule { }
