import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ManageSystemRoutingModule } from './manage-system-routing.module';
import { ExcelImportComponent } from './excel-import/excel-import.component';
import { RolesComponent } from './roles/roles.component';
import { ManageSystemComponent } from './manage-system.component';
import { RoleManageComponent } from './roles/role-manage/role-manage.component';
import { FunctionManageComponent } from './roles/function-manage/function-manage.component';
import { RolesListComponent } from './roles/roles-list/roles-list.component';
import { FunctionListComponent } from './roles/function-list/function-list.component';

@NgModule({
  imports: [
    CommonModule,
    ManageSystemRoutingModule,
    FormsModule
  ],
  declarations: [ExcelImportComponent, RolesComponent, ManageSystemComponent, RoleManageComponent, FunctionManageComponent, RolesListComponent, FunctionListComponent]
})
export class ManageSystemModule { }
