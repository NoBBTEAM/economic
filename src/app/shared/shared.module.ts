import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { PaginationModule } from './pagination/pagination.module';

@NgModule({
  imports: [
    CommonModule,
    NgxEchartsModule,
    PaginationModule
  ],
  exports: [
    CommonModule,
    NgxEchartsModule,
    PaginationModule
  ],
  declarations: []
})
export class SharedModule { }
