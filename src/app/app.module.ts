import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { NgxPaginationModule } from 'ngx-pagination'; 
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CostumerComponent } from './components/costumer/costumer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CostumerComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule,HttpClientModule,FontAwesomeModule, NgxPaginationModule,NgbModule,FormsModule
  ],
  providers: [ HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
