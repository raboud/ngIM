import { InjectionToken } from '@angular/core';

import { MsalConfig } from './msal-config.interface';

/**
 * @const ENVIRONMENT
 * Injection token for the environment interface to be provided by the applications.
 */
export const MSALCONFIG: InjectionToken<MsalConfig> = new InjectionToken('MSALCONFIG');