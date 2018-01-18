import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntermediateComponent } from '../intermediate.component';
import { IndexAbstractComponent } from '../index-abstract/index-abstract.component';
import { IndustryBoardComponent } from '../industry-board/industry-board.component';

export const routes: Routes = [
  {
    path: '',
    component: IntermediateComponent,
    children: [
      {path: 'indexAbstract', component: IndexAbstractComponent},
      {path: 'industryBoard', component: IndustryBoardComponent},
      {path: '', redirectTo: 'indexAbstract', pathMatch: 'full'}
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
