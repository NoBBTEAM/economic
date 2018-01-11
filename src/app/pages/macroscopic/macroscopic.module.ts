import { NgModule } from '@angular/core';
import { MacroscopicComponent } from './macroscopic.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [MacroscopicComponent]
})
export class MacroscopicModule { }
