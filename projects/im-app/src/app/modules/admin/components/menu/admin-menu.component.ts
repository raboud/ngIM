import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { AuthService } from 'msal-lib';


@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss']
})
export class AdminMenuComponent implements OnInit {
  public authenticated = false;
  public isActive = true;

  private readonly _destroying$ = new Subject<void>();

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

  isAdmin() : boolean {
    return this.authService.inRole("admin");
  }


  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

}
