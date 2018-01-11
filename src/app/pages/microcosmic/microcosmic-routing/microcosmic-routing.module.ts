import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MicrocosmicComponent } from '../microcosmic.component';

export const routes: Routes = [
  {path: '', component: MicrocosmicComponent},
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
export class MicrocosmicRoutingModule { }
