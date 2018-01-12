import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import { LayoutComponent } from '../pages/layout/layout.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: 'mic', loadChildren: '../pages/microcosmic/microcosmic.module#MicrocosmicModule'},
      {path: 'int', loadChildren: '../pages/intermediate/intermediate.module#IntermediateModule'},
      {path: 'mac', loadChildren: '../pages/macroscopic/macroscopic.module#MacroscopicModule'},
      {path: '**', redirectTo: '/mic', pathMatch: 'full'}
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
