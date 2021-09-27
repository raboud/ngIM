import { Component, OnInit } from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';

import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { EventMessage, EventType, AuthenticationResult, InteractionStatus } from '@azure/msal-browser';

import { AlertService } from 'randr-lib';
import { Logger, LogLevel } from '@azure/msal-browser';import { Subject } from 'rxjs';
;

@Component({
  selector: 'lib-msal-sub-menu',
  template: `
  <span>
    <button *ngIf='authenticated' mat-button [matMenuTriggerFor]="LoginMenu">{{userName}}</button>
    <mat-menu #LoginMenu="matMenu">
        <button mat-menu-item (click)="logout()">Logout</button>
    </mat-menu>

    <button mat-button *ngIf='!authenticated' (click)='login()'>Login</button>
  </span>
`,
  styles: [
  ]
})
export class LoginSubMenuComponent implements OnInit {
  public isActive = true;
  public isAdmin = false;
  public authenticated = false;

  loginDisplay = false;
  dataSource: any =[];

  private readonly _destroying$ = new Subject<void>();


//  private subscription: Subscription;
  public userName = '';
  badge = 0;

  isIframe = false;

  constructor(
//    private router: Router,
    private broadcastService: MsalBroadcastService, 
    private authService: MsalService,
    private alertService: AlertService
    ) { 
      this.authService.setLogger(new Logger({
        loggerCallback: (logLevel, message, piiEnabled) => {
            this.alertService.AddInfoMessage('MSAL Logging: $(message}');
        },
        piiLoggingEnabled: false,
        logLevel: LogLevel.Info
    }));
    }

    ngOnInit() {
      this.isIframe = window !== window.parent && !window.opener;

      this.broadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
        takeUntil(this._destroying$)
      )
      .subscribe((result: EventMessage) => {
        console.log(result);
        const payload = result.payload as AuthenticationResult;
        this.authService.instance.setActiveAccount(payload.account);
      });

      this.broadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None)
      )
      .subscribe(() => {
        this.setLoginDisplay();
        this.checkAndSetActiveAccount();
        this.getClaims(this.authService.instance.getActiveAccount()?.idTokenClaims)
      });

/*  
      this.checkoutAccount();
  
      this.broadcastService.subscribe('msal:loginSuccess', () => {
        this.alertService.AddSuccessMessage(`msal:loginSuccess `);
        this.checkoutAccount();
      });
  
      this.authService.handleRedirectCallback((authError, response) => {
        if (authError) {
          this.alertService.AddErrorMessage(`Redirect Error: ${authError.errorMessage}'`);
          return;
        }
  
        this.userName = this.authService.getAccount().name;
        this.alertService.AddSuccessMessage(`Redirect Success: ${response}`);
      });
    */
       }

       checkAndSetActiveAccount() {
        /**
         * If no active account set but there are accounts signed in, sets first account to active account
         * To use active account set here, subscribe to inProgress$ first in your component
         * Note: Basic usage demonstrated. Your app may require more complicated account selection logic
         */
        let activeAccount = this.authService.instance.getActiveAccount();
    
        if (!activeAccount && this.authService.instance.getAllAccounts().length > 0) {
          let accounts = this.authService.instance.getAllAccounts();
          this.authService.instance.setActiveAccount(accounts[0]);
        }
      }
    
      setLoginDisplay() {
        this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
        this.authenticated = this.loginDisplay;
      }
    
      getClaims(claims: any) {
        this.dataSource = [
          {id: 1, claim: "Display Name", value: claims ? claims['name'] : null},
          {id: 2, claim: "User Principal Name (UPN)", value: claims ? claims['preferred_username'] : null},
          {id: 2, claim: "OID", value: claims ? claims['oid']: null}
        ];
      }
    
    // checkoutAccount() {
    //   this.authenticated = !!this.authService.getAccount();
    //   if (this.authenticated)
    //   {
    //     this.userName = this.authService.getAccount().name;
    //   }
    //   else{
    //     this.userName = "";
    //   }
    // }
  
    login() {
      const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;
  
      if (isIE) {
        this.authService.loginRedirect();
      } else {
        this.authService.loginPopup();
      }
    }
  
    logout() {
      this.authService.logout();
    }
    menu() {
      this.isActive = !this.isActive;
    }

    
  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

}
