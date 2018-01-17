import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntermediateComponent } from '../intermediate.component';
import { IndexAbstractComponent } from '../index-abstract/index-abstract.component';

export const routes: Routes = [
  {
    path: '',
    component: IntermediateComponent,
    children: [
      {path: 'inedexAbstract', component: IndexAbstractComponent}
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
export class IntermediaRoutingModule { }
