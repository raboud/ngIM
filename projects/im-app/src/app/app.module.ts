import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HeaderComponent } from './Components/header/header.component';
import { NavigationComponent } from './Components/navigation/navigation.component';
import { HomeComponent } from './Components/home/home.component';

import { ImLibModule } from 'im-lib';
import { AppRoutingModule } from './app-routing.module';

import { RandrLibModule, AlertService } from 'randr-lib';
import { MatLibModule } from 'mat-lib';
import { MsalConfigModule } from './msal-config/msal-config.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
