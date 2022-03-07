import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HeaderComponent } from './Components/header/header.component';
import { NavigationComponent } from './Components/navigation/navigation.component';
import { HomeComponent } from './Components/home/home.component';

import { ImLibModule } from 'im-lib';
import { AppRoutingModule } from './app-routing.module';

import { RandrLibModule, AlertService } from 'randr-lib';
import { MsalLibModule, AuthService } from 'msal-lib';


import { LogLevel, Configuration, BrowserCacheLocation, IPublicClientApplication, PublicClientApplication, InteractionType } from '@azure/msal-browser';
import { MsalGuard, MsalInterceptor, MsalBroadcastService, MsalInterceptorConfiguration, MsalModule, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalGuardConfiguration, MsalRedirectComponent } from '@azure/msal-angular';
import { environment } from '../environments/environment';
import { AddressFormComponent } from './Components/address-form/address-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatLibModule } from 'mat-lib';


const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

export const msalConfig: Configuration = {
  auth: {
    clientId: environment.msalConfig.auth.clientId, // This is the ONLY mandatory field that you need to supply.
    authority: environment.msalConfig.auth.authority, // Defaults to "https://login.microsoftonline.com/common"
    redirectUri: environment.msalConfig.auth.redirectUri, // Points to window.location.origin. You must register this URI on Azure portal/App Registration.
    postLogoutRedirectUri: environment.msalConfig.auth.postLogoutRedirectUri,
    navigateToLoginRequestUrl: environment.msalConfig.auth.navigateToLoginRequestUrl,
  },
  cache: {
    cacheLocation: <BrowserCacheLocation> environment.msalConfig.cache.cacheLocation,
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


/**
 * Add here the endpoints and scopes when obtaining an access token for protected web APIs. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const protectedResources = {
  imApi: {
    endpoint: environment.msalConfig.resources.imApi.endpoint,
    scopes: environment.msalConfig.resources.imApi.scopes
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

export function MSALInstanceFactory(msalConfig: Configuration ): IPublicClientApplication {
  return new PublicClientApplication(environment.msalConfig);
}

/**
 * MSAL Angular will automatically retrieve tokens for resources
 * added to protectedResourceMap. For more info, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/docs/v2-docs/initialization.md#get-tokens-for-web-api-calls
 */
export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  console.log('MSALInterceptorConfigFactory');
  const protectedResourceMap = new Map<string, Array<string>>();

  console.log(environment.msalConfig.resources);

  protectedResourceMap.set(environment.msalConfig.resources.imApi.endpoint, environment.msalConfig.resources.imApi.scopes);

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
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    NavigationComponent,
    HomeComponent,
    AddressFormComponent,
//    UppercaseDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ImLibModule,
    FormsModule,

    RandrLibModule,
    MatLibModule,
    MsalLibModule, MatInputModule, MatButtonModule, MatSelectModule, MatRadioModule, MatCardModule, ReactiveFormsModule
  ],
  providers: [
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    },
    AlertService,
    AuthService
   ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})

export class AppModule { }
