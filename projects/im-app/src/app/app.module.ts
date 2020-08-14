import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FooterComponent } from './Components/footer/footer.component';
import { HeaderComponent } from './Components/header/header.component';
import { NavigationComponent } from './Components/navigation/navigation.component';
import { HomeComponent } from './Components/home/home.component';

import { RandrLibModule, AlertService } from 'randr-lib';
import { ImLibModule } from 'im-lib';
import { Configuration } from 'msal';
import { MsalConfigModule } from './msal-config/msal-config.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { environment } from '../environments/environment';
import { MatLibModule } from 'mat-lib';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    NavigationComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    ImLibModule,
    RandrLibModule,
    MatLibModule, 
    MsalConfigModule
  ],
  providers: [
    AlertService
   ],
  bootstrap: [AppComponent]
})

export class AppModule { }
