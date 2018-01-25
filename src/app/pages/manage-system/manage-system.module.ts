import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ManageSystemRoutingModule } from './manage-system-routing.module';
import { ExcelImportComponent } from './excel-import/excel-import.component';
import { RolesComponent } from './roles/roles.component';
import { ManageSystemComponent } from './manage-system.component';
import { RoleManageComponent } from './roles/role-manage/role-manage.component';
import { FunctionManageComponent } from './roles/function-manage/function-manage.component';

@NgModule({
  imports: [
    CommonModule,
    ManageSystemRoutingModule,
    FormsModule
  ],
  declarations: [ExcelImportComponent, RolesComponent, ManageSystemComponent, RoleManageComponent, FunctionManageComponent]
})
export class ManageSystemModule { }
