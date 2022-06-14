import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AccountInfo } from '@azure/msal-browser';
import { AlertService } from 'randr-lib';
import { Observable } from 'rxjs';


interface Account extends AccountInfo {
  idTokenClaims?: {
    roles?: string[]
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    private authService: MsalService,
    private router: Router

  ) {
    console.log('AuthGuard');
  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    console.log('AuthGuard.canActivate');

    let account: Account | null = this.authService.instance.getActiveAccount();
    if (!account) {
      //      this.alertService.AddDebugMessage("Not logged in")
      console.log('AuthGuard.canActivate:false');
      return this.router.parseUrl('/');
    }

    console.log('AuthGuard.canActivate:true');
    return true;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    console.log('AuthGuard.canActivateChild');

    let account: Account | null = this.authService.instance.getActiveAccount();
    if (!account) {
      console.log('AuthGuard.canActivateChild:false');
      //      this.alertService.AddDebugMessage("Not logged in")
      return false;
    }

    console.log('AuthGuard.canActivateChild:true');
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    console.log('AuthGuard.canLoad');

    let account: Account | null = this.authService.instance.getActiveAccount();
    if (!account) {
      //      this.alertService.AddDebugMessage("Not logged in")
      console.log('AuthGuard.canLoad:false');
      return this.router.parseUrl('/');
    }

    console.log('AuthGuard.canLoad:true');
    return true;
  }
}
