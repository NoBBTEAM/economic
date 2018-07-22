import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { PaginationModule } from './pagination/pagination.module';
import { ScrollbarComponent } from './scrollbar.component';

@NgModule({
  imports: [
    CommonModule,
    NgxEchartsModule,
    PaginationModule
  ],
  exports: [
    CommonModule,
    NgxEchartsModule,
    PaginationModule,
    ScrollbarComponent
  ],
  declarations: [ScrollbarComponent]
})
export class SharedModule { }
