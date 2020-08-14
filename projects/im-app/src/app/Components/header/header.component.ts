import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BroadcastService, MsalService } from '@azure/msal-angular';
import { Logger, CryptoUtils } from 'msal';
import { AlertService } from 'randr-lib';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isActive = true;
  public isAdmin = false;
  public authenticated = false;
  private subscription: Subscription;
  public userName = '';
  badge = 0;

  isIframe = false;

  @Input() product: string;
  
  constructor(
    private router: Router,
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
