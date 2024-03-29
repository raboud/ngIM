// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  msalConfig: {

    auth: {
      clientId: '8b16e065-1a59-4f1c-a619-a50f918b9984',
      authority: 'https://login.microsoftonline.com/e3d53bb7-38c6-4c96-8a81-94089d81b8ff',
      validateAuthority: true,
      redirectUri: 'https://localhost:4200',
      postLogoutRedirectUri: "https://localhost:4200",
      navigateToLoginRequestUrl: true
    },
    cache: {
      cacheLocation: 'localStorage'
    },
    scopes: {
      loginRequest: ['user.read', 'openid', 'profile']
    },
    resources: {
      imApi: {
        endpoint: 'https://localhost:5001/api/',
        scopes: ['api://8b16e065-1a59-4f1c-a619-a50f918b9984/api']
      }
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
