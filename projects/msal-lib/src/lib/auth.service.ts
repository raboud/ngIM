import { Inject, Injectable, OnDestroy, OnInit } from '@angular/core';
import { MsalBroadcastService, MsalGuardConfiguration, MsalService, MSAL_GUARD_CONFIG } from '@azure/msal-angular';
import { AuthenticationResult, EventMessage, EventType, InteractionStatus, InteractionType, Logger, LogLevel, PopupRequest, RedirectRequest } from '@azure/msal-browser';
//import { AlertService } from 'randr-lib';
import { ReplaySubject, Subject} from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class AuthService implements OnDestroy {
    public Authenticated$ = new ReplaySubject<boolean>();
    private readonly _destroying$ = new Subject<void>();

    constructor(
        //    private router: Router,
        //        private alertService: AlertService,
        @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
        private broadcastService: MsalBroadcastService,
        private msalService: MsalService
    ) {
        console.log('AuthService');
        this.msalService.setLogger(new Logger({
            loggerCallback: (logLevel, message, piiEnabled) => {
                //                this.alertService.AddInfoMessage(`MSAL Logging: ${message}`);
                console.log(`MSAL Logging: ${message}`);
            },
            piiLoggingEnabled: false,
            logLevel: LogLevel.Verbose
        }));
        this.init();
    }

    private init() {
        console.log('AuthService.init')

        this.broadcastService.msalSubject$
            .pipe(
                filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS || msg.eventType === EventType.LOGOUT_SUCCESS),
                takeUntil(this._destroying$)
            )
            .subscribe((result: EventMessage) => {
                console.log(result);
                if (result.eventType === EventType.LOGIN_SUCCESS) {
                    const payload = result.payload as AuthenticationResult;
                    this.msalService.instance.setActiveAccount(payload.account);
//                    this.msalService.instance.getActiveAccount().idTokenClaims.
                    console.log(payload.account.idTokenClaims);
                    this.Authenticated$.next(true);
                }
                else if (result.eventType === EventType.LOGOUT_SUCCESS) {
                    this.Authenticated$.next(false);
                }
            });

        this.broadcastService.inProgress$
            .pipe(
                filter((status: InteractionStatus) => status === InteractionStatus.None)
            )
            .subscribe(() => {
                //          this.setLoginDisplay();
                this.checkAndSetActiveAccount();
                //          this.getClaims(this.authService.instance.getActiveAccount()?.idTokenClaims)
            });

    }

    checkAndSetActiveAccount() {
        console.log('AuthService.checkAndSetActiveAccount');
        /**
         * If no active account set but there are accounts signed in, sets first account to active account
         * To use active account set here, subscribe to inProgress$ first in your component
         * Note: Basic usage demonstrated. Your app may require more complicated account selection logic
         */
        let activeAccount = this.msalService.instance.getActiveAccount();

        if (!activeAccount && this.msalService.instance.getAllAccounts().length > 0) {
            let accounts = this.msalService.instance.getAllAccounts();
            this.msalService.instance.setActiveAccount(accounts[0]);
            console.log(this.msalService.instance.getActiveAccount());
            this.Authenticated$.next(true);
        }
        else if (activeAccount) {
            this.Authenticated$.next(true);
        }
    }

    get userName(): string | undefined {
        console.log(this.msalService.instance.getActiveAccount()?.idTokenClaims);
        return this.msalService.instance.getActiveAccount()?.name;
    }

    getClaims() {
        return this.msalService.instance.getActiveAccount()?.idTokenClaims;
    }

    login() {
        console.log('AuthService.logIn');
        //        const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

        //        if (isIE) {
        //            this.msalService.loginRedirect();
        //        } else {
        //            this.msalService.loginPopup();
        //        }

        if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
            if (this.msalGuardConfig.authRequest) {
                this.msalService.loginPopup({ ...this.msalGuardConfig.authRequest } as PopupRequest)
                    .subscribe((response: AuthenticationResult) => {
                        this.msalService.instance.setActiveAccount(response.account);
                    });
            } else {
                this.msalService.loginPopup()
                    .subscribe((response: AuthenticationResult) => {
                        this.msalService.instance.setActiveAccount(response.account);
                    });
            }
        } else {
            if (this.msalGuardConfig.authRequest) {
                this.msalService.loginRedirect({ ...this.msalGuardConfig.authRequest } as RedirectRequest);
            } else {
                this.msalService.loginRedirect();
            }
        }
    }

    logout() {
        console.log('AuthService.logout');
        this.msalService.logout();
    }


    ngOnDestroy(): void {
        this._destroying$.next(undefined);
        this._destroying$.complete();
    }

}
