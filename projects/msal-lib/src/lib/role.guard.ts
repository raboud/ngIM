import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
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
export class RoleGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    private authService: MsalService,
    private alertService: AlertService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const expectedRole = route.data.expectedRole;

    let account: Account = this.authService.instance.getActiveAccount();
    if (!account) {
      return false;
    }

    if (!account.idTokenClaims.roles) {
      this.alertService.AddDebugMessage('Token does not have roles claim. Please ensure that your account is assigned to an app role and then sign-out and sign-in again.');
      return false;
    } else if (!account.idTokenClaims.roles.includes(expectedRole)) {
      this.alertService.AddDebugMessage('You do not have access as expected role is missing. Please ensure that your account is assigned to an app role and then sign-out and sign-in again.');
      return false;
    }

    return true;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const expectedRole = childRoute.data.expectedRole;

    let account: Account = this.authService.instance.getActiveAccount();
    if (!account) {
      return false;
    }

    if (!account.idTokenClaims.roles) {
      this.alertService.AddDebugMessage('Token does not have roles claim. Please ensure that your account is assigned to an app role and then sign-out and sign-in again.');
      return false;
    } else if (!account.idTokenClaims.roles.includes(expectedRole)) {
      this.alertService.AddDebugMessage('You do not have access as expected role is missing. Please ensure that your account is assigned to an app role and then sign-out and sign-in again.');
      return false;
    }

    return true;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const expectedRole = route.data.expectedRole;

    let account: Account = this.authService.instance.getActiveAccount();
    if (!account) {
      return false;
    }

    if (!account.idTokenClaims.roles) {
      this.alertService.AddDebugMessage('Token does not have roles claim. Please ensure that your account is assigned to an app role and then sign-out and sign-in again.');
      return false;
    } else if (!account.idTokenClaims.roles.includes(expectedRole)) {
      this.alertService.AddDebugMessage('You do not have access as expected role is missing. Please ensure that your account is assigned to an app role and then sign-out and sign-in again.');
      return false;
    }

    return true;
  }
}
