import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MacroscopicComponent } from '../macroscopic.component';
import { EconomicComponent } from '../economic/economic.component';
import { ForecastComponent } from '../forecast/forecast.component';

export const routes: Routes = [
  {
    path: '',
    component: MacroscopicComponent,
    children: [
      {path: 'economic', component: EconomicComponent},
      {path: 'forecast', component: ForecastComponent},
      {path: '**', redirectTo: 'econmic', pathMatch: 'full'}
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class MacroscopicRoutingModule { }
