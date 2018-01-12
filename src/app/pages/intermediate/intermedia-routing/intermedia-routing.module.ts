import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntermediateComponent } from '../intermediate.component';

export const routes: Routes = [
  {path: '', component: IntermediateComponent},
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
export class IntermediaRoutingModule { }
