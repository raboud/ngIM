import { BrowserAuthOptions, BrowserSystemOptions, CacheOptions } from "@azure/msal-browser";

export interface MsalConfig {
    auth: BrowserAuthOptions;
    cache?: CacheOptions;
    system?: BrowserSystemOptions;
    
};

