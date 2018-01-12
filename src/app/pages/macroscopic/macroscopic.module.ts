import { NgModule } from '@angular/core';
import { MacroscopicComponent } from './macroscopic.component';
import { SharedModule } from '../../shared/shared.module';
import { MacroscopicRoutingModule } from './macroscopic-routing/macroscopic-routing.module';
import { EconomicComponent } from './economic/economic.component';
import { ForecastComponent } from './forecast/forecast.component';

@NgModule({
  imports: [
    SharedModule,
    MacroscopicRoutingModule
  ],
  declarations: [MacroscopicComponent, EconomicComponent, ForecastComponent]
})
export class MacroscopicModule { }
