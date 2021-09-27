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

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MsalLibModule, MsalConfig,  MSALCONFIG} from 'msal-lib';

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
    MsalLibModule
  ],
  providers: [
    {
      MSALCONFIG
    }
    AlertService
   ],
  bootstrap: [AppComponent]
})

export class AppModule { }
