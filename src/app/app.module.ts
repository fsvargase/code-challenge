import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { NgxPaginationModule } from 'ngx-pagination'; 
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CostumerComponent } from './components/costumer/costumer.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { ROOT_REDUCERS } from 'src/state/app.state';
import { EffectsModule } from '@ngrx/effects';
import { CostumersEffects } from 'src/state/costumer/costumer.effects';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CostumerComponent
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(ROOT_REDUCERS),
    StoreDevtoolsModule.instrument({maxAge:25,logOnly:environment.production}),
    EffectsModule.forRoot([CostumersEffects]),
    FontAwesomeModule, 
    NgxPaginationModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule
  ],
  providers: [ HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
