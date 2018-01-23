import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { StoreModule } from '@ngrx/store';
import { amapReducer } from './core/amap-ngrx/amap.reducer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContainerReducer } from './core/container-ngrx/contsiner.reducer';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { LayoutService } from './pages/layout/layout.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
    AppRoutingModule,
    PerfectScrollbarModule,
    StoreModule.provideStore({ amap: amapReducer, container: ContainerReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
