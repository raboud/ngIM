import { Component, OnInit } from '@angular/core';
import { BroadcastService, MsalService } from '@azure/msal-angular';
import { AlertService } from 'randr-lib';
import { Logger, CryptoUtils } from 'msal';

@Component({
  selector: 'lib-msal-lib',
  template: `
  <span>
    <button *ngIf='authenticated' mat-button [matMenuTriggerFor]="LoginMenu">{{userName}}</button>
    <mat-menu #LoginMenu="matMenu">
        <button mat-menu-item (click)="logout()">Logout</button>
    </mat-menu>

    <button mat-button *ngIf='!authenticated' (click)='login()'>Login</button>
    <button mat-button >That</button>
  </span>
`,
  styles: [
  ]
})
export class MsalLibComponent implements OnInit {
  public isActive = true;
  public isAdmin = false;
  public authenticated = false;
//  private subscription: Subscription;
  public userName = '';
  badge = 0;

  isIframe = false;

  constructor(
//    private router: Router,
    private broadcastService: BroadcastService, 
    private authService: MsalService,
    private alertService: AlertService
    ) { 
      this.authService.setLogger(new Logger((logLevel, message, piiEnabled) => {
//        this.alertService.AddInfoMessage(`MSAL Logging: ${message}`);
      }, {
        correlationId: CryptoUtils.createNewGuid(),
        piiLoggingEnabled: false
      }));    
    }

    ngOnInit() {
      this.isIframe = window !== window.parent && !window.opener;
  
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
    }
  
    checkoutAccount() {
      this.authenticated = !!this.authService.getAccount();
      if (this.authenticated)
      {
        this.userName = this.authService.getAccount().name;
      }
      else{
        this.userName = "";
      }
    }
  
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

}
