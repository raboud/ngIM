import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { AuthService } from './auth.service';

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
  dataSource: any = [];

  private readonly _destroying$ = new Subject<void>();


  //  private subscription: Subscription;
  public userName = '';
  badge = 0;


  constructor(
    //    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    console.log('LoginSubMenuComponent.ngOnInit')

    this.authService.Authenticated$
      .pipe(
        takeUntil(this._destroying$)
      )
      .subscribe((result) => {
        console.log(result);
        this.authenticated = result;
        this.userName = this.authService.userName;
      });
  }
  
  login() {
    this.authService.login();
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
