import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MacroscopicComponent } from '../macroscopic.component';

export const routes: Routes = [
  {path: '', component: MacroscopicComponent},
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
