import { NgModule, ModuleWithProviders } from '@angular/core';
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
      {path: 'industryBoard', component: IndustryBoardComponent,
          children: [
              {path: '', loadChildren: '../industry-board/industry-menu/industry-menu.module#IndustryMenuModule'},
              {path: 'parkMenu', loadChildren: '../industry-board/park-menu/park-menu.module#ParkMenuModule'},
              {path: 'landMenu', loadChildren: '../industry-board/land-menu/land-menu.module#LandMenuModule'},
              {path: 'buildMenu', loadChildren: '../industry-board/floor-menu/floor-menu.module#FloorMenuModule'}
          ]},
      {path: '', redirectTo: 'indexAbstract', pathMatch: 'full'}
    ]
  },
];
export const routing = RouterModule.forChild(routes);

@NgModule({
  imports: [
    routing
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class IntermediateRoutingModule { }
