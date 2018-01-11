import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { StoreModule } from '../../node_modules/_@ngrx_store@2.2.3@@ngrx/store';
import { amapReducer } from './core/amap-ngrx/amap.reducer';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    StoreModule.provideStore({ amap: amapReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
