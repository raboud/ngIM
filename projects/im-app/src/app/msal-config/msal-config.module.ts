import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { environment } from '../../environments/environment';

import { Configuration, CacheLocation } from 'msal';
import { MsalLibModule } from 'msal-lib';

 
import {
  MsalInterceptor,
  MSAL_CONFIG,
  MSAL_CONFIG_ANGULAR,
  MsalAngularConfiguration
} from '@azure/msal-angular';

export const protectedResourceMap: [string, string[]][] = [
  [environment.resources.imApi.resourceUri, [environment.resources.imApi.resourceScope]]
];

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

function MSALConfigFactory(): Configuration {
  return {
    auth: {
      clientId: environment.auth.clientId,
      authority: environment.auth.authority,
      validateAuthority: true,
      redirectUri: environment.auth.redirectUri,
      postLogoutRedirectUri: environment.auth.postLogoutRedirectUri,
      navigateToLoginRequestUrl: environment.auth.navigateToLoginRequestUrl,
    },
    cache: {
      cacheLocation: <CacheLocation> environment.cache.cacheLocation,
      storeAuthStateInCookie: isIE, // set to true for IE 11
    },
  };
}

function MSALAngularConfigFactory(): MsalAngularConfiguration {
  return {
    popUp: !isIE,
    consentScopes: [
      environment.resources.imApi.resourceScope,
      ...environment.scopes.loginRequest
    ],
//    unprotectedResources: ["https://www.microsoft.com/en-us/"],
    protectedResourceMap,
    extraQueryParameters: {}
  };
}

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MsalLibModule,
  ],
  exports: [MsalLibModule],
  providers: [
    {
      provide: MSAL_CONFIG,
      useFactory: MSALConfigFactory
    },
    {
      provide: MSAL_CONFIG_ANGULAR,
      useFactory: MSALAngularConfigFactory
    },
    {
    provide: HTTP_INTERCEPTORS,
    useClass: MsalInterceptor,
    multi: true
    },
   ],
})

export class MsalConfigModule { }
