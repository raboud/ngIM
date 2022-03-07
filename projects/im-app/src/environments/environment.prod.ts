export const environment = {
  production: true,
  msalConfig: {

    auth: {
      clientId: 'fd88cd5a-c00c-45c3-b2fa-f0f1b4e7aba9',
      authority: 'https://login.microsoftonline.com/e3d53bb7-38c6-4c96-8a81-94089d81b8ff',
      validateAuthority: true,
      redirectUri: 'https://site1.randreng.com',
      postLogoutRedirectUri: "https://site1.randreng.com",
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
        endpoint: 'https://site1.randreng.com:5001/api/',
        scopes: ['api://8b16e065-1a59-4f1c-a619-a50f918b9984/api']
      }
    }
  }
};
