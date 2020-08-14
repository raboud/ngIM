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
import { MsalLibModule } from 'msal-lib';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import {
  MsalModule,
  MsalInterceptor,
  MSAL_CONFIG,
  MSAL_CONFIG_ANGULAR,
  MsalService,
  MsalAngularConfiguration
} from '@azure/msal-angular';

import { environment } from '../environments/environment';
import { MatLibModule } from 'mat-lib';

export const protectedResourceMap: [string, string[]][] = [
  [environment.apiUrl + '/api/', ['api://8b16e065-1a59-4f1c-a619-a50f918b9984/api']]
];

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

function MSALConfigFactory(): Configuration {
  return {
    auth: {
      clientId: '8b16e065-1a59-4f1c-a619-a50f918b9984',
      authority: 'https://login.microsoftonline.com/e3d53bb7-38c6-4c96-8a81-94089d81b8ff',
      validateAuthority: true,
      redirectUri: environment.redirectUri,
      postLogoutRedirectUri: environment.postLogoutRedirectUri,
      navigateToLoginRequestUrl: true,
    },
    cache: {
      cacheLocation: "localStorage",
      storeAuthStateInCookie: isIE, // set to true for IE 11
    },
  };
}

function MSALAngularConfigFactory(): MsalAngularConfiguration {
  return {
    popUp: !isIE,
    consentScopes: [
      "user.read",
      "openid",
      "profile",
      'api://8b16e065-1a59-4f1c-a619-a50f918b9984/api'
    ],
//    unprotectedResources: ["https://www.microsoft.com/en-us/"],
    protectedResourceMap,
    extraQueryParameters: {}
  };
}

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
    MsalLibModule,
    MatLibModule
  ],
  providers: [
    {
      provide: MSAL_CONFIG,
      useFactory: MSALConfigFactory
    },
    {
      provide: MSAL_CONFIG_ANGULAR,
      useFactory: MSALAngularConfigFactory
    },
    AlertService
   ],
  bootstrap: [AppComponent]
})

export class AppModule { }
