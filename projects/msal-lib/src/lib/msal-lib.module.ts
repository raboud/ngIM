import { NgModule } from '@angular/core';
import { LoginSubMenuComponent } from './msal-lib.component';

//import { environment } from '../../../im-app/src/environments/environment';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RandrLibModule } from 'randr-lib';
import { CommonModule } from '@angular/common';
import { MatLibModule } from 'mat-lib';

import { LogLevel, Configuration, BrowserCacheLocation, IPublicClientApplication, PublicClientApplication, InteractionType } from '@azure/msal-browser';
import { MsalGuard, MsalInterceptor, MsalBroadcastService, MsalInterceptorConfiguration, MsalModule, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalGuardConfiguration, MsalRedirectComponent } from '@azure/msal-angular';
import { MSALCONFIG } from './msal-config.token';
import { MsalConfig } from './msal-config.interface';

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

/**
 * Configuration object to be passed to MSAL instance on creation. 
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md 
 */

/*
export const msalConfig: Configuration = {
  auth: {
    clientId: environment.auth.clientId, // This is the ONLY mandatory field that you need to supply.
    authority: environment.auth.authority, // Defaults to "https://login.microsoftonline.com/common"
    redirectUri: environment.auth.redirectUri, // Points to window.location.origin. You must register this URI on Azure portal/App Registration.
    postLogoutRedirectUri: environment.auth.postLogoutRedirectUri,
    navigateToLoginRequestUrl: environment.auth.navigateToLoginRequestUrl,
  },
  cache: {
    cacheLocation: <BrowserCacheLocation>environment.cache.cacheLocation,
    storeAuthStateInCookie: isIE, // set to true for IE 11
  },
  system: {
    loggerOptions: {
      loggerCallback(logLevel: LogLevel, message: string) {
        console.log(message);
      },
      logLevel: LogLevel.Verbose,
      piiLoggingEnabled: false
    }
  }
}
*/

/**
 * Add here the endpoints and scopes when obtaining an access token for protected web APIs. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const protectedResources = {
  imApi: {
    endpoint: 'https://localhost:5001/api/',
    scopes: ['api://8b16e065-1a59-4f1c-a619-a50f918b9984/api']
  }
}

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit: 
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
  scopes: []
};


/**
 * Here we pass the configuration parameters to create an MSAL instance.
 * For more info, visit: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/docs/v2-docs/configuration.md
 */

export function MSALInstanceFactory(msalConfig: MsalConfig ): IPublicClientApplication {
  return new PublicClientApplication(msalConfig);
}

/**
 * MSAL Angular will automatically retrieve tokens for resources 
 * added to protectedResourceMap. For more info, visit: 
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/docs/v2-docs/initialization.md#get-tokens-for-web-api-calls
 */
export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();

  protectedResourceMap.set(protectedResources.imApi.endpoint, protectedResources.imApi.scopes);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}

/**
 * Set your default interaction type for MSALGuard here. If you have any
 * additional scopes you want the user to consent upon login, add them here as well.
 */
export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: loginRequest
  };
}

@NgModule({
  declarations: [LoginSubMenuComponent],
  imports: [
    CommonModule,
    RandrLibModule,
    MsalModule,
    MatLibModule
  ],
  exports: [
    LoginSubMenuComponent,
  ]
  ,
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
      deps:[MSALCONFIG]
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
      deps:[MSALCONFIG]
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService
  ]
})
export class MsalLibModule { }
