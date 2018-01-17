import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  imports: [
    CommonModule,
    NgxEchartsModule
  ],
  exports: [
    CommonModule,
    NgxEchartsModule
  ],
  declarations: []
})
export class SharedModule { }
