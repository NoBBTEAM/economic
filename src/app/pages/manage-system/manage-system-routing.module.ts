import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExcelImportComponent } from './excel-import/excel-import.component';
import { RolesComponent } from './roles/roles.component';
import { ManageSystemComponent } from './manage-system.component';
import { RoleManageComponent } from './roles/role-manage/role-manage.component';
import { FunctionManageComponent } from './roles/function-manage/function-manage.component';
import { RolesListComponent } from './roles/roles-list/roles-list.component';
import { FunctionListComponent } from './roles/function-list/function-list.component';

const routes: Routes = [
  {path: '', component: ManageSystemComponent, children: [
      {path: '', redirectTo: 'import', pathMatch: 'full'},
      {path: 'import', component: ExcelImportComponent},
      {path: 'roles', component: RolesListComponent},
      {path: 'roleManage', component: RoleManageComponent},
      {path: 'function', component: FunctionListComponent},
      {path: 'functionManage', component: FunctionManageComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageSystemRoutingModule { }
